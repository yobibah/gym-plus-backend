
import { apiClient } from "../client";


export async function PaymentProcess({numero, montant, forfait, type, provider}){

        
        return apiClient.post('payment-process', {numero, montant, forfait, type, provider})
}