import React, {useState} from "react";
import coverhero from '../../assets/images/coverhero.png'
import ContactImage from "../../components/ui/image"
import Input from "../../components/ui/input";
import authimage from '../../assets/images/Reset-password-pana.png'
import { motion } from "framer-motion";
import { KeyIcon, Loader2, MailIcon } from "lucide-react";
import { postResetPassword } from "../../api/auth/postResetPassword";
import { useMutation } from "@tanstack/react-query";

export default function ResetPassword(){

    const [email, setEmail] = useState('')

    const resetPass = useMutation({
        mutationFn : postResetPassword,
        onSuccess : ()=>{
            setEmail('')
        }
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
            <div className="absolute z-30 inset-y-0  w-full items-center flex justify-center bg-gradient-to-r from-black/80 to-orange-500">
            </div>

            <div className="absolute z-20 inset-y-0 w-full items-center flex justify-center">
                <ContactImage source={coverhero} label={'illustration'} style={" w-200 h-200"} />
            </div>
            
            <div className="w-full flex items-center justify-center relative min-h-screen z-40">
                
                <div className="hidden md:hidden lg:block 2xl:block xl:block sm:hidden rounded-tl-lg shadow-lg shadow-orange-500 rounded-bl-lg bg-orange-500">
                    <ContactImage source={authimage} label={'illustration'} style={" w-150 h-150"} />
                </div>

                <form onSubmit={handleReset} className="shadow-black/50 rounded-tr-lg rounded-br-lg shadow-lg bg-black/50 backdrop-blur flex w-150 flex-col justify-center gap-10 md:px-10 h-150">
                    <p className="text-white text-center text-4xl font-semibold"><span className="text-7xl font-bold text-orange-500">G</span>ym<span className="text-7xl font-bold text-orange-500">P</span>lus
                    <span className="text-base italic ml-2">Le logiciel tout en un</span>
                    </p> 

                    {error && (<span className="text-base font-bold text-center text-red-500 italic ml-2">{resetPass.error.message}</span>  
                    )}
                    {success && (<span className="text-base font-bold text-center text-green-500 italic ml-2">Un lien de reinitialisation a été envoyé sur votre adresse e-mail</span>  
                    )} 
                    <div className=" px-10 flex flex-col gap-5">
                        <div>
                            <p className="text-2xl font-semibold text-white">Adresse e-mail</p>
                            <p className="text-sm text-red-500 font-semibold italic">NB: votre adresse e-mail servit lors de la création de compte</p>
                        </div>
                        <div className="relative flex items-center">
                            <div className="border-r-2 flex items-center justify-center border-orange-500 absolute inset-y-0">
                                <MailIcon className="w-10 h-10 w-full h-full p-2 bg-orange-500 text-white rounded-tl-lg rounded-bl-lg"/>
                            </div>
                            <Input 
                                className={"text-white bg-transparent border-2 border-orange-500  focus:outline-none  rounded-lg w-full block pl-15 text-[18px] py-2  "}
                                type={"email"}
                                value={email}
                                placeholder={"Saisissez..."}
                                onChange={(e)=>{setEmail(e.target.value)
                                    resetPass.reset()
                                }}
                            />
                        </div>
                    </div>


                    <motion.button
                        whileTap={{scale: 0.95}}
                        disabled={loading || !email.trim()}
                        className={`flex items-center gap-2 font-semibold transition-colors duration-200 ${!email.trim() ? 'bg-orange-300 border-orange-300 text-black/60' : 'bg-orange-500 hover:bg-transparent border-orange-500 text-white'} border text-xl mx-auto  p-2 px-4 rounded-lg my-5`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin text-white"/>
                                <div>En cours d'envoie...</div>
                            </>
                        ): (
                            "Envoyez le lien"
                        )}
                    </motion.button>

                </form>


            </div>
        </>
    )
}