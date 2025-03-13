<!DOCTYPE html>
<html>
<head>
    <title>Chat Export</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .message { margin-bottom: 15px; padding: 10px; border-left: 3px solid #eee; }
        .timestamp { color: #666; font-size: 0.8em; }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ $problem->title }}</h1>
        <p>{{ $problem->description }}</p>
    </div>

    <div class="chat-history">
        @foreach($chats as $chat)
            <div class="message">
                @if($chat->sender == 'user')
                    <strong>User:</strong>
                @else
                    <strong>Bot:</strong>
                @endif
                <div class="timestamp">
                    {{ $chat->created_at->format('Y-m-d H:i:s') }}
                </div>
                <div class="content">
                    {!! nl2br(e($chat->message)) !!}
                </div>
            </div>
        @endforeach
    </div>

    <script type="text/javascript" async
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
    </script>
</body>
</html>