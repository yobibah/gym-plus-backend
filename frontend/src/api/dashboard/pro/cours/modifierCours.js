import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function UpdateCours({id, cours, niveaux}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}update-cours`,{
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({id, cours, niveaux})
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur de la modification d\'un cours')
    }
    return data
}