import React, {useState, useEffect} from "react";
import contactimg from '../assets/images/contactimg.png'
import ContactImage from "./ui/image";
import { motion } from "framer-motion";
import { Mail, Pencil, Loader2 } from "lucide-react";
import Input from "./ui/input";
import Button from "./ui/button";
import useGetUrl from "../hooks/useGetUrl";

export default function Contact(){
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const {apiUrl} = useGetUrl()


    async function Submit(e){
         e.preventDefault()
        setLoading(true)
        setSuccess('')
        setError('')

        try{

            // url: /accueil-form
            // données que j'nevoie: email et message
            // réponse attendu en json, je ne gère pas les codes réponses non plus
            // je pers sur un truc basique 'vrai ou faux', si la requête est passée c'est bon
            // mais si y'a erreur ça renvoie juste un echec

            const response = await fetch(`${apiUrl}accueil-form`,{
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify({
                    email : email,
                    message : message
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Echec! réeesayez')
            }

            setSuccess(`Succès! votre demande à été prise en compte \nNous vous répondrons dans un délai de 48h`)
           
            console.log(data)
        } catch (e){
            setError('Echec! Veuillez réessayez.')
        } finally{
            setLoading(false)
        }
    }
    
    return(
        <div className="xl:py-12 2xl:py-10 xl:mt-30 md:mt-30 lg:mt-30 md:py-15 lg:py-10  px-4 py-15" id="contact">
            

            <div className="flex flex-col mb-16 items-center text-center justify-center">
                <h2 className="fuzzy-bubbles-bold  mb-3 text-3xl md:text-5xl">Service Ouvert 24/7j</h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                    Déposez une demande de démonstration, posez vos questions,
                    et toutes sortes de préoccupations.
                </p>
            </div>

            <div className="2xl:rounded-tr-[300px] 2xl:rounded-br-[300px] xl:rounded-tr-[150px] xl:rounded-br-[150px] md:rounded-tr-[200px] md:rounded-br-[200px] lg:rounded-tr-[100px] lg:rounded-br-[100px] rounded-tr-[30px] rounded-br-[30px] rounded-bl-[100px]  rounded-tl-[100px] bg-gradient-to-r from-white to-orange-300 bg-orange-100">
                
                    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-12 p-4 md:p-8 lg:p-12">
                        
                        <motion.div
                    initial={{opacity: 0, x: -40}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 1.2}}
                    viewport={{once: true, amount: 0.3}}
                    className="lg:relative 2xl:relative xl:relative md:hidden hidden 2xl:flex items-center md:flex items-center xl:flex items-center lg:flex items-center xl:h-100 lg:h-100 justify-center"
                >
                        
                            <ContactImage 
                                source={contactimg} 
                                label={"illustration 3D"} 
                                style={"w-full  h-auto xl:absolute lg:absolute xl:-right-20 xl:-top-15 2xl:-right-50 2xl:-top-40 lg:-right-20 lg:-top-10 -right-50 -top-40"}
                            />
                        </motion.div>

                        <motion.div
                    initial={{opacity: 0, x: 40}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 1.2}}
                    viewport={{once: true, amount: 0.3}}
                    className=" flex justify-center"
                >
                            
                            <form onSubmit={Submit} className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8 flex flex-col gap-4 md:gap-6">
                                
                                {success && (
                                    <p className="text-green-500 text-sm text-center">{success}</p>
                                )}
                                {error && (
                                    <p className="text-red-500 text-sm text-center">{error}</p>
                                )}

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-orange-600"/>
                                    </div>
                                    <Input 
                                        type={"email"}
                                        value={email}
                                        placeholder={"Entrez votre adresse mail"}
                                        onChange={(e)=>{
                                            setEmail(e.target.value);
                                            setSuccess('')
                                            setError('')
                                        }}
                                        className={"block w-full pl-10 pr-3 py-3 rounded-xl bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-sm md:text-base"}
                                    />
                                </div>

                                
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <Pencil className="h-5 w-5 text-orange-600"/>
                                    </div>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        value={message}
                                        placeholder="Exprimez-vous..."
                                        onChange={(e)=>{
                                            setMessage(e.target.value),
                                             setSuccess('')
                                            setError('')
                                        }}
                                        rows="6"
                                        className="w-full block bg-orange-100 pl-10 pr-3 py-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none text-sm md:text-base"
                                    />
                                </div>

                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    className="flex items-center justify-center mt-4"
                                >
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full max-w-xs bg-orange-600 text-white font-bold py-3 px-6 rounded-xl cursor-pointer hover:bg-white hover:text-orange-600 hover:border-2 border-orange-600 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span>Envoi en cours...</span>
                                            </>
                                        ) : (
                                            'Envoyer'
                                        )}
                                    </button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </div>
            </div>
        </div>
    )
}