import React from "react";
import { apiUrl } from "../../../env";
import Cookies from "js-cookie";
import { getToken } from "../../hooks/getToken";


export async function PaymentOtp({otp}){

        const token = getToken();

        const response = await fetch(`${apiUrl}payment-otp`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",

                "Authorization" : `Bearer ${token}`, 
                "Accept":"application/json",
            },
            body: JSON.stringify({otp})
        })

        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message || 'Erreur lors du paiement')
        }
        
        return data
}