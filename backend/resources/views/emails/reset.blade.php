<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation du mot de passe - Educpro</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
        }

        .container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2.5rem 1rem;
        }

        .card {
            background-color: #fff;
            border-radius: 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-width: 480px;
            width: 100%;
            overflow: hidden;
        }

        .header {
            background-color: #4f46e5;
            color: #fff;
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
            margin: 1.5rem 0;
        }

        .btn {
            background-color: #4f46e5;
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            transition: background-color 0.3s ease;
        }
        a{
            color:#fff;
        }

        .btn:hover {
            background-color: #4338ca;
        }

        .footer {
            background-color: #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 0.875rem;
            padding: 1rem;
        }

        strong {
            font-weight: bold;
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
                <p>Nous avons reçu une demande pour réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour en créer un nouveau :</p>

                <div class="button-wrapper">
                    <a  href="{{ $resetLink }}" class="btn">Réinitialiser mon mot de passe</a>
                </div>

                <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email. Votre mot de passe restera inchangé.</p>

                <p>Cordialement,<br>L'équipe Educpro</p>
            </div>

            <!-- Footer -->
            <div class="footer">
                &copy; {{ date('Y') }} EducPro. Tous droits réservés.
            </div>
        </div>
    </div>
</body>
</html>
