import { apiClient } from "../../../client"


export async function UpdateCoach({id, nom, prenom, telephone, competence}) {
    return apiClient.put('update-coach', {id, nom, prenom, telephone, competence})
}