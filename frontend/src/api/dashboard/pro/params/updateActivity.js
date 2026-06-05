import { apiClient } from "../../../client";

export async function UpdateActivity({formData}){
    return apiClient.upload('update-activite', formData)
}