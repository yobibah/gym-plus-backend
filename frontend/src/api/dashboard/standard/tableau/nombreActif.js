import React from "react";
import { getToken } from "../../../../hooks/getToken";
import { apiUrl } from "../../../../../env";


export async function FetchNombreActif(){

        const token = getToken()

        const response = await fetch(`${apiUrl}nbr-adherant-actif`,{
            method : 'GET',
            headers : {
                "Accept" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })

        const data = await response.json()
        if(!response.json){
            throw new Error(data.message || 'Erreur de recup du nombre actif d\'adherant')
        }

        return data
       
    }