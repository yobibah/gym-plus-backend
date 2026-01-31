import React from "react";
import { apiUrl } from "../../env";

export async function ListPays() {
     
    const response = await fetch(`${apiUrl}pays`,{
        method: "GET",
        headers:{
            "Accept-Type" : "application/json"
        }
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la récupération de données')
    }

    return data
}