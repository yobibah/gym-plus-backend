import { apiClient } from "../../../client";

export async function DeleteCachet() {

    return apiClient.delete('delete-cachet')
}