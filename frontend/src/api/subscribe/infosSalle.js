
import { apiClient } from "../client";

export async function infosSalle({formData}){
    return apiClient.upload('info-salle', formData)
}