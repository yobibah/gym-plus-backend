import { apiClient } from "../../../client";

export async function DeleteAdh({id}) {
    return apiClient.delete('delete-adherant', {id})
}