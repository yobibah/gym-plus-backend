import React from "react";
import { apiUrl } from "../../../../../env";
import { getToken } from "../../../../hooks/getToken";


export async function MesInfos(){
    const token = getToken()

    const response = await fetch(`${apiUrl}mes-infos`,{
        method : "GET",
        headers : {
            "Accept" : "Application/json",
            "Authorization" : `Bearer ${token}`
        }
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la récupération des infos')
    }
    return data
}