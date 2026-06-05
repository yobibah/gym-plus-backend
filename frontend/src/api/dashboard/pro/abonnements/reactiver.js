import { apiClient } from "../../../client"

export async function Reactiver({id}) {
    
    return apiClient.post('reactiver-abonnement', {id})
}