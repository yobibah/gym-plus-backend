import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseExportData({ dataExportSuccess}) {
    return (
        <>
            {dataExportSuccess && (
                <ToastSuccess title={'Exportatation réussie !'} message={'Données téléchargées avec succès.'}/>
            )}
        </>
    );
}
