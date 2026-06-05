
import { apiClient } from "../../../client";

export async function DeleteCours({id}) {
    

    return apiClient.delete('delete-cours', {id})
}