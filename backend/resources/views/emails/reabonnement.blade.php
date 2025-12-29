<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Réabonnement confirmé</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        h1 {
            color: #0d6efd;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.7;
            color: #333;
        }
        .highlight {
            color: #0d6efd;
            font-weight: bold;
        }
        .success {
            background-color: #e6f4ea;
            border-left: 5px solid #28a745;
            padding: 15px;
            margin: 20px 0;
            border-radius: 6px;
            color: #155724;
        }
        .btn {
            display: inline-block;
            margin-top: 25px;
            padding: 12px 28px;
            background-color: #28a745;
            color: #fff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
        }
        .btn:hover {
            background-color: #218838;
        }
        .footer {
            margin-top: 35px;
            font-size: 13px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bonjour {{ $prenom }} {{ $username }} 👋</h1>

        <p>
            Votre réabonnement à la salle 
            <span class="highlight">{{ $nom_salle }}</span> située à 
            <span class="highlight">{{ $region_salle }}</span>
            a bien été pris en compte.
        </p>

        <div class="success">
            ✅ Le réabonnement a été effectué avec succès.  
            Vous pouvez continuer à profiter pleinement des services de la salle.
        </div>

        <p>
            Pour toute question, vous pouvez contacter la salle au :
            <span class="highlight">{{ $contact }}</span>
        </p>

        <a href="#" class="btn">Voir mon abonnement</a>

        <p style="margin-top:30px;">
            — L’équipe <strong>{{ $nom_salle }}</strong> 💪
        </p>

        <div class="footer">
            Vous recevez cet email car vous êtes inscrit à {{ $nom_salle }} via GymPlus.<br>
            Merci de ne pas répondre à ce message.
        </div>
    </div>
</body>
</html>
