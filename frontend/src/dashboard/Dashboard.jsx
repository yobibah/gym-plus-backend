import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import useGetUrl from "../hooks/useGetUrl";
import { useNavigate } from "react-router-dom";
import { Loader2, XCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
// import { fetchDataPlan } from "../services/fetchPlan";
import {fetchDataPlan} from '../api/fetchPlan'
import DashboardStandard from "./standard/DashboardStandard";


export default function Dashboard(){

    useAuth()

    const planChoisit = useQuery({
        queryKey : ['plan'],
        queryFn : fetchDataPlan
    })


    if(planChoisit.isPending){
        return(
            <div className="grid grid-cols-5 h-screen overflow-hidden">
                <div className="col-span-1 py-3 bg-white shadow-lg flex flex-col gap-10 h-screen overflow-y-auto sticky top-0">
                    {/* En-tête avec logo */}
                    <div className="flex items-center gap-2 px-5 my-5">
                        <div className="rounded-full flex items-center justify-center p-5 bg-gray-200 w-15 h-15 animate-pulse"></div>
                        <div className="space-y-2">
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Items de navigation */}
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex items-center mx-5 py-3 px-5 gap-5">
                        <div className="h-7 w-7 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    ))}

                    {/* Boutons en bas */}
                    <div className="absolute bottom-5 w-full flex justify-center gap-5 px-5">
                        <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                </div> 
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    {/* En-tête avec barre de recherche */}
                    <div className="flex items-center mb-10 justify-between border-b-1 pb-5 border-gray-200">
                        <div className="flex items-center text-lg">
                        <div>
                            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-5">
                        <div className="relative w-64">
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Cartes de statistiques */}
                    <div className="grid grid-cols-4 gap-5 mb-10">
                        {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                            <div className="space-y-2">
                                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-xl animate-pulse"></div>
                        </div>
                        ))}
                    </div>

                    {/* Section Accès Rapide */}
                    <div className="bg-white mb-10 shadow-lg rounded-xl px-5 py-6">
                        <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-5"></div>
                        <div className="grid grid-cols-3 gap-5">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-gray-100 flex items-center rounded-xl justify-center py-4 gap-2 animate-pulse">
                            <div className="h-5 w-5 bg-gray-300 rounded"></div>
                            <div className="h-5 w-40 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Section principale */}
                    <div className="grid grid-cols-2 gap-5">
                        {/* Carte Abonnements Expirés */}
                        <div className="bg-white shadow-lg rounded-xl px-5 py-6">
                        <div className="h-7 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                                <div className="space-y-1">
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                        </div>

                        {/* Tableau Renouvellement */}
                        <div className="bg-white shadow-lg rounded-xl px-5 py-6">
                        <div className="h-7 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-4 mb-2">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="h-6 bg-gray-200 rounded animate-pulse"></div>
                            ))}
                            </div>
                            {[...Array(5)].map((_, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 py-2">
                                <div className="h-5 bg-gray-100 rounded animate-pulse"></div>
                                <div className="h-5 bg-gray-100 rounded animate-pulse"></div>
                                <div className="h-5 bg-gray-100 rounded animate-pulse"></div>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div> 
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
            {planChoisit.data.plan === 'standard' && <DashboardStandard />}
            {planChoisit.data.plan === 'pro' && <div>Pro</div>}
            {planChoisit.data.plan === 'premium' && <div>Premium</div>}
        </div>
    )
}