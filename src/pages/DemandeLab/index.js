import React, { useState } from "react";
import { Row, Col, Card, CardBody, TabContent, TabPane, NavItem, NavLink, Label, Input, Form, Container, CardTitle,ModalBody, ModalHeader,Progress, Button } from "reactstrap";
import classnames from 'classnames';
import { Link } from "react-router-dom";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Select from "react-select";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { ChangeCompletProfile, SaveProfile } from "../../services/ProfileServices/Api";
import EditableTables from "../Tables/EditableTables";
import Dropzone from "react-dropzone";
import { AddDemande } from "../../services/DemandeLabServices/Api";

toastr.options = {
    positionClass: "toast-bottom-right",
    closeButton : true
  }

const Profile = () => {
    const Data = JSON.parse(localStorage.getItem("authUser"))
    const [activeTab, setActiveTab] = useState(1);

    // Info
    const [name_ferme , setname_ferme]  = useState("")
    const [typedmnd , settypedmnd]  = useState("")
    const [status_ferme , setstatus_ferme]  = useState("")
    const [lieu_ferme , setlieu_ferme]  = useState()
    const [coordGps , setcoordGps]  = useState("")
    const [personnes , setpersonnes]  = useState("")
    const [adr_princp , setadr_princp]  = useState("")
    const [statusexpo , setstatusexpo]  = useState("")
    const [email , setemail]  = useState("")
    const [siteweb , setsiteweb]  = useState()
    const [tel_princp , settel_princp]  = useState("")
    const [ville , setville]  = useState("")
    const [qt1, setQt1] = useState("");
    const [qt2, setQt2] = useState("");
    const [qt3, setQt3] = useState("");
    const [qt4, setQt4] = useState("");
    const [DaysSelected, setDaysSelected] = useState([]);
    const [qt5, setQt5] = useState("");
    const [qt6, setQt6] = useState("");
    const [qt7, setQt7] = useState("");
    const [qt8, setQt8] = useState("");
    const [selectedCity , setselectedCity]  = useState()

    // Surface
    const [surfaceTotal , setsurfaceTotal]  = useState("")
    const [propriété , setpropriété]  = useState("")
    const [copropriété , setscopropriété]  = useState("")
    const [location , setslocation]  = useState("")
    const [sitesdiff , setsitesdiff]  = useState("")
    const [production1 , setproduction1]  = useState("")
    const [production2 , setproduction2]  = useState("")
    const [production3 , setproduction3]  = useState("")
    const [arboric , setarboric]  = useState("")
    const [pratiques , setpratiques]  = useState("")
    const [typeacces , settypeacces]  = useState("")
    const [profondeur , setprofondeur]  = useState("")
    const [situationEau , setsituationEau]  = useState("")
    const [décrivez , setdécrivez]  = useState("")
    const [connaissance , setconnaissance]  = useState("")
    const [nonsituationEau , setnonsituationEau]  = useState("")
    const [selectedOption, setSelectedOption] = useState("")


    // PJ
    const [uploadsFiles, setuploadsFiles] = useState([])










    const [fullname , setfullname]  = useState()
    const [tel , settel]  = useState()
    const [adr_res , setadr_res]  = useState()
    const [adr_ferm , setadr_ferm]  = useState()
    const [openmodal, setopenModal] = useState(false)
    const [progressvalue, setprogressvalue] =useState();
    const [typeinspecter, settypeinspecter] = useState()
    const [typeformation, settypeformation] = useState()
    const [declareHonneur, setdeclareHonneur ] = useState([0,0,0,0,0,0,0,0,0,0])

    // productions Tables 1


    const columns1 = [
        {
          dataField: "Prodve",
          text: "Productions végétales",
          sort: false
        },
        {
          dataField: "surf",
          text: "Surface totale (Ha)",
          sort: false
        },
        {
          dataField: "nbrparc",
          text: "Nombre de parcelles",
          sort: false
        },
        {
          dataField: "situation",
          text: "Situation des parcelles : agriculture biologique, agroécologie ou agriculture conventionnelle",
          sort: false
        }
      ]
     const products1 = [
        { Prodve: "Maraîchage", surf: "", nbrparc: "", situation: "" },
        { Prodve: "Céréales", surf: "", nbrparc: "", situation: "" },
        { Prodve: "Arboriculture", surf: "", nbrparc: "", situation: "" }
      ]


    // productions Tables 2

    const columns2 = [
        {
          dataField: "Prodve",
          text: "Productions animales",
          sort: false
        },
        {
          dataField: "nbrmer",
          text: "Nombres de têtes mères",
          sort: false
        },
        {
          dataField: "Races",
          text: "Races",
          sort: false
        },
        {
          dataField: "situation",
          text: "Conduite du cheptel : agriculture biologique, agroécologie ou agriculture conventionnelle",
          sort: false
        }
      ]
     const products2 = [
        { Prodve: "Bovins", nbrmer: "", Races: "", situation: "" },
        { Prodve: "Caprins", nbrmer: "", Races: "", situation: "" },
        { Prodve: "Ovins", nbrmer: "", Races: "", situation: "" },
        { Prodve: "Abeilles", nbrmer: "", Races: "", situation: "" },
        { Prodve: "Volailles", nbrmer: "", Races: "", situation: "" }
      ]


         // productions Tables 3

        const columns3 = [
            {
            dataField: "Prodve",
            text: "Produits transformés (exemple : fraise)",
            sort: false
            },
            {
            dataField: "type",
            text: "Types de transformation (exemple : confiture)",
            sort: false
            },
            {
            dataField: "Pourcentage",
            text: "Pourcentage de produits issus de la ferme (exemple : si 50% de sucre, 50% de fraises = 50%)",
            sort: false
            },

        ]
        const products3 = [
            { id : 1,Prodve: "", type: "", Pourcentage: "" },
            { id : 2,Prodve: "", type: "", Pourcentage: "" },
            { id : 3,Prodve: "", type: "", Pourcentage: "" },
            { id : 4,Prodve: "", type: "", Pourcentage: "" },
            { id : 5,Prodve: "", type: "", Pourcentage: "" }
        ]


           // productions Tables 4

        const columns4 = [
            {
            dataField: "Espèce",
            text: "Espèce d’arbre (ex : oliviers, grenadiers, …)",
            sort: false
            },
            {
            dataField: "nbr",
            text: "Nombre de chaque espèce",
            sort: false
            }
        ]
        const products4 = [
            { id : 1, Espèce: "", nbr: ""  },
            { id : 2,Espèce: "", nbr: "" },
            {id : 3,Espèce: "", nbr: "" },
            { id : 4, Espèce: "", nbr: "" },
            { id : 5,Espèce: "", nbr: "" }
        ]

          // productions Tables 5

          const columns5 = [
            {
            dataField: "id",
            text: "",
            sort: false
            },
            {
            dataField: "fertil",
            text: "Pour la fertilisation",
            sort: false
            },
            {
            dataField: "luttermld",
            text: "En prévention et pour lutter contre les maladies",
            sort: false
            },
            {
            dataField: "lutternoncult",
            text: "En prévention et pour lutter contre la concurrence des espèces non cultivées",
            sort: false
            } ,
            {
            dataField: "lutterravag",
            text: "En prévention et pour lutter contre les ravageurs",
            sort: false
            }
        ]
        const products5 = [
            { id: "Moyens utilisés (techniques, produits...)", fertil: "", luttermld: "" , lutternoncult: "", lutterravag: "" },
        ]


    const optionCity = [
        {
            label: "Région de Casablanca-Settat",
            options: [
                { label: "Casablanca", value: "Casablanca" },
                { label: "Mohammedia", value: "Mohammedia" },
                { label: "El Jadida", value: "El Jadida" },
                { label: "Settat", value: "Settat" }
            ]
        },
        {
            label: "Région de Rabat-Salé-Kénitra",
            options: [
                { label: "Rabat", value: "Rabat" },
                { label: "Salé", value: "Salé" },
                { label: "Kénitra", value: "Kénitra" },
                { label: "Skhirat", value: "Skhirat" }
            ]
        },
        {
            label: "Région de Marrakech-Safi",
            options: [
                { label: "Marrakech", value: "Marrakech" },
                { label: "Safi", value: "Safi" },
                { label: "Essaouira", value: "Essaouira" }
            ]
        },
        {
            label: "Région de Fès-Meknès",
            options: [
                { label: "Fès", value: "Fès" },
                { label: "Meknès", value: "Meknès" },
                { label: "Ifrane", value: "Ifrane" },
                { label: "Taza", value: "Taza" }
            ]
        },
        {
            label: "Région de Tanger-Tétouan-Al Hoceïma",
            options: [
                { label: "Tanger", value: "Tanger" },
                { label: "Tétouan", value: "Tétouan" },
                { label: "Al Hoceïma", value: "Al Hoceïma" }
            ]
        },
        {
            label: "Région de l'Oriental",
            options: [
                { label: "Oujda", value: "Oujda" },
                { label: "Nador", value: "Nador" },
                { label: "Berkane", value: "Berkane" }
            ]
        },
        {
            label: "Région de Souss-Massa",
            options: [
                { label: "Agadir", value: "Agadir" },
                { label: "Taroudant", value: "Taroudant" },
                { label: "Tiznit", value: "Tiznit" }
            ]
        },
        {
            label: "Région de Dakhla-Oued Ed-Dahab",
            options: [
                { label: "Dakhla", value: "Dakhla" }
            ]
        },
        {
            label: "Région de Laâyoune-Sakia El Hamra",
            options: [
                { label: "Laâyoune", value: "Laâyoune" },
                { label: "Boujdour", value: "Boujdour" }
            ]
        },
        {
            label: "Région de Drâa-Tafilalet",
            options: [
                { label: "Errachidia", value: "Errachidia" },
                { label: "Ouarzazate", value: "Ouarzazate" },
                { label: "Zagora", value: "Zagora" }
            ]
        },
        {
            label: "Région de Béni Mellal-Khénifra",
            options: [
                { label: "Béni Mellal", value: "Béni Mellal" },
                { label: "Khénifra", value: "Khénifra" },
                { label: "Fquih Ben Salah", value: "Fquih Ben Salah" }
            ]
        },
        {
            label: "Région de Guelmim-Oued Noun",
            options: [
                { label: "Guelmim", value: "Guelmim" },
                { label: "Tan-Tan", value: "Tan-Tan" }
            ]
        }
    ];

    const Days = [
        { value: "Flexible", label: "Flexible" },
        { value: "Lundi", label: "Lundi" },
        { value: "Mardi", label: "Mardi" },
        { value: "Mercredi", label: "Mercredi" },
        { value: "Jeudi", label: "Jeudi" },
        { value: "Vendredi", label: "Vendredi" },
        { value: "Samedi", label: "Samedi" },
        { value: "Dimanche", label: "Dimanche" },
      ];

    const toggleTab = (tab) => {
        if (activeTab !== tab && tab >= 1 && tab <= 4) {
            setActiveTab(tab);
        }
    };


    const handlechangeProductions1 = (data) =>{
        setproduction1(data)
    }

    const handlechangeProductions2 = (data) =>{
        setproduction2(data)
    }

    const handlechangeProductions3 = (data) =>{
        setproduction3(data)
        console.log(data)
    }

    const handlechangearbo = (data) =>{
        setarboric(data)
    }

    const handlechangePratique = (data) =>{
        setpratiques(data)
    }




    const  handleSelectCity = async (selectedGroup) => {
		setselectedCity(selectedGroup);
	};

    const handlechangeDays = (value) =>{
        console.log(value)
        const DaySelected = value.map(item => item.value);
        console.log(DaySelected)
        setDaysSelected(DaySelected)
    }

    const handleAcceptedFiles = (files) => {
        const updatedFiles = files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            htmlFormattedSize: file.size,
          })
        );
        setuploadsFiles(updatedFiles);
    };

    const htmlFormatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      };

    const handleClickNext = async () =>{

        toggleTab(activeTab + 1)
        console.log({
            typedmnd,
            name_ferme,
            status_ferme,
            lieu_ferme,
            coordGps,
            personnes,
            statusexpo,
            email,
            siteweb,
            tel_princp,
            selectedCity,
            adr_princp,
            qt1,
            qt2,
            qt3,
            qt4,
            DaysSelected,
            qt5,
            qt6,
            qt7,
            qt8,
            surfaceTotal,
            surfaceTotal,
            propriété,
            copropriété,
            location,
            production1,
            production2,
            production3,
            arboric,
            pratiques,
            typeacces,
            profondeur,
            situationEau,
            décrivez,
            connaissance,
            nonsituationEau,
            uploadsFiles,
            declareHonneur
        })

        // if(fullname == "" ||  Email == "" || tel == "" ||  selectedCity.value == null  || adr_res == ""){
        //     toastr.error("Veuillez remplir tous les champs du formulaire d'informations personnelles. Merci de compléter toutes les sections du formulaire pour continuer.")
        // } else {
        //     toggleTab(activeTab + 1)
        //     if(Data['completProfile'] != 100){
        //         setprogressvalue(40)
        //     }
        // }

    }

    const handleClickSave = async () =>{
        if(adr_ferm == ""){
            toastr.error("Veuillez remplir tous les champs du formulaire d'informations de géolocalisation. Merci de compléter toutes les sections du formulaire pour enregistrer.")
        } else {
            if(Data['completProfile'] != 100){
                setprogressvalue(80)
            }
            setopenModal(true)
        }
    }




    const handleChangeInspecter = (item,value) =>{
        settypeinspecter(prevState => {
            const newState = [...prevState];
            newState[item] = value == true ? 1 : 0;
            return newState;
          });
    }

    const handleChangeformation = (item,value) =>{
        settypeformation(prevState => {
            const newState = [...prevState];
            newState[item] = value == true ? 1 : 0;
            return newState;
          });
    }

    const handlechangedeclareHonneur = (type,item,value) =>{
            setdeclareHonneur(prevState => {
                const newState = [...prevState];
                newState[item] = value == true ? 1 : 0;
                console.log(newState)
                return newState;
              });

    }

    const handleSubmit = async () =>{
        const dataDemande  = {
            typedmnd,
            name_ferme,
            status_ferme,
            lieu_ferme,
            ville,
            coordGps,
            personnes,
            statusexpo,
            email,
            siteweb,
            tel_princp,
            selectedCity,
            adr_princp,
            qt1,
            qt2,
            qt3,
            qt4,
            DaysSelected,
            qt5,
            qt6,
            qt7,
            qt8,
            surfaceTotal,
            surfaceTotal,
            copropriété,
            location,
            sitesdiff,
            production1,
            production2,
            production3,
            arboric,
            pratiques,
            typeacces,
            profondeur,
            situationEau,
            décrivez,
            connaissance,
            nonsituationEau,
            uploadsFiles,
            declareHonneur
        }
        const formData = new FormData();
        const additionalData = {
            "UserId" : Data.id,
            "type" : typedmnd,
            "nom_ferme" : name_ferme,
            "lieu_ferme" : lieu_ferme,
            "tel": tel_princp,
            "data": JSON.stringify(dataDemande)
          }

          Object.keys(additionalData).forEach((key) => {
            formData.append(key, additionalData[key]);
          });

        for (let file of uploadsFiles){


          const blobData = await fetch(URL.createObjectURL(file)).then((res) => res.blob());
          const blob = new Blob([blobData], { type: file.type });
          formData.append('files', blob, file.name);
        }
        await AddDemande(Data['token'],formData).then(res =>{
          if(res['status'] == "success"){
            toastr.success("Votre demande a été ajoutée avec succès. Merci !")
            // setSelectedFiles([])
            // setshowloading(false)
          } else {
            toastr.error("Une erreur est survenue lors de l'importation du fichier.", "Erreur!");
          }
        }).catch(err =>{
          console.log(err)
        //   setshowloading(false)
        })
    }

    const saveProfile = async () =>{

            if(calcNumberchecked(declareHonneur) == 0 ) {
                toastr.error("Merci de cocher toutes les options qui correspondent à vos engagements.")
            } else {
                const DataProfile = {
                    Data : {
                        id_user : Data['id'],
                        Tel : tel,
                        City:selectedCity.value,
                        adrs_res : adr_res,
                        adrs_ferme : adr_ferm,
                        adr_google : "gogole maps adress",
                        days_dispo : JSON.stringify(DaysSelected),
                        lat : "33.222121",
                        lang : "17.445566",
                        typeinspecter : JSON.stringify(typeinspecter),
                        typeformation : JSON.stringify(typeformation),
                        declareHonneur : JSON.stringify(declareHonneur),
                    }
                }
                await SaveProfile(Data['token'],DataProfile).then(async res =>{
                    if(res['status'] == "success"){
                        setopenModal(false)
                        await ChangeCompletProfile(Data['token'],Data['id'],100).then(async (res) =>{
                            console.log(res)
                            setprogressvalue(100)
                            Data['completProfile'] = 100
                            Data['profileUser'] = res['data']
                            await localStorage.setItem("authUser", JSON.stringify(Data));
                            toastr.success("Votre profil a été ajouté avec succès.")
                        }).catch(err =>{
                            toastr.error("Erreur d'ajoute du profil !")
                        })

                    }
                }).catch(err =>{
                    console.log(err)
                })
            }

    }

    const updateProfile = async () =>{
        if(adr_ferm == ""){
            toastr.error("Veuillez remplir tous les champs du formulaire d'informations de géolocalisation. Merci de compléter toutes les sections du formulaire pour enregistrer.")
        } else {
            const DataProfile = {
                Data : {
                    id_user : Data['id'],
                    Tel : tel,
                    City:selectedCity.value,
                    adrs_res : adr_res,
                    adrs_ferme : adr_ferm,
                    adr_google : "gogole maps adress",
                    days_dispo : JSON.stringify(DaysSelected),
                    lat : "33.222121",
                    lang : "17.445566",
                    typeinspecter : JSON.stringify(typeinspecter),
                    typeformation : JSON.stringify(typeformation),
                    declareHonneur : JSON.stringify(declareHonneur),
                }
            }
            await SaveProfile(Data['token'],DataProfile).then(async res =>{
                if(res['status'] == "success"){
                    setopenModal(false)
                    await ChangeCompletProfile(Data['token'],Data['id'],100).then(async (res) =>{
                        console.log(res)
                        setprogressvalue(100)
                        Data['completProfile'] = 100
                        Data['profileUser'] = res['data']
                        await localStorage.setItem("authUser", JSON.stringify(Data));
                        toastr.success("Votre profil a été mis à jour avec succès.")
                    }).catch(err =>{
                        toastr.error("Erreur de mise à jour du profil !")
                    })

                }
            })
        }
    }

    const calcNumberchecked = (array) =>{
        const countOnes = array.reduce((acc, currentValue) => {
            return acc + (currentValue === 1 ? 1 : 0);
        }, 0);
        return countOnes;
    }

    const initialOptions = DaysSelected.map(dayLabel => {
        const matchingOption = Days.find(day => day.label === dayLabel);
        return matchingOption || null;
    }).filter(Boolean);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="demande de labellisation " breadcrumbItems={[]} />

                    <Row>
                        <Col lg="12">

                            <Card>

                                <CardBody>
                                    {/* <h4 className="card-title mb-4">Basic pills Wizard</h4> */}

                                    <div id="basic-pills-wizard" className="twitter-bs-wizard">
                                        <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                                            {[1, 2, 3,4].map(tab => (
                                                <NavItem key={tab}>
                                                    <NavLink
                                                        style={{cursor: 'auto'}}
                                                        className={classnames({ active: activeTab === tab })}
                                                        // onClick={() => toggleTab(tab)}
                                                    >
                                                        <span className="step-number">0{tab}</span>
                                                        <span className="step-title">
                                                            {tab === 1 ? "Informations sur la ferme" : tab === 4 ? "Déclare m’engager sur l’honneur"  : tab === 3 ? "Pièce joints"  :   "Surface et productions" }
                                                        </span>
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </ul>

                                            {/* <Progress color="primary" value={progressvalue} >
                                                {progressvalue}%
                                            </Progress> */}

                                        <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                                            {[1, 2,3,4].map(tab => (
                                                <TabPane key={tab} tabId={tab}>
                                                    <Form>
                                                        {tab === 1 && (
                                                            <React.Fragment>
                                                                  <Row style={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>


                                                                        <div style={{margin : 10, width :"50%", display : 'flex', flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', width  : "90%", marginTop :20 }}>

                                                                                <div className="form-check mb-3 ">
                                                                                    <Input className="form-check-input" type="checkbox" value="" id="type" onChange={(e) =>{settypedmnd("Production Végétable")}} />
                                                                                    <Label className="form-check-label" htmlFor="type">
                                                                                        Production Végétable
                                                                                    </Label>
                                                                                </div>
                                                                                <div className="form-check mb-3">
                                                                                    <Input className="form-check-input" type="checkbox" value="" id="type"  onChange={(e) =>{settypedmnd("Aviculture")}} />
                                                                                    <Label className="form-check-label" htmlFor="type">
                                                                                        Aviculture
                                                                                    </Label>
                                                                                </div>
                                                                                <div className="form-check mb-3 ">
                                                                                    <Input className="form-check-input" type="checkbox" value="" id="type" onChange={(e) =>{settypedmnd("Apiculture")}} />
                                                                                    <Label className="form-check-label" htmlFor="type">
                                                                                        Apiculture
                                                                                    </Label>
                                                                                </div>

                                                                        </div>
                                                                    </Row>
                                                                <Row>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput1">Nom de la ferme</Label>
                                                                            <Input type="text" className="form-control" id="basicpillinput1" value={name_ferme} onChange={(e) =>setname_ferme(e.target.value)} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-lastname-input2">Statut de la ferme</Label>
                                                                            <Input type="text" className="form-control" id="basicpill-lastname-input2" value={status_ferme} onChange={(e) =>setstatus_ferme(e.target.value)} />
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput3">lieu de la ferme</Label>
                                                                            <Input type="text" className="form-control" id="basicpillinput3" value={lieu_ferme} onChange={(e) =>setlieu_ferme(e.target.value)}/>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-lastname-input4">Coordonnées GPS</Label>
                                                                            <Input type="text" className="form-control" id="basicpill-lastname-input4" value={coordGps} onChange={(e) =>setcoordGps(e.target.value)} />
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>

                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label style={{fontSize : 13}} className="form-label" htmlFor="basicpillinput5">Noms de toutes les personnes concernées susceptibles de répondre à l’enquête lors de la visite de ferme / de réaliser une enquête </Label>
                                                                            <Input type="text" className="form-control" id="basicpillinput5" value={personnes} onChange={(e) =>setpersonnes(e.target.value)} />
                                                                        </div>
                                                                    </Col>

                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-lastname-input6">Statut de l’exploitant (propriétaire, co-propriétaire,  gérant, bénéficiaire…)</Label>
                                                                            <Input type="text" className="form-control" id="basicpill-lastname-input6" value={statusexpo} onChange={(e) =>setstatusexpo(e.target.value)} />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>

                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label style={{fontSize : 13}} className="form-label" htmlFor="basicpillinput7">Email</Label>
                                                                            <Input type="text" className="form-control" id="basicpillinput7" value={email} onChange={(e) =>setemail(e.target.value)}/>
                                                                        </div>
                                                                    </Col>

                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-lastname-input8">Site web</Label>
                                                                            <Input type="text" className="form-control" id="basicpill-lastname-input8" value={siteweb} onChange={(e) =>setsiteweb(e.target.value)} />
                                                                        </div>
                                                                    </Col>
                                                                </Row>


                                                                <Row>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-phoneno-input7">Téléphone contact principal</Label>
                                                                            <Input type="text" className="form-control" id="basicpill-phoneno-input7" onChange={(e) =>settel_princp(e.target.value)} value={tel_princp}/>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-email-input8">Ville de résidence</Label>
                                                                            <Select
                                                                            value={selectedCity}
                                                                            onChange={handleSelectCity}
                                                                            options={optionCity}
                                                                            classNamePrefix="select2-selection"
                                                                            id="basicpill-email-input8"
                                                                            theme={(theme) => ({
                                                                                ...theme,
                                                                                borderRadius: 5,
                                                                                colors: {
                                                                                ...theme.colors,
                                                                                  text: '#6A9762',
                                                                                  primary25: 'white',
                                                                                  primary: '#6A9762',
                                                                                },
                                                                              })}
                                                                        />
                                                                        </div>
                                                                    </Col>

                                                                </Row>
                                                                {/* <Row>
                                                                    <Col lg="12">
                                                                        <div className="mb-3">
                                                                        <Label className="form-label">Êtes-vous un consommateur, un intermédiaire ou un distributeur ?</Label>
                                                                        <Select
                                                                            value={selectedGroup}
                                                                            onChange={handleSelectGroup}
                                                                            options={optionGroup}
                                                                            classNamePrefix="select2-selection"
                                                                            theme={(theme) => ({
                                                                                ...theme,
                                                                                borderRadius: 5,
                                                                                colors: {
                                                                                ...theme.colors,
                                                                                  text: '#6A9762',
                                                                                  primary25: 'white',
                                                                                  primary: '#6A9762',
                                                                                },
                                                                              })}
                                                                        />
                                                                        </div>
                                                                    </Col>

                                                                </Row> */}
                                                                <Row>
                                                                    <Col lg="12">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput9">Adresse contact principal</Label>
                                                                            <textarea id="basicpillinput9" className="form-control" rows="2" onChange={(e) =>setadr_princp(e.target.value)} value={adr_princp}></textarea>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>

                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label style={{fontSize : 13}} className="form-label" htmlFor="basicpillinput10">Depuis quand êtes-vous installés sur cette ferme ?</Label>
                                                                            <Input type="text" className="form-control" id="basicpillinput10"  value={qt1} onChange={(e) =>setQt1(e.target.value)} />
                                                                        </div>
                                                                    </Col>

                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-lastname-input11">Depuis quand produisez-vous de manière agro-écologique ? </Label>
                                                                            <Input type="text" className="form-control" id="basicpill-lastname-input11" value={qt2} onChange={(e) =>setQt2(e.target.value)} />
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>

                                                                <Col lg="6">
                                                                    <div className="mb-3">
                                                                        <Label style={{fontSize : 13}} className="form-label" htmlFor="basicpillinput12">S’il y a lieu, date de 1ère labellisation SPG ?</Label>
                                                                        <Input type="text" className="form-control" id="basicpillinput12" value={qt3} onChange={(e) =>setQt3(e.target.value)}/>
                                                                    </div>
                                                                </Col>

                                                                <Col lg="6">
                                                                    <div className="mb-3">
                                                                        <Label className="form-label" htmlFor="basicpill-lastname-input13">Avez-vous déjà participé à des visites SPG ?</Label>
                                                                        <Input type="text" className="form-control" id="basicpill-lastname-input13" value={qt4} onChange={(e) =>setQt4(e.target.value)} />
                                                                    </div>
                                                                </Col>
                                                                </Row>

                                                                <Row>

                                                                <Col lg="12">
                                                                    <div className="mb-3">
                                                                        <Label style={{fontSize : 13}} className="form-label" htmlFor="basicpillinput14">Quels sont les jours qui vous conviennent le plus pour les COLOC ?</Label>
                                                                        <Select
                                                                            classNamePrefix="select2-selection"
                                                                            placeholder="Sélectionner..."
                                                                            id="basicpillinput14"
                                                                            options={Days}
                                                                            isMulti
                                                                            onChange={handlechangeDays}
                                                                            value={initialOptions}
                                                                        />
                                                                    </div>
                                                                </Col>



                                                                </Row>
                                                                <Row>
                                                                    <Col lg="12">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput15">Comment avec vous découvert à l’agro-écologie ?</Label>
                                                                            <textarea id="basicpillinput15" className="form-control" rows="2" value={qt5} onChange={(e) =>setQt5(e.target.value)}></textarea>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col lg="12">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput16">Votre production est-elle déjà labellisée, certifiée par un organisme tiers ? Si oui lequel ?</Label>
                                                                            <textarea id="basicpillinput16" className="form-control" rows="2" value={qt6} onChange={(e) =>setQt6(e.target.value)}></textarea>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col lg="12">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput17">Où vendez-vous vos produits actuellement ?</Label>
                                                                            <textarea id="basicpillinput17" className="form-control" rows="2" value={qt7} onChange={(e) =>setQt7(e.target.value)}></textarea>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col lg="12">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput18">En moyenne combien de jours par semaine passez-vous personnellement sur la ferme ?</Label>
                                                                            <textarea id="basicpillinput18" className="form-control" rows="2" value={qt8} onChange={(e) =>setQt8(e.target.value)}></textarea>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                            </React.Fragment>
                                                        )}
                                                        {tab === 2 && (
                                                            <React.Fragment>
                                                                <Row>
                                                                    <Col lg="12">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput19">Quelle est la surface TOTALE de votre ferme en agroécologie  (en ha) ? </Label>
                                                                            <Input type="text" className="form-control" id="basicpillinput19" value={surfaceTotal} onChange={(e) =>setsurfaceTotal(e.target.value)} />
                                                                        </div>
                                                                    </Col>
                                                                    {/* ... Additional form elements for tab 2 */}
                                                                </Row>

                                                                <Row>
                                                                    <Col lg="3">
                                                                        <div className="mb-3 d-flex flex-column align-items-center">
                                                                            <Input
                                                                                type="radio"
                                                                                name="habitat"
                                                                                value="propriété"
                                                                                checked={selectedOption === "propriété"}
                                                                                onChange={() => setSelectedOption("propriété")}
                                                                            />
                                                                            <Label className="form-label mt-2">En propriété ?</Label>
                                                                        </div>
                                                                    </Col>

                                                                    <Col lg="3">
                                                                        <div className="mb-3 d-flex flex-column align-items-center">
                                                                            <Input
                                                                                type="radio"
                                                                                name="habitat"
                                                                                value="copropriété"
                                                                                checked={selectedOption === "copropriété"}
                                                                                onChange={() => setSelectedOption("copropriété")}
                                                                            />
                                                                            <Label className="form-label mt-2">En copropriété ?</Label>
                                                                        </div>
                                                                    </Col>

                                                                    <Col lg="3">
                                                                        <div className="mb-3 d-flex flex-column align-items-center">
                                                                            <Input
                                                                                type="radio"
                                                                                name="habitat"
                                                                                value="location"
                                                                                checked={selectedOption === "location"}
                                                                                onChange={() => setSelectedOption("location")}
                                                                            />
                                                                            <Label className="form-label mt-2">En location ?</Label>
                                                                        </div>
                                                                    </Col>

                                                                    <Col lg="3">
                                                                        <div className="mb-3 d-flex flex-column align-items-center">
                                                                            <Input
                                                                                type="radio"
                                                                                name="habitat"
                                                                                value="sitesdiff"
                                                                                checked={selectedOption === "sitesdiff"}
                                                                                onChange={() => setSelectedOption("sitesdiff")}
                                                                            />
                                                                            <Label className="form-label mt-2">Sur combien de sites (lieux) différents ?</Label>
                                                                        </div>
                                                                    </Col>
                                                                </Row>


                                                                <Label className="form-label" htmlFor="basicpillinput1">Productions</Label>
                                                                    <EditableTables columns={columns1} rows={products1}  type={1} handlechange={handlechangeProductions1}/>
                                                                    <EditableTables columns={columns2} rows={products2} type={1} handlechange={handlechangeProductions2}/>
                                                                    <EditableTables columns={columns3} rows={products3}  type={2} handlechange={handlechangeProductions3}/>

                                                                <Label className="form-label" htmlFor="basicpillinput1">Arboricultire</Label>

                                                                    <EditableTables columns={columns4} rows={products4}  type={2} handlechange={handlechangearbo}/>

                                                                <Label className="form-label" htmlFor="basicpillinput1">Pratiques : En quelques mots, décrivez-les</Label>
                                                                <EditableTables columns={columns5} rows={products5}  type={2} handlechange={handlechangePratique}/>


                                                                <Row>
                                                                  <Col lg="12">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput24">De quel(s) type(s) d’accès à la ressource en eau (sources, seguia, puits, forages) dispose votre ferme ou jardin et combien ?</Label>
                                                                            <Input type="text" className="form-control" id="basicpillinput24" value={typeacces}  onChange={(e) =>settypeacces(e.target.value)}/>
                                                                        </div>
                                                                  </Col>

                                                                </Row>

                                                                <Row>

                                                                <Col lg="12">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpillinput25">Quelle est la profondeur de vos puits et/ou forages ?</Label>
                                                                            <Input type="text" className="form-control" id="basicpillinput25" value={profondeur}  onChange={(e) =>setprofondeur(e.target.value)} />
                                                                        </div>
                                                                  </Col>
                                                                </Row>

                                                                 <Row>

                                                                <Col lg="12">
                                                                        <div className="mb-3" style={{display : 'flex', flexDirection : 'row'}}>
                                                                            <div style={{display : 'flex', width : "60%"}}>
                                                                                <Label className="form-label" htmlFor="basicpillinput1">Connaissez-vous la situation des ressources en eau dans votre zone ? </Label>

                                                                            </div>
                                                                            <div style={{display : 'flex', width : "40%"  }}>

                                                                                <div style={{marginRight : 15}}>
                                                                                <Input className="form-check-input" type="checkbox" value="" id="oui"  style={{marginRight : 10}}  onChange={(e) =>{setsituationEau(e.target.checked)}}/>
                                                                                <Label className="form-check-label" htmlFor="oui">
                                                                                    Oui
                                                                                </Label>
                                                                                </div>

                                                                                <div style={{marginRight : 15}}>
                                                                                <Input className="form-check-input" type="checkbox" value="" id="non" style={{marginRight : 10}}  onChange={(e) =>{setsituationEau(e.target.checked)}}  />
                                                                                <Label className="form-check-label" htmlFor="non">
                                                                                    Non
                                                                                </Label>
                                                                                </div>

                                                                            </div>


                                                                        </div>

                                                                        <div  style={{display : 'flex', flexDirection : 'row', marginTop : 15}}>
                                                                        <div style={{display : 'flex', width : "40%"}}>
                                                                                <Label className="form-label" htmlFor="basicpillinput26">Si oui, décrivez </Label>

                                                                            </div>
                                                                            <div style={{display : 'flex', width : "60%"  }}>

                                                                            <Input type="text" className="form-control" id="basicpillinput26" value={décrivez}  onChange={(e) =>setdécrivez(e.target.value)} />


                                                                            </div>
                                                                        </div>

                                                                        <div  style={{display : 'flex', flexDirection : 'row', marginTop : 15}}>
                                                                        <div style={{display : 'flex', width : "40%"}}>
                                                                                <Label className="form-label" htmlFor="basicpillinput27">Si oui, comment avez-vous pris connaissance de cela ?</Label>

                                                                            </div>
                                                                            <div style={{display : 'flex', width : "60%"  }}>

                                                                            <Input type="text" className="form-control" id="basicpillinput27" value={connaissance}  onChange={(e) =>setconnaissance(e.target.value)}/>


                                                                            </div>
                                                                        </div>
                                                                        <div  style={{display : 'flex', flexDirection : 'row', marginTop : 15}}>
                                                                        <div style={{display : 'flex', width : "40%"}}>
                                                                                <Label className="form-label" htmlFor="basicpillinput28">Si non, comment pourriez-vous le faire ?</Label>

                                                                            </div>
                                                                            <div style={{display : 'flex', width : "60%"  }}>

                                                                            <Input type="text" className="form-control" id="basicpillinput28"  value={nonsituationEau}  onChange={(e) =>setnonsituationEau(e.target.value)}/>

                                                                            </div>
                                                                        </div>
                                                                  </Col>
                                                                </Row>

                                                            </React.Fragment>
                                                        )}
                                                        {tab === 4 && (
                                                              <React.Fragment>

                                                                    <div style={{margin : 10,width :"100%",display :"flex", flexDirection : "row"}}>
                                                                        <div style={{margin : 10,width :"50%"}}>

                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={(e) =>{handlechangedeclareHonneur(1,0,e.target.checked)}}/>
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Avoir lu et compris les documents relatifs au SPG Agroécologie Maroc (charte, cahiers des charges relatifs à mes productions, règlement intérieur) et à les respecter
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck2" onChange={(e) =>{handlechangedeclareHonneur(1,1,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                Accepter de recevoir des visites, même inopinées, d’enquêteurs mandatés par le RIAM pour vérifier la conformité de mes pratiques vis-à-vis de la charte et des cahiers des charges du SPG Agroécologie Maroc
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck3" onChange={(e) =>{handlechangedeclareHonneur(1,2,e.target.checked)}}/>
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                M’être acquitté(e) des frais d’adhésion et des frais de labellisation SPG
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck3" onChange={(e) =>{handlechangedeclareHonneur(1,3,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                Respecter l’obligation de réserve (aucune déclaration à des tiers) liée à ma fonction de membre du SPG Agroécologie Maroc, à savoir, ne faire aucune déclaration à des tiers ni porter de jugement public sur les avis et délibérations du COLOC ou du CONAT ou sur la teneur des visites d'enquêtes.
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck4"onChange={(e) =>{handlechangedeclareHonneur(1,4,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Accepter de signaler sans délais tout changement majeur sur ma ferme qui pourrait porter atteinte à cet engagement
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck5" onChange={(e) =>{handlechangedeclareHonneur(1,5,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                Agir en mon âme et conscience et en toute objectivité, lors des enquêtes et dans l’instruction des dossiers soumis au COLOC ou au CONAT hors de toute notion de concurrence économique et commerciale pouvant me concerner (concurrence éventuelle avec l’opérateur dont le dossier est étudié).
                                                                                </Label>
                                                                            </div>
                                                                    </div>

                                                                    <div style={{margin : 10,width :"50%"}}>

                                                                            <div className="form-check mb-3 ">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck6" onChange={(e) =>{handlechangedeclareHonneur(1,6,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Respecter la vision commune du Système Participatif de Garantie Agroécologie Maroc du RIAM : le niveau de référence est défini par la charte et les cahiers des charges, et l’attribution du label se fait sur la base des critères des cahiers des charges. Cependant, ceux-ci reposent autant sur le respect des règles techniques que sur les moyens mis en œuvre pour y parvenir. La recherche continue de pistes d’amélioration des pratiques est privilégiée afin de tendre vers plus de cohérence.
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck7"  onChange={(e) =>{handlechangedeclareHonneur(1,7,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                Préciser en toute transparence aux consommateurs si je commercialise un produit non labellisé SPG Agroécologie Maroc.                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check mb-3 ">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck8" onChange={(e) =>{handlechangedeclareHonneur(1,8,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Respecter la charte graphique du SPG Agroécologie Maroc et n’imprimer le logo qu’à partir du fichier fourni par la Commission Nationale SPG RIAM</Label>
                                                                            </div>
                                                                            <div className="form-check mb-3 ">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck8" onChange={(e) =>{handlechangedeclareHonneur(1,9,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Avoir compris et accepter que le RIAM se réserve le droit de m’exclure du SPG Agroécologie Maroc et de me retirer l’utilisation du label si je ne respectes pas les engagements ou pour toute autre information trompeuse qui pourrait compromettre la réputation du label et l’organisation du RIAM </Label>
                                                                            </div>

                                                                    </div>
                                                                    </div>



                                                            </React.Fragment>
                                                         )}
                                                            {tab === 3 && (
                                                              <React.Fragment>

                                                                    <Row>
                                                                            <Col xs={12}>


                                                                                    <Form>
                                                                                    <Dropzone
                                                                                        onDrop={acceptedFiles =>
                                                                                        handleAcceptedFiles(acceptedFiles)
                                                                                        }
                                                                                    >
                                                                                        {({ getRootProps, getInputProps }) => (
                                                                                        <div className="dropzone">
                                                                                            <div
                                                                                            className="dz-message needsclick"
                                                                                            {...getRootProps()}
                                                                                            >
                                                                                            <input {...getInputProps()} />
                                                                                            <div className="mb-3">
                                                                                                <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                                                                            </div>
                                                                                            <h4>Déposez les fichiers ici ou cliquez pour les télécharger.</h4>
                                                                                            </div>
                                                                                        </div>
                                                                                        )}
                                                                                    </Dropzone>
                                                                                    <div
                                                                                        className="dropzone-previews mt-3"
                                                                                        id="file-previews"
                                                                                    >
                                                                                        {uploadsFiles.map((f, i) => {
                                                                                        return (
                                                                                            <Card
                                                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                                            key={i + "-file"}
                                                                                            >
                                                                                            <div className="p-2">
                                                                                                <Row className="align-items-center">

                                                                                                <Col>
                                                                                                    <Link
                                                                                                    to="#"
                                                                                                    className="text-muted fw-bold"
                                                                                                    >
                                                                                                    {f.name}
                                                                                                    </Link>
                                                                                                    <p className="mb-0">
                                                                                                    <strong>{f.formattedSize}</strong>
                                                                                                    </p>
                                                                                                </Col>
                                                                                                </Row>
                                                                                            </div>
                                                                                            </Card>
                                                                                        );
                                                                                        })}
                                                                                    </div>
                                                                                    </Form>



                                                                            </Col>
                                                                            </Row>

                                                                </React.Fragment>
                                                            )}
                                                         {/* <Modal
                                                            size="xl"
                                                            isOpen={openmodal}
                                                            toggle={() =>{setopenModal(false)}}
                                                            >
                                                            <ModalHeader >
                                                             Déclare m’engager sur l’honneur à
                                                            </ModalHeader>
                                                            <ModalBody>
                                                            <React.Fragment>

                                                                    <div style={{margin : 10,width :"100%",display :"flex", flexDirection : "row"}}>
                                                                        <div style={{margin : 10,width :"50%"}}>
                                                                            <Label className="form-label">
                                                                                Options à sélectionner
                                                                            </Label>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={(e) =>{handlechangedeclareHonneur(1,0,e.target.checked)}}/>
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Avoir lu et compris les documents relatifs au SPG Agroécologie Maroc (charte, cahiers des charges relatifs aux différentes productions, règlement intérieur) et à les respecter
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck2" onChange={(e) =>{handlechangedeclareHonneur(1,1,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                Faire des visites, même inopinées, d’enquêteurs mandatés par le RIAM pour vérifier la conformité de      leurs pratiques vis-à-vis de la charte et des cahiers des charges du SPG Agroécologie Maroc
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck3" onChange={(e) =>{handlechangedeclareHonneur(1,2,e.target.checked)}}/>
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                    Accepter de participer à deux enquêtes annuelles de labellisation dans des fermes du réseau
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck3" onChange={(e) =>{handlechangedeclareHonneur(1,3,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                M’être acquitté(e) des frais d’adhésion au RIAM
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck4"onChange={(e) =>{handlechangedeclareHonneur(1,4,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Respecter l’obligation de réserve (aucune déclaration à des tiers) sur la teneur des enquêtes ou des avis du comité local du label
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck5" onChange={(e) =>{handlechangedeclareHonneur(1,5,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                Respecter la charte graphique du SPG Agroécologie Maroc et n’imprimer le logo qu’à partir du fichier fourni par la Commission Nationale SPG RIAM
                                                                                </Label>
                                                                            </div>
                                                                    </div>

                                                                    <div style={{margin : 10,width :"50%"}}>
                                                                            <Label className="form-label">
                                                                                 M’engage par ailleurs à :
                                                                            </Label>
                                                                            <div className="form-check mb-3 ">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck6" onChange={(e) =>{handlechangedeclareHonneur(2,0,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Respecter l’obligation de réserve liée à ma fonction de membre du SPG Agroécologie Maroc, à savoir, ne faire aucune déclaration à des tiers ni porter de jugement public sur les avis et délibérations du COLOC ou du CONAT
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck7"  onChange={(e) =>{handlechangedeclareHonneur(2,1,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                Agir en mon âme et conscience et en toute objectivité, lors des enquêtes et dans l’instruction des dossiers soumis au COLOC ou au CONAT hors de toute notion de concurrence économique et commerciale pouvant me concerner (concurrence éventuelle avec l’opérateur dont le dossier est étudié).                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check mb-3 ">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck8" onChange={(e) =>{handlechangedeclareHonneur(2,2,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Respecter la vision commune du Système Participatif de Garantie Agroécologie Maroc du RIAM : le niveau de référence est défini par la charte et les cahiers des charges, et l’attribution du label se fait sur la base des critères des cahiers des charges. Cependant, ceux-ci reposent autant sur le respect des règles techniques que sur les moyens mis en œuvre pour y parvenir. La recherche continue de pistes d’amélioration des pratiques est privilégiée afin de tendre vers plus de cohérence.                                                                                </Label>
                                                                            </div>

                                                                    </div>
                                                                    </div>
                                                                    <div style={{display : 'flex', alignItems : 'center' , justifyContent : 'center'}}>
                                                                    <Button
                                                                        type="button"
                                                                        color="primary" className="waves-effect waves-light"
                                                                        onClick={saveProfile}
                                                                    >
                                                                        Enregistrer
                                                                    </Button>
                                                                    </div>


                                                            </React.Fragment>
                                                            </ModalBody>
                                                            </Modal> */}

                                                        {/* {tab === 4 && (
                                                            <React.Fragment>
                                                                <div className="row justify-content-center">
                                                                    <Col lg="6">
                                                                        <div className="text-center">
                                                                            <div className="mb-4">
                                                                                <i className="mdi mdi-check-circle-outline text-success display-4"></i>
                                                                            </div>
                                                                            <div>
                                                                                <h5>Confirm Detail</h5>
                                                                                <p className="text-muted">If several languages coalesce, the grammar of the resulting</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </div>
                                                            </React.Fragment>
                                                        )} */}
                                                    </Form>
                                                </TabPane>
                                            ))}
                                        </TabContent>
                                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                                            <li className={activeTab === 1 ? "previous disabled" : "previous"}>
                                                <Link to="#" onClick={() => toggleTab(activeTab - 1)}>Précédent</Link>
                                            </li>
                                            {activeTab === 4 ?
                                                    <li className={"next"}>
                                                        <Link to="#" onClick={handleSubmit}>Enregistrer</Link>
                                                    </li>
                                            :
                                            <li className={(activeTab === 4) ? "next disabled" : "next"}>
                                                <Link to="#" onClick={handleClickNext}>Suivant</Link>
                                            </li>
                                            }
                                        </ul>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Profile;
