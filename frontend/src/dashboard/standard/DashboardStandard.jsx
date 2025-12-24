import { AlertCircle, BadgeCheck, Calendar, CalendarOff, CalendarX, LayoutDashboard, LayoutDashboardIcon, Loader2, Search, Settings, Settings2, SquarePlus, User, UserPlus, UserPlus2, Users, WalletCards } from "lucide-react";
import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import Input from "../../components/ui/input";
import Cookies from 'js-cookie'
import useGetUrl from "../../hooks/useGetUrl";


export default function DashboardStandard(){

    const [activeTab, setActiveTab] = useState('dashboard')
    const [view, setView] = useState("part-dashboard");
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [duree, setDuree] = useState('')

    const [loadingAdherant, setLoadingAdherant] = useState(false)
    const [errorAdherant, setErrorAdherant] = useState(null)
    const [successAdherant, setSuccessAdherant] = useState(null)

    const [dataNbrAdherant, setDataNbrAdherant] = useState([])
    const [loadingNbrAdherant, setLoadingNbrAdherant] = useState(true)
    const [errorNbrAdherant, setErrorNbrAdherant] = useState(null)
    const [successNbrAdherant, setSuccessNbrAdherant] = useState(null)

    const [dataNbrActif, setDataNbrActif] = useState([])
    const [loadingNbrActif, setLoadingNbrActif] = useState(true)
    const [errorNbrActif, setErrorNbrActif] = useState(null)
    const [successNbrActif, setSuccessNbrActif] = useState(null)

    const {apiUrl} = useGetUrl()

    function ActiveTab(){

         if(activeTab === 'dashboard'){
            setActiveTab('dashboard')
            setView('part-dashboard')
            return
        }

        if(activeTab === 'adherant'){
            setActiveTab('adherant')
            return
        }

        if(activeTab === 'abonnement'){
            setActiveTab('abonnement')
            return
        }

        if(activeTab === 'paiement'){
            setActiveTab('paiement')
            return
        }

        if(activeTab === 'settings'){
            setActiveTab('settings')
            return
        }
    }

    useEffect(()=>{
        ActiveTab()
    }, [activeTab])

    async function FetchNombreAdherant(){
        setLoadingNbrAdherant(true)
        setErrorNbrAdherant(null)
        setSuccessNbrAdherant(null)

        const token = Cookies.get('token')

        try{
            const response = await fetch(`${apiUrl}NbreAdherant`,{
                method : 'GET',
                headers : {
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })

            const data = await response.json()
            if(!response.json){
                throw new Error(data.message || 'Erreur de recup du nombre d\'adherant')
            }

            setSuccessNbrAdherant(true)
            setDataNbrAdherant(data)
        } catch(e){
            setErrorNbrAdherant(e.message || 'Erreur')
        } finally{
            setLoadingNbrAdherant(false)
        }
    }

    async function FetchNombreActif(){
        setLoadingNbrActif(true)
        setErrorNbrActif(null)
        setSuccessNbrActif(null)

        const token = Cookies.get('token')

        try{
            const response = await fetch(`${apiUrl}AdherantActif`,{
                method : 'GET',
                headers : {
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })

            const data = await response.json()
            if(!response.json){
                throw new Error(data.message || 'Erreur de recup du nombre actif d\'adherant')
            }

            setSuccessNbrActif(true)
            setDataNbrActif(data)
        } catch(e){
            setErrorNbrActif(e.message || 'Erreur')
        } finally{
            setLoadingNbrActif(false)
        }
    }


    async function AjouterAdherant(){
        setLoadingAdherant(true)
        setErrorAdherant(null)
        setSuccessAdherant(null)

        const token = Cookies.get('token')
        const form = {nom, prenom, tel, duree, email}

        try{
            const response = await fetch(`${apiUrl}adherant`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Accept-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body : JSON.stringify(form)
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Erreur d\'envoie')
            }

            setSuccessAdherant(true)
            setNom('')
            setPrenom('')
            setDuree('')
            setEmail('')
            setTel('')
        } catch(e){
            setErrorAdherant(e.message || 'Erreur d\'envoie')
        } finally{
            setLoadingAdherant(false)
        }
    }

    // function AjouterAdherant(){
    //     alert('bien')
    // }


    return(
        <div className="grid grid-cols-5 place-content-center bg-gray-100">
            {/* Barre latérale */}
            <div className="relative py-3  bg-white shadow-lg flex flex-col gap-10 h-screen fixed left-0">
                <div className="flex items-center gap-2  px-5 my-5">
                    <div className="rounded-full flex items-center justify-center p-5 bg-orange-500 w-15 h-15">
                        {/* <img src="" alt="" /> */}
                        G
                    </div>
                    <div className="flex gap-2 items-center ">
                        <div className="font-semibold text-xl">GymPlus <br /><span className="text-orange-500 text-sm">Plan Standard</span></div>  {/**title a recuperer */}
                        
                    </div>
                </div>

                <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{scale: 0.95}}
                    className={`${activeTab === 'dashboard' ? 'bg-orange-100 rounded-lg' : ''} flex transition-colors duration-200 items-center mx-5  py-3 px-5 gap-5 hover:rounded-lg hover:bg-orange-100 text-lg`}
                    onClick={()=>{setActiveTab('dashboard')}}
                >
                     <LayoutDashboard className={`${activeTab === 'dashboard' ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200`}/>
                    <button className={`${activeTab === 'dashboard' ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}
                        
                    >Tableau de bord</button>
                </motion.div>

                <motion.div
                    
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{scale: 0.95}}
                    className={`${activeTab === 'adherant' ? 'bg-orange-100 rounded-lg' : ''} flex transition-colors duration-200 items-center mx-5  py-3 px-5 gap-5 hover:rounded-lg hover:bg-orange-100 text-lg`}
                    onClick={()=>{setActiveTab('adherant')}}
                >
                     <Users className={`${activeTab === 'adherant' ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200 `}/>
                    <button className={`${activeTab === 'adherant' ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}
                        
                    >Adhérants</button>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{scale: 0.95}} 
                    className={`${activeTab === 'abonnement' ? 'bg-orange-100 rounded-lg' : ''} flex transition-colors duration-200 items-center mx-5  py-3 px-5 gap-5 hover:rounded-lg hover:bg-orange-100 text-lg`}
                    onClick={()=>{setActiveTab('abonnement')}}
                >
                     <SquarePlus className={`${activeTab === 'abonnement' ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200`}/>
                    <button className={`${activeTab === 'abonnement' ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}
                        
                    >Abonnements</button>
                </motion.div>

               <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{scale: 0.95}}
                    className={`${activeTab === 'paiement' ? 'bg-orange-100 rounded-lg' : ''} flex transition-colors duration-200 items-center mx-5  py-3 px-5 gap-5 hover:rounded-lg hover:bg-orange-100 text-lg`}
                    onClick={()=>{setActiveTab('paiement')}}
                >
                     <WalletCards className={`${activeTab === 'paiement' ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200`}/>
                    <button className={`${activeTab === 'paiement' ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}
                        
                    >Paiements</button>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{scale: 0.95}} 
                    className={`${activeTab === 'settings' ? 'bg-orange-100 rounded-lg' : ''} flex transition-colors duration-200 items-center mx-5  py-3 px-5 gap-5 hover:rounded-lg hover:bg-orange-100 text-lg`}
                    onClick={()=>{setActiveTab('settings')}}
                >
                     <Settings className={`${activeTab === 'settings' ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200`}/>
                    <button className={`${activeTab === 'settings' ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}
                        
                    >Paramètres</button>
                </motion.div>


            {/* {'A gerer en fonction de la date de labonnement'} */}
                <motion.div 
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                className="absolute transition-colors duration-200 bottom-5 w-full flex justify-center">
                    <button className="bg-orange-600 shadow-lg  w-full mx-5 text-white font-bold rounded-lg px-5 py-2"
                        // onClick={}
                    >Mettre à niveau</button>
                </motion.div>

            </div>

            {/* Contenu pricnipal , dependra vrai de là ou on se trouve*/}
            {/* Si tableau active */}

            {activeTab === 'dashboard' && (
                <div className="col-span-4 px-8 py-3 my-5">
                    
                    <div className="flex items-center mb-10 justify-between border-b-1 pb-5 border-gray-200">
                        <div className="flex items-center text-lg">
                            <div className="font-bold text-3xl">Tableau de Bord - Plan Stantard <br />
                            <span className="text-xl text-gray-400">Bienvenue, Admin!</span>
                            </div>
                            {/**nom a gerer apres */}
                        </div>

                        <div className="flex items-center justify-center gap-5">
                            <div className="relative w-full">
                                <input type="text" placeholder="Rechercher un élément..." 
                                    className="block w-full mx-2 p-2 pl-10 rounded-lg text-sm focus:outline-none bg-white"
                                />
                                <div className="absolute top-2 left-4">
                                    <Search className="h-5 w-5 text-gray-400"/>
                                </div>
                            </div>

                            <div className="rounded-full h-10 w-10 p-5 flex items-center justify-center  bg-orange-500">G</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-5 mb-10">
                        
                        <motion.div
                            className={`flex-col relative shadow-lg ${loadingNbrAdherant ? '' : 'border-l-5 border-orange-600'} bg-white rounded-xl items-center px-5 py-6`}
                            whileHover={{scale: 1.1}}
                        >
                            {loadingNbrAdherant && (
                                <>
                                <div className="absolute inset-0 animate-pulse backdrop-blur rounded-xl shadow-lg ">
                                    
                                </div>
                                <div className="absolute inset-0 backdrop-blur rounded-xl ">
                                    
                                </div>
                                <div className="absolute animate-pulse inset-0  flex items-center justify-center backdrop-blur rounded-xl ">
                                    <Loader2 className='transition-alls duration-200  animate-spin text-orange-300 '/>
                                </div>
                                </>
                            )}
                            <div className="flex items-center justify-between">
                                
                                <div>
                                    <span className="text-xl font-bold text-gray-400 mb-2">Adhérants</span>
                                    <div className="text-sm text-gray-500 mb-2">
                                        {dataNbrAdherant ? ( 
                                             <span className="font-bold text-2xl text-black font-bold">{dataNbrAdherant.nbr_adherant} </span>/200
                                       
                                        ):null}
                                    </div>
                                </div>
                                <div className="border-1 border-orange-600 p-2 rounded-full bg-gradient-to-r from-black/10 to-orange-600"><Users className="h-8 w-8"/></div>
                            </div>
                            <div className="w-full bg-orange-500 h-2 rounded-xl"></div>
                        
                        </motion.div>

                        <motion.div 
                        whileHover={{scale: 1.1}}
                        className={`bg-white flex relative ${loadingNbrActif ? '' : 'border-l-5 border-green-600'} justify-between shadow-lg rounded-xl items-center px-5 py-6`}>
                            
                            {loadingNbrActif && (
                                <>
                                <div className="absolute inset-0 animate-pulse backdrop-blur rounded-xl shadow-lg ">
                                    
                                </div>
                                <div className="absolute inset-0  backdrop-blur rounded-xl ">
                                    
                                </div>
                                <div className="absolute animate-pulse inset-0  flex items-center justify-center backdrop-blur rounded-xl ">
                                    <Loader2 className='transition-alls duration-200 animate-spin text-green-300 '/>
                                </div>
                                </>
                            )}
                            
                            <div className="text-xl font-bold text-gray-400 mb-2">Abonnements Actifs <br />
                            {dataNbrActif ? (
                                <span className="font-bold text-2xl text-black font-bold">{dataNbrActif.nbr_actif}</span>
                            ):null}
                            </div>
                            <div className="border-1 border-green-600 p-2 rounded-full bg-gradient-to-r from-black/10 to-green-600"><BadgeCheck className="h-8 w-8"/></div>
                            
                                
                            
                        </motion.div>

                        <motion.div 
                        whileHover={{scale: 1.1}}
                        className="bg-white flex border-l-5 border-yellow-600 justify-between shadow-lg rounded-xl items-center px-5 py-6">
                            <span className="text-xl font-bold text-gray-400 mb-2">Expire Bientôt <br />

                                <span className="font-bold text-2xl text-yellow-600 font-bold">8{/*a preciser avec le vraii*/}</span>
                            </span>
                            <div className="border-1 border-yellow-600 p-2 rounded-full bg-gradient-to-r from-black/10 to-yellow-600"><AlertCircle className="h-8 w-8"/></div>
                            
                            
                        </motion.div>

                        <motion.div 
                        whileHover={{scale: 1.1}}
                        className="bg-white flex justify-between border-l-5 border-red-600 shadow-lg rounded-xl items-center px-5 py-6">
                            <span className="text-xl font-bold text-gray-400 mb-2">Abonnements Expirés <br />

                                <span className="font-bold text-2xl text-black font-bold">4{/*a preciser avec le vraii*/}</span>
                            </span>
                            <div className="border-1 border-red-600 p-2 rounded-full bg-gradient-to-r from-black/10 to-red-600"><CalendarOff className="h-8 w-8"/></div>
                            
                            
                        </motion.div>
                    </div>

                    <div className="bg-white mb-10 shadow-lg rounded-xl px-5 py-6">
                            <p className="font-bold text-xl mb-5">Accès Rapide</p>
                        <div className="grid grid-cols-3 gap-5 ">
                    

                            <motion.div 
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            onClick={() =>
                                setView(view === "access-adherant" ? "part-dashboard" : "access-adherant")
                            }
                            // onClick={()=>{setAccessAdherant(!accessAdherant), setAccessPaiement(false),setAccessAbonnement(false), setActiveTabDash(!activeTabDash)}}
                            className={`transition-colors duration-200 hover:bg-orange-500 ${view === "access-adherant" ? 'bg-orange-500' : 'bg-orange-50'} flex items-center rounded-xl justify-center py-4 gap-2`}>
                                <UserPlus className={`h-5 w-5  transition-colors duration-200 ${view === "access-adherant" ? 'text-white' : 'text-black'}`}/>
                                <button 
                                    
                                    className={`${view === "access-adherant"? 'text-white' : 'text-black'} transition-colors duration-200 font-bold text-sm`}
                                >Nouvel Adhérant</button>
                            </motion.div>

                            <motion.div
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            onClick={() =>
                                setView(view === "access-paiement" ? "part-dashboard" : "access-paiement")
                            }
                            // onClick={()=>{setAccessPaiement(!accessPaiement),setAccessAdherant(false),setAccessAbonnement(false), setActiveTabDash(!activeTabDash)}}
                            className={`transition-colors duration-200 hover:bg-orange-500 ${view === "access-paiement" ? 'bg-orange-500' : 'bg-orange-50'} flex items-center rounded-xl justify-center py-4 gap-2`}>
                                <WalletCards className={`h-5 w-5  transition-colors duration-200 ${view === "access-paiement" ? 'text-white' : 'text-black'}`}/>
                                <button 
                                    
                                    className={`${view === "access-paiement" ? 'text-white' : 'text-black'} transition-colors duration-200 font-bold text-sm`}
                                >Enregistrer un paiement</button>
                            </motion.div>

                            <motion.div 
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            onClick={() =>
                                setView(view === "access-abonnement" ? "part-dashboard" : "access-abonnement")
                            }
                            // onClick={()=>{setAccessAbonnement(!accessAbonnement),setAccessAdherant(false),setAccessPaiement(false), setActiveTabDash(!activeTabDash)}}
                            className={`transition-colors duration-200 hover:bg-orange-500 ${view === "access-abonnement" ? 'bg-orange-500' : 'bg-orange-50'} flex items-center rounded-xl justify-center py-4 gap-2`}>
                                <SquarePlus className={`h-5 w-5  transition-colors duration-200 ${view === "access-abonnement" ? 'text-white' : 'text-black'}`}/>
                                <button 
                                    
                                    className={`${view === "access-abonnement" ? 'text-white' : 'text-black'} transition-colors duration-200 font-bold text-sm`}
                                >Voir tous les abonnements</button>
                            </motion.div>

                            
                        </div>
                    </div>

                    {view === "part-dashboard" && (

                    <div className="grid grid-cols-2 gap-5">
                        <div className="bg-white shadow-lg rounded-xl px-5 py-6">
                            <span className="text-red-600 font-bold text-xl" >Abonnements Récemment Expirés</span>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex bg-gray-300 h-10 w-10 rounded-full items-center justify-center p-2">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div className="">
                                        <p className="font-bold">Léa Dubois</p>
                                        <p className="text-xs text-gray-400 font-bold">Expire le 02/02/2025</p>
                                    </div>
                                </div>
                                <button className="text-orange-600 font-bold">Contacter</button>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex bg-gray-300 h-10 w-10 rounded-full items-center justify-center p-2">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div className="">
                                        <p className="font-bold">Léa Dubois</p>
                                        <p className="text-xs text-gray-400 font-bold">Expire le 02/02/2025</p>
                                    </div>
                                </div>
                                <button className="text-orange-600 font-bold">Contacter</button>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex bg-gray-300 h-10 w-10 rounded-full items-center justify-center p-2">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div className="">
                                        <p className="font-bold">Léa Dubois</p>
                                        <p className="text-xs text-gray-400 font-bold">Expire le 02/02/2025</p>
                                    </div>
                                </div>
                                <button className="text-orange-600 font-bold">Contacter</button>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-xl px-5 py-6">
                            <span className="text-yellow-600 font-bold text-xl">Renouvellement à venir</span>
                            <table className=" w-full text-left mt-3" style={{ borderCollapse: "collapse" }}>
                                <thead >
                                    <tr >
                                        <th >Adhérant</th>
                                        <th>Type</th>
                                        <th>Expire le</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="bg-orange-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>

                                    <tr className="bg-gray-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>

                                    <tr className="bg-orange-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>

                                    <tr className="bg-gray-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>

                                    <tr className="bg-orange-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>

                                    <tr className="bg-gray-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>

                                    <tr className="bg-orange-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>

                                    <tr className="bg-gray-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>

                                    <tr className="bg-orange-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>

                                    <tr className="bg-gray-200">
                                        <td>Millogo</td>
                                        <td>Mensuel</td>
                                        <td>02/02/25</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    )}

                    {view === "access-adherant" && (
                        <div className="grid grid-cols-4 gap-5">
                            <div className=""></div>

                            <form onSubmit={AjouterAdherant} className="col-span-2 rounded-lg bg-white shadow-lg px-8 py-5">
                                <div className="flex items-center gap-5">
                                <div className="flex-col flex gap-2 mb-3">
                                    <label className="font-bold">Nom <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'text'}
                                        value={nom}
                                        onChange={(e)=>{setNom(e.target.value)}}
                                        className={'border focus:outline-none border-gray-300 text-sm p-2 rounded-lg'}
                                        placeholder={'Nom de l\'adhérant'}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

                                <div className="flex-col flex gap-2 mb-3">
                                    <label className="font-bold">Prénom <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'text'}
                                        value={prenom}
                                        onChange={(e)=>{setPrenom(e.target.value)}}
                                        className={'border focus:outline-none border-gray-300 text-sm p-2 rounded-lg'}
                                        placeholder={'Prenom de l\'adhérant'}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>
                                </div>

                                <div className="flex-col flex gap-2 mb-3">
                                    <label className="font-bold">Adresse e-mail <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'email'}
                                        value={email}
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                        className={'border focus:outline-none border-gray-300 text-sm p-2 rounded-lg'}
                                        placeholder={'Email de l\'adhérant'}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

                                <div className="flex-col flex gap-2 mb-3">
                                    <label className="font-bold">Numéro de téléphone <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'tel'}
                                        value={tel}
                                        onChange={(e)=>{setTel(e.target.value)}}
                                        className={'border focus:outline-none border-gray-300 text-sm p-2 rounded-lg'}
                                        placeholder={'Numéro de l\'adhérant'}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

                
                                <div className="grid grid-cols-2">
                                <div className="flex-col flex gap-2 w-30 ">
                                    <label className="font-bold">Abonnement</label>
                                    <select value={duree} onChange={(e)=>{setDuree(e.target.value)}}
                                            className="border-4 border-gray-300 p-2 border-dotted text-sm"
                                        >

                                        <option value="mensuel">Mensuel</option>
                                        <option value="annuel">Annuel</option>
                                        <option value="semestruel">Semestruel</option>
                                    </select>
                                </div>

                                 <div className="flex items-center my-3">
                                    {errorAdherant && (
                                        <span className="text-red-600 text-sm">{error}</span>
                                    )}
                                    {successAdherant && (
                                        <span className="text-green-600 text-sm">Enregistrement effectué avec succèss</span>
                                    )}
                                </div>

                                
                                </div>

                                <div 
                                    
                                className="flex items-center my-3">
                                    <motion.button 
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.95}}
                                    disabled={loadingAdherant || !nom.trim() || !prenom.trim() || !email.trim() || !tel.trim() || !duree.trim()}
                                    className={`flex items-center cursor-pointer  border rounded-lg ${!nom.trim() || !prenom.trim() || !email.trim() || !tel.trim() || !duree.trim() ? 'bg-gray-300 text-gray-500 border-gray-300' : 'bg-orange-600 text-white '} font-bold  py-1 px-5 mx-auto`}
                                    
                                    >
                                        {loadingAdherant ? (
                                            <Loader2 className='h-5 w-5 text-white animate-spin'/>
                                        ):(
                                            'Ajouter'
                                        )}
                                    </motion.button>
                                </div>
                               
                            </form>

                            <div className=""></div>
                        </div>
                    )}

                    {view === "access-paiement" && (
                        <div className="grid grid-cols-2 gap-5">Acces Paiement</div>
                    )}

                    {view === "access-abonnement" && (
                        <div className="grid grid-cols-2 gap-5">Acces abonnement</div>
                    )}
                </div>
            )}

            {activeTab === 'adherant' && (
                <div className="col-span-4 px-8 py-3 my-5">Adhérant</div>
            )}

            {activeTab === 'abonnement' && (
                <div className="col-span-4 px-8 py-3 my-5">Abonnement</div>
            )}

            {activeTab === 'paiement' && (
                <div className="col-span-4 px-8 py-3 my-5">Paiement</div>
            )}

            {activeTab === 'settings' && (
                <div className="col-span-4 px-8 py-3 my-5">Parametres</div>
            )}
        </div>
    )
}