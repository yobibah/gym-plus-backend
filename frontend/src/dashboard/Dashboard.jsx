import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import useGetUrl from "../hooks/useGetUrl";
import { useNavigate } from "react-router-dom";
import { Loader2, XCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchDataPlan } from "../data/fetchPlan";
import DashboardStandard from "./standard/DashboardStandard";


export default function Dashboard(){

    useAuth()

    const navigate = useNavigate()

    const planChoisit = useQuery({
        queryKey : ['plan'],
        queryFn : fetchDataPlan
    })

    function logout() {
        Cookies.remove('token');
        navigate('/auth', {replace: true});
    }

    if(planChoisit.isPending){
        return(
            <div className="bg-orange-50 flex items-center h-screen justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-orange-500"/>  
            </div>
        )
    }

    if(planChoisit.isError){
        return(
            <div className="bg-orange-50 flex items-center h-screen justify-center">
                <XCircle className="h-5 w-5 animate-spin"/> 
                {planChoisit.error.message} 
            </div>
        )
    }


    return(
        <div>
            {planChoisit.data.plan === 'Standard' && <DashboardStandard />}
            {planChoisit.data.plan === 'Pro' && <div>Pro</div>}
            {planChoisit.data.plan === 'Premium' && <div>Premium</div>}
        </div>
    )
}