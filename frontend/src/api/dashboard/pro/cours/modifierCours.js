
import { apiClient } from "../../../client";

export async function UpdateCours({id, cours, niveaux}) {
    
    return apiClient.put('update-cours', {id, cours, niveaux})
}