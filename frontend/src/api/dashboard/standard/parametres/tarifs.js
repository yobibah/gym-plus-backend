import React from "react";
import { apiUrl } from "../../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function Tarifs({montant_1,montant_2,montant_3}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}ajouter-mes-prix`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({montant_1,montant_2,montant_3})
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur d\'ajout du tarif')
    }

    return data
}