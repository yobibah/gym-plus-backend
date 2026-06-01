import React, {useState, useEffect} from "react";
import form3 from '../../assets/images/form3.png'
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getToken } from "../../hooks/getToken";
import { usePayment } from "../../hooks/usePayment";
import { Loader2 } from "lucide-react";
import { PaymentOtp } from "../../api/subscribe/PaiementOtp";
import ToastError from "../../components/ui/ToastError";
import ToastSuccess from "../../components/ui/ToastSuccess";

export default function PaiementOtp(){
    
    const [otp, setOtp] = useState('')

    const {forfait, montant} = usePayment()
    const [params] = useSearchParams()
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
    }, [navigate])

    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || montantUrl !== montant ){
            navigate(`/paiement-otp?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    }, [navigate, montant,forfait, montantUrl, forfaitUrl])


    const paiementOtp = useMutation({
        mutationFn : PaymentOtp,
        onSuccess : ()=>{
             
            localStorage.removeItem('form')
            localStorage.removeItem('status_otp')
            localStorage.removeItem('status_salle')
            localStorage.removeItem('choix_forfait')
            localStorage.removeItem('step1')
            
            setTimeout(()=>{
                paiementOtp.reset()
            },2500)
            setTimeout(()=>{
                navigate(`/statut?forfait=${choix_forfait.forfait}&montant=${choix_forfait.montant}`)
            }, 3000)

        },

        onError: (()=>{
            setTimeout(()=>{
                paiementOtp.reset()
            },4000)
        })
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
            <div className="fixed inset-0 z-20">
                <img src={form3} alt="image-de-validation-paiement" className="w-250 h-auto" />
            </div>

            <div className="relative bg-orange-100/50 z-30 flex justify-center items-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl mx-auto">
                    <div className="mb-6 sm:mb-8 text-center">
                        <p className="fuzzy-bubbles-bold uppercase text-2xl sm:text-3xl md:text-4xl mb-2">Finalisez votre abonnement</p>
                    </div>
                    <div className="flex flex-col gap-3 text-center bg-white border border-gray-100 rounded-xl px-4 sm:px-5 py-5 sm:py-6 shadow-lg">
                        <div>
                            <p className="text-gray-600 text-sm sm:text-base">Composez</p>
                            <p className="font-bold text-base sm:text-lg md:text-xl">*144*4*6*{montant}#</p>
                            <p className="text-gray-600 text-sm sm:text-base">sur votre téléphone pour obtenir le code OTP à entrez dans</p>
                            <p className="text-gray-600 text-sm sm:text-base">le champ ci-dessous pour valider le paiement</p>
                        </div>
                        <form className="flex flex-col gap-2 px-4 sm:px-10 md:px-20 lg:px-40">
                            
                            <input 
                                type="tel" 
                                placeholder="code otp"
                                value={otp}
                                onChange={(e)=>{setOtp(e.target.value)}}
                                className="border p-2 sm:p-2.5 rounded-lg text-center border-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-600 text-sm sm:text-base"
                            />

                            <motion.button
                                whileTap={{scale:0.95}}
                                onClick={handlePaymentOtp}
                                disabled={loading || !otp.trim()}
                                className={`${!otp.trim() ? 'bg-orange-300 border-orange-300 text-black/30' : 'hover:bg-transparent hover:text-black bg-orange-600 text-white border-orange-600'} flex items-center justify-center border p-2 sm:p-2.5 rounded-lg font-bold transition-colors duration-200 text-sm sm:text-base`}
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5"/> : 'Validez et Terminez' }
                            </motion.button>
                        </form>
                    </div>
                    
                </div>
            </div>

            {error && (
                <ToastError title={'Erreur survenue !'} message={'Une erreur est survenue, vérifier vos informationset réesssayez à nouveau.'}/>
            )}

            {success && (
                
                <ToastSuccess title={'Paiement réussi!'} message={
                    <>
                    Rédirection... <Loader2 className="h-5 w-5 animate-spin"/>
                    </>
                }/>
               
            )}
        </>
    )
}