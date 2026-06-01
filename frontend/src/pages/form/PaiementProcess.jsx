import React, {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import form3 from '../../assets/images/form3.png'
import { motion } from "framer-motion";
import { getToken } from "../../hooks/getToken";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../../hooks/usePayment";
import { CheckCircle, Loader2, Lock, WalletCards, Smartphone } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { PaymentProcess } from "../../api/subscribe/PaiementProcess";
import orange from '../../assets/images/orange.png'
import moov from '../../assets/images/moov.png'
import sank from '../../assets/images/sank.png'
import coris from '../../assets/images/coris.webp'


export default function PaiementProcess(){

    const {forfait, montant} = usePayment()
    const [params] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')
    const [tel, setTel] = useState('')
    const [type]= useState('inscription')
    const [provider, setProvider] = useState(null)
    const choix_forfait = JSON.parse(localStorage.getItem('choix_forfait')) 
    const navigate = useNavigate()

    useEffect(()=>{

        const token = getToken();
        if(!token){
            
            localStorage.removeItem('form')
            localStorage.removeItem('status_otp')
            localStorage.removeItem('status_salle')
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
            navigate(`/paiement-process?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    }, [navigate, montant,forfait, montantUrl, forfaitUrl])


    const paiement = useMutation({
        mutationFn : PaymentProcess,
        onSuccess : ()=>{
            localStorage.setItem('tel', tel)
            localStorage.setItem('step1', 'ok')

            setTimeout(()=>{
                navigate(`/paiement-otp?forfait=${choix_forfait.forfait}&montant=${choix_forfait.montant}`)
            }, 2500)

        }
    })

    const loading = paiement.isPending
    const error = paiement.isError
    const success = paiement.isSuccess

    async function handlePayment(e) {
        e.preventDefault()
        paiement.mutate({montant, numero: tel, forfait, type, provider})
    }


    return(
        <>
            <div className="fixed inset-0 z-20">
                <img src={form3} alt="image-de-validation-paiement" className="w-250 h-auto" />
            </div>
            
            <div className="relative z-30 bg-orange-100/50 flex justify-center items-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-6xl mx-auto">
                    
                    <div className="mb-6 sm:mb-8 text-center">
                        <p className="fuzzy-bubbles-bold uppercase text-2xl sm:text-3xl md:text-4xl mb-2">
                            Processus de Paiement
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Cliquez sur le bouton pour procéder au paiement.
                        </p>
                    </div>

                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-10">
                        
                        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl px-4 sm:px-5 py-5 sm:py-6 shadow-lg">
                            <p className="mb-4 fuzzy-bubbles-bold text-lg sm:text-xl">
                                Votre abonnement GymPlus
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg">
                                            <WalletCards className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm sm:text-base">Paiement sécurisé</p>
                                            <p className="text-xs sm:text-sm text-gray-600">Mobile money</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm sm:text-base text-gray-700">Forfait choisi</p>
                                        <p className="font-semibold text-base sm:text-lg">{forfait}</p>
                                    </div>

                                    <hr className="my-3 sm:my-4" />

                                    <div className="flex items-center justify-between">
                                        <p className="text-sm sm:text-base text-gray-700">Montant total</p>
                                        <p className="font-bold text-xl sm:text-2xl text-orange-600">{montant} XOF</p>
                                    </div>

                                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            Après paiement, votre compte sera activé immédiatement. 
                                            Vous recevrez un email de confirmation.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-orange-50 px-3 sm:px-5 pb-5">
                                    <p className="my-3 sm:my-5 text-xs sm:text-sm text-gray-500">
                                        Veuillez choisir votre moyen de paiement
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
                                        <motion.button 
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}}
                                            onClick={()=>{setProvider('orange_bf')}}
                                            className={`border p-1 h-16 sm:h-20 bg-white ${
                                                provider === 'orange_bf' 
                                                    ? 'border-orange-500 shadow-[0_0_18px_rgba(255,100,0,0.8)]' 
                                                    : 'border-gray-300'
                                            } rounded-lg`}
                                        >
                                            <img src={orange} alt="orange-logo" className="h-full w-full object-contain" />
                                        </motion.button>
                                        
                                        <motion.button
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}} 
                                            onClick={()=>{setProvider('moov_bf')}}
                                            className={`border p-1 h-16 sm:h-20 bg-white ${
                                                provider === 'moov_bf' 
                                                    ? 'border-orange-500 shadow-[0_0_18px_rgba(255,100,0,0.8)]' 
                                                    : 'border-gray-300'
                                            } rounded-lg`}
                                        >
                                            <img src={moov} alt="moov-logo" className="h-full w-full object-contain"/>
                                        </motion.button>
                                        
                                        <motion.button 
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}} 
                                            onClick={()=>{setProvider('corismoney_bf')}}
                                            className={`border p-1 h-16 sm:h-20 bg-white ${
                                                provider === 'corismoney_bf' 
                                                    ? 'border-orange-500 shadow-[0_0_18px_rgba(255,100,0,0.8)]' 
                                                    : 'border-gray-300'
                                            } rounded-lg`}
                                        >
                                            <img src={coris} alt="coris-logo" className="h-full w-full object-contain"/>
                                        </motion.button>
                                        
                                        <motion.button 
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}} 
                                            onClick={()=>{setProvider('sank_bf')}}
                                            className={`border p-1 h-16 sm:h-20 bg-white ${
                                                provider === 'sank_bf' 
                                                    ? 'border-orange-500 shadow-[0_0_18px_rgba(255,100,0,0.8)]' 
                                                    : 'border-gray-300'
                                            } rounded-lg`}
                                        >
                                            <img src={sank} alt="sank-logo" className="h-full w-full object-contain"/>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-100 px-4 sm:px-5 py-5 sm:py-6 shadow-lg rounded-xl bg-white">
                            <p className="mb-4 fuzzy-bubbles-bold text-lg sm:text-xl">
                                Paiement
                            </p>
                            
                            <div className="mb-4 sm:mb-6">
                                <div className="flex items-center justify-between text-gray-900 mb-2">
                                    <p className="text-sm sm:text-base">Abonnement</p>
                                    <p className="font-semibold text-sm sm:text-base">{forfait}</p>
                                </div>
                                
                                <div className="flex items-center justify-between text-gray-900 mb-2">
                                    <p className="text-sm sm:text-base">Montant</p>
                                    <p className="font-semibold text-sm sm:text-base">{montant} XOF</p>
                                </div>

                                <hr className="my-3 sm:my-4" />

                                <div className="flex items-center justify-between text-base sm:text-lg font-bold">
                                    <p>Total</p>
                                    <p className="text-orange-600">{montant} XOF</p>
                                </div>
                            </div>

                            {error && (
                                <div className="mb-4 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-xs sm:text-sm">Erreur! Réessayer</p>
                                </div>
                            )}

                            {success && (
                                <div className="flex items-center gap-2 mb-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-600 text-xs sm:text-sm">Redirection...</p>
                                    <Loader2 className="animate-spin h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                            )}
                            <form className="text-center mb-4 sm:mb-6 flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs sm:text-sm">
                                        Entrez votre numéro de téléphone pour procéder au paiement
                                    </label>
                                    <input 
                                        type="tel" 
                                        value={tel}
                                        onChange={(e)=>{setTel(e.target.value)}}
                                        placeholder="Saisissez votre numéro"
                                        className="border border-gray-300 p-2 rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-orange-600 text-sm"
                                    />
                                </div>
                                
                                <motion.button 
                                    whileTap={{scale: 0.95}}
                                    className={`${
                                        !tel.trim() || provider === null 
                                            ? 'bg-orange-300 text-black/30 border-orange-300 cursor-not-allowed' 
                                            : 'bg-orange-600 hover:bg-transparent border-orange-600 text-white hover:text-black cursor-pointer'
                                    } border w-full justify-center flex items-center font-bold rounded-lg gap-2 mx-auto p-2 sm:p-3 transition-colors duration-200 text-sm sm:text-base`}
                                    onClick={handlePayment}
                                    disabled={loading || !tel.trim() || provider === null}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                            <span>Traitement...</span>
                                        </>
                                    ):(
                                        <>
                                            <Lock className="h-4 w-4 sm:h-5 sm:w-5"/>
                                            <span>Payer maintenant</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            <span className="flex mb-4 items-center text-xs sm:text-sm gap-1 justify-center text-gray-600">
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4"/>
                                Paiement 100% Sécurisé
                            </span>
                            
                            <div className="flex justify-center items-center gap-2 sm:gap-4">
                                <span className="text-xs text-gray-600">Mobile Money</span>
                                <div className="p-1.5 sm:p-2 bg-orange-50 rounded-lg">
                                    <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}