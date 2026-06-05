import { apiClient } from "../../../client";

export async function CreateActivity({formData}){
    return apiClient.upload('info-activite', formData)
}