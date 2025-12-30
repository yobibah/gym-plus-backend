import React from "react";
import Cookies from 'js-cookie'
// import useGetUrl from "../hooks/useGetUrl";
import { apiUrl } from "../../../env";
// import { token } from "../hooks/getToken";
import { getToken } from "../hooks/getToken";

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