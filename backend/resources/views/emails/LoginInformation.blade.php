<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation & informations de connexion</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background-color:#f4f4f4;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff; padding:30px; border-radius:8px;
                           box-shadow:0 2px 8px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="text-align:center; padding-bottom:20px;">
                            <h2 style="margin:0; color:#ff7a00;">
                                Bienvenue sur GymPlus
                            </h2>
                        </td>
                    </tr>

                    <!-- Success message -->
                    <tr>
                        <td style="background-color:#fff7ed; padding:12px;
                                   border-left:5px solid #ff7a00;
                                   border-radius:4px; margin-bottom:20px;">
                            <strong style="color:#ff7a00;">
                                Compte créé avec succès 🎉
                            </strong>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="color:#333333; font-size:15px; line-height:1.6; padding-top:15px;">

                            <p>Voici vos informations de connexion :</p>

                            <table cellpadding="6" cellspacing="0" style="font-size:15px;">
                                <tr>
                                    <td><strong>Nom d'utilisateur :</strong></td>
                                    <td style="color:#ff7a00;">{{ $username }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mot de passe :</strong></td>
                                    <td style="color:#ff7a00;">{{ $mdp }}</td>
                                </tr>
                            </table>

                            <p style="margin-top:20px;">
                                Merci d’utiliser notre service.<br>
                                Nous vous souhaitons une excellente expérience sur GymPlus 💪
                            </p>

                            <p style="margin-top:25px;">
                                Cordialement,<br>
                                <strong>L’équipe GymPlus</strong>
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
