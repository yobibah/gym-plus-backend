import { apiClient } from '../../../client'
 
export async function DeleteCoach({ id }) {
    return apiClient.delete('delete-coach', { id })
}
