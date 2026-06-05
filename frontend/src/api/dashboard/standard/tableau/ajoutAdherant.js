import {apiClient} from "../../../client";

export async function AjouterAdherant({form}){
    
        return apiClient.post('ajouter-adherant', form)
    }