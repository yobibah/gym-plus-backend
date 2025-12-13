<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation de paiement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #fff;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h2 {
            text-align: center;
            color: #1e40af;
        }
        p {
            line-height: 1.6;
        }
        .highlight {
            font-weight: bold;
            color: #1e40af;
        }
        .success {
            background-color: #d1fae5;
            padding: 10px;
            border-left: 5px solid #10b981;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .error {
            background-color: #fee2e2;
            padding: 10px;
            border-left: 5px solid #ef4444;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .info {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Bienvenue sur notre plateforme</h2>

        @if ($paiement->status == 'reussi')
            <div class="success">
                <p>✅ Votre paiement a réussi !</p>
            </div>

            <div class="info">
                <p><span class="highlight">Date de début :</span> {{ $paiement->debut }}</p>
                <p><span class="highlight">Date de fin :</span> {{ $paiement->fin }}</p>
                <p><span class="highlight">Plan choisi :</span> {{ $paiement->plan }}</p>
                <p><span class="highlight">Transaction :</span> {{ $paiement->transaction ?? 'N/A' }}</p>
                <p><span class="highlight">Montant :</span> {{ $paiement->montant }} FCFA</p>
            </div>

            <div class="info">
                <p>Voici vos informations de connexion :</p>
                <p><strong>Nom d'utilisateur :</strong> {{ $username }}</p>
                <p><strong>Mot de passe :</strong> {{ $mdp }}</p>
            </div>
        @else
            <div class="error">
                <p>❌ Oups ! Votre paiement a échoué. Veuillez réessayer.</p>
            </div>
        @endif

        <p>Merci d'utiliser notre service.</p>
    </div>
</body>
</html>
