<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Mot de passe modifié</title>
</head>

<body style="margin:0; padding:0; background-color:#f6f6f6; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f6f6; padding:20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="background-color:#ff7a00; padding:20px; text-align:center; color:#ffffff;">
                            <h1 style="margin:0; font-size:22px;">GymPlus</h1>
                            <p style="margin:5px 0 0; font-size:14px;">
                                Mot de passe modifié
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
                            <p>
                                Bonjour <strong>{{ $user->name }}</strong>,<br>
                                Gérant de la salle <strong>{{ $user->salle->nom_salle }}</strong>
                            </p>

                            <p>
                                Votre mot de passe a été modifié avec succès

                            </p>

                            <p>
                                Si vous n'avez pas modifié votre mot de passe, vous devez immédiatement le réinitialiser
                            </p>

                            <p style="margin-top:30px;">
                                Cordialement,<br>
                                <strong>L’équipe GymPlus</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#fafafa; padding:15px; text-align:center; font-size:12px; color:#888888;">
                            &copy; {{ date('Y') }} GymPlus. Tous droits réservés.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>

</html>