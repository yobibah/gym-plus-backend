import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseAbonnement({ reabSuccess, reactSuccess, suspSuccess }) {
    return (
        <>
           {reactSuccess && (
                <ToastSuccess title={'Succès !'} message={'Abonnement réactivé avec succès'}/>
            )}
            {reabSuccess && (
                <ToastSuccess title={'Succès !'} message={'Abonnement renouvélé avec succès'}/>
            )}
            {suspSuccess && (
                <ToastSuccess title={'Succès !'} message={'Adhérant suspendu avec succès'}/>
            )}
        </>
    );
}
