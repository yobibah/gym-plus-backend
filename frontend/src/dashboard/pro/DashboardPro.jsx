import { AlertOctagon, AlertTriangle, AlertTriangleIcon, ArrowDownUpIcon, ArrowLeft, ArrowRight, Bell, Calendar1, CalendarOff, Check, CheckCircle, CheckCircle2, Circle, Clock, Download, Edit, Euro, Eye, File, Info, LayoutDashboard, Loader2, LogOut, NotebookPen, Pencil, Plus, PlusSquare, Save, Search, Settings, SquarePlus, Star, Timer, Trash, Trash2, UploadCloud, User, UserCog, UserPlus, Users, Users2, WalletCards, X, XCircle } from "lucide-react";
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
import nodata from '../../assets/images/nodata.png'
import { Suspendre } from "../../api/dashboard/standard/abonnements/suspendre";
import { Reactiver } from "../../api/dashboard/pro/abonnements/reactiver";
import { ExportCsv } from "../../api/dashboard/pro/adherants/export";
import { NombreCoach } from "../../api/dashboard/pro/coachs/nombreCoach";
import coach from '../../assets/images/coach.png'
import { AjouterCoach } from "../../api/dashboard/pro/coachs/ajouterCoach";
import { DeleteCoach } from "../../api/dashboard/pro/coachs/deleteCoach";
import { UpdateCoach } from "../../api/dashboard/pro/coachs/modifierCoach";
import { AjouterCours } from "../../api/dashboard/pro/cours/ajouterCours";
import { DeleteCours } from "../../api/dashboard/pro/cours/supprimerCours";
import { UpdateCours } from "../../api/dashboard/pro/cours/modifierCours";
import { MesCours } from "../../api/dashboard/pro/cours/mesCours";
import course from '../../assets/images/cours.png'
import adhh from '../../assets/images/adhh.png'
import calendarc from '../../assets/images/calendarc.png'
import support from '../../assets/images/support.png'
import abonnement from '../../assets/images/abonnement.png'
import { Recette } from "../../api/dashboard/pro/tableau/recette";
import { ProgrammerCours } from "../../api/dashboard/pro/cours/programmerCours";
import { CoursProgrammer } from "../../api/dashboard/pro/cours/coursProgrammer";
import ResponseCoach from "../../utils/coach/response.api";
import ResponseAdherant from "../../utils/adherant/response.api";
import ResponseAbonnement from "../../utils/abonnement/response.api";
import ResponseCours from "../../utils/cours/response.api";
import ResponseLogo from "../../utils/logo/response.api";
import ResponseCachet from "../../utils/cachet/response.api";
import ResponseTarif from "../../utils/tarif/response.api";
import ResponseInfoPerso from "../../utils/infosPerso/response.api";
import ResponseInfoSalle from "../../utils/infosSalle/response.api";
import ResponseError from "../../utils/error.response";
import ModalComponent from "../../components/ui/ModalComponent";
import ModalLogout from "../../components/ui/Modal";
import ImageComponent from "../../components/ui/image";
import SkeletonCours from "../../components/ui/SkeletonCours";
import SkeletonAdh from "../../components/ui/SkeletonAdh";
import SkeletonAbonnement from "../../components/ui/SkeletonAbonnemet";
import SkeletonCoach from "../../components/ui/SkeletonCoach";
import { CreateActivity } from "../../api/dashboard/pro/params/createActivity";
import ResponseActivity from "../../utils/activity/response.api";
import { getActivity } from "../../api/dashboard/pro/params/getActivity";
import { documentUrl } from "../../../env";
import { DeleteActivity } from "../../api/dashboard/pro/params/deleteActivity";
import SkeletonActivity from "../../components/ui/SkeletonActivity";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { UpdateActivity } from "../../api/dashboard/pro/params/updateActivity";
import { SendActivity } from "../../api/dashboard/pro/params/sendActivity";
import SkeletonListeProgram from "../../components/ui/SkeletonListeProgram";
import ResponseExportData from "../../utils/exportData/response.api";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";
import { SwitchStatut } from "../../api/dashboard/pro/params/switch-activity";

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

    const [modalCoach, setModalCoach] = useState(false)
    const[nomCoach, setNomCoach] = useState('')
    const[prenomCoach, setPrenomCoach] = useState('')
    const[telCoach, setTelCoach] = useState('')
    const[skillsCoach, setSkillsCoach] = useState([])
    const [skills, setSkills] = useState('')

    const [coachOuvert, setCoachOuvert] = useState(null)
    const [deleteCoach, setDeleteCoach] = useState(null)
    const [coachSup, setCoachSup] = useState(null)
    const [selectCoach, setSelectCoach] = useState(null)
    const [coachEdit, setCoachEdit] = useState(null)

    const [nomCours, setNomCours] = useState('')
    const [niveaux, setNiveaux] = useState(null)
    const [modalSupCours, setModalSupCours] = useState(false)
    const [modalUpCours, setModalUpCours] = useState(false)
    const [coursToDelete, setCoursToDelete] = useState(null)
    const [coursToUp, setCoursToUp] = useState(null)
    const [coursTab, setCoursTab] = useState('tous')
    const [pageCours, setPageCours] = useState(1)
    const [modalAddCours, setModalAddCours] = useState(false)

    const dateChoice = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    const [jours, setJours] = useState([])
    const [horaire, setHoraire] = useState([])
    const [heure, setHeure] = useState(null)
    const [heureFin, setHeureFin] = useState(null)
    const [selectAdherant, setSelectAdherant] = useState(null)
    const [adherantChoice, setAdherantChoice] = useState([])
    const [adherantChoiceId, setAdherantChoiceId] = useState([])
    const [program, setProgram] = useState(null)
    const [modalProgram, setModalProgram] = useState(false)
    const [modalSelect, setModalSelect] = useState(false)

    const [modalSelectCoach, setModalSelectCoach] = useState(false)
    const [coachChoice, setCoachChoice] = useState(null)
    const [coachChoiceId, setCoachChoiceId] = useState(null)

    const [paramsTab, setParamstab] = useState('salle')
    const [historyP, setHistoryP] = useState(false)

    const [sideBar, setSideBar] = useState(false)
    const [filtreJour, setFiltreJour] = useState('')

    const [images_activte, setImg] = useState(null)
    const [previewActivity, setPreviewActivity] = useState(null)
    const activityInputRef =useRef(null)
    const [nom_activite, setNomActivite] = useState('')
    const [descriptions, setDescription] = useState('')
    const [date_activite, setDateActivite] = useState('')
    const [heure_activite, setHeureActivite] = useState('')
    const [status, setStatus] = useState(null)

    const [modalSupActivity, setModalSupActivity] = useState(false)
    const [activityToDelete, setActivityToDelete] = useState(null)
    const [activityToUp, setActivityToUp] = useState(null)
    const [modalUpActivity, setModalUpActivity] = useState(false)

    const [activityTab, setActivityTab] = useState('tous')
    const [detailActivity,setDetailActivity] = useState(false)
    const [modalImage,setModalImage] = useState(false)
    const [showImage,setShowImage] = useState(null)
    const [previewActivityUp, setPreviewActivityUp] = useState(null)
    const activityUpInputRef =useRef(null)

    const [apercu, setApercu] = useState('mois_actuel')
    const [selectActivity, setSelectActivity] = useState(null)
    const [showSwhitch, setShowSwhitch] = useState(false)


    const navigate = useNavigate()
    const token = getToken()

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

    function handleImgActivity(e){
        const imgSelection = e.target.files[0]

        if(!imgSelection) return

        setImg(imgSelection)
        
        setPreviewActivity(URL.createObjectURL(imgSelection))
    }

    function handleImgActivityUp(e){
        const imgSelection = e.target.files[0]

        if(!imgSelection) return

        setActivityToUp(prev => ({
            ...prev,
            imageFile: imgSelection 
        }))
        
        setPreviewActivityUp(URL.createObjectURL(imgSelection))
    }



    function ActiveTab(){

         if(activeTab === 'dashboard'){
            setActiveTab('dashboard')
            setView('part-dashboard')
            setShowAdd(false)
            setCoachOuvert(null)
            setDeleteCoach(null)
            setHistoryP(false)
            return
        }

        if(activeTab === 'adherant'){
            setActiveTab('adherant')
            setNotifModal(false)
            setCoachOuvert(null)
            setDeleteCoach(null)
            setHistoryP(false)
            return
        }

        if(activeTab === 'abonnement'){
            setActiveTab('abonnement')
            setShowAdd(false)
            setNotifModal(false)
            setCoachOuvert(null)
            setDeleteCoach(null)
            setAbonnementTab('tous')
            setHistoryP(false)
            return
        }

        if(activeTab === 'coach'){
            setActiveTab('coach')
            setShowAdd(false)
            setNotifModal(false)
            setHistoryP(false)
            return
        }

        if(activeTab === 'cours'){
            setActiveTab('cours')
            setShowAdd(false)
            setNotifModal(false)
            setCoachOuvert(null)
            setDeleteCoach(null)
            setCoursTab('tous')
            setHistoryP(false)
            return
        }

        if(activeTab === 'settings'){
            setActiveTab('settings')
            paramTab()
            setShowAdd(false)
            setNotifModal(false)
            setCoachOuvert(null)
            setDeleteCoach(null)
            return
        }
    }

    function paramTab(){
        if(paramsTab === 'salle'){
            setParamstab('salle')
            if(historyP){
                setHistoryP(false)
            }
            return
        }

        if(paramsTab === 'perso'){
            setParamstab('perso')
            if(historyP){
                setHistoryP(false)
            }
            return
        }

        if(paramsTab === 'visuel'){
            setParamstab('visuel')
            if(historyP){
                setHistoryP(false)
            }
            return
        }

        if(paramsTab === 'tarif'){
            setParamstab('tarif')
            if(historyP){
                setHistoryP(false)
            }
            return
        }

        if(paramsTab === 'activity'){
            setParamstab('activity')
            setActivityTab('tous')
            setStatus('publie')
            if(historyP){
                setHistoryP(false)
            }
            return
        }


        if(paramsTab === 'support'){
            setParamstab('support')
            if(historyP){
                setHistoryP(false)
            }
            return
        }
    }

    useEffect(()=>{
        ActiveTab()
        paramTab()
    }, [activeTab, paramsTab])

    const nbrAdh = useQuery({
        queryKey : ['nbr_adherant'],
        queryFn : FetchNombreAdherant,
        staleTime: 1000 * 60 * 30
    })
    const nbrAdherants = Number(nbrAdh.data?.nbr_adherant)
    const loadingNbrAdherant = nbrAdh.isPending
    const errorNbrAdherant = nbrAdh.isError


    const nbrActif = useQuery({
        queryKey : ['nbr_actif'],
        queryFn : FetchNombreActif,
        staleTime: 1000 * 60 * 30
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
            queryClient.invalidateQueries(['mes-adherant'])

             setTimeout(()=>{
                addAdh.reset()
            }, 4000)
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
        keepPreviousData: true,
        staleTime: 1000 * 60 * 30
    })
    const dataAdh = mesAdh.data?.adherents?.data || []
    const loadingAdh = mesAdh.isPending
    const errorAdh = mesAdh.isError
    const successAdh = mesAdh.isSuccess


    const AdherantProgram = useMemo(()=>{
        if (!dataAdh || !Array.isArray(dataAdh)) return []

        let result = dataAdh

        if(modalSelect){
            result = result.filter(item => item.dernier_abonnement?.actif)
        }

        return result
    }, [modalSelect, dataAdh])


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
            result = result.filter(item => !item.dernier_abonnement?.actif )
        }

        if (abonnementTab === 'suspendu') {
            result = result.filter(item => item.dernier_abonnement?.date_suspension !== null)
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
            }, 4000)
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
            }, 4000)
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
            }, 4000)
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
        queryFn : MesInfos,
        staleTime: 1000 * 60 * 30
    })
    const infosSalle = infos?.data?.user?.salle
    const infosUser = infos?.data?.user
    const infosLoading = infos.isPending
    const infoError = infos.isError



    const dataExport = useMutation({
        mutationFn : ({ gerantId }) => ExportCsv({ gerantId }),
        onSuccess: ((blob)=>{
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'adherants_export.xlsx'
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);

            setTimeout(()=>{
                dataExport.reset()
            }, 4000)
        }),
        onError : (()=>{

            setTimeout(()=>{
                dataExport.reset()
            }, 4000)
        })
    })

    const dataExportLoading = dataExport.isPending
    const dataExportSuccess = dataExport.isSuccess
    const dataExportError = dataExport.isError




    async function handleExport(){
        const gerantId = infos?.data?.user?.id
        if(!gerantId) return

        dataExport.mutate({gerantId})
    }



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
            }, 4000)
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
            }, 4000)
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
            }, 4000)
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
            }, 4000)
        })
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
            }, 4000)
        })
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
            }, 4000)
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
                }, 4000)
            })
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
                }, 4000)
            })
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
                }, 4000)
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
            setTimeout(()=>{
                supAdh.reset()

            }, 4000)

            supAdhQuery.invalidateQueries(['mes-adherant'])
        }),

        onError : (()=>{
            setModalSupAdherant(false)
            setTimeout(()=>{
                supAdh.reset()

            }, 4000)
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

            }, 4000)

            adhUpQuery.invalidateQueries(['mes-adherant'])

        }),
        onError: (()=>{
            setTimeout(()=>{
                adhToUp.reset()

            }, 4000)
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
            }, 4000)

            reabQuery.invalidateQueries(['nbr_actif'])
            suspQuery.invalidateQueries(['mes-adherant'])
            suspQuery.invalidateQueries(['expire-bientot'])
            reabQuery.invalidateQueries(['abonner-expirer'])
        }),

        onError : (()=>{

            setTimeout(()=>{
                reabAdh.reset()
            }, 4000)
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
            }, 4000)

            suspQuery.invalidateQueries(['nbr_actif'])
            suspQuery.invalidateQueries(['mes-adherant'])
            suspQuery.invalidateQueries(['expire-bientot'])
            suspQuery.invalidateQueries(['abonner-expirer'])
        }),

        onError : (()=>{

            setTimeout(()=>{
                suspAdh.reset()
            }, 4000)
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
            }, 4000)

            reactQuery.invalidateQueries(['nbr_actif'])
            suspQuery.invalidateQueries(['mes-adherant'])
            suspQuery.invalidateQueries(['expire-bientot'])
            reactQuery.invalidateQueries(['abonner-expirer'])
        }),

        onError : (()=>{

            setTimeout(()=>{
                reactAdh.reset()
            }, 4000)
        })
    })
    const reactLoading = reactAdh.isPending
    const reactSuccess = reactAdh.isSuccess
    const reactError = reactAdh.isError

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
            }, 4000)
        }),

        onError : (()=>{
            setTimeout(()=>{
                misNiveau.reset()
            }, 4000)
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
            queryClient.removeQueries(['history']),
            queryClient.removeQueries(['mes-coach']),
            queryClient.removeQueries(['mes-cours']),
            queryClient.removeQueries(['mes-activites'])

        )

    }


    const mesCoach = useQuery({
        queryKey: ['mes-coach'],
        queryFn: NombreCoach,
        staleTime: 1000 * 60 * 30
    })
    const mesCoachLoad = mesCoach.isPending
    const mesCoachError = mesCoach.isError
    const mes_coach = mesCoach.data?.coach || []


    const filterCoach = useMemo(() => {
        if (!search.trim()) return mes_coach

        const s = search.toLowerCase()

        return mes_coach.filter(item =>
            item?.nom?.toLowerCase().includes(s) ||
            item?.prenom?.toLowerCase().includes(s) ||
            item?.telephone?.includes(s)
        )
    }, [mes_coach, search])



    const supCoachQuery = useQueryClient()
    const supCoach = useMutation({
        mutationFn : DeleteCoach,
        onSuccess : (()=>{
            setDeleteCoach(null)
            setTimeout(()=>{
                supCoach.reset()

            }, 4000)

            supCoachQuery.invalidateQueries(['mes-coach'])
        }),

        onError : (()=>{
            setDeleteCoach(null)
            setTimeout(()=>{
                supCoach.reset()

            }, 4000)
        })
    })

    const loadingSupCoach = supCoach.isPending
    const errorSupCoach = supCoach.isError
    const successSupCoach = supCoach.isSuccess

    async function handleDeleteCoach(e, id){
        e.preventDefault()
        if (!id) return
        setCoachSup(id)
        supCoach.mutate({id})
    }


    const modifCoachQuery = useQueryClient()
    const modifCoach = useMutation({
        mutationFn: UpdateCoach,

        onSuccess: (()=>{
            setSelectCoach(null)
            modifCoachQuery.invalidateQueries(['mes-coach'])
            setTimeout(()=>{
                modifCoach.reset()
            }, 4000)
        }),

        onError: (()=>{
            setTimeout(()=>{
                modifCoach.reset()
            }, 4000)
        })
    })

    const modifCoachLoading = modifCoach.isPending
    const modifCoachError = modifCoach.isError
    const modifCoachSuccess = modifCoach.isSuccess

    const validationModif = () => {
    if (!coachEdit) return false;
    if (!coachEdit.nom?.trim()) return false;
    if (!coachEdit.prenom?.trim()) return false;
    if (!coachEdit.telephone?.trim()) return false;
    return true;
};

    async function handleModifCoach(e){
        e.preventDefault()
        if(!validationModif()) return
        modifCoach.mutate({
            id: coachEdit?.id,
            nom: coachEdit?.nom,
            prenom: coachEdit?.prenom,
            telephone: coachEdit?.telephone,
            competence: coachEdit?.competence
        })
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
    }

    function formatDate(dates){
        const date = new Date(dates)
        return date.toLocaleDateString('fr-FR')
    }

    const historyQuery = useQueryClient()
    const history = useQuery({
        queryKey : ['history'],
        queryFn : History,
        staleTime: 1000 * 60 * 30

    })
    const historyLoading = historyQuery.isPending
    const historyError = historyQuery.isError
    const dataHistory = history.data?.historiques || []
    const totalHistory = history.data?.historiques.length


    const fin = formatDate(planChoisit?.data?.abonnement?.fin)

    const getDaysDifference = (date1, date2) => {
        const diffTime = date2.getTime() - date1.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const today = new Date();
    const fin7 = planChoisit?.data?.abonnement?.fin;
    const endDate = new Date(fin7);
    const daysRemaining = getDaysDifference(today, endDate);

    const coachQuery = useQueryClient()
    const addCoach = useMutation({
        mutationFn: AjouterCoach,

        onSuccess: (()=>{
            coachQuery.invalidateQueries(['mes-coach'])
            setTimeout(()=>{
                addCoach.reset()
            }, 4000)
            setNomCoach('')
            setPrenomCoach('')
            setTelCoach('')
            setSkills('')
            setSkillsCoach([])
        }),

        onError: (()=>{
            setTimeout(()=>{
                addCoach.reset()
            }, 4000)
        })
    })
    const coachLoading = addCoach.isPending
    const coachError = addCoach.isError
    const coachSuccess = addCoach.isSuccess

    function validation(){
        if(!nomCoach || !nomCoach.trim()) return false
        if(!prenomCoach || !prenomCoach.trim()) return false
        if(!telCoach || !telCoach.trim() || telCoach.length !== 8) return false
        if(skillsCoach.length === 0) return false

        return true
    }

    async function handleSubmit(){
        if(!validation()) return
        addCoach.mutate({
            nom: nomCoach,
            prenom: prenomCoach,
            telephone: telCoach,
            competence: skillsCoach
        })
    }


    function handleAddCoach(e){
        e.preventDefault()
        setModalCoach(!modalCoach)
    }


    function handleAddSkill(){
        setSkillsCoach([...skillsCoach, skills])
        setSkills('')
    }


    const handleAddSkillC = () => {
        if (!skills.trim()) return;

        const existe = coachEdit.competence.some(
            (c) => c.toLowerCase() === skills.trim().toLowerCase()
        );
        if (existe) return;

        setCoachEdit({
            ...coachEdit,
            competence: [...coachEdit.competence, skills.trim()]
        });
        setSkills('');
    };

    function removeSkills(index){
        setSkillsCoach(skillsCoach.filter((_,i)=> i !== index))
    }


    const removeSkillsC = (index) => {
        setCoachEdit({
            ...coachEdit,
            competence: coachEdit.competence.filter((_, i) => i !== index)
        });
    };


    function handleCancel(){
        setModalCoach(false)
        setNomCoach('')
        setPrenomCoach('')
        setTelCoach('')
        setSkillsCoach([])
        setSkills('')
    }


    const mesCours = useQuery({
        queryKey : ['mes-cours', page],
        queryFn : MesCours,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 30
    })

    const dataCours = mesCours?.data?.cours?.data || []
    const coursLoading = mesCours.isPending
    const coursError = mesCours.isError
    const coursSuccess = mesCours.isSuccess

    const CoursFiltres = useMemo(() => {
        if (!dataCours || !Array.isArray(dataCours)) return []

        let result = dataCours

        if (search.trim()) {
            const s = search.toLowerCase()
            result = result.filter(item =>
                item.nom_cours?.toLowerCase().includes(s) ||
                item.niveaux?.toLowerCase().includes(s)
            )
        }

        if (coursTab === 'debutant') {
            result = result.filter(item => item?.niveaux === 'debutant')
        }

        if (coursTab === 'intermediaire') {
            result = result.filter(item => item?.niveaux === 'intermediaire' )
        }

        return result
    }, [dataCours, search, coursTab])


    const supCoursQuery = useQueryClient()
    const supCours = useMutation({
        mutationFn : DeleteCours,
        onSuccess : (()=>{
            setModalSupCours(false)
            setTimeout(()=>{
                supCours.reset()

            }, 4000)

            supCoursQuery.invalidateQueries(['mes-cours'])
        }),

        onError : (()=>{
            setModalSupCours(false)
            setTimeout(()=>{
                supCours.reset()

            }, 4000)
        })
    })

    const loadingSupCours = supCours.isPending
    const errorSupCours = supCours.isError
    const successSupCours = supCours.isSuccess

    async function handleDeleteCours(e, id){
        e.preventDefault()
        if (!id) return
        supCours.mutate({id})
    }


    const coursUpQuery = useQueryClient()
    const updateCours = useMutation({
        mutationFn: UpdateCours,

        onSuccess: (()=>{
            setModalUpCours(false)

            setTimeout(()=>{
                updateCours.reset()

            }, 4000)

            coursUpQuery.invalidateQueries(['mes-cours'])

        }),
        onError: (()=>{
            setTimeout(()=>{
                updateCours.reset()

            }, 4000)
        })
    })
    const loadingUpdateCours = updateCours.isPending
    const errorUpdateCours = updateCours.isError
    const successUpdateCours = updateCours.isSuccess


    async function updateCoursUp(e, id){
        e.preventDefault()
        if(!id) return
        updateCours.mutate({
            id:coursToUp?.id,
            cours:coursToUp?.nom_cours,
            niveaux:coursToUp?.niveaux
        })
    }


    const coursQuery = useQueryClient()
    const cours = useMutation({
        mutationFn: AjouterCours,

        onSuccess: (()=>{
            coursQuery.invalidateQueries(['mes-cours'])
            setTimeout(()=>{
                cours.reset()

            }, 4000)
            setNomCours('')
            setNiveaux('debutant')
        }),

        onError: (()=>{
            setTimeout(()=>{
                cours.reset()
            }, 4000)
        })
    })

    const loadingAddCours = cours.isPending
    const errorAddCours = cours.isError
    const successAddCours = cours.isSuccess

    async function handleAddCours(){
        cours.mutate({
            cours: nomCours,
            niveaux: niveaux
        })
    }


    const recette = useQuery({
        queryKey: ['recette'],
        queryFn: Recette,
        staleTime: 1000 * 60 * 30
    })

    const loadingRecette = recette.isPending
    const errorRecette = recette.isError
    const dataRecette = recette?.data || []

    const recetteMois = dataRecette?.[0]?.montant_total
    const recetteMoisDernier = dataRecette?.[2]?.montant_total
    const recette3MoisDernier = dataRecette?.[1]?.montant_total
    const recetteAnneDernier = dataRecette?.[0]?.montant_total

    function pourcentageMois(){
        if(recetteMoisDernier === 0 || recette3MoisDernier === 0 || recetteAnneDernier === 0 ){
            return 0
        } else{
            const percentRecetteMois = ((recetteMois - recetteMoisDernier) / recetteMoisDernier) * 100
            const percentRecette3Mois = ((recetteMois - recette3MoisDernier) / recette3MoisDernier) * 100
            const percentRecetteAn = ((recetteMois - recetteAnneDernier) / recetteAnneDernier) * 100

            if(apercu === 'mois_actuel'){
                const percetMonth = percentRecetteMois.toFixed(2)
                return Number(percetMonth)
            }

            if(apercu === 'mois_dernier'){
                const percetMonth = percentRecette3Mois.toFixed(2)
                return Number(percetMonth)
            }

            if(apercu === 'annee_passe'){
                const percetMonth = percentRecetteAn.toFixed(2)
                return Number(percetMonth)
            }

            return 0
        }
    }

    useEffect(()=>{
        pourcentageMois()
    }, [apercu])
    
    
    
    

    const programCoursQuery = useQueryClient()
    const programCours = useMutation({
        mutationFn: ProgrammerCours,

        onSuccess: (()=>{
            programCoursQuery.invalidateQueries(['liste-cours'])
            setSelectAdherant(null), 
            setAdherantChoice([]), 
            setAdherantChoiceId([]),
            setJours([]),
            setHeure(null),
            setHeureFin(null)
            setHoraire([])
            setCoachChoice(null)
            setCoachChoiceId(null)
            setTimeout(()=>{
                programCours.reset()
            }, 4000)
        }),

        onError: (()=>{

            setTimeout(()=>{
                programCours.reset()
            })
        })
    })

    const programLoading = programCours.isPending
    const programSuccess = programCours.isSuccess
    const programError = programCours.isError

    function validateProgram(){
        if (!adherantChoiceId) return false
        if (!coachChoiceId) return false
        if(!jours) return false
        if (!horaire) return false

        return true

    }

    async function handleProgram(e) {
        e.preventDefault()
        if(!validateProgram) return
        const heuree = horaire.find(h => h.heure)?.heure
        const heureFine = horaire.find(h => h.heureFin)?.heureFin
        const heures = [heuree, heureFine]
        programCours.mutate({
            cours_id: program?.id,
            ahderent_id: adherantChoiceId,
            jours: jours,
            horaire: heures,
            prof_id: coachChoiceId
        })
    }


    const listeCours = useQuery({
        queryKey: ['liste-cours'],
        queryFn: CoursProgrammer,
        staleTime: 1000 * 60 * 30
    })

    const listeCoursData = listeCours?.data?.data || []
    const loadingCoursListe = listeCours.isPending
    const errorCoursListe = listeCours.isError

    const programListe = useMemo(()=>{

        if(!listeCoursData || !Array.isArray(listeCoursData)) return []

        let dataProgram = listeCoursData

        if(filtreJour.trim()){
            const s = filtreJour.toLowerCase()
            dataProgram = dataProgram.filter(item =>
                item.jours?.some(jour =>
                    jour.toLowerCase() === s
                )
            )
        } 

        return dataProgram

    }, [listeCoursData, filtreJour ])

    const mesActivites = useQuery({
        queryKey: ['mes-activites'],
        queryFn: getActivity,
        staleTime: 1000 * 60 * 30
    })

    const loadingActivity = mesActivites.isPending
    const errorgActivity = mesActivites.isError
    const dataActivity = mesActivites?.data?.activites || []

    const filteredActiviy = useMemo(()=>{
        if(!dataActivity || !Array.isArray(dataActivity)) return []

        let data = dataActivity

        if(activityTab === "publie"){
            data = data.filter(item => item?.status === "publie")
        }
        if(activityTab === "attente"){
            data = data.filter(item => item?.status === "attente")
        }
        if(activityTab === "annule"){
            data = data.filter(item => item?.status === "annule")
        }

        if(activityTab === "passe"){
            data = data.filter(item => item?.ispast === true)
        }

        return data
    },[dataActivity, activityTab] )


    const activityQuery = useQueryClient()
    const programActivity = useMutation({
        mutationFn: CreateActivity,

        onSuccess: (()=>{
            activityQuery.invalidateQueries(['mes-activites'])
            setNomActivite('')
            setDescription('')
            setDateActivite('')
            setHeureActivite('')
            setStatus('publie')
            setImg(null)
            setPreviewActivity(null)
            setTimeout(()=>{
                programActivity.reset()
            }, 4000)
        }),

        onError: (()=>{
            setTimeout(()=>{
                programActivity.reset()
            }, 4000)
        })
    })
    
    const activityLoading = programActivity.isPending
    const activitySuccess = programActivity.isSuccess
    const activityError = programActivity.isError

    function validateFieldActivity(){
        if(!nom_activite || !nom_activite.trim()) return false
        if(!descriptions || !descriptions.trim()) return false
        if(!date_activite) return false
        if(!heure_activite) return false
        if(!images_activte) return false
        if(!status) return false

        return true
    }


    async function handleActivity() {
        if(!validateFieldActivity()) return

        const formData = new FormData()
        formData.append("nom_activite", nom_activite)
        formData.append("descriptions", descriptions)
        formData.append("date_activite", date_activite)
        formData.append("heure_activite", heure_activite)
        formData.append("images_activte", images_activte)
        formData.append("status", status)

        programActivity.mutate({formData})
        
    }

    const delActivityQuery = useQueryClient()
    const delActivity = useMutation({
        mutationFn : DeleteActivity,
        onSuccess : (()=>{
            setActivityToDelete(null)
            setModalSupActivity(false)
            setTimeout(()=>{
                delActivity.reset()

            }, 4000)
            delActivityQuery.invalidateQueries(['mes-activites'])

        }),

        onError : (()=>{
            setModalSupActivity(false)
            setTimeout(()=>{
                delActivity.reset()

            }, 4000)
        })
    })

    const loadingSupActivity = delActivity.isPending
    const errorSupActivity = delActivity.isError
    const activityDelSuccess = delActivity.isSuccess

    async function handleDeleteActivity(e,id){
        e.preventDefault()
        if (!id) return
        delActivity.mutate({id})
    }


    const activityUpQuery = useQueryClient()
    const updateActivity = useMutation({
        mutationFn: UpdateActivity,

        onSuccess: (()=>{
            setModalUpActivity(false)
            setActivityToUp(null)
            setPreviewActivityUp(null)
            setTimeout(()=>{
                updateActivity.reset()

            }, 4000)

            activityUpQuery.invalidateQueries(['mes-activites'])

        }),
        onError: (()=>{
            setTimeout(()=>{
                updateActivity.reset()

            }, 4000)
        })
    })
    const loadingUpdateActivity = updateActivity.isPending
    const errorUpdateActivity = updateActivity.isError
    const activityUpdateSuccess = updateActivity.isSuccess


    async function handleUpdateActivity(e, id){
        e.preventDefault()
        
        if(!id) return
        const formData = new FormData()

        formData.append('_method', 'PUT')
        formData.append("id", activityToUp?.id)
        formData.append("nom_activite", activityToUp?.nom_activite)
        formData.append("descriptions", activityToUp?.descriptions)
        formData.append("date_activite", activityToUp?.date_activite)
        formData.append("heure_activite", activityToUp?.heure_activite)
        formData.append("status", activityToUp?.status)
        if(activityToUp.imageFile){
            formData.append("images_activte", activityToUp.imageFile)
        }
        updateActivity.mutate({formData})
    }


    const sendActivi = useMutation({
        mutationFn: SendActivity,
        onSuccess: (()=>{
            setTimeout(()=>{
                sendActivi.reset()
            }, 4000)
            
        }),

        onError: (()=>{
            setTimeout(()=>{
                sendActivi.reset()
            }, 4000)
            
        }),
        
    })

    const sendLoading = sendActivi.isPending
    const sendError = sendActivi.isError
    const sendSuccess = sendActivi.isSuccess

    async function handleSendActivity(e, id) {
        e.preventDefault()
        if(!id) return
        sendActivi.mutate({id})
        
    }


    const switchA = useQueryClient()
    const swhitchAct = useMutation({
        mutationFn: SwitchStatut,
        onSuccess: (()=>{
            switchA.invalidateQueries(['mes-activites'])
            setSelectActivity(null)
            setTimeout(()=>{
                swhitchAct.reset()
            }, 4000)
            
        }),

        onError: (()=>{
            setSelectActivity(null)
            setTimeout(()=>{
                swhitchAct.reset()
            }, 4000)
            
        }),
        
    })

    const swhitchLoading = swhitchAct.isPending
    const swhitchError = swhitchAct.isError
    const swhitchSuccess = swhitchAct.isSuccess

    async function handleSwhitchActivity(e, id) {
        e.preventDefault()
        if(!id) return
        swhitchAct.mutate({id})
        
    }


    return(
        <div className="grid grid-cols-5 h-screen bg-gray-100 overflow-hidden">

            <div className="col-span-1 py-3 bg-white shadow-lg flex flex-col gap-5 h-screen overflow-y-auto sticky top-0">
                <div className="flex items-center gap-2  px-5 my-5">
                    <div className="rounded-full flex items-center justify-center border border-orange-500 bg-orange-500 w-18 h-15">
                        {infosSalle?.logo_salle ? (
                            <ImageComponent source={infosSalle?.logo_salle} label={"logo"} style={"w-full rounded-full h-full object-cover"}/>
                        ):(

                            <p className="text-xl font-bold">{infosSalle?.nom_salle  ? infosSalle?.nom_salle[0].toUpperCase() : <ImageComponent source={logoGym} label={"logo"} style={"w-full rounded-full h-full object-cover"}/>}</p>
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
                     <Calendar1 className={`${activeTab === 'cours' ? 'text-orange-600' : 'text-black'} h-7 w-7 transition-colors duration-200`}/>
                    <button className={`${activeTab === 'cours' ? 'text-orange-600' : 'text-black'} font-bold transition-colors duration-200`}

                    >Planning de cours</button>
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


                <div className="absolute mx-5 py-3 px-5 transition-colors duration-200 bottom-5 mx-auto w-full flex flex-col gap-2">

                    <motion.button
                        whileHover={{scale: 1.03}}
                        whileTap={{scale: 0.95}}
                        disabled={misNiveauLoading || daysRemaining < 0}
                        className={`${daysRemaining < 0 ? 'bg-orange-300' : 'bg-orange-600'}  shadow-lg  w-full text-white font-bold rounded-lg px-5 py-3`}
                        onClick={handleNiveau}
                    >
                        {misNiveauLoading ? (
                            <Loader2 className="animate-spin text-white"/>
                        ):(
                            'Mettre à niveau'
                        )}
                    </motion.button>
                </div>

            </div>


            {activeTab === 'dashboard' && (
                <>
                    <div className="absolute top-0 right-0 opacity-40 h-200 overflow-hidden w-200">
                        <ImageComponent source={coverhero} label={"logo"} className="h-full w-full" />
                    </div>
                    <div className="col-span-4 relative px-8 py-3 my-5 ">

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

                                <div className="relative">
                                    <motion.button
                                        whileTap={{scale : 0.95}}
                                        onClick={handleNotif}
                                        className=""
                                    >
                                        <Bell className="h-7 w-7"/>
                                    </motion.button>

                                    {totalAbExpirer > 0  && (
                                        <div className="absolute -top-3 text-sm -right-2 flex items-center justify-center">
                                            <Info className="h-6 w-6 " fill="rgba(0,100,255,0.8)" stroke="white" />
                                        </div>
                                    )}
                                    {totalExpire > 0  && (
                                        <div className="absolute -top-3 text-sm -right-2 flex items-center justify-center">
                                            <Info className="h-6 w-6 " fill="rgba(0,100,255,0.8)" stroke="white" />
                                        </div>
                                    )}

                                    {notifModal && (
                                        <motion.div
                                            initial = {{opacity: 0, y: -8}}
                                            animate = {{opacity: 1, y: 0}}
                                            transition={{duration: 0.5}}
                                            className="absolute -bottom-31 bg-white -right-22 text-sm w-50 flex flex-col shadow-[0_0_3px_rgba(0,0,0,0.8)]">
                                            <div className=" p-2 bg-orange-50 hover:bg-gray-50 transition-colors duration-200 cursor-pointer font-semibold">
                                                {loadingAbExpirer ? (
                                                    <p className="h-5 w-40 bg-gray-300 animate-pulse"></p>
                                                ):totalAbExpirer >= 1 ? (
                                                        <p className="text-sm font-semibold">{totalAbExpirer >= 10 ? `${totalAbExpirer}` : `0${totalAbExpirer}`} abonnement{totalAbExpirer > 1 ? 's' : ''} expiré{totalAbExpirer > 1 ? 's' : ''}</p>
                                                    ):(
                                                        <p className="text-sm font-semibold">Aucun abonnement expiré</p>
                                                    )
                                                }

                                                {errorAbExpirer && (
                                                    <p className="text-sm text-red-500">Erreur de recuperation de données</p>
                                                )}
                                                
                                            </div>
                                            <div className=" p-2 bg-gray-50">
                                                {loadingExpire ? (
                                                    <p className="h-5 w-40 bg-gray-300 animate-pulse"></p>
                                                ):totalExpire >= 1 ? (
                                                        <p className="text-sm font-semibold">{totalExpire >= 10 ? `${totalExpire}` : `0${totalExpire}`} renouvellement{totalAbExpirer > 1 ? 's' : ''} à vénir</p>
                                                    ):(
                                                        <p className="text-sm font-semibold">Aucun renouvellement</p>
                                                    )
                                                }

                                                {errorExpire && (
                                                    <p className="text-sm text-red-500">Erreur de recuperation de données</p>
                                                )}
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
                                        <ImageComponent source={infosSalle?.logo_salle} label={"logo"} style={"w-full rounded-full h-full object-cover"}/>
                                    ):(

                                        <p className="text-xl font-bold">{infosSalle?.nom_salle  ? infosSalle?.nom_salle[0].toUpperCase() : <ImageComponent source={logoGym} label={"logo"} className="w-full rounded-full h-full object-cover"/>}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-4 h-205 p-1 overflow-y-auto scrollbar-hide">
                            <div className="col-span-4 flex items-center justify-between gap-8 ">
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.8)] h-27 rounded-lg w-full flex flex-col gap-2 p-4">
                                    
                                    <div className="">
                                        <p className="text-gray-400 font-bold text-[18px]">Adhérants</p>
                                    </div>
                                    {loadingNbrAdherant ? (
                                        <div>
                                            <p className="w-40 h-8 bg-gray-200 animate-pulse"></p>
                                        </div>
                                    ):(
                                        <div>
                                            <p className="font-bold text-3xl">{nbrAdherants > 9 ? nbrAdherants : `0${nbrAdherants}` || 0} / 1000</p>
                                        </div>
                                    )}

                                    {errorNbrAdherant && (
                                        <div>
                                            <p className="text-red-500 text-sm">Erreur lors de la récupération du nombre d'adhérents</p>
                                        </div>
                                    )}
                                </motion.div>
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    className="bg-white shadow-[0_0_5px_rgba(0,255,0,0.8)] h-27 w-full flex flex-col gap-2 p-4 rounded-lg">
                                    <div>
                                        <p className="text-gray-400 font-bold text-[18px]">Adhérants Actifs</p>
                                    </div>
                                    {loadingNbrActif ? (
                                        <div>
                                            <p className="w-40 h-8 bg-gray-200 animate-pulse"></p>
                                        </div>
                                    ):(
                                        <div>
                                            <p className="font-bold text-3xl text-green-500">{nbrAdherantsActif > 9 ? nbrAdherantsActif : `0${nbrAdherantsActif}` || 0}</p>
                                        </div>
                                    )}

                                    {errorNbrActif && (
                                        <div>
                                            <p className="text-red-500 text-sm">Erreur lors de la récupération du nombre d'adhérents</p>
                                        </div>
                                    )}
                                </motion.div>
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    className="bg-white shadow-[0_0_5px_rgba(255,0,0,0.8)] h-27 w-full flex flex-col gap-2 p-4 rounded-lg">
                                    <div>
                                        <p className="text-gray-400 font-bold text-[18px]">Récettes mois précédent</p>
                                    </div>

                                    {loadingRecette ? (
                                        <div>
                                            <p className="w-40 h-8 bg-gray-200 animate-pulse"></p>
                                        </div>
                                    ):(
                                        <div>
                                            <p className="font-bold text-3xl text-red-500">XOF {dataRecette?.[0]?.mois_precedent || 0}</p>
                                        </div>
                                    )}

                                    {errorRecette && (
                                        <div>
                                            <p className="text-red-500 text-sm">Erreur lors de la récupération des recettes</p>
                                        </div>
                                    )}
                                </motion.div>
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    className="bg-white rounded-lg shadow-[0_0_5px_rgba(251,255,0,0.8)] h-27 w-full flex flex-col gap-2 p-4">
                                    <div>
                                        <p className="text-gray-400 font-bold text-[18px]">Récettes du Mois</p>
                                    </div>
                                    {loadingRecette ? (
                                        <div>
                                            <p className="w-40 h-8 bg-gray-200 animate-pulse"></p>
                                        </div>
                                    ):(
                                        <div>
                                            <p className="font-bold text-3xl text-yellow-500">XOF {dataRecette?.[0]?.montant_total || 0}</p>
                                        </div>
                                    )}

                                    {errorRecette && (
                                        <div>
                                            <p className="text-red-500 text-sm">Erreur lors de la récupération des recettes</p>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            <div className="col-span-4 my-10 grid grid-cols-4 justify-between gap-8">
                                <div className="shadow-[0_0_5px_rgba(0,0,0,0.5)] p-4 col-span-3 bg-white rounded-lg w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="font-bold flex items-center gap-1">
                                           <p>Aperçu financier</p>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 border rounded-full border-gray-400 py-1 px-5">
                                            <motion.button
                                            whileTap={{scale: 0.95}}
                                                onClick={()=>{setApercu('mois_dernier')}}
                                                className={`text-sm rounded-lg py-1 px-3 ${apercu === 'mois_dernier' ? 'bg-orange-500 text-white' : '' }  font-semibold transition-all duration-200`}
                                            >
                                                3 derniers mois
                                            </motion.button>
                                            <motion.button
                                                whileTap={{scale: 0.95}}
                                                onClick={()=>{setApercu('mois_actuel')}}
                                                className={`text-sm rounded-lg py-1 px-3 ${apercu === 'mois_actuel' ? 'bg-orange-500 text-white' : '' }  font-semibold transition-all duration-200`}
                                            >
                                                Mois actuel
                                            </motion.button>
                                            <motion.button
                                            whileTap={{scale: 0.95}}
                                                onClick={()=>{setApercu('annee_passe')}}
                                                className={`text-sm rounded-lg py-1 px-3 ${apercu === 'annee_passe' ? 'bg-orange-500 text-white' : '' }  font-semibold transition-all duration-200`}
                                            >
                                                Année passée
                                            </motion.button>
                                        </div>
                                    </div>
                                    <div className=" my-3">
                                        <p className="text-2xl font-bold">XOF {dataRecette?.[0]?.montant_total}
                                            <span className="text-green-500 font-semibold ml-2 text-orange-500 text-sm">
                                                {pourcentageMois()} 
                                                
                                                {apercu === 'mois_dernier' ? (
                                                    '% vs  les trois(3) derniers mois'
                                                ):apercu === 'annee_passe' ? (
                                                    '% vs  l\'année passée'
                                                ):(
                                                    '% vs le mois précédent'
                                                )}
                                            </span>
                                        </p>
                                        
                                    </div>

                                    <div className="flex items-center justify-center h-100">
                                        {(dataRecette?.[0]?.montant_total === 0 &&
                                            dataRecette?.[1]?.montant_total === 0 &&
                                            dataRecette?.[2]?.montant_total === 0 &&
                                            dataRecette?.[3]?.montant_total === 0) ? (
                                            <p className="text-gray-400">Aucune recette enregistré pour le moment</p>
                                        ):(
                                            <LineChart style={{ width: '100%', aspectRatio: 2.4, maxWidth: 1000, margin: 'auto' }} responsive data={dataRecette}>
                                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                                <XAxis dataKey="periode" />
                                                <YAxis width="auto" />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="montant_total" stroke="rgba(255,100,0,1)" />
                                                
                                            </LineChart>
                                        )}
                                    </div>
                                </div>


                                <div className="flex flex-col gap-4 w-full">
                                    <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.5)] flex flex-col gap-3 p-4 rounded-lg">
                                        <h3 className="font-bold">Gestion des Abonnements</h3>
                                        <div className="flex items-center justify-center gap-8">
                                            <div className="flex flex-col items-center">
                                                {loadingExpire ? (
                                                    <p className="h-7 w-7 bg-gray-300 animate-pulse"></p>
                                                ):(
                                                    <p className="text-yellow-500 text-xl font-bold">{totalExpire > 9 ? `${totalExpire}` : `0${totalExpire}`}</p>
                                                )}

                                                {errorExpire && (
                                                    <div className="flex items-center gap-1 p-1">
                                                        <AlertTriangleIcon className="h-5 w-5" fill="red" stroke="white" />
                                                        <p className="text-xs text-red-500 font-semibold">Erreur</p>
                                                    </div>
                                                )}
                                                <p className="text-gray-400 text-sm font-semibold">Expires{totalExpire > 1? 's' : ''} bientôt</p>
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
                                                    <Calendar1 className="h-5 w-5 text-yellow-500"/>
                                                </div>
                                                {loadingExpire ? (
                                                    <p className="h-5 w-50 bg-gray-300 animate-pulse"></p>
                                                ):totalExpire >= 1 ? (
                                                    <p className="text-sm font-semibold">{totalExpire >= 10 ? `${totalExpire}` : `0${totalExpire}`} abonnement{totalExpire > 1 ? 's' : ''} expire{totalExpire > 1 ? 'nt' : ''} cette semaine</p>
                                                    ):(
                                                        <p className="text-sm font-semibold">Aucun abonnement expire cette semaine</p>
                                                    )
                                                }
                                                {errorExpire && (
                                                    <p className="text-sm text-red-500">Erreur de recuperation de données</p>
                                                )}
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <div className="flex items-center rounded-full justify-center p-1 bg-red-100">
                                                    <CalendarOff className="h-5 w-5 text-red-500"/>
                                                </div>
                                                {loadingAbExpirer ? (
                                                    <p className="h-5 w-50 bg-gray-300 animate-pulse"></p>
                                                ):totalAbExpirer >= 1 ? (
                                                        <p className="text-sm font-semibold">{totalAbExpirer >= 10 ? `${totalAbExpirer}` : `0${totalAbExpirer}`} abonnement{totalAbExpirer > 1 ? 's' : ''} expiré{totalAbExpirer > 1 ? 's' : ''}</p>
                                                    ):(
                                                        <p className="text-sm font-semibold">Aucun abonnement expiré</p>
                                                    )
                                                }

                                                {errorAbExpirer && (
                                                    <p className="text-sm text-red-500">Erreur de recuperation de données</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.5)] flex flex-col gap-3 p-4 rounded-lg">
                                        <h3 className="font-bold">Coachs affectés à la salle</h3>
                                        <div className="flex items-center justify-center gap-8">
                                            <div className="flex flex-col items-center">
                                                {mesCoachLoad ? (
                                                    <p className="h-7 w-7 bg-gray-300 animate-pulse"></p>
                                                ):(
                                                    <p className="text-green-500 text-xl font-bold">
                                                        {mes_coach.length === 0 ? (
                                                            'Aucun'
                                                        ):(
                                                            mes_coach.length > 9 ? mes_coach.length : `0${mes_coach.length}`
                                                        )}
                                                    </p>
                                                )}

                                                {mesCoachError && (
                                                    <div className="flex items-center gap-1 p-1">
                                                        <AlertTriangleIcon className="h-5 w-5" fill="red" stroke="white" />
                                                        <p className="text-xs text-red-500 font-semibold">Erreur</p>
                                                    </div>
                                                )}

                                                <p className="text-gray-400 text-sm font-semibold">Enregistrement{mes_coach.length <= 1 ? '' : 's'}</p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.5)] flex flex-col gap-3 p-4 rounded-lg">
                                        <h3 className="font-bold">Total cours programmés</h3>
                                        <div className="flex items-center justify-center gap-8">
                                            <div className="flex flex-col items-center">
                                                {loadingCoursListe ? (
                                                    <p className="h-7 w-7 bg-gray-300 animate-pulse"></p>
                                                ):(
                                                    <p className="text-blue-500 text-xl font-bold">
                                                        {listeCoursData.length === 0 ? (
                                                            'Aucun'
                                                        ):(
                                                            listeCoursData.length > 9 ? listeCoursData.length : `0${listeCoursData.length}`
                                                        )}
                                                    </p>
                                                )}

                                                {errorCoursListe && (
                                                    <div className="flex items-center gap-1 p-1">
                                                        <AlertTriangleIcon className="h-5 w-5" fill="red" stroke="white" />
                                                        <p className="text-xs text-red-500 font-semibold">Erreur</p>
                                                    </div>
                                                )}
                                                <p className="text-gray-400 text-sm font-semibold">Cours</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-span-4 mb-1 bg-white flex flex-col gap-3 shadow-[0_0_5px_rgba(0,0,0,0.5)] w-full p-4 rounded-lg ">
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
                                                [1,2,3,4,5,6,7,8,9,10].map(item =>(

                                                    <tr key={item} className="text-sm p-2 border-b border-gray-200">

                                                        <td className="flex items-center  font-bold  gap-2 py-5 px-3">
                                                            <span className=" h-5 w-5 rounded-full bg-gray-200 animate-pulse flex items-center p-2"></span>
                                                            <p className="h-5 w-20 animate-pulse bg-gray-200"></p>
                                                        </td>
                                                        <td className=" px-3 py-5"><p className="h-5 animate-pulse mx-auto w-50 bg-gray-200"></p></td>
                                                        <td className=" px-3 py-5"><p className="h-5 animate-pulse w-50 mx-auto bg-gray-200"></p></td>
                                                        <td className=" px-3 py-5"><p className="h-5 animate-pulse w-20 mx-auto bg-gray-200"></p></td>
                                                    </tr>
                                                ))
                                            ): adherentsFiltres.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className={`${search.trim() ? '' : 'h-140'} py-6 text-center text-sm text-gray-500`}>
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
                                                    <td className=" px-3 flex items-center justify-center">
                                                        {item.dernier_abonnement?.date_suspension !== null ?(
                                                            <span className={`bg-yellow-200 font-semibold py-1 px-2 rounded-xl`}>
                                                                suspendu
                                                            </span>
                                                        ):(
                                                            <span className={`${item.dernier_abonnement.actif ? 'bg-green-200 ' : 'bg-red-200  animate-pulse'} font-semibold py-1 px-2 rounded-xl`}>
                                                                {item.dernier_abonnement?.actif ? 'actif' : 'expiré'}
                                                            </span>
                                                        )}
                                                    </td>

                                                </tr>
                                            ))}

                                        </tbody>

                                        {errorAdh && (
                                            <tr className="">
                                                <td colSpan={4} className="py-6 h-140 text-center  text-red-600">
                                                    <p className="flex items-center justify-center gap-2 ">
                                                    <XCircle className="animate-spin text-red-600" />
                                                    {mesAdh.error.message}
                                                    </p>
                                                </td>
                                            </tr>
                                        )}

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
                    </div>
                </>
            )}

            {activeTab === 'adherant' && (
                <>
                    <div className="absolute opacity-40 right-0 w-200 overflow-hidden">
                        <ImageComponent source={abonnement} label={"logo-cours"} style={''} />
                    </div>
                    <div className="relative col-span-4 px-8 py-3 my-5">

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
                                    disabled={dataExportLoading || daysRemaining < 0}
                                    onClick={handleExport}
                                    className={`flex font-bold justify-center  text-sm items-center ${daysRemaining < 0 ? ' text-gray-400 bg-gray-300 border-gray-300' : 'bg-transparent text-black border-gray-400'}  gap-2 py-2 px-4 rounded-lg  border-2  transition-colors duration-200`}>
                                    {dataExportLoading  ? (
                                        <Loader2 className="animate-spin h-5 w-5"/>
                                    ):(
                                        <>
                                            <Download className="h-5 w-5 "/>
                                            Export CSV
                                        </>
                                    )}

                                </motion.button>

                                <motion.button
                                    whileTap={{scale: 0.95}}
                                    onClick={()=>{setShowAdd(true), setActiveTab('')}}
                                    disabled={daysRemaining < 0}
                                className={`flex font-bold text-white text-sm items-center ${daysRemaining < 0 ? 'bg-orange-300 border-orange-300' : 'bg-orange-600 hover:text-black border-orange-500 hover:border-gray-400 hover:bg-transparent'}  gap-2 py-2 px-4 rounded-lg  border-2  transition-colors duration-200`}>
                                    <Plus className="h-5 w-5 "/>
                                    Ajouter un adhérant
                                </motion.button>
                            </div>
                        </div>
                        
                        <div className={`grid grid-cols-4 bg-white relative h-190 overflow-y-auto scrollbar-hide p-1 `}>
                            <div className=" col-span-4 bg-white mb-10 rounded-lg ">
                                <table className=" w-full text-center  " style={{ borderCollapse: "collapse" }}>
                                    <thead className="uppercase text-xs text-gray-400 bg-gray-200/70">
                                        <tr >
                                            <th className=" p-3 text-left">Nom complet</th>
                                            <th className=" p-3">Adresse e-mail</th>
                                            <th className=" p-3">Telephone</th>
                                            <th className=" p-3">Forfait</th>
                                            <th className=" p-3">Montant</th>
                                            <th className=" p-3">Statut</th>
                                            <th className=" p-3">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {loadingAdh ? (
                                            [1,2,3,4,5,6,7,8,9,10].map(item =>(

                                                <SkeletonAdh key={item}/>
                                            ))
                                        ): adherentsFiltres.length === 0 ? (
                                            <tr className="h-170">
                                                <td colSpan={7} className={`py-6 text-center text-sm text-gray-500`}>
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
                                                        disabled={daysRemaining < 0}
                                                        onClick={()=>{setModalUpAdherant(true),setAdhToUp(item)}}
                                                        whileTap={{scale: 0.95}}
                                                        className={`border  ${daysRemaining < 0 ? 'bg-orange-300' : 'bg-orange-500 cursor-pointer'} border-orange-100 p-1 rounded-sm `}>
                                                        <Pencil className="text-white h-4 w-4"/>
                                                    </motion.button>
                                                    <motion.button
                                                        type="button"
                                                        disabled={daysRemaining < 0}
                                                        onClick={()=>{setModalSupAdherant(true), setAdhToDelete(item)}}
                                                        whileTap={{scale: 0.95}}
                                                        className={`border  border-red-100 ${daysRemaining < 0 ? ' bg-red-300' : ' bg-red-600 cursor-pointer'} p-1 rounded-sm`}
                                                    >
                                                        <Trash className="h-4 w-4 text-white" />
                                                    </motion.button>
                                                </td>
                                            </tr>
                                        ))}

                                        {errorAdh && (
                                            <tr className="">
                                                <td colSpan={7} className="py-6 h-170 text-center  text-red-600">
                                                    <p className="flex items-center justify-center gap-2 ">
                                                    <XCircle className="animate-spin text-red-600" />
                                                    {mesAdh.error.message}
                                                    </p>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                            {successAdh  && (
                                <div className={`flex ${loadingAdh || errorAdh ? 'hidden' : 'block'} absolute -bottom-17 w-full py-3 px-10 bg-white items-center justify-between`}>
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
                            )}
                            
                        </div>

                    </div>
                </>
            )}

            {activeTab === 'abonnement' && (
                <>
                    <div className="absolute opacity-40 right-0 w-200 overflow-hidden">
                        <ImageComponent source={adhh} label={"logo-cours"} style={''} />
                    </div>
                    <div className="relative col-span-4 px-8 py-3 my-5">

                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-3xl flex items-center">
                                Gestion Abonnements :
                                <span className="text-green-600 bg-green-100 text-sm py-1 px-3 rounded-full mx-3">
                                    {nbrAdherantsActif > 9 ? nbrAdherantsActif : `0${nbrAdherantsActif}`} actif{nbrAdherantsActif > 1 ? 's' : ''}
                                </span>
                                <span className="text-red-600 bg-red-100 text-sm py-1 px-3 rounded-full">
                                    {totalAbExpirer > 9 ? totalAbExpirer : `0${totalAbExpirer}`} expiré{totalAbExpirer > 1 ? 's' : ''}
                                </span>
                                <span className="text-yellow-600 bg-yellow-100 text-sm py-1 px-3 rounded-full mx-3">{totalExpire > 9 ? totalExpire : `0${totalExpire}`} expire{totalExpire > 1 ? 's' : ''} bientôt</span>
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
                                disabled={loadingAdh || errorAdh}
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

                            <motion.button
                                whileTap={{scale: 0.95}}
                                onClick={()=>{setAbonnementTab('suspendu')}}

                                className={`${abonnementTab === 'suspendu' ? 'text-orange-600 bg-orange-100 border-orange-500' : 'bg-gray-200 border border-gray-400 text-black'} font-bold  text-sm  gap-2 py-2 px-4 rounded-lg border   cursor-pointer transition-colors duration-200`}>

                                Suspendus
                            </motion.button>
                            </div>
                        </div>

                        <div className={`grid grid-cols-4 bg-white relative h-190 overflow-y-auto scrollbar-hide p-1 `}>
                            <div className="col-span-4 bg-white mb-10 rounded-lg ">
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
                                                [1,2,3,4,5,6,7,8,9,10].map(item =>(

                                                    <SkeletonAbonnement key={item}/>
                                                ))
                                            ): adherentsFiltres.length === 0 ? (
                                                <tr className=" h-170 ">
                                                    <td colSpan={5} className={`py-6 text-center text-sm text-gray-500`}>
                                                        <p className="flex items-center justify-center">
                                                        {search.trim() ? "Aucun résultat trouvé pour votre recherche" : "Aucun abonnement enregistré"}
                                                        </p>
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
                                                    <td className=" px-3 flex items-center justify-center">
                                                        {item.dernier_abonnement?.date_suspension !== null ?(
                                                            <span className={`bg-yellow-200 font-semibold py-1 px-2 rounded-xl`}>
                                                                suspendu
                                                            </span>
                                                        ):(
                                                            <span className={`${item.dernier_abonnement.actif ? 'bg-green-200 ' : 'bg-red-200  animate-pulse'} font-semibold py-1 px-2 rounded-xl`}>
                                                                {item.dernier_abonnement?.actif ? 'actif' : 'expiré'}
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className=" py-5 items-center gap-2 px-3">

                                                        {!item.dernier_abonnement?.actif ? (
                                                            <div className="">
                                                            {item.dernier_abonnement?.date_suspension === null ?(
                                                                <motion.button
                                                                    type="button"
                                                                    onClick={()=>{setReabonnerModal(true), setReabonner(item)}}
                                                                    whileTap={{scale: 0.95}}
                                                                    disabled={daysRemaining < 0}
                                                                    className={`border ${daysRemaining < 0 ? 'border-blue-300 bg-blue-300' : 'bg-blue-500 hover:bg-transparent hover:text-black border-blue-500'}  transition-colors duration-200  py-1 px-3 rounded-lg  text-white font-bold `}>
                                                                    Reabonner
                                                                </motion.button>
                                                            ):(
                                                                <motion.button
                                                                    type="button"
                                                                    disabled={daysRemaining < 0}
                                                                    onClick={()=>{setReactiverModal(true), setReact(item)}}
                                                                    className={`border  border-green-300 py-1 px-3 rounded-lg  text-white font-bold hover:bg-transparent hover:text-black transition-colors duration-200 bg-green-500`}>
                                                                    Réactiver
                                                                </motion.button>
                                                            )}
                                                            </div>
                                                        ): (
                                                            <motion.button
                                                                type="button"
                                                                disabled={daysRemaining < 0}
                                                                onClick={()=>{setSuspendreModal(true), setSuspen(item)}}
                                                                className={` border  border-red-300 py-1 px-3 rounded-lg  text-white font-bold hover:bg-transparent hover:text-black transition-colors duration-200 bg-red-500`}>
                                                                Suspendre
                                                            </motion.button>
                                                        )}

                                                    </td>
                                                </tr>
                                            ))}

                                            {errorAdh && (
                                                <tr className="">
                                                    <td colSpan={5} className="py-6 h-170 text-center  text-red-600">
                                                        <p className="flex items-center justify-center gap-2 ">
                                                        <XCircle className="animate-spin text-red-600" />
                                                        {mesAdh.error.message}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>

                                    

                                </table>
                                
                            </div>

                            {successAdh && (
                                <div className={`flex ${loadingAdh || errorAdh ? 'hidden' : 'block'} absolute -bottom-17 w-full py-3 px-10 bg-white items-center justify-between`}>
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
                            )}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'coach' &&(
                <>
                    {mes_coach.length > 0 && (
                        <div className="absolute right-0 opacity-40 overflow-hidden w-200">
                            <ImageComponent source={coach} label={"logo"} style={"h-full w-full"} />
                        </div>
                    )}
                    <div className="relative col-span-4 px-8 py-3 my-5">

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-5">
                                    <h1 className="font-bold text-3xl flex items-center">
                                        Equipe des coachs :
                                        <span className="text-green-600 bg-green-100 text-sm py-1 px-3 rounded-full mx-3">Total : {mes_coach.length === 0 ? 0 : mes_coach.length}</span>
                                    </h1>
                                </div>
                               
                                
                                <p className="text-gray-400 text-[18px]">Consultez et gérer votre personnel de coaching</p>
                            </div>

                            <motion.button
                                whileTap={{scale: 0.95}}
                                onClick={handleAddCoach}
                                className="flex items-center text-sm text-white hover:text-black bg-orange-600 transition-colors duration-200 py-2 px-5 font-bold  border-2 border-orange-600 hover:bg-transparent rounded-lg gap-3"
                            >
                                <UserPlus className="h-5 w-5  transition-colors duration-200" />
                                <p>Ajouter un coach</p>
                            </motion.button>
                        </div>

                        <div className="flex items-center w-full relative w-90 my-8">
                            <div className="absolute top-2">
                                <Search className="h-5 w-5 text-orange-400 ml-2"/>
                            </div>
                            <input type="text"
                            value={search}
                            onChange={(e)=>{setSearch(e.target.value)}}
                                className="block p-2 text-sm pl-10 w-full text-sm rounded-lg bg-white focus:outline-none border-orange-400 border text-[16px] w-full"
                                placeholder="Recherche..."
                            />
                        </div>

                        <div className="flex items-center gap-3  my-8 p-1 ">
                            <motion.button
                                whileTap={{scale: 0.95}}
                                className="rounded-lg bg-orange-500 py-1  px-5 font-bold border border-orange-500"
                            >
                                Tous
                            </motion.button>
                        

                            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                            
                                {mes_coach?.map(item =>(
                                    <div key={item.id} className=" flex items-center gap-3">
                                        {[...new Set(item.competence)].map((comp, index) => (
                                            <motion.button
                                                key={index}
                                                whileTap={{ scale: 0.95 }}
                                                className="rounded-lg bg-white py-2 px-5 border border-gray-300"
                                            >
                                                <p className="text-gray-500 font-bold">{comp}</p>
                                            </motion.button>
                                        ))}

                                    </div>
                                ))}
                            </div>
                        </div>

 

                        <div className={`grid grid-cols-6 gap-8 ${filterCoach.length === 12 ? 'overflow-y-auto h-170 scrollbar-hide mb-10' : ''}  p-1 ` }>

                           {mesCoachLoad ? ( 
                                [1,2,3,4,5,6,7,8,9,10,11, 12].map(item => (
                                    <SkeletonCoach key={item}/>
                                ))
                            ): filterCoach.length === 0 ? (
                                <div
                                    className=" col-span-6 flex flex-col gap-3 items-center justify-center"
                                >
                                    {search.trim() ? (
                                        <div className="flex w-full h-170 items-center justify-center">
                                            <p className="text-xl text-gray-600">Aucun coach trouvé</p>
                                        </div>
                                    ):(
                                        <>
                                            <div className="w-120 flex flex-col items-center">
                                                <ImageComponent source={coach} label={""} style={''}/>
                                                <p>Aucun coach affecté à la salle pour le moment.</p>
                                            </div>
                                            <motion.button
                                                whileTap={{scale: 0.95}}
                                                onClick={handleAddCoach}
                                                className="flex items-center bg-orange-500 transition-colors duration-200 text-white hover:text-black py-2 px-5 font-bold  border border-orange-500 hover:bg-transparent rounded-lg gap-3"
                                            >
                                                <UserPlus className="h-5 w-5  transition-colors duration-200" />
                                                <p>Ajouter un coach</p>
                                            </motion.button>
                                        </>
                                    )}

                                </div>
                                
                            ): filterCoach.map(item => (
                                    <motion.div
                                        key={item.id}
                                        className="relative shadow-[0_0_18px_rgba(0,0,0,0.2)] w-50 flex flex-col bg-white"
                                    >

                                        <div className="border-b border-gray-300 bg-orange-50 h-50 flex items-center justify-center">
                                            <p className="text-5xl uppercase">{item.nom[0]}</p>
                                        </div>

                                        <div className="border-b border-gray-300 p-2">
                                            <div className="font-bold flex gap-2">
                                                <p>{item.nom}</p>
                                                <p>{item.prenom}</p>
                                            </div>

                                            <div className="flex items-center">
                                                <div className="text-gray-500 text-sm">
                                                    {item.competence[0]}
                                                    {item.competence.length > 1 && " ..."}
                                                </div>

                                                {item.competence.length > 1 && (
                                                    <button
                                                        onClick={() =>
                                                        setCoachOuvert(coachOuvert === item.id ? null : item.id)
                                                        }
                                                        className="text-xs hover:text-orange-500"
                                                    >
                                                        {coachOuvert === item.id ? "voir moins" : "voir plus"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {coachOuvert === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{duration: 0.5}}
                                                className="absolute 
                                                    left-0 
                                                    bottom-12 
                                                    translate-y-full
                                                    z-50
                                                    w-full
                                                    bg-black/80 backdrop-blur
                                                    text-white
                                                    shadow-lg
                                                    p-3
                                                    flex
                                                    flex-wrap
                                                    gap-2
                                                    rounded-b-lg
                                                    "
                                            >
                                                {item.competence.map((comp, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-orange-500 text-xs px-2 py-1 rounded-full"
                                                    >
                                                        {comp}
                                                    </span>
                                                ))}
                                            </motion.div>
                                        )}

                                        <div className="flex h-10  gap-1">
                                           

                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setSelectCoach(selectCoach === item.id ? null : item.id);
                                                    setCoachEdit({
                                                        ...item,
                                                        competence: [...item.competence] 
                                                    });
                                                    setSkills(''); 
                                                }}
                                                className="w-1/2 flex items-center justify-center border-r border-gray-300"
                                            >
                                                <Pencil className="h-5 w-5 text-blue-500" />
                                            </motion.button>
                                            <motion.button 
                                                whileTap={{scale: 0.95}}
                                                onClick={()=>{setDeleteCoach(deleteCoach === item.id ? null : item.id)}}
                                                className="w-1/2 flex items-center justify-center">
                                                <Trash className="h-5 w-5 text-red-600" />
                                            </motion.button>
                                        </div>

                                        {deleteCoach === item.id && (
                                            <motion.div 
                                                initial={{opacity:0, scale:0.85}}
                                                animate={{opacity:1, scale:1}}
                                                transition={{duration: 0.3}}
                                                className="absolute flex gap-3 flex-col items-center text-center px-2 justify-center z-20 inset-0 bg-black/80 backdrop-blur">
                                                <p className="text-white">Vous êtes sur le point de supprimer coach <span className="font-bold">{item?.nom} {item?.prenom}</span>.</p>
                                                <p className="text-white">Confirmer la suppression ?</p>
                                                <div className=" w-full  flex ">
                                                    <motion.button
                                                        onClick={()=>{setDeleteCoach(null)}}
                                                        whileTap={{scale: 0.95}}
                                                        className="border border-gray-300 text-gray-800 bg-gray-50 w-full"
                                                    >Non</motion.button>
                                                    <motion.button
                                                    whileTap={{scale: 0.95}}
                                                    onClick={(e)=>{handleDeleteCoach(e,deleteCoach)}}
                                                    disabled={loadingSupCoach}
                                                    className="border border-red-600 flex items-center justify-center font-bold text-white bg-red-600 w-full"
                                                    >
                                                        {loadingSupCoach ? (
                                                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                                                        ):(
                                                            'Oui'
                                                         )}
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}
                                        <div className="absolute top-2 left-2">
                                            <p className="rounded-full bg-orange-500 text-white text-xs px-2 py-1">
                                                Tel: {item.telephone}
                                            </p>
                                        </div>

                                    </motion.div>
                                )
                            )}

                            {mesCoachError && (
                                <div className="flex items-center h-150 justify-center gap-2 col-span-6">
                                    <XCircle className="text-red-500 h-5 w-5 animate-spin"/>
                                    <p className="text-red-500 font-bold">{mesCoach.error.message}</p>
                                </div>
                            )}
                            

                            {mes_coach.length > 0 && (
                                <motion.button
                                    whileHover={{scale: 1.03}}
                                    whileTap={{scale: 0.95}}
                                    onClick={handleAddCoach}
                                    className={`${search.trim() ? 'hidden' : 'block'} shadow-[0_0_18px_rgba(0,0,0,0.2)] w-50 h-75 flex flex-col gap-3 items-center bg-orange-50 justify-center`}
                                >

                                    <Plus className="text-gray-500 h-10 w-10"/>
                                    <span className="text-sm text-gray-500">Ajouter un nouveau coach</span>
                                </motion.button>
                            )}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'cours' &&(
                <>
                    <div className="absolute opacity-40 overflow-hidden right-0 w-200">
                        <ImageComponent source={course} label={"logo-cours"} style={''}/>
                    </div>
                
                    <div className=" relative col-span-4 px-8 py-3 my-5">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-3xl flex items-center">
                                Catalogue des cours
                            </h1>
                            <p className="text-gray-400 text-[18px]">Planifier vos cours comme vous le sentez</p>
                        </div>

                        <div className="flex items-center justify-between my-8">
                            <div className="flex flex-col gap-5">
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
                                        onClick={()=>{setCoursTab('tous')}}
                                        className={`${coursTab === 'tous' ? 'text-orange-600 bg-orange-100 border-orange-500' : 'bg-gray-200 border border-gray-400 text-black'} font-bold  text-sm  gap-2 py-2 px-4 rounded-lg border   cursor-pointer transition-colors duration-200`}>

                                        Tous
                                    </motion.button>

                                    <motion.button
                                        whileTap={{scale: 0.95}}
                                        onClick={()=>{setCoursTab('debutant')}}

                                        className={`${coursTab === 'debutant' ? 'text-orange-600 bg-orange-100 border-orange-500' : 'bg-gray-200 border border-gray-400 text-black'} font-bold  text-sm  gap-2 py-2 px-4 rounded-lg border   cursor-pointer transition-colors duration-200`}>

                                        Débutant
                                    </motion.button>

                                    <motion.button
                                        whileTap={{scale: 0.95}}
                                        onClick={()=>{setCoursTab('intermediaire')}}

                                        className={`${coursTab === 'intermediaire' ? 'text-orange-600 bg-orange-100 border-orange-500' : 'bg-gray-200 border border-gray-400 text-black'} font-bold  text-sm  gap-2 py-2 px-4 rounded-lg border   cursor-pointer transition-colors duration-200`}>

                                        Intermédiare
                                    </motion.button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <motion.button
                                    whileTap={{scale: 0.95}}
                                    onClick={()=>{setSideBar(true)}}
                                    className={`flex font-bold text-white text-sm items-center bg-blue-600 hover:text-black border-blue-600 hover:bg-transparent cursor-pointer gap-2 py-2 px-4 rounded-lg  border-2  transition-all duration-200`}>
                                    <Eye className="h-5 w-5 "/>
                                    Consulter les cours programmés
                                </motion.button>
                                <motion.button
                                    whileTap={{scale: 0.95}}
                                    onClick={()=>{setModalAddCours(true), setNiveaux('debutant')}}
                                    disabled={daysRemaining < 0}
                                    className={`flex font-bold text-white text-sm items-center ${daysRemaining < 0 ? 'bg-orange-300 border-orange-300' : 'bg-orange-600 hover:text-black border-orange-500 hover:bg-transparent cursor-pointer'}  gap-2 py-2 px-4 rounded-lg  border-2  transition-colors duration-200`}>
                                    <Plus className="h-5 w-5 "/>
                                    Ajouter un cours
                                </motion.button>
                            </div>
                        </div>

                        <div className={`grid grid-cols-4 bg-white relative h-180 overflow-y-auto scrollbar-hide p-1 `}>
                            <div className=" bg-white col-span-4 mb-10 rounded-lg  ">
                                

                                <table className=" w-full text-center  " style={{ borderCollapse: "collapse" }}>
                                    <thead className="uppercase text-xs text-gray-400 bg-gray-200/70">
                                        <tr >
                                            <th className=" p-3 text-left">Intitulé du cours</th>
                                            <th className=" p-3">Niveau</th>
                                            <th className=" p-3">Créé le</th>
                                            <th className=" p-3">Modifié le</th>
                                            <th className=" p-3">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {coursLoading ? (
                                            [1,2,3,4,5,6,7,8,9,10].map(item =>(

                                                <SkeletonCours key={item}/>
                                            ))
                                        ): CoursFiltres.length === 0 ? (
                                            <tr className="h-170">
                                                <td colSpan={5} className={` py-6  text-center text-sm text-gray-500`}>
                                                    <p className="flex items-center justify-center">
                                                    {search.trim() ? "Aucun résultat trouvé pour votre recherche" : "Aucun cours enregistré"}
                                                    </p>
                                                </td>
                                            </tr>
                                        ): CoursFiltres.map(item => (
                                            <tr key={item.id} className="text-sm p-2 border-b border-gray-200">

                                                <td className="flex items-center  font-bold  gap-2 py-5 px-3">
                                                    <span className="rounded-full bg-gray-200 flex items-center p-2"><File className="h-4 w-4"/></span>
                                                    {item?.nom_cours || 'N/A' }

                                                </td>
                                                <td className=" px-3 py-5">{item?.niveaux || 'N/A'}</td>
                                                <td className=" px-3 py-5">{formatDate(item?.created_at) || 'N/A'}</td>
                                                <td className=" px-3 py-5">{formatDate(item?.updated_at) || 'N/A'}</td>
                                                

                                                <td className="flex justify-center py-5 items-center gap-2 px-3">
                                                    <motion.button
                                                        type="button"
                                                        disabled={daysRemaining < 0}
                                                        onClick={()=>{setModalProgram(true), setProgram(item)}}
                                                        whileTap={{scale: 0.95}}
                                                        className={`border ${daysRemaining < 0 ? 'bg-blue-300' : 'cursor-pointer bg-blue-500 '}  border-blue-100 rounded-lg text-white font-bold p-1 px-3`}>
                                                        Programmer
                                                    </motion.button>
                                                    <motion.button
                                                        type="button"
                                                        disabled={daysRemaining < 0}
                                                        onClick={()=>{setModalUpCours(true), setCoursToUp(item)}}
                                                        whileTap={{scale: 0.95}}
                                                        className={`border  ${daysRemaining < 0 ? 'bg-orange-300' : 'bg-orange-500 cursor-pointer'} border-orange-100 p-1 rounded-sm `}>
                                                        <Pencil className="text-white h-4 w-4"/>
                                                    </motion.button>
                                                    <motion.button
                                                        type="button"
                                                        disabled={daysRemaining < 0}
                                                        onClick={()=>{setModalSupCours(true), setCoursToDelete(item)}}
                                                        whileTap={{scale: 0.95}}
                                                        className={`border  border-red-100 ${daysRemaining < 0 ? ' bg-red-300' : ' bg-red-600 cursor-pointer'} p-1 rounded-sm`}
                                                    >
                                                        <Trash className="h-4 w-4 text-white" />
                                                    </motion.button>
                                                </td>
                                            </tr>
                                        ))}

                                        {coursError && (
                                            <tr className="">
                                                <td colSpan={5} className="py-6 h-170 text-center  text-red-600">
                                                    <p className="flex items-center justify-center gap-2 ">
                                                    <XCircle className="animate-spin text-red-600" />
                                                    {mesCours.error.message}
                                                    </p>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>

                            {coursSuccess && (
                                <div className={`flex ${coursLoading || coursError ? 'hidden' : 'block'} absolute -bottom-17 w-full py-3 px-10 bg-white items-center justify-between`}>
                                    <div>
                                        <div className="text-sm text-gray-400">
                                            Page <span className="font-bold text-black">{mesCours.data?.cours?.current_page}</span> sur <span className="font-bold text-black">{mesCours.data?.cours?.last_page}</span>
                                        </div>
                                    </div>

                                    <div className="flex text-sm items-center gap-2">
                                        <motion.button
                                        disabled={pageCours === 1}
                                        onClick={()=>{setPageCours(p => p - 1)}}
                                            whileTap={{scale: 0.95}}
                                            className={`${mesCours.data?.cours?.current_page ? 'bg-gray-200' : 'bg-transparent'} px-2 py-1 cursor-pointer border border-gray-200 font-semibold`}
                                        >Précedent</motion.button>

                                        <motion.button
                                        disabled={pageCours === mesCours.data?.cours?.last_page}
                                        onClick={()=>{setPageCours(p => p + 1)}}
                                        whileTap={{scale: 0.95}}
                                            className={`${mesCours.data?.cours?.last_page ? 'bg-gray-200' : 'bg-transparent'} px-2 py-1 cursor-pointer border border-gray-200 font-semibold`}
                                        > Suivant</motion.button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                    </div>
                </>
            )}

            {activeTab === 'settings' && (
                <div className="relative col-span-4 px-8 py-3 my-5 ">
                    <div className="flex flex-col gap-2 ">
                        <h1 className="font-bold text-3xl">Paramètres Généraux</h1>
                        <p className="text-gray-400 text-[18px]">Gérez vos informations de façon générale.</p>
                    </div>

                    <div className="flex items-center justify-start gap-5 my-2">
                        <button 
                            onClick={()=>{setParamstab('salle')}}
                            className={`border-b rounded-lg p-2 ${paramsTab === 'salle' ? 'border-orange-500 text-orange-600' : 'text-gray-400 hover:text-orange-600'} cursor-pointer  font-bold transition-all duration-200`}
                        >Informations de la salle</button>
                        <button 
                            onClick={()=>{setParamstab('perso')}}
                            className={`border-b rounded-lg p-2 ${paramsTab === 'perso' ? 'border-orange-500 text-orange-600' : 'text-gray-400 hover:text-orange-600'} cursor-pointer  font-bold transition-all duration-200`}
                        >Informations personnelles</button>
                        <button 
                            onClick={()=>{setParamstab('visuel')}}
                            className={`border-b rounded-lg p-2 ${paramsTab === 'visuel' ? 'border-orange-500 text-orange-600' : 'text-gray-400 hover:text-orange-600'} cursor-pointer  font-bold transition-all duration-200`}
                        >Identité visuelle</button>
                        <button 
                            onClick={()=>{setParamstab('tarif')}}
                            className={`border-b rounded-lg p-2 ${paramsTab === 'tarif' ? 'border-orange-500 text-orange-600' : 'text-gray-400 hover:text-orange-600'} cursor-pointer  font-bold transition-all duration-200`}
                        >Gérer vos tarifs</button>
                        <button 
                            onClick={()=>{setParamstab('activity')}}
                            className={`border-b rounded-lg p-2 ${paramsTab === 'activity' ? 'border-orange-500 text-orange-600' : 'text-gray-400 hover:text-orange-600'} cursor-pointer  font-bold transition-all duration-200`}
                        >Mes activités</button>
                        <button 
                            onClick={()=>{setHistoryP(!historyP)}}
                            className={`border-b rounded-lg p-2 ${historyP ? 'border-orange-500 text-orange-600' : 'text-gray-400 hover:text-orange-600'} cursor-pointer  font-bold transition-all duration-200`}
                        >Historique de connexion</button>
                        <button 
                            onClick={()=>{setParamstab('support')}}
                            className={`border-b rounded-lg p-2 ${paramsTab === 'support' ? 'border-orange-500 text-orange-600' : 'text-gray-400 hover:text-orange-600'} cursor-pointer  font-bold transition-all duration-200`}
                        >Support GymPlus</button>
                    </div>

                    <div className="grid grid-cols-4 gap-2 ">
                        {paramsTab === 'salle' && (
                            <>
                                <div className="flex col-span-2 mt-15 p-4">
                                        <div className="text-gray-500 flex flex-col gap-8">
                                            <p>
                                                Les informations ci-contre correspondent aux détails principaux de votre salle.
                                                Merci de vérifier qu’elles sont correctes et à jour :
                                            </p>

                                            <div className="flex flex-col gap-2">
                                                <p>
                                                <span className="font-bold">Nom de la salle :</span> Nom officiel de votre établissement.
                                                </p>
                                                <p>
                                                <span className="font-bold">Adresse :</span> Adresse complète permettant de localiser votre salle.
                                                </p>
                                                <p>
                                                <span className="font-bold">Pays :</span> Pays dans lequel votre salle est enregistrée.
                                                </p>
                                                <p>
                                                <span className="font-bold">Région :</span> Région ou province de localisation.
                                                </p>
                                            </div>

                                            <p>
                                            Ces informations sont utilisées pour l’identification, la gestion administrative et l’affichage public de votre salle sur la plateforme.
                                            </p>

                                            <div className="flex flex-col gap-2">
                                                <p>
                                                <span className="font-bold">Date de création :</span> {formatDate(infosSalle.created_at)}
                                                </p>
                                                <p>
                                                <span className="font-bold">Dernière mise à jour :</span> {formatDate(infosSalle.updated_at)}
                                                </p>
                                            </div>

                                            <p className="text-red-500">
                                            En cas d’erreur, veuillez procéder à la modification afin de garantir l’exactitude des données.
                                            </p>
                                        </div>
                                        <div className="bg-gray-300 h-120 w-[2px]"></div>
                                </div>
                                
                                <div className="col-span-2">
                                    {infosLoading ? (
                                        <div className=" p-4 mt-15 flex flex-col gap-5 animate-pulse">

                                            <div className="flex flex-col gap-2 my-3">
                                                <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                                                <div className="h-10 bg-gray-200 rounded-lg"></div>
                                            </div>
                                            <div className="flex flex-col gap-2 my-3">
                                                <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                                                <div className="h-10 bg-gray-200 rounded-lg"></div>
                                            </div>

                                            <div className="flex items-center justify-between gap-5">
                                                <div className="flex flex-col gap-2 my-3 w-full">
                                                    <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                                                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                                                </div>

                                                <div className="flex flex-col gap-2 my-3 w-full">
                                                    <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                                                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className="h-10 bg-gray-200 rounded-lg w-30"></div>
                                            </div>
                                        </div>
                                    ):(
                                        <form onSubmit={UpdateInfos} className=" p-4 mt-15 flex flex-col gap-5 text-xl">
                                            
                                            <div className="flex flex-col gap-2 my-3">
                                                <label className="text-gray-400 flex gap-1">Nom de la salle
                                                    <span className={`${showButtonSalle ? 'block' : 'hidden'} text-orange-600`}>*</span>
                                                </label>
                                                <input type="text"
                                                    value={nom_salle}
                                                    onChange={(e)=>{ setNomSalle(e.target.value),update_infos.reset()}}
                                                    disabled={!showButtonSalle}
                                                    placeholder={!showButtonSalle ? infosSalle.nom_salle : 'Entrez le nouveau nom de votre salle'}
                                                    className={`border border-gray-300 p-2 pl-3 ${!showButtonSalle ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2 my-3">
                                                <label className="text-gray-400">Adresse</label>
                                                <input type="text"
                                                    disabled
                                                    placeholder={`${infosSalle.pays_salle} ${infosSalle.region_salle}`}
                                                    className="border bg-gray-200 text-gray-500 border-gray-300 p-2 pl-3 font-semibold rounded-lg focus:outline-none"
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
                                                        className={`border border-gray-300 p-2 pl-3 ${!showButtonSalle ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
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
                                                        className={`border border-gray-300 p-2 pl-3 ${!showButtonSalle ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
                                                    />
                                                </div>
                                            </div>

                                            

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

                                    {infoError && (
                                        <div className=" p-4 mt-15 h-138 flex items-center gap-2 justify-center">
                                            <XCircle className="animate-spin text-red-600 h-5 w-5"/>
                                            <p className="text-red-600">{infos.error.message}</p>
                                        </div>
                                    )}
                                </div>
                                
                            </>
                        )}

                        {paramsTab === 'visuel' && (
                            <>
                                <div className="flex col-span-2 mt-15 p-4">
                                    <div className="text-gray-500 flex flex-col gap-8">
                                        <p>
                                            Cette section vous permet de personnaliser l’image de votre salle et de renforcer votre professionnalisme.
                                        </p>

                                        <div className="flex flex-col gap-2">
                                            <p>
                                            <span className="font-bold">Identité de votre salle :</span> Ajoutez des éléments visuels (logo, couleurs, bannière…) afin de représenter votre marque. Une identité visuelle claire permet de vous démarquer des autres salles et de renforcer votre crédibilité auprès de vos clients.
                                            </p>
                                            <p>
                                            <span className="font-bold">Cachet / Signature :</span> Importez ou scannez votre cachet ou votre signature officielle afin de l’apposer automatiquement sur vos factures et documents générés par la plateforme.
                                                Cela apporte une touche professionnelle et officielle à vos documents.
                                            </p>
                                            
                                        </div>

                                        <p>
                                            Ces éléments sont facultatifs, mais fortement recommandés pour valoriser votre image et inspirer confiance.
                                        </p>
                                    </div>
                                    <div className="bg-gray-300 h-100 w-[2px]"></div>
                                </div>
                                <div className="col-span-2 mt-15 flex items-center gap-5">
                                    <div className="border border-gray-300 rounded-lg p-4">
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
                                                        <ImageComponent source={preview} style={"w-full h-full object-cover"} label={'preview'} />
                                                        <div className="absolute border w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">

                                                        </div>
                                                    </div>
                                                ) : infosSalle?.logo_salle ? (
                                                        <div className="relative w-full h-full">
                                                            <ImageComponent source={infosSalle.logo_salle} className="w-full h-full object-cover" />
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

                                    <div className=" border border-gray-300 rounded-lg p-4">
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
                                                        <ImageComponent source={previewSign} style={"w-full h-full object-cover"} label={'preview-sign'} />
                                                        <div className="absolute border w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">

                                                        </div>
                                                    </div>
                                                ) : infosSalle?.cachet_signer ? (
                                                        <div className="relative w-full h-full">
                                                            <ImageComponent source={infosSalle.cachet_signer} style={"w-full h-full object-cover"} label={'logo'} />
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
                            </>
                        )}

                        {paramsTab === 'perso' && (
                            <>
                                <div className="flex gap-2 col-span-2 mt-15 p-4">
                                        <div className="text-gray-500 flex flex-col gap-8">
                                            <p>
                                                Les éléments ci-contre correspondent à vos informations personnelles associées à votre compte. Merci de vous assurer qu’elles sont exactes et régulièrement mises à jour :
                                            </p>

                                            <div className="flex flex-col gap-2">
                                                <p>
                                                <span className="font-bold">Prénom :</span> Votre prénom tel qu’utilisé pour l’identification sur la plateforme.
                                                </p>
                                                <p>
                                                <span className="font-bold">Nom :</span> Votre nom de famille officiel.
                                                </p>
                                                <p>
                                                <span className="font-bold">Numéro de téléphone :</span> Utilisé pour la connexion, les notifications importantes et la sécurité du compte.
                                                </p>
                                                <p>
                                                <span className="font-bold">Adresse e-mail :</span> Sert à recevoir les communications, confirmations et à récupérer votre compte en cas d’oubli de mot de passe.
                                                </p>
                                                <p>
                                                <span className="font-bold">Mot de passe :</span> Option permettant de sécuriser votre compte en modifiant votre mot de passe à tout moment.
                                                </p>
                                            </div>

                                            <p>
                                            Ces informations sont confidentielles et contribuent à la sécurité ainsi qu’au bon fonctionnement de votre compte.
                                            </p>

                                            <p className="text-red-500">
                                            En cas de changement, veillez à les mettre à jour rapidement.
                                            </p>
                                        </div>
                                        <div className="bg-gray-300 h-138 w-[2px]"></div>
                                </div>
                                <div className="col-span-2">
                                    {infosLoading ? (
                                        <div className="p-4 mt-15 flex flex-col gap-5 animate-pulse">

                                            <div className="flex items-center justify-between gap-5">
                                                <div className="flex flex-col gap-2 my-3 w-full">
                                                    <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                                                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                                                </div>

                                                <div className="flex flex-col gap-2 my-3 w-full">
                                                    <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                                                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 my-3">
                                                <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                                                <div className="h-10 bg-gray-200 rounded-lg"></div>
                                            </div>
                                            <div className="flex flex-col gap-2 my-3">
                                                <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                                                <div className="h-10 bg-gray-200 rounded-lg"></div>
                                            </div>



                                            <div className="my-3">
                                                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                                            </div>
                                        </div>
                                    ):(
                                        <form onSubmit={UpdatePerso} className=" p-4 mt-15 flex flex-col gap-5 text-xl">

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
                                                        className={`border border-gray-300 p-2 pl-3 ${!showButtonProfil ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
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
                                                        className={`border border-gray-300 p-2 pl-3 ${!showButtonProfil ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
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
                                                    className={`border border-gray-300 p-2 pl-3 ${!showButtonProfil ? 'font-semibold' : ''} rounded-lg focus:outline-none`}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2 my-3 w-full">
                                                <label className="text-gray-400">Adresse e-mail </label>
                                                <input type="email"
                                                    disabled
                                                    placeholder={infosUser.email}
                                                    className="border bg-gray-200 text-gray-500 border-gray-300 p-2 pl-3 font-semibold rounded-lg focus:outline-none"
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
                                                            className={`border ${!password.trim() ? 'bg-gray-200 border-gray-300' : 'bg-green-200 border-green-500 cursor-pointer'}  py-2 px-2 rounded-lg `}
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

                                    {infoError && (
                                        <div className=" p-4 mt-15 h-138 flex items-center gap-2 justify-center">
                                            <XCircle className="animate-spin text-red-600 h-5 w-5"/>
                                            <p className="text-red-600">{infos.error.message}</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {paramsTab === 'tarif' && (
                            <>
                                <div className="flex col-span-2 mt-15 p-4">
                                    <div className="text-gray-500 flex flex-col gap-8">
                                        <p>
                                            Cette section vous permet de définir et personnaliser les formules tarifaires proposées par votre salle.
                                        </p>
                                        <p>
                                            Vous pouvez configurer vos prix selon différentes périodes d’abonnement :
                                        </p>

                                        <div className="flex flex-col gap-2">
                                            <p>
                                            <span className="font-bold">Mensuel :</span> Tarif appliqué pour un abonnement d’un mois.
                                            </p>
                                            <p>
                                            <span className="font-bold">Trimestriel :</span> Tarif appliqué pour un abonnement de trois mois.
                                            </p>
                                            <p>
                                            <span className="font-bold">Annuel :</span> Tarif appliqué pour un abonnement d’un an.
                                            </p>
                                            
                                        </div>

                                        <p>
                                            La personnalisation des tarifs vous permet d’adapter vos offres à votre stratégie commerciale et aux besoins de vos adhérents.
                                        </p>
                                    </div>
                                    <div className="bg-gray-300 h-130 w-[2px]"></div>
                                </div>
                                <form onSubmit={sendTarif} className=" col-span-2 mt-15 text-xl">

                                    <div className="flex items-center justify-end gap-2 mb-5">

                                        <div className="flex items-center gap-2">
                                            <div>
                                                <div className={`${(successTarif || prix_mensuel || prix_trimestriel || prix_annuel) ? 'hidden' : 'block'}`}>
                                                    <motion.button
                                                    type="button"
                                                        whileTap={{scale:0.95}}
                                                        onClick={FormMensuel}
                                                        disabled={daysRemaining < 0}
                                                        className={`${daysRemaining < 0 ? 'bg-orange-300 border-orange-300' : 'bg-orange-600 border-orange-600'} px-5 py-3 rounded-lg shadow-lg border `}
                                                    >
                                                        {showFormTarif ? <X className="text-white"/> : <Plus className="text-white"/>}
                                                    </motion.button>
                                                </div>
                                                <div>
                                                    {(successTarif || prix_mensuel || prix_trimestriel || prix_annuel) && (
                                                        <motion.button
                                                        type={`${action === "PUT" ? "submit" : "button"}`}
                                                        disabled={action === "PUT" ? loadingTarifUp : loadingTarifDel}
                                                        onClick={(e) =>{editMois && editAn && editTrim ? setShowModalTrash(true) : sendTarif(e, "PUT")}}
                                                            whileTap={{scale:0.95}}
                                                            className={`px-5 py-3 flex item-center gap-2 rounded-lg shadow-lg border ${editMois && editAn && editTrim ? 'bg-red-500 border-red-500' : 'bg-green-200 border-green-500'} `}
                                                        >
                                                            {editMois && editAn && editTrim ? (
                                                                <>
                                                                <span className="  text-white font-bold">Supprimer tous les enregistrements</span>
                                                                <Trash className=" text-white"/>
                                                                </>
                                                            ): loadingTarifUp 
                                                                ? <>
                                                                    <span className="  text-green-600">En cours...</span>
                                                                    <Loader2 className="text-green-600 animate-spin"/> 
                                                                    </>
                                                                : <>
                                                                    <span className="  text-green-600 font-bold">Enregister les modifications</span>
                                                                    <CheckCircle2 className="text-green-600"/>
                                                                </>

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
                                    <div className="grid grid-cols-1 gap-5">

                                        
                                        <div className="border border-gray-400 p-2 ">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold">Mensuel</span>
                                                <hr className=" w-140 text-gray-400 "/>

                                                <Calendar1 className="text-gray-400 h-7 w-7"/>
                                            </div>

                                            {(showFormTarif || prix_mensuel || prix_trimestriel || prix_annuel) && (
                                                <div className="flex gap-2 my-5 items-center justify-between">
                                                    
                                                    {(successTarif || prix_mensuel) ? (
                                                        <>
                                                            <input
                                                                type="tel"
                                                                value={mensuel}
                                                                onChange={(e)=>{setMensuel(e.target.value), tarif.reset(), tarifUpdate.reset()}}
                                                                className={`border w-full ${editMois ? 'bg-gray-300 text-gray-800 border-gray-300 font-semibold' : 'border-gray-400'}  pl-3 focus:outline-none p-2`}
                                                                placeholder={editMois ? `${prix_mensuel} XOF` : 'Saisissez un nouveau tarif mensuel'}
                                                                disabled={editMois}
                                                            />
                                                            <div >
                                                                <motion.button
                                                                    type="button"
                                                                    onClick={()=>{setEditMois(!editMois), setMensuel('')}}
                                                                    whileTap={{scale:0.95}}
                                                                    className="border p-3 rounded-lg bg-orange-600 border-orange-600"
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
                                                            className="border w-full  border-gray-400 pl-3 focus:outline-none p-2"
                                                            placeholder="Saisissez le tarif par mois"
                                                        />
                                                    )}



                                                </div>
                                            )}
                                        </div>

                                        <div className="border border-gray-400 p-2 ">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold">Trimestriel</span>
                                                <hr className=" w-135 text-gray-400 "/>

                                                <Calendar1 className="text-gray-400 h-7 w-7"/>
                                            </div>

                                            {(showFormTarif || prix_mensuel || prix_trimestriel || prix_annuel) && (
                                                <div className="flex gap-2 my-5 items-center justify-between">
                                                    
                                                    {(successTarif || prix_trimestriel) ? (
                                                        <>
                                                            <input
                                                                type="tel"
                                                                value={trimestriel}
                                                                onChange={(e)=>{setTrimestriel(e.target.value), tarif.reset(), tarifUpdate.reset()}}
                                                                className={`border w-full ${editTrim ? 'bg-gray-300 text-gray-800 border-gray-300 font-semibold' : 'border-gray-400'}  pl-3 focus:outline-none p-2`}
                                                                placeholder={editTrim ? `${prix_trimestriel} XOF` : 'Saisissez un nouveau tarif trimestriel'}
                                                                disabled={editTrim}
                                                            />
                                                            <div >
                                                                <motion.button
                                                                    type="button"
                                                                    onClick={()=>{setEditTrim(!editTrim), setTrimestriel('')}}
                                                                    whileTap={{scale:0.95}}
                                                                    className="border p-3 rounded-lg bg-orange-600 border-orange-600"
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
                                                            className="border w-full  border-gray-400 pl-3 focus:outline-none p-2"
                                                            placeholder="Saisissez le tarif par mois"
                                                        />
                                                    )}



                                                </div>
                                            )}
                                        </div>

                                        <div className="border border-gray-400 p-2 ">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold">Annuel</span>
                                                <hr className=" w-144 text-gray-400 "/>

                                                <Calendar1 className="text-gray-400 h-7 w-7"/>
                                            </div>

                                            {(showFormTarif || prix_mensuel || prix_trimestriel || prix_annuel) && (
                                                <div className="flex gap-2 my-5 items-center justify-between">
                                                    
                                                    {(successTarif || prix_annuel) ? (
                                                        <>
                                                            <input
                                                                type="tel"
                                                                value={annuel}
                                                                onChange={(e)=>{setAnnuel(e.target.value), tarif.reset(), tarifUpdate.reset()}}
                                                                className={`border w-full ${editAn ? 'bg-gray-300 text-gray-800 border-gray-300 font-semibold' : 'border-gray-400'}  pl-3 focus:outline-none p-2`}
                                                                placeholder={editAn ? `${prix_annuel} XOF` : 'Saisissez un nouveau tarif annuel'}
                                                                disabled={editAn}
                                                            />
                                                            <div >
                                                                <motion.button
                                                                    type="button"
                                                                    onClick={()=>{setEditAn(!editAn), setAnnuel('')}}
                                                                    whileTap={{scale:0.95}}
                                                                    className="border p-3 rounded-lg bg-orange-600 border-orange-600"
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
                                                            className="border w-full  border-gray-400 pl-3 focus:outline-none p-2"
                                                            placeholder="Saisissez le tarif par mois"
                                                        />
                                                    )}



                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </>
                        )}

                        {historyP && (
                            <motion.div
                                initial={{opacity: 0, y:0}}
                                animate={{ opacity: 1, y:5}}
                                transition={{duration:0.4}}
                                className="absolute z-20 top-34 right-65 bg-white shadow-lg border border-gray-300 rounded-lg px-4 py-1 overflow-y-auto h-100">
                                
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
                            </motion.div>
                        )}

                        {paramsTab === 'support' && (
                            <div className="col-span-4 h-200 flex items-center justify-center">
                                <div className="flex relative flex-col items-center">
                                    <div className="absolute z-10 inset-0 text-[75px] font-bold text-orange-500 opacity-40 flex items-center justify-center">
                                        <p>gymplus2025.gym@gmail.com</p>
                                    </div>
                                    <ImageComponent source={support} style={"w-200"} label={''} />
                                    <p><span className="italic text-gray-500 text-xl">Service ouvert 24h/7j</span></p>
                                </div>
                            </div>
                        )}


                        {paramsTab === 'activity' && (
                            <>
                                <div className=" mt-10 p-4 bg-white overflow-y-auto h-200 sticky top-0 scrollbar-hide shadow-[0_0_5px_rgba(0,0,0,0.4)] rounded-lg flex flex-col gap-5">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <NotebookPen  className="h-7 w-7" fill="rgba(255,100,0,0.8)" stroke="white"/>
                                            <p className="text-2xl font-bold">Créer une Activité</p>
                                        </div>
                                        <p className="text-sm text-gray-400 ">Une fois l'activité publiée, vous pouvez l'envoyer directement à vos adhérants. Ils seront notifiés via leur adresse e-email.</p>
                                    </div>

                                    <div className="flex flex-col gap-4">

                                        <div className="flex flex-col gap-2">
                                            <label>Nom de l'activité <span className="text-red-500 font-bold">*</span></label>
                                            <Input type={'text'} placeholder={'Ex: Yoga Flow Matinal'} value={nom_activite}
                                                onChange={(e)=>{setNomActivite(e.target.value)}}
                                                className={'p-4 w-full block rounded-lg bg-gray-100 focus:outline-none'}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label>Description <span className="text-red-500 font-bold">*</span></label>
                                            <textarea type="text" cols="30" rows="5"
                                            value={descriptions}
                                            onChange={(e)=>{setDescription(e.target.value)}} 
                                                placeholder="Décrivez l'activité en quelques mots... " 
                                                className="w-full block rounded-lg bg-gray-100 focus:outline-none p-4"    
                                            />
                                        </div>

                                        <div className="flex items-center justify-between gap-2">

                                            <div className="flex flex-col w-full gap-2">
                                                <label>Date <span className="text-red-500 font-bold">*</span></label>
                                                <Input type='date' value={date_activite} onChange={(e)=>{setDateActivite(e.target.value)}} 
                                                    className="p-4 w-full rounded-lg bg-gray-100 focus:outline-none"
                                                />
                                            </div>

                                            <div className="flex flex-col w-full gap-2">
                                                <label>Heure <span className="text-red-500 font-bold">*</span></label>
                                                <Input type='time' value={heure_activite} onChange={(e)=>{setHeureActivite(e.target.value)}} 
                                                    className="p-4 w-full rounded-lg bg-gray-100 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-full gap-2">
                                            <div className="flex items-center justify-between">
                                                <label>Image de l'activité <span className="text-red-500 font-bold">*</span></label>
                                                {previewActivity && (
                                                    <button className="text-xs bg-red-600 text-white px-1 rounded-sm font-bold top-2 right-2"
                                                        type="button"
                                                        onClick={()=>{setPreviewActivity(null)}}
                                                    >
                                                        supprimer
                                                    </button>
                                                )}
                                            </div>
                                            
                                            
                                             <div
                                                className="w-full relative rounded-lg h-50 border-2 border-dotted border-gray-400 overflow-hidden bg-gray-100 cursor-pointer"
                                                onClick={() => activityInputRef.current.click()}
                                            >
                                                {previewActivity ? (
                                                    <div className="relative w-full h-full">
                                                        <ImageComponent source={previewActivity} style={"w-full h-full object-cover"} label={'preview'} />
                                                        <div className="absolute w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <div className="flex flex-col gap-2 items-center">
                                                            <UploadCloud size={40}  />
                                                            <span className="text-sm">Cliquez pour parcourir</span>
                                                            <span className="text-xs text-gray-400">jpg, png, jpeg | max:5MB</span>
                                                        </div>
                                                    </div>
                                                )}

                                                
                                            </div>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={activityInputRef}
                                                hidden
                                                onChange={handleImgActivity}
                                            />
                                        </div>

                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label>Statut <span className="text-red-500 font-bold">*</span></label>
                                        <div className="flex items-center w-full justify-between  bg-gray-100 rounded-lg">
                                            <button 
                                                onClick={()=>{setStatus('publie')}}
                                                className={`text-sm ${status === 'publie' ? 'text-white bg-blue-500' : ''}  cursor-pointer transition-all duration-200  rounded-lg w-full px-4 py-2`}>
                                                publier maintenant
                                            </button>
                                            <button 
                                                onClick={()=>{setStatus('attente')}}
                                                className={` ${status === 'attente' ? 'text-white bg-blue-500' : ''} text-sm rounded-lg w-full px-4 py-2 cursor-pointer transition-all duration-200 `}>
                                                mettre en attente
                                            </button>
                                        </div>
                                    </div>


                                    <button
                                        onClick={handleActivity}
                                        disabled={activityLoading || !validateFieldActivity() || daysRemaining < 0}
                                        className={`w-full p-4 font-bold text-white ${(!validateFieldActivity() || daysRemaining < 0) ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-600 '} flex items-center gap-2 justify-center rounded-lg`}
                                    >
                                        {activityLoading ? (
                                            <Loader2 className="h-6 w-6 animate-spin text-white"/>
                                        ):(
                                            <>
                                            <Save className="h-6 w-6"/>
                                            <p>Enregistrer l'activité</p>
                                            </>
                                        )}
                                    </button>

                                </div>

                                <div className="flex flex-col gap-8 px-4 col-span-3 mt-10 h-200">
                                    <div className="bg-white w-full flex items-center justify-between shadow-[0_0_5px_rgba(0,0,0,0.4)] rounded-lg p-4">
                                        <p className="text-xl">Filtrer par statut :</p>
                                        <div className="flex items-center gap-4">
                                            <motion.button
                                            whileTap={{scale: 0.95}}
                                                onClick={(e)=>{setActivityTab('tous')}}
                                                className={`py-1 px-4 ${activityTab === 'tous' ? 'bg-orange-500 text-white' : 'bg-gray-100 border-gray-200'}  transition-all duration-200 rounded-lg font-semibold`}
                                            >
                                                Tous
                                            </motion.button>
                                            <motion.button
                                            whileTap={{scale: 0.95}}
                                                onClick={(e)=>{setActivityTab('publie')}}
                                                className={`py-1 px-4 ${activityTab === 'publie' ? 'bg-orange-500 text-white' : 'bg-gray-100 border-gray-200'}  transition-all duration-200 rounded-lg font-semibold`}
                                            >
                                                Publiées
                                            </motion.button>
                                            <motion.button
                                            whileTap={{scale: 0.95}}
                                                onClick={(e)=>{setActivityTab('attente')}}
                                                className={`py-1 px-4 ${activityTab === 'attente' ? 'bg-orange-500 text-white' : 'bg-gray-100 border-gray-200'}  transition-all duration-200 rounded-lg font-semibold`}
                                            >
                                                En attente
                                            </motion.button>
                                            <motion.button
                                            whileTap={{scale: 0.95}}
                                                onClick={(e)=>{setActivityTab('annule')}}
                                                className={`py-1 px-4 ${activityTab === 'annule' ? 'bg-orange-500 text-white' : 'bg-gray-100 border-gray-200'}  transition-all duration-200 rounded-lg font-semibold`}
                                            >
                                                Annulées
                                            </motion.button>
                                            <motion.button
                                            whileTap={{scale: 0.95}}
                                                onClick={(e)=>{setActivityTab('passe')}}
                                                className={`py-1 px-4 ${activityTab === 'passe' ? 'bg-orange-500 text-white' : 'bg-gray-100 border-gray-200'}  transition-all duration-200 rounded-lg font-semibold`}
                                            >
                                                Passées
                                            </motion.button>
                                        </div>
                                    </div>

                                    <div className="overflow-y-auto grid grid-cols-2 gap-8 p-1 scrollbar-hide">
                                        {loadingActivity ? (
                                            [1,2,3,4].map(item => (
                                                <SkeletonActivity key={item}/>
                                            ))
                                        ): filteredActiviy.length === 0 ? (
                                            <div className="flex relative col-span-2 items-center justify-center mx-auto h-165 w-165 flex-col gap-2">
                                                <ImageComponent source={nodata} style={"w-full h-full"} label={"logo"}/>
                                                <div className="absolute bottom-20 text-xl text-gray-400 flex items-center justify-center">Aucune activité pour le moment</div>
                                            </div>
                                        ): filteredActiviy.map(item => (
                                             <div key={item.id} className=" relative shadow-[0_0_5px_rgba(0,0,0,0.4)] rounded-lg bg-white">

                                                <motion.div 
                                                    onClick={()=>{setModalImage(true),setShowImage(item)}}
                                                    className="h-60 w-full relative">
                                                    <ImageComponent source={`${documentUrl}${item?.images_activte}`} style={"w-full h-full object-cover cursor-pointer"} label={'img-activity'} />
                                                    <p className="absolute rounded-full top-5 left-5 bg-white py-1 px-4 uppercase font-bold">
                                                        {item?.ispast ? (
                                                            'passée'
                                                        ):(
                                                            item?.status || 'N/A'
                                                        )}
                                                    </p>
                                                    
                                                </motion.div>

                                                {item?.status === 'publie' && (
                                                    <motion.button
                                                        whileTap={{scale: 0.95}}
                                                        disabled={item?.ispast || daysRemaining < 0}
                                                        onClick={(e)=>{handleSendActivity(e, item.id)}}
                                                        className={`absolute ${(item?.ispast || daysRemaining < 0) ? 'bg-orange-300' : 'hover:scale-105 transition-transform bg-orange-600' }  rounded-full top-5 right-5  text-white py-1 px-4 uppercase font-bold`}
                                                    >
                                                        {sendLoading ? (
                                                            <div className="flex items-center">
                                                                <p>Envoie en cours...</p>
                                                                <Loader2 className="text-white h-5 w-5"/>
                                                            </div>
                                                        ):(
                                                            'Envoyez aux adhérants'
                                                        )}
                                                    </motion.button>
                                                )}

                                                <div className="p-8 flex flex-col gap-5">

                                                    <div className="w-full flex items-center justify-between">
                                                        <p className="font-bold text-xl">

                                                            {item?.nom_activite.length > 22 
                                                            ? item?.nom_activite.slice(0, 22) + "..." 
                                                            : item?.nom_activite || 'N/A'}

                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                            title="Voir plus"
                                                                onClick={()=>{
                                                                    setDetailActivity(true)
                                                                    setActivityToDelete(item)
                                                                }}
                                                            >
                                                                <Eye className="h-6 w-6 hover:text-gray-500 transition-colors duration-200"/>
                                                            </button>
                                                            <button
                                                            title="Modifier l'activité"
                                                                disabled={daysRemaining < 0}
                                                                onClick={()=>{
                                                                    setModalUpActivity(true)
                                                                    setActivityToUp(item)
                                                                }}
                                                            >
                                                                <Edit className="h-5 w-5 hover:text-blue-500 transition-colors duration-200" />
                                                            </button>
                                                            <button
                                                            title="Supprimer l'activité"
                                                                disabled={daysRemaining < 0}
                                                                onClick={()=>{
                                                                    setModalSupActivity(true)
                                                                    setActivityToDelete(item)
                                                                }}
                                                            >
                                                                <Trash2 className="h-5 w-5 hover:text-red-500 transition-colors duration-200"/>
                                                            </button>
                                                            <button
                                                                onClick={(e)=>{
                                                                    setSelectActivity(selectActivity === item.id ? null : item.id)
                                                                    handleSwhitchActivity(e, selectActivity)
                                                                }}
                                                                disabled={daysRemaining < 0 || swhitchLoading}
                                                                title="Changer de statut"
                                                            >
                                                                {swhitchLoading ? (
                                                                    <Loader2 className="h-5 w-5 animate-spin transition-colors duration-200"/>
                                                                ):(
                                                                    <ArrowDownUpIcon className="h-5 w-5 hover:text-gray-500 transition-colors duration-200"/>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>

                                                        {item?.descriptions.length > 50 
                                                        ? item?.descriptions.slice(0, 50) + "..." 
                                                        : item?.descriptions || 'N/A'}

                                                    </div>

                                                    <hr className="text-gray-300 w-full h-1"/>

                                                    <div className="flex items-center justify-between w-full">
                                                        <div className=" flex items-center gap-2">
                                                            <Calendar1 className="h-6 w-6 text-blue-600"/>
                                                            <p className="font-bold text-[18px]">{formatDate(item?.date_activite) || 'N/A'}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Timer className="h-7 w-7 text-blue-600"/>
                                                            <p className="font-bold text-[18px]">{item?.heure_activite || 'N/A'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        
                                        {errorgActivity && (
                                            <div className="col-span-2 items-center justify-center mx-auto h-165 w-165 flex items-center gap-2">
                                                <XCircle className="h-5 w-5 text-red-600 animate-spin"/>
                                                <p className="text-red-600 font-bold">Erreur lors de la récupération de vos activités</p>
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}


            {modalImage && (
                <motion.div 
                    
                    className="bg-black/50 absolute inset-0 flex items-center justify-center">
                    
                    <motion.div
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1}}
                        transition={{duration:0.3}}
                        className="w-200 h-200"

                    >
                        
                        <ImageComponent source={`${documentUrl}${showImage?.images_activte}`} label={'image'} style={'w-full h-full '}/>
                    </motion.div>
                    <button 
                            className="absolute top-10 right-20 text-gray-300 hover:text-gray-400 transition-all duration-200"
                            onClick={()=>{setModalImage(false)}}>
                            <XCircle className="h-10 w-10 "/>
                        </button>
                </motion.div>
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
                <ModalLogout 
                    question={'Se déconnecter ?'}
                    reject={() => setModalLogout(false)}
                    confirm={logout}
                    children={
                        <>
                            <p>Cette action est irréversible. Vous</p>
                            <p>êtes sur le point de vous </p> 
                            <p>déconnecter. Si cela est volontaire,</p>
                            <p>veuillez le confirmer.</p>
                        </>
                    }
                />
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
                                        />
                                    </div>
                                </div>

                                
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

                            <div className="flex items-center justify-between h-30 w-full mt-15 col-span-4">
                                <div className="flex flex-col items-center col-span-4 w-full">
                                    
                                </div>
                                <div className="flex justify-end items-center gap-2 w-full">
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
                            </div>

                        </form>

                    </div>
                </div>


            )}

            {showModalTrash && (
                <ModalComponent 
                    question={'Supprimer les tarifs ?'}
                    reject={() => setShowModalTrash(false)}
                    confirm={(e)=>{sendTarif(e, "DELETE")}}
                    loading={loadingTarifDel}
                    children={
                        <>
                            <p>Cette action est irréversible. Tous</p>
                            <p>les tarifs de votre salle à savoir</p> 
                            <p>'mensuel, trimestriel et annuel'</p>
                            <p>seront définitivement effacées.</p>
                        </>
                    }
                />
            )}

            {modalSupAdherant && (
                <ModalComponent 
                    question={'Supprimer cet adhérant ?'}
                    reject={() => setModalSupAdherant(false)}
                    confirm={(e)=>{handleDeleteAdh(e, adhToDelete?.id)}}
                    loading={loadingSupAdh}
                    children={
                        <>
                           <p>Cette action est irréversible. Toutes</p>
                            <p>les données de l'adhérant </p> 
                            <p>'{adhToDelete?.name} {adhToDelete?.prenom}'</p>
                            <p>seront définitivement effacées.</p>
                        </>
                    }
                />
            )}

            {modalSupActivity && (
                <ModalComponent 
                    question={'Supprimer cette activité ?'}
                    reject={() => setModalSupActivity(false)}
                    confirm={(e)=>{handleDeleteActivity(e,activityToDelete?.id)}}
                    loading={loadingSupActivity}
                    children={
                        <>
                           <p>Cette action est irréversible. Toutes</p>
                            <p>les données de l'activité </p> 
                            <p>'{activityToDelete?.nom_activite.length > 34 
                                ? activityToDelete?.nom_activite.slice(0, 22) + "..." 
                                : activityToDelete?.nom_activite || 'N/A'}'
                            </p>
                            <p>seront définitivement effacées.</p>
                        </>
                    }
                />
            )}

            {modalSupCours && (
                 <ModalComponent 
                    question={'Supprimer cet cours ?'}
                    reject={() => setModalSupCours(false)}
                    confirm={(e)=>{handleDeleteCours(e, coursToDelete.id)}}
                    loading={loadingSupCours}
                    children={
                        <>
                           <p>Cette action est irréversible. Toutes</p>
                            <p>les données de ce cours </p> 
                            <p>'{coursToDelete.nom_cours}'</p>
                            <p>seront définitivement effacées.</p>
                        </>
                    }
                />
            )}

            {suspendreModal && (
                <ModalComponent 
                    question={'Suspendre cet adhérant ?'}
                    reject={() => setSuspendreModal(false)}
                    confirm={(e)=> handleSuspendre(e, suspen)}
                    confirmLabel={'Oui'}
                    rejectLabel={'Non'}
                    loading={suspLoading}
                    children={
                        <>
                            <p>Une fois suspendue, vous pouvez</p>
                            <p>le réactiver si son abonnement</p>
                            <p>est toujours actif. Suspendre </p>
                            <p>{suspen?.name} {suspen?.prenom} ?</p>
                        </>
                    }
                />
                
            )}

            {reactiverModal &&(
                <ModalComponent 
                    question={'Réactiver cet adhérant ?'}
                    reject={() => setReactiverModal(false)}
                    confirm={(e)=> handleReactiver(e, react)}
                    confirmLabel={'Oui'}
                    rejectLabel={'Non'}
                    loading={reactLoading}
                    children={
                        <>
                            <p>Vous êtes sur le point d'annuler</p>
                            <p>la suspension de l'adherant</p>
                            <p>{react?.name} {react?.prenom}.</p>
                            <p>Confirmez-vous la réactivation ? </p>
                        </>
                    }
                />
               
            )}

            {modalUpAdherant && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                   
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
                                    />
                                </div>

                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Prénom </label>
                                    <Input
                                        type={'text'}
                                        value={adhToUp?.prenom}
                                        onChange={(e)=>{setAdhToUp({ ...adhToUp, prenom: e.target.value }), updateAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                    />
                                </div>
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Adresse e-mail </label>
                                    <Input
                                        type={'email'}
                                        value={adhToUp?.email}
                                        onChange={(e)=>{setAdhToUp({ ...adhToUp, email: e.target.value }), updateAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                    />
                                </div>

                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Numéro de téléphone </label>
                                    <Input
                                        type={'tel'}
                                        value={adhToUp?.telephone}
                                        onChange={(e)=>{setAdhToUp({ ...adhToUp, telephone: e.target.value }), updateAdh.reset()}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                    />
                                </div>
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

            {modalAddCours && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    
                    <motion.div
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.15}}
                        transition={{duration:0.4}}
                    >
                        <div className=" bg-white flex flex-col gap-5 justify-between py-5 px-8 h-100 w-100 rounded-lg shadow-lg">
                            <div className="">
                                <div className="flex flex-col gap-1 opacity-50 text-xl font-bold mb-5">
                                    Ajouter un nouveau cours
                                    <p className="text-gray-400 text-xs">Ajouter un ou plusieurs cours à la suite après un ajout réussi.</p>
                                </div>
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Intitulé du cours</label>
                                    <Input
                                        type={'text'}
                                        value={nomCours}
                                        onChange={(e)=>{setNomCours(e.target.value)}}
                                        className={'border focus:outline-none  border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={'saisissez le nom du cours'}
                                    />
                                </div>

                                <div className="flex-col flex gap-2">
                                    <label className="font-bold text-lg">Niveau du cours </label>
                                    <div className="flex items-center justify-between border rounded-lg bg-orange-50  border-orange-500">
                                        <button
                                            type="button"
                                            onClick={()=>{setNiveaux('debutant')}}
                                            className={`${niveaux === 'debutant' ? 'bg-orange-500 font-bold text-white' : ''}  p-2 w-full rounded-lg transition-colors duration-200`}
                                        >
                                            Débutant
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={()=>{setNiveaux('intermediaire')}}
                                            className={`${niveaux === 'intermediaire' ? 'bg-orange-500 font-bold text-white' : ''}  p-2 w-full rounded-lg transition-colors duration-200`}
                                        >
                                            Intermédiare
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className=" flex justify-end items-center gap-2">
                                <button
                                type="button"
                                    onClick={()=>{setModalAddCours(false), setNiveaux(null), setNomCours('')}}
                                    className="border py-1 px-3 border-gray-400 bg-gray-200 font-semibold hover:bg-transparent transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleAddCours}
                                    disabled={loadingAddCours || !niveaux}
                                    className={`${!niveaux ? 'bg-orange-200 border-orange-200' : 'border-orange-400 bg-orange-500 hover:bg-transparent hover:text-black'} border py-1 px-3 text-white font-semibold transition-colors duration-200`}
                                >
                                    {loadingAddCours ?(
                                        <Loader2 className="animate-spin"/>
                                    ):(
                                        'Enregistrer'
                                    )}

                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {modalUpCours && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    
                    <motion.div
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.15}}
                        transition={{duration:0.4}}
                    >
                        <div className=" bg-white flex flex-col gap-5 justify-between py-5 px-8 h-90 w-100 rounded-lg shadow-lg">
                            <div className="">
                                <div className="flex items-center gap-1 text-xl font-bold opacity-50 mb-5">
                                    Modifier le cours
                                </div>
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Intitulé du cours</label>
                                    <Input
                                        type={'text'}
                                        value={coursToUp?.nom_cours}
                                        onChange={(e)=>{setCoursToUp({ ...coursToUp, nom_cours: e.target.value }), updateCours.reset()}}
                                        className={'border focus:outline-none  border-orange-500 text-md p-2 rounded-lg'}
                                    />
                                </div>

                                <div className="flex-col flex gap-2">
                                    <label className="font-bold text-lg">Niveau de cours </label>
                                    
                                    <div className="flex items-center justify-between border rounded-lg bg-orange-50  border-orange-500">
                                        <button
                                            type="button"
                                            onClick={(e)=>{setNiveaux('debutant'),  setCoursToUp({...coursToUp,niveaux: 'debutant'})}}
                                            className={`${coursToUp?.niveaux === 'debutant' ? 'bg-orange-500 font-bold text-white' : ''}  p-2 w-full rounded-lg transition-colors duration-200`}
                                        >
                                            Débutant
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={(e)=>{setNiveaux('intermediaire'),  setCoursToUp({...coursToUp,niveaux: 'intermediaire'})}}
                                            className={`${coursToUp?.niveaux === 'intermediaire' ? 'bg-orange-500 font-bold text-white' : ''}  p-2 w-full rounded-lg transition-colors duration-200`}
                                        >
                                            Intermédiare
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {errorUpdateCours && (
                                <p className="text-red-500 flex gap-1 font-bold text-sm"><XCircle className="h-5 w-5 text-red-500"/>{updateCours.error.message}</p>
                            )}
                            <div className=" flex justify-end items-center gap-2">
                                <button
                                type="button"
                                    onClick={()=>{setModalUpCours(false)}}
                                    className="border py-1 px-3 border-gray-400 bg-gray-200 font-semibold hover:bg-transparent transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                type="submit"
                                onClick={(e)=>{updateCoursUp(e, coursToUp)}}
                                disabled={loadingUpdateCours}
                                    className="border py-1 px-3 border-orange-400 bg-orange-500 hover:text-black text-white font-semibold hover:bg-transparent transition-colors duration-200"
                                >
                                    {loadingUpdateCours ?(
                                        <Loader2 className="animate-spin"/>
                                    ):(
                                        'Modifier'
                                    )}

                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {reabonnerModal && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    
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
                                    />
                                </div>

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

            {detailAdherant && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur items-center h-screen justify-center flex ">
                    <motion.div
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.15}}
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
                        ):adhToUp?.dernier_abonnement?.date_suspension !== null ? (
                            <div className="flex items-center bg-yellow-200 border border-yellow-200 p-1 rounded-lg justify-center gap-1">
                                <Circle className="text-yellow-500 bg-yellow-500 animate-pulse rounded-full"/>
                                <p className="text-yellow-500 font-semibold">Abonnement suspendu</p>
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

            {modalCoach && (
                <div className="absolute z-30 inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                   
                    <motion.div
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.15}}
                        transition={{duration:0.4}}
                    >
                        <div className=" bg-white/90 flex flex-col gap-8 justify-between py-5 px-8 w-128 rounded-lg shadow-lg">
                            <div className="">
                                <div className="flex flex flex-col gap-1 opacity-50 text-xl font-bold mb-5">
                                    Ajouter un nouveau coach
                                        <p className="text-gray-400 text-xs">Ajouter un ou plusieurs coachs à la suite après un ajout réussi.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-col flex gap-2 mb-5">
                                        <label className="font-bold text-lg">Nom </label>
                                        <Input
                                            type={'text'}
                                            value={nomCoach}
                                            onChange={(e)=>{setNomCoach(e.target.value)}}
                                            className={'border focus:outline-none  border-orange-500 text-md p-2 rounded-lg'}
                                            placeholder={'saisissez son nom'}
                                        />
                                    </div>
                                    <div className="flex-col flex gap-2 mb-5">
                                        <label className="font-bold text-lg">Prénom </label>
                                        <Input
                                            type={'text'}
                                            value={prenomCoach}
                                            onChange={(e)=>{setPrenomCoach(e.target.value)}}
                                            className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                            placeholder={'saisissez son prenom'}
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Téléphone <span className="text-red-500 text-xs">(maximum 8 chiffres)</span> </label>
                                    <Input
                                        type={'text'}
                                        value={telCoach}
                                        onChange={(e)=>{setTelCoach(e.target.value)}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={'saisissez son numéro de telephone'}
                                    />
                                </div>

                                <div className="relative flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Spécialité(s) </label>
                                    <Input
                                        type={'text'}
                                        value={skills}
                                        onChange={(e)=>{setSkills(e.target.value)}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={'saisissez sa ou ses sompétence(s)...'}
                                    />

                                    <motion.button
                                        type="button"
                                        onClick={handleAddSkill}
                                        whileTap={{scale: 0.95}}
                                        className="absolute top-9 rounded-tr-lg rounded-br-lg right-0 bg-orange-500 border-orange-500 text-white border p-2"
                                    >
                                        <SquarePlus />
                                    </motion.button>
                                </div>

                                {skillsCoach.length > 0 && (
                                    <div className="grid grid-cols-3  gap-3 ">
                                        {skillsCoach.map((item,index) =>(
                                            
                                            <p key={index}  className=" relative text-sm flex items-center justify-center uppercase border px-2 rounded-sm bg-orange-100 text-orange-600 font-bold">
                                                {item}
                                                <button
                                                    onClick={()=>{removeSkills(index)}}
                                                    className="absolute -top-1 -right-1 border bg-red-600 rounded-full"
                                                >
                                                    <X className="h-3 w-3 text-white" />
                                                </button>
                                            </p>
                                            
                                        ))}
                                    </div>
                                )}

                            </div>

                            <div className=" flex justify-end items-center gap-2">
                                <button
                                type="button"
                                    onClick={handleCancel}
                                    className="border py-1 px-3 border-gray-400 bg-gray-200 font-semibold hover:bg-transparent transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={coachLoading || !validation()}
                                    className={`border py-1 px-3 ${!validation() ? 'border-orange-200 bg-orange-200' : 'border-orange-400 bg-orange-500 hover:text-black hover:bg-transparent'}   text-white font-semibold  transition-colors duration-200`}
                                >
                                    {coachLoading ?(
                                        <Loader2 className="animate-spin"/>
                                    ):(
                                        'Enregistrer'
                                    )}

                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {selectCoach && (
                <div className="absolute z-30 inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1.15 }}
                        transition={{ duration: 0.4 }}
                        className=" bg-white/90 flex flex-col gap-8 justify-between py-5 px-8 w-128 rounded-lg shadow-lg"
                    >
                        <div className="">
                            <div className="flex items-center gap-2 text-xl opacity-50 font-bold mb-5">
                                Modifier le coach 
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Nom </label>
                                    <Input
                                        type={'text'}
                                        value={coachEdit?.nom}
                                        onChange={(e)=>{setCoachEdit({...coachEdit, nom: e.target.value})}}
                                        className={'border focus:outline-none  border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={'saisissez son nom'}
                                    />
                                </div>
                                <div className="flex-col flex gap-2 mb-5">
                                    <label className="font-bold text-lg">Prénom </label>
                                    <Input
                                        type={'text'}
                                        value={coachEdit?.prenom}
                                        onChange={(e)=>{setCoachEdit({...coachEdit, prenom: e.target.value})}}
                                        className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                        placeholder={'saisissez son prenom'}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex-col flex gap-2 mb-5">
                                <label className="font-bold text-lg">Téléphone <span className="text-red-500 text-xs">(maximum 8 chiffres)</span> </label>
                                <Input
                                    type={'text'}
                                    value={coachEdit?.telephone}
                                    onChange={(e)=>{setCoachEdit({...coachEdit, telephone:e.target.value})}}
                                    className={'border focus:outline-none border-orange-500 text-md p-2 rounded-lg'}
                                    placeholder={'saisissez son numéro de telephone'}
                                />
                            </div>

                            <div className="relative flex-col flex gap-2 mb-5">
                                <label className="font-bold text-lg">Spécialité(s)</label>
                                <Input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    className="border focus:outline-none border-orange-500 text-md p-2 rounded-lg"
                                    placeholder="saisissez sa ou ses compétence(s)..."
                                />
                                <motion.button
                                    type="button"
                                    onClick={handleAddSkillC}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute top-9 rounded-tr-lg rounded-br-lg right-0 bg-orange-500 border-orange-500 text-white border p-2"
                                >
                                    <SquarePlus />
                                </motion.button>
                            </div>
                            
                            {coachEdit?.competence.length > 0 && (
                                <div className="grid grid-cols-3  gap-3 ">
                                    {coachEdit?.competence.map((item,index) =>(
                                        
                                        <p key={index}  className=" relative text-sm flex items-center justify-center uppercase border px-2 rounded-sm bg-orange-100 text-orange-600 font-bold">
                                            {item}
                                            <button
                                                onClick={()=>{removeSkillsC(index)}}
                                                className="absolute -top-1 -right-1 border bg-red-600 rounded-full"
                                            >
                                                <X className="h-3 w-3 text-white" />
                                            </button>
                                        </p>
                                        
                                    ))}
                                </div>
                            )} 
                            
                        </div>

                        <div className=" flex justify-end items-center gap-2">
                            <button
                            type="button"
                                onClick={()=>{setSelectCoach(null), setCoachEdit(null), setSkills('')}}
                                className="border py-1 px-3 border-gray-400 bg-gray-200 font-semibold hover:bg-transparent transition-colors duration-200"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={(e)=>{handleModifCoach(e)}}
                                disabled={modifCoachLoading || !validationModif()}
                                className={`border py-1 px-3 ${!validationModif() ? 'border-orange-200 bg-orange-200' : 'border-orange-400 bg-orange-500 hover:text-black hover:bg-transparent'}   text-white font-semibold  transition-colors duration-200`}
                            >
                                {modifCoachLoading ?(
                                    <Loader2 className="animate-spin"/>
                                ):(
                                    'Modifier'
                                )}

                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {modalProgram && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                    
                    <motion.div
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.15}}
                        transition={{duration:0.4}}
                    >
                        <div className=" bg-white flex flex-col justify-between py-5 px-8 h-180 w-150 rounded-lg shadow-lg">
                           
                            <div className="flex flex-col gap-1 opacity-50 text-xl font-bold">
                                Programmer le cours de {program?.nom_cours || 'N/A'}
                                <p className="text-gray-400 text-xs">Programmer un ou plusieurs cours à la suite après un ajout réussi.</p>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                <div className="relative col-span-3">

                                    <div
                                        onClick={()=>{
                                            setModalSelect(!modalSelect)
                                            setModalSelectCoach(false)
                                        }}
                                        className="border border-gray-400 p-2 cursor-pointer text-gray-500 bg-gray-200"
                                    >
                                        {adherantChoice.length > 0 ?
                                            'Ajouter un autre adhérant...'
                                        :
                                            'Quel(s) adhérant(s) pour ce cours ?'
                                        }
                                    </div>

                                    <div className="my-2">
                                        <p className="text-gray-400 text-sm">
                                            {adherantChoice.length > 0 ? 
                                                `${adherantChoice.length > 9 ? adherantChoice.length : `0${adherantChoice.length}`} adhérant${adherantChoice.length > 1 ? 's' : ''} sélectionné${adherantChoice.length > 1 ? 's' : ''}`
                                            :   
                                                'Aucun adhérant sélectionné'
                                            }
                                        </p>
                                    </div>

                                    {adherantChoice.length > 0 && (
                                        <div
                                            onClick={null}
                                            className={` my-2 grid grid-cols-4 gap-2 ${adherantChoice.length > 8 ? 'border border-orange-500 p-2 overflow-auto h-20' : ''}`}
                                        >
                                            {adherantChoice.map(item => (
                                                <motion.div
                                                    initial={{opacity:0, scale:0.75}}
                                                    animate={{opacity:1, scale:0.95}}
                                                    transition={{duration:0.4}}
                                                    key={item.id}  
                                                    className=" relative rounded-lg border border-orange-400 px-2 py-1 text-gray-600 text-xs font-bold bg-orange-200"
                                                >
                                                    {item?.name || 'N/A'} {item?.prenom || 'N/A'}
                                                    <motion.button
                                                        onClick={()=>{
                                                            setAdherantChoice(adherantChoice.filter(i => i.id !== item.id))
                                                            setAdherantChoiceId(adherantChoiceId.filter(index => index !== item.id))
                                                        }}
                                                        className="absolute top-0 right-0 bg-red-300 rounded-full"
                                                    >
                                                        <XCircle className="h-3 w-3 text-red-600"/>
                                                    </motion.button>
                                                </motion.div>
                                            ))}   
                                            
                                        </div>
                                    )}
                                    

                                    {modalSelect && (
                                        <motion.div
                                            initial={{opacity:0, y:-5}}
                                            animate={{opacity:1, y:2}}
                                            transition={{duration: 0.5}}
                                            className="absolute top-10 inset-x-0 border border-gray-400 bg-gray-200 overflow-auto h-100 z-10"
                                        >
                                            {loadingAdh ? (
                                                [1,2,3,4,5,6,7,8,9,10].map(item => (
                                                    <div key={item}
                                                        className="p-2 flex items-center gap-2 cursor-pointer hover:bg-white transition-all border-b border-gray-400"
                                                    >
                                                        <p className="w-15 bg-gray-400 rounded-lg h-5 animate-pulse"></p>
                                                        <p className="w-25 bg-gray-400 rounded-lg h-5 animate-pulse"></p>
                                                    </div>
                                                ))
                                            ):AdherantProgram.length === 0 ? (
                                                <div
                                                    className="flex items-center justify-center gap-2 transition-all h-100"
                                                >
                                                    <p className="text-gray-400 text-sm">Aucun adhérant inscrit dans votre salle</p>
                                                </div>
                                            ):AdherantProgram.map(item => (
                                                <button
                                                    key={item.id}
                                                    disabled={adherantChoice.includes(item)}
                                                    onClick={()=>{
                                                        if(adherantChoice.includes(item)){
                                                            alert('deja la')
                                                            return
                                                        } else {
                                                            setAdherantChoiceId([...adherantChoiceId, item.id])
                                                            setAdherantChoice([...adherantChoice, item])
                                                            setModalSelect(false)
                                                        }
                                                    }}
                                                    className={`p-2 flex ${adherantChoice.includes(item) ? 'bg-gray-100 text-gray-400' : 'cursor-pointer hover:bg-white'} flex-col w-full text-left  transition-all border-b border-gray-400`}
                                                >
                                                    <p className="flex items-center justify-between">
                                                        <span>{item?.name || 'N/A'} {item?.prenom || 'N/A'}</span>

                                                        {adherantChoice.includes(item) && (
                                                            <span className="text-xs italic text-gray-400">Déjà sélectionné</span>
                                                        )}
                                                    </p>

                                                </button>
                                            ))}

                                            {AdherantProgram.length >= 0 && (
                                                <div className="flex justify-between p-2 bg-gray-400 items-center">
                                                    <button
                                                        disabled={page===1}
                                                        onClick={()=>{setPage(p=>p-1)}}
                                                    >
                                                        <ArrowLeft className="h-5 w-5"/>
                                                    </button>

                                                    <span>
                                                        {page}/{mesAdh.data?.adherents?.last_page || 1}
                                                    </span>

                                                    <button
                                                        disabled={page===mesAdh.data?.adherents?.last_page}
                                                        onClick={()=>{setPage(p=>p+1)}}
                                                    >
                                                        <ArrowRight className="h-5 w-5"/>
                                                    </button>
                                                </div>
                                            )}

                                            {errorAdh && (
                                                <div
                                                    className="flex flex-col items-center justify-center gap-2 transition-all h-100"
                                                >   
                                                    <XCircle className="h-8 w-8 text-red-500"/>
                                                    <p className=" text-center text-sm text-red-500">{mesAdh.error.message}</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                    
                                </div>

                                <div  className="relative flex flex-col">
                                    
                                    
                                    <div
                                        onClick={()=>{
                                            setModalSelectCoach(!modalSelectCoach)
                                            setModalSelect(false)
                                        }}
                                        className={`${!coachChoice ? 'border-gray-400 text-gray-500 bg-gray-200' : ' border-orange-400 text-gray-600 bg-orange-200' } border w-full flex items-center justify-center cursor-pointer `}
                                    >
                                        
                                        {!coachChoice ?
                                            <div className="flex flex-col items-center text-center">
                                                <User className="h-5 w-5" />
                                                Associer un coach
                                            </div>
                                            
                                        :
                                            <div className="flex uppercase font-bold flex-col  items-center text-xs py-1 text-center">
                                                <span>{coachChoice?.nom || 'N/A'}</span>
                                                <span>{coachChoice?.prenom || 'N/A'}</span>
                                            </div>
                                        }
                                    </div>
                                    {coachChoice && (
                                        <p className="text-[10px] text-gray-400">NB: Cliquez à nouveau pour changer de coach</p>
                                    )}

                                    {modalSelectCoach && (
                                        <motion.div
                                            initial={{opacity:0, y:-5}}
                                            animate={{opacity:1, y:2}}
                                            transition={{duration: 0.5}}
                                            className={`absolute ${!coachChoice ? 'top-17' : 'top-9'} inset-x-0 border border-gray-400 bg-gray-200 overflow-auto h-50 z-10`}
                                        >
                                            {coachLoading ? (
                                                [1,2,3,4,5].map(item => (
                                                    <div key={item}
                                                        className="p-2 flex items-center gap-2 cursor-pointer hover:bg-white transition-all border-b border-gray-400"
                                                    >
                                                        <p className="w-15 bg-gray-400 rounded-lg h-5 animate-pulse"></p>
                                                        <p className="w-25 bg-gray-400 rounded-lg h-5 animate-pulse"></p>
                                                    </div>
                                                ))
                                            ):mes_coach.length === 0 ? (
                                                <div
                                                    className="flex items-center justify-center gap-2 transition-all h-50"
                                                >
                                                    <p className="text-gray-400 text-sm">Aucun coach inscrit dans votre salle</p>
                                                </div>
                                            ):mes_coach.map(item => (
                                                <div
                                                    key={item.id}
                                                    onClick={()=>{
                                                        setCoachChoice(item)
                                                        setCoachChoiceId(item.id)
                                                        setModalSelectCoach(false)
                                                    }}
                                                    className="p-2 cursor-pointer hover:bg-white transition-all border-b border-gray-400"
                                                >
                                                    {item?.nom || 'N/A'} {item?.prenom || 'N/A'}
                                                </div>
                                            ))}

                                            
                                            {coachError && (
                                                <div
                                                    className="flex flex-col items-center justify-center gap-2 transition-all h-50"
                                                >   
                                                    <XCircle className="h-8 w-8 text-red-500"/>
                                                    <p className=" text-center text-sm text-red-500">{mes_coach.error.message}</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-3">
                                <p className="text-gray-500 flex items-center gap-2"><Calendar1 className="h-5 w-5"/>Quels jours ?</p>
                                <div className="grid grid-cols-4  gap-2">
                                    {dateChoice.map((date,index) => (
                                        <button
                                        key={index}
                                        className={`${jours.includes(date) ? 'border-orange-400 bg-orange-200 text-gray-600 font-bold' : 'border-gray-400 bg-gray-200 text-gray-500'} transition-all duration-200 border `}
                                        onClick={()=>{
                                            if(jours.includes(date)){
                                                setJours(jours.filter(i => i !== date))
                                            } else {
                                                setJours([...jours, date])
                                            }
                                        }}
                                        >{date}</button>
                                    ))}
                                </div>
                                <div>
                                    {jours.length === 0 ? (
                                        <p className="text-gray-400 text-sm">Aucun jour sélectionné</p>
                                    ):(
                                        <div className="text-sm text-orange-500 ">
                                            <p className="text-gray-400 ">
                                                Jour{jours.length > 1 ? 's' : ''} programmé{jours.length > 1 ? 's' : ''}: 
                                            </p>
                                            [
                                                {jours.map((item,index) => (
                                                    <span className='px-1' key={index}>{item},</span>
                                                ))}]
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-3">
                                <p className="text-gray-500 flex items-center gap-2"><Clock className="h-5 w-5"/>Quelles heures ?</p>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="w-full border border-gray-400 bg-gray-200 flex flex-col justify-center items-center py-2">
                                        <p className="text-gray-500">Début</p>
                                        <input type="time" value={heure} 
                                            onChange={(e)=>{
                                                setHoraire([...horaire, {heure: e.target.value}])
                                            }}
                                        />
                                    </div>
                                    <div className="w-full border border-gray-400 bg-gray-200 flex flex-col justify-center items-center py-2">
                                        <p className="text-gray-500">Fin</p>
                                        <input type="time" value={heureFin} 
                                            onChange={(e)=>{
                                                setHoraire([...horaire, {heureFin: e.target.value}])
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    {horaire.length === 0 ? (
                                        <p className="text-sm text-gray-400">Horaires non définis</p>
                                    ): horaire.length === 1 ? (
                                        horaire.find(h => h.heure) ? (
                                            <p className="text-sm text-gray-400 flex items-center gap-2">À partir de 
                                                <span className="text-orange-500">{horaire.find(h => h.heure)?.heure || "N/A"} </span>
                                            </p>
                                        ):<p className="text-sm text-gray-400">Horaires non définis</p>
                                    ):( 
                                        <p className="text-sm text-gray-400 flex items-center gap-2">De 
                                            <span className="text-orange-500 flex items-center gap-2">
                                                {horaire.find(h => h.heure)?.heure || "N/A"} 
                                                {" "}<span className="text-sm text-gray-400">À</span>{" "}
                                                {horaire.find(h => h.heureFin)?.heureFin || "N/A"}
                                            </span>
                                        </p>
                                    )}
                                    
                                    
                                </div>
                            </div>

                            <div className=" flex justify-between items-center">
                                
                                <div className="flex items-center justify-end w-full gap-2">
                                    <button
                                    type="button"
                                        onClick={()=>{
                                            setModalProgram(false), 
                                            setSelectAdherant(null), 
                                            setAdherantChoice([]), 
                                            setAdherantChoiceId([]),
                                            setJours([]),
                                            setHeure(null),
                                            setHeureFin(null)
                                            setHoraire([])
                                            setCoachChoice(null)
                                            setCoachChoiceId(null)
                                        }}
                                        className="border py-1 px-3 border-gray-400 bg-gray-200 font-semibold hover:bg-transparent transition-colors duration-200"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={(e)=>{handleProgram(e)}}
                                        disabled={
                                            programLoading ||
                                            adherantChoice.length === 0 ||
                                            !coachChoice ||
                                            jours.length === 0 ||
                                            horaire.length === 0
                                        }
                                        className={`
                                            ${
                                                    programLoading ||
                                                    adherantChoice.length === 0 ||
                                                    !coachChoice ||
                                                    jours.length === 0 ||
                                                    horaire.length === 0
                                                ?
                                                    'border-orange-200 bg-orange-200'
                                                :
                                                    'border-orange-400 bg-orange-500 hover:bg-transparent hover:text-black'
                                            }
                                             border py-1 px-3 text-white font-semibold transition-colors duration-200
                                        `}
                                    >
                                        {programLoading ?(
                                            <Loader2 className="animate-spin"/>
                                        ):(
                                            'Programmer'
                                        )}

                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {sideBar && (
                <div className="absolute grid grid-cols-4 inset-0 bg-black/50 ">
                    
                    <div className="">
                    </div>
                    <div className="">
                    </div>
                    <motion.div 
                        
                        initial={{opacity: 0, x: 150}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.4}}
                        className="bg-gray-100 col-span-2 px-8 py-3"
                    >
                        <button 
                            className="flex mt-5 mb-10 items-center gap-2 border border-gray-400 p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-transparent transition-all duration-200"
                            onClick={()=>{setSideBar(!sideBar), setFiltreJour('')}}
                        >
                            <X className="h-5 w-5"/>
                            <p className="">Fermer</p>
                        </button>

                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-3xl ">Cours programmé{programListe.length > 1 ? 's' : ''}</h1>
                                {programListe.length >= 1 && (
                                    <p className="text-gay-400 text-3xl">({programListe.length > 9 ? programListe.length : `0${programListe.length}`})</p>
                                )}
                            </div>
                            {programListe && (
                                <select onChange={(e)=>{setFiltreJour(e.target.value)}} className="border p-2 rounded-lg border-gray-400 text-xl">
                                    <option value="">Tous</option>
                                    <option value="lundi">Lundi</option>
                                    <option value="mardi">Mardi</option>
                                    <option value="mercredi">Mercredi</option>
                                    <option value="jeudi">Jeudi</option>
                                    <option value="vendredi">Vendredi</option>
                                    <option value="samedi">Samedi</option>
                                    <option value="dimanche">Dimanche</option>
                                </select>
                            )}
                        </div>
                        

                        <div className=" flex flex-col gap-5 h-205 overflow-y-auto scrollbar-hide">
                            

                            <div className="grid grid-cols-2 gap-5">

                                {loadingCoursListe ? (
                                    [1,2,3,4].map(item => (
                                        <SkeletonListeProgram key={item}/>
                                    ))
                                ):programListe.length === 0 ? (
                                    <div className="flex flex-col col-span-2 h-170 items-center justify-center">
                                        {filtreJour.trim() ? (
                                            <p className="text-gray-400 text-xl">Pas de cours programmé pour le {filtreJour}</p>
                                        ):(
                                            <>
                                            <ImageComponent source={calendarc} label={""} style={"object-cover w-160 "}/>
                                            <p className="text-gray-400 text-xl">Vous n'avez pas encore programmé de cours</p>
                                            </>
                                        )}
                                        
                                    </div>
                                ): programListe.map((item,index) => (
                                    <motion.div
                                    key={index} className="flex flex-col gap-5 border border-orange-500 p-4 rounded-lg bg-white">
                                        <div className="flex items-center gap-2 ">
                                            <p>Intitulé :</p>
                                            <p className="text-xl uppercase font-semibold">{item?.cours?.[0] || 'N/A'}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Calendar1 className={`${item?.jours.length > 5 ? 'h-7 w-7' : 'h-5 w-5' }  text-gray-400`}/>
                                            <div className={`flex items-center gap-2 ${item?.jours.length > 5 ? 'overflow-y-auto scrollbar-hide ' : ''}`}>
                                                {item?.jours.map((jour,index) => (
                                                    <p key={index} className="font-semibold">
                                                        {jour}.
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-gray-400"/>
                                            <div className="flex items-center gap-2">
                                                {item?.horaire?.[0] && (
                                                <p className="font-semibold">{item?.horaire?.[0] || 'N/A'}</p>
                                                )}
                                                {item?.horaire?.[1] && (
                                                    <p>-</p>
                                                )}
                                                {item?.horaire?.[1] && (
                                                <p className="font-semibold">{item?.horaire?.[1] || 'N/A'}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <Users2 className="h-5 w-5 text-gray-400"/>
                                                <p>Participants : </p>
                                            </div>
                                            <div className={`flex items-center gap-2 ${item?.adherent.length > 4 ? 'overflow-y-auto scrollbar-hide ' : ''} text-sm`}>
                                                {item?.adherent.map(adherant => (
                                                    <p key={adherant.id} className="font-semibold border px-3 text-center uppercase border-orange-500 text-orange-600">{adherant?.nom || 'N/A'} {adherant?.prenom || 'N/A'}</p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center text-sm gap-2 my-5">
                                            <p>Ce cours est est associé au coach </p>
                                            <p className="font-semibold uppercase">{item?.coach?.coach?.nom || 'N/A'} {item?.coach?.coach?.prenom || 'N/A'}</p>
                                        </div>
                                    </motion.div>
                                   ))
                                }

                                {errorCoursListe && (
                                    <div className="flex col-span-2 h-200 gap-2 items-center justify-center">
                                        <XCircle className="h-5 w-5 animate-spin text-red-500"/>
                                        <p className="text-red-500">{listeCours.error.message}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {detailActivity && (
                <div className="absolute grid grid-cols-4 inset-0 bg-black/50 ">
                    
                    <div className="">
                    </div>
                    <div className="">
                    </div>
                    <div className="">
                    </div>
                    <motion.div 
                        
                        initial={{opacity: 0, x: 150}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.3}}
                        className="bg-gray-100 px-8 py-3"
                    >
                        <button 
                            className="flex mt-5 mb-10 items-center gap-2 border border-gray-400 p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-transparent transition-all duration-200"
                            onClick={()=>{setDetailActivity(!detailActivity)}}
                        >
                            <X className="h-5 w-5"/>
                            <p className="">Fermer</p>
                        </button>

                        <div className="flex items-center mb-5">
                            <h1 className="font-bold text-2xl ">{activityToDelete?.nom_activite || 'N/A'}</h1>
                        </div>
                        

                        <div className=" flex flex-col gap-5 h-205 overflow-y-auto scrollbar-hide">
                            
                            <ImageComponent source={`${documentUrl}${activityToDelete?.images_activte}`} label={'image'} style={'w-full h-full'}/>
                            <p className="text-gray-500">{activityToDelete?.descriptions || 'N/A'}</p>
                            
                            <div className="flex items-center justify-center">
                                <Calendar value={new Date(activityToDelete.date_activite )} className={'p-2'}/>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <Timer className="h-6 w-6 text-gray-400" />
                            <p className="text-center text-xl text-gray-400">Heure : {activityToDelete?.heure_activite || 'N/A'}</p>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}

            {modalUpActivity && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur flex flex-col items-center justify-center">
                   
                    <motion.div
                        initial={{opacity:0, scale:0.75}}
                        animate={{opacity:1, scale:1.05}}
                        transition={{duration:0.4}}
                        className="bg-white p-6 rounded-lg flex flex-col gap-5 relative"
                    >
                            <div className="flex items-center gap-2">
                                <NotebookPen  className="h-7 w-7" fill="rgba(255,100,0,0.8)" stroke="white"/>
                                <p className="text-2xl font-bold">Modification de l'activité {activityToUp?.id || 'na'}</p>
                            </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2">
                                <div className="flex flex-col gap-2">
                                    <label>Nom de l'activité <span className="text-red-500 font-bold">*</span></label>
                                    <Input type={'text'} placeholder={'Ex: Yoga Flow Matinal'}
                                        value={activityToUp?.nom_activite}
                                        onChange={(e)=>{setActivityToUp({...activityToUp, nom_activite: e.target.value})}}
                                        className={'p-4 w-full block rounded-lg bg-gray-100 focus:outline-none'}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label>Description <span className="text-red-500 font-bold">*</span></label>
                                    <textarea type="text" cols="30" rows="5"
                                        value={activityToUp?.descriptions}
                                        onChange={(e)=>{setActivityToUp({...activityToUp, descriptions: e.target.value})}} 
                                        placeholder="Décrivez l'activité en quelques mots... " 
                                        className="w-full block rounded-lg bg-gray-100 focus:outline-none p-4"    
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-2">

                                <div className="flex flex-col w-full gap-2">
                                    <label>Date <span className="text-red-500 font-bold">*</span></label>
                                    <Input type='date' 
                                        value={activityToUp?.date_activite}
                                        onChange={(e)=>{setActivityToUp({...activityToUp, date_activite: e.target.value})}}
                                        className="p-4 w-full rounded-lg bg-gray-100 focus:outline-none"
                                    />
                                </div>

                                <div className="flex flex-col w-full gap-2">
                                    <label>Heure <span className="text-red-500 font-bold">*</span></label>
                                    <Input type='time' 
                                        value={activityToUp?.heure_activite}
                                        onChange={(e)=>{setActivityToUp({...activityToUp, heure_activite: e.target.value})}} 
                                        className="p-4 w-full rounded-lg bg-gray-100 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-2">
                                <label>Image de l'activité <span className="text-red-500 font-bold">*</span></label>
                                
                                    <div
                                    className="w-full rounded-lg h-50 border-2 border-dotted border-gray-400 overflow-hidden bg-gray-100 cursor-pointer"
                                    onClick={() => activityUpInputRef.current.click()}
                                >
                                    {previewActivityUp ? (
                                        <div className="relative w-full h-full">
                                            <ImageComponent source={previewActivityUp} style={"w-full h-full object-cover"} label={'preview'} />
                                            <div className="absolute border w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">

                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <ImageComponent source={`${documentUrl}${activityToUp?.images_activte}`} style={"w-full h-full object-cover"} label={'img'} />
                                            <div className="absolute border w-full h-full flex items-center justify-center hover:backdrop-blur-[2px] overflow-hidden font-bold inset-0 text-xl">

                                            </div>
                                        </div>
                                    )}
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={activityUpInputRef}
                                    hidden
                                    onChange={handleImgActivityUp}
                                />
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Statut <span className="text-red-500 font-bold">*</span></label>
                            <div className="flex items-center w-full justify-between  bg-gray-100 rounded-lg">
                                <button 
                                    onClick={(e)=>{setStatus('publie'), setActivityToUp({...activityToUp, status: 'publie'})}}
                                    className={`text-sm ${activityToUp?.status === 'publie' ? 'text-white bg-blue-500' : ''}  cursor-pointer transition-all duration-200  rounded-lg w-full px-4 py-2`}>
                                    publier maintenant
                                </button>
                                <button 
                                    onClick={(e)=>{setStatus('attente'), setActivityToUp({...activityToUp, status: 'attente'})}}
                                    className={` ${activityToUp?.status === 'attente' ? 'text-white bg-blue-500' : ''} text-sm rounded-lg w-full px-4 py-2 cursor-pointer transition-all duration-200 `}>
                                    mettre en attente
                                </button>
                            </div>
                        </div>


                        <button
                            onClick={(e)=>{handleUpdateActivity(e, activityToUp?.id)}}
                            disabled={loadingUpdateActivity}
                            className={`w-full p-4 font-bold text-whit bg-orange-600 hover:bg-orange-500 transition-all duration-200 flex items-center gap-2 justify-center rounded-lg`}
                        >
                            {loadingUpdateActivity ? (
                                <Loader2 className="h-6 w-6 animate-spin text-white"/>
                            ):(
                                <>
                                    <Save className="h-6 w-6 text-white"/>
                                    <p className="text-white">Mettre à jour l'activité</p>
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={()=>{setModalUpActivity(false), setActivityToUp(null)}}
                            className="absolute top-3 right-3"
                        >
                            <X className="h-8 w-8 text-gray-400"/>
                        </button>
                    </motion.div>
                </div>
            )}

            <ResponseCoach coachSuccess={coachSuccess} successSupCoach={successSupCoach} modifCoachSuccess={modifCoachSuccess} />
            <ResponseAdherant successAdherant={successAdherant} successUpdateAdh={successUpdateAdh} successSupAdh={successSupAdh}/>
            <ResponseAbonnement reabSuccess={reabSuccess} reactSuccess={reactSuccess} suspSuccess={suspSuccess} />
            <ResponseCours successAddCours={successAddCours} successSupCours={successSupCours} successUpdateCours={successUpdateCours} programSuccess={programSuccess} />
            <ResponseLogo logoDelSuccess={logoDelSuccess} logoEditSuccess={logoEditSuccess} logoSuccess={logoSuccess} />
            <ResponseCachet signDelSuccess={signDelSuccess} signEditSuccess={signEditSuccess} signSuccess={signSuccess} />
            <ResponseTarif successTarif={successTarif} successTarifDel={successTarifDel} successTarifUp={successTarifUp} />
            <ResponseInfoPerso persoSuccess={persoSuccess} passwordSuccess={passwordSuccess} />
            <ResponseInfoSalle successUpdate={successUpdate} />
            <ResponseExportData dataExportSuccess={dataExportSuccess} />
            <ResponseActivity activitySuccess={activitySuccess} activityDelSuccess={activityDelSuccess} activityUpdateSuccess={activityUpdateSuccess} sendSuccess={sendSuccess} swhitchSuccess={swhitchSuccess} />
            
            <ResponseError
                coachError={coachError}
                errorTarif={errorTarif}
                errorTarifUp={errorTarifUp}
                errorTarifDel={errorTarifDel}
                persoError={persoError} swhitchError={swhitchError}
                passwordError={passwordError} errorSupCoach={errorSupCoach}
                signDelError={signDelError} signEditError={signEditError} signError={signError}
                logoDelError={logoDelError} logoEditError={logoEditError} logoError={logoError}
                updateError={updateError} errorAdherant={errorAdherant} errorUpdateAdh={errorUpdateAdh}
                errorAddCours={errorAddCours} reabError={reabError} dataExportError={dataExportError}
                reactError={reactError} programError={programError} modifCoachError={modifCoachError}
                suspError={suspError} errorSupCours={errorSupCours} errorSupAdh={errorSupAdh}
                activityError={activityError} errorSupActivity={errorSupActivity} errorUpdateActivity={errorUpdateActivity} sendError={sendError}

            />
           
        </div>
    )
}