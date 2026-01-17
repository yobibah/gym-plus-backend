import React from "react";
import { Loader2, XCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {fetchDataPlan} from '../api/fetchPlan'
import DashboardStandard from "./standard/DashboardStandard";
import DashboardPro from "./pro/DashboardPro";


export default function Dashboard(){

    useAuth()

    const planChoisit = useQuery({
        queryKey : ['plan'],
        queryFn : fetchDataPlan
    })

    const plan = planChoisit?.data?.plan


    if(planChoisit.isPending){
        return(
           <Loader2 className="animate-spin flex items-center justify-center text-blue-500 h-10 w-10" />
        )
    }

    if(planChoisit.isError){
        return(
            <div className="bg-orange-50 flex items-center text-red-500 h-screen justify-center">
                <XCircle className="h-5 w-5 animate-spin"/> 
                {planChoisit.error.message} 
            </div>
        )
    }


    return(
        <div>
            {plan === 'standard' && <DashboardStandard />}
            {plan === 'pro' && <DashboardPro />}
            {plan === 'premium' && <div>Premium</div>}
        </div>
    )
}