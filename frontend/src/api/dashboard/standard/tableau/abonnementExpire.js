
import { apiClient } from "../../../client";


export async function AbonnementExpirer() {
    return apiClient.get('expirer')
}