
import { apiClient } from "../../../client";

export async function addLogo({formData}) {
   
    return apiClient.upload('ajouter-logo', formData)
}