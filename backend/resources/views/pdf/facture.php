<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Reçu d'abonnement</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 13px;
            color: #1f2937;
            margin: 20px;
        }

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
        }

        h2 {
            font-size: 16px;
            border-bottom: 1px solid #d1d5db;
            padding-bottom: 5px;
            margin-bottom: 10px;
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
            <h1>Reçu d'abonnement</h1>
            <p>Salle : <strong>{{ $salle->nom ?? 'N/A' }}</strong></p>
        </div>
    </div>

    <!-- ADHÉRENT -->
    <div class="section">
        <h2>Informations de l'adhérent</h2>
        <div class="row"><span class="label">Nom :</span> {{ $user->name }} {{ $user->prenom }}</div>
        <div class="row"><span class="label">Email :</span> {{ $user->email }}</div>
        <div class="row"><span class="label">Téléphone :</span> {{ $user->telephone ?? 'N/A' }}</div>
    </div>

    <!-- ABONNEMENT -->
    <div class="section">
        <h2>Détails de l'abonnement</h2>
        <div class="row"><span class="label">Plan :</span> {{ strtoupper($abonnement->plan) }}</div>
        <div class="row">
            <span class="label">Date de début :</span>
            {{ \Carbon\Carbon::parse($abonnement->debut)->format('d/m/Y') }}
        </div>
        <div class="row">
            <span class="label">Date de fin :</span>
            {{ \Carbon\Carbon::parse($abonnement->fin)->format('d/m/Y') }}
        </div>
        <div class="row">
            <span class="label">Statut :</span>
            {{ $abonnement->actif ? 'Actif' : 'Suspendu' }}
        </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        <div class="thanks">
            <p>Merci pour votre confiance 🙏</p>
        </div>

        <div class="signature">
            <div class="signature-box">
                Signature
            </div>
        </div>
    </div>

</body>
</html>
