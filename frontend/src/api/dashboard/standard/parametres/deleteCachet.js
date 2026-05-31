import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function DeleteCachet() {
    const token = getToken()

    const response = await fetch(`${apiUrl}delete-cachet`,{
        method : "DELETE",
        headers : {
            "Authorization" : `Bearer ${token}`
        },
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la suppression du logo')
    }

    return data
}