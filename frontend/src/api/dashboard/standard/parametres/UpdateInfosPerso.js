
import { apiClient } from "../../../client";

export async function UpdateInfosPerso({nom, prenom, telephone}){
        return apiClient.put('update-infos-perso', {nom, prenom, telephone})
    }