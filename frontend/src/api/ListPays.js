import { apiClient } from "./client";

export async function ListPays() {
    return apiClient.get('pays')
}