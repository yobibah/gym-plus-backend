import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseActivity({ activitySuccess, activityUpdateSuccess, activityDelSuccess, sendSuccess }) {
    return (
        <>
            {activityDelSuccess && (
                <ToastSuccess title={'Succès !'} message={'Activité suprimmée avec succès'}/>
            )}
            {activityUpdateSuccess && (
                <ToastSuccess title={'Succès !'} message={'Activité mise à jour avec succès'}/>
            )}
            {activitySuccess && (
                <ToastSuccess title={'Succès !'} message={'Activité enregistrée avec succès'}/>
            )}

            {sendSuccess && (
                <ToastSuccess title={'Envoie réussi !'} message={'Vos adhérants seront notifiés de cette activité'}/>
            )}
        </>
    );
}
