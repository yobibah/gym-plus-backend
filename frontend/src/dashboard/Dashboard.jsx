import React from "react";
import { Loader2, XCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {fetchDataPlan} from '../api/fetchPlan'
import DashboardStandard from "./standard/DashboardStandard";
import DashboardPro from "./pro/DashboardPro";
import logo from '../assets/images/coverhero.png'


export default function Dashboard(){

    const isAuth = useAuth()

    const planChoisit = useQuery({
        queryKey : ['plan'],
        queryFn : fetchDataPlan,
        enabled : isAuth
    })

    if(!isAuth){
        return(
            <div className="flex flex-col gap-2 items-center justify-center h-screen">
                <img src={logo} alt="logo gymPlus" className="w-100 h-100 animate-bounce" />
                <div className="flex items-center gap-2">
                <p className="text-orange-500 font-bold text-2xl">Redirection vers la page d'authentification...</p>
                    <Loader2 className="animate-spin text-orange-500 h-10 w-10" />
                </div>
           </div>
        )
    }

    const plan = planChoisit?.data?.plan

    if(planChoisit.isPending){
        return(
            <div className="flex flex-col gap-2 items-center justify-center h-screen">
                <img src={logo} alt="logo gymPlus" className="w-100 h-100 animate-bounce" />
                <div className="flex items-center gap-2">
                <p className="text-orange-500 font-bold text-2xl">Chargement de votre tableau de bord...</p>
                    <Loader2 className="animate-spin text-orange-500 h-10 w-10" />
                </div>
           </div>
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