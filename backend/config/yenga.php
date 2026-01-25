<?php 

return  [
    'api_key'    => env('YENGAPAY_API_KEY'),
    'project_id' => env('YENGAPAY_PROJECT_ID'),
    'org_id'     => env('YENGAPAY_ORG_ID'),
    'env'        => env('YENGAPAY_ENV', 'test'),
    'base_url'   => env('YENGAPAY_BASE_URL'),
];
