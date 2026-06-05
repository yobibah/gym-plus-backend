
import { apiClient } from "../../../client";


export async function ProgrammerCours({cours_id, ahderent_id, jours, horaire, prof_id}){
    return apiClient.post('programmer-cours', {cours_id, ahderent_id, jours, horaire, prof_id})
}