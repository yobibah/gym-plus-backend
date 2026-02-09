import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function UpdateCoach({id, nom, prenom, telephone, competence}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}update-coach`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({id, nom, prenom, telephone, email, competence})
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur de la modification d\'un coach')
    }
    return data
}