
import { apiClient } from "../../../client";


export async function SendActivity({id}){

    return apiClient.post('send-activite-to-user', {id})
}