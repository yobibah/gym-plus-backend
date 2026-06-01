import React, {useState} from "react";
import coverhero from '../../assets/images/coverhero.png'
import ImageComponent from "../../components/ui/image"
import Input from "../../components/ui/input";
import authimage from '../../assets/images/Reset-password-pana.png'
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, KeyIcon, Loader2, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/auth/postChangePassword";
import ToastSuccess from "../../components/ui/ToastSuccess";
import ToastError from "../../components/ui/ToastError";


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
                change.reset()
            }, 2500)
            setTimeout(()=>{
                navigate('/auth')
            }, 3000)
        },

        onError: (()=>{
            setTimeout(()=>{
                change.reset()
            }, 4000)
        })
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
                            <div>
                                <label className="text-xl sm:text-2xl text-white font-semibold block mb-2">
                                    Nouveau mot de passe
                                </label>
                                <div className="flex relative items-center">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <Lock className="h-10 w-10 p-2 bg-orange-500 text-white rounded-l-lg"/>
                                    </div>
                                    <Input 
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        placeholder="Nouveau mot de passe"
                                        onChange={(e)=>{
                                            setPassword(e.target.value)
                                            change.reset()
                                        }}
                                        className="text-white focus:outline-none bg-transparent border-2 border-orange-500 rounded-lg w-full pl-12 pr-10 text-base sm:text-[18px] py-2 sm:py-2.5"
                                    />
                                </div>
                                {password && password.length < 8 && (
                                    <p className="text-orange-300 text-xs sm:text-sm mt-1">
                                        Le mot de passe doit contenir au moins 8 caractères
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-xl sm:text-2xl text-white font-semibold block mb-2">
                                    Confirmer le mot de passe
                                </label>
                                <div className="flex relative items-center">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <Lock className="h-10 w-10 p-2 bg-orange-500 text-white rounded-l-lg"/>
                                    </div>
                                    <Input 
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        placeholder="Confirmer le mot de passe"
                                        onChange={(e)=>{
                                            setConfirmPassword(e.target.value)
                                            change.reset()
                                        }}
                                        className="text-white focus:outline-none bg-transparent border-2 border-orange-500 rounded-lg w-full pl-12 pr-10 text-base sm:text-[18px] py-2 sm:py-2.5"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 mr-3 focus:outline-none"
                                    >
                                        {showPassword ? 
                                            <Eye className="text-orange-500 h-5 w-5" /> : 
                                            <EyeOff className="text-orange-500 h-5 w-5" />
                                        }
                                    </button>
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                                        Les mots de passe ne correspondent pas
                                    </p>
                                )}
                            </div>
                        </div>

                        <motion.button
                            whileTap={{scale: 0.95}}
                            disabled={loading || !password.trim() || !confirmPassword.trim() || password !== confirmPassword || password.length < 8}
                            className={`flex justify-center items-center gap-2 font-semibold transition-colors duration-200 border text-base sm:text-xl p-2 sm:p-3 px-4 sm:px-6 rounded-lg w-full mt-6 sm:mt-8 ${
                                !password.trim() || !confirmPassword.trim() || password !== confirmPassword || password.length < 8
                                    ? 'bg-orange-300 border-orange-300 text-black/60 cursor-not-allowed' 
                                    : 'bg-orange-500 hover:bg-transparent border-orange-500 text-white cursor-pointer'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin"/>
                                    <span>En cours...</span>
                                </>
                            ):(
                                "Réinitialiser le mot de passe"
                            )}
                        </motion.button>
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
                    title="Changement réussi !" 
                    message={
                        <div className="flex items-center gap-2">
                            Rédirection... 
                            <Loader2 className="h-5 w-5 animate-spin"/>
                        </div>
                    }
                />
            )}
        </>
    )
}