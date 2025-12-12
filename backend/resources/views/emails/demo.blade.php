<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contact utilisateur</title>
    <style>
        .container {
            max-width: 600px;
            margin: auto;
            font-family: Arial, sans-serif;
            background: #ffffff;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            padding: 25px;
        }

        .header {
            text-align: center;
            padding-bottom: 10px;
        }

        .otp-box {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 6px;
            text-align: center;
            padding: 15px;
            background: #f4f6ff;
            border: 1px solid #d0d7ff;
            border-radius: 6px;
            color: #2d3acb;
            margin: 20px 0;
        }

        .footer {
            font-size: 12px;
            color: #666;
            text-align: center;
            margin-top: 30px;
        }

        .btn {
            display: inline-block;
            background: #2d3acb;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 10px;
        }
    </style>
</head>

<body>

<div class="container">

    <div class="header">
        <h2>Un utilisateur vous a contacté</h2>
        <p><strong>Email :</strong> {{ $email }}</p>

        <div>
            <p><strong>Message :</strong></p>
            <p>{{ $content }}</p>
        </div>
    </div>

    <div class="footer">
        <p>© {{ date('Y') }} Votre Application. Tous droits réservés.</p>
    </div>

</div>

</body>
</html>
