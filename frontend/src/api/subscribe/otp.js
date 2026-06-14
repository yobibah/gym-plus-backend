
import { apiClient } from "../client";


export async function Otp({codeOtp}) {

    return apiClient.post('validation-email',{codeOtp})
    
}