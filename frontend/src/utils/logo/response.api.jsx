import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseLogo({ logoDelSuccess, logoEditSuccess, logoSuccess }) {
    return (
        <>
            {logoSuccess && (
                <ToastSuccess title={'Succès !'} message={'Logo ajouté avec succès'}/>
            )}
            {logoEditSuccess && (
                <ToastSuccess title={'Succès !'} message={'Logo mis à jour avec succès'}/>
            )}
            {logoDelSuccess && (
                <ToastSuccess title={'Succès !'} message={'Logo supprimé avec succès'}/>
            )}
        </>
    );
}
