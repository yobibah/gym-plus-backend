import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseAdherant({ successAdherant, successUpdateAdh, successSupAdh }) {
    return (
        <>
            {successSupAdh && (
                <ToastSuccess message={'Adhérant suprimmé avec succès'}/>
            )}
            {successUpdateAdh && (
                <ToastSuccess message={'Adhérant mis à jour avec succès'}/>
            )}
            {successAdherant && (
                <ToastSuccess message={'Adhérant ajouté avec succès'}/>
            )}
        </>
    );
}
