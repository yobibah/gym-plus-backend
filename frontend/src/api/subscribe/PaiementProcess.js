import React from "react";
import { apiUrl } from "../../../env";
import Cookies from "js-cookie";
import { getToken } from "../../hooks/getToken";
// import { token } from "../../hooks/getToken";


export async function PaymentProcess({numero, montant, forfait}){

        const token = getToken();

        const response = await fetch(`${apiUrl}payment-process`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",

                "Authorization" : `Bearer ${token}`, 
                "Accept":"application/json",
            },
            body: JSON.stringify({numero, montant, forfait, type, provider})
        })

        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message || 'Erreur lors du paiement')
        }
        
        return data
}