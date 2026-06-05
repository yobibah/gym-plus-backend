
import { apiClient } from "../../../client";


export async function DeleteLogo() {

    return apiClient.post('delete-logo')
}