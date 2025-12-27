import React from "react";
import { apiUrl } from "../../../../env";

export  async function changePassword({token, email, password, password_confirmation}) {

        const response =  await fetch(`${apiUrl}reset-password`,{
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify({
                token,
                email,
                password,
                password_confirmation
            })
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message || 'Erreur! Veuillez réessayer')
        }

        
    return data
}