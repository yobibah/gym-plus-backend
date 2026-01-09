import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function DeleteTarif() {
    const token = getToken()

    const response = await fetch(`${apiUrl}delete-info`,{
        method : "DELETE",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la suppression des tarifs')
    }

    return data
}