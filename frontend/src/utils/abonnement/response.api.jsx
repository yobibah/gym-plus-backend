import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseAbonnement({ reabSuccess, reactSuccess, suspSuccess }) {
    return (
        <>
           {reactSuccess && (
                <ToastSuccess message={'Abonnement réactivé avec succès'}/>
            )}
            {reabSuccess && (
                <ToastSuccess message={'Abonnement renouvélé avec succès'}/>
            )}
            {suspSuccess && (
                <ToastSuccess message={'Adhérant suspendu avec succès'}/>
            )}
        </>
    );
}
