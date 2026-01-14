import React, {useState, useEffect} from "react";
import Input from "../../components/ui/input";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, XCircle, Loader2, LoaderIcon, Beaker } from "lucide-react";
import Cookies from 'js-cookie'
import { getToken } from "../../hooks/getToken";
import { useNavigate } from "react-router-dom";
import form1 from '../../assets/images/form1.png'
import { motion } from "framer-motion";
import { usePayment } from "../../contexts/PaymentContext";
import { infosPerso } from "../../api/subscribe/infosPerso";
import { useMutation } from "@tanstack/react-query";
import { Otp } from "../../api/subscribe/otp";



export default function InfosLogin(){

    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [modalForfait, setModalForfait] = useState(false)
    
    const [otpStep, setOtpStep] = useState(false)

    const {montant, forfait, setMontant, setForfait} = usePayment()

    const [params, setParams] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')

    const navigate = useNavigate()
    
    const forfaitList = [
        {id:1, forfait: "Standard", montant: 15000}, 
        {id:2, forfait:"Pro", montant: 25000}, 
        {id:3, forfait:"Premium", montant: 40000}, 
    ]

    const choix_forfait = JSON.parse(localStorage.getItem('choix_forfait'))

    useEffect(()=>{
        const token = getToken();
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


    const infos = useMutation({
        mutationFn : infosPerso,
        onSuccess : (data)=>{
            Cookies.set('token', data.token, {expires: 365})
            
            localStorage.setItem('form', JSON.stringify({nom, prenom, tel, email}))
            setOtpStep(true)
        }
    })

    const code = useMutation({
        mutationFn : Otp,
        onSuccess : ()=>{
            localStorage.setItem('status_otp', 'otp_verifie')
            setTimeout(()=>{
                navigate(`/infos-salle?forfait=${choix_forfait.forfait}&prix=${choix_forfait.montant}`)
            }, 2500)
        }
    }) 


    const loadingInfos = infos.isPending
    const errorInfos = infos.isError 
    const successInfos = infos.isSuccess

    const loadingCode = code.isPending
    const errorCode = code.isError 
    const successCode = code.isSuccess

    async function handleInfos(e){
        e.preventDefault()
        infos.mutate({
            nom, prenom, email, telephone : tel
        })
    }

    async function handleOtp(e){
        e.preventDefault()
        code.mutate({
            codeOtp : otp
        })
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
                                    disabled={successInfos}
                                    placeholder={'Ex: Joseph'}
                                    onChange={(e)=>{setNom(e.target.value),
                                        infos.reset()
                                    }}
                                    className={`w-full ${successInfos ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 label-2 text-sm border-1 border-gray-300`}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1">Prénom <span className="text-orange-600">*</span></label>
                                <Input 
                                    type={'text'}
                                    value={prenom}
                                    disabled={successInfos}
                                    placeholder={'Ex: Ouedraogo'}
                                    onChange={(e)=>{setPrenom(e.target.value),
                                        infos.reset()
                                    }}
                                    className={`w-full ${successInfos ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 label-2 text-sm border-1 border-gray-300`}
            
                                
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-sm font-semibold mb-1">Numéro de téléphone <span className="text-orange-600">*</span></label>
                            <Input 
                                type={'tel'}
                                value={tel}
                                disabled={successInfos}
                                placeholder={'Ex: 70000000'}
                                pattern={"[0-9]+"}
                                onChange={(e)=>{setTel(e.target.value),
                                    infos.reset()
                                }}
                                    className={`w-full ${successInfos ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 label-2 text-sm border-1 border-gray-300`}
               
                            />
                        </div>

                        <div className={`${errorInfos || successInfos ? 'mb-4' : ''}`}>
                            <label className="text-sm font-semibold mb-1">Adresse e-mail <span className="text-orange-600">*</span></label>
                            <Input 
                                type={'email'}
                                value={email}
                                disabled={successInfos}
                                placeholder={'Ex: adresse@domaine.com'}
                                onChange={(e)=>{setEmail(e.target.value),
                                    infos.reset()
                                }}
                                    className={`w-full ${successInfos ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 label-2 text-sm border-1 border-gray-300`}
         
                            />
                        </div>

                        {errorInfos && (
                            <span className="flex items-center gap-1 text-red-500 text-sm italic">
                                <XCircle className="h-4 w-4"/>{infos.error.message}</span>
                        )}
                        {successInfos && (
                            <span className="flex items-center gap-1 text-green-500 text-sm italic">
                                <CheckCircle className="h-4 w-4"/>Informations personnelles validées !</span>
                        )}
                    </div>



                    {otpStep && (
                        <>
                            <hr className=" mb-3 mt-3 text-gray-200"/>

                            <div className="py-5 px-8">
                                <p className="mb-4 text-xl fuzzy-bubbles-bold">Confirmer votre adresse email</p>

                                
                        
                                <div className={`${successCode || errorCode ? 'mb-1' : ''}`}>
                                    <p className="text-sm text-gray-600 font-semibold mb-1">Un code de vérification a été envoyé sur <span className="text-orange-600 italic underline"> {email} </span> </p>
                                    
                                    <Input 
                                        type={'tel'}
                                        value={otp}
                                        pattern={"[0-9]{6}"}
                                        placeholder={'code à 6 chiffres'}
                                        onChange={(e)=>{setOtp(e.target.value),
                                            code.reset()
                                        }}
                                        className={'w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-sm border-1 border-gray-300'}  
                                    /> 

                                </div>
                                {errorCode && (
                                    <span className="flex items-center gap-1 text-red-500 text-sm italic">
                                        <XCircle className="h-4 w-4"/>{code.error.message}</span>
                                )}
                                {successCode && (
                                    <span className="flex items-center gap-1 text-green-500 text-sm italic">
                                        <CheckCircle className="h-4 w-4"/>Code Validé !</span>
                                )}
                            </div>
                        </>
                    )}

                    


                    <div className="bg-orange-50  flex justify-end px-8 py-5">
                        {otpStep ? (
                            <motion.button
                                whileTap={{scale: 0.95}}
                                disabled={loadingCode || !otp.trim() || otp.length < 6 }
                                className={`${
                                    !otp.trim() || otp.length < 6 ? 'bg-gray-300 border-1 border-gray-300' : 'hover:bg-white hover:text-black bg-orange-600 border-1 border-orange-600'} 
                                    text-xs font-bold text-white flex gap-1 items-center py-2 px-4  rounded-lg
                                    `}
                            >
                                {loadingCode ? (
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
                                whileTap={{scale: 0.95}}
                                disabled={loadingInfos || !email.trim() || !nom.trim() ||
                                    !prenom.trim() || !tel.trim()
                                }
                                className={`${
                                    !email.trim() || !nom.trim() || !prenom.trim() || !tel.trim() ? 'bg-orange-200 border border-orange-200' : 'hover:bg-white hover:text-black bg-orange-600 border-1 border-orange-600'} 
                                    text-xs font-bold text-white flex gap-1 items-center py-2 px-4 rounded-lg
                                    `}
                            >
                                {loadingInfos ? (
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