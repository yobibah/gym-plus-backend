import React from "react";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function ResponseAdherant({ successAdherant, successUpdateAdh, successSupAdh }) {
    return (
        <>
            {successSupAdh && (
                <ToastSuccess title={'Succès !'} message={'Adhérant suprimmé avec succès'}/>
            )}
            {successUpdateAdh && (
                <ToastSuccess title={'Succès !'} message={'Adhérant mis à jour avec succès'}/>
            )}
            {successAdherant && (
                <ToastSuccess title={'Succès !'} message={'Adhérant ajouté avec succès'}/>
            )}
        </>
    );
}
