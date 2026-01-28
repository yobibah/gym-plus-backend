import React from "react";
import { getToken } from "../../../../hooks/getToken";
import { apiUrl } from "../../../../../env";


export async function ExportCsv({gerantId}){
    const token = getToken()
    const response = await fetch(`${apiUrl}export/users/${gerantId}`,{
        method : "GET",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    })

    const data = await response.blob()
    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de l\'export CSV')
    }

    return data
}