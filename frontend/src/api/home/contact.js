import React from "react";
import { apiUrl } from "../../../../env";

export async function ContactHome({email, message}){

        const response = await fetch(`${apiUrl}accueil-form`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify({email, message})
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message || 'Echec! réeesayez')
        }

        return data
            
    }