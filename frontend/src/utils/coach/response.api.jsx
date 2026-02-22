import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseCoach({ coachSuccess, successSupCoach, modifCoachSuccess }) {
    return (
        <>
            {coachSuccess && (
                <ToastSuccess message="Coach ajouté avec succès" />
            )}
            {successSupCoach && (
                <ToastSuccess message={'Coach supprimé avec succès'}/>
            )}
            {modifCoachSuccess && (
                <ToastSuccess message={'Coach mis à jour avec succès'}/>
            )}
        </>
    );
}
