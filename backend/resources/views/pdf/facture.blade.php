<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture d'abonnement</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 13px;
            color: #1f2937;
            margin: 20px;
        }

        /* HEADER */
        .header {
            display: table;
            width: 100%;
            margin-bottom: 30px;
        }

        .header-left {
            width: 30%;
            display: table-cell;
            vertical-align: middle;
        }

        .header-right {
            width: 70%;
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }

        .logo {
            width: 120px;
            height: 120px;
            border: 1px solid #d1d5db;
            text-align: center;
            line-height: 120px;
        }

        .logo img {
            max-width: 100%;
            max-height: 100%;
        }

        h1 {
            font-size: 22px;
            margin: 0;
            color: #1d4ed8; /* bleu pour titre principal */
        }

        h2 {
            font-size: 16px;
            padding-bottom: 5px;
            margin-bottom: 10px;
            border-bottom: 2px solid #1d4ed8; /* bleu */
        }

        .section {
            margin-bottom: 25px;
        }

        .row {
            margin-bottom: 5px;
        }

        .label {
            font-weight: bold;
        }

        /* TABLEAU */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table th, table td {
            border: 1px solid #d1d5db;
            padding: 8px;
            text-align: left;
        }

        table th {
            background-color: #1d4ed8; /* bleu en-tête */
            color: #ffffff;
        }

        table tr:nth-child(even) {
            background-color: #f3f4f6; /* gris clair pour lignes alternées */
        }

        .total {
            font-weight: bold;
            background-color: #10b981; /* vert vif */
            color: #ffffff;
        }

        /* FOOTER */
        .footer {
            margin-top: 50px;
            display: table;
            width: 100%;
        }

        .thanks {
            display: table-cell;
            vertical-align: bottom;
            color: #6b7280;
        }

        .signature {
            display: table-cell;
            text-align: right;
        }

        .signature-box {
            border-top: 1px solid #000;
            width: 200px;
            text-align: center;
            padding-top: 10px;
            font-size: 12px;
            margin-left: auto;
        }
    </style>
</head>

<body>

    <!-- HEADER -->
    <div class="header">
        <div class="header-left">
            <div class="logo">
                @if($salle->logo_salle)
                    <img src="{{ public_path($salle->logo_salle) }}" alt="Logo salle">
                @else
                    LOGO
                @endif
            </div>
        </div>

        <div class="header-right">
            <h1>Facture d'abonnement</h1>
            <p>Salle : <strong>{{ $salle->nom_salle ?? 'N/A' }}</strong></p>
            <p>Adresse : {{ $salle->adresse_salle ?? 'N/A' }} | Tel : {{ $salle->numero_salle ?? 'N/A' }}</p>
        </div>
    </div>

    <!-- ADHÉRENT -->
    <div class="section">
        <h2>Informations de l'adhérent</h2>
        <div class="row"><span class="label">Nom :</span> {{ $user->name }} {{ $user->prenom }}</div>
        <div class="row"><span class="label">Email :</span> {{ $user->email }}</div>
        <div class="row"><span class="label">Téléphone :</span> {{ $user->telephone ?? 'N/A' }}</div>
    </div>

    <!-- DÉTAILS DE L'ABONNEMENT -->
    <div class="section">
        <h2>Détails de l'abonnement</h2>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Montant</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Abonnement {{ strtoupper($abonnement->plan) }}</td>
                    <td>1</td>
                    <td>{{ number_format($abonnement->montant, 0, ',', ' ') }} F CFA</td>
                    <td>{{ number_format($abonnement->montant, 0, ',', ' ') }} F CFA</td>
                </tr>
                <!-- Ajouter d'autres services si nécessaire -->
                <tr class="total">
                    <td colspan="3">Total</td>
                    <td>{{ number_format($abonnement->montant, 0, ',', ' ') }} F CFA</td>
                </tr>
            </tbody>
        </table>

        <div class="row">
            <span class="label">Date de début :</span> {{ \Carbon\Carbon::parse($abonnement->debut)->format('d/m/Y') }}
        </div>
        <div class="row">
            <span class="label">Date de fin :</span> {{ \Carbon\Carbon::parse($abonnement->fin)->format('d/m/Y') }}
        </div>
        <div class="row">
            <span class="label">Statut :</span> {{ $abonnement->actif ? 'Actif' : 'Suspendu' }}
        </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        <div class="thanks">
            <p>Merci pour votre confiance </p>
        </div>

        <div class="signature">
            <div class="signature-box">
               Cachet et Signature
            </div>
        </div>
    </div>

</body>
</html>
