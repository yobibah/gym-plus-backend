import React from "react";


export default function useGetUrl(){
    const apiUrl = 'http://localhost:8000/api/'
    const fileUrl = 'http://localhost:8000/storage'
    const cinetpayUrl = 'https://api-checkout.cinetpay.com/v2/payment'
    
    return {apiUrl, fileUrl, cinetpayUrl};
}

