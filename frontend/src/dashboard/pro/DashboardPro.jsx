import { AlarmClockIcon, AlertCircle, AlertCircleIcon, AlertOctagon, AlertTriangle, ArrowLeft, BadgeCheck, Bell, Calendar, CalendarOff, CalendarX, Check, CheckCheck, CheckCircle, CheckCircle2, CheckLine, Circle, CircleAlert, Clock, Download, Euro, ExpandIcon, Eye, LayoutDashboard, LayoutDashboardIcon, Loader2, LogOut, Pencil, Plus, PlusSquare, Search, Settings, Settings2, SquarePlus, Trash, User, UserCog, UserPlus, UserPlus2, Users, Wallet, WalletCards, Weight, X, XCircle } from "lucide-react";
import React, {useState, useEffect, useMemo, useRef} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/input";
import Cookies from 'js-cookie'
import { getToken } from "../../hooks/getToken";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { DeleteAdh } from "../../api/dashboard/standard/adherants/deleteAdh";
import checkvideo from '../../assets/videos/check2.gif'
import { UpdateAdh } from "../../api/dashboard/standard/adherants/updateAdh";
import logoGym from '../../assets/images/coverhero.png'
import { Reabonner } from "../../api/dashboard/standard/abonnements/reabonner";
import { History } from "../../api/history";
import { MisNiveau } from "../../api/dashboard/standard/miseNiveau";
import { fetchDataPlan } from "../../api/fetchPlan";
import { addCachet } from "../../api/dashboard/standard/parametres/addCachet";
import { DeleteCachet } from "../../api/dashboard/standard/parametres/deleteCachet";
import { UpdateCachet } from "../../api/dashboard/standard/parametres/changeCachet";
import coverhero from '../../assets/images/coverhero.png'
import { Suspendre } from "../../api/dashboard/standard/abonnements/suspendre";
import { Reactiver } from "../../api/dashboard/pro/abonnements/reactiver";


export default function DashboardPro(){

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

    const [sign, setSign] = useState(null)
    const [previewSign, setPreviewSign] = useState(null)
    const signInputRef =useRef(null)
    const [signModal, setSignModal] = useState(false)
    
    const [modalSupAdherant, setModalSupAdherant] = useState(false)
    const [modalUpAdherant, setModalUpAdherant] = useState(false)
    const [adhToDelete, setAdhToDelete] = useState(null)
    const [adhToUp, setAdhToUp] = useState(null)
    const [reabonner, setReabonner] = useState(null)
    const [reabonnerModal, setReabonnerModal] = useState(false)
    const [abonnementTab, setAbonnementTab] = useState('tous')

    const [notifModal, setNotifModal] = useState(false)
    const [suspen, setSuspen] = useState(null)
    const [suspendreModal, setSuspendreModal] = useState(false)
    const [react, setReact] = useState(null)
    const [reactiverModal, setReactiverModal] = useState(false)

    const [detailAdherant, setDetailAdherant] = useState(false)
    
    function handleNotif(){
        setNotifModal(!notifModal)
    }


    function handleLogo(e){
        const logoSelection = e.target.files[0]

        if(!logoSelection) return

        setLogo(logoSelection)
        logoUpload.reset()
        setPreview(URL.createObjectURL(logoSelection))
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
            setNotifModal(false)
            return
        }

        if(activeTab === 'abonnement'){
            setActiveTab('abonnement')
            setShowAdd(false)
            setNotifModal(false)
            setAbonnementTab('tous')
            return
        }

        if(activeTab === 'coach'){
            setActiveTab('coach')
            setShowAdd(false)
            setNotifModal(false)
            return
        }

        if(activeTab === 'cours'){
            setActiveTab('cours')
            setShowAdd(false)
            setNotifModal(false)
            return
        }

        if(activeTab === 'finances'){
            setActiveTab('finances')
            setShowAdd(false)
            setNotifModal(false)
            return
        }

        if(activeTab === 'settings'){
            setActiveTab('settings')
            setShowAdd(false)
            setNotifModal(false)
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
    const dataAdh = mesAdh.data?.adherents?.data || []
    const totalMensuel = Number(mesAdh.data?.mensuel) || 0
    const totalTrimestre = Number(mesAdh.data?.trimestriel) || 0
    const totalAnnuel = Number(mesAdh.data?.annuel) || 0
    const loadingAdh = mesAdh.isPending
    const errorAdh = mesAdh.isError


    const adherentsFiltres = useMemo(() => {
        if (!dataAdh || !Array.isArray(dataAdh)) return []

        let result = dataAdh

        if (search.trim()) {
            const s = search.toLowerCase()
            result = result.filter(item =>
                item.name?.toLowerCase().includes(s) ||
                item.prenom?.toLowerCase().includes(s) ||
                item.username?.toLowerCase().includes(s) ||
                item.email?.toLowerCase().includes(s) ||
                item.telephone?.includes(s)
            )
        }

        if (abonnementTab === 'actifs') {
            result = result.filter(item => item.dernier_abonnement?.actif)
        }

        if (abonnementTab === 'expirés') {
            result = result.filter(item => !item.dernier_abonnement?.actif)
        }

        return result
    }, [dataAdh, search, abonnementTab])


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


    function handleSign(e){
        const signSelection = e.target.files[0]

        if(!signSelection) return

        setSign(signSelection)
        signUpload.reset()
        setPreviewSign(URL.createObjectURL(signSelection))
    }



        const signQuery = useQueryClient()
        const signUpload = useMutation({
            mutationFn : addCachet,
            onSuccess : (()=>{
                setPreviewSign(null)
                setSign(null)
    
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
                setPreviewSign(null)
                setSign(null)
    
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



    const supAdhQuery = useQueryClient()
    const supAdh = useMutation({
        mutationFn : DeleteAdh,
        onSuccess : (()=>{
            setModalSupAdherant(false)
            // setModalSuccessSupAdh(true)
            setTimeout(()=>{
                supAdh.reset()

            }, 5000)

            supAdhQuery.invalidateQueries(['mes-adherant'])
        }),

        onError : (()=>{
            setModalSupAdherant(false)
            // setModalErrorSupAdh(true)
            setTimeout(()=>{
                supAdh.reset()

            }, 3000)
        })
    })

    const loadingSupAdh = supAdh.isPending
    const errorSupAdh = supAdh.isError
    const successSupAdh = supAdh.isSuccess

    async function handleDeleteAdh(e, id){
        e.preventDefault()
        if (!id) return
        supAdh.mutate({id})
    }


    const adhUpQuery = useQueryClient()
    const updateAdh = useMutation({
        mutationFn: UpdateAdh,

        onSuccess: (()=>{
            setModalUpAdherant(false)

            setTimeout(()=>{
                updateAdh.reset()

            }, 5000)

            adhUpQuery.invalidateQueries(['mes-adherant'])
            
        }),
        onError: (()=>{
            setTimeout(()=>{
                adhToUp.reset()

            }, 3000)
        })
    })
    const loadingUpdateAdh = updateAdh.isPending
    const errorUpdateAdh = updateAdh.isError
    const successUpdateAdh = updateAdh.isSuccess


    async function updateAdhUp(e, id){
        e.preventDefault()
        if(!id) return
        updateAdh.mutate({
            id:adhToUp?.id, 
            nom:adhToUp?.name, 
            prenom:adhToUp?.prenom,
            email:adhToUp?.email, 
            telephone:adhToUp?.telephone
        })
    }



    const reabQuery = useQueryClient()
    const reabAdh = useMutation({
        mutationFn: Reabonner,
        onSuccess : (()=>{
            setReabonnerModal(false)

            setTimeout(()=>{
                reabAdh.reset()
            }, 5000)

            reabQuery.invalidateQueries(['nbr_actif'])
            suspQuery.invalidateQueries(['mes-adherant'])
            suspQuery.invalidateQueries(['expire-bientot'])
            reabQuery.invalidateQueries(['abonner-expirer'])
        }),

        onError : (()=>{

            setTimeout(()=>{
                reabAdh.reset()
            }, 3000)
        })
    })
    const reabLoading = reabAdh.isPending
    const reabSuccess = reabAdh.isSuccess
    const reabError = reabAdh.isError

    async function handleReabonner(e, id){
        e.preventDefault()
        if(!id) return
        reabAdh.mutate({
            id : reabonner?.id,
            email : reabonner?.email,
            plan : reabonner?.plan
        })
    }




    const suspQuery = useQueryClient()
    const suspAdh = useMutation({
        mutationFn: Suspendre,
        onSuccess : (()=>{
            setSuspendreModal(false)

            setTimeout(()=>{
                suspAdh.reset()
            }, 5000)

            suspQuery.invalidateQueries(['nbr_actif'])
            suspQuery.invalidateQueries(['mes-adherant'])
            suspQuery.invalidateQueries(['expire-bientot'])
            suspQuery.invalidateQueries(['abonner-expirer'])
        }),

        onError : (()=>{

            setTimeout(()=>{
                suspAdh.reset()
            }, 3000)
        })
    })
    const suspLoading = suspAdh.isPending
    const suspSuccess = suspAdh.isSuccess
    const suspError = suspAdh.isError

    async function handleSuspendre(e, id){
        e.preventDefault()
        if(!id) return
        suspAdh.mutate({
            id : suspen?.id
        })
    }


    const reactQuery = useQueryClient()
    const reactAdh = useMutation({
        mutationFn: Reactiver,
        onSuccess : (()=>{
            setReactiverModal(false)

            setTimeout(()=>{
                reactAdh.reset()
            }, 5000)

            reactQuery.invalidateQueries(['nbr_actif'])
            suspQuery.invalidateQueries(['mes-adherant'])
            suspQuery.invalidateQueries(['expire-bientot'])
            reactQuery.invalidateQueries(['abonner-expirer'])
        }),

        onError : (()=>{

            setTimeout(()=>{
                reactAdh.reset()
            }, 3000)
        })
    })
    const reactLoading = reabAdh.isPending
    const reactSuccess = reabAdh.isSuccess
    const reactError = reabAdh.isError

    async function handleReactiver(e, id){
        e.preventDefault()
        if(!id) return
        reactAdh.mutate({
            id : react?.id
        })
    }




    const planChoisit = useQuery({
        queryKey : ['plan'],
        queryFn : fetchDataPlan
    })
    const planActuel = planChoisit?.data?.plan


    const misNiveauQuery = useQueryClient()
    const misNiveau = useMutation({
        mutationFn : MisNiveau,
        onSuccess : (()=>{
            
            misNiveauQuery.invalidateQueries(['nbr-adherant'])

            setTimeout(()=>{
                misNiveau.reset()
            }, 3000)
        }),

        onError : (()=>{
            setTimeout(()=>{
                misNiveau.reset()
            }, 3000)
        })
    })
    const misNiveauLoading = misNiveau.isPending
    const miseNiveauError = misNiveau.isError
    const misNiveauSuccess = misNiveau.isSuccess


    async function handleNiveau(){
        misNiveau.mutate({
            forfait : planActuel
        })
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
            queryClient.removeQueries(['mes-infos']),
            queryClient.removeQueries(['history'])

        )
        
    }




    function logoutModal(){
        if(notifModal){
            setNotifModal(false)
            setModalLogout(true)
            return
        }
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

    const historyQuery = useQueryClient()
    const history = useQuery({
        queryKey : ['history'],
        queryFn : History,
        // refetchInterval: 60000

    })
    const historyLoading = historyQuery.isPending
    const historyError = historyQuery.isError
    const dataHistory = history.data?.historiques || []
    const totalHistory = history.data?.historiques.length
    // const dateHistory = history.data?.historiques[totalHistory-1]?.date || 'N/A'
    // const timeHistory = history.data?.historiques[totalHistory-1]?.depuis || 'N/A'

    const date = new Date
    const d = date.toLocaleDateString('fr-FR')
    const fin = formatDate(planChoisit?.data?.abonnement?.fin)

    const getDaysDifference = (date1, date2) => {
        const diffTime = date2.getTime() - date1.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const today = new Date();
    const fin7 = planChoisit?.data?.abonnement?.fin;
    const endDate = new Date(fin7);
    const daysRemaining = getDaysDifference(today, endDate);


    return(
        <div className="grid grid-cols-5 h-screen bg-gray-100 overflow-hidden">
            
            <div className="col-span-1 py-3 bg-white shadow-lg flex flex-col gap-5 h-screen overflow-y-auto sticky top-0">
                <div className="flex items-center gap-2  px-5 my-5">
                    <div className="rounded-full flex items-center justify-center border border-orange-500 bg-orange-500 w-18 h-15">
                        {infosSalle?.logo_salle ? (
                            <img src={infosSalle?.logo_salle} alt="logo" className="w-full rounded-full h-full object-cover"/>
                        ):(
                            <img src={logoGym} alt="logo" className="w-full rounded-full h-full object-cover"/>
                        )}
                        
                        
                    </div>
                    <div className="flex items-center w-full justify-between">
                        <div className="flex flex-col">
                            <div className="font-semibold text-2xl">{infosSalle?.nom_salle || 'GymPlus'}</div> 
                            <div className="text-orange-500 text-sm">Plan {planActuel}</div>
                        </div>

                        <motion.button 
                            whileTap={{scale: 0.95}}
                            className="text-red-500 border hover:bg-orange-50 transition-colors duration-200 border-red-500 rounded-lg p-2"
                            onClick={logoutModal}
                        >
                            <LogOut className="h-5 w-5"/>
                        </motion.button>
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
                
                {/* Ajout a reveoir avec les data */}
                <motion.div
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{scale: 0.95}} 
                    className={`${activeTab === 'coach' ? 'bg-orange-100 rounded-lg' : ''} flex transition-colors duration-200 items-center mx-5  py-3 px-5 gap-5 hover:rounded-lg hover:bg-orange-100 text-lg`}
                    onClick={()=>{setActiveTab('coach')}}
                >
                     <UserCog className={`${activeTab === 'coach' ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200`}/>
                    <button className={`${activeTab === 'coach' ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}
                        
                    >Coachs</button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{scale: 0.95}} 
                    className={`${activeTab === 'cours' ? 'bg-orange-100 rounded-lg' : ''} flex transition-colors duration-200 items-center mx-5  py-3 px-5 gap-5 hover:rounded-lg hover:bg-orange-100 text-lg`}
                    onClick={()=>{setActiveTab('cours')}}
                >
                     <Calendar className={`${activeTab === 'cours' ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200`}/>
                    <button className={`${activeTab === 'cours' ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}
                        
                    >Planning de cours</button>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{scale: 0.95}} 
                    className={`${activeTab === 'finances' ? 'bg-orange-100 rounded-lg' : ''} flex transition-colors duration-200 items-center mx-5  py-3 px-5 gap-5 hover:rounded-lg hover:bg-orange-100 text-lg`}
                    onClick={()=>{setActiveTab('finances')}}
                >
                     <Euro className={`${activeTab === 'finances' ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200`}/>
                    <button className={`${activeTab === 'finances' ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}
                        
                    >Finances</button>
                </motion.div>

                {/* Fin ajout */}

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
                <div className="absolute mx-5 py-3 px-5 transition-colors duration-200 bottom-5 mx-auto w-full flex flex-col gap-2">
                    
                    <motion.button 
                        whileHover={{scale: 1.03}}
                        whileTap={{scale: 0.95}}
                        disabled={misNiveauLoading || daysRemaining <= 0}
                        className={`${daysRemaining <= 0 ? 'bg-orange-300' : 'bg-orange-600'}  shadow-lg  w-full text-white font-bold rounded-lg px-5 py-3`}
                        onClick={handleNiveau}
                    >
                        {misNiveauLoading ? (
                            <Loader2 className="animate-spin text-white"/>
                        ):(
                            'Mettre à niveau'
                        )}
                    </motion.button>
                    {/* <motion.button 
                        whileHover={{scale: 1.03}}
                        whileTap={{scale: 0.95}}
                        className="bg-red-700 shadow-lg  w-full text-white font-bold rounded-lg px-5 py-3"
                        onClick={logoutModal}
                    >Se Déconnecter</motion.button> */}
                </div>

            </div>

        
            {activeTab === 'dashboard' && (
                <>
                    <div className="absolute top-0 right-0 opacity-40 h-200 overflow-hidden w-200">
                        <img src={coverhero} alt="logo" className="h-full w-full" />
                    </div>
                    <div className="col-span-4 relative px-8 py-3 my-5 overflow-y-auto">
                        
                        <div className="flex items-center mb-10 justify-between border-b-1 pb-5 border-gray-200">
                            <div className="flex flex-col gap-2 text-lg">
                                <div className="flex items-center gap-5">
                                    <h1 className="font-bold text-3xl">Tableau de Bord</h1>
                                    {daysRemaining <= 0 && (
                                        <div className="flex items-center gap-1 bg-red-100 px-4 rounded-full py-1">
                                            <AlertTriangle className="text-red-500" />
                                            <p className="text-red-500 font-bold">
                                            {daysRemaining === 0 
                                                ? "Votre abonnement expire aujourd'hui !" 
                                                : "Votre abonnement est expiré !"
                                            }
                                            </p>
                                        </div>
                                        )}

                                    {0 < daysRemaining && daysRemaining <= 7 &&(
                                        <div className="flex items-center gap-1 bg-red-100 px-4 animate-pulse rounded-full py-1">
                                            <AlertTriangle className="text-red-500" />
                                            <p className="text-red-500 font-bold">
                                            {daysRemaining === 1 
                                                ? "Votre abonnement expire demain !" 
                                                : `Votre abonnement expirera dans ${daysRemaining} jours !`
                                            }
                                            </p>
                                        </div>
                                    )}
                                    
                                </div>
                                <p className="text-[18px] text-gray-400">Bienvenue {infosUser?.name || ''} {infosUser?.prenom || ''} !</p>
                                
                            </div>

                            <div className="flex items-center justify-center gap-5">
                                <div className="relative w-full">
                                    <input type="text" value={search} 
                                        onChange={(e)=>{setSearch(e.target.value)}}
                                        placeholder="Rechercher adherant..." 
                                        className="block w-full mx-2 p-2 pl-10 border border-orange-500 rounded-lg text-sm focus:outline-none bg-white"
                                    />
                                    <div className="absolute top-2 left-4">
                                        <Search className="h-5 w-5 text-orange-500"/>
                                    </div>
                                </div>

                                {/* <motion.button
                                type="button"
                                    whileTap={{scale : 0.95}}
                                    // onClick={}
                                    className=""
                                >
                                    <Bell className="h-7 w-7"/>
                                </motion.button> */}

                                <div className="relative">
                                    <motion.button
                                        // type="button"
                                        whileTap={{scale : 0.95}}
                                        onClick={handleNotif}
                                        className=""
                                    >
                                        <Bell className="h-7 w-7"/>
                                    </motion.button>
                                    
                                    <div className="absolute -top-3 text-sm -right-2 bg-orange-600 text-white font-bold h-6 w-6 flex items-center justify-center rounded-full">
                                        <p>+9</p>
                                    </div>

                                    {notifModal && (
                                        <motion.div 
                                            initial = {{opacity: 0, y: -8}}
                                            animate = {{opacity: 1, y: 0}}
                                            transition={{duration: 0.5}}
                                            className="absolute -bottom-31 bg-white -right-22 text-sm w-50 flex flex-col shadow-[0_0_3px_rgba(0,0,0,0.8)]">
                                            <div className=" p-2 bg-orange-50 hover:bg-gray-50 transition-colors duration-200 cursor-pointer font-semibold">
                                                <p>{totalAbExpirer} abonnements expirés</p>
                                            </div>
                                            <div className=" p-2 bg-gray-50">
                                                <p>12 renouvellement à venir</p>
                                            </div>
                                            <hr className="w-45 text-gray-300  mt-2 mx-auto"/>
                                            <button
                                                className=" p-2 text-red-500 cursor-pointer"
                                                onClick={logoutModal}
                                            >
                                                Déconnexion
                                            </button>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="rounded-full h-10 w-15 border bg-orange-500 border-orange-500 flex items-center justify-center ">
                                    {infosSalle?.logo_salle ? (
                                        <img src={infosSalle?.logo_salle} alt="logo" className="w-full rounded-full h-full object-cover"/>
                                    ):(
                                        <img src={logoGym} alt="logo" className="w-full rounded-full h-full object-cover"/>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-8 ">
                            <motion.div
                            whileHover={{scale: 1.08}}
                            className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.8)] rounded-lg w-full flex flex-col gap-2 p-4">
                                <div className="">
                                    <p className="text-gray-400 font-bold text-[18px]">Adhérants</p>
                                </div>
                                <div>
                                    <p className="font-bold text-3xl">{nbrAdherants || 0} / 1000</p>
                                </div>
                            </motion.div>
                            <motion.div 
                            whileHover={{scale: 1.08}}
                            className="bg-white shadow-[0_0_5px_rgba(0,255,0,0.8)] w-full flex flex-col gap-2 p-4 rounded-lg">
                                <div>
                                    <p className="text-gray-400 font-bold text-[18px]">Adhérants Actifs</p>
                                </div>
                                <div>
                                    <p className="font-bold text-3xl text-green-500">{nbrAdherantsActif || 0}</p>
                                </div>
                            </motion.div>
                            <motion.div 
                            whileHover={{scale: 1.08}}
                            className="bg-white shadow-[0_0_5px_rgba(255,0,0,0.8)] w-full flex flex-col gap-2 p-4 rounded-lg">
                                <div>
                                    <p className="text-gray-400 font-bold text-[18px]">Dépenses du Mois</p>
                                </div>
                                <div>
                                    <p className="font-bold text-3xl text-red-600">XOF 1000</p>
                                </div>
                            </motion.div>
                            <motion.div 
                            whileHover={{scale: 1.08}}
                            className="bg-white rounded-lg shadow-[0_0_5px_rgba(251,255,0,0.8)] w-full flex flex-col gap-2 p-4">
                                <div>
                                    <p className="text-gray-400 font-bold text-[18px]">Récettes du Mois</p>
                                </div>
                                <div>
                                    <p className="font-bold text-3xl text-yellow-500">XOF 1000</p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="my-10 grid grid-cols-4 justify-between gap-8">
                            <div className="shadow-[0_0_5px_rgba(0,0,0,0.5)] p-4 col-span-3 bg-white rounded-lg w-full">
                                <div className="flex items-center justify-between w-full">
                                    <h3 className="font-bold">Aperçu financier</h3>
                                    <div className="flex items-center justify-center gap-2 border rounded-full border-gray-400 py-1 px-5">
                                        <motion.button
                                            className="text-sm rounded-lg py-1 px-3 font-semibold "
                                        >
                                            Semaine
                                        </motion.button>
                                        <motion.button
                                            className="text-sm rounded-lg py-1 px-3 bg-blue-500 text-white font-semibold  "
                                        >
                                            Mois
                                        </motion.button>
                                        <motion.button
                                            className="text-sm rounded-lg py-1 px-3 font-semibold "
                                        >
                                            Année
                                        </motion.button>
                                    </div>
                                </div>
                                <div className="flex relative my-3">
                                    <p className="text-2xl font-bold">XOF 50000</p>
                                    <p className="text-green-500 font-semibold absolute bottom-1 left-32 text-sm">+5,2% vs mois dernier</p>
                                </div>

                                <div className="flex items-center justify-center h-100">
                                    <p className="text-gray-400">Graphique</p>
                                </div>
                            </div>


                            <div className="flex flex-col gap-8 w-full">
                                <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.5)] flex flex-col gap-3 p-4 rounded-lg">
                                    <h3 className="font-bold">Gestion des Abonnements</h3>
                                    <div className="flex items-center justify-center gap-8">
                                        <div className="flex flex-col items-center">
                                            <p className="text-yellow-500 text-xl font-bold">12</p>
                                            <p className="text-gray-400 text-sm font-semibold">Suspendus</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-green-500 text-xl font-bold">8</p>
                                            <p className="text-gray-400 text-sm font-semibold">Réactivés</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.5)] flex flex-col gap-3 p-4 rounded-lg">
                                    <h3 className="font-bold">Alertes Intelligentes</h3>
                                    <div className="">
                                        <div className="flex gap-2 items-center">
                                            <div className="flex items-center rounded-full justify-center p-1 bg-yellow-100">
                                                <Calendar className="h-5 w-5 text-yellow-500"/>
                                            </div>
                                            <p className="text-sm font-semibold">15 abonnements expirent cette semaine</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="flex items-center rounded-full justify-center p-1 bg-red-100">
                                                <CalendarOff className="h-5 w-5 text-red-500"/>
                                            </div>
                                            {/* <p className="text-sm font-semibold">{totalAbExpirer > 0 ? {totalAbExpirer} : 'Aucun'} abonnement{totalAbExpirer > 0 ? 's' : ''} expiré{totalAbExpirer > 0 ? 's':''}</p> */}
                                            {totalAbExpirer >= 1 ? (
                                                <p className="text-sm font-semibold">{totalAbExpirer} abonnements expirés</p>
                                            ):(
                                                <p className="text-sm font-semibold">Aucun abonnement expiré</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.5)] flex flex-col gap-3 p-4 rounded-lg">
                                    <h3 className="font-bold">Coachs affectés à la salle</h3>
                                    {/* <p className="text-yellow-500 text-xl text-center font-bold">10</p> */}
                                    <div className="flex items-center justify-center gap-8">
                                        <div className="flex flex-col items-center">
                                            <p className="text-green-500 text-xl font-bold">10</p>
                                            <p className="text-gray-400 text-sm font-semibold">Enregistrements</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="bg-white sticky top-0 overflow-hidden flex flex-col gap-3 shadow-[0_0_5px_rgba(0,0,0,0.5)] w-full p-4 rounded-lg ">
                            <h3 className="font-bold">Suivi des Abonnés</h3>
                            <table className=" w-full text-center  " style={{ borderCollapse: "collapse" }}>
                                <thead className="uppercase text-xs text-gray-400 bg-gray-200/70">
                                    <tr >
                                        <th className=" p-3 text-left">Nom de l'adhérant</th>
                                        <th className=" p-3">Date de début</th>
                                        <th className=" p-3">Date de fin</th>
                                        <th className=" p-3">Statut</th>
                                    </tr>
                                </thead>

                                    <tbody className="">
                                        {loadingAdh ? (
                                            <tr>
                                                <td colSpan={5} className="py-6 text-center">
                                                    <Loader2 className="mx-auto animate-spin" />
                                                </td>
                                            </tr>
                                        ): adherentsFiltres.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-6 text-center text-sm text-gray-500">
                                                    {search.trim() ? "Aucun résultat trouvé pour votre recherche" : "Aucun abonnement enregistré"}
                                                </td>
                                            </tr>
                                        ): adherentsFiltres.map(item => (
                                            <tr key={item.id} className="text-sm p-2 border-b border-gray-200">
                                                
                                                <td className="flex items-center  font-bold  gap-2 py-5 px-3">
                                                <span className="rounded-full bg-gray-200 flex items-center p-2"><User className="h-4 w-4"/></span>
                                                {`${item.name} ${item.prenom}` || item.username }

                                                </td>
                                                <td className=" px-3 py-5">{item.dernier_abonnement !== null ? item.dernier_abonnement.debut : '-'}</td>
                                                <td className=" px-3 py-5">{item.dernier_abonnement !== null ? item.dernier_abonnement.fin : '-'}</td>
                                                <td className=" px-3 ">
                                                    <span className={`${item.dernier_abonnement.actif ? 'bg-green-200 ' : 'bg-red-200'} font-semibold py-1 px-2 rounded-xl`}>
                                                        {item.dernier_abonnement?.actif ? 'actif' : 'expiré'}
                                                    </span>
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
                </>
            )}

            {activeTab === 'adherant' && (
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    
                    <div className="flex flex-col gap-2" >
                        <h1 className="font-bold text-3xl">Gestion des Adhérants</h1>
                        <p className="text-gray-400 text-[18px]">Plan {planActuel} - {nbrAdherants}/1000 adhérants</p>
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
                                placeholder="Rechercher un adherant..."
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <motion.button 
                                whileTap={{scale: 0.95}}
                                disabled={daysRemaining <= 0}
                            className={`flex font-bold  text-sm items-center ${daysRemaining <= 0 ? ' text-gray-400 bg-gray-300 border-gray-300' : 'bg-transparent text-black border-gray-400 cursor-pointer'}  gap-2 py-2 px-4 rounded-lg  border  transition-colors duration-200`}>
                                <Download className="h-5 w-5 "/>
                                Export CSV
                            </motion.button>

                            <motion.button 
                                whileTap={{scale: 0.95}}
                                onClick={()=>{setShowAdd(true), setActiveTab('')}}
                                // disabled={daysRemaining <= 0}
                                disabled={daysRemaining <= 0}
                            className={`flex font-bold text-white text-sm items-center ${daysRemaining <= 0 ? 'bg-orange-300 border-orange-300' : 'bg-orange-600 hover:text-black border-orange-500 hover:border-gray-400 hover:bg-transparent cursor-pointer'}  gap-2 py-2 px-4 rounded-lg  border  transition-colors duration-200`}>
                                <Plus className="h-5 w-5 "/>
                                Ajouter un adhérant
                            </motion.button>
                        </div>
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
                                    {/* <th className=" p-3">Fin d'abonnement</th> */}
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
                                ): adherentsFiltres.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-6 text-center text-sm text-gray-500">
                                            {search.trim() ? "Aucun résultat trouvé pour votre recherche" : "Pas encore d'adhérents inscrits"}
                                        </td>
                                    </tr>
                                ): adherentsFiltres.map(item => (
                                    <tr key={item.id} className="text-sm p-2 border-b border-gray-200">
                                        
                                        <td className="flex items-center  font-bold  gap-2 py-5 px-3">
                                        <span className="rounded-full bg-gray-200 flex items-center p-2"><User className="h-4 w-4"/></span>
                                        {`${item.name} ${item.prenom}` || item.username }

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
                                        {/* <td className=" px-3 py-5">{item.dernier_abonnement !== null ? item.dernier_abonnement.fin : '-'}</td> */}
                                        <td className="flex justify-center py-5 items-center gap-2 px-3">
                                            <motion.button
                                                type="button"
                                                onClick={()=>{setDetailAdherant(true),setAdhToUp(item)}} 
                                                    whileTap={{scale: 0.95}}
                                                className={`border cursor-pointer border-gray-100 bg-gray-300 p-1 rounded-sm `}>
                                                <Eye className="text-gray-600 h-4 w-4"/>
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                disabled={daysRemaining <= 0}
                                                onClick={()=>{setModalUpAdherant(true),setAdhToUp(item)}} 
                                                whileTap={{scale: 0.95}}
                                                className={`border  ${daysRemaining <= 0 ? 'bg-orange-300' : 'bg-orange-500 cursor-pointer'} border-orange-100 p-1 rounded-sm `}>
                                                <Pencil className="text-white h-4 w-4"/>
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                disabled={daysRemaining <= 0}
                                                onClick={()=>{setModalSupAdherant(true), setAdhToDelete(item)}} 
                                                whileTap={{scale: 0.95}}
                                                className={`border  border-red-100 ${daysRemaining <= 0 ? ' bg-red-300' : ' bg-red-600 cursor-pointer'} p-1 rounded-sm`}
                                            >
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
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-3xl flex items-center">
                            Gestion Abonnements : 
                            <span className="text-red-600 bg-red-100 text-sm py-1 px-3 rounded-full mx-3">{totalAbExpirer} expiré{totalAbExpirer > 1 ? 's' : ''}</span>
                        </h1>
                        <p className="text-gray-400 text-[18px]">Consultez et gérez vos abonnements</p>
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

                        <div className="flex items-center gap-2">
                        <motion.button 
                            whileTap={{scale: 0.95}}
                            onClick={()=>{setAbonnementTab('tous')}}
                            className={`${abonnementTab === 'tous' ? 'text-orange-600 bg-orange-100 border-orange-500' : 'bg-gray-200 border border-gray-400 text-black'} font-bold  text-sm  gap-2 py-2 px-4 rounded-lg border   cursor-pointer transition-colors duration-200`}>
                            
                            Tous
                        </motion.button>

                        <motion.button 
                            whileTap={{scale: 0.95}}
                            onClick={()=>{setAbonnementTab('actifs')}}
                            
                            className={`${abonnementTab === 'actifs' ? 'text-orange-600 bg-orange-100 border-orange-500' : 'bg-gray-200 border border-gray-400 text-black'} font-bold  text-sm  gap-2 py-2 px-4 rounded-lg border   cursor-pointer transition-colors duration-200`}>
                            
                            Actifs
                        </motion.button>

                        <motion.button 
                            whileTap={{scale: 0.95}}
                            onClick={()=>{setAbonnementTab('expirés')}}
                            
                            className={`${abonnementTab === 'expirés' ? 'text-orange-600 bg-orange-100 border-orange-500' : 'bg-gray-200 border border-gray-400 text-black'} font-bold  text-sm  gap-2 py-2 px-4 rounded-lg border   cursor-pointer transition-colors duration-200`}>
                            
                            Expirés
                        </motion.button>
                        </div>
                    </div>

                    {/* A revoir avec les vraies donnees */}
                    <div className="bg-white my-8 rounded-lg ">
                        <table className=" w-full text-center  " style={{ borderCollapse: "collapse" }}>
                            <thead className="uppercase text-xs text-gray-400 bg-gray-200/70">
                                <tr >
                                    <th className=" p-3 text-left">Nom de l'adhérant</th>
                                    <th className=" p-3">Date de début</th>
                                    <th className=" p-3">Date de fin</th>
                                    <th className=" p-3">Statut</th>
                                    <th className=" p-3">Actions</th>
                                </tr>
                            </thead>

                                <tbody className="">
                                    {loadingAdh ? (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center">
                                                <Loader2 className="mx-auto animate-spin" />
                                            </td>
                                        </tr>
                                    ): adherentsFiltres.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-sm text-gray-500">
                                                {search.trim() ? "Aucun résultat trouvé pour votre recherche" : "Aucun abonnement enregistré"}
                                            </td>
                                        </tr>
                                    ): adherentsFiltres.map(item => (
                                        <tr key={item.id} className="text-sm p-2 border-b border-gray-200">
                                            
                                            <td className="flex items-center  font-bold  gap-2 py-5 px-3">
                                            <span className="rounded-full bg-gray-200 flex items-center p-2"><User className="h-4 w-4"/></span>
                                            {`${item.name} ${item.prenom}` || item.username }

                                            </td>
                                            <td className=" px-3 py-5">{item.dernier_abonnement !== null ? item.dernier_abonnement.debut : '-'}</td>
                                            <td className=" px-3 py-5">{item.dernier_abonnement !== null ? item.dernier_abonnement.fin : '-'}</td>
                                            <td className=" px-3 ">
                                                <span className={`${item.dernier_abonnement.actif ? 'bg-green-200 ' : 'bg-red-200'} font-semibold py-1 px-2 rounded-xl`}>
                                                    {item.dernier_abonnement?.actif ? 'actif' : 'expiré'}
                                                </span>
                                            </td>
                                            
                                            <td className="flex justify-center py-5 items-center gap-2 px-3">
                                                
                                                {!item.dernier_abonnement?.actif ? (
                                                    <div className="flex items-center gap-2">
                                                    {item.dernier_abonnement?.date_suspension === null ?(
                                                        <motion.button
                                                            type="button"
                                                            onClick={()=>{setReabonnerModal(true), setReabonner(item)}}
                                                            whileTap={{scale: 0.95}}
                                                            disabled={daysRemaining <= 0}
                                                            className={`border ${daysRemaining <= 0 ? 'border-blue-300 bg-blue-300' : 'bg-blue-500 hover:bg-transparent hover:text-black border-blue-500'}  transition-colors duration-200  py-1 px-3 rounded-lg  text-white font-bold `}>
                                                            Reabonner
                                                        </motion.button>
                                                    ):(
                                                        <motion.button
                                                            type="button"
                                                            disabled={daysRemaining <= 0}
                                                            onClick={()=>{setReactiverModal(true), setReact(item)}}
                                                            className={`border  border-green-300 py-1 px-3 rounded-lg  text-white font-bold hover:bg-transparent hover:text-black transition-colors duration-200 bg-green-500`}>
                                                            Réactiver
                                                        </motion.button>
                                                    )}
                                                    </div>
                                                ): (

                                                    
                                                        <motion.button
                                                            type="button"
                                                            disabled={daysRemaining <= 0}
                                                            onClick={()=>{setSuspendreModal(true), setSuspen(item)}}
                                                            className={` border  border-red-300 py-1 px-3 rounded-lg  text-white font-bold hover:bg-transparent hover:text-black transition-colors duration-200 bg-red-500`}>
                                                            Suspendre
                                                        </motion.button>

                                                        
                                                    
                                                )}
                                                
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

            {activeTab === 'coach' &&(
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    <p>Coach</p>
                </div>
            )}

            {activeTab === 'cours' &&(
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    <p>Cours</p>
                </div>
            )}

            {activeTab === 'finances' &&(
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    <p>Finances</p>
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="col-span-4 px-8 py-3 my-5 overflow-y-auto">
                    <div className="flex flex-col gap-2 ">
                        <h1 className="font-bold text-3xl">Paramètres Généraux</h1>
                        <p className="text-gray-400 text-[18px]">Gérer les informations de votre salle, votre profil, ainsi que la tarification</p>
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
                                            className="my-3 cursor-pointer bg-gray-200 border-gray-200 text-black/80 border font-semibold py-2 px-4 rounded-lg"
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
                                                className="my-3 cursor-pointer bg-gray-200 border-gray-200 text-black/80 border font-semibold py-2 px-4 rounded-lg"
                                            >
                                                Annuler
                                            </motion.button>
                                            <motion.button 
                                                type="submit"
                                                whileTap={{scale:0.95}}
                                                disabled={updateLoading || !nom_salle.trim() || !pays_salle.trim() || !region.trim()}
                                                className={`my-3 ${!nom_salle.trim() || !pays_salle.trim() || !region.trim() ? 'bg-orange-200 border-orange-200 ' : 'bg-orange-500 cursor-pointer border-orange-500 '} border text-white font-semibold py-2 px-4 rounded-lg`}
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

                        <div className="border border-gray-300 rounded-lg p-4 my-5">
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
                                            <span className="font-bold">Ajouter votre logo</span>
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
                                    ) : infosSalle?.cachet_signer ? (
                                            <div className="relative w-full h-full">
                                                <img src={infosSalle.cachet_signer} className="w-full h-full object-cover" />
                                                <div className="absolute border w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">
                                                    
                                                </div>
                                            </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <div className="flex flex-col items-center">
                                            <PlusSquare size={50} />
                                            <span className="font-bold">Ajoutervotre signature/cachet</span>
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
                                            onClick={(e)=>{infosSalle?.cachet_signer ? handlePostSign(e, 'PUT') : handlePostSign(e, 'POST')}}
                                            disabled={signLoading || signEditLoading }
                                            className="px-4 py-1 bg-blue-500 text-white rounded"
                                        >
                                            {signLoading || signEditLoading ? <Loader2 className="animate-spin h-5 w-5"/> : "Enregistrer"}

                                        </button>


                                    </div>
                                )}

                                {infosSalle?.cachet_signer && (
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

                    <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-3">
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
                                                className={`my-3 ${showPasswordChange ? 'bg-gray-200  text-gray-400 border-gray-200' : 'cursor-pointer bg-gray-300 border-gray-200 text-black/80'} border font-semibold py-2 px-4 rounded-lg`}
                                            >
                                                Modifier
                                            </motion.button>
                                        </div>
                                        {showButtonProfil && (
                                            <div className={`${persoSuccess ? setShowButtonProfil(false) : 'block flex items-center gap-2'}`}>
                                                <motion.button
                                                    type="button" 
                                                    whileTap={{scale:0.95}}
                                                    onClick={()=>{setShowButtonProfil(false), setNomPerso(''), setPrenomPerso(''), setTelPerso('')}}
                                                    className="my-3 cursor-pointer bg-gray-200 border-gray-200 text-black/80 border font-semibold py-2 px-4 rounded-lg"
                                                >
                                                    Annuler
                                                </motion.button>
                                                <motion.button
                                                    type="submit"
                                                    // onClick={()=>{setActionProfil('PUT_PROFIL')}} 
                                                    whileTap={{scale:0.95}}
                                                    disabled={persoLoading || !nomPerso.trim() || !prenomPerso.trim() || !telPerso.trim()}
                                                    className={`my-3 ${!nomPerso.trim() || !prenomPerso.trim() || !telPerso.trim() ? 'bg-orange-200 border-orange-200 ' : 'bg-orange-500 cursor-pointer border-orange-500 '} border text-white font-semibold py-2 px-4 rounded-lg`}
                                                >
                                                    {persoLoading ? (
                                                        <Loader2 className="h-5 w-5 animate-spin"/>
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

                        <div className="bg-white border border-gray-300 rounded-lg p-4 my-5 overflow-y-auto h-113">
                            <p className="font-semibold text-xl">Historique de connexion</p>
                            {historyLoading ? (
                                <Loader2 className="animate-spin flex items-center justify-center"/>
                            ): historyError ?(
                                <p className="text-red-500 text-sm flex items-center justify-center">{dataHistory.error.message}</p>
                            ):totalHistory === 0 ?(
                                <p>Pas d'historique de connexion </p>
                            ):dataHistory.map((item, index) => (
                                <div key={index} className="my-3">
                                    <p className="text-sm bg-orange-100">Date : {item?.date || 'N/A'}, il y'a {item?.depuis || 'N/A'}</p>
                                </div>
                            ))}
                        </div>
                    </div>

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

                    <div className="p-4">
                        <div>
                            <p className="text-xl font-semibold">Support</p>
                            <p><span className="font-semibold">Adresse e-mail :</span> gymplus2025.gym@gmail.com</p>
                        </div>
                    </div>
                </div>
            )}


            {misNiveauSuccess && (
                <motion.div 
                     initial = {{opacity: 0, x: -80}}
                    animate = {{opacity: 1, x: 0}}
                    transition={{duration: 0.2}}
                    className="bg-white shadow-[0_0_30px_rgba(0,255,0,0.5)] border border-green-500 rounded-lg z-20 px-10  flex flex-col justify-center gap-4 text-center absolute bottom-22 left-5 w-84 h-12 ">
                    <p className="text-sm text-green-500 font-semibold">Mise à niveau réussie</p>
                   
                </motion.div>
            )}

            {miseNiveauError && (
                <motion.div 
                      initial = {{opacity: 0, x: -80}}
                    animate = {{opacity: 1, x: 0}}
                    transition={{duration: 0.2}}
                    className="bg-white shadow-[0_0_30px_rgba(255,0,0,0.5)] border border-red-500 rounded-lg z-20 px-10  flex flex-col justify-center gap-4 text-center absolute bottom-8 left-5 w-84 h-12 ">
                    <p className="text-sm text-red-500 font-semibold">{misNiveau.error.message}</p>
                   
                </motion.div>
            )}

            {modalLogout && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur flex items-center justify-center">
                    <motion.div 
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                    className="bg-white shadow-[0px_0px_30px_rgba(255,0,0,0.5)] rounded-sm p-3 ">
                        <div className="font-bold text-red-600 flex items-center gap-2 text-xl uppercase">
                            <AlertOctagon className="text-red-600 h-8 w-8" />
                            Êtes-vous sûr ?
                        </div>

                        <div className="my-5">
                            <p className="text-[16px] text-black/80">Vous êtes sur le point de vous
                                déconnecter. <br />Si cela est volontaire, veuillez le confirmer.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 justify-end py-3 ">
                            <motion.button
                                whileTap={{scale:0.95}}
                                onClick={()=>setModalLogout(false)}
                                className="px-2 py-1 transition-colors duration-200 border border-gray-400/50 bg-gray-400/50 font-semibold"
                               
                            >Non
                            </motion.button>
                            <motion.button
                                whileTap={{scale:0.95}}
                                onClick={logout}
                                className="px-2 py-1 transition-colors duration-200 border text-white bg-red-600 border-red-600 font-semibold"
                            >
                                Oui
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
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

            {modalSupAdherant && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex items-center justify-center">
                    <motion.div 
                    initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                    className="bg-white py-3 px-4">
                        <div className=" text-red-500 mb-5 font-bold text-xl flex items-center gap-2">
                            <AlertTriangle size={40} />
                            <p>Voulez-vous vraiment supprimer <br />l'adhérant <span className="text-black">{adhToDelete.name} {adhToDelete.prenom}</span> ?</p>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={()=>{setModalSupAdherant(false)}}
                                className="border py-1 px-3 text-sm font-semibold"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                onClick={(e)=>{handleDeleteAdh(e, adhToDelete)}}
                                disabled={loadingSupAdh}
                                className="border py-1 px-3 text-sm bg-red-500 text-white font-semibold hover:bg-transparent hover:text-black transition-colors duration-200"
                            >
                                {loadingSupAdh ? <Loader2 className="animate-spin h-5 w-5 text-red"/> : 'Supprimer'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {suspendreModal &&(
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex items-center justify-center">
                    <motion.div 
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                    className="bg-white py-3 px-4">
                        <div className="text-red-500 mb-5 font-bold text-xl flex items-center gap-2">
                            <AlertTriangle size={40} />
                            <p>Voulez-vous vraiment suspendre <br />l'adherant <span className="text-black">{suspen?.name} {suspen?.prenom}</span> ?</p>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={()=>{setSuspendreModal(false)}}
                                className="border py-1 px-3 text-sm font-semibold"
                            >
                                Non
                            </button>
                            <button
                                type="submit"
                                onClick={(e)=>{handleSuspendre(e, suspen)}}
                                disabled={suspLoading}
                                className="border py-1 px-3 text-sm bg-red-500 text-white font-semibold hover:bg-transparent hover:text-black transition-colors duration-200"
                            >
                                {suspLoading ? <Loader2 className="animate-spin h-5 w-5 text-red"/> : 'Oui'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {reactiverModal &&(
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex items-center justify-center">
                    <motion.div
                    initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                    className="bg-white py-3 px-4">
                        <div className="text-green-500 mb-5 font-bold text-xl flex items-center gap-2">
                            
                            <p>Annuler la suspension de <br />l'adherant <span className="text-black">{react?.username}</span> ?</p>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={()=>{setReactiverModal(false)}}
                                className="border py-1 px-3 text-sm font-semibold"
                            >
                                Non
                            </button>
                            <button
                                type="submit"
                                onClick={(e)=>{handleReactiver(e, react)}}
                                disabled={reactLoading}
                                className="border py-1 px-3 text-sm bg-green-500 text-white font-semibold hover:bg-transparent hover:text-black transition-colors duration-200"
                            >
                                {reactLoading ? <Loader2 className="animate-spin h-5 w-5 text-red"/> : 'Oui'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {modalUpAdherant && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    {/* <p>{adhToUp.name}</p> */}
                    <motion.div
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                    >
                        <form className=" bg-white py-5 px-8 rounded-lg shadow-lg">
                            <div className="mb-10">
                                <div className="flex items-center gap-2 text-xl font-bold mb-5">
                                    <User className="h-10 w-10 border rounded-full bg-orange-500 text-white p-2"/>
                                    Informations personnelles de l'adhérant
                                </div>
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Nom </label>
                                    <Input 
                                        type={'text'}
                                        value={adhToUp?.name}
                                        onChange={(e)=>{setAdhToUp({ ...adhToUp, name: e.target.value }), updateAdh.reset()}}
                                        className={'border focus:outline-none  border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={null}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Prénom </label>
                                    <Input 
                                        type={'text'}
                                        value={adhToUp?.prenom}
                                        onChange={(e)=>{setAdhToUp({ ...adhToUp, prenom: e.target.value }), updateAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={null}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Adresse e-mail </label>
                                    <Input 
                                        type={'email'}
                                        value={adhToUp?.email}
                                        onChange={(e)=>{setAdhToUp({ ...adhToUp, email: e.target.value }), updateAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={null}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Numéro de téléphone </label>
                                    <Input 
                                        type={'tel'}
                                        value={adhToUp?.telephone}
                                        onChange={(e)=>{setAdhToUp({ ...adhToUp, telephone: e.target.value }), updateAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={null}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

                                {errorUpdateAdh && (
                                    <p className="text-red-500 text-sm">{updateAdh.error.message}</p>
                                )}
                            </div>
                            
                            <div className=" flex justify-end items-center gap-2">
                                <button
                                type="button"
                                    onClick={()=>{setModalUpAdherant(false)}}
                                    className="border py-1 px-3 border-gray-400 bg-gray-200 font-semibold hover:bg-transparent transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                type="submit"
                                onClick={(e)=>{updateAdhUp(e, adhToUp)}}
                                disabled={loadingUpdateAdh}
                                    className="border py-1 px-3 border-orange-400 bg-orange-500 hover:text-black text-white font-semibold hover:bg-transparent transition-colors duration-200"
                                >
                                    {loadingUpdateAdh ?(
                                        <Loader2 className="animate-spin"/>
                                    ):(
                                        'Modifier'
                                    )}
                                    
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {reabonnerModal && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    {/* <p>{adhToUp.name}</p> */}
                    <motion.div
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                    >
                        <form className=" bg-white py-5 px-8 rounded-lg shadow-lg">
                            <div className="mb-10">
                                <div className="flex items-center gap-2 text-xl font-bold mb-5">
                                    <WalletCards className="h-10 w-10 border rounded-full bg-orange-500 text-white p-2"/>
                                    Renouvellement de l'abonnement
                                </div>
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Adresse e-mail </label>
                                    <Input 
                                        type={'email'}
                                        value={reabonner?.email}
                                        onChange={(e)=>{setReabonner({ ...reabonner, email: e.target.value }), reabAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={null}
                                        disabled={false}
                                        hidden={false}
                                        pattern={null}
                                        ref={null}
                                        checked={null}
                                    />
                                </div>

                                {/* <div className="grid grid-cols-2 gap-10"> */}
                                    <div className="flex-col flex gap-2 ">
                                        <label className="font-bold">Abonnement</label>
                                    

                                        <select
                                            value={reabonner?.plan}
                                            onChange={(e)=>{setReabonner({ ...reabonner, plan: e.target.value }), reabAdh.reset()}}
                                            
                                            className="border-4 border-gray-300 p-2 border-dotted text-sm"
                                            >
                                            <option value="">-- Choisir --</option>
                                            <option value="mensuel">Mensuel</option>
                                            <option value="trimestriel">Trimestriel</option>
                                            <option value="annuel">Annuel</option>
                                        </select>
                                    

                                    
                                    </div>

                                

                                {reabError && (
                                    <p className="text-red-500 text-sm">{reabAdh.error.message}</p>
                                )}
                            </div>
                            
                            <div className=" flex justify-end items-center gap-2">
                                <button
                                    type="button"
                                    onClick={()=>{setReabonnerModal(false)}}
                                    className="border py-1 px-3 border-gray-400 bg-gray-200 font-semibold hover:bg-transparent transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e)=>{handleReabonner(e, reabonner)}}
                                    disabled={reabLoading}
                                    className="border py-1 px-3 border-orange-400 bg-orange-500 hover:text-black text-white font-semibold hover:bg-transparent transition-colors duration-200"
                                >
                                    {reabLoading ?(
                                        <Loader2 className="animate-spin"/>
                                    ):(
                                        'Confirmer'
                                    )}
                                    
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {(successSupAdh || reactSuccess || suspSuccess || successUpdateAdh || reabSuccess) && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    <div className="w-150 h-300">
                    <img src={checkvideo} alt="gif" 
                        className="w-full h-auto object-cover"
                    />
                    </div>
                </div>
            )}

            {errorSupAdh && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    <motion.div 
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                    className="bg-white flex items-center gap-2 py-1 px-3 font-bold text-red-500">
                        <XCircle className="text-red-500 h-10 w-10" />
                        <p className="text-xl">{supAdh.error.message}</p>
                    </motion.div>
                </div>
            )}

            {suspError && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    <motion.div 
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                    className="bg-white flex items-center gap-2 py-1 px-3 font-bold text-red-500">
                        <XCircle className="text-red-500 h-10 w-10" />
                        <p className="text-xl">{suspAdh.error.message}</p>
                    </motion.div>
                </div>
            )}

            {reactError && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    <motion.div 
                    initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                    className="bg-white flex items-center gap-2 py-1 px-3 font-bold text-red-500">
                        <XCircle className="text-red-500 h-10 w-10" />
                        <p className="text-xl">{reactAdh.error.message}</p>
                    </motion.div>
                </div>
            )}

            {detailAdherant && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur items-center h-screen justify-center flex ">
                    <motion.div 
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                        className=" relative flex flex-col gap-5 p-8 w-100  bg-white">
                        <h1 className="text-xl font-bold">Détails de l'adhérant</h1>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-400">Informations personnelles</h2>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Nom :</p>    
                                <p>{adhToUp?.name}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Prénom :</p>   
                                <p>{adhToUp?.prenom}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Adresse e-mail :</p>   
                                <p>{adhToUp?.email}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Numéro de téléphone :</p>  
                                <p>{adhToUp?.telephone}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-400">Informations sur l'abonnement</h2>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Forfait choisie :</p> 
                                <p>{adhToUp?.dernier_abonnement?.plan}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Montant payé :</p> 
                                <p>{adhToUp?.dernier_abonnement?.montant}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-400">Informations sur le délai de l'abonnement</h2>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Abonné le</p> 
                                <p>{formatDate(adhToUp?.dernier_abonnement?.debut)}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Prend fin le</p> 
                                <p>{formatDate(adhToUp?.dernier_abonnement?.fin)}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-400">Informations d'inscription</h2>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Créé le</p> 
                                <p>{formatDate(adhToUp?.created_at)}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="font-semibold">Mis à jour</p> 
                                <p>{formatDate(adhToUp?.updated_at)}</p>
                            </div>
                        </div>

                        {adhToUp?.dernier_abonnement?.actif ? (
                            <div className="flex items-center bg-green-200 border border-green-200 p-1 rounded-lg justify-center gap-1">
                                <Circle className="text-green-500 bg-green-500 animate-pulse rounded-full"/>
                                <p className="font-semibold text-green-500">Abonnement en cours</p>
                            </div>
                        ):(
                            <div className="flex items-center bg-red-200 border border-red-200 p-1 rounded-lg justify-center gap-1">
                                <Circle className="text-red-500 bg-red-500 animate-pulse rounded-full"/>
                                <p className="text-red-500 font-semibold">Abonnement expiré</p>
                            </div>
                        )}
                    

                        <div className="flex absolute top-0 right-0  items-center justify-center">
                            <motion.button
                            whileTap={{scale:0.95}}
                                type="button"
                                onClick={()=>{setDetailAdherant(false)}}
                            >
                                <X className="text-gray-400 hover:text-gray-500 transition-colors duration-200 h-8 w-8"/>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}