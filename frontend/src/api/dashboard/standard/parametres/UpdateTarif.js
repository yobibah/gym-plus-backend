
import { apiClient } from "../../../client";

export async function UpdateTarifs({montant_1,montant_2,montant_3}) {
    return apiClient.put('update-prix', {montant_1,montant_2,montant_3})
}