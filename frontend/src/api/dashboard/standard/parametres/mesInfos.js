
import { apiClient } from "../../../client";


export async function MesInfos(){
    
    return apiClient.get('mes-infos')
}