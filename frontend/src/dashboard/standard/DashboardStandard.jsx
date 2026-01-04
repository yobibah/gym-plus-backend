import { AlertCircle, AlertCircleIcon, AlertOctagon, AlertTriangle, ArrowLeft, BadgeCheck, Calendar, CalendarOff, CalendarX, Check, CheckCheck, CheckCircle, CheckCircle2, CheckLine, LayoutDashboard, LayoutDashboardIcon, Loader2, Pencil, Plus, PlusSquare, Search, Settings, Settings2, SquarePlus, Trash, User, UserPlus, UserPlus2, Users, WalletCards, X, XCircle } from "lucide-react";
import React, {useState, useEffect, useMemo, useRef} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/input";
import Cookies from 'js-cookie'
import useGetUrl from "../../hooks/useGetUrl";
import { getToken } from "../../hooks/getToken";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl } from "../../../../env";
import { FetchNombreAdherant } from "../../api/dashboard/standard/tableau/nombreAdh";
import { FetchNombreActif } from "../../api/dashboard/standard/tableau/nombreActif";
import { fetchPrix } from "../../api/dashboard/standard/tableau/mesPrix";
import { AjouterAdherant } from "../../api/dashboard/standard/tableau/ajoutAdherant";
import {ExpireBientot} from "../../api/dashboard/standard/tableau/expireBientot"
import { AbonnementExpirer } from "../../api/dashboard/standard/tableau/abonnementExpire";
import { mesAdherants } from "../../api/dashboard/standard/adherants/adh";
import { Tarifs } from "../../api/dashboard/standard/parametres/tarifs";
import { MesInfos } from "../../api/dashboard/standard/parametres/mesInfos";
import { UpdateinfosSalle } from "../../api/dashboard/standard/parametres/updateInfosSalle";
import { UpdateInfosPerso } from "../../api/dashboard/standard/parametres/UpdateInfosPerso";
import { ChangePassword } from "../../api/dashboard/standard/parametres/changePassword";
import { UpdateTarifs } from "../../api/dashboard/standard/parametres/UpdateTarif";
import { DeleteTarif } from "../../api/dashboard/standard/parametres/DeleteTarif";
import { addLogo } from "../../api/dashboard/standard/parametres/addLogo";
import { UpdateLogo } from "../../api/dashboard/standard/parametres/changeLogo";
import { DeleteLogo } from "../../api/dashboard/standard/parametres/deleteLogo";
import { addCachet } from "../../api/dashboard/standard/parametres/addCachet";
import { UpdateCachet } from "../../api/dashboard/standard/parametres/changeCachet";
import { DeleteCachet } from "../../api/dashboard/standard/parametres/deleteCachet";

