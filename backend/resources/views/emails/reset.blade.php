<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation du mot de passe - GymPlus</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #fffbeb; /* jaune très clair */
        }

        .container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2.5rem 1rem;
        }

        .card {
            background-color: #ffffff;
            border-radius: 1rem;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            max-width: 480px;
            width: 100%;
            overflow: hidden;
            border: 1px solid #fde68a;
        }

        .header {
            background-color: #facc15; /* jaune clair principal */
            color: #78350f;
            text-align: center;
            padding: 1.5rem;
        }

        .header h1 {
            margin: 0;
            font-size: 1.5rem;
        }

        .body {
            padding: 1.5rem;
            color: #374151;
            font-size: 1rem;
            line-height: 1.6;
        }

        .body p {
            margin-bottom: 1rem;
        }

        .button-wrapper {
            text-align: center;
            margin: 1.8rem 0;
        }

        .btn {
            background-color: #facc15;
            color: #78350f;
            text-decoration: none;
            font-weight: bold;
            padding: 0.75rem 1.8rem;
            border-radius: 0.5rem;
            display: inline-block;
            transition: background-color 0.3s ease;
            box-shadow: 0 4px 10px rgba(250, 204, 21, 0.4);
        }

        .btn:hover {
            background-color: #eab308;
        }

        .footer {
            background-color: #fef3c7;
            text-align: center;
            color: #92400e;
            font-size: 0.875rem;
            padding: 1rem;
        }

        strong {
            font-weight: bold;
            color: #92400e;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">

            <!-- Header -->
            <div class="header">
                <h1>Réinitialisation du mot de passe</h1>
            </div>

            <!-- Body -->
            <div class="body">
                <p>Bonjour <strong>{{ $user->nom }}</strong> 👋,</p>

                <p>
                    Nous avons reçu une demande pour réinitialiser votre mot de passe
                    sur <strong>GymPlus</strong>.
                    Cliquez sur le bouton ci-dessous pour en créer un nouveau :
                </p>

                <div class="button-wrapper">
                    <a href="{{ $resetLink }}" class="btn">
                        Réinitialiser mon mot de passe
                    </a>
                </div>

                <p>
                    Si vous n'êtes pas à l’origine de cette demande,
                    vous pouvez ignorer cet email. Votre mot de passe restera inchangé.
                </p>

                <p>
                    Cordialement,<br>
                    <strong>L'équipe GymPlus</strong>
                </p>
            </div>

            <!-- Footer -->
            <div class="footer">
                &copy; {{ date('Y') }} GymPlus. Tous droits réservés.
            </div>

        </div>
    </div>
</body>
</html>
