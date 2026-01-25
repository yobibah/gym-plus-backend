<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Validation de document</title>
</head>

<body style="margin:0; padding:0; background-color:#f6f6f6; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f6f6; padding:30px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="background-color:#ff7a00; padding:18px; text-align:center; color:#ffffff;">
                            <h2 style="margin:0; font-size:22px;">Validation de document</h2>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">

                            <p>
                                Bonjour Mr <strong style="color:#ff7a00;">{{ $gerant->name }}</strong>,<br>
                                Gérant de la salle <strong style="color:#ff7a00;">{{ $salle->nom }}</strong>.
                            </p>

                            <p>
                                Un nouveau document a été soumis pour la salle
                                <strong style="color:#ff7a00;">{{ $salle->nom }}</strong>.
                            </p>

                            <p><strong>Détails du document :</strong></p>

                            <table width="100%" cellpadding="6" cellspacing="0"
                                style="border-collapse:collapse; font-size:14px; margin-top:10px;">
                                <tr>
                                    <td style="border-bottom:1px solid #eee;">Type</td>
                                    <td style="border-bottom:1px solid #eee;"><strong>{{ $document->type }}</strong></td>
                                </tr>
                                <tr>
                                    <td style="border-bottom:1px solid #eee;">Numéro d'identité</td>
                                    <td style="border-bottom:1px solid #eee;">{{ $document->numero_identite }}</td>
                                </tr>
                                <tr>
                                    <td style="border-bottom:1px solid #eee;">Recto</td>
                                    <td style="border-bottom:1px solid #eee;">{{ $document->recto }}</td>
                                </tr>
                                <tr>
                                    <td style="border-bottom:1px solid #eee;">Verso</td>
                                    <td style="border-bottom:1px solid #eee;">{{ $document->verso }}</td>
                                </tr>
                                <tr>
                                    <td style="border-bottom:1px solid #eee;">Statut</td>
                                    <td style="border-bottom:1px solid #eee;">
                                        <strong style="color:#ff7a00;">{{ $document->status }}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-bottom:1px solid #eee;">Date de soumission</td>
                                    <td style="border-bottom:1px solid #eee;">{{ $document->date_soumission }}</td>
                                </tr>

                                @if($document->date_verification)
                                <tr>
                                    <td style="border-bottom:1px solid #eee;">Date de vérification</td>
                                    <td style="border-bottom:1px solid #eee;">{{ $document->date_verification }}</td>
                                </tr>
                                @endif
                            </table>

                            <p style="margin-top:20px;">
                                Merci de vérifier et valider ce document dans les plus brefs délais.
                            </p>

                            <!-- Button -->
                            <p style="text-align:center; margin-top:25px;">
                                <a href="{{ url('/admin/documents') }}"
                                   style="background-color:#ff7a00; color:#ffffff; padding:12px 22px;
                                          text-decoration:none; border-radius:6px; font-weight:bold;
                                          display:inline-block;">
                                    Voir les documents
                                </a>
                            </p>

                            <p style="margin-top:30px;">
                                Cordialement,<br>
                                <strong>L’équipe GymPlus</strong>
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#fafafa; padding:15px; text-align:center; font-size:12px; color:#999;">
                            © {{ date('Y') }} GymPlus. Tous droits réservés.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
