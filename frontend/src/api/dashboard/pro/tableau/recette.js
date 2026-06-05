import { apiClient } from "../../../client";

export async function Recette() {
    return apiClient.get('recette')
}