import React, {useState, useEffect} from "react";
import form3 from '../../assets/images/form3.png'
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getToken } from "../../hooks/getToken";
import { usePayment } from "../../contexts/PaymentContext";
import { Loader2 } from "lucide-react";
import { PaymentOtp } from "../../api/subscribe/PaiementOtp";

export default function PaiementOtp(){
    
    const [otp, setOtp] = useState('')

    const {forfait, montant} = usePayment()
    const [params, setParams] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')

    const choix_forfait = JSON.parse(localStorage.getItem('choix_forfait')) 

    const navigate = useNavigate()

    useEffect(()=>{

        const token = getToken();
        if(!token){
            
            localStorage.removeItem('form')
            localStorage.removeItem('status_otp')
            localStorage.removeItem('status_salle')
            localStorage.removeItem('step1')
            navigate('/form-subscribe', {replace: true})
            return
        }
    }, [])

    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || montantUrl !== montant ){
            navigate(`/paiement-otp?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    }, [montant,forfait, montantUrl, forfaitUrl])


    const paiementOtp = useMutation({
        mutationFn : PaymentOtp,
        onSuccess : ()=>{
             
            localStorage.removeItem('form')
            localStorage.removeItem('status_otp')
            localStorage.removeItem('status_salle')
            localStorage.removeItem('choix_forfait')
            localStorage.removeItem('step1')

            setTimeout(()=>{
                navigate(`/statut?forfait=${choix_forfait.forfait}&montant=${choix_forfait.montant}`)
            }, 2500)

        }
    })

    const loading = paiementOtp.isPending
    const error = paiementOtp.isError
    const success = paiementOtp.isSuccess

    async function handlePaymentOtp(e) {
        e.preventDefault()
        paiementOtp.mutate({otp})
    }


    return(
        <>
            <div className="absolute inset-y-0 z-20 flex bg-cover bg-center">
                <img src={form3} alt="image-de-validation-paiement"
                    className=" "
                />
            </div>

            <div  className="relative bg-orange-100/50 z-30 flex justify-center items-center h-screen">
                <div className="w-full max-w-2xl">
                    <div className="mb-8 text-center">
                        <p className="fuzzy-bubbles-bold uppercase text-4xl mb-2">Finalisez votre abonnement</p>
                    </div>
                    <div className="flex flex-col gap-3 text-center bg-white border-3 border-gray-100 rounded-xl px-5 py-6 shadow-lg">
                        <div>
                            <p className="text-gray-600">Composez</p>
                            <p className="font-bold">*144*4*6*{montant}#</p>
                            <p className="text-gray-600">sur votre téléphone pour obtenir le code OTP à entrez dans</p>
                            <p className="text-gray-600">le champ ci-dessous pour valider le paiement</p>
                        </div>
                        <form className="flex flex-col gap-2 px-40">
                            {error && (
                                <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{paiementOtp.error.message}</p>
                                </div>
                            )}

                            {success && (
                                <div className=" flex items-center p-2 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-600 text-sm">Paiement réussi! Redirection...</p>
                                    <Loader2 className="animate-spin h-5 w-5" />
                                </div>
                            )}
                            <input 
                                type="tel" 
                                placeholder="code otp"
                                value={otp}
                                onChange={(e)=>{setOtp(e.target.value)}}
                                className="border p-2 rounded-lg text-center border-gray-400 focus:outline-none"
                            />

                            <motion.button
                            whileTap={{scale:0.95}}
                                onClick={handlePaymentOtp}
                                disabled={loading || !otp.trim()}
                                className={`${!otp.trim() ? 'bg-orange-300 border-orange-300 text-black/30' : 'hover:bg-transparent hover:text-black bg-orange-600 text-white border-orange-600'} flex items-center justify-center border p-2 rounded-lg  font-bold  transition-colors duration-200 `}

                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5"/> : 'Validez et Terminez' }
                                
                            </motion.button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </>
    )
}