import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function UpdateAdh({id, nom, prenom, email, telephone}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}update-adherant`,{
        method: "POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({id, nom, prenom, telephone, email})
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur de la modification d\'un adherant')
    }
    return data
}