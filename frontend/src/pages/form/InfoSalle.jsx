import React, {useState, useEffect, useRef} from "react";
import Input from "../../components/ui/input";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Download, Loader2, XCircle } from "lucide-react";
import useGetUrl from "../../hooks/useGetUrl";
import Cookies from 'js-cookie'
import { motion } from "framer-motion";
import form2 from '../../assets/images/form2.png'
import { usePayment } from "../../contexts/PaymentContext";



export default function InfoSalle(){

    const [nomSalle, setNomSalle] = useState('')
    const [numRegistre, setNumRegistre] = useState('')
    const [numFiscale, setNumFiscale] = useState('')
    const [modalForfait, setModalForfait] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    
    const {forfait,montant, setForfait, setMontant} = usePayment()
    const [params, setParams] = useSearchParams()
    const forfaitUrl = params.get('forfait')
    const montantUrl = params.get('montant')

    const fileRegistre = useRef(null)
    const fileFiscale = useRef(null)


    const {apiUrl} = useGetUrl()
    const navigate = useNavigate()

    const forfaitList = [
        {id:1, forfait: "Standard", montant: 15000}, 
        {id:2, forfait:"Pro", montant: 25000}, 
        {id:3, forfait:"Premium", montant: 40000}, 
    ]


    useEffect(()=>{
        if(!forfait || !montant){
            navigate('/not-found', {replace: true})
            return
        }

        if(forfaitUrl !== forfait || montantUrl !== montant ){
            navigate(`/infos-salle?forfait=${forfait}&montant=${montant}`, {replace: true})
        }
    }, [montant,forfait, montantUrl, forfaitUrl])

    


    const token = Cookies.get('token')




    async function handleSalle(e){
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        const formData = new FormData()
        formData.append("nomSalle", nomSalle)
        formData.append("numRegistre", numRegistre) 
        formData.append("numFiscale", numFiscale) 
        formData.append("fileR", fileRegistre)
        formData.append("fileF", fileFiscale) 
        formData.append("token", token)

        try{
            const response = await fetch(`${apiUrl}info-salle`,{
                method: "POST",
                headers: {
                    "Accpet" : "application/json"
                },
                body: formData
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Erreur de recup de données')
            }

            setSuccess(true)
            setTimeout(()=>{
                navigate(`/paiement?forfait=${forfait}&montant=${montant}`)
            }, 1500)
        } catch(e){
            setError(e.message || 'Erreur survenue')
        } finally{
            setLoading(false)
        }
    }



    return(
        <>
        <div className="absolute inset-y-0 z-20 flex bg-cover bg-center">
            <img src={form2} alt=""
                className=" "
            />
        </div>
        <div className=" bg-orange-100/50 z-30 relative flex justify-center  items-center h-screen">
            <div>
                <div className="mb-8 text-center">
                    <p className="fuzzy-bubbles-bold uppercase text-4xl mb-2">Finalisez votre inscription</p>
                    <p className="text-gray-600">Renseignez les informations de votre salle de sport.</p>
                </div>

                <div className="flex items-center justify-between py-5 px-8 mb-8 bg-white shadow-xl border-3 border-gray-100 rounded-lg">
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

                <form onSubmit={handleSalle} className="bg-white shadow-xl border-3 border-gray-100 rounded-lg mb-10">
                    

                    <div className="py-5 px-8">
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
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold mb-1">Numéro de registre de commerce <span className="text-orange-600">*</span></p>
                                <Input 
                                    type={'tel'}
                                    value={numRegistre}
                                    placeholder={'Ex: 123 456 789'}
                                    pattern={"[0-9]+"}
                                    onChange={(e)=>{setNumRegistre(e.target.value)}}
                                    className={'w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-sm border-1 border-gray-300'}
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-1">Numéro d'identification fiscale (NIF) <span className="text-orange-600">*</span></p>
                                <Input 
                                    type={'tel'}
                                    value={numFiscale}
                                    placeholder={'Ex: 0012545678901'}
                                    pattern={"[0-9]+"}
                                    onChange={(e)=>{setNumFiscale(e.target.value)}}
                                    className={'w-full focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-lg p-2 text-sm border-1 border-gray-300'}
                                
                                />
                            </div>
                        </div>
                    </div>

                    <hr className=" mb-3 mt-3 text-gray-200"/>

                    <div className="py-5 px-8">
                        <p className="mb-4 text-xl fuzzy-bubbles-bold">Documents à fournir</p>
                    
                        <div className="flex items-center gap-2 justify-between">
                            <div>
                                <p className="text-sm font-semibold mb-1">Registre de commerce <span className="text-orange-600">*</span></p>
                                
                                <div className="flex bg-orange-50 rounded-lg flex-col gap-2 items-center justify-center relative border-3 border-gray-300 border-dotted px-4 py-8">
                                    
                                    <Download className="text-orange-600 h-5 w-5"/> 
                                    
                                    <Input 
                                        type={'file'}
                                        onChange={(e)=>{fileRegistre.current.files[0]}}
                                        className={'text-xs cursor-pointer'}
                                    />
                                    <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX: 5Mo)</p>
                                    
                                    
                                </div>
                                
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-1">Carte d'identification fiscale (NIF) <span className="text-orange-600">*</span></p>
                                <div className="flex bg-orange-50 rounded-lg flex-col gap-2 items-center justify-center relative border-3 border-gray-300 border-dotted px-4 py-8">
                                    
                                    <Download className="text-orange-600 h-5 w-5"/> 
                                    
                                    <Input 
                                        type={'file'}
                                        onChange={(e)=>{fileFiscale.current.files[0]}}
                                        className={'text-xs cursor-pointer'}
                                    />
                                    <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX: 5Mo)</p>
                                </div>
                            </div>
                            </div>

                            {error && (
                            <span className="mt-4 flex items-center gap-1 text-red-500 text-sm italic">
                                <XCircle className="h-4 w-4"/>{error}</span>
                            )}
                            {success && (
                                <span className="mt-4 flex items-center gap-1 text-green-500 text-sm italic">
                                    <CheckCircle className="h-4 w-4"/>Informations de la salle validées !</span>
                            )}

                        </div>

                        

                    <div className="bg-orange-50  flex justify-end px-8 py-5">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            disabled={loading || !nomSalle.trim() || !numFiscale.trim() ||
                                !numRegistre.trim() || !fileFiscale || !fileRegistre
                            }
                            className={`${
                                !nomSalle.trim() || !numFiscale.trim() ||
                                !numRegistre.trim() || !fileFiscale || !fileRegistre ? 'bg-gray-300 border-1 border-gray-300' : 'hover:bg-white hover:text-black bg-orange-600 border-1 border-orange-600'} 
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