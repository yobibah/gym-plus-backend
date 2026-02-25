import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseInfoSalle({ successUpdate }) {
    return (
        <>
            {successUpdate && (
                <ToastSuccess title={'Succès !'} message={'Mise à jour réussie'}/>
            )}
        </>
    );
}
