
import { apiClient } from "../../../client";

export async function UpdateLogo({formData}) {
    
    return apiClient.upload('update-logo', formData)
}