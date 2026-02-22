import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseLogo({ logoDelSuccess, logoEditSuccess, logoSuccess }) {
    return (
        <>
            {logoSuccess && (
                <ToastSuccess message={'Logo ajouté avec succès'}/>
            )}
            {logoEditSuccess && (
                <ToastSuccess message={'Logo mis à jour avec succès'}/>
            )}
            {logoDelSuccess && (
                <ToastSuccess message={'Logo supprimé avec succès'}/>
            )}
        </>
    );
}
