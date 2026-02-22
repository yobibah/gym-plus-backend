import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function getActivity() {
    const token = getToken()

    const response = await fetch(`${apiUrl}mes-activites`,{
        method : "GET",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    
    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la recuperation des activités')
    }

    return data
}