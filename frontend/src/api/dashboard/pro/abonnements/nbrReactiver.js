import { apiClient } from "../../../client"

export async function NombreReactiver() {
    
    return apiClient.get('nbr-reactiver')
}