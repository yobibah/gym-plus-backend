import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseCoach({ coachSuccess, successSupCoach, modifCoachSuccess }) {
    return (
        <>
            {coachSuccess && (
                <ToastSuccess title={'Succès !'} message="Coach ajouté avec succès" />
            )}
            {successSupCoach && (
                <ToastSuccess title={'Succès !'} message={'Coach supprimé avec succès'}/>
            )}
            {modifCoachSuccess && (
                <ToastSuccess title={'Succès !'} message={'Coach mis à jour avec succès'}/>
            )}
        </>
    );
}
