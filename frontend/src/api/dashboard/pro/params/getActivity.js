
import { apiClient } from "../../../client";


export async function getActivity() {

    return apiClient.get('mes-activites')
}