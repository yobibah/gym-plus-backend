import React from "react";
import { apiUrl } from "../../../../../../env";
import { getToken } from "../../../../hooks/getToken";

export async function UpdateinfosSalle({nom_salle, pays, region}){


    const token = getToken();   
    
    const response = await fetch(`${apiUrl}update-infos`,{
        method: "PUT",
        headers: {
            "Content" : "application/json",
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`, 
        },
        body: JSON.stringify({nom_salle, pays, region})
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur de mise à jour des infos de la salle')
    }

    return data
}