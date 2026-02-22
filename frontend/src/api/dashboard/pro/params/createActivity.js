import React from "react";
import { getToken } from "../../../../hooks/getToken";
import { apiUrl } from "../../../../../env";

export async function CreateActivity({formData}){

        const token = getToken()

        const response = await fetch(`${apiUrl}info-activite`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(formData)
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message || 'Erreur d\'envoie')
        }
    
        return data
    }