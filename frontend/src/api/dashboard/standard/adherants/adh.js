import React from "react";
import {apiClient} from "../../../client";


export async function mesAdherants({ queryKey }) {
    const [_key, page] = queryKey
    return apiClient.get(`mes-adherant?page=${page}`)
}
