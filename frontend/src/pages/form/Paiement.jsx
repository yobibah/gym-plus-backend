import React, {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import form3 from '../../assets/images/form3.png'
import Cookies from 'js-cookie'
import useGetUrl from "../../hooks/useGetUrl";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../../contexts/PaymentContext";
import { CheckCircle, Loader2, Lock, WalletCards, Smartphone } from "lucide-react";


export default function Paiement(){
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)

    const {forfait, montant} = usePayment()
    const [params, setParams] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')

    const navigate = useNavigate()
    const {apiUrl} = useGetUrl()

    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || montantUrl !== montant ){
            navigate(`/paiement?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    }, [montant,forfait, montantUrl, forfaitUrl])




    async function handlePayment(){
        setError(null)
        setSuccess(null)
        setLoading(true)

        try{
            const token = Cookies.get('token')
            const response = await fetch(`${apiUrl}payment`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",

                    "Authorization" : `Bearer ${token}`, 
                    "Accept":"application/json",
                },
                body: JSON.stringify({
                    "forfait" : forfait,
                    "montant" : montant
                })
            })

            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || 'Erreur lors du paiement')
            }

            setSuccess(true)
            
            setTimeout(()=>{
                navigate(`/confirmation?forfait=${forfait}&montant=${montant}`)
            }, 1500)

        } catch(e){
            setError(e.message || 'Erreur de paiement')
        } finally{
            setLoading(false)
        }
    }

    return(
        <>
        <div className="absolute inset-y-0 z-20 flex bg-cover bg-center">
            <img src={form3} alt=""
                className=" "
            />
        </div>
        <div  className="relative bg-orange-100/50 z-30 flex justify-center items-center h-screen">
            <div className="w-full max-w-4xl">
                <div className="mb-8 text-center">
                    <p className="fuzzy-bubbles-bold uppercase text-4xl mb-2">Finalisez votre abonnement</p>
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
                                        <p className="text-sm text-gray-600">Carte bancaire ou mobile money</p>
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
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-600 text-sm">Paiement réussi! Redirection en cours...</p>
                            </div>
                        )}

                        <button 
                            className="bg-orange-600 hover:bg-orange-700 mb-5 w-full justify-center flex items-center text-white font-bold rounded-lg gap-2 mx-auto p-3 transition-colors"
                            onClick={handlePayment}
                            disabled={loading}
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
                        </button>

                        <span className="flex mb-4 items-center text-sm gap-1 justify-center text-gray-600">
                            <CheckCircle className="h-4 w-4"/>
                            Paiement 100% Sécurisé
                        </span>
                        
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex flex-col items-center">
                                <div className="p-2 bg-orange-50 rounded-lg mb-1">
                                    <WalletCards className="h-5 w-5" />
                                </div>
                                <span className="text-xs text-gray-600">Carte</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-2 bg-orange-50 rounded-lg mb-1">
                                    <Smartphone className="h-5 w-5" />
                                </div>
                                <span className="text-xs text-gray-600">Mobile</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                En cliquant sur "Payer maintenant", vous serez redirigé vers notre passerelle de paiement sécurisée.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}