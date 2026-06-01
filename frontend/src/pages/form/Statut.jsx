import { CheckCircle2, LayoutDashboard, Mail, MessageCircle } from "lucide-react";
import React, {useEffect} from "react";
import success from '../../assets/images/success.png'
import { usePayment } from "../../hooks/usePayment";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Statut(){

    const {forfait, montant} = usePayment()
    const [params] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')

    const date = new Date().toLocaleDateString('fr-FR')

    const navigate = useNavigate() 


    const numero = JSON.parse(localStorage.getItem('tel')) 

    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || montantUrl !== montant ){
            navigate(`/statut?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    }, [navigate, montant,forfait, montantUrl, forfaitUrl])


    return(
        <>

        <div className="fixed inset-0 z-10">
            <img src={success} alt="" className="w-250 h-auto"/>
        </div>
        <div className="relative z-20 bg-orange-100/50 min-h-screen flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl mx-auto">
                <div className="flex flex-col justify-center items-center gap-3 sm:gap-5 mb-6 sm:mb-10 text-center px-4">
                    <CheckCircle2 size={80} className="text-green-400/50 sm:w-[100px] sm:h-[100px]" />
                    <p className="text-2xl sm:text-3xl md:text-4xl fuzzy-bubbles-bold">Paiement confirmé avec succès !</p>
                    <span className="text-xs sm:text-sm text-gray-400">Bienvenue chez GymPlus. Votre salle de sport est presque
                        prête. Merci de votre confiance
                    </span>
                </div>

                <div className="p-4 sm:p-5 rounded-lg bg-white shadow-xl border border-gray-100">
                    <p className="font-bold mb-4 text-xl sm:text-2xl">Récapitulatif de votre abonnement</p>
                    <div className="">
                        <div className="flex mb-3 sm:mb-4 items-center justify-between">
                            <p className="text-xs sm:text-sm text-gray-500">Forfait Souscrit</p>
                            <p className="text-xs sm:text-sm font-semibold">{forfait}</p>
                        </div>

                        <div className="flex mb-3 sm:mb-4 items-center justify-between">
                            <p className="text-xs sm:text-sm text-gray-500">Téléphone</p>
                            <p className="text-xs sm:text-sm font-semibold">{numero}</p>
                        </div>

                        <div className="flex mb-3 sm:mb-4 items-center justify-between">
                            <p className="text-xs sm:text-sm text-gray-500">Montant Payé</p>
                            <p className="text-xs sm:text-sm font-semibold">{montant} XOF</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-gray-500">Date</p>
                            <p className="text-xs sm:text-sm font-semibold">{date}</p>
                        </div>
                    </div>

                    <hr className="my-4 sm:my-5 text-gray-200"/>

                    <p className="font-bold mb-4 text-xl sm:text-2xl">Et maintenant ?</p>
                    <div className="">
                        <div className="flex mb-3 sm:mb-4 items-start gap-1 sm:gap-2">
                            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5"/>
                            <p className="text-xs sm:text-sm text-gray-500">
                                Notre équipe va procéder à la validation de votre salle de sport.
                                Cette étape prend généralement moins de 24 heures.
                            </p>
                        </div>

                        <div className="flex mb-3 sm:mb-4 items-start gap-1 sm:gap-2">
                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5"/>
                            <p className="text-xs sm:text-sm text-gray-500">Vous allez recevoir un e-mail de confirmation contenant les détails de
                                votre transaction et les informations de votre compte.
                            </p>
                        </div>

                        <div className="flex items-start gap-1 sm:gap-2">
                            <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5"/>
                            <p className="text-xs sm:text-sm text-gray-500">Une fois la validation terminée, vous recevrez un second e-mail vous
                                notifiant que votre accès au tableau de bord est activé.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                    <motion.button
                        whileTap={{scale:0.95}}
                        onClick={()=>{navigate('/'), localStorage.removeItem('tel')}}
                        className="flex hover:bg-orange-500 transition-colors duration-200 border-orange-500 border text-black rounded-lg my-6 sm:my-10 py-2 px-4 sm:px-6 text-xs sm:text-sm font-bold items-center justify-center bg-transparent hover:text-white w-full sm:w-auto"
                    >
                        Retourner à l'accueil
                    </motion.button>

                    <motion.button
                        whileTap={{scale:0.95}}
                        onClick={()=>{navigate('/auth'), localStorage.removeItem('tel')}}
                        className="flex hover:bg-transparent transition-colors duration-200 border-orange-500 border hover:text-black rounded-lg my-6 sm:my-10 py-2 px-4 sm:px-6 text-xs sm:text-sm font-bold items-center justify-center bg-orange-500 text-white w-full sm:w-auto"
                    >
                        Se connecter
                    </motion.button>
                </div>

                <p className="text-xs sm:text-sm text-center text-gray-600 px-4">En cas de question, n'hésitez pas à <span className="text-orange-400 cursor-pointer underline">contacter notre support</span></p>
            </div>

        </div>
        </>
    )
}