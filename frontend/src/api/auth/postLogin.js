import React from "react";
import useGetUrl from "../../hooks/useGetUrl";
import Cookies from 'js-cookie'
import { apiUrl } from "../../../env";


export async function postLogin({username, password}) {
        
    const response = await fetch(`${apiUrl}login`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            username,
            password
        })
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur de connexion')
    }
    
    return data

}