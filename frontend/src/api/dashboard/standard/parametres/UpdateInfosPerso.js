
import React from "react"
import { apiUrl } from "../../../../../env"
import { getToken } from "../../../../hooks/getToken"

export async function UpdateInfosPerso({nom, prenom, telephone}){
            const token = getToken()

            const response = await fetch(`${apiUrl}update-infos-perso`,{
                method : 'PUT',
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body : JSON.stringify({
                    nom,
                    prenom,
                    telephone,
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || 'Erreur lors de la mise à jour des infos personnelles')
            }
            
        
            return data
    }