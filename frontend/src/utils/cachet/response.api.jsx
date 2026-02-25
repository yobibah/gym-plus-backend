import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseCachet({ signDelSuccess, signEditSuccess, signSuccess }) {
    return (
        <>
            {signSuccess && (
                <ToastSuccess title={'Succès !'} message={'Emprunt ajouté avec succès'}/>
            )}
            {signEditSuccess && (
                <ToastSuccess title={'Succès !'} message={'Emprunt mis à jour avec succès'}/>
            )}
            {signDelSuccess && (
                <ToastSuccess title={'Succès !'} message={'Emprunt supprimé avec succès'}/>
            )}
        </>
    );
}
