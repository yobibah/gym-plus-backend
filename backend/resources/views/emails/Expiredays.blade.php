<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Rappel d'abonnement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #007BFF;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .highlight {
            font-weight: bold;
            color: #007BFF;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bonjour {{ $user->name }} 👋</h1>

        <p>
            Votre abonnement à la salle <span class="highlight">{{ $salle->nom_salle }}</span> expirera dans exactement <span class="highlight">07 jours</span>.
        </p>

        <p>
            Merci de renouveler votre abonnement pour continuer à profiter de tous les services de la salle.
        </p>

        <p>— L’équipe {{ $salle->nom_salle }} 💪</p>

        <div class="footer">
            Vous recevez ce mail car vous êtes inscrit à {{ $salle->nom_salle }}. Merci de ne pas répondre à ce message.
        </div>
    </div>
</body>
</html>
