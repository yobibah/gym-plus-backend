
import { apiClient } from "../../../client";

export async function SwitchStatut({id}){

        return apiClient.post('switch-status', {id})
    }