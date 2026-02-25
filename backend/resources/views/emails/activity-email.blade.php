<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Nouvelle activité</title>
</head>

<body style="margin:0; padding:0; background-color:#eef2f7; font-family: Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.08);">

                    <!-- HEADER -->
                    <tr>
                        <td style="background:linear-gradient(135deg,#0f172a,#1e40af); padding:30px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0; font-size:24px; letter-spacing:0.5px;">
                                Nouvelle activité disponible
                            </h1>
                            <p style="color:#cbd5e1; margin:8px 0 0; font-size:13px;">
                                {{ $salle->nom_salle }}
                            </p>
                        </td>
                    </tr>

                    <!-- IMAGE -->
                    @php
                    $imagePath = storage_path('app/public/documents/' . $activite->images_activte);
                    @endphp

                    @if($activite->images_activte && file_exists($imagePath))
                    <tr>
                        <td style="padding:0;">
                            <img src="{{ $message->embed($imagePath) }}"
                                style="width:100%; display:block;">
                        </td>
                    </tr>
                    @endif

                    <!-- BODY -->
                    <tr>
                        <td style="padding:30px; color:#334155;">

                            <h2 style="color:#1e40af; margin-top:0; font-size:20px;">
                                {{ $activite->nom_activite }}
                            </h2>

                            <p style="font-size:14px; line-height:1.7; color:#475569;">
                                {{ $activite->descriptions }}
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px; font-size:14px;">
                                <tr>
                                    <td style="padding:8px 0;">
                                        <i class="bi bi-calendar-day"></i> <strong>Date :</strong> {{ $activite->date_activite }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0;">
                                        <i class="bi bi-stopwatch"></i> <strong>Heure :</strong> {{ $activite->heure_activite }}
                                    </td>
                                </tr>
                            </table>

                            <!-- BOUTON -->
                            <div style="text-align:center; margin-top:30px;">
                                <a href="#"
                                    style="background:#1e40af; 
                          color:#ffffff; 
                          padding:14px 28px; 
                          text-decoration:none; 
                          border-radius:8px; 
                          font-weight:bold;
                          font-size:14px;
                          display:inline-block;
                          box-shadow:0 4px 12px rgba(30,64,175,0.3);">
                                    Voir plus de détails
                                </a>
                            </div>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="background:#f1f5f9; padding:20px; text-align:center; font-size:12px; color:#64748b;">
                            © {{ date('Y') }} {{ $salle->nom_salle }}
                            <br>
                            Tous droits réservés.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>