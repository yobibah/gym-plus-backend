import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseCachet({ signDelSuccess, signEditSuccess, signSuccess }) {
    return (
        <>
            {signSuccess && (
                <ToastSuccess message={'Emprunt ajouté avec succès'}/>
            )}
            {signEditSuccess && (
                <ToastSuccess message={'Emprunt mis à jour avec succès'}/>
            )}
            {signDelSuccess && (
                <ToastSuccess message={'Emprunt supprimé avec succès'}/>
            )}
        </>
    );
}
