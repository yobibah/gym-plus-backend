import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseTarif({ successTarif, successTarifDel, successTarifUp }) {
    return (
        <>
             {successTarif && (
                <ToastSuccess title={'Succès'} message={'Tarif ajouté avec succès! Maintenant vous pouvez l\'utiliser dans les abonnements.'}/>
            )}
            {successTarifUp && (
                <ToastSuccess title={'Succès'} message={'Tarif mis à jour avec succès!'}/>
            )}
            {successTarifDel && (
                <ToastSuccess title={'Succès'} message={'Tarif supprimé avec succès'}/>
            )}
        </>
    );
}
