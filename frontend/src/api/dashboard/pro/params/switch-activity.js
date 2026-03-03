
import React from "react";
import { getToken } from "../../../../hooks/getToken";
import { apiUrl } from "../../../../../env";

export async function SwitchStatut({id}){

        const token = getToken()

        const response = await fetch(`${apiUrl}switch-status`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify({id})
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message || 'Erreur de mis à jour du status')
        }
    
        return data
    }