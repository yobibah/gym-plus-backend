
import { apiClient } from "../../../client";


export async function addCachet({formData}) {
    return apiClient.upload('ajouter-cachet', formData)
}