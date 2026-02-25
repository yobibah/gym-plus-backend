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
    errorSupCoach, activityError, errorSupActivity,
    errorUpdateActivity, sendError

 }) {

    return (
        <>
            {
                (coachError || errorTarif || sendError ||
                errorTarifUp || errorTarifDel || errorSupActivity ||
                persoError || passwordError || 
                signError || signEditError || signDelError || 
                logoError || logoEditError || logoDelError ||
                updateError || errorAdherant || errorUpdateAdh ||
                errorAddCours || reabError || dataExportError ||
                programError || modifCoachError || reactError || errorUpdateActivity ||
                suspError || errorSupCours || errorSupAdh || errorSupCoach || activityError) && (
                    
                
                <ToastError title={'Erreur survenue !'} message={'Une erreur est survenue, vérifier vos informationset réesssayez à nouveau.'}/>
            )}
        </>
    );
}
