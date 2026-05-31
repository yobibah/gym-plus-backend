import React, {useState, useEffect} from "react";
import coverhero from '../../assets/images/coverhero.png'
import ImageComponent from "../../components/ui/image";
import { Eye, EyeOff, Lock, User, KeyIcon, Loader2, CheckCircle2 } from "lucide-react";
import Input from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import authimage from '../../assets/images/Login.png'
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../api/auth/postLogin";
import ToastError from "../../components/ui/ToastError";
import ToastSuccess from "../../components/ui/ToastSuccess";


export default function Auth (){

    const [identifiant, setIdentifiant] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const login = useMutation({
        mutationFn: postLogin,

        onSuccess: (data) => {
            Cookies.set("token", data.token, { expires: 365 });

                setTimeout(()=>{
                    login.reset()
                }, 2500)
            setTimeout(() => {
                navigate("/dashboard", {replace : true});
            }, 3000);
        },

        onError: (()=>{
            setTimeout(()=>{
                login.reset()
            }, 4000)
        })
    });

    const loading = login.isPending
    const error = login.isError
    const success = login.isSuccess

    async function handleConnect(e){
        e.preventDefault()
        login.mutate({username: identifiant, password})
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

                    
                    <form onSubmit={handleConnect} className="w-full lg:w-1/2 bg-black/50 backdrop-blur rounded-lg lg:rounded-l-none lg:rounded-r-lg shadow-lg shadow-black/50 p-6 sm:p-8 md:p-10">
                        
                        <div className="text-center mb-6 sm:mb-8">
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

                        <div className="flex flex-col gap-4 sm:gap-5">
                            
                            <div>
                                <label className="text-xl sm:text-2xl font-semibold text-white mb-2 block">
                                    Identifiant
                                </label>
                                <div className="relative flex items-center">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <KeyIcon className="h-10 w-10 p-2 border-r-2 border-orange-500 text-white rounded-l-lg"/>
                                    </div>
                                    <Input 
                                        className="text-white bg-transparent border-2 border-orange-500 focus:outline-none rounded-lg w-full pl-12 pr-3 text-base sm:text-[18px] py-2 sm:py-2.5"
                                        type="text"
                                        value={identifiant}
                                        placeholder="Identifiant GymPlus"
                                        onChange={(e)=>{
                                            setIdentifiant(e.target.value)
                                            login.reset();
                                        }}
                                    />
                                </div>
                            </div>

                            
                            <div>
                                <label className="text-xl sm:text-2xl text-white font-semibold mb-2 block">
                                    Mot de passe
                                </label>
                                <div className="flex relative items-center">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <Lock className="h-10 w-10 p-2 border-r-2 border-orange-500 text-white rounded-l-lg"/>
                                    </div>
                                    <Input 
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        placeholder="Entrez votre mot de passe"
                                        onChange={(e)=>{
                                            setPassword(e.target.value)
                                            login.reset();
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
                            </div>

                            
                            <div className="flex justify-end">
                                <Link to='/reset-password' className="font-bold hover:text-orange-300 text-white transition-colors duration-200 underline text-xs sm:text-sm">
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            
                            <motion.button
                                whileTap={{scale: 0.95}}
                                disabled={loading || !identifiant.trim() || !password.trim()}
                                className={`flex justify-center items-center gap-2 font-semibold transition-colors duration-200 border text-base sm:text-xl p-2 sm:p-3 px-4 sm:px-6 rounded-lg w-full ${
                                    !identifiant.trim() || !password.trim() 
                                        ? 'bg-orange-300 border-orange-300 text-black/60 cursor-not-allowed' 
                                        : 'bg-orange-500 hover:bg-transparent border-orange-500 text-white cursor-pointer'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin"/>
                                        Connexion en cours...
                                    </>
                                ):(
                                    "Se connecter"
                                )}
                            </motion.button>

                           
                            <hr className="border-orange-300/50 my-2"/>

                            
                            <div className="flex flex-col items-center justify-center text-xs sm:text-sm text-white gap-2 text-center">
                                <p>Pas de compte chez GymPlus ?</p>
                                <Link to="/" className="underline font-bold transition-colors duration-200 hover:text-orange-300">
                                    Choisissez un forfait et gérez vos salles dès maintenant
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
                    title="Connexion réussie !" 
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