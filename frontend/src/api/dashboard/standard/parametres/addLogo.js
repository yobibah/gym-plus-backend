import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function addLogo({formData}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}ajouter-logo`,{
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : formData
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur d\'upload du logo')
    }

    return data
}