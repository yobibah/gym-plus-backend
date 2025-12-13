import React, {useState, useEffect} from "react";
import Input from "../../components/ui/input";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, XCircle, Loader2, LoaderIcon, Beaker } from "lucide-react";
import useGetUrl from "../../hooks/useGetUrl";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import form1 from '../../assets/images/form1.png'
import { motion } from "framer-motion";
import { usePayment } from "../../contexts/PaymentContext";



export default function InfosLogin(){

    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [modalForfait, setModalForfait] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [errorOtp, setErrorOtp] = useState(null)
    const [successOtp, setSuccessOtp] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingOtp, setLoadingOtp] = useState(false)
    const [otpStep, setOtpStep] = useState(false)

    const {montant, forfait, setMontant, setForfait} = usePayment()
    const [params, setParams] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')


    const {apiUrl} = useGetUrl()
    const navigate = useNavigate()
    
    const forfaitList = [
        {id:1, forfait: "Standard", montant: 15000}, 
        {id:2, forfait:"Pro", montant: 25000}, 
        {id:3, forfait:"Premium", montant: 40000}, 
    ]

    const choix_forfait = JSON.parse(localStorage.getItem('choix_forfait'))

    useEffect(()=>{
        const token = Cookies.get('token')
        const status_salle = localStorage.getItem('status_salle')
        const infosEnregistre = localStorage.getItem('form')
        const otp_valide = localStorage.getItem('status_otp')

        if(!token){
            localStorage.removeItem('form')
            localStorage.removeItem('status_otp')
            localStorage.removeItem('status_salle')
            navigate('/form-subscribe', {replace: true})
            return
        }


        if( token && status_salle === 'salle_info_remplie' && infosEnregistre && otp_valide === 'otp_verifie'){
            navigate(`/paiement?forfait=${choix_forfait.forfait}&montant=${choix_forfait.montant}`)
        } else if(token && infosEnregistre && otp_valide === 'otp_verifie'){
            navigate(`/infos-salle?forfait=${choix_forfait.forfait}&prix=${choix_forfait.montant}`)
        } 


    },[])

    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || Number(montantUrl) !== Number(montant)){
            navigate(`/form-subscribe?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    },[forfait, montant, forfaitUrl, montantUrl])



    async function handleInfos(e){
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setLoading(true)
        setOtpStep(false)
        

        try{
            const response = await fetch(`${apiUrl}infos-perso`,{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body : JSON.stringify({
                    nom: nom,
                    prenom: prenom,
                    telephone : tel,
                    email: email
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || 'Erreur lors de l\'inscription! Réessayez')
            }

            setSuccess(true)
            Cookies.set('token', data.token, {expires: 365})
            
            localStorage.setItem('form', JSON.stringify({nom, prenom, tel, email}))
            setOtpStep(true)
        } catch(e){
            setError(e.message || 'Erreur! Veuillez réessayer')
        } finally{
            setLoading(false)
        }
    }


    async function handleOtp(e) {
        e.preventDefault()
        setErrorOtp(null)
        setSuccessOtp(null)
        setOtpStep(true)
        setLoadingOtp(true)
        try{
            const token = Cookies.get('token')
            const response = await fetch(`${apiUrl}validation-email`,{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`, 
                    "Accept" : "application/json"
                },
                body : JSON.stringify({
                    codeOtp: otp,
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || 'Erreur survenue lors de la récupération de données')
            }

            setSuccessOtp(true)
            localStorage.setItem('status_otp', 'otp_verifie')
            setTimeout(()=>{
                navigate(`/infos-salle?forfait=${choix_forfait.forfait}&prix=${choix_forfait.montant}`)
            }, 2500)
        } catch(e){
            setErrorOtp(e.message || 'Erreur! Réessayer')
        } finally{
            setLoadingOtp(false)
        }
        
    }



    return(
        <>
            <div className="absolute inset-y-0 z-20 flex bg-cover bg-center">
                <img src={form1} alt=""
                    className=" "
                />
            </div>
        <div className=" relative z-30 bg-orange-100/50 flex justify-center  items-center h-screen">
            <div className="">
                <div className="mb-8 text-center">
                    <p className="fuzzy-bubbles-bold uppercase text-4xl mb-2">Inscription</p>
                    <p className="text-gray-600">Renseignez vos informations personnelles pour commencer.</p>
                </div>

                <div className="flex items-center justify-between py-5 px-8 mb-8 bg-white border-3 border-gray-100 shadow-lg rounded-xl">
                    <div>
                        <p className="text-gray-600 text-sm">Forfait choisi</p>
                        <p className="fuzzy-bubbles-bold">{forfait}</p>
                    </div>
                    <div className="relative">
                        <button 
                            className=" cursor-pointer hover:underline text-orange-600 font-bold text-sm"
                            onClick={()=>{setModalForfait(!modalForfait)}}
                        >Changer</button>

                        {modalForfait && (
                            <>
                            <motion.div
                                initial={{ opacity: 0, y: -1 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-orange-600 rounded-sm text-white  absolute p-2 font-semibold text-sm -right-4"
                            >
                                {forfaitList.map(item => (
                                    <p key={item.id}
                                        onClick={()=>{
                                            setForfait(item.forfait)
                                            setMontant(item.montant)
                                            setParams({forfait: item.forfait, montant: item.montant},
                                            setModalForfait(false)
                                            )
                                        }}
                                        className="cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black p-1 rounded-lg"
                                    >{item.forfait}</p>
                                ))}
                            </ motion.div>
                            </>
                        )}
                    </div>
                </div>

                <form onSubmit={otpStep ? handleOtp : handleInfos} className="bg-white border-3 border-gray-100 shadow-lg rounded-xl mb-10">
                    

                    <div className="py-5 px-8">
                        <p className="mb-4 fuzzy-bubbles-bold text-xl">Informations personnelles</p>
                        
                        

                        <div className="flex mb-4 items-center justify-between">
                            <div>
                                <label className="text-sm font-semibold mb-1">Nom <span className="text-orange-600">*</span></label>
                                <Input 
                                    type={'text'}
                                    value={nom}
                                    disabled={success}
                                    placeholder={'Ex: Joseph'}
                                    onChange={(e)=>{setNom(e.target.value),
                                        setError('')
                                    }}
                                    className={`w-full ${success ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 label-2 text-sm border-1 border-gray-300`}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1">Prénom <span className="text-orange-600">*</span></label>
                                <Input 
                                    type={'text'}
                                    value={prenom}
                                    disabled={success}
                                    placeholder={'Ex: Ouedraogo'}
                                    onChange={(e)=>{setPrenom(e.target.value),
                                        setError('')
                                    }}
                                    className={`w-full ${success ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 label-2 text-sm border-1 border-gray-300`}
            
                                
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-sm font-semibold mb-1">Numéro de téléphone <span className="text-orange-600">*</span></label>
                            <Input 
                                type={'tel'}
                                value={tel}
                                disabled={success}
                                placeholder={'Ex: 70000000'}
                                pattern={"[0-9]+"}
                                onChange={(e)=>{setTel(e.target.value),
                                    setError('')
                                }}
                                    className={`w-full ${success ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 label-2 text-sm border-1 border-gray-300`}
               
                            />
                        </div>

                        <div className={`${error || success ? 'mb-4' : ''}`}>
                            <label className="text-sm font-semibold mb-1">Adresse e-mail <span className="text-orange-600">*</span></label>
                            <Input 
                                type={'email'}
                                value={email}
                                disabled={success}
                                placeholder={'Ex: adresse@domaine.com'}
                                onChange={(e)=>{setEmail(e.target.value),
                                    setError('')
                                }}
                                    className={`w-full ${success ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 label-2 text-sm border-1 border-gray-300`}
         
                            />
                        </div>

                        {error && (
                            <span className="flex items-center gap-1 text-red-500 text-sm italic">
                                <XCircle className="h-4 w-4"/>{error}</span>
                        )}
                        {success && (
                            <span className="flex items-center gap-1 text-green-500 text-sm italic">
                                <CheckCircle className="h-4 w-4"/>Informations personnelles validées !</span>
                        )}
                    </div>



                    {otpStep && (
                        <>
                            <hr className=" mb-3 mt-3 text-gray-200"/>

                            <div className="py-5 px-8">
                                <p className="mb-4 text-xl fuzzy-bubbles-bold">Confirmer votre adresse email</p>

                                
                        
                                <div className={`${successOtp || errorOtp ? 'mb-1' : ''}`}>
                                    <p className="text-sm text-gray-600 font-semibold mb-1">Un code de vérification a été envoyé sur <span className="text-orange-600 italic underline"> {email} </span> </p>
                                    
                                    <Input 
                                        type={'tel'}
                                        value={otp}
                                        pattern={"[0-9]{6}"}
                                        placeholder={'code à 6 chiffres'}
                                        onChange={(e)=>{setOtp(e.target.value),
                                            setErrorOtp('')
                                        }}
                                        className={'w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-sm border-1 border-gray-300'}  
                                    /> 

                                </div>
                                {errorOtp && (
                                    <span className="flex items-center gap-1 text-red-500 text-sm italic">
                                        <XCircle className="h-4 w-4"/>{errorOtp}</span>
                                )}
                                {successOtp && (
                                    <span className="flex items-center gap-1 text-green-500 text-sm italic">
                                        <CheckCircle className="h-4 w-4"/>Code Validé !</span>
                                )}
                            </div>
                        </>
                    )}

                    


                    <div className="bg-orange-50  flex justify-end px-8 py-5">
                        {otpStep ? (
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                disabled={loadingOtp || !otp.trim() || otp.length < 6 }
                                className={`${
                                    !otp.trim() || otp.length < 6 ? 'bg-gray-300 border-1 border-gray-300' : 'hover:bg-white hover:text-black bg-orange-600 border-1 border-orange-600'} 
                                    text-xs font-bold text-white flex gap-1 items-center py-2 px-4  rounded-lg
                                    `}
                            >
                                {loadingOtp ? (
                                    <>
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                    </>
                                ):(
                                    <>
                                    Etape suivante : Salle
                                    <ArrowRight className="h-4 w-4"/>
                                    </>
                                )}
                                
                            </motion.button>
                        ):(
                            
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                disabled={loading || !email.trim() || !nom.trim() ||
                                    !prenom.trim() || !tel.trim()
                                }
                                className={`${
                                    !email.trim() || !nom.trim() || !prenom.trim() || !tel.trim() ? 'bg-gray-300 border-1 border-gray-300' : 'hover:bg-white hover:text-black bg-orange-600 border-1 border-orange-600'} 
                                    text-xs font-bold text-white flex gap-1 items-center py-2 px-4 rounded-lg
                                    `}
                            >
                                {loading ? (
                                    <>
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                    </>
                                ):(
                                    <>
                                    Continuer
                                    <ArrowRight className="h-4 w-4"/>
                                    </>
                                )}
                                
                            </motion.button>
                            
                        )}
                        
                    </div>

                </form>

                <div className="text-sm">
                    En continuant, vous accepter nos
                    <Link className="text-orange-600 ml-1">Conditions d'utilisation</Link> et notre
                    <Link className="text-orange-600 ml-1">Politique de confidentialité</Link>
                </div>
            </div>
        </div>

        </>
    )
}