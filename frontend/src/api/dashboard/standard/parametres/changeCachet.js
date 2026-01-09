import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function UpdateCachet({formData}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}update-cachet`,{
        method : "POST",
        headers : {
            "Accept" : "application/jsob",
            "Authorization" : `Bearer ${token}`
        },
        body : formData
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur de mise à jour du cachet')
    }

    return data
}