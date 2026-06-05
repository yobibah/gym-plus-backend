
import { apiClient } from "../../../client";

export async function UpdateAdh({id, nom, prenom, email, telephone}) {
    
    return apiClient.post('update-adherant', {id, nom, prenom, email, telephone})
}