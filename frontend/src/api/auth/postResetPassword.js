import React from "react";
import { apiUrl } from "../../../env";

export async function postResetPassword({email}) {

    const response =  await fetch(`${apiUrl}forgot-password`,{
        method: "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({email})
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur! Veuillez réessayer')
    }

    return data
}