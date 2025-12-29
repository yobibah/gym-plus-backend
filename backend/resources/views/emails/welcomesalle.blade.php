<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bienvenue chez {{ $nom_salle }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }
        h1 {
            color: #007BFF;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
        }
        .highlight {
            font-weight: bold;
            color: #007BFF;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #28a745;
            color: #fff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #218838;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bienvenue {{ $prenom }} {{ $username }} ! 🎉</h1>

        <p>
            Vous êtes maintenant membre de la salle <span class="highlight">{{ $nom_salle }}</span> située dans <span class="highlight">{{ $region_salle }}</span>.
        </p>

        <p>
            Pour toute question, vous pouvez contacter la salle au : <span class="highlight">{{ $contact }}</span>.
        </p>

        <a href="#" class="btn">Voir votre abonnement</a>

        <p>— L’équipe  {{ $nom_salle }}</p>

        <div class="footer">
            Vous recevez ce mail car vous êtes inscrit à {{ $nom_salle }}. Merci de ne pas répondre à ce message.
        </div>
    </div>
</body>
</html>
