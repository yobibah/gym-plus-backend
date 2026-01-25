<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Bienvenue chez {{ $nom_salle }} - GymPlus</title>
</head>

<body style="margin:0; padding:0; background-color:#fff7ed; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background-color:#fff7ed;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                       style="background-color:#ffffff; border-radius:12px; padding:30px;
                              box-shadow:0 6px 18px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="text-align:center; padding-bottom:20px;">
                            <h1 style="margin:0; font-size:24px; color:#ff7a00;">
                                Bienvenue {{ $prenom }} {{ $username }} ! 🎉
                            </h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="color:#333333; font-size:16px; line-height:1.6;">

                            <p>
                                Vous êtes maintenant membre de la salle
                                <strong style="color:#ff7a00;">{{ $nom_salle }}</strong>,
                                située dans
                                <strong style="color:#ff7a00;">{{ $region_salle }}</strong>.
                            </p>

                            <p>
                                Pour toute question, vous pouvez contacter la salle au :
                                <strong style="color:#ff7a00;">{{ $contact }}</strong>.
                            </p>

                            <!-- Button -->
                            <p style="text-align:center; margin-top:25px;">
                                <a href="#"
                                   style="background-color:#ff7a00; color:#ffffff;
                                          text-decoration:none; padding:12px 25px;
                                          border-radius:8px; font-weight:bold;
                                          display:inline-block;">
                                    Voir votre abonnement
                                </a>
                            </p>

                            <p style="margin-top:25px;">
                                — L’équipe <strong>{{ $nom_salle }}</strong>
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding-top:30px; font-size:12px; color:#92400e; text-align:center;">
                            Vous recevez ce mail car vous êtes inscrit à
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