export default function DashboardStandard(){

    const [activeTab, setActiveTab] = useState('dashboard')
    const [view, setView] = useState("part-dashboard");
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [plan, setPlan] = useState('')
    const [showPrix, setShowPrix] = useState(false)
    const [montant, setMontant] = useState('')
    const [modalLogout, setModalLogout] = useState(false)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [showAdd, setShowAdd] = useState(false)
    const [showButtonSalle, setShowButtonSalle] = useState(false)
    const [showButtonProfil, setShowButtonProfil] = useState(false)
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const [showFormTarif, setShowFormTarif] = useState(false)
    const [mensuel, setMensuel] = useState('')
    const [trimestriel, setTrimestriel] = useState('')
    const [annuel, setAnnuel] = useState('')
    const [editMois, setEditMois] = useState(true)
    const [editTrim, setEditTrim] = useState(true)
    const [editAn, setEditAn] = useState(true)
    const [action, setAction] = useState("POST"); 
    const [nom_salle, setNomSalle] = useState('')
    const [pays_salle, setPaysSalle] = useState('')
    const [region, setRegion] = useState('')
    const [nomPerso, setNomPerso] = useState('')
    const [prenomPerso, setPrenomPerso] = useState('')
    const [telPerso, setTelPerso] = useState('')
    const [password, setPassword] = useState('')
    const [showModalTrash, setShowModalTrash] = useState(false)
    const [logo, setLogo] = useState(null)
    const [preview, setPreview] = useState(null)
    const logoInputRef =useRef(null)
    const [logoModal, setLogoModal] = useState(false)
    const [signModal, setSignModal] = useState(false)
    const [sign, setSign] = useState(null)
    const [previewSign, setPreviewSign] = useState(null)
    const signInputRef =useRef(null)



    function handleLogo(e){
        const logoSelection = e.target.files[0]

        if(!logoSelection) return

        setLogo(logoSelection)
        logoUpload.reset()
        setPreview(URL.createObjectURL(logoSelection))
    }

    function handleSign(e){
        const signSelection = e.target.files[0]

        if(!signSelection) return

        setSign(signSelection)
        signUpload.reset()
        setPreviewSign(URL.createObjectURL(signSelection))
    }

    const navigate = useNavigate()
    const token = getToken()
    
    function ActiveTab(){

         if(activeTab === 'dashboard'){
            setActiveTab('dashboard')
            setView('part-dashboard')
            setShowAdd(false)
            return
        }

        if(activeTab === 'adherant'){
            setActiveTab('adherant')
            return
        }

        if(activeTab === 'abonnement'){
            setActiveTab('abonnement')
            setShowAdd(false)
            return
        }

        if(activeTab === 'paiement'){
            setActiveTab('paiement')
            setShowAdd(false)
            return
        }

        if(activeTab === 'settings'){
            setActiveTab('settings')
            setShowAdd(false)
            return
        }
    }

    useEffect(()=>{
        ActiveTab()
    }, [activeTab])

    const nbrAdh = useQuery({
        queryKey : ['nbr_adherant'],
        queryFn : FetchNombreAdherant
    })
    const nbrAdherants = Number(nbrAdh.data?.nbr_adherant)
    const loadingNbrAdherant = nbrAdh.isPending
    const errorNbrAdherant = nbrAdh.isError
    const progressBarAdherant = (nbrAdherants / 200) * 100


    const nbrActif = useQuery({
        queryKey : ['nbr_actif'],
        queryFn : FetchNombreActif
    })
    const nbrAdherantsActif = Number(nbrActif.data?.nbr_actif) 
    const loadingNbrActif = nbrActif.isPending
    const errorNbrActif = nbrActif.isError

    
    const prix = useQuery({
        queryKey : ['prix'],
        queryFn : fetchPrix
    })
    const prix_mensuel = Number(prix.data?.montant?.montant_1) || ''
    const prix_trimestriel = Number(prix.data?.montant?.montant_2) || ''
    const prix_annuel = Number(prix.data?.montant?.montant_3) || ''
    const loading = prix.isPending
    const error = prix.isError



    const queryClient = useQueryClient()
    const addAdh = useMutation({
        mutationFn : AjouterAdherant,
        onSuccess : ()=>{
            setNom('')
            setPrenom('')
            setPlan('')
            setEmail('')
            setTel('')
            setMontant('')
           

            queryClient.invalidateQueries(['nbr_adherant'])
            queryClient.invalidateQueries(['nbr_actif'])

             setTimeout(()=>{
                addAdh.reset()
            }, 2500)
        }
    })

    const loadingAdherant = addAdh.isPending
    const successAdherant = addAdh.isSuccess
    const errorAdherant = addAdh.isError

    async function handleAdd(e) {
        e.preventDefault()
        const form = {nom, prenom, tel, plan, email, montant}
        addAdh.mutate({form})
    }

    const expire = useQuery({
        queryKey : ['expire-bientot'],
        queryFn : ExpireBientot
    })
    const loadingExpire = expire.isPending
    const errorExpire = expire.isError
    const totalExpire = Number(expire.data?.NBexpirer)
    const listExpireBiento = expire.data?.Bientoexpirer || []



    const abonnerExpire = useQuery({
        queryKey : ['abonner-expirer'],
        queryFn : AbonnementExpirer
    })
    const listExpirer = abonnerExpire.data?.expirer || []
    const loadingAbExpirer = abonnerExpire.isPending
    const errorAbExpirer = abonnerExpire.isError
    const totalAbExpirer = Number(abonnerExpire.data?.nbr)





    
    const mesAdh = useQuery({
        queryKey : ['mes-adherant', page],
        queryFn : mesAdherants,
        keepPreviousData: true
    })
    const dataAdh = mesAdh.data?.adherents?.data
    const loadingAdh = mesAdh.isPending
    const errorAdh = mesAdh.isError

    const recherche = useMemo(()=>{
        if(!dataAdh || !Array.isArray(dataAdh)) return []

        return dataAdh.filter(item =>{
            return(
                (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
                (item.prenom && item.prenom.toLowerCase().includes(search.toLowerCase())) ||
                (item.username && item.username.toLowerCase().includes(search.toLowerCase())) ||
                (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
                (item.telephone && item.telephone.includes(search.toLowerCase()))
            )
        })
    }, [search, dataAdh])


    const updateTarif = useQueryClient()
    const tarif = useMutation({
        mutationFn : Tarifs,
        onSuccess : ()=>{

            updateTarif.invalidateQueries(['prix'])
            setTimeout(()=>{
                tarif.reset()
            }, 2500)
        }
        
    })
    const loadingTarif = tarif.isPending
    const errorTarif = tarif.isError
    const successTarif = tarif.isSuccess

    const updateTarifs = useQueryClient()
    const tarifUpdate = useMutation({
        mutationFn : UpdateTarifs,
        onSuccess : ()=>{
            setMensuel('')
            setAnnuel('')
            setTrimestriel('')

            setEditAn(true)
            setEditMois(true)
            setEditTrim(true)
            updateTarifs.invalidateQueries(['prix'])

            setTimeout(()=>{
                tarifUpdate.reset()
            }, 2500)
        }
        
    })
    const loadingTarifUp = tarifUpdate.isPending
    const errorTarifUp = tarifUpdate.isError
    const successTarifUp = tarifUpdate.isSuccess


    const deleteTarifs = useQueryClient()
    const tarifDelete = useMutation({
        mutationFn : DeleteTarif,
        onSuccess : ()=>{
            setShowModalTrash(false)
            
            setMensuel('')
            setTrimestriel('')
            setAnnuel('')

            setEditMois(false)
            setEditTrim(false)
            setEditAn(false)

            setShowFormTarif(false)
            tarif.reset()
            tarifUpdate.reset()


            deleteTarifs.invalidateQueries(['prix'])

            setTimeout(()=>{
                tarifDelete.reset()
            }, 2500)
        }
        
    })
    const loadingTarifDel = tarifDelete.isPending
    const errorTarifDel = tarifDelete.isError
    const successTarifDel = tarifDelete.isSuccess



    function sendTarif(e, action){
        e.preventDefault()

        if (action  === "PUT") {
            tarifUpdate.mutate({
                montant_1 : mensuel,
                montant_2 : trimestriel,
                montant_3 : annuel
            });
        } else if (action === "DELETE"){
            tarifDelete.mutate();
        } else {
            tarif.mutate({
                montant_1 : mensuel,
                montant_2 : trimestriel,
                montant_3 : annuel
            });
        }
    }
    

    const infos = useQuery({
        queryKey : ['mes-infos'],
        queryFn : MesInfos
    })
    const infosSalle = infos?.data?.user?.salle
    const infosUser = infos?.data?.user
    const infosLoading = infos.isPending
    const infoError = infos.isError


    const update = useQueryClient()
    const update_infos = useMutation({
        mutationFn : UpdateinfosSalle,
        onSuccess : (()=>{
            setNomSalle('')
            setPaysSalle('')
            setRegion('')
            
            update.invalidateQueries(['mes-infos'])

            setTimeout(()=>{
                update_infos.reset()
            }, 2500)
        })
    })
    const updateLoading = update_infos.isPending
    const updateError = update_infos.isError
    const successUpdate = update_infos.isSuccess

    async function UpdateInfos(e) {
        e.preventDefault()
        update_infos.mutate({
            nom_salle,
            pays:pays_salle, 
            region
        })
    }



    const updatePerso = useQueryClient()
    const update_infos_perso = useMutation({
        mutationFn : UpdateInfosPerso,
        onSuccess : (()=>{
            setNomPerso('')
            setPrenomPerso('')
            setTelPerso('')
            
            updatePerso.invalidateQueries(['mes-infos'])

            setTimeout(()=>{
                update_infos_perso.reset()
            }, 2500)
        })
    })
    const persoLoading = update_infos_perso.isPending
    const persoError = update_infos_perso.isError
    const persoSuccess = update_infos_perso.isSuccess


    const updatePassword = useMutation({
        mutationFn : ChangePassword,
        onSuccess : (()=>{
            setTimeout(()=>{
                updatePassword.reset()
            }, 2500)
        })
    })
    const changePasswordLoading = updatePassword.isPending
    const passwordError = updatePassword.isError
    const passwordSuccess = updatePassword.isSuccess


    function UpdatePerso(e, action) {
        e.preventDefault()

        if(action === 'PASSWORD'){
            updatePassword.mutate({ password })
        } else {
            update_infos_perso.mutate({
                nom:nomPerso, 
                prenom:prenomPerso, 
                telephone:telPerso, 
            })
        }
    }

    const logoQuery = useQueryClient()
    const logoUpload = useMutation({
        mutationFn : addLogo,
        onSuccess : (()=>{
            setPreview(null)
            setLogo(null)

            logoQuery.invalidateQueries(['mes-infos'])

            setTimeout(()=>{
                logoUpload.reset()
            }, 2500)
        })
        // onError : (()=>{

        // })
    })
    const logoLoading = logoUpload.isPending
    const logoSuccess = logoUpload.isSuccess
    const logoError = logoUpload.isError

    const logoEditQuery = useQueryClient()
    const logoEditUpload = useMutation({
        mutationFn : UpdateLogo,
        onSuccess : (()=>{
            setPreview(null)
            setLogo(null)

            logoEditQuery.invalidateQueries(['mes-infos'])

            setTimeout(()=>{
                logoEditUpload.reset()
            }, 2500)
        })
        // onError : (()=>{

        // })
    })
    const logoEditLoading = logoEditUpload.isPending
    const logoEditSuccess = logoEditUpload.isSuccess
    const logoEditError = logoEditUpload.isError


    const logoDelQuery = useQueryClient()
    const logoDelUpload = useMutation({
        mutationFn : DeleteLogo,
        onSuccess : (()=>{
            setLogoModal(false)
            setPreview(null)
            setLogo(null)

            logoDelQuery.invalidateQueries(['mes-infos'])

            setTimeout(()=>{
                logoDelUpload.reset()
            }, 2500)
        }),
        onError : (()=>{
            setLogoModal(false)
        })
    })
    const logoDelLoading = logoDelUpload.isPending
    const logoDelSuccess = logoDelUpload.isSuccess
    const logoDelError = logoDelUpload.isError


    async function handlePostLogo(e, action){
        e.preventDefault()

        const formData = new FormData()
        formData.append("logo", logo)

        if(action === 'PUT'){
            logoEditUpload.mutate({formData})
        } else if(action === 'DELETE'){
            logoDelUpload.mutate()
        } else {
            logoUpload.mutate({formData})
        }
        

    }








    const signQuery = useQueryClient()
    const signUpload = useMutation({
        mutationFn : addCachet,
        onSuccess : (()=>{
            setPreview(null)
            setLogo(null)

            signQuery.invalidateQueries(['mes-infos'])

            setTimeout(()=>{
                signUpload.reset()
            }, 2500)
        })
        // onError : (()=>{

        // })
    })
    const signLoading = signUpload.isPending
    const signSuccess = signUpload.isSuccess
    const signError = signUpload.isError

    const signEditQuery = useQueryClient()
    const signEditUpload = useMutation({
        mutationFn : UpdateCachet,
        onSuccess : (()=>{
            setPreview(null)
            setLogo(null)

            signEditQuery.invalidateQueries(['mes-infos'])

            setTimeout(()=>{
                signEditUpload.reset()
            }, 2500)
        })
        // onError : (()=>{

        // })
    })
    const signEditLoading = signEditUpload.isPending
    const signEditSuccess = signEditUpload.isSuccess
    const signEditError = signEditUpload.isError


    const signDelQuery = useQueryClient()
    const signDelUpload = useMutation({
        mutationFn : DeleteCachet,
        onSuccess : (()=>{
            setSignModal(false)
            setPreviewSign(null)
            setSign(null)

            signDelQuery.invalidateQueries(['mes-infos'])

            setTimeout(()=>{
                signDelUpload.reset()
            }, 2500)
        }),
        onError : (()=>{
            setSignModal(false)
        })
    })
    const signDelLoading = signDelUpload.isPending
    const signDelSuccess = signDelUpload.isSuccess
    const signDelError = signDelUpload.isError


    async function handlePostSign(e, action){
        e.preventDefault()

        const formData = new FormData()
        formData.append("cachet", sign)

        if(action === 'PUT'){
            signEditUpload.mutate({formData})
        } else if(action === 'DELETE'){
            signDelUpload.mutate()
        } else {
            signUpload.mutate({formData})
        }
        

    }



    //test du bouton niveau...
    function handleNiveau(e){
        e.preventDefault()
        alert('test fonction')
    }

    function clearCache(){
        return (
            queryClient.removeQueries(['plan']),
            queryClient.removeQueries(['nbr_adherant']),
            queryClient.removeQueries(['nbr_actif']),
            queryClient.removeQueries(['prix']),
            queryClient.removeQueries(['abonner-expirer']),
            queryClient.removeQueries(['expire-bientot']),
            queryClient.removeQueries(['mes-adherant']),
            queryClient.removeQueries(['mes-infos'])

        )
        
    }

    function logoutModal(e){
        e.preventDefault()
        setModalLogout(!modalLogout)
        
    }

    function logout(e){
        e.preventDefault()
        
        if(token){
            Cookies.remove('token')
            clearCache()
            navigate('/auth', {replace : true})
        }
        
    }

    function FormMensuel(e){
        e.preventDefault()
        setShowFormTarif(!showFormTarif)
        //  setActiveTab('settings')
    }

    function formatDate(dates){
        const date = new Date(dates)
        return date.toLocaleDateString('fr-FR')
    }



    return(
        <div className="grid grid-cols-5 h-screen bg-gray-100 overflow-hidden">
            {/* Barre latérale */}
            <div className="col-span-1 py-3 bg-white shadow-lg flex flex-col gap-10 h-screen overflow-y-auto sticky top-0">
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
                    className={`${activeTab === 'adherant' || showAdd  ? 'bg-orange-100 rounded-lg' : ''} flex transition-colors duration-200 items-center mx-5  py-3 px-5 gap-5 hover:rounded-lg hover:bg-orange-100 text-lg`}
                    onClick={()=>{setActiveTab('adherant')}}
                >
                     <Users className={`${activeTab === 'adherant' || showAdd ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200 `}/>
                    <button className={`${activeTab === 'adherant' || showAdd ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}
                        
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
                <div 
                    
                    className="absolute transition-colors duration-200 bottom-5 w-full flex justify-center">
                    <motion.button 
                        whileHover={{scale: 1.03}}
                        whileTap={{scale: 0.95}}
                        className="bg-orange-600 shadow-lg  w-full mx-5 text-white font-bold rounded-lg px-5 py-2"
                        onClick={handleNiveau}
                    >Mettre à niveau</motion.button>
                    <motion.button 
                        whileHover={{scale: 1.03}}
                        whileTap={{scale: 0.95}}
                        className="bg-red-700 shadow-lg  w-full mx-5 text-white font-bold rounded-lg px-5 py-2"
                        onClick={logoutModal}
                    >Se Déconnecter</motion.button>
                </div>

            </div>

            {/* Contenu pricnipal , dependra vrai de là ou on se trouve*/}
            {/* Si tableau active */}
        
            {activeTab === 'dashboard' && (
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    
                    <div className="flex items-center mb-10 justify-between border-b-1 pb-5 border-gray-200">
                        <div className="flex items-center text-lg">
                            <div className="font-bold text-3xl">Tableau de Bord - Plan Stantard <br />
                            <span className="text-[16px] text-gray-400">Bienvenue {infosUser?.name || ''} {infosUser?.prenom || ''} !</span>
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
                            className={`flex-col relative shadow-lg ${loadingNbrAdherant ? '' : 'border-l-5 border-orange-600 shadow-orange-600'} bg-white rounded-xl items-center px-5 py-6`}
                            whileHover={{scale: 1.1}}
                        >
                            {loadingNbrAdherant ? (
                                <>
                                <div className="absolute inset-0 animate-pulse backdrop-blur rounded-xl shadow-lg ">
                                    
                                </div>
                                <div className="absolute inset-0 backdrop-blur rounded-xl ">
                                    
                                </div>
                                <div className="absolute animate-pulse inset-0  flex items-center justify-center backdrop-blur rounded-xl ">
                                    <Loader2 className='transition-alls duration-200  animate-spin text-orange-300 '/>
                                </div>
                                </>
                            ):(
                                <>
                            <div className="flex items-center justify-between">
                                
                                <div>
                                    <span className="text-xl font-bold text-gray-400 mb-2">Adhérants</span>
                                    <div className="text-sm text-gray-500 mb-2">
                                        
                                             <span className="font-bold text-2xl text-black font-bold">{nbrAdherants} </span>/200
                                    </div>
                                </div>
                                <div className="border-1 border-orange-600 p-2 rounded-full bg-gradient-to-r from-black/10 to-orange-600"><Users className="h-8 w-8"/></div>
                            </div>
                            <div className="w-full bg-gray-300 h-2 rounded-xl overflow-hidden">
                                <div className="bg-orange-600 h-2 rounded-xl transition-all duration-500" style={{width: `${progressBarAdherant}%`}}></div>
                            </div>
                            </>)}
                        
                        </motion.div>

                        <motion.div 
                        whileHover={{scale: 1.1}}
                        className={`bg-white flex relative ${loadingNbrActif ? '' : 'border-l-5 border-green-600 shadow-green-600'} justify-between shadow-lg rounded-xl items-center px-5 py-6`}>
                            
                            {loadingNbrActif ? (
                                <>
                                <div className="absolute inset-0 animate-pulse backdrop-blur rounded-xl shadow-lg ">
                                    
                                </div>
                                <div className="absolute inset-0  backdrop-blur rounded-xl ">
                                    
                                </div>
                                <div className="absolute animate-pulse inset-0  flex items-center justify-center backdrop-blur rounded-xl ">
                                    <Loader2 className='transition-alls duration-200 animate-spin text-green-300 '/>
                                </div>
                                </>
                            ):(
                            <>
                            <div className="text-xl font-bold text-gray-400 mb-2">Abonnements Actifs <br />
                           
                                <span className="font-bold text-2xl text-black font-bold">{nbrAdherantsActif}</span>
                            

                            </div>
                            <div className="border-1 border-green-600 p-2 rounded-full bg-gradient-to-r from-black/10 to-green-600"><BadgeCheck className="h-8 w-8"/></div>
                            </>)}
                                
                            
                        </motion.div>

                        <motion.div 
                        whileHover={{scale: 1.1}}
                        className={`bg-white flex-col relative ${loadingExpire ? '' : 'border-l-5 border-yellow-600 shadow-yellow-600'} justify-between shadow-lg rounded-xl items-center px-5 py-6`}>

                            {loadingExpire ? (
                                <>
                                <div className="absolute inset-0 animate-pulse backdrop-blur rounded-xl shadow-lg ">
                                    
                                </div>
                                <div className="absolute inset-0  backdrop-blur rounded-xl ">
                                    
                                </div>
                                <div className="absolute animate-pulse inset-0  flex items-center justify-center backdrop-blur rounded-xl ">
                                    <Loader2 className='transition-alls duration-200 animate-spin text-yellow-300 '/>
                                </div>
                                </>
                            ):(
                                <>
                               
                                <div className="flex items-center justify-between">
                                
                                    <div>
                                        <span className="text-xl font-bold text-gray-400 mb-2">Expire Bientôt </span>
                                        <div className="text-sm text-gray-500 mb-2">
                                            
                                                <span className="font-bold text-2xl text-yellow-600">{totalExpire} </span>
                                        </div>
                                    </div>
                                    <div className="border-1 border-yellow-600 p-2 rounded-full bg-gradient-to-r from-black/10 to-yellow-600"><AlertCircle className="h-8 w-8"/></div>
                                </div>
                                <div className="w-full overflow-hidden">
                                    <p className="text-[14px] text-gray-400 italic">7 jours avant la fin de l'abonnement</p>
                                </div>
                            </>
                            )}
                            
                        </motion.div>

                        <motion.div 
                        whileHover={{scale: 1.1}}
                        className={`bg-white flex relative ${loadingAbExpirer ? '' : 'border-l-5 border-red-600 shadow-red-600'} justify-between shadow-lg rounded-xl items-center px-5 py-6`}>

                            {loadingAbExpirer ? (
                                <>
                                <div className="absolute inset-0 animate-pulse backdrop-blur rounded-xl shadow-lg ">
                                    
                                </div>
                                <div className="absolute inset-0  backdrop-blur rounded-xl ">
                                    
                                </div>
                                <div className="absolute animate-pulse inset-0  flex items-center justify-center backdrop-blur rounded-xl ">
                                    <Loader2 className='transition-alls duration-200 animate-spin text-yellow-300 '/>
                                </div>
                                </>
                            ):(
                                <>
                            <div className="text-xl font-bold text-gray-400 mb-2">Abonnements Expirés <br />

                                <span className="font-bold text-2xl text-black font-bold">{totalAbExpirer}</span>
                            </div>
                            <div className="border-1 border-red-600 p-2 rounded-full bg-gradient-to-r from-black/10 to-red-600"><CalendarOff className="h-8 w-8"/></div>
                            
                            </>)}
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
                                {loadingAbExpirer ? (
                                    <>
                                        <div className=" flex items-center animate-pulse">
                                            
                                            <div className="flex bg-gray-300 h-10 w-10 rounded-full items-center justify-center p-2"></div>
                                            
                                        
                                            <div className="h-10 w-10">
                                                <p className="h-5 w-10"></p>
                                                <p className="h-5 w-10"></p>
                                            </div>
                                            
                                        </div>
                                        <div className="h-5 w-10"></div>
                                    </>
                                ):listExpirer.length === 0 ? (
                                    <div className="flex text-base w-full pt-10 items-center justify-center">
                                        <span className="text-gray-400">Aucun abonnement Expiré</span>
                                    </div>
                                ):listExpirer.map(item => (
                                    <div className="p-2 flex items-center justify-between w-full">
                                        <div key={item.id} className="flex items-center gap-2 mt-3">
                                            <div className="flex bg-gray-300 h-10 w-10 rounded-full items-center justify-center p-2">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <div className="">
                                                <p className="font-bold">{item.username || `${item.name} ${item.prenom}`}</p>
                                                <p className="text-xs text-gray-400 font-bold">Expiré le : {formatDate(item.created_at)}</p>
                                            </div>
                                        </div>
                                        <button

                                            className="text-orange-500 font-bold hover:border-b cursor-pointer transition-alls duration-200 hover:border-orange-500">
                                            Reactiver
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-xl px-5 py-6">
                            <p className="text-yellow-600 font-bold text-xl">Renouvellement à venir <span className="text-sm">(expire bientôt)</span></p>
                            

                                <table  className=" w-full text-left mt-3" style={{ borderCollapse: "collapse" }}>
                                    <thead className="">
                                        <tr className="bg-yellow-100">
                                            <th className="p-2 border-b border-gray-400">Adhérant</th>
                                            <th className="p-2 border-b border-gray-400">Type</th>
                                            <th className="p-2 border-b border-gray-400">Expire le</th>
                                        </tr>
                                    </thead>
                                    <tbody >

                                        {loadingAbExpirer ? (
                                            <tr>
                                                <td colSpan={3} className="py-6 text-center">
                                                    <Loader2 className="mx-auto animate-spin" />
                                                </td>
                                            </tr>
                                        ): listExpireBiento.length === 0 ? (
                                             <tr>
                                                <td colSpan={3} className="py-6 text-gray-400 text-center">
                                                    Aucun renouvellement à venir
                                                </td>
                                            </tr>
                                        ):listExpireBiento.map(item => (
                                            <tr key={item.id} className=" ">
                                                
                                                <td className="p-2 border-b border-gray-400">{item?.username || 'N/A'}</td>
                                                {item?.abonnements?.map(a => (
                                                    <td key={a.id} className="p-2 border-b border-gray-400">{a?.plan || 'N/A'}</td>
                                                ))}

                                                {item?.abonnements?.map(a => (
                                                    <td key={a.id} className="p-2 border-b border-gray-400">{a?.fin || 'N/A'}</td>
                                                ))}
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        
                        </div>
                    </div>
                    )}

                    {view === "access-adherant" && (
                        <div className="grid grid-cols-4 gap-5">
                            <div className=""></div>

                            <form onSubmit={handleAdd} className="col-span-2 rounded-lg bg-white shadow-lg px-8 py-5">
                                <div className="flex items-center gap-5">
                                <div className="flex-col flex gap-2 mb-3">
                                    <label className="font-bold">Nom <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'text'}
                                        value={nom}
                                        onChange={(e)=>{setNom(e.target.value), addAdh.reset()}}
                                        className={'border focus:outline-none  border-gray-300 text-sm p-2 rounded-lg'}
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
                                        onChange={(e)=>{setPrenom(e.target.value), addAdh.reset()}}
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
                                {/* <div className="flex justify-between items-center gap-5"> */}
                                <div className="flex-col flex gap-2 mb-3">
                                    <label className="font-bold">Adresse e-mail <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'email'}
                                        value={email}
                                        onChange={(e)=>{setEmail(e.target.value), addAdh.reset()}}
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
                                        onChange={(e)=>{setTel(e.target.value), addAdh.reset()}}
                                        className={'border focus:outline-none border-gray-300 text-sm p-2 rounded-lg'}
                                        placeholder={'Numéro de l\'adhérant'}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                {/* </div> */}
                                </div>

                
                                <div className="grid grid-cols-2 gap-10">
                                <div className="flex-col flex gap-2 ">
                                    <label className="font-bold">Abonnement</label>
                                

                                    <select
                                        value={plan}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setPlan(value)
                                            setShowPrix(!!value)
                                            addAdh.reset()
                                        }}
                                        className="border-4 border-gray-300 p-2 border-dotted text-sm"
                                        >
                                        <option value="">-- Choisir --</option>
                                        <option value="mensuel">Mensuel</option>
                                        <option value="trimestriel">Trimestriel</option>
                                        <option value="annuel">Annuel</option>
                                    </select>

                                </div>

                                <div>
                                   

                                    {showPrix && (
                                    <div className="flex-col flex gap-2">
                                        {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                        <>
                                            <label className="font-bold">Prix</label>
                                            <select
                                            value={montant}
                                            onChange={(e) => {setMontant(e.target.value), addAdh.reset()}}
                                            className="border-4 border-gray-300 p-2 border-dotted text-sm"
                                            >
                                            <option value="">-- Choisir --</option>
                                                {plan === "mensuel" && (
                                                    <option value={prix_mensuel}>
                                                        {prix_mensuel}
                                                    </option>)}
                                                {plan === "trimestriel" && (
                                                    <option value={prix_trimestriel}>
                                                        {prix_trimestriel}
                                                    </option>)}
                                                {plan === "annuel" && (
                                                    <option value={prix_annuel}>
                                                        {prix_annuel}
                                                    </option>)}
                                            </select>
                                        </>
                                        )}
                                    </div>
                                    )}


                                </div>
                                 

                                
                                </div>
                                <div className="flex items-center my-3">
                                    {errorAdherant && (
                                        <span className="text-red-600 text-sm">{addAdh.error.message}</span>
                                    )}
                                    {successAdherant && (
                                        <span className="text-green-600 text-sm">Enregistrement effectué avec succèss</span>
                                    )}
                                </div>

                                <div 
                                    
                                className="flex items-center my-3">
                                    <motion.button 
                                    whileHover={{scale: 1.03}}
                                    whileTap={{scale: 0.95}}
                                    disabled={loadingAdherant || !nom.trim() || !prenom.trim() || !email.trim() || !tel.trim() || !plan.trim() || !montant.trim()}
                                    className={`flex items-center cursor-pointer  border rounded-lg ${!nom.trim() || !prenom.trim() || !email.trim() || !tel.trim() || !plan.trim() || !montant.trim() ? 'bg-gray-300 text-gray-500 border-gray-300' : 'bg-orange-600 text-white '} font-bold  py-1 px-5 mx-auto`}
                                    
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
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    
                    <div className="font-bold text-3xl">Gestion des Adhérants <br />
                        <span className="text-gray-400 text-[16px]">Plan Standard - {nbrAdherants}/200 adhérants</span>
                    </div>

                    <div className="flex items-center justify-between my-8">
                        <div className="flex items-center relative w-90">
                            <div className="absolute top-2">
                                <Search className="h-5 w-5 text-orange-400 ml-2"/>
                            </div>
                            <input type="text" 
                            value={search}
                            onChange={(e)=>{setSearch(e.target.value)}}
                                className="block p-2 pl-8 w-full text-sm rounded-lg bg-white focus:outline-none border-orange-400 border w-full"
                                placeholder="Rechercher des infos par page..."
                            />
                        </div>

                        <motion.button 
                            whileTap={{scale: 0.95}}
                            onClick={()=>{setShowAdd(true), setActiveTab('')}}
                            
                        className="flex font-bold text-white text-sm items-center hover:text-black gap-2 py-2 px-4 rounded-lg bg-orange-600 border border-orange-500 hover:border-gray-400 hover:bg-transparent cursor-pointer transition-colors duration-200">
                            <Plus className="h-5 w-5 "/>
                            Ajouter un adhérant
                        </motion.button>
                    </div>

                    {/* A revoir avec les vraies donnees */}
                    <div className="bg-white my-8 rounded-lg ">
                        <table className=" w-full text-center  " style={{ borderCollapse: "collapse" }}>
                            <thead className="uppercase text-xs text-gray-400 bg-gray-200/70">
                                <tr >
                                    <th className=" p-3 text-left">Nom complet</th>
                                    <th className=" p-3">Adresse e-mail</th>
                                    <th className=" p-3">Telephone</th>
                                    <th className=" p-3">Forfait</th>
                                    <th className=" p-3">Montant</th>
                                    <th className=" p-3">Statut</th>
                                    <th className=" p-3">Fin d'abonnement</th>
                                    <th className=" p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="">
                                {loadingAdh ? (
                                    <tr>
                                        <td colSpan={8} className="py-6 text-center">
                                            <Loader2 className="mx-auto animate-spin" />
                                        </td>
                                    </tr>
                                ): recherche.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-6 text-center text-sm text-gray-500">
                                            {search.trim() ? "Aucun résultat trouvé pour votre recherche" : "Pas encore d'adhérents inscrits"}
                                        </td>
                                    </tr>
                                ): recherche.map(item => (
                                    <tr key={item.id} className="text-sm p-2 border-b border-gray-200">
                                        
                                        <td className="flex items-center  font-bold  gap-2 py-5 px-3">
                                        <span className="rounded-full bg-gray-200 flex items-center p-2"><User className="h-4 w-4"/></span>
                                        {item.username || `${item.name} ${item.prenom}`}

                                        </td>
                                        <td className=" px-3 py-5">{item.email || '-'}</td>
                                        <td className=" px-3 py-5">{item.telephone || '-'}</td>
                                        <td className=" px-3 py-5">{item.dernier_abonnement !== null ? item.dernier_abonnement.plan : '-'}</td>
                                        <td className=" px-3 py-5">{item.dernier_abonnement !== null ? `${item.dernier_abonnement.montant} XOF` : '-'}</td>
                                        {item.dernier_abonnement !== null ? (
                                            <td className=" px-3 ">
                                                <span className={`${item.dernier_abonnement.actif ? 'bg-green-200 ' : 'bg-red-200'} font-semibold py-1 px-2 rounded-xl`}>
                                                    {item.dernier_abonnement.actif ? 'actif' : 'expiré'}
                                                </span>
                                            </td>
                                        ):(
                                            <td className=" px-3 ">
                                                <span className="bg-red-200 font-semibold py-1 px-2 rounded-xl">
                                                expiré
                                                </span>
                                            </td>
                                        )}
                                        <td className=" px-3 py-5">{item.dernier_abonnement !== null ? item.dernier_abonnement.fin : '-'}</td>
                                        <td className="flex justify-center py-5 items-center gap-2 px-3">
                                            <motion.button 
                                                whileTap={{scale: 0.95}}
                                            className="border cursor-pointer border-orange-100 p-1 rounded-sm bg-orange-500">
                                                <Pencil className="text-white h-4 w-4"/>
                                            </motion.button>
                                            <motion.button 
                                                whileTap={{scale: 0.95}}
                                            className="border cursor-pointer border-red-100 p-1 rounded-sm bg-red-600">
                                                <Trash className="h-4 w-4 text-white" />
                                            </motion.button>
                                        </td>
                                    </tr>
                                ))}
                              
                            </tbody>

                            
                        </table>
                        <div className="flex  p-4 items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-400">
                                        Page <span className="font-bold text-black">{mesAdh.data?.adherents?.current_page}</span> sur <span className="font-bold text-black">{mesAdh.data?.adherents?.last_page}</span>
                                    </div>
                                </div>

                                <div className="flex text-sm items-center gap-2">
                                    <motion.button
                                    disabled={page === 1} 
                                    onClick={()=>{setPage(p => p - 1)}}
                                        whileTap={{scale: 0.95}}
                                        className={`${mesAdh.data?.adherents?.current_page ? 'bg-gray-200' : 'bg-transparent'} px-2 py-1 cursor-pointer border border-gray-200 font-semibold`}
                                    >Précedent</motion.button>

                                    <motion.button 
                                    disabled={page === mesAdh.data?.adherents?.last_page} 
                                    onClick={()=>{setPage(p => p + 1)}}
                                    whileTap={{scale: 0.95}}
                                        className={`${mesAdh.data?.adherents?.last_page ? 'bg-gray-200' : 'bg-transparent'} px-2 py-1 cursor-pointer border border-gray-200 font-semibold`}
                                    > Suivant</motion.button>
                                </div>
                            </div>

                    </div>
                    
                </div>
            )}

            {activeTab === 'abonnement' && (
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">Abonnement</div>
            )}

            {activeTab === 'paiement' && (
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">Paiement</div>
            )}

            {activeTab === 'settings' && (
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    <div className="flex flex-col gap-2 font-bold text-3xl">
                        <h1>Paramètres Généraux</h1>
                        <span className="text-gray-400 text-[16px]">Gérer les informations de votre salle, votre profil, ainsi que la tarification</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                    
                    <div className="col-span-2">
                    {infosLoading ? (
                        <div className="bg-white border border-gray-300 rounded-lg p-4 my-5 animate-pulse">
                            
                            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                            
                            <div className="flex flex-col gap-2 my-3">
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                <div className="h-10 bg-gray-100 rounded-lg"></div>
                            </div>
                            <div className="flex flex-col gap-2 my-3">
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                <div className="h-10 bg-gray-100 rounded-lg"></div>
                            </div>
                            
                            <div className="flex items-center justify-between gap-5">
                                <div className="flex flex-col gap-2 my-3 w-full">
                                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                    <div className="h-10 bg-gray-100 rounded-lg"></div>
                                </div>
                                
                                <div className="flex flex-col gap-2 my-3 w-full">
                                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                    <div className="h-10 bg-gray-100 rounded-lg"></div>
                                </div>
                            </div>
                            
                            <div className="my-3">
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                            </div>
                        </div>
                    ):(
                        <form onSubmit={UpdateInfos} className="bg-white border border-gray-300 rounded-lg p-4 my-5">
                            <span className="font-semibold text-xl">Informations de la salle</span>

                            <div className="flex flex-col gap-2 my-3">
                                <label className="text-gray-400 flex gap-1">Nom de la salle 
                                    <span className={`${showButtonSalle ? 'block' : 'hidden'} text-orange-600`}>*</span>
                                </label>
                                <input type="text"
                                    value={nom_salle}
                                    onChange={(e)=>{ setNomSalle(e.target.value),update_infos.reset()}}
                                    disabled={!showButtonSalle}
                                    placeholder={!showButtonSalle ? infosSalle.nom_salle : 'Entrez le nouveau nom de votre salle'}
                                    className={`border border-gray-300 p-1 pl-3 ${!showButtonSalle ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
                                />
                            </div>

                            <div className="flex flex-col gap-2 my-3">
                                <label className="text-gray-400">Adresse</label>
                                <input type="text"
                                    disabled
                                    placeholder={`${infosSalle.pays_salle} ${infosSalle.region_salle}`}
                                    className="border bg-gray-100 border-gray-300 p-1 pl-3 font-semibold rounded-lg focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-between gap-5">
                                <div className="flex flex-col gap-2 my-3 w-full">
                                    <label className="text-gray-400 flex gap-1">Pays 
                                        <span className={`${showButtonSalle ? 'block' : 'hidden'} text-orange-600`}>*</span>
                                    </label>
                                    <input type="text"
                                        value={pays_salle}
                                        onChange={(e)=>{ setPaysSalle(e.target.value),update_infos.reset()}}
                                        disabled={!showButtonSalle}
                                        placeholder={!showButtonSalle ? infosSalle.pays_salle : 'Entrez le pays où se trouve la salle'}
                                        className={`border border-gray-300 p-1 pl-3 ${!showButtonSalle ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 my-3 w-full">
                                    <label className="text-gray-400 flex gap-1">Région
                                        <span className={`${showButtonSalle ? 'block' : 'hidden'} text-orange-600`}>*</span>
                                    </label>
                                    <input type="text"
                                        value={region}
                                        onChange={(e)=> {setRegion(e.target.value), update_infos.reset()}}
                                        disabled={!showButtonSalle}
                                        placeholder={!showButtonSalle ? infosSalle.region_salle : 'Entrez la région'}
                                        className={`border border-gray-300 p-1 pl-3 ${!showButtonSalle ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
                                    />
                                </div>
                            </div>

                            {updateError && (
                                <p className="my-3 text-red-600 text-sm">{update_infos.error.message}</p>
                            )}

                            {successUpdate && (
                                <p className="my-3 text-green-600 text-sm">Infos de la salle mis à jour avec succès</p>
                            )}

                            <p className="my-3 italic text-gray-400 text-sm">Date de création : {formatDate(infosSalle.created_at)} - Mis à jour : {formatDate(infosSalle.updated_at)}</p>

                            <div className="flex items-center gap-2" >
                                <div className={`${showButtonSalle ? 'hidden' : ''}`}>
                               
                                <motion.button
                                    type="button" 
                                    whileTap={{scale:0.95}}
                                    onClick={()=>{setShowButtonSalle(true) }}
                                    className="my-3 cursor-pointer bg-gray-300 border-gray-200 text-black/80 border-2 font-semibold py-2 px-4 rounded-lg"
                                >
                                    Modifier
                                </motion.button>
                                </div>
                                {showButtonSalle && (
                                    <div className={`${successUpdate ? setShowButtonSalle(false) : 'block'} gap-2 flex items-center`}>
                                    <motion.button
                                        type="button" 
                                        whileTap={{scale:0.95}}
                                        onClick={()=> {setShowButtonSalle(false), setNomSalle(''), setPaysSalle(''), setRegion('')}}
                                        className="my-3 cursor-pointer bg-gray-300 border-gray-200 text-black/80 border-2 font-semibold py-2 px-4 rounded-lg"
                                    >
                                        Annuler
                                    </motion.button>
                                    <motion.button 
                                        type="submit"
                                        whileTap={{scale:0.95}}
                                        disabled={updateLoading || !nom_salle.trim() || !pays_salle.trim() || !region.trim()}
                                        className={`my-3 ${!nom_salle.trim() || !pays_salle.trim() || !region.trim() ? 'bg-orange-300' : 'bg-orange-500 cursor-pointer '} border-orange-200 border-2 text-white font-semibold py-2 px-4 rounded-lg`}
                                    >
                                        {updateLoading ? (
                                            <Loader2 className="animate-spin"/>
                                        ):(
                                            'Enregistrer'
                                        )}
                                        
                                    </motion.button>
                                    </div>
                                )}
                            </div>
                        </form>
                    )}
                    </div>

                    <div className=" border border-gray-300 rounded-lg p-4 my-5">
                        <p className="font-semibold text-xl ">Identité de votre salle <span className="text-sm">(optionnel)</span></p>
                        <p className="text-md mb-5 text-gray-400">Démarquez-vous des autres grâce à votre identité visuelle</p>
                        <form className="flex flex-col relative items-center gap-4">
                            

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full w-50 h-50 overflow-hidden bg-orange-400/20 border cursor-pointer"
                                onClick={() => logoInputRef.current.click()}
                            >
                                {preview ? (
                                    <div className="relative w-full h-full">
                                        <img src={preview} className="w-full h-full object-cover" />
                                        <div className="absolute border w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">
                                            
                                        </div>
                                    </div>
                                ) : infosSalle?.logo_salle ? (
                                        <div className="relative w-full h-full">
                                            <img src={infosSalle.logo_salle} className="w-full h-full object-cover" />
                                            <div className="absolute border w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">
                                                
                                            </div>
                                        </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <div className="flex flex-col items-center">
                                        <PlusSquare size={50} />
                                        <span className="font-bold">Ajouter</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            <input 
                                type="file" 
                                accept="image/*"
                                ref={logoInputRef}
                                hidden
                                onChange={handleLogo}
                            />

                            {logoSuccess && (
                                <p className="text-sm text-center text-green-500">Logo enregistré avec succès</p>
                            )}

                            {logoError && (
                                <p className="text-sm text-center text-red-500">{logoUpload.error.message}</p>
                            )}

                            {logoEditSuccess && (
                                <p className="text-sm text-center text-green-500">Logo modifié avec succès</p>
                            )}

                            {logoEditError && (
                                <p className="text-sm text-center text-red-500">{logoEditUpload.error.message}</p>
                            )}

                            {logoDelSuccess && (
                                <p className="text-sm text-center text-green-500">Logo supprimé avec succès</p>
                            )}

                            {logoDelError && (
                                <p className="text-sm text-center text-red-500">{logoDelUpload.error.message}</p>
                            )}

                            {logo && (
                                <div className="flex items-center gap-2">

                                    <button
                                        type='button'
                                        className="text-sm border py-1 px-2 my-3 text-red-500"
                                        onClick={()=>{setPreview(null);setLogo(null)}}
                                        disabled={logoLoading || logoEditLoading}
                                    >
                                        Annuler
                                    </button>

                                    <button
                                        type="submit"
                                        onClick={(e)=>{infosSalle?.logo_salle ? handlePostLogo(e, 'PUT') : handlePostLogo(e, 'POST')}}
                                        disabled={logoLoading || logoEditLoading }
                                        className="px-4 py-1 bg-blue-500 text-white rounded"
                                    >
                                        {logoLoading || logoEditLoading ? <Loader2 className="animate-spin h-5 w-5"/> : "Enregistrer"}

                                    </button>


                                </div>
                            )}

                            {infosSalle?.logo_salle && (
                                <div className={`flex items-center gap-2 ${logo ? "hidden" : "block"}`}>

                                    <button
                                        type="button"
                                        className="text-sm border py-1 px-2 my-3 text-red-500"
                                        onClick={()=>{setLogoModal(true)}}
                                    >
                                        Suprimmer
                                        
                                    </button>

                                </div>
                            )}

                            {logoModal && (
                                <div className="absolute flex flex-col gap-5 items-center justify-center inset-0 bg-black/80 backdrop-blur">
                                    <div className="flex items-center gap-2  animate-pulse">
                                        <AlertTriangle className="h-8 w-8 text-red-500" />
                                        <p className="font-semibold text-red-500">Cette action est irreversible !</p>
                                    
                                    </div>
                                    <p className="text-white font-semibold">Supprimer définitivement ?</p>
                                    <div className="flex gap-5 items-center justify-center">
                                        <motion.button
                                        type="button"
                                            whileTap={{scale : 0.95}}
                                            className="text-sm py-1 px-5 my-3 hover:bg-transparent border-gray-400 hover:text-white border transition-colors duration-200 bg-gray-400 font-semibold"
                                            onClick={()=>{setLogoModal(false)}}
                                        >Non</motion.button>
                                        <motion.button
                                            type="submit"
                                            whileTap={{scale : 0.95}}
                                            onClick={(e)=>{handlePostLogo(e, 'DELETE')}}
                                            disabled={logoDelLoading}
                                            className="text-sm py-1 px-5 my-3 hover:bg-transparent border-red-500 border transition-colors duration-200 text-white bg-red-500 font-semibold"
                                        >
                                            {logoDelLoading ? <Loader2 className="animate-spin text-red-500 h-5 w-5"/> : 'Oui'}
                                        </motion.button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </div>

                    <div className=" border border-gray-300 rounded-lg p-4 my-5">
                        <p className="font-semibold text-xl ">Cachet / Signature <span className="text-sm">(optionnel)</span></p>
                        <p className="text-md mb-5 text-gray-400">Scannez votre signature pour les marquer sur vos factures</p>
                        <form className="flex flex-col relative items-center gap-4">
                            

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-lg w-full h-50 overflow-hidden bg-orange-400/20 border cursor-pointer"
                                onClick={() => signInputRef.current.click()}
                            >
                                {previewSign ? (
                                    <div className="relative w-full h-full">
                                        <img src={previewSign} className="w-full h-full object-cover" />
                                        <div className="absolute border w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">
                                            
                                        </div>
                                    </div>
                                ) : infosSalle?.logo_salle ? (
                                        <div className="relative w-full h-full">
                                            <img src={infosSalle?.cahet_salle ?? '/default.jpg'} className="w-full h-full object-cover" />
                                            <div className="absolute border w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">
                                                
                                            </div>
                                        </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <div className="flex flex-col items-center">
                                        <PlusSquare size={50} />
                                        <span className="font-bold">Ajouter</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            <input 
                                type="file" 
                                accept="image/*"
                                ref={signInputRef}
                                hidden
                                onChange={handleSign}
                            />

                            {signSuccess && (
                                <p className="text-sm text-center text-green-500">Signature enregistré avec succès</p>
                            )}

                            {signError && (
                                <p className="text-sm text-center text-red-500">{signUpload.error.message}</p>
                            )}

                            {signEditSuccess && (
                                <p className="text-sm text-center text-green-500">Signature modifié avec succès</p>
                            )}

                            {signEditError && (
                                <p className="text-sm text-center text-red-500">{signEditUpload.error.message}</p>
                            )}

                            {signDelSuccess && (
                                <p className="text-sm text-center text-green-500">Logo supprimé avec succès</p>
                            )}

                            {signDelError && (
                                <p className="text-sm text-center text-red-500">{signDelUpload.error.message}</p>
                            )}

                            {sign && (
                                <div className="flex items-center gap-2">

                                    <button
                                        type='button'
                                        className="text-sm border py-1 px-2 my-3 text-red-500"
                                        onClick={()=>{setPreviewSign(null);setSign(null)}}
                                        disabled={signLoading || signEditLoading}
                                    >
                                        Annuler
                                    </button>

                                    <button
                                        type="submit"
                                        onClick={(e)=>{infosSalle?.cachet_salle ? handlePostSign(e, 'PUT') : handlePostSign(e, 'POST')}}
                                        disabled={signLoading || signEditLoading }
                                        className="px-4 py-1 bg-blue-500 text-white rounded"
                                    >
                                        {signLoading || signEditLoading ? <Loader2 className="animate-spin h-5 w-5"/> : "Enregistrer"}

                                    </button>


                                </div>
                            )}

                            {infosSalle?.cachet_salle && (
                                <div className={`flex items-center gap-2 ${sign ? "hidden" : "block"}`}>

                                    <button
                                        type="button"
                                        className="text-sm border py-1 px-2 my-3 text-red-500"
                                        onClick={()=>{setSignModal(true)}}
                                    >
                                        Suprimmer
                                        
                                    </button>

                                </div>
                            )}

                            {signModal && (
                                <div className="absolute flex flex-col gap-5 items-center justify-center inset-0 bg-black/80 backdrop-blur">
                                    <div className="flex items-center gap-2  animate-pulse">
                                        <AlertTriangle className="h-8 w-8 text-red-500" />
                                        <p className="font-semibold text-red-500">Cette action est irreversible !</p>
                                    
                                    </div>
                                    <p className="text-white font-semibold">Supprimer définitivement ?</p>
                                    <div className="flex gap-5 items-center justify-center">
                                        <motion.button
                                        type="button"
                                            whileTap={{scale : 0.95}}
                                            className="text-sm py-1 px-5 my-3 hover:bg-transparent border-gray-400 hover:text-white border transition-colors duration-200 bg-gray-400 font-semibold"
                                            onClick={()=>{setSignModal(false)}}
                                        >Non</motion.button>
                                        <motion.button
                                            type="submit"
                                            whileTap={{scale : 0.95}}
                                            onClick={(e)=>{handlePostSign(e, 'DELETE')}}
                                            disabled={signDelLoading}
                                            className="text-sm py-1 px-5 my-3 hover:bg-transparent border-red-500 border transition-colors duration-200 text-white bg-red-500 font-semibold"
                                        >
                                            {signDelLoading ? <Loader2 className="animate-spin text-red-500 h-5 w-5"/> : 'Oui'}
                                        </motion.button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </div>
                    </div>

                    
                    {infosLoading ? (
                        <div className="bg-white border border-gray-300 rounded-lg p-4 my-5 animate-pulse">
                            
                            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                            
                            <div className="flex items-center justify-between gap-5">
                                <div className="flex flex-col gap-2 my-3 w-full">
                                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                    <div className="h-10 bg-gray-100 rounded-lg"></div>
                                </div>
                                
                                <div className="flex flex-col gap-2 my-3 w-full">
                                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                    <div className="h-10 bg-gray-100 rounded-lg"></div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 my-3">
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                <div className="h-10 bg-gray-100 rounded-lg"></div>
                            </div>
                            <div className="flex flex-col gap-2 my-3">
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                <div className="h-10 bg-gray-100 rounded-lg"></div>
                            </div>
                            
                            
                            
                            <div className="my-3">
                                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                            </div>
                        </div>
                    ):(
                        <form onSubmit={UpdatePerso} className="bg-white border border-gray-300 rounded-lg p-4 my-5">
                            <span className="font-semibold text-xl">Mon Profil</span>

                            <div className="flex items-center justify-between gap-5">
                                <div className="flex flex-col gap-2 my-3 w-full">
                                    <label className="text-gray-400 flex gap-1">Prénom 
                                        <span className={`${showButtonProfil ? 'block' : 'hidden'} text-orange-600`}>*</span>
                                    </label>
                                    <input type="text"
                                        value={prenomPerso}
                                        onChange={(e)=>{ setPrenomPerso(e.target.value),update_infos_perso.reset()}}
                                        disabled={!showButtonProfil}
                                        placeholder={!showButtonProfil ? infosUser.prenom : 'Entrez votre prénom'}
                                        className={`border border-gray-300 p-1 pl-3 ${!showButtonProfil ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 my-3 w-full">
                                    <label className="text-gray-400 flex gap-1">Nom
                                        <span className={`${showButtonProfil ? 'block' : 'hidden'} text-orange-600`}>*</span>
                                    </label>
                                    <input type="text"
                                        value={nomPerso}
                                        onChange={(e)=> {setNomPerso(e.target.value), update_infos_perso.reset()}}
                                        disabled={!showButtonProfil}
                                        placeholder={!showButtonProfil ? infosUser.name : 'Entrez votre nom'}
                                        className={`border border-gray-300 p-1 pl-3 ${!showButtonProfil ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 my-3 w-full">
                                <label className="text-gray-400 flex gap-1">Numéro de téléphone 
                                    <span className={`${showButtonProfil ? 'block' : 'hidden'} text-orange-600`}>*</span>
                                </label>
                                <input type="tel"
                                    value={telPerso}
                                    onChange={(e)=>{ setTelPerso(e.target.value),update_infos_perso.reset()}}
                                    disabled={!showButtonProfil}
                                    placeholder={!showButtonProfil ? infosUser.telephone : 'Entrez votre numéro de telephone'}
                                    className={`border border-gray-300 p-1 pl-3 ${!showButtonProfil ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
                                />
                            </div>

                            <div className="flex flex-col gap-2 my-3 w-full">
                                <label className="text-gray-400">Adresse e-mail </label>
                                <input type="email"
                                    disabled
                                    placeholder={infosUser.email}
                                    className="border bg-gray-100 border-gray-300 p-1 pl-3 font-semibold rounded-lg focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2" >
                                <motion.button
                                whileTap={{scale:0.95}}
                                type="button" 
                                    onClick={()=>{setShowPasswordChange(!showPasswordChange)}}
                                    disabled={showButtonProfil}
                                    className={`${showButtonProfil ? 'bg-gray-200 text-gray-400 border-gray-200' : 'bg-tranparent border-gray-300 cursor-pointer'}  border-2 rounded-lg py-2 px-4 my-3`}
                                >
                                    {showPasswordChange ? 'Annuler le changement' : 'Changer le mot de passe'}
                                </motion.button>

                                {showPasswordChange && (
                                    <div className={`flex items-center gap-2 my-3 ${passwordSuccess ? setShowPasswordChange(false) : 'block'}`}>
                                        <input type="password" 
                                            placeholder="nouveau mot de passe"
                                            value={password}
                                            onChange={(e)=>{setPassword(e.target.value), updatePassword.reset()}}
                                            className="border py-2 px-4 rounded-lg focus:outline-none"
                                        />
                                        <motion.button
                                            type="submit"
                                            disabled={changePasswordLoading || !password.trim()}
                                            onClick={(e)=>UpdatePerso(e, 'PASSWORD')}
                                            whileTap={{scale:0.95}}
                                            className={`border ${!password.trim() ? 'bg-gray-200 border-gray-300' : 'bg-green-200 border-green-500 cursor-pointer'}  py-1 px-2 rounded-lg `}
                                        >
                                            {changePasswordLoading ? (
                                                <Loader2 className="h-7 w-7 text-green-600 animate-spin"/>
                                            ):(
                                                 <CheckCircle2 className={`h-7 w-7 ${!password.trim() ? 'text-gray-400' : 'text-green-600'}`} />
                                            )}
                                           
                                        </motion.button>
                                    </div>
                                )}
                            </div>

                                {persoError && (
                                    <p className="my-3 text-red-600 text-sm">{update_infos_perso.error.message}</p>
                                )}

                                {persoSuccess && (
                                    <p className="my-3 text-green-600 text-sm">Informations personnelles misent à jour avec succès</p>
                                )}

                                {passwordError && (
                                    <p className="my-3 text-red-600 text-sm">{updatePassword.error.message}</p>
                                )}

                                {passwordSuccess && (
                                    <p className="my-3 text-green-600 text-sm">Mot de passe changé avec succès</p>
                                )}

                            <div className="flex items-center gap-2" >
                                <div className={`${showButtonProfil ? 'hidden' : ''}`}>
                                <motion.button
                                    type="button" 
                                    whileTap={{scale:0.95}}
                                    disabled={showPasswordChange}
                                    onClick={()=>{setShowButtonProfil(true) }}
                                    className={`my-3 ${showPasswordChange ? 'bg-gray-200  text-gray-400 border-gray-200' : 'cursor-pointer bg-gray-300 border-gray-200 text-black/80'} border-2 font-semibold py-2 px-4 rounded-lg`}
                                >
                                    Modifier
                                </motion.button>
                                </div>
                                {showButtonProfil && (
                                    <div className={`${persoSuccess ? setShowButtonProfil(false) : 'block'}`}>
                                    <motion.button
                                        type="button" 
                                        whileTap={{scale:0.95}}
                                        onClick={()=>{setShowButtonProfil(false), setNomPerso(''), setPrenomPerso(''), setTelPerso('')}}
                                        className="my-3 cursor-pointer bg-gray-300 border-gray-200 text-black/80 border-2 font-semibold py-2 px-4 rounded-lg"
                                    >
                                        Annuler
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        // onClick={()=>{setActionProfil('PUT_PROFIL')}} 
                                        whileTap={{scale:0.95}}
                                        disabled={persoLoading || !nomPerso.trim() || !prenomPerso.trim() || !telPerso.trim()}
                                        className={`my-3 ${!nomPerso.trim() || !prenomPerso.trim() || !telPerso.trim() ? 'bg-orange-300' : 'bg-orange-500 cursor-pointer '} border-orange-200 border-2 text-white font-semibold py-2 px-4 rounded-lg`}
                                    >
                                        {persoLoading ? (
                                            <Loader2 className="animate-spin"/>
                                        ):(
                                            'Enregistrer'
                                        )}
                                        
                                    </motion.button>
                                    </div>
                                )}
                            </div>
                            
                        </form>
                    )}

                    <div className="p-4 ">  
                    {/* gerer le tarification, à voir apres une route api pour l'edition et la suppressio */}
                        <form onSubmit={sendTarif} className="">

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2 my-3">
                                    <span className="font-semibold text-xl">Gérer les tarifications</span>
                                    <span className="  text-gray-400">Personnalisez les tarifs de votre salle par mois, par an et par trimestre</span>
                                    {successTarif && (
                                        <span className="  text-green-500">Tarif ajouté avec succès</span>
                                    )}
                                    {errorTarif && (
                                        <span className="  text-red-500">{tarif.error.message}</span>
                                    )}
                                    {successTarifUp && (
                                        <span className="  text-green-500">Tarif modifié avec succès</span>
                                    )}
                                    {errorTarifUp && (
                                        <span className="  text-red-500">{tarifUpdate.error.message}</span>
                                    )}
                                    {successTarifDel && (
                                        <span className="  text-green-500">Tarif supprimé avec succès</span>
                                    )}
                                    {errorTarifDel && (
                                        <span className="  text-red-500">{tarifDelete.error.message}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className={`${(successTarif || prix_mensuel || prix_trimestriel || prix_annuel) ? 'hidden' : 'block'}`}>
                                            <motion.button 
                                            type="button"
                                                whileTap={{scale:0.95}}
                                                onClick={FormMensuel}
                                                className="px-5 py-3 rounded-lg shadow-lg border bg-orange-600 border-orange-600"
                                            >
                                                {showFormTarif ? <X className="text-white"/> : <Plus className="text-white"/>}
                                            </motion.button>
                                        </div>
                                        {/* Sinon on affiche ça */}
                                        <div>
                                            {(successTarif || prix_mensuel || prix_trimestriel || prix_annuel) && (
                                                <motion.button
                                                // type="submit"
                                                type={`${action === "PUT" ? "submit" : "button"}`}
                                                disabled={action === "PUT" ? loadingTarifUp : loadingTarifDel}
                                                // onClick={(e) =>{editMois && editAn && editTrim ? sendTarif(e, "DELETE") : sendTarif(e, "PUT")}} 
                                                onClick={(e) =>{editMois && editAn && editTrim ? setShowModalTrash(true) : sendTarif(e, "PUT")}} 
                                                    whileTap={{scale:0.95}}
                                                    className={`px-5 py-3 rounded-lg shadow-lg border ${editMois && editAn && editTrim ? 'bg-red-500 border-red-500' : 'bg-green-200 border-green-500'} `}
                                                >
                                                    {editMois && editAn && editTrim ? (
                                                     <Trash className=" text-white"/>
                                                    ): loadingTarifUp ? <Loader2 className="text-green-600 animate-spin"/> : <Check className="text-green-600"/>
                                                        
                                                    } 
                                                </motion.button> 
                                            )}
                                        </div>
                                    </div>
                                    {showFormTarif && (
                                        <div className={`${(successTarif || prix_mensuel || prix_trimestriel || prix_annuel) ? 'hidden' : 'block'}`}>
                                        <motion.button
                                        type="submit"
                                            whileTap={{scale:0.95}}
                                            disabled={loadingTarif || !mensuel.trim() || !trimestriel.trim() || !annuel.trim()}
                                            className={`px-5 py-3 rounded-lg shadow-lg border ${loadingTarif || !mensuel.trim() || !trimestriel.trim() || !annuel.trim() ? 'bg-gray-300 border-gray-400' : 'bg-green-200 border-green-600'}`}
                                        >
                                            {loadingTarif ? (
                                                <Loader2 className="text-green-600 animate-spin"/>
                                            ):(
                                                <Check className="text-green-600"/>
                                            )}
                                        </motion.button>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className="grid grid-cols-3 gap-2">

                                {/* Mois */}
                                <div className="border border-gray-400 p-2 ">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold">Mensuel</span>
                                        <hr className=" w-80 text-gray-400 "/>
                                        
                                        <Calendar className="text-gray-400"/> 
                                    </div>

                                    {(showFormTarif || prix_mensuel || prix_trimestriel || prix_annuel) && (
                                        <div className="flex gap-2 my-5 items-center justify-between">
                                            {/* Si ajout réssui... */}
                                            {(successTarif || prix_mensuel) ? (
                                                <>
                                                    <input 
                                                        type="tel"
                                                        value={mensuel}
                                                        onChange={(e)=>{setMensuel(e.target.value), tarif.reset(), tarifUpdate.reset()}} 
                                                        className={`border w-full ${editMois ? 'bg-gray-300 text-gray-800 border-gray-300 font-semibold' : 'border-gray-400'}  pl-3 focus:outline-none p-1`}
                                                        placeholder={editMois ? prix_mensuel : 'Saisissez un nouveau tarif mensuel'}
                                                        disabled={editMois}
                                                    /> 
                                                    <div >
                                                        <motion.button
                                                            type="button"
                                                            onClick={()=>{setEditMois(!editMois), setMensuel('')}} 
                                                            whileTap={{scale:0.95}}
                                                            className="border p-1 bg-orange-600 border-orange-600"
                                                        >
                                                            {editMois ? <Pencil className="h-5 w-5 text-white"/> : <X className="h-5 w-5 text-white"/>}
                                                        </motion.button>
                                                    </div>
                                                </>
                                            ):(

                                                <input 
                                                    type="tel"
                                                    value={mensuel}
                                                    onChange={(e)=>{setMensuel(e.target.value)}} 
                                                    className="border w-full  border-gray-400 pl-3 focus:outline-none p-1"
                                                    placeholder="Saisissez le tarif par mois"
                                                />
                                            )}

                                        
                                            
                                        </div>
                                    )}
                                </div>

                                    {/* Trimestre */}
                                <div className="border border-gray-400 p-2 ">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold">Trimestriel</span>
                                        <hr className=" w-80 text-gray-400 "/>
                                        
                                        <Calendar className="text-gray-400"/> 
                                    </div>

                                    {(showFormTarif || prix_mensuel || prix_trimestriel || prix_annuel) && (
                                        <div className="flex gap-2 my-5 items-center justify-between">
                                            {/* Si ajout réssui... */}
                                            {(successTarif || prix_trimestriel) ? (
                                                <>
                                                    <input 
                                                        type="tel"
                                                        value={trimestriel}
                                                        onChange={(e)=>{setTrimestriel(e.target.value), tarif.reset(), tarifUpdate.reset()}} 
                                                        className={`border w-full ${editTrim ? 'bg-gray-300 text-gray-800 border-gray-300 font-semibold' : 'border-gray-400'}  pl-3 focus:outline-none p-1`}
                                                        placeholder={editTrim ? prix_trimestriel : 'Saisissez un nouveau tarif trimestriel'}
                                                        disabled={editTrim}
                                                    /> 
                                                    <div >
                                                        <motion.button 
                                                            type="button"
                                                            onClick={()=>{setEditTrim(!editTrim), setTrimestriel('')}} 
                                                            whileTap={{scale:0.95}}
                                                            className="border p-1 bg-orange-600 border-orange-600"
                                                        >
                                                            {editTrim ? <Pencil className="h-5 w-5 text-white"/> : <X className="h-5 w-5 text-white"/>}
                                                        </motion.button>
                                                    </div>
                                                </>
                                            ):(

                                                <input 
                                                    type="tel"
                                                    value={trimestriel}
                                                    onChange={(e)=>{setTrimestriel(e.target.value)}} 
                                                    className="border w-full  border-gray-400 pl-3 focus:outline-none p-1"
                                                    placeholder="Saisissez le tarif par mois"
                                                />
                                            )}

                                        
                                            
                                        </div>
                                    )}
                                </div>

                                        {/* Annuel */}
                                <div className="border border-gray-400 p-2 ">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold">Annuel</span>
                                        <hr className=" w-80 text-gray-400 "/>
                                        
                                        <Calendar className="text-gray-400"/> 
                                    </div>

                                    {(showFormTarif || prix_mensuel || prix_trimestriel || prix_annuel) && (
                                        <div className="flex gap-2 my-5 items-center justify-between">
                                            {/* Si ajout réssui... */}
                                            {(successTarif || prix_annuel) ? (
                                                <>
                                                    <input 
                                                        type="tel"
                                                        value={annuel}
                                                        onChange={(e)=>{setAnnuel(e.target.value), tarif.reset(), tarifUpdate.reset()}} 
                                                        className={`border w-full ${editAn ? 'bg-gray-300 text-gray-800 border-gray-300 font-semibold' : 'border-gray-400'}  pl-3 focus:outline-none p-1`}
                                                        placeholder={editAn ? prix_annuel : 'Saisissez un nouveau tarif annuel'}
                                                        disabled={editAn}
                                                    /> 
                                                    <div >
                                                        <motion.button 
                                                            type="button"
                                                            onClick={()=>{setEditAn(!editAn), setAnnuel('')}} 
                                                            whileTap={{scale:0.95}}
                                                            className="border p-1 bg-orange-600 border-orange-600"
                                                        >
                                                            {editAn ? <Pencil className="h-5 w-5 text-white"/> : <X className="h-5 w-5 text-white"/>}
                                                        </motion.button>
                                                    </div>
                                                </>
                                            ):(

                                                <input 
                                                    type="tel"
                                                    value={annuel}
                                                    onChange={(e)=>{setAnnuel(e.target.value)}} 
                                                    className="border w-full  border-gray-400 pl-3 focus:outline-none p-1"
                                                    placeholder="Saisissez le tarif par mois"
                                                />
                                            )}

                                        
                                            
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {modalLogout && (
                <motion.div 
                     initial = {{opacity: 0, y: 10}}
                    animate = {{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="bg-red-200 rounded-lg z-20 px-3  flex flex-col justify-center gap-4 text-center absolute bottom-25 left-50 w-40 h-20 ">
                    <span className="text-sm font-semibold">Êtes-vous sûr ?</span>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={()=>setModalLogout(false)}
                            className="cursor-pointer bg-orange-100 py-1 px-2 font-bold rounded-lg"
                        >non</button>
                        <button
                            onClick={logout}
                            className="cursor-pointer bg-red-700 text-white py-1 px-2 font-bold rounded-lg"
                        >oui</button>
                    </div>
                </motion.div>
            )}

            {showAdd && (
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    <button 
                        onClick={()=>{setShowAdd(false), setActiveTab('adherant')}}
                    className="flex items-center cursor-pointer justify-center gap-2">
                        <ArrowLeft className="h-5 w-5 text-orange-500" />
                        <span className="text-orange-500 text-sm">Retour à la liste des adhérants</span>
                    </button>

                    <div className="my-5 font-bold text-3xl">Ajout d'adherant <br />
                        <span className="text-gray-400 text-sm">Remplissez le formulaire ci-dessous pour enregistrer vos adhérants</span>
                    </div>

                    <div className="my-10">
                            {/* <div className=""></div> */}

                            {/* <form onSubmit={handleAdd} className="col-span-2 rounded-lg  px-8 py-5">
                                
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-xl">Nom <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'text'}
                                        value={nom}
                                        onChange={(e)=>{setNom(e.target.value), addAdh.reset()}}
                                        className={'border focus:outline-none  border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={'Nom de l\'adhérant'}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-xl">Prénom <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'text'}
                                        value={prenom}
                                        onChange={(e)=>{setPrenom(e.target.value), addAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={'Prenom de l\'adhérant'}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-xl">Adresse e-mail <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'email'}
                                        value={email}
                                        onChange={(e)=>{setEmail(e.target.value), addAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={'Email de l\'adhérant'}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-xl">Numéro de téléphone <span className="text-red-600">*</span></label>
                                    <Input 
                                        type={'tel'}
                                        value={tel}
                                        onChange={(e)=>{setTel(e.target.value), addAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={'Numéro de l\'adhérant'}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

            
                                <div className="flex-col flex gap-2 mb-5 ">
                                    <label className="font-bold text-xl">Abonnement</label>
                                

                                    <select
                                        value={plan}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setPlan(value)
                                            setShowPrix(!!value)
                                            addAdh.reset()
                                        }}
                                        className="border-3 border-orange-500 p-2 border-dotted text-md"
                                        >
                                        <option value="">-- Choisir --</option>
                                        <option value="mensuel">Mensuel</option>
                                        <option value="trimestriel">Trimestriel</option>
                                        <option value="annuel">Annuel</option>
                                    </select>

                                </div>

                                <div>
                                   

                                    {showPrix && (
                                    <div className="flex-col flex gap-2 ">
                                        {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                        <>
                                            <label className="font-bold text-xl">Prix</label>
                                            <select
                                            value={montant}
                                            onChange={(e) => {setMontant(e.target.value), addAdh.reset()}}
                                            className="border-3 border-orange-500 p-2 border-dotted text-md"
                                            >
                                            <option value="">-- Choisir --</option>
                                                {plan === "mensuel" && (
                                                    <option value={prix_mensuel}>
                                                        {prix_mensuel}
                                                    </option>)}
                                                {plan === "trimestriel" && (
                                                    <option value={prix_trimestriel}>
                                                        {prix_trimestriel}
                                                    </option>)}
                                                {plan === "annuel" && (
                                                    <option value={prix_annuel}>
                                                        {prix_annuel}
                                                    </option>)}
                                            </select>
                                        </>
                                        )}
                                    </div>
                                    )}


                                </div>
                                 

                                
                                <div className="flex items-center my-3">
                                    {errorAdherant && (
                                        <span className="text-red-600 text-md">{addAdh.error.message}</span>
                                    )}
                                    {successAdherant && (
                                        <span className="text-green-600 text-md">Enregistrement effectué avec succèss</span>
                                    )}
                                </div>

                                <div 
                                    
                                className="flex items-center my-5">
                                    <motion.button 
                                    whileHover={{scale: 1.03}}
                                    whileTap={{scale: 0.95}}
                                    disabled={loadingAdherant || !nom.trim() || !prenom.trim() || !email.trim() || !tel.trim() || !plan.trim() || !montant.trim()}
                                    className={`flex items-center w-full justify-center cursor-pointer  border rounded-lg ${!nom.trim() || !prenom.trim() || !email.trim() || !tel.trim() || !plan.trim() || !montant.trim() ? 'bg-gray-300 text-gray-500 border-gray-300' : 'bg-orange-600 text-white '} font-bold  text-xl py-3 px-5 mx-auto`}
                                    
                                    >
                                        {loadingAdherant ? (
                                            <Loader2 className='h-5 w-5 text-white animate-spin'/>
                                        ):(
                                            'Ajouter'
                                        )}
                                    </motion.button>
                                </div>
                               
                            </form> */}

                            <form onSubmit={handleAdd} className="grid grid-cols-4 gap-5 rounded-lg  px-8 py-5">
                                
                                <div className="col-span-4 w-full flex gap-10 justify-between">
                                    {/* info perso */}
                                    <div className="col-span-2 w-full bg-white py-5 px-8 rounded-lg shadow-lg">
                                        <div className="flex items-center gap-2 text-xl font-bold mb-5">
                                            <User className="h-10 w-10 border rounded-full bg-orange-500 text-white p-2"/>
                                            Informations personnelles de l'adhérant
                                        </div>
                                        <div className="flex-col flex gap-2 mb-5">
                                            <label className="font-bold text-lg">Nom <span className="text-red-600">*</span></label>
                                            <Input 
                                                type={'text'}
                                                value={nom}
                                                onChange={(e)=>{setNom(e.target.value), addAdh.reset()}}
                                                className={'border focus:outline-none  border-orange-500 text-md p-2 rounded-lg'}
                                                placeholder={'Nom de l\'adhérant'}
                                                disabled={false}
                                                hidden={false}
                                                pattern={null}
                                                ref={null}
                                                checked={null}
                                            />
                                        </div>

                                        <div className="flex-col flex gap-2 mb-5">
                                            <label className="font-bold text-lg">Prénom <span className="text-red-600">*</span></label>
                                            <Input 
                                                type={'text'}
                                                value={prenom}
                                                onChange={(e)=>{setPrenom(e.target.value), addAdh.reset()}}
                                                className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                                placeholder={'Prenom de l\'adhérant'}
                                                disabled={false}
                                                hidden={false}
                                                pattern={null}
                                                ref={null}
                                                checked={null}
                                            />
                                        </div>
                                        <div className="flex-col flex gap-2 mb-5">
                                            <label className="font-bold text-lg">Adresse e-mail <span className="text-red-600">*</span></label>
                                            <Input 
                                                type={'email'}
                                                value={email}
                                                onChange={(e)=>{setEmail(e.target.value), addAdh.reset()}}
                                                className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                                placeholder={'Email de l\'adhérant'}
                                                disabled={false}
                                                hidden={false}
                                                pattern={null}
                                                ref={null}
                                                checked={null}
                                            />
                                        </div>

                                        <div className="flex-col flex gap-2 mb-5">
                                            <label className="font-bold text-lg">Numéro de téléphone <span className="text-red-600">*</span></label>
                                            <Input 
                                                type={'tel'}
                                                value={tel}
                                                onChange={(e)=>{setTel(e.target.value), addAdh.reset()}}
                                                className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                                placeholder={'Numéro de l\'adhérant'}
                                                disabled={false}
                                                hidden={false}
                                                pattern={null}
                                                ref={null}
                                                checked={null}
                                            />
                                        </div>
                                    </div>

                                    {/* Aboonement */}
                                    <div className="col-span-2 w-full bg-white py-5 px-8 rounded-lg shadow-lg">
                                        <div className="flex items-center gap-2 text-xl font-bold mb-5">
                                            <Plus className="h-10 w-10 border rounded-full bg-orange-500 text-white p-2"/>
                                            Type d'abonnement
                                        </div>

                                        <div className="flex-col flex gap-2 mb-5 ">
                                            <label className="font-bold text-lg">Abonnement <span className="text-red-600">*</span></label>
                                        

                                            <select
                                                value={plan}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    setPlan(value)
                                                    setShowPrix(!!value)
                                                    addAdh.reset()
                                                }}
                                                className="border-3 border-orange-500 p-2 border-dotted text-md"
                                                >
                                                <option value="">-- Choisir --</option>
                                                <option value="mensuel">Mensuel</option>
                                                <option value="trimestriel">Trimestriel</option>
                                                <option value="annuel">Annuel</option>
                                            </select>

                                        </div>

                                        <div>
                                        

                                            {showPrix && (
                                            <div className="flex-col flex gap-2 ">
                                                {loading ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                ) : (
                                                <>
                                                    <label className="font-bold text-lg">Prix <span className="text-red-600">*</span></label>
                                                    <select
                                                    value={montant}
                                                    onChange={(e) => {setMontant(e.target.value), addAdh.reset()}}
                                                    className="border-3 border-orange-500 p-2 border-dotted text-md"
                                                    >
                                                    <option value="">-- Choisir --</option>
                                                        {plan === "mensuel" && (
                                                            <option value={prix_mensuel}>
                                                                {prix_mensuel}
                                                            </option>)}
                                                        {plan === "trimestriel" && (
                                                            <option value={prix_trimestriel}>
                                                                {prix_trimestriel}
                                                            </option>)}
                                                        {plan === "annuel" && (
                                                            <option value={prix_annuel}>
                                                                {prix_annuel}
                                                            </option>)}
                                                    </select>
                                                </>
                                                )}
                                            </div>
                                            )}


                                        </div>
                                    </div>
                                </div>
                                 

                                
                                <div className="flex items-center my-3  col-span-4 w-full px-8">
                                    {errorAdherant && (
                                        <span className="text-red-600 text-lg  flex item-center gap-2"><XCircle className="h-5 w-5 text-red-600"/>{addAdh.error.message}</span>
                                    )}
                                    {successAdherant && (
                                        <span className="text-green-600 text-lg flex item-center gap-2"><CheckCircle className="h-5 w-5 text-green-600"/>Enregistrement effectué avec succèss</span>
                                    )}
                                </div>

                               
                               <div className="flex justify-end items-center gap-2 w-full col-span-4">
                                    <motion.button 
                                        onClick={()=>{setShowAdd(false), setActiveTab('adherant')}}
                                        whileTap={{scale: 0.95}}
                                        className='flex items-center justify-center cursor-pointer text-black/80 border rounded-lg bg-gray-300  border-gray-300 font-bold  text-xl py-3 px-5'
                                    
                                    >
                                        Annuler
                                    </motion.button>

                                    <motion.button 
                                        whileTap={{scale: 0.95}}
                                        disabled={loadingAdherant || !nom.trim() || !prenom.trim() || !email.trim() || !tel.trim() || !plan.trim() || !montant.trim()}
                                        className={`flex items-center justify-center  border rounded-lg ${!nom.trim() || !prenom.trim() || !email.trim() || !tel.trim() || !plan.trim() || !montant.trim() ? 'bg-orange-200 text-gray-500 border-orange-200' : 'bg-orange-600 text-white cursor-pointer '} font-bold  text-xl py-3 px-5`}
                                    
                                    >
                                        {loadingAdherant ? (
                                            <Loader2 className='h-5 w-5 text-white animate-spin'/>
                                        ):(
                                            'Enregistrer'
                                        )}
                                    </motion.button>
                                </div>
                                
                               
                            </form>

                            {/* <div className=""></div> */}
                        </div>
                </div>

                
            )}

            {showModalTrash && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur flex items-center justify-center">
                    <div className="bg-white shadow-[0px_0px_30px_rgba(255,0,0,0.5)] rounded-sm p-3 ">
                        <div className="font-bold text-red-600 flex items-center gap-2 text-2xl uppercase">
                            <AlertOctagon className="text-red-600 h-10 w-10" />
                            Attention !
                        </div>

                        <div className="my-5">
                            <p className="text-[16px] text-black/80">Vous êtes sur le point de supprimer la 
                                configuration de <br />tous vos tarifs (mensuel,
                                trimestriel, annuel).
                            </p>
                        </div>

                        <div className="flex items-center gap-2 justify-end py-3 ">
                            <motion.button
                                type="button"
                                whileTap={{scale: 0.95}}
                                className="px-2 py-1 transition-colors duration-200 border border-gray-400/50 bg-gray-400/50 font-semibold"
                                onClick={()=>{setShowModalTrash(false)}}
                            >Annuler
                            </motion.button>
                            <motion.button
                                onClick={(e)=>{sendTarif(e, "DELETE")}}
                                whileTap={{scale: 0.95}}
                                className="px-2 py-1 transition-colors duration-200 border text-white bg-red-600 border-red-600 font-semibold"
                            >
                                {loadingTarifDel ?  <Loader2 className=" text-white animate-spin"/> : 'Confirmer'}
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}

            
        
        </div>
    )
}