import React, {useState, useEffect} from "react";
import coverhero from '../../assets/images/coverhero.png'
import ContactImage from "../../components/ui/image";
import { Eye, EyeOff, Lock, User, KeyIcon, Loader2 } from "lucide-react";
import Input from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import authimage from '../../assets/images/Login.png'
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../api/auth/postLogin";


export default function Auth (){

    const [identifiant, setIdentifiant] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const login = useMutation({
        mutationFn: postLogin,

        onSuccess: (data) => {
            Cookies.set("token", data.token, { expires: 365 });

            setTimeout(() => {
                navigate("/dashboard", {replace : true});
            }, 2500);
        },
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
            <div className="absolute z-30 inset-y-0 w-full items-center flex justify-center bg-gradient-to-r from-black/80 to-orange-500">
            </div>

            <div className="absolute z-20 inset-y-0 w-full items-center flex justify-center">
                <ContactImage source={coverhero} label={'illustration'} style={" w-200 h-200"} />
            </div>


            
            <div className="w-full flex items-center justify-center relative min-h-screen z-40">
                
                <div className="hidden md:hidden lg:block 2xl:block xl:block sm:hidden rounded-tl-lg shadow-lg shadow-orange-500 rounded-bl-lg bg-orange-500">
                    <ContactImage source={authimage} label={'illustration'} style={" w-150 h-150"} />
                </div>

                <form onSubmit={handleConnect} className="shadow-black/50 rounded-tr-lg rounded-br-lg shadow-lg bg-black/50 backdrop-blur flex w-150 flex-col justify-center gap-5 h-150">
                    <p className="text-white text-center text-4xl font-semibold"><span className="text-7xl font-bold text-orange-500">G</span>ym<span className="text-7xl font-bold text-orange-500">P</span>lus
                    <span className="text-base italic ml-2">Le logiciel tout en un</span>
                    </p>  

                    {error && (<span className="text-base font-bold text-center text-red-500 italic ml-2">{login.error.message}</span>  
                    )}
                    {success && (<span className="text-base font-bold text-green-500 flex items-center justify-center italic ml-2 ">Connexions réussie, redirection... <Loader2 className="h-5 w-5 animate-spin text-green-500"/></span>  
                    )} 
                    <div className="flex flex-col gap-5 px-10">
                        <div>
                            <p className="text-2xl font-semibold text-white mb-2">Identifiant</p>
                            <div className="relative flex items-center">
                                <div className="border-r-2 flex items-center justify-center border-orange-500 absolute inset-y-0">
                                    <KeyIcon className="w-10 h-10 w-full h-full p-2 bg-orange-500 text-white rounded-tl-lg rounded-bl-lg"/>
                                </div>
                                <Input 
                                    className={"text-white bg-transparent border-2 border-orange-500  focus:outline-none  rounded-lg w-full block pl-15 text-[18px] py-2  "}
                                    type={"text"}
                                    value={identifiant}
                                    placeholder={"Identifiant GymPlus"}
                                    onChange={(e)=>{setIdentifiant(e.target.value)
                                        login.reset();
                                    }}
                                />
                            </div>
                        </div>

                        <div className="">
                            <p className="text-2xl text-white font-semibold mb-2">Mot de passe</p>
                            <div className="flex relative items-center">
                                <div className="border-r-2 flex items-center justify-center border-orange-500 absolute inset-y-0">
                                    <Lock className="w-10 h-10 w-full h-full p-2 bg-orange-500 text-white rounded-tl-lg rounded-bl-lg"/>
                                </div>
                                <Input 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    placeholder={"Entrez votre mot de passe"}
                                    onChange={(e)=>{setPassword(e.target.value)
                                        login.reset();
                                    }}
                                    className={"text-white focus:outline-none bg-transparent border-2 border-orange-500 rounded-lg w-full block pl-15 pr-9  text-[18px] py-2  "}
                                />
                                <div className="absolute right-0 mr-2 " onClick={(e)=>{setShowPassword(!showPassword)}}>
                                    {showPassword ? <Eye className="text-orange-500 "/> : <EyeOff className="text-orange-500 "/>}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end items-center">
                            <Link to='/reset-password' className=" font-bold hover:text-orange-300 text-white transition-colors duration-200 underline  text-sm">Mot de passe oublié ?</Link>
                        </div>

                        <motion.button
                            whileTap={{scale: 0.95}}
                            disabled={loading || !identifiant.trim() || !password.trim()}
                            className={`flex justify-center mx-auto items-center gap-2 font-semibold transition-colors duration-200  border text-xl 
                                ${!identifiant.trim() || !password.trim() ? 'bg-orange-300 border-orange-300 text-black/60' : 'bg-orange-500 hover:bg-transparent border-orange-500 text-white '} p-2 px-4 rounded-lg my-5`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin text-white"/>
                                    Connexion
                                </>
                            ):(
                                "Se connecter"
                            )}
                        </motion.button>
                        <hr className="text-orange-300"/>

                        <div className="flex flex-col items-center justify-center text-sm text-white gap-1 ">
                            <p>Pas de compte chez GymPus ?</p>
                            <Link to="/" className="underline font-bold transition-colors duration-200  hover:text-orange-300 ">Choisissez un forfait et gérez vos salles dès maintenant</Link>
                        </div>
                    </div>

                    

                </form>


            </div>
        </>
    )
}