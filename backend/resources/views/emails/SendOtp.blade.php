<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Vérification du compte</title>
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
        <h2>Vérification de votre compte</h2>
        <p>Bonjour {{ $user->prenom }} {{ $user->nom }},</p>
    </div>

    <p>Merci d’avoir créé un compte chez nous. Pour continuer, veuillez entrer le code ci-dessous :</p>

    <div class="otp-box">
        {{ $otp }}
    </div>

    <p>Ce code est valable pendant <strong>10 minutes</strong>.</p>

    <p>Si vous n’êtes pas à l’origine de cette demande, ignorez simplement ce message.</p>

    <div style="text-align:center;">
        <a class="btn">Valider mon compte</a>
    </div>

    <div class="footer">
        <p>© {{ date('Y') }} Votre Application. Tous droits réservés.</p>
    </div>

</div>

</body>
</html>
