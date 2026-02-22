import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function addCachet({formData}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}ajouter-cachet`,{
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : formData
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur d\'upload du cachet')
    }

    return data
}