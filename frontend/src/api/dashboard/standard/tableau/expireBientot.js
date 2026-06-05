
import { apiClient } from "../../../client";


export async function ExpireBientot() {
    return apiClient.get('bientot-expirer')
}