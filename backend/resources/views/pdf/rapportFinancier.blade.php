<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Rapport Financier</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 13px;
            color: #333;
            line-height: 1.6;
        }

        h1 {
            text-align: center;
            margin-bottom: 30px;
        }

        h2 {
            background: #f2f2f2;
            padding: 8px;
            font-size: 15px;
            margin-top: 25px;
        }

        .section {
            margin-bottom: 20px;
        }

        .danger {
            color: #c0392b;
            font-weight: bold;
        }

        .success {
            color: #27ae60;
            font-weight: bold;
        }

        ul {
            margin: 10px 0;
            padding-left: 20px;
        }

        .footer {
            margin-top: 40px;
            font-size: 11px;
            text-align: center;
            color: #888;
        }

        .box {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

    </style>
</head>
<body>

<h1>📊 Rapport Financier Mensuel</h1>

<div class="section box">
    <h2>1. Résumé Exécutif</h2>
    <p class="danger">{{ $report['resume_executif'] }}</p>
</div>

<div class="section box">
    <h2>2. Analyse des Revenus</h2>
    <p>{{ $report['analyse_revenus'] }}</p>
</div>



<div class="section box">
    <h2>4. Rentabilité</h2>
    <p class="danger">{{ $report['rentabilite'] }}</p>
</div>

<div class="section box">
    <h2>5. Points d’Attention</h2>
    <ul>
        @foreach($report['points_attention'] as $point)
            <li>{{ $point }}</li>
        @endforeach
    </ul>
</div>

<div class="section box">
    <h2>6. Recommandations Stratégiques</h2>

    <strong>Actions Immédiates :</strong>
    <ul>
        @foreach($report['recommandations_strategiques']['immediates'] as $rec)
            <li>{{ $rec }}</li>
        @endforeach
    </ul>

    <strong>Moyen Terme :</strong>
    <ul>
        @foreach($report['recommandations_strategiques']['moyen_terme'] as $rec)
            <li>{{ $rec }}</li>
        @endforeach
    </ul>

    <strong>Analyse de Données :</strong>
    <ul>
        @foreach($report['recommandations_strategiques']['analyse_donnees'] as $rec)
            <li>{{ $rec }}</li>
        @endforeach
    </ul>
</div>

<div class="section box">
    <h2>Conclusion</h2>
    <p class="danger">{{ $report['conclusion'] }}</p>
</div>

<div class="footer">
    Généré automatiquement le  {{ now()->format('d/m/Y') }} par <strong>GymPlus</strong>
</div>

</body>
</html>