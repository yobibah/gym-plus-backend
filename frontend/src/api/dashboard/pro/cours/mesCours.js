import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";

export async function MesCours({queryKey}) {
    
    const token = getToken()
    const [_key, page] = queryKey

    const response = await fetch(`${apiUrl}mes-cours?page=${page}`,{
        method: "GET",
        headers: {
            "Accept-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la récuperation des cours')
    }

    return data
}