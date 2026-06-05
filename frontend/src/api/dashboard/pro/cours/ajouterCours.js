
import { apiClient } from "../../../client";

export async function AjouterCours({cours, niveaux}){
    

    return apiClient.post('ajouter-cours', {cours, niveaux})
}