import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";

export async function NombreReactiver() {
    
    const token = getToken()

    const response = await fetch(`${apiUrl}nbr-reactiver`,{
        method: "GET",
        headers: {
            "Accept-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la récuperation du nombre reactiver')
    }

    return data
}