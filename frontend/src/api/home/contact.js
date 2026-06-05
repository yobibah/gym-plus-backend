
import { apiClient } from "../client";

export async function ContactHome({email, message}){

        return apiClient.post('accueil-form`', {email, message})
            
    }