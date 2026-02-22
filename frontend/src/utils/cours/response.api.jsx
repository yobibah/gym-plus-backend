import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseCours({ successAddCours, successSupCours, successUpdateCours, programSuccess }) {
    return (
        <>
            {successSupCours && (
                <ToastSuccess message={'Cours suprimmé avec succès'}/>
            )}
            {successUpdateCours && (
                <ToastSuccess message={'Cours mis à jour avec succès'}/>
            )}
            {programSuccess && (
                <ToastSuccess message={'Cours programmé avec succès'}/>
            )}
            {successAddCours && (
                <ToastSuccess message={'Cours ajouté avec succès'}/>
            )}
        </>
    );
}
