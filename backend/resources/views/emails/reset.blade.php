<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Réinitialisation du mot de passe - GymPlus</title>
</head>

<body style="margin:0; padding:0; background-color:#fff7ed; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background-color:#fff7ed;">
        <tr>
            <td align="center">

                <table width="480" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff; border-radius:16px;
                           box-shadow:0 6px 20px rgba(0,0,0,0.08);
                           overflow:hidden; border:1px solid #fed7aa;">

                    <!-- Header -->
                    <tr>
                        <td style="background-color:#ff7a00; padding:24px; text-align:center; color:#ffffff;">
                            <h1 style="margin:0; font-size:22px;">
                                Réinitialisation du mot de passe
                            </h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:24px; color:#374151; font-size:15px; line-height:1.6;">

                            <p>
                                Bonjour <strong style="color:#ff7a00;">{{ $user->nom }}</strong> 👋,
                            </p>

                            <p>
                                Nous avons reçu une demande de réinitialisation de votre
                                mot de passe sur <strong>GymPlus</strong>.
                            </p>

                            <p>
                                Cliquez sur le bouton ci-dessous pour en créer un nouveau :
                            </p>

                            <!-- Button -->
                            <p style="text-align:center; margin:28px 0;">
                                <a href="{{ $resetLink }}"
                                   style="background-color:#ff7a00; color:#ffffff;
                                          text-decoration:none; font-weight:bold;
                                          padding:14px 26px; border-radius:8px;
                                          display:inline-block;
                                          box-shadow:0 4px 10px rgba(255,122,0,0.4);">
                                    Réinitialiser mon mot de passe
                                </a>
                            </p>

                            <p>
                                Si vous n’êtes pas à l’origine de cette demande,
                                vous pouvez ignorer cet email.
                                Votre mot de passe restera inchangé.
                            </p>

                            <p style="margin-top:25px;">
                                Cordialement,<br>
                                <strong>L’équipe GymPlus</strong>
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#fff1e6; padding:16px;
                                   text-align:center; font-size:12px; color:#92400e;">
                            © {{ date('Y') }} GymPlus. Tous droits réservés.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
