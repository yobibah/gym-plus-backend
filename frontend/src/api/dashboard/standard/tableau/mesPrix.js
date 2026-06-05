import { apiClient } from "../../../client";

export async function fetchPrix() {
    return apiClient.get('mes-prix')
}