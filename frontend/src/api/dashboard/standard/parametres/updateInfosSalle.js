import { apiClient } from "../../../client";

export async function UpdateinfosSalle({nom_salle, pays, region}){

    return apiClient.put('update-infos', {nom_salle, pays, region})
}