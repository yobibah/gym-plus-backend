import React, {useState} from "react";
import { Link } from "react-router";
import Button from "./ui/button";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function Footer(){

    const [terms, setTerms] = useState(false)
    const [conditions, setConditions] = useState(false)
    const [icon, setIcon] = useState(false)
    const [iconConf, setIconConf] = useState(false)

    const year = new Date().getUTCFullYear()
    

    return(
        <div className="relative">
        <div className="fuzzy-bubbles-regular flex justify-between py-4 lg:px-15 md:px-15 2xl:px-15 xl:px-15 px-5 2xl:mt-50 text-sm bg-white">
            <div>
                &copy;{year} GymPlus. <br className="md:hidden"/>Tous droits réservés
            </div>

            <div className="flex items-center gap-3 ">
                <Button title={"Termes"} className="flex items-center cursor-pointer hover:text-orange-600 transition-colors duration-200" 
                    onClick={()=>{setTerms(!terms), setIcon(!icon), setConditions(false)}}
                    icon={icon ? <ArrowDown className="h-4 w-4 "/> : <ArrowUp className="h-4 w-4"/> }
                />
                <Button title={"Confidentialités"}  className="flex items-center cursor-pointer hover:text-orange-600 transition-colors duration-200" 
                    onClick={()=>{setConditions(!conditions), setIconConf(!iconConf), setTerms(false)}}
                    icon={iconConf ? <ArrowDown className="h-4 w-4 "/> : <ArrowUp className="h-4 w-4"/> }
                />
            </div>
        </div>

            {terms &&(
                <motion.div
                    initial = {{opacity: 0, y: 10}}
                    animate = {{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    
                    className="fuzzy-bubbles-regular absolute px-3 h-100 w-90 lg:w-100 md:w-100 xl:w-100 2xl:w-100 bottom-10 2xl:bottom-13 xl:bottom-13 md:bottom-13 lg:bottom-13 bottom-13 right-3 2xl:right-1 xl:right-1 lg:right-1 md:right-1 flex items-center justify-center rounded-lg z-40 bg-white border-orange-500 border-1 text-black"
                >
                En utilisant GymPlus, vous acceptez les présentes conditions. GymPlus est une plateforme de gestion de salle de sport mise à la disposition des gérants et de leurs adhérents. Le gérant s'engage à fournir des informations exactes lors de son inscription et à choisir un plan adapté (Standard, Pro ou Premium). Le paiement des abonnements s'effectue via les moyens proposés par la plateforme. Tout défaut de paiement entraîne la suspension du compte. GymPlus se réserve le droit de modifier ses offres et tarifs. Le compte peut être résilié à tout moment par le gérant. La responsabilité de GymPlus ne saurait être engagée en cas de litige entre un gérant et ses adhérents.
                </motion.div>
            )}

            {conditions &&(
                <motion.div
                    initial = {{opacity: 0, y: 10}}
                    animate = {{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    
                    className="fuzzy-bubbles-regular absolute px-3  h-100 w-90 lg:w-100 md:w-100 xl:w-100 2xl:w-100 2xl:bottom-13 xl:bottom-13 md:bottom-13 md:right-1 lg:bottom-13 lg:right-1 right-3 bottom-13 2xl:right-1 xl:right-1 flex items-center justify-center rounded-lg z-40 bg-white border-orange-500 border-1 text-black"
                >
                GymPlus collecte les informations nécessaires au fonctionnement du service : nom, prénom, email, téléphone, informations de la salle et documents justificatifs. Les données de paiement sont traitées exclusivement par nos partenaires de paiement sécurisés (YengaPay, CinetPay, etc.). GymPlus ne partage pas vos données avec des tiers sans votre consentement. Vous pouvez à tout moment demander la suppression de votre compte et de vos données. Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification et d'opposition sur vos données personnelles.
                </motion.div>
            )}
        </div>
    )
}