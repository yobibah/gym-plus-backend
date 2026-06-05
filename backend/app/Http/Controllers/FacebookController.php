<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Facebook;
use App\Services\FacebookService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class FacebookController extends Controller
{
    public function __construct(private FacebookService $fbService) {}


    public function authUrl(Request $request)
    {
        
        $state = Str::random(32);

       
        Cache::put("fb_oauth_state:{$state}", $request->user()->id, now()->addMinutes(5));

        $params = http_build_query([
            'client_id'     => config('services.facebook.client_id'),
            'redirect_uri'  => config('services.facebook.redirect'),
            'scope'         => 'pages_manage_posts,pages_read_engagement,pages_show_list',
            'response_type' => 'code',
            'state'         => $state,
        ]);

        return response()->json([
            'url' => "https://www.facebook.com/v19.0/dialog/oauth?{$params}",
        ]);
    }

   
public function callback(Request $request)
{
    $state = $request->query('state');
    $code  = $request->query('code');

    $userId = Cache::pull("fb_oauth_state:{$state}");

    if (!$userId) {
        return response()->json([
            'status' => 'error',
            'message' => 'State invalide ou expiré'
        ], 422);
    }

  
    $shortToken = $this->fbService->exchangeCode($code);

    $longLivedToken = $this->fbService->extendToken($shortToken);

   
    $pages = $this->fbService->getManagedPages($longLivedToken);

    if (empty($pages)) {
        return response()->json([
            'status' => 'error',
            'message' => 'Aucune page Facebook trouvée'
        ], 404);
    }

    $savedPages = [];

    foreach ($pages as $page) {
        $savedPages[] = Facebook::updateOrCreate(
            ['page_id' => $page['id']],
            [
                'user_id'      => $userId,
                'name'         => $page['name'],
                'access_token' => $page['access_token'],
            ]
        );
    }

    return response()->json([
        'status' => 'success',
        'message' => 'Pages Facebook synchronisées',
        'pages' => $savedPages
    ]);
}
  
    public function pages(Request $request)
    {
        $pages = Facebook::where('user_id', $request->user()->id)
            ->select('page_id', 'name', 'created_at')
            ->get();

        return response()->json(['pages' => $pages]);
    }

  
    public function disconnect(Request $request, string $pageId)
    {
        Facebook::where('user_id', $request->user()->id)
            ->where('page_id', $pageId)
            ->delete();

        return response()->json(['message' => 'Page déconnectée.']);
    }


    public function publish(Request $request, string $pageId)
    {
        $request->validate([
            'title'       => 'required|string',
            'description' => 'nullable|string',
            'start_date'  => 'required|date',
            'end_date'    => 'nullable|date|after:start_date',
        ]);

        $page = Facebook::where('user_id', $request->user()->id)
            ->where('page_id', $pageId)
            ->firstOrFail();

        $result = $this->fbService->publishEvent($page, $request->all());

        return response()->json([
            'message'           => 'Événement publié sur Facebook.',
            'facebook_event_id' => $result['id'],
        ]);
    }
}