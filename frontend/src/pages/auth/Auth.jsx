import React, {useState, useEffect} from "react";
import coverhero from '../../assets/images/coverhero.png'
import ContactImage from "../../components/ui/image";
import { Eye, EyeOff, Lock, User, KeyIcon, Loader2 } from "lucide-react";
import Input from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import authimage from '../../assets/images/authimage.png'
import Button from "../../components/ui/button";
import { motion } from "framer-motion";
import useGetUrl from "../../hooks/useGetUrl";
import Cookies from "js-cookie";


export default function Auth (){

    const [identifiant, setIdentifiant] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()
    const {apiUrl} = useGetUrl()

    

    async function handleConnect(e){
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try{
            const response = await fetch(`${apiUrl}login`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body : JSON.stringify({
                    identifiant : identifiant,
                    password : password
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Erreur de connexion')
            }

            setSuccess(true)
            Cookies.set('token', data.token, {expires: 365})
            setTimeout(()=>{
                navigate('/dashboard')
            },1500)

        }catch(e){
            setError(e.message || 'Erreur! Vérifier vos informations')
        }finally{
            setLoading(false)
        }
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

                <form onSubmit={handleConnect} className="shadow-black/50 rounded-tr-lg rounded-br-lg shadow-lg bg-black/50 backdrop-blur flex w-150 flex-col justify-center gap-8 h-150">
                    <p className="text-white text-center text-4xl font-semibold"><span className="text-7xl italic font-bold text-orange-500">G</span>ym<span className="text-7xl italic font-bold text-orange-500">P</span>lus
                    <span className="text-base italic ml-2">Le logiciel tout en un</span>
                    </p>  

                    {error && (<span className="text-base font-bold text-center text-red-500 italic ml-2">{error}</span>  
                    )}
                    {success && (<span className="text-base font-bold text-center text-green-500 italic ml-2">Connexions réussie, redirection...</span>  
                    )} 
                    <div className=" px-10">
                    <p className="text-2xl font-semibold text-white mb-2">Identifiant</p>
                    <div className="relative flex items-center">
                        <div className="border-r-2 border-orange-500 absolute inset-y-0">
                            <KeyIcon className="w-10 h-10 p-2 bg-orange-500 text-white rounded-tl-lg rounded-bl-lg"/>
                        </div>
                        <Input 
                            className={"text-white bg-transparent border-2 border-orange-500  focus:outline-none focus:ring-1 focus:ring-orange-500 rounded-lg w-full block pl-12 text-xl h-10  "}
                            type={"text"}
                            value={identifiant}
                            placeholder={"entrez votre identifiant"}
                            onChange={(e)=>{setIdentifiant(e.target.value)
                                setError("")
                                setSuccess('')
                            }}
                        />
                    </div>
                    </div>

                    <div className="px-10">
                    <p className="text-2xl text-white font-semibold mb-2">Mot de passe</p>
                    <div className="flex relative items-center">
                        <div className="border-r-2 border-orange-500 absolute inset-y-0">
                            <Lock className="w-10 h-10 p-2 bg-orange-500 text-white rounded-tl-lg rounded-bl-lg"/>
                        </div>
                        <Input 
                            type={showPassword ? "text" : "password"}
                            value={password}
                            placeholder={"entrez votre mot de passe"}
                            onChange={(e)=>{setPassword(e.target.value)
                                setError("")
                                setSuccess('')}}
                            className={"text-white focus:outline-none focus:ring-1 focus:ring-orange-500 bg-transparent border-2 border-orange-500 rounded-lg w-full block pl-12 pr-9  text-xl h-10  "}
                        />
                        <div className="absolute right-0 mr-2 " onClick={(e)=>{setShowPassword(!showPassword)}}>
                            {showPassword ? <Eye className="text-orange-500 "/> : <EyeOff className="text-orange-500 "/>}
                            
                        </div>
                    </div>
                    </div>

                    <div className="flex px-10 justify-end items-center">
                    <Link to='/reset-password' className=" hover:text-orange-300 text-white transition-colors duration-200 underline  text-sm">Mot de passe oublié ?</Link>
                    </div> 

                <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    disabled={loading || !identifiant.trim() || !password.trim()}
                    className={`flex items-center gap-2 font-semibold transition-colors duration-200  border-2 text-xl mx-auto 
                        ${!identifiant.trim() || !password.trim() ? 'bg-gray-400 border-gray-400' : 'bg-orange-500 hover:bg-transparent border-orange-500'} text-white p-2 px-4 rounded-lg cursor-pointer my-5`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin text-white"/>
                            <div>Connexion</div>
                        </>
                    ):(
                        "Se connecter"
                    )}
                    </motion.button>

                    <div className="flex items-center justify-center text-sm text-white gap-2 p-2 px-4">
                        <p>Pas de compte ?</p>
                        <Link to="/" className="underline  transition-colors duration-200  hover:text-orange-300 ">choisir un forfait</Link>
                    </div>

                </form>


            </div>
        </>
    )
}