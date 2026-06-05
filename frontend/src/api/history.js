

import { apiClient } from "./client";

export async function History() {
    return apiClient.get('mon-historique')
}