import React from "react";
import { apiUrl } from "../../../env";
import Cookies from "js-cookie";
import { getToken } from "../../hooks/getToken";

export async function infosSalle({formData}){


    const token = getToken();   
    
    const response = await fetch(`${apiUrl}info-salle`,{
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`, 
        },
        body: formData
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur de recup de données')
    }

    return data
}