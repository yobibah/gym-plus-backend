import React from "react";
import CardTarif from "./ui/cardTarifs";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import tarifimg from '../assets/images/sucribeimg.png'
import { usePayment } from "../contexts/PaymentContext";

export default function Suscribe(){

    const navigate = useNavigate()
    const {setForfait, setMontant} = usePayment()

    function handleSubscribe(forfait, montant){
        setForfait(forfait)
        setMontant(montant)
        navigate(`/form-subscribe?forfait=${forfait}&montant=${montant}`)
    }

    return(
        <div className="relative xl:rounded-tl-[300px] lg:rounded-tl-[300px] md:rounded-tl-[200px] 2xl:rounded-tl-[600px] rounded-tl-[50px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] bg-gradient-to-r from-orange-100 to-orange-300 min-h-screen flex flex-col items-center justify-center gap-8 md:gap-12 px-4 md:px-8 py-8 md:py-16" id="suscribe">
           
            <div
                className="absolute top-38 right-0 xl:top-15 lg:right-0 lg:top-20 lg:right-0 md:top-30 md:right-0 2xl:top-15 2xl:right-15 z-10 w-25 h-25 2xl:w-80 2xl:h-80 lg:w-50 lg:h-50 xl:w-60 xl:h-60 md:w-50 md:h-50 opacity-60 bg-cover bg-center" 
                style={{ backgroundImage: `url(${tarifimg})` }}
            ></div>
            
            
            <div className="flex flex-col mb-8 md:mb-16 items-center text-center justify-center z-20">
                <h2 className="fuzzy-bubbles-bold  mb-3 text-3xl md:text-5xl">Des Tarifs Adaptés à Vos Besoins</h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                    Choisissez le forfait qui correspond à la taille et aux ambitions de votre salle de sport.
                    Sans engagement.
                </p>
            </div>

           
            <div
                className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 w-full md:w-xl lg:w-4xl xl:w-6xl 2xl:w-6xl z-20 px-4 md:px-0"
            >
                <motion.div
                initial={{opacity: 0, x: -40}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 1.2}}
                viewport={{once: true, amount: 0.3}}
            >
                <CardTarif 
                    className={"p-6 shadow-lg z-20 bg-white rounded-lg hover:border-2 hover:border-orange-600 transition-all"}
                    title={"Standard"}
                    titleClass={"font-bold text-xl mb-2"}
                    text={"Idéal pour les petites salles et les studios qui débutent"}
                    textClass={"text-gray-600 text-sm mb-4"}
                    text1={
                        <>
                            <span className="text-2xl md:text-3xl font-bold">15.000 XOF </span>/ mois
                        </>
                    }
                    icon={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text3={"Jusqu'à 200 membres"}
                    icon2={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text4={"Gestion des adhérents (fiches + activités)"}
                    icon3={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text5={"Gestion basique des abonnements"}
                    icon4={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text6={"Suivi des dates d'expiration"}
                    icon5={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text7={"Enregistrement des paiements"}
                    icon6={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text8={"Alertes simples sur les abonnements expirés"}
                    onClick={()=>{handleSubscribe("Standard", 15000)}}
                    classNameButton={"flex w-full hover:text-white hover:bg-orange-600 cursor-pointer mx-auto items-center font-bold justify-center p-3 bg-orange-100 text-orange-600 rounded-lg transition-colors duration-200"}
                    titleButton={"Choisir Standard"}
                />
                </motion.div>

                <motion.div
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1.2}}
                viewport={{once: true, amount: 0.3}}
            >

                <CardTarif 
                    className={"p-6 relative shadow-lg z-20 bg-white rounded-lg border-2 border-orange-600 transform md:scale-105"}
                    popular={"le plus populaire"}
                    popClass={"absolute -top-0 -right-0 text-xs text-center uppercase p-2 px-4 font-bold bg-orange-600 text-white rounded-bl-lg "}
                    title={"Pro"}
                    titleClass={"font-bold text-xl mb-2"}
                    text={"Pour les salles en croissance qui veulent plus d'outils."}
                    textClass={"text-gray-600 text-sm mb-4"}
                    text1={<>
                            <span className="text-2xl md:text-3xl font-bold">25.000 XOF </span>/ mois
                        </>}
                    icon={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text3={"Jusqu'à 1000 membres"}
                    icon2={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text4={"Tout dans Standard+"}
                    icon3={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text5={"Gestion avancée des abonnements (suspension, réactivation...)"}
                    icon4={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text6={"Gestion recettes et dépenses + créances"}
                    icon5={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text7={"Rapports financiers de base"}
                    icon6={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text8={"Statistiques et rapports avancés"}
                    icon7={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text9={"Emailing manuel pour les rappels ou annonces"}
                    icon8={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text10={"Alertes avancées sur les abonnements expirés / bientôt expirés"}
                    onClick={()=>{handleSubscribe("Pro", 25000)}}
                    classNameButton={"flex w-full transition-colors duration-200 hover:bg-orange-100 hover:text-orange-600 cursor-pointer mx-auto items-center justify-center p-3 bg-orange-600 text-white font-bold rounded-lg"}
                    titleButton={"Choisir Pro"}
                />
                </motion.div>

                <motion.div
                initial={{opacity: 0, x: 40}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 1.2}}
                viewport={{once: true, amount: 0.3}}
            >

                <CardTarif 
                    className={"p-6 shadow-lg z-20 bg-white rounded-lg hover:border-2 hover:border-orange-600 transition-all"}
                    title={"Premium"}
                    titleClass={"font-bold text-xl mb-2"}
                    text={"Idéal pour les petites salles et les studios qui débutent"}
                    textClass={"text-gray-600 text-sm mb-4"}
                    text1={
                         <>
                            <span className="text-2xl md:text-3xl font-bold">40.000 XOF </span>/ mois
                        </>
                    }
                    icon={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text3={"Membres illimités"}
                    icon2={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text4={"Tout dans Pro+"}
                    icon3={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text5={"Emailing automatique (rappels, annonces, fermetures...)"}
                    icon4={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text6={"Tableau de bord avancés"}
                    icon5={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text7={"Analyse détaillées + prévision des revenus"}
                    icon6={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text8={"Alertes intelligentes (adhérants à risque, expiration proche...)"}
                    icon7={<CheckCircle size={20} className="text-green-400 flex-shrink-0"/>}
                    text9={"Support Prioritaire"}
                    onClick={()=>{handleSubscribe("Premium", 40000)}}
                    classNameButton={"flex w-full hover:text-white hover:bg-orange-600 cursor-pointer mx-auto items-center font-bold justify-center p-3 bg-orange-100 text-orange-600 rounded-lg transition-colors duration-200"}
                    titleButton={"Choisir Premium"}
                />
                </motion.div>
            </div>
        </div>
    )
}