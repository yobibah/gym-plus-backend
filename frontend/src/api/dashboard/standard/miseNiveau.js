import React from "react";
import { apiUrl } from "../../../../env";
import { getToken } from "../../../hooks/getToken";


export async function MisNiveau({forfait}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}mis-niveau`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({forfait})
    })
    
    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la recuperation de la liste des étudiants')
    }

    return data
}