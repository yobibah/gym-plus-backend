import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function ProgrammerCours({cours_id, ahderent_id, jours, horaire, prof_id}){

    const token = getToken()

    const response = await fetch(`${apiUrl}programmer-cours`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({cours_id, ahderent_id, jours, horaire, prof_id })
    })
    
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'erreur de programmation de cours')
    }

    return data
}