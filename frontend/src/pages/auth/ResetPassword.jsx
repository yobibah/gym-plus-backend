import React, {useState} from "react";
import coverhero from '../../assets/images/coverhero.png'
import ContactImage from "../../components/ui/image"
import Input from "../../components/ui/input";
import authimage from '../../assets/images/authimage.png'
import useGetUrl from "../../hooks/useGetUrl";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { KeyIcon, Loader2 } from "lucide-react";
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

                <form onSubmit={handleReset} className="shadow-black/50 rounded-tr-lg rounded-br-lg shadow-lg bg-black/50 backdrop-blur flex w-150 flex-col justify-center gap-8 md:px-10 h-150">
                    <p className="text-white text-center text-4xl font-semibold"><span className="text-7xl italic font-bold text-orange-500">G</span>ym<span className="text-7xl italic font-bold text-orange-500">P</span>lus
                    <span className="text-base italic ml-2">Le logiciel tout en un</span>
                    </p>  

                    {error && (<span className="text-base font-bold text-center text-red-500 italic ml-2">{resetPass.error.message}</span>  
                    )}
                    {success && (<span className="text-base font-bold text-center text-green-500 italic ml-2">Un lien de reinitialisation a été envoyé sur votre adresse mail</span>  
                    )} 
                    <div className=" px-10">
                    <p className="text-2xl font-semibold text-white mb-2">Identifiant</p>
                    <div className="relative flex items-center">
                        <div className="border-r-2 border-orange-500 absolute inset-y-0">
                            <KeyIcon className="w-10 h-10 p-2 bg-orange-500 text-white rounded-tl-lg rounded-bl-lg"/>
                        </div>
                        <Input 
                            className={"text-white bg-transparent border-2 border-orange-500  focus:outline-none focus:ring-1 focus:ring-orange-500 rounded-lg w-full block pl-12 text-xl h-10  "}
                            type={"email"}
                            value={email}
                            placeholder={"entrez votre adresse e-mail"}
                            onChange={(e)=>{setEmail(e.target.value)
                                resetPass.reset()
                            }}
                        />
                    </div>
                    </div>


                <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    disabled={loading || !email.trim()}
                    className={`flex items-center gap-2 font-semibold transition-colors duration-200 ${!email.trim() ? 'bg-gray-400 border-gray-400' : 'bg-orange-500 hover:bg-transparent border-orange-500'} border-2 text-xl mx-auto text-white p-2 px-4 rounded-lg cursor-pointer my-5`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin text-white"/>
                            <div>Réinitialisation</div>
                        </>
                    ): (
                        "Réinitialiser"
                    )}
                    </motion.button>

                </form>


            </div>
        </>
    )
}