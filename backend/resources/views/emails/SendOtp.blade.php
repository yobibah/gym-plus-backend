<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Vérification du compte - GymPlus</title>
</head>

<body style="margin:0; padding:0; background-color:#fff7ed; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background-color:#fff7ed;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                       style="background-color:#ffffff; border-radius:12px; border:1px solid #fed7aa;
                              padding:25px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td style="text-align:center; padding-bottom:15px;">
                            <h2 style="margin:0; color:#ff7a00;">Vérification de votre compte</h2>
                            <p style="margin-top:10px; color:#374151;">
                                Bonjour <strong>{{ $user->prenom }} {{ $user->nom }}</strong>,
                            </p>
                        </td>
                    </tr>

                    <!-- Instructions -->
                    <tr>
                        <td style="color:#333333; font-size:15px; line-height:1.6; padding-top:10px;">
                            <p>
                                Merci d’avoir créé un compte chez <strong>GymPlus</strong>.
                                Pour continuer, veuillez entrer le code ci-dessous :
                            </p>

                            <!-- OTP Box -->
                            <div style="font-size:28px; font-weight:bold; letter-spacing:6px;
                                        text-align:center; padding:15px; background:#fff2e6;
                                        border:1px solid #ffcc99; border-radius:8px;
                                        color:#ff7a00; margin:20px 0;">
                                {{ $otp }}
                            </div>

                            <p>
                                Ce code est valable pendant <strong>10 minutes</strong>.
                            </p>

                            <p>
                                Si vous n’êtes pas à l’origine de cette demande, ignorez simplement ce message.
                            </p>

                            <!-- Button -->
                            <p style="text-align:center; margin-top:20px;">
                                <a href="#"
                                   style="background-color:#ff7a00; color:#ffffff;
                                          text-decoration:none; padding:12px 24px;
                                          border-radius:8px; font-weight:bold;
                                          display:inline-block;">
                                    Valider mon compte
                                </a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding-top:25px; font-size:12px; color:#92400e; text-align:center;">
                            © {{ date('Y') }} GymPlus. Tous droits réservés.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
