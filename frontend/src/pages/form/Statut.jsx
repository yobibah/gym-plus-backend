import { CheckCircle2, LayoutDashboard, Mail, MessageCircle } from "lucide-react";
import React, {useState, useEffect} from "react";
import success from '../../assets/images/success.png'
import { usePayment } from "../../contexts/PaymentContext";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Statut(){

    const {forfait, montant} = usePayment()
    const [params, setParams] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')

    const date = new Date()
    const jour = date.getDay()
    const mois = date.getMonth() + 1
    const annee = date.getFullYear()

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
    }, [montant,forfait, montantUrl, forfaitUrl])


    return(
        <>

        <div className="absolute inset-y-0 z-10 ">
            <img src={success} alt="" className="h-screen"/>
        </div>
        <div className="flex relative z-20 h-screen bg-orange-100/50 justify-center items-center">
            <div className="">
                <div className="flex flex-col justify-center items-center gap-5 mb-10">
                    <CheckCircle2 size={100} className=" text-green-400/50"/>
                    <p className="text-4xl fuzzy-bubbles-bold">Paiement confirmé avec succès !</p>
                    <span className="text-sm text-gray-400">Bienvenue chez GymPlus. Votre salle de sport est presque
                        prête. Merci de votre confiance
                    </span>
                </div>

                <div className="p-5  rounded-lg bg-white shadow-xl border-3 border-gray-100">
                    <p className="font-bold mb-4 text-2xl">Récapitulatif de votre abonnement</p>
                    <div className="">
                        <div className="flex mb-4 items-center justify-between">
                            <p className="text-sm text-gray-500">Forfait Souscrit</p>
                            <p className="text-sm font-semibold">{forfait}</p>
                        </div>

                        <div className="flex mb-4 items-center justify-between">
                            <p className="text-sm text-gray-500">Téléphone</p>
                            <p className="text-sm font-semibold">{numero}</p>
                        </div>

                        <div className="flex mb-4 items-center justify-between">
                            <p className="text-sm text-gray-500">Montant Payé</p>
                            <p className="text-sm font-semibold">{montant} XOF</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="text-sm font-semibold">{jour}/{mois}/{annee}</p>
                        </div>
                    </div>

                    <hr className="my-5 text-gray-200"/>

                    <p className="font-bold mb-4 text-2xl">Et maintenant ?</p>
                    <div className="">
                        <div className="flex mb-4 items-center gap-1">
                            <CheckCircle2 className="h-5 w-5 text-green-600"/>
                            <p className="text-sm text-gray-500">
                                Notre équipe va procéder à la validation de votre salle de <br />sport.
                                Cette étape prend généralement moins de 24 heures.
                            </p>
                        </div>

                        <div className="flex items-center mb-4 gap-1">
                            <Mail className="h-5 w-5 text-green-600"/>
                            <p className="text-sm text-gray-500">Vous allez recevoir un e-mail de confirmation contenant <br />les détails de
                                votre transation et les informations de votre compte.
                            </p>
                        </div>

                        <div className="flex items-center gap-1">
                            <LayoutDashboard className="h-5 w-5 text-green-600"/>
                            <p className="text-sm text-gray-500">Une fois la validation terminée, vous recevrez un second <br />e-mail vous
                                notifiant que votre accès au tableau de bord est activé.
                            </p>
                        </div>
                    </div>
                </div>

                <motion.button
                    whileTap={{scale:0.95}}
                    onClick={()=>{navigate('/')}}
                    className="flex mx-auto hover:bg-transparent rounded-lg text-white my-10 py-2 px-4 text-sm font-bold items-center justify-center bg-orange-500 text white"
                >
                    Retourner à l'accueil
                </motion.button>

                <p className="text-sm text-center text-gray-600">En cas de question, n'hésitez pas à <span className="text-orange-400 cursor-pointer underline">contacter notre support</span></p>
            </div>

        </div>
        </>
    )
}