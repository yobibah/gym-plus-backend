
import React from "react";
import { getToken } from "../../../../hooks/getToken";
import { apiUrl } from "../../../../../env";
import { apiClient } from "../../../client";

export async function SwitchStatut({id}){

        return apiClient.post('switch-status', {id})
    }