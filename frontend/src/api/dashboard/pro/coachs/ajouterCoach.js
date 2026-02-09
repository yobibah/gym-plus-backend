import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";

export async function AjouterCoach({nom, prenom, telephone, competence}){
    const token = getToken()

    const response = await fetch(`${apiUrl}ajouter-coach`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({
            nom,
            prenom,
            telephone,
            competence
        })
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur d\'ajout du coach')
    }

    return data
}