import React, {useState, useEffect} from "react";
import Input from "../../components/ui/input";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, XCircle, Loader2, LoaderIcon, Beaker } from "lucide-react";
import Cookies from 'js-cookie'
import { getToken } from "../../hooks/getToken";
import { useNavigate } from "react-router-dom";
import form1 from '../../assets/images/form1.png'
import { motion } from "framer-motion";
import { usePayment } from "../../hooks/usePayment";
import { infosPerso } from "../../api/subscribe/infosPerso";
import { useMutation } from "@tanstack/react-query";
import { Otp } from "../../api/subscribe/otp";
import ToastError from "../../components/ui/ToastError";
import ToastSuccess from "../../components/ui/ToastSuccess";



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


    },[navigate, choix_forfait.forfait, choix_forfait.montant])

    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || Number(montantUrl) !== Number(montant)){
            navigate(`/form-subscribe?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    },[navigate, forfait, montant, forfaitUrl, montantUrl])


    const infos = useMutation({
        mutationFn : infosPerso,
        onSuccess : (data)=>{
            Cookies.set('token', data.token, {expires: 365})
            localStorage.setItem('form', JSON.stringify({nom, prenom, tel, email}))
            setTimeout(()=>{
                infos.reset()
            }, 2500)
            setOtpStep(true)
        },

        onError: (()=>{
            setTimeout(()=>{
                infos.reset()
            }, 4000)
        })
    })

    const code = useMutation({
        mutationFn : Otp,
        onSuccess : ()=>{
            localStorage.setItem('status_otp', 'otp_verifie')
            localStorage.setItem('tel', tel)
            setTimeout(()=>{
                code.reset()
            }, 2500)
            setTimeout(()=>{
                navigate(`/infos-salle?forfait=${choix_forfait.forfait}&prix=${choix_forfait.montant}`)
            }, 3000)
        },
        onError: (()=>{
            setTimeout(()=>{
                infos.reset()
            }, 4000)
        })
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
            <div className="fixed inset-0 z-20">
                <img src={form1} alt="background" className="w-250 h-auto" />
            </div>
            
            <div className="relative z-30 bg-orange-100/50 flex justify-center items-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl mx-auto">
                    
                    <div className="mb-6 sm:mb-8 text-center">
                        <p className="fuzzy-bubbles-bold uppercase text-2xl sm:text-3xl md:text-4xl mb-2">
                            Inscription
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Renseignez vos informations personnelles pour commencer.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 sm:py-5 px-4 sm:px-6 md:px-8 mb-6 sm:mb-8 bg-white border border-gray-100 shadow-lg rounded-xl">
                        <div className="text-center sm:text-left">
                            <p className="text-gray-600 text-xs sm:text-sm">Forfait choisi</p>
                            <p className="fuzzy-bubbles-bold text-base sm:text-lg">{forfait}</p>
                        </div>
                        <div className="relative">
                            <button 
                                className="cursor-pointer hover:underline text-orange-600 font-bold text-xs sm:text-sm"
                                onClick={()=>{setModalForfait(!modalForfait)}}
                            >
                                Changer de forfait
                            </button>

                            {modalForfait && (
                                <motion.div
                                    initial={{ opacity: 0, y: -1 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-orange-600 rounded-sm text-white absolute p-2 font-semibold text-xs sm:text-sm right-0 sm:-right-4 top-full mt-2 z-50 min-w-[120px] shadow-lg"
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
                                            className="cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black p-2 rounded-lg"
                                        >{item.forfait}</p>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={otpStep ? handleOtp : handleInfos} className="bg-white border border-gray-100 shadow-lg rounded-xl mb-6 sm:mb-8 md:mb-10">
                        
                        <div className="py-4 sm:py-5 px-4 sm:px-6 md:px-8">
                            <p className="mb-4 fuzzy-bubbles-bold text-lg sm:text-xl">
                                Informations personnelles
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="text-xs sm:text-sm font-semibold mb-1 block">
                                        Nom <span className="text-orange-600">*</span>
                                    </label>
                                    <Input 
                                        type={'text'}
                                        value={nom}
                                        disabled={successInfos}
                                        placeholder={'Ex: Joseph'}
                                        onChange={(e)=>{setNom(e.target.value),
                                            infos.reset()
                                        }}
                                        className={`w-full ${successInfos ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-xs sm:text-sm border border-gray-300`}
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="text-xs sm:text-sm font-semibold mb-1 block">
                                        Prénom <span className="text-orange-600">*</span>
                                    </label>
                                    <Input 
                                        type={'text'}
                                        value={prenom}
                                        disabled={successInfos}
                                        placeholder={'Ex: Ouedraogo'}
                                        onChange={(e)=>{setPrenom(e.target.value),
                                            infos.reset()
                                        }}
                                        className={`w-full ${successInfos ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-xs sm:text-sm border border-gray-300`}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="text-xs sm:text-sm font-semibold mb-1 block">
                                    Numéro de téléphone <span className="text-orange-600">*</span>
                                </label>
                                <Input 
                                    type={'tel'}
                                    value={tel}
                                    disabled={successInfos}
                                    placeholder={'Ex: 70000000'}
                                    pattern={"[0-9]+"}
                                    onChange={(e)=>{setTel(e.target.value),
                                        infos.reset()
                                    }}
                                    className={`w-full ${successInfos ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-xs sm:text-sm border border-gray-300`}
                                />
                            </div>

                            <div>
                                <label className="text-xs sm:text-sm font-semibold mb-1 block">
                                    Adresse e-mail <span className="text-orange-600">*</span>
                                </label>
                                <Input 
                                    type={'email'}
                                    value={email}
                                    disabled={successInfos}
                                    placeholder={'Ex: adresse@domaine.com'}
                                    onChange={(e)=>{setEmail(e.target.value),
                                        infos.reset()
                                    }}
                                    className={`w-full ${successInfos ? 'bg-gray-200' : ''} focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-xs sm:text-sm border border-gray-300`}
                                />
                            </div>
                        </div>

                        {otpStep && (
                            <>
                                <hr className="my-3 text-gray-200"/>
                                <div className="py-4 sm:py-5 px-4 sm:px-6 md:px-8">
                                    <p className="mb-4 text-lg sm:text-xl fuzzy-bubbles-bold">
                                        Confirmer votre adresse email
                                    </p>
                                    
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-2">
                                            Un code de vérification a été envoyé sur 
                                            <span className="text-orange-600 italic underline ml-1"> {email} </span>
                                        </p>
                                        
                                        <Input 
                                            type={'tel'}
                                            value={otp}
                                            pattern={"[0-9]{6}"}
                                            placeholder={'code à 6 chiffres'}
                                            onChange={(e)=>{setOtp(e.target.value),
                                                code.reset()
                                            }}
                                            className="w-full focus:outline-none focus:ring-1 focus:ring-orange-600 text-center rounded-lg p-2 text-sm sm:text-base border border-gray-300"  
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="bg-orange-50 flex justify-end px-4 sm:px-6 md:px-8 py-4 sm:py-5 rounded-b-xl">
                            {otpStep ? (
                                <motion.button
                                    whileTap={{scale: 0.95}}
                                    disabled={loadingCode || !otp.trim() || otp.length !== 6 }
                                    className={`w-full sm:w-auto ${
                                        !otp.trim() || otp.length !== 6 
                                            ? 'bg-gray-300 border border-gray-300 cursor-not-allowed' 
                                            : 'hover:bg-white hover:text-black bg-orange-600 border border-orange-600 cursor-pointer'} 
                                        text-xs sm:text-sm font-bold justify-center text-white flex gap-2 items-center py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200
                                    `}
                                >
                                    {loadingCode ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin"/>
                                            <span>Vérification...</span>
                                        </>
                                    ):(
                                        <>
                                            <span>Etape suivante : Salle</span>
                                            <ArrowRight className="h-4 w-4"/>
                                        </>
                                    )}
                                </motion.button>
                            ):(
                                <motion.button
                                    whileTap={{scale: 0.95}}
                                    disabled={loadingInfos || !email.trim() || !nom.trim() ||
                                        !prenom.trim() || !tel.trim() || tel.length < 8
                                    }
                                    className={`w-full sm:w-auto ${
                                        !email.trim() || !nom.trim() || !prenom.trim() || !tel.trim() || tel.length < 8 
                                            ? 'bg-orange-200 border border-orange-200 cursor-not-allowed' 
                                            : 'hover:bg-white hover:text-black bg-orange-600 border border-orange-600 cursor-pointer'} 
                                        text-xs sm:text-sm font-bold justify-center text-white flex gap-2 items-center py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200
                                    `}
                                >
                                    {loadingInfos ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin"/>
                                            <span>Enregistrement...</span>
                                        </>
                                    ):(
                                        <>
                                            <span>Continuer</span>
                                            <ArrowRight className="h-4 w-4"/>
                                        </>
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </form>

                    <div className="text-xs sm:text-sm text-center px-2">
                        <p>
                            En continuant, vous acceptez nos
                            <Link to="/conditions" className="text-orange-600 ml-1 hover:underline">Conditions d'utilisation</Link> 
                            <span> et notre</span>
                            <Link to="/confidentialite" className="text-orange-600 ml-1 hover:underline">Politique de confidentialité</Link>
                        </p>
                    </div>
                </div>
            </div>

            {errorInfos && (
                <ToastError 
                    title="Erreur survenue !" 
                    message="Une erreur est survenue, vérifiez vos informations et réessayez à nouveau."
                />
            )}
            {successInfos && (
                <ToastSuccess title="Succès !" message="Infos enregistrées avec succès"/>
            )}

            {errorCode && (
                <ToastError 
                    title="Erreur survenue !" 
                    message="Code OTP invalide, vérifiez et réessayez."
                />
            )}
            {successCode && (
                <ToastSuccess title="Inscription réussie !" message="Votre compte GymPlus a été créé avec succès."/>
            )}
        </>
    )
}