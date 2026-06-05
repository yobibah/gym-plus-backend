
import { apiClient } from "./client";

export async function fetchDataPlan() {

    return apiClient.get('plan-choisit')
}