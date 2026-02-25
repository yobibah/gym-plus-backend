import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseCours({ successAddCours, successSupCours, successUpdateCours, programSuccess }) {
    return (
        <>
            {successSupCours && (
                <ToastSuccess title={'Succès !'} message={'Cours suprimmé avec succès'}/>
            )}
            {successUpdateCours && (
                <ToastSuccess title={'Succès !'} message={'Cours mis à jour avec succès'}/>
            )}
            {programSuccess && (
                <ToastSuccess title={'Succès !'} message={'Cours programmé avec succès'}/>
            )}
            {successAddCours && (
                <ToastSuccess title={'Succès !'} message={'Cours ajouté avec succès'}/>
            )}
        </>
    );
}
