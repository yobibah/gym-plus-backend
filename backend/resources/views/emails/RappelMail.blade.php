<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Abonnement expiré</title>
</head>

<body style="margin:0; padding:0; background-color:#f6f6f6; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0; background-color:#f6f6f6;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff; border-radius:8px; padding:30px;
                           box-shadow:0 2px 6px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="background-color:#ff7a00; padding:18px; text-align:center; color:#ffffff;
                                   border-radius:8px 8px 0 0;">
                            <h2 style="margin:0;">Abonnement expiré</h2>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">

                            <p>
                                Bonjour <strong>{{ $user->name }}</strong>,
                            </p>

                            <p>
                                Nous vous informons que votre abonnement est
                                <strong style="color:#ff7a00;">arrivé à expiration</strong>.
                            </p>

                            <p>
                                Merci de le renouveler afin de continuer
                                à accéder aux services de votre salle.
                            </p>

                            <p style="margin-top:25px;">
                                — <strong>L’équipe GymPlus</strong> 💪
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#fafafa; padding:15px; text-align:center;
                                   font-size:12px; color:#999;">
                            © {{ date('Y') }} GymPlus. Tous droits réservés.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
