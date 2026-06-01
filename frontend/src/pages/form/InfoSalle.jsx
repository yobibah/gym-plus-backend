import React, {useState, useEffect} from "react";
import Input from "../../components/ui/input";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Download, Loader2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import form2 from '../../assets/images/form2.png'
import { usePayment } from "../../hooks/usePayment";
import { infosSalle } from "../../api/subscribe/infosSalle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../../hooks/getToken";
import { ListPays } from "../../api/ListPays";
import ToastError from "../../components/ui/ToastError";
import ToastSuccess from "../../components/ui/ToastSuccess";



export default function InfoSalle(){

    const [nomSalle, setNomSalle] = useState('')
    const [ville, setVille] = useState('')
    const [pays, setPays] = useState(null)
    const [region, setRegion] = useState('')
    const [modalForfait, setModalForfait] = useState(false)
    
    const {forfait,montant, setForfait, setMontant} = usePayment()

    const [params, setParams] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')


    const navigate = useNavigate()

    const forfaitList = [
        {id:1, forfait: "Standard", montant: 7500}, 
        {id:2, forfait:"Pro", montant: 12500}, 
        {id:3, forfait:"Premium", montant: 20000}, 
    ]

    const choix_forfait = JSON.parse(localStorage.getItem('choix_forfait'))

    useEffect(()=>{

         const infosEnregistre = localStorage.getItem('form')
        const otp_valide = localStorage.getItem('status_otp')
        const status_salle = localStorage.getItem('status_salle')
        
        const token = getToken();
        
        if(!token){
            
            localStorage.removeItem('form')
            localStorage.removeItem('status_otp')
            localStorage.removeItem('status_salle')
            navigate('/form-subscribe', {replace: true})
            
            return
        }

       
        if(token && status_salle === 'salle_info_remplie' && infosEnregistre && otp_valide === 'otp_verifie'){
            navigate(`/paiement?forfait=${choix_forfait.forfait}&montant=${choix_forfait.montant}`)
        }
    }, [navigate, choix_forfait.forfait, choix_forfait.montant])

    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || montantUrl !== montant ){
            navigate(`/infos-salle?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    }, [navigate, montant,forfait, montantUrl, forfaitUrl])


    const paysS = useQueryClient()
    const paysQuery = useQuery({
        queryKey : ['pays'],
        queryFn : ListPays
    })

    const list = paysQuery?.data?.pays || []
    const paysLoading = paysS.isPending
    const paysError = paysS.isError
    

    const infos = useMutation({
        mutationFn : infosSalle,
        onSuccess : ()=>{
            localStorage.setItem('status_salle', 'salle_info_remplie')
            setTimeout(()=>{
                infos.reset()
            }, 2500)
            setTimeout(()=>{
                navigate(`/paiement-process?forfait=${choix_forfait.forfait}&montant=${choix_forfait.montant}`)
            }, 3000)
        },
        onError: (()=>{
            setTimeout(()=>{
                infos.reset()
            }, 4000)
        })
    })

    const loading = infos.isPending
    const error = infos.isError
    const success = infos.isSuccess

    async function handleSalle(e){
        e.preventDefault()

        const formData = new FormData()

        formData.append("nomSalle", nomSalle)
        formData.append("ville", ville)
        formData.append("region", region) 
        formData.append("pays", pays) 

        infos.mutate({ formData  })
    }


    return(
        <>
            <div className="fixed inset-0 z-20">
                <img src={form2} alt="background" className="w-250 h-auto" />
            </div>
            
            <div className="relative z-30 bg-orange-100/50 flex justify-center items-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl mx-auto">
                    
                    <div className="mb-6 sm:mb-8 mt-2 sm:mt-5 text-center">
                        <p className="fuzzy-bubbles-bold uppercase text-2xl sm:text-3xl md:text-4xl mb-2">
                            Finalisez votre inscription
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Renseignez les informations de votre salle de sport.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 sm:py-5 px-4 sm:px-6 md:px-8 mb-6 sm:mb-8 bg-white shadow-xl border border-gray-100 rounded-lg">
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
                                                setForfait(item.forfait), 
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
                    <form onSubmit={handleSalle} className="bg-white shadow-xl border border-gray-100 rounded-lg mb-6 sm:mb-8 md:mb-10">
                        
                        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                            <p className="mb-4 fuzzy-bubbles-bold text-lg sm:text-xl">
                                Informations sur votre salle
                            </p>
                            
                            <div className="mb-4">
                                <label className="text-xs sm:text-sm font-semibold mb-1 block">
                                    Nom de la salle de sport <span className="text-orange-600">*</span>
                                </label>
                                <Input 
                                    type={'text'}
                                    value={nomSalle}
                                    placeholder={'Ex: GymPlus Centre'}
                                    onChange={(e)=>{setNomSalle(e.target.value)}}
                                    className="w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-xs sm:text-sm border border-gray-300"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="text-xs sm:text-sm font-semibold mb-1 block">
                                    Pays <span className="text-orange-600">*</span>
                                </label>
                            
                                <select 
                                    onChange={(e)=>{setPays(e.target.value)}} 
                                    className={`border ${paysLoading || list.length === 0 ? 'bg-gray-50 text-gray-400' : 'focus:ring-1 focus:ring-orange-600'} w-full rounded-lg p-2 text-xs sm:text-sm focus:outline-none border border-gray-300`}
                                >
                                    <option value="" disabled selected>-- Sélectionnez un pays --</option>
                                    {paysLoading ? (
                                        <option value="" disabled>Chargement de la liste...</option>
                                    ): list.length === 0 ?(
                                        <option value="" disabled>Aucun pays disponible</option>
                                    ): list.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                {paysError && (
                                    <p className="text-xs text-red-600 mt-1">{paysQuery.error?.message || 'Erreur de chargement'}</p>
                                )}
                            </div>
                            
                            <div className="mb-4">
                                <label className="text-xs sm:text-sm font-semibold mb-1 block">
                                    Ville <span className="text-orange-600">*</span>
                                </label>
                                <Input 
                                    type={'text'}
                                    value={ville}
                                    placeholder={'Ex: Ouagadougou'}
                                    onChange={(e)=>{setVille(e.target.value)}}
                                    className="w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-xs sm:text-sm border border-gray-300"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="text-xs sm:text-sm font-semibold mb-1 block">
                                    Région <span className="text-orange-600">*</span>
                                </label>
                                <Input 
                                    type={'text'}
                                    value={region}
                                    placeholder={'Ex: Centre'}
                                    onChange={(e)=>{setRegion(e.target.value)}}
                                    className="w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-xs sm:text-sm border border-gray-300"
                                />
                            </div>
                        </div>

                        <div className="bg-orange-50 flex justify-end px-4 sm:px-6 md:px-8 py-4 sm:py-5 rounded-b-lg">
                            <motion.button
                                whileTap={{scale: 0.95}}
                                disabled={loading || !nomSalle.trim() || !ville.trim() || !pays || !region.trim()}
                                className={`w-full sm:w-auto ${
                                    !nomSalle.trim() || !ville.trim() || !pays || !region.trim() 
                                        ? 'bg-orange-200 border border-orange-200 cursor-not-allowed' 
                                        : 'hover:bg-white hover:text-black bg-orange-600 border border-orange-600 cursor-pointer'} 
                                    text-xs sm:text-sm font-bold text-white flex gap-2 justify-center items-center py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200
                                `}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin"/>
                                        <span>Enregistrement...</span>
                                    </>
                                ):(
                                    <>
                                        <span>Etape suivante: Paiement</span>
                                        <ArrowRight className="h-4 w-4"/>
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>

                    <div className="flex justify-center items-center gap-2 mt-4">
                        <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                        <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>
                </div>
            </div>
            {success && (
                <ToastSuccess 
                    title="Succès !" 
                    message="Salle enregistrée avec succès"
                />
            )}
            {error && (
                <ToastError 
                    title="Erreur survenue !" 
                    message="Une erreur est survenue, vérifiez vos informations et réessayez à nouveau."
                />
            )}
        </>
    )
}