import React from "react";
import Cookies from 'js-cookie'
import { apiUrl } from "../../../env";
import { getToken } from "../../hooks/getToken";


export async function Otp({codeOtp}) {
       
    // const token = Cookies.get('token')
    const token = getToken();
    const response = await fetch(`${apiUrl}validation-email`,{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`, 
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            codeOtp
        })
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.error || 'Code invalide, réessayez !')
    }

    

    return data
    
}