<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Validation de document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #1e40af;
            color: white;
            padding: 15px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .content p {
            margin-bottom: 10px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 20px;
        }
        .highlight {
            font-weight: bold;
            color: #1e40af;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #1e40af;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Validation de document</h2>
        </div>

        <div class="content">
            <p>Bonjour  mr <span class="highlight">{{ $gerant->name }}</span>, gerant de  <span class="highlight">{{ $salle->nom }}</span>. </p>

            <p>Un nouveau document a été soumis pour la salle <span class="highlight">{{ $salle->nom }}</span>.</p>

            <p><strong>Détails du document :</strong></p>
            <ul>
                <li>Type : {{ $document->type }}</li>
                <li>Numéro d'identité : {{ $document->numero_identite }}</li>
                <li>Recto : {{ $document->recto }}</li>
                <li>Verso : {{ $document->verso }}</li>
                <li>Status : {{ $document->status }}</li>
                <li>Date de soumission : {{ $document->date_soumission }}</li>
                @if($document->date_verification)
                    <li>Date de vérification : {{ $document->date_verification }}</li>
                @endif
            </ul>

            <p>Merci de vérifier et valider ce document dès que possible.</p>

            {{-- Optionnel : bouton pour ouvrir l'administration --}}
            <a href="{{ url('/admin/documents') }}" class="button">Voir les documents</a>
        </div>

        <div class="footer">
            <p>© {{ date('Y') }} GymPlus. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
