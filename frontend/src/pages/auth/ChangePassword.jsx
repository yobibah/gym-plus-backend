import React, {useEffect, useState} from "react";
import coverhero from '../../assets/images/coverhero.png'
import ContactImage from "../../components/ui/image"
import Input from "../../components/ui/input";
import authimage from '../../assets/images/Reset-password-pana.png'
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, KeyIcon, Loader2, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/auth/postChangePassword";


export default function ChangePassword(){

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [params] = useSearchParams()
    const token = params.get('token')
    const email = params.get('email')


    const change = useMutation({
        mutationFn : changePassword,
        onSuccess : ()=>{
            setTimeout(()=>{
                navigate('/auth')
            }, 2000)
        }
    })

    const loading = change.isPending
    const error = change.isError
    const success = change.isSuccess

    async function handleReset(e){
        e.preventDefault()
        change.mutate({
            token, email, password, password_confirmation : confirmPassword
        })
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

                    {error && (<span className="text-base font-bold text-center text-red-500 italic ml-2">{change.error.message}</span>  
                    )}
                    {success && (<span className="text-base font-bold text-green-500 flex items-center justify-center italic ml-2">Changement réussie, redirection... <Loader2 className="h-5 w-5 animate-spin text-green-500"/></span>  
                    )} 
                    <div className="px-10 flex flex-col gap-5">
                        <p className="text-2xl text-white font-semibold">Mot de passe</p>
                        <div className="flex relative items-center">
                            <div className="border-r-2 flex items-center justify-center border-orange-500 absolute inset-y-0">
                                <Lock className="w-10 h-10 w-full h-full p-2 bg-orange-500 text-white rounded-tl-lg rounded-bl-lg"/>
                            </div>
                            <Input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder={"Nouveau mot de passe"}
                                onChange={(e)=>{setPassword(e.target.value)
                                    change.reset()}}
                                className={"text-white focus:outline-none bg-transparent border-2 border-orange-500 rounded-lg w-full block pl-15 pr-9 text-[18px] py-2  "}
                            />
                        </div>

                         <div className="flex relative items-center">
                            <div className="border-r-2 flex items-center justify-center border-orange-500 absolute inset-y-0">
                                <Lock className="w-10 h-10 w-full h-full p-2 bg-orange-500 text-white rounded-tl-lg rounded-bl-lg"/>
                            </div>
                            <Input 
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                placeholder={"Confirmer mot de passe"}
                                onChange={(e)=>{setConfirmPassword(e.target.value)
                                    change.reset()}}
                                className={"text-white focus:outline-none bg-transparent border-2 border-orange-500 rounded-lg w-full block pl-15 pr-9 text-[18px] py-2  "}
                            />
                            <div className="absolute right-0 mr-2 " onClick={(e)=>{setShowPassword(!showPassword)}}>
                                {showPassword ? <Eye className="text-orange-500 "/> : <EyeOff className="text-orange-500 "/>}
                                
                            </div>
                        </div>
                    </div>


                <motion.button
                    whileTap={{scale: 0.95}}
                    disabled={loading || !password.trim() || !confirmPassword.trim() || password !== confirmPassword || password.length < 8}
                    className={`flex items-center gap-2 font-semibold transition-colors duration-200 ${!password.trim() || !confirmPassword.trim() || password !== confirmPassword ? 'bg-orange-300 border-orange-300 text-black/60' : 'hover:bg-transparent border-orange-500 bg-orange-500 text-white'} border text-xl mx-auto   p-2 px-4 rounded-lg  my-5`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin text-white"/>
                            <div>En cours...</div>
                        </>
                    ):(
                        "Réinitialiser"
                    )}
                    </motion.button>

                </form>


            </div>
        </>
    )
}