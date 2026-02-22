import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";

export async function CoursProgrammer() {
    
    const token = getToken()

    const response = await fetch(`${apiUrl}cours-programmer-listes`,{
        method: "GET",
        headers: {
            "Accept-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la récuperation des cours programmés')
    }

    return data
}