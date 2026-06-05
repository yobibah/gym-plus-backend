
import { apiClient } from "../client";


export async function PaymentOtp({otp}){
    return apiClient.post('payment-otp', {otp})
}