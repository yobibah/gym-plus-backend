import {apiClient} from "../../../client";

export async function AjouterCoach({nom, prenom, telephone, competence}){
    return apiClient.post('ajouter-coach', {nom, prenom, telephone, competence})
}