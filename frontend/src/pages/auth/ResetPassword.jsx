import React, {useState} from "react";
import coverhero from '../../assets/images/coverhero.png'
import ImageComponent from "../../components/ui/image"
import Input from "../../components/ui/input";
import authimage from '../../assets/images/Reset-password-pana.png'
import { motion } from "framer-motion";
import { KeyIcon, Loader2, MailIcon } from "lucide-react";
import { postResetPassword } from "../../api/auth/postResetPassword";
import { useMutation } from "@tanstack/react-query";
import ToastSuccess from "../../components/ui/ToastSuccess";
import ToastError from "../../components/ui/ToastError";
import { Link } from "react-router-dom";

export default function ResetPassword(){

    const [email, setEmail] = useState('')

    const resetPass = useMutation({
        mutationFn : postResetPassword,
        onSuccess : ()=>{
            setEmail('')
            setTimeout(()=>{
                resetPass.reset()
            }, 4000)
        },

        onError: (()=>{
            setTimeout(()=>{
                resetPass.reset()
            }, 4000)
        })
    })

    const loading = resetPass.isPending
    const error = resetPass.isError
    const success = resetPass.isSuccess

    function handleReset(e){
        e.preventDefault()
        resetPass.mutate({email})
    }


    return(
        <>
            <div className="fixed inset-0 z-30 bg-gradient-to-r from-black/80 to-orange-500">
            </div>

            <div className="fixed inset-0 z-20 flex items-center justify-center">
                <ImageComponent source={coverhero} label={'illustration'} style={"w-full h-full object-cover"} />
            </div>
            
            <div className="relative z-40 min-h-screen w-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
                
                <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto">
                    
                    <div className="hidden lg:flex lg:w-1/2 items-center justify-center rounded-l-lg shadow-lg shadow-orange-500 bg-orange-500 p-4">
                        <ImageComponent source={authimage} label={'illustration'} style={"w-full h-auto max-h-[500px] object-contain"} />
                    </div>

                    <form onSubmit={handleReset} className="w-full lg:w-1/2 bg-black/50 backdrop-blur rounded-lg lg:rounded-l-none lg:rounded-r-lg shadow-lg shadow-black/50 p-6 sm:p-8 md:p-10">
                       
                        <div className="text-center mb-6 sm:mb-8 md:mb-10">
                            <p className="text-white text-3xl sm:text-4xl font-semibold">
                                <span className="text-5xl sm:text-7xl font-bold text-orange-500">G</span>
                                ym
                                <span className="text-5xl sm:text-7xl font-bold text-orange-500">P</span>
                                lus
                            </p>
                            <p className="text-white text-sm sm:text-base italic mt-2">
                                Le logiciel tout en un
                            </p>
                        </div> 

                        <div className="flex flex-col gap-5 sm:gap-6">
                            
                            <div className="text-center sm:text-left">
                                <label className="text-xl sm:text-2xl font-semibold text-white block mb-2">
                                    Adresse e-mail
                                </label>
                                <p className="text-xs sm:text-sm text-orange-300 font-semibold italic">
                                    NB: Saisissez votre adresse e-mail servit lors de la création de compte
                                </p>
                            </div>

                            <div className="relative flex items-center">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                    <MailIcon className="h-10 w-10 p-2 border-r-2 border-orange-500  text-white rounded-l-lg"/>
                                </div>
                                <Input 
                                    className="text-white bg-transparent border-2 border-orange-500 focus:outline-none rounded-lg w-full pl-12 pr-3 text-base sm:text-[18px] py-2 sm:py-2.5"
                                    type="email"
                                    value={email}
                                    placeholder="Saisissez votre adresse email..."
                                    onChange={(e)=>{
                                        setEmail(e.target.value)
                                        resetPass.reset()
                                    }}
                                />
                            </div>

                            <motion.button
                                whileTap={{scale: 0.95}}
                                disabled={loading || !email.trim()}
                                className={`flex justify-center items-center gap-2 font-semibold transition-colors duration-200 border text-base sm:text-xl p-2 sm:p-3 px-4 sm:px-6 rounded-lg w-full ${
                                    !email.trim() 
                                        ? 'bg-orange-300 border-orange-300 text-black/60 cursor-not-allowed' 
                                        : 'bg-orange-500 hover:bg-transparent border-orange-500 text-white cursor-pointer'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin"/>
                                        <span>En cours d'envoi...</span>
                                    </>
                                ): (
                                    "Envoyer le lien de réinitialisation"
                                )}
                            </motion.button>

                            <div className="text-center mt-4">
                                <Link to="/auth" className="text-white hover:text-orange-300 transition-colors duration-200 text-sm underline">
                                    Retour à la page de connexion
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {error && (
                <ToastError 
                    title="Erreur survenue !" 
                    message="Une erreur est survenue, vérifiez vos informations et réessayez à nouveau."
                />
            )}
            {success && (
                <ToastSuccess 
                    title="Lien envoyé !" 
                    message="Un lien de réinitialisation a été envoyé sur votre adresse e-mail"
                />
            )}
        </>
    )
}