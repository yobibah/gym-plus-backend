import React from "react";
import { apiUrl } from "../../../../env";
import Cookies from "js-cookie";
import { token } from "../../hooks/getToken";


export async function Payment({forfait, montant}){

        const response = await fetch(`${apiUrl}payment`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",

                "Authorization" : `Bearer ${token}`, 
                "Accept":"application/json",
            },
            body: JSON.stringify({forfait, montant})
        })

        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message || 'Erreur lors du paiement')
        }
        
        return data
}