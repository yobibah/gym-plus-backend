import React from "react";
import { apiUrl } from "../../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function ExpireBientot() {
    const token = getToken()

    const response = await fetch(`${apiUrl}bientot-expirer`,{
        method : "GET",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la récupération des abonnements expirés')
    }

    return data
}