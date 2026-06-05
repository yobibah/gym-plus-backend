import { apiClient } from "../../../client";

export async function Suspendre({id}) {
   
    return apiClient.post('suspendre-abonnement', {id})
}