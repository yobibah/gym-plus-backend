import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseActivity({ activitySuccess, activityUpdateSuccess, activityDelSuccess }) {
    return (
        <>
            {activityDelSuccess && (
                <ToastSuccess message={'Activité suprimmée avec succès'}/>
            )}
            {activityUpdateSuccess && (
                <ToastSuccess message={'Activité mise à jour avec succès'}/>
            )}
            {activitySuccess && (
                <ToastSuccess message={'Activité enregistrée avec succès'}/>
            )}
        </>
    );
}
