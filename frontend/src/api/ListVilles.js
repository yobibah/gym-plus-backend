
import { apiClient } from "./client";

export async function ListVilles() {
     

    return apiClient.get('pays-villes')
}