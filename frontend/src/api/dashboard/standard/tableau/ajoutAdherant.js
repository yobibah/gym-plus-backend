import React from "react";
import { getToken } from "../../../../hooks/getToken";
import { apiUrl } from "../../../../../../env";

export async function AjouterAdherant({form}){

        const token = getToken()

        const response = await fetch(`${apiUrl}ajouter-adherant`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(form)
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message || 'Erreur d\'envoie')
        }
    
        return data
    }