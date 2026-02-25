import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseInfoPerso({ persoSuccess, passwordSuccess }) {
    return (
        <>
             {persoSuccess && (
                <ToastSuccess title={'Succès !'} message={'Mise à jour réussie'}/>
            )}
            {passwordSuccess && (
                <ToastSuccess title={'Succès !'} message={'Mot de passe mis à jour avec succès'}/>
            )}
        </>
    );
}
