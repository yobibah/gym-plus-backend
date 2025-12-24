
import React from "react"
import { apiUrl } from "../../../../env"

export async function infosPerso({nom, prenom, telephone, email}){
        

            const response = await fetch(`${apiUrl}infos-perso`,{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body : JSON.stringify({
                    nom,
                    prenom,
                    telephone,
                    email
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || 'Erreur lors de l\'inscription! Réessayez')
            }
            
        
            return data
    }