<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Réabonnement confirmé</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background-color:#f4f6f8;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff; border-radius:12px; padding:30px;
                           box-shadow:0 6px 18px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="text-align:center; padding-bottom:20px;">
                            <h1 style="margin:0; font-size:24px; color:#ff7a00;">
                                Réabonnement confirmé 🎉
                            </h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="color:#333333; font-size:16px; line-height:1.7;">

                            <p>
                                Bonjour <strong>{{ $prenom }} {{ $username }}</strong> 👋
                            </p>

                            <p>
                                Votre réabonnement à la salle
                                <strong style="color:#ff7a00;">{{ $nom_salle }}</strong>,
                                située à
                                <strong style="color:#ff7a00;">{{ $region_salle }}</strong>,
                                a bien été pris en compte.
                            </p>

                            <!-- Success box -->
                            <div style="background-color:#fff7ed; border-left:5px solid #ff7a00;
                                        padding:15px; margin:20px 0; border-radius:6px;">
                                <strong style="color:#ff7a00;">✅ Réabonnement effectué avec succès</strong><br>
                                Vous pouvez continuer à profiter pleinement des services de la salle.
                            </div>

                            <p>
                                Pour toute question, vous pouvez contacter la salle au :
                                <strong style="color:#ff7a00;">{{ $contact }}</strong>
                            </p>

                            <!-- Button -->
                            <p style="text-align:center; margin-top:25px;">
                                <a href="#"
                                   style="background-color:#ff7a00; color:#ffffff;
                                          padding:12px 28px; text-decoration:none;
                                          border-radius:8px; font-weight:bold;
                                          display:inline-block;">
                                    Voir mon abonnement
                                </a>
                            </p>

                            <p style="margin-top:30px;">
                                — L’équipe <strong>{{ $nom_salle }}</strong> 💪
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding-top:35px; font-size:13px; color:#777777; text-align:center;">
                            Vous recevez cet email car vous êtes inscrit à
                            <strong>{{ $nom_salle }}</strong> via GymPlus.<br>
                            Merci de ne pas répondre à ce message.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
