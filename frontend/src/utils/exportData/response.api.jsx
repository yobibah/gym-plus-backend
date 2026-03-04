import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseExportData({ dataExportSuccess, financeSuccess }) {
    return (
        <>
            {dataExportSuccess && (
                <ToastSuccess title={'Exportatation réussie !'} message={'Données téléchargées avec succès.'}/>
            )}

            {financeSuccess && (
                <ToastSuccess title={'Analyse réussie !'} message={'Le rapport vous ait été envoyé via votre adresse e-mail.'}/>
            )}
            
        </>
    );
}
