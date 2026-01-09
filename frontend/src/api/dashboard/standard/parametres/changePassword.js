
import React from "react"
import { apiUrl } from "../../../../../env"
import { getToken } from "../../../../hooks/getToken"

export async function ChangePassword({password}){
            const token = getToken()

            const response = await fetch(`${apiUrl}update-password`,{
                method : 'PUT',
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body : JSON.stringify({
                    password
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || 'Erreur lors de la mise à jour des infos personnelles')
            }
            
        
            return data
    }