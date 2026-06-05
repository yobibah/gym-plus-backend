
import { apiClient } from "../../../client";

export async function Reabonner({id, email, plan}) {
    
    return apiClient.post('reabonner-adherant', {id, email, plan})
}