import { apiClient } from "../../../client";

export async function FetchNombreAdherant(){
    return apiClient.get('nbr-adherant')
}