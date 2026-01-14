import React from "react";
import { getToken } from "../hooks/getToken";
import { apiUrl } from "../../env";

export async function fetchDataPlan() {

    const token = getToken();
    const response = await fetch(`${apiUrl}plan-choisit`,{
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Erreur lors de la récupération du plan')
    }

    return data
}