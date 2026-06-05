
import { apiClient } from "../../../client";

export async function Tarifs({montant_1,montant_2,montant_3}) {
    return apiClient.post('ajouter-mes-prix', {montant_1,montant_2,montant_3})
}