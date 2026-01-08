import React from "react";
import { apiUrl } from "../../../../../../env";
import { getToken } from "../../../../hooks/getToken";

export async function Reabonner({id, email, plan}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}reabonner-adherant`,{
        method: "POST",
        headers:{
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({id, email, plan})
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors du reabonnement')
    }
    return data
}