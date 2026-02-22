import React from "react";
import ToastError from "../components/ui/ToastError";

export default function ResponseError({ 

    coachError, errorTarif,
    errorTarifUp, errorTarifDel,
    persoError, passwordError,
    signDelError, signEditError, signError,
    logoDelError, logoEditError, logoError,
    updateError, errorAdherant, errorUpdateAdh,
    errorAddCours, reabError, dataExportError,
    reactError, programError, modifCoachError,
    suspError, errorSupCours, errorSupAdh,
    errorSupCoach, activityError

 }) {

    return (
        <>
            {
                coachError || errorTarif || 
                errorTarifUp || errorTarifDel || 
                persoError || passwordError || 
                signError || signEditError || signDelError || 
                logoError || logoEditError || logoDelError ||
                updateError || errorAdherant || errorUpdateAdh ||
                errorAddCours || reabError || dataExportError ||
                programError || modifCoachError || reactError ||
                suspError || errorSupCours || errorSupAdh || errorSupCoach || activityError && (
                    
                <ToastError message={'Une erreur est survenue! Veuillez réessayer'}/>
            )}
        </>
    );
}
