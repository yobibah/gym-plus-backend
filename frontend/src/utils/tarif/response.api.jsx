import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseTarif({ successTarif, successTarifDel, successTarifUp }) {
    return (
        <>
             {successTarif && (
                <ToastSuccess message={'Tarif ajouté avec succès'}/>
            )}
            {successTarifUp && (
                <ToastSuccess message={'Tarif mis à jour avec succès'}/>
            )}
            {successTarifDel && (
                <ToastSuccess message={'Tarif supprimé avec succès'}/>
            )}
        </>
    );
}
