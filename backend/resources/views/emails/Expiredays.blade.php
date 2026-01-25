<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Rappel d'abonnement</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0; background-color:#f4f6f8;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff; border-radius:10px; padding:30px;
                           box-shadow:0 4px 8px rgba(0,0,0,0.1);">

                    <!-- Title -->
                    <tr>
                        <td style="text-align:center; padding-bottom:20px;">
                            <h1 style="margin:0; color:#ff7a00; font-size:24px;">
                                Bonjour {{ $user->name }} 👋
                            </h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="color:#333333; font-size:16px; line-height:1.6;">

                            <p>
                                Votre abonnement à la salle
                                <strong style="color:#ff7a00;">{{ $salle->nom_salle }}</strong>
                                expirera dans exactement
                                <strong style="color:#ff7a00;">07 jours</strong>.
                            </p>

                            <p>
                                Merci de renouveler votre abonnement afin de continuer
                                à profiter pleinement de tous les services de la salle.
                            </p>

                            <p style="margin-top:25px;">
                                — <strong>L’équipe {{ $salle->nom_salle }}</strong> 💪
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding-top:30px; text-align:center; font-size:14px; color:#777777;">
                            Vous recevez ce mail car vous êtes inscrit à
                            <strong>{{ $salle->nom_salle }}</strong>.<br>
                            Merci de ne pas répondre à ce message.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
