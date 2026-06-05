
import { apiClient } from "../../../client";

export async function DeleteActivity({id}) {
    

    return apiClient.delete('delete-activite', {id})
}