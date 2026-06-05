import { apiClient } from "../../../client";

export async function DeleteTarif() {
   
    return apiClient.delete('delete-info')
}