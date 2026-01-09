import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";

export async function DeleteAdh({id}) {
    const token = getToken()

    const response = await fetch(`${apiUrl}delete-adherant`,{
        method : "DELETE",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({id})
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur de suppression de l\'adherant')
    }

    return data
}