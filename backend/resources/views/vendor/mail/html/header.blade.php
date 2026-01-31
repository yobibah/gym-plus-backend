@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="{{ $message->embed(public_path('logo/logo.png')) }}">

@else
{!! $slot !!}
@endif
</a>
</td>
</tr>
