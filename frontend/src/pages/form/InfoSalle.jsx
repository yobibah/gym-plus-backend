import React, {useState, useEffect, useRef} from "react";
import Input from "../../components/ui/input";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Download, Loader2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import form2 from '../../assets/images/form2.png'
import { usePayment } from "../../contexts/PaymentContext";
import { infosSalle } from "../../api/subscribe/infosSalle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../../hooks/getToken";
import { ListPays } from "../../api/ListPays";



export default function InfoSalle(){

    const [nomSalle, setNomSalle] = useState('')
    const [ville, setVille] = useState('')
    const [pays, setPays] = useState('')
    const [region, setRegion] = useState('')
    const [modalForfait, setModalForfait] = useState(false)
    
    const {forfait,montant, setForfait, setMontant} = usePayment()

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
    }, [])

    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || montantUrl !== montant ){
            navigate(`/infos-salle?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    }, [montant,forfait, montantUrl, forfaitUrl])


    const paysS = useQueryClient()
    const paysQuery = useQuery({
        queryKey : ['pays'],
        queryFn : ListPays
    })

    const paysLoading = paysS.isPending
    const paysError = paysS.isError
    

    const infos = useMutation({
        mutationFn : infosSalle,
        onSuccess : ()=>{
            localStorage.setItem('status_salle', 'salle_info_remplie')
            setTimeout(()=>{
                navigate(`/paiement-process?forfait=${choix_forfait.forfait}&montant=${choix_forfait.montant}`)
            }, 2500)
        }
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
        <div className="absolute inset-y-0 z-20 flex bg-cover bg-center">
            <img src={form2} alt=""
                className=" "
            />
        </div>
        <div className=" bg-orange-100/50 z-30 relative flex justify-center h-screen items-center py-10">
            <div>
                <div className="mb-8 mt-5 text-center">
                    <p className="fuzzy-bubbles-bold uppercase text-4xl mb-2">Finalisez votre inscription</p>
                    <p className="text-gray-600">Renseignez les informations de votre salle de sport.</p>
                </div>

                <div className="flex w-150 mx-auto items-center justify-between py-5 px-8 mb-8 bg-white shadow-xl border-3 border-gray-100 rounded-lg">
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
                                            setForfait(item.forfait), 
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

                <form onSubmit={handleSalle} className="bg-white shadow-xl px-4 border-3 border-gray-100 rounded-lg mb-10">
                    
                    <div className=" gap-10 px-4 py-5">
                        <p className="mb-4 fuzzy-bubbles-bold text-xl">Informations sur votre salle</p>
                        <div className="mb-4">
                            <p className="text-sm font-semibold mb-1">Nom de la salle de sport <span className="text-orange-600">*</span></p>
                            <Input 
                                type={'text'}
                                value={nomSalle}
                                placeholder={'Ex: GymPlus Centre'}
                                onChange={(e)=>{setNomSalle(e.target.value)}}
                                className={'w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-sm border-1 border-gray-300'}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-semibold mb-1">Pays <span className="text-orange-600">*</span></p>
                            <Input 
                                type={'text'}
                                value={pays}
                                placeholder={'Ex: Burkina Faso'}
                                onChange={(e)=>{setPays(e.target.value)}}
                                className={'w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-sm border-1 border-gray-300'}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-semibold mb-1">Ville <span className="text-orange-600">*</span></p>
                            <Input 
                                type={'text'}
                                value={ville}
                                placeholder={'Ex: Ouagadougou'}
                                onChange={(e)=>{setVille(e.target.value)}}
                                className={'w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-sm border-1 border-gray-300'}
                            />
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-semibold mb-1">Région<span className="text-orange-600">*</span></p>
                            <Input 
                                type={'text'}
                                value={region}
                                placeholder={'Ex: Centre'}
                                onChange={(e)=>{setRegion(e.target.value)}}
                                className={'w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-sm border-1 border-gray-300'}
                            
                            />
                        </div>
                    </div>
                    {error && (
                                <span className="mb-2 flex justify-center items-center gap-1 text-red-500 text-sm italic">
                                    <XCircle className="h-4 w-4"/>{infos.error.message}</span>
                                )}
                                {success && (
                                    <span className="mt-2 mb-2 justify-center flex items-center gap-1 text-green-500 text-sm italic">
                                        <CheckCircle className="h-4 w-4"/>Informations de la salle validées !</span>
                                )}

                        

                    <div className="bg-orange-50  flex justify-end px-8 py-5">
                        <motion.button
                            whileTap={{scale: 0.95}}
                            disabled={loading || !nomSalle.trim() || !ville.trim() || !pays.trim() || !region.trim() }
                            className={`${
                                !nomSalle.trim() || !ville.trim() || !pays.trim() || !region.trim() ? 'bg-orange-200 border border-orange-200' : 'hover:bg-white hover:text-black bg-orange-600 border-1 border-orange-600'} 
                                text-xs font-bold text-white flex gap-1 items-center py-2 px-4 rounded-lg
                                `}
                        >
                            {loading ? (
                                <>
                                <Loader2 className="h-4 w-4 animate-spin"/>
                                </>
                            ):(
                                <>
                                Etape suivante: Paiement
                                <ArrowRight className="h-4 w-4"/>
                                </>
                            )}
                            
                        </motion.button>
                    </div>

                </form>
            </div>
        </div>
        </>
    )
}