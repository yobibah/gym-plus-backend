
import { apiClient } from "../../../client";

export async function CoursProgrammer() {
    
    
    return apiClient.get('cours-programmer-listes')
}