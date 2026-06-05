
import { apiClient } from "../../../client";


export async function AnalyzeAi() {

    return apiClient.get('finance')
}