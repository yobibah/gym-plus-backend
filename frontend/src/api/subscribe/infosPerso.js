

import { apiClient } from "../client"

export async function infosPerso({nom, prenom, telephone, email}){
    
    return apiClient.post('infos-perso', {nom, prenom, telephone, email})
}