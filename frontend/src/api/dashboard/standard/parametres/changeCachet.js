
import { apiClient } from "../../../client";

export async function UpdateCachet({formData}) {
    return apiClient.upload('update-cachet', formData)
}