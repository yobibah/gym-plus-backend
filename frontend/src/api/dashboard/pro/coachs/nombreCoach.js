import { apiClient } from "../../../client"

export async function NombreCoach() {
    
    return apiClient.get('mes-coach')
}