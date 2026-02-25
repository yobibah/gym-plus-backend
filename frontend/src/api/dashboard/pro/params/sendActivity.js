import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function SendActivity({id}){

    const token = getToken()

    const response = await fetch(`${apiUrl}send-activite-to-user`,{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({id})
    })

    const data = await response.json()
    if(!response.ok) {
        throw new Error(data.message || 'Erreur de l\'envoie de l\'actiivte')
    }

    return data
}