import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import useGetUrl from "../hooks/useGetUrl";
import { useNavigate } from "react-router-dom";
import { Loader2, XCircle } from "lucide-react";

export default function Dashboard(){


    const [planChoisit, setPlanChoisit] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const {apiUrl} = useGetUrl()
    const token = Cookies.get('token')

    

    useEffect(()=>{
        async function fetchData() {
            if(!token){
                navigate('/login', {replace: true})
                return
            }
            
            setLoading(true)
            setError(null)

            try{
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

                setPlanChoisit(data)
            } catch(e){
                setError(e.message || 'Erreur de chargement')
            } finally{
                setLoading(false)
            }
        }

        fetchData()
    }, [token])



    if(loading){
        return(
            <div className="bg-orange-50 flex items-center h-screen justify-center">
                Chargement de votre espace de gestion  
                <Loader2 className="h-5 w-5 animate-spin"/>  
            </div>
        )
    }

    if(error){
        return(
            <div className="bg-orange-50 flex items-center h-screen justify-center">
                <XCircle className="h-5 w-5 animate-spin"/> 
                {error} 
            </div>
        )
    }


    return(
        <div>
            {planChoisit?.plan === 'standard' ?(
                <div>Standard</div>
            ):planChoisit?.plan === 'pro' ?(
                <div>Pro</div>
            ):planChoisit?.plan === 'premium'? (
                <div>Premium</div>
            ) : null}
        </div>
    )
}