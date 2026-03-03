import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseExportData({ dataExportSuccess, rapportSuccess}) {
    return (
        <>
            {dataExportSuccess && (
                <ToastSuccess title={'Exportatation réussie !'} message={'Données téléchargées avec succès.'}/>
            )}

            {rapportSuccess && (
                <ToastSuccess title={'Analyse réussie !'} message={'Le rapport vous ait été envoyé via votre adresse e-mail.'}/>
            )}
        </>
    );
}
