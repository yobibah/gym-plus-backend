import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";

export async function Suspendre({id}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}suspendre-abonnement`,{
        method: "POST",
        headers:{
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({id})
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la suspension')
    }
    return data
}