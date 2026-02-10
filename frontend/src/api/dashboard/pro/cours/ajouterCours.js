import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";

export async function AjouterCours({cours, niveaux}){
    const token = getToken()

    const response = await fetch(`${apiUrl}ajouter-cours`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({
            cours,
            niveaux
        })
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur d\'ajout du cours')
    }

    return data
}