import React, {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import form3 from '../../assets/images/form3.png'
import { motion } from "framer-motion";
import { getToken } from "../../hooks/getToken";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../../contexts/PaymentContext";
import { CheckCircle, Loader2, Lock, WalletCards, Smartphone } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { PaymentProcess } from "../../api/subscribe/PaiementProcess";
import orange from '../../assets/images/orange.png'
import moov from '../../assets/images/moov.png'
import sank from '../../assets/images/sank.png'
import coris from '../../assets/images/coris.webp'


export default function PaiementProcess(){

    const {forfait, montant} = usePayment()
    const [params, setParams] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')
    const [tel, setTel] = useState('')
    const [type, setType]= useState('inscription')
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
    }, [])

    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || montantUrl !== montant ){
            navigate(`/paiement-process?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    }, [montant,forfait, montantUrl, forfaitUrl])


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
        <div className="absolute inset-y-0 z-20 flex bg-cover bg-center">
            <img src={form3} alt="image-de-validation-paiement"
                className=" "
            />
        </div>
        <div  className="relative bg-orange-100/50 z-30 flex justify-center items-center h-screen">
            <div className="w-full max-w-4xl">
                <div className="mb-8 text-center">
                    <p className="fuzzy-bubbles-bold uppercase text-4xl mb-2">Processus de Paiement</p>
                    <p className="text-gray-600">Cliquez sur le bouton pour procéder au paiement.</p>
                </div>

                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-2 bg-white border-3 border-gray-100 rounded-xl px-5 py-6 shadow-lg">
                        <p className="mb-4 fuzzy-bubbles-bold text-xl">Votre abonnement GymPlus</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg">
                                        <WalletCards className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Paiement sécurisé</p>
                                        <p className="text-sm text-gray-600">Mobile money</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-gray-700">Forfait choisi</p>
                                    <p className="font-semibold text-lg">{forfait}</p>
                                </div>

                                <hr className="my-4" />

                                <div className="flex items-center justify-between">
                                    <p className="text-gray-700">Montant total</p>
                                    <p className="font-bold text-2xl text-orange-600">{montant} XOF</p>
                                </div>

                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        Après paiement, votre compte sera activé immédiatement. 
                                        Vous recevrez un email de confirmation.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-orange-50  px-5 pb-5 flex flex-col">
                                <p className="my-5 text-gray-500">Veuillez choisir votre moyen de paiement</p>
                                <div className="flex items-center justify-center gap-5">

                                    <motion.button 
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.95}}
                                        onClick={()=>{setProvider('orange_bf')}}
                                        className={`border p-1 h-20 w-70 bg-white ${provider === 'orange' ? 'border-orange-500 shadow-[0_0_18px_rgba(255,100,0,0.8)]' : 'border-gray-300'}  rounded-lg`}>
                                        <img src={orange} alt="orange-logo" className="h-full w-full" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.95}} 
                                        onClick={()=>{setProvider('moov_bf')}}
                                        className={`border p-1 h-20 w-70 bg-white ${provider === 'moov' ? 'border-orange-500 shadow-[0_0_18px_rgba(255,100,0,0.8)]' : 'border-gray-300'}  rounded-lg`}>
                                        <img src={moov} alt="moov-logo" className="h-full w-full"/>
                                    </motion.button>
                                    <motion.button 
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.95}} 
                                        onClick={()=>{setProvider('corismoney_bf')}}
                                        className={`border p-1 h-20 w-70 bg-white ${provider === 'coris' ? 'border-orange-500 shadow-[0_0_18px_rgba(255,100,0,0.8)]' : 'border-gray-300'}  rounded-lg`}>
                                        <img src={coris} alt="coris-logo" className="h-full w-full"/>
                                    </motion.button>
                                    <motion.button 
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.95}} 
                                        onClick={()=>{setProvider('sank_bf')}}
                                        className={`border p-1 h-20 w-70 bg-white ${provider === 'sank' ? 'border-orange-500 shadow-[0_0_18px_rgba(255,100,0,0.8)]' : 'border-gray-300'}  rounded-lg`}>
                                        <img src={sank} alt="sank-logo" className="h-full w-full"/>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 border-3 border-gray-100 px-5 py-6 shadow-lg rounded-xl bg-white">
                        <p className="mb-4 fuzzy-bubbles-bold text-xl">Paiement</p>
                        
                        <div className="mb-6">
                            <div className="flex items-center justify-between text-gray-900 mb-2">
                                <p>Abonnement</p>
                                <p className="font-semibold">{forfait}</p>
                            </div>
                            
                            <div className="flex items-center justify-between text-gray-900 mb-2">
                                <p>Montant</p>
                                <p className="font-semibold">{montant} XOF</p>
                            </div>

                            <hr className="my-4" />

                            <div className="flex items-center justify-between text-lg font-bold">
                                <p>Total</p>
                                <p className="text-orange-600">{montant} XOF</p>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{paiement.error.message}</p>
                            </div>
                        )}

                        {success && (
                            <div className="flex items-center mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-600 text-sm">Redirection...</p>
                                <Loader2 className="animate-spin h-5 w-5" />
                            </div>
                        )}

                        <form className="text-center mb-6 flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-sm"
                                >Entrez votre numéro de telephone pour procéder au paiement</label>
                                <input type="text" 
                                    value={tel}
                                    onChange={(e)=>{setTel(e.target.value)}}
                                    placeholder="Saisissez"
                                    className="border p-1 rounded-lg px-3 focus:outline-none "
                                />
                            </div>
                            <motion.button 
                                whileTap={{scale:0.95}}
                                className={`${!tel.trim() || provider === null ? 'bg-orange-300 text-black/30 border-orange-300' : 'bg-orange-600 hover:bg-transparent border-orange-600 text-white hover:text-black'}  border  mb-5 w-full justify-center flex items-center  font-bold rounded-lg gap-2 mx-auto p-3 transition-colors duration-200`}
                                onClick={handlePayment}
                                disabled={loading || !tel.trim() || provider === null}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    </>
                                ):(
                                    <>
                                        <Lock className="h-5 w-5"/>
                                        Payer maintenant
                                    </>
                                )}
                            </motion.button>
                        </form>

                        

                        <span className="flex mb-4 items-center text-sm gap-1 justify-center text-gray-600">
                            <CheckCircle className="h-4 w-4"/>
                            Paiement 100% Sécurisé
                        </span>
                        
                        <div className="flex justify-center items-center gap-4">
                            <span className="text-xs text-gray-600">Mobile Money</span>
                            <div className="p-2 bg-orange-50 rounded-lg mb-1">
                                <Smartphone className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}