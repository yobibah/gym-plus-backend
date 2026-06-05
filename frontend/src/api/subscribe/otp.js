import React from "react";
import Cookies from 'js-cookie'
import { apiUrl } from "../../../env";
import { getToken } from "../../hooks/getToken";
import { apiClient } from "../client";


export async function Otp({codeOtp}) {

    return apiClient.post('validation-email',[codeOtp])
    
}