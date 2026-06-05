
import { apiClient } from "../../../client";


export async function FetchNombreActif(){
        return apiClient.get('nbr-adherant-actif')
       
    }