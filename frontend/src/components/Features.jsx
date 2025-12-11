
import React from "react";
import Card from "./ui/cards";
import { Users, Receipt, Calendar, Medal, LayoutDashboard, Settings } from "lucide-react";
import { motion } from "framer-motion";
import featuresimg from '../assets/images/featuresimg.png'

export default function Features(){
    return(
        <div className="relative min-h-screen flex flex-col items-center justify-center xl:py-25 md:py-25 lg:py-25  px-4 py-15" id="features">
            
            <div
                className="absolute xl:top-30 lg:left-0 lg:top-30 lg:left-0 md:top-30 md:left-0 2xl:top-15 top-20 left-0  2xl:left-15 z-10 opacity-60 w-25 h-25 2xl:w-80 2xl:h-80 lg:w-50 lg:h-50 xl:w-60 xl:h-60 md:w-50 md:h-50 bg-cover bg-center" 
                style={{ backgroundImage: `url(${featuresimg})` }}
            ></div>
            
            <div className="flex flex-col mb-8 md:mb-16 items-center text-center justify-center z-20">
                <h2 className="fuzzy-bubbles-bold mb-3 text-3xl md:text-5xl">Optimisez Votre Gestion Quotidienne</h2>
                <p className="text-base  md:text-lg text-gray-600 max-w-2xl">
                    GymPlus centralise toutes les fonctionnalités dont vous avez besoin pour gérer et développer votre salle de sport.
                </p>
            </div>

           
            <div
                className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:gap-4 2xl:gap-6 gap-6 lg:w-4xl lg:gap-10 md:w-2xl xl:w-6xl 2xl:w-6xl w-full z-20"
                
            >
                <motion.div
            
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <Card 
                    className="flex flex-col rounded-lg w-full min-h-64 items-center hover:shadow-lg shadow-orange-600 transition-all duration-200 justify-center p-6 hover:border-none border-2 border-orange-600"
                    iconClass="h-12 w-12 rounded-full bg-orange-600 mb-4 mx-auto text-white p-2 hover:bg-white hover:text-black border-2 border-orange-600 transition-all"
                    titleClass="text-lg md:text-xl text-center font-bold"
                    textClass="text-sm mt-3 text-center text-gray-600"
                    icon={<Users className="h-6 w-6 md:h-8 md:w-8" />}
                    title="Gestion des membres"
                    text="Suivez les inscriptions, les profils et les activités de vos membres en un seul endroit."
                />
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <Card 
                    className="flex flex-col rounded-lg w-full min-h-64 items-center hover:shadow-lg shadow-orange-600 transition-all duration-200 justify-center p-6 hover:border-none border-2 border-orange-600"
                    iconClass="h-12 w-12 rounded-full bg-orange-600 mb-4 mx-auto text-white p-2 hover:bg-white hover:text-black border-2 border-orange-600 transition-all"
                    titleClass="text-lg md:text-xl text-center font-bold"
                    textClass="text-sm mt-3 text-center text-gray-600"
                    icon={<Receipt className="h-6 w-6 md:h-8 md:w-8" />}
                    title="Abonnements & Paiements"
                    text="Automatisez la facturation, suivez les paiements et gérez facilement les différents types d'abonnements."
                />
                </motion.div>

                <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true, amount: 0.3 }}
            >

                <Card 
                    className="flex flex-col rounded-lg w-full min-h-64 items-center hover:shadow-lg shadow-orange-600 transition-all duration-200 justify-center p-6 hover:border-none border-2 border-orange-600"
                    iconClass="h-12 w-12 rounded-full bg-orange-600 mb-4 mx-auto text-white p-2 hover:bg-white hover:text-black border-2 border-orange-600 transition-all"
                    titleClass="text-lg md:text-xl text-center font-bold"
                    textClass="text-sm mt-3 text-center text-gray-600"
                    icon={<Calendar className="h-6 w-6 md:h-8 md:w-8" />}
                    title="Planification des cours"
                    text="Créez et gérez votre planning de cours collectifs, et permettez à vos membres de réserver en ligne."
                />
                </motion.div>

                <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true, amount: 0.3 }}
            >

                <Card 
                    className="flex flex-col rounded-lg w-full min-h-64 items-center hover:shadow-lg shadow-orange-600 transition-all duration-200 justify-center p-6 hover:border-none border-2 border-orange-600"
                    iconClass="h-12 w-12 rounded-full bg-orange-600 mb-4 mx-auto text-white p-2 hover:bg-white hover:text-black border-2 border-orange-600 transition-all"
                    titleClass="text-lg md:text-xl text-center font-bold"
                    textClass="text-sm mt-3 text-center text-gray-600"
                    icon={<LayoutDashboard className="h-6 w-6 md:h-8 md:w-8" />}
                    title="Statistiques et Rapports"
                    text="Accédez à des données clés sur vos revenus, la fréquentation et la rétention des membres."
                />
                </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true, amount: 0.3 }}
            >

                <Card 
                    className="flex flex-col rounded-lg w-full min-h-64 items-center hover:shadow-lg shadow-orange-600 transition-all duration-200 justify-center p-6 hover:border-none border-2 border-orange-600"
                    iconClass="h-12 w-12 rounded-full bg-orange-600 mb-4 mx-auto text-white p-2 hover:bg-white hover:text-black border-2 border-orange-600 transition-all"
                    titleClass="text-lg md:text-xl text-center font-bold"
                    textClass="text-sm mt-3 text-center text-gray-600"
                    icon={<Medal className="h-6 w-6 md:h-8 md:w-8" />}
                    title="Programme de fidélisation"
                    text="Mettez en place des récompenses et des offres spéciales pour fidélisez vos clients les plus engagés."
                />
                </motion.div>

                <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true, amount: 0.3 }}
            >

                <Card 
                    className="flex flex-col rounded-lg w-full min-h-64 items-center hover:shadow-lg shadow-orange-600 transition-all duration-200 justify-center p-6 hover:border-none border-2 border-orange-600"
                    iconClass="h-12 w-12 rounded-full bg-orange-600 mb-4 mx-auto text-white p-2 hover:bg-white hover:text-black border-2 border-orange-600 transition-all"
                    titleClass="text-lg md:text-xl text-center font-bold"
                    textClass="text-sm mt-3 text-center text-gray-600"
                    icon={<Settings className="h-6 w-6 md:h-8 md:w-8" />}
                    title="Accès Multi-plateformes"
                    text="Gérez votre salle depuis n'importe quel appareil, que vous soyez au bureau ou en déplacement."
                />
                </motion.div>
            </div>
        </div>
    )
}