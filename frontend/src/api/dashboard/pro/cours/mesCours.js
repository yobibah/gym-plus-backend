
import { apiClient } from "../../../client";

export async function MesCours({queryKey}) {
    
    const [_key, page] = queryKey

    return apiClient.get(`mes-cours?page=${page}`)
}