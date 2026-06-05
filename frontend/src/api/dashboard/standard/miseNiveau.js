
import { apiClient } from "../../client";


export async function MisNiveau({forfait}) {
    
    return apiClient.post('mis-niveau', forfait)
}