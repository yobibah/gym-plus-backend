import React from "react";
import { getToken } from "../../../../hooks/getToken";
import { apiUrl } from "../../../../../env";

export async function Recette() {
    const token = getToken()

    const response = await fetch(`${apiUrl}recette`,{
        method : "GET",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`

        }  
    })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message || 'Erreur lors de la récupération des recette')
        }

        return data
}