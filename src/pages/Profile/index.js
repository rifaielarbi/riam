import React, { useState } from "react";
import { Row, Col, Card, CardBody, TabContent, TabPane, NavItem, NavLink, Label, Input, Form, Container, Modal,ModalBody, ModalHeader,Progress, Button } from "reactstrap";
import classnames from 'classnames';
import { Link } from "react-router-dom";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Select from "react-select";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { ChangeCompletProfile, SaveProfile } from "../../services/ProfileServices/Api";

toastr.options = {
    positionClass: "toast-bottom-right",
    closeButton : true
  }

const Profile = () => {
    const Data = JSON.parse(localStorage.getItem("authUser"))
    const progressProfile = JSON.parse(localStorage.getItem("progressProfile"))
    console.log(Data['profileUser'])
    const [activeTab, setActiveTab] = useState(1);
    const [activeTabProgress, setActiveTabProgress] = useState(1);
    const [selectedGroup , setselectedGroup]  = useState('')
    const [selectedCity , setselectedCity]  = useState(Data['profileUser']?.City ?  {label: Data['profileUser']?.City, value: Data['profileUser']?.City} :  "")
    const [fullname , setfullname]  = useState(Data['fullname'])
    const [tel , settel]  = useState(Data['profileUser']?.Tel || "")
    const [adr_res , setadr_res]  = useState(Data['profileUser']?.adrs_res || "")
    const [adr_ferm , setadr_ferm]  = useState(Data['profileUser']?.adrs_ferme || "")
    const [name_ferme , setname_ferme]  = useState(Data['profileUser']?.name_ferme || "")
    const [Email, setEmail] = useState(Data['email'])
    const [DaysSelected, setDaysSelected] = useState(Data['profileUser']?.days_dispo ? JSON.parse(Data['profileUser'].days_dispo) : []);
    const [openmodal, setopenModal] = useState(false)
    const [progressvalue, setprogressvalue] =useState(Data['completProfile']);
    const [typeinspecter, settypeinspecter] = useState(Data['profileUser']?.typeinspecter? JSON.parse(Data['profileUser']?.typeinspecter) : [0,0,0])
    const [typeformation, settypeformation] = useState(Data['profileUser']?.typeformation ? JSON.parse(Data['profileUser']?.typeformation) : [0,0,0])
    const [declareHonneur, setdeclareHonneur ] = useState([0,0,0,0,0,0])
    const [declareHonneurII, setdeclareHonneurII ] = useState([0,0,0])


   

    const optionCity = [
        {
            options: [
                { label: "Casablanca", value: "Casablanca" },
                { label: "Rabat", value: "Rabat" },
                { label: "Marrakech", value: "Marrakech" },
                { label: "Fes", value: "Fes" },
                { label: "Tangier", value: "Tangier" },
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

  
    
    const  handleSelectGroup = async (selectedGroup) => {
		setselectedGroup(selectedGroup);
	};

    const  handleSelectCity = async (selectedGroup) => {
        console.log(selectedGroup)
		setselectedCity(selectedGroup);
	};

    const handlechangeDays = (value) =>{
        console.log(value)
        const DaySelected = value.map(item => item.value);
        console.log(DaySelected)
        setDaysSelected(DaySelected)
    }

    const handleClickNext = async () =>{
        if(fullname == "" ||  Email == "" || tel == "" ||  selectedCity.value == null  || adr_res == ""){
            toastr.error("Veuillez remplir tous les champs du formulaire d'informations personnelles. Merci de compléter toutes les sections du formulaire pour continuer.")
        } else {
            toggleTab(activeTab + 1)
            if(Data['completProfile'] != 100){
                setprogressvalue(40)
            }
                // await ChangeCompletProfile(Data['token'],Data['id'],40).then(async () =>{
                // await localStorage.setItem("authUser", JSON.stringify(Data));
                // })
            


        }
        // 
    }

    const handleClickSave = async () =>{
        if(adr_ferm == ""){
            toastr.error("Veuillez remplir tous les champs du formulaire d'informations de géolocalisation. Merci de compléter toutes les sections du formulaire pour enregistrer.")
        } else {
            if(Data['completProfile'] != 100){
                setprogressvalue(80)
            } 
                // await ChangeCompletProfile(Data['token'],Data['id'],80).then(async () =>{
                    // Data['completProfile'] = 80
                //     await localStorage.setItem("authUser", JSON.stringify(Data));
                // })
            
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
        if(type == 1){
            setdeclareHonneur(prevState => {
                const newState = [...prevState];
                newState[item] = value == true ? 1 : 0;
                console.log(newState)
                return newState;
              });
        } else{
            setdeclareHonneurII(prevState => {
                const newState = [...prevState];
                newState[item] = value == true ? 1 : 0;
                console.log(newState)
                return newState;
              });
        }

    }

    const saveProfile = async () =>{
        
            if(calcNumberchecked(declareHonneur) == 0|| calcNumberchecked(declareHonneurII) == 0 ) {
                toastr.error("Merci de cocher toutes les options qui correspondent à vos engagements.")
            } else {
                const DataProfile = {
                    Data : {
                        id_user : Data['id'],
                        Tel : tel,
                        City:selectedCity.value,
                        adrs_res : adr_res,
                        adrs_ferme : adr_ferm,
                        name_ferme : name_ferme,
                        adr_google : "gogole maps adress",
                        days_dispo : JSON.stringify(DaysSelected),
                        lat : "33.222121",
                        lang : "17.445566",
                        typeinspecter : JSON.stringify(typeinspecter),
                        typeformation : JSON.stringify(typeformation),
                        declareHonneur : JSON.stringify(declareHonneur),
                        declareHonneurII : JSON.stringify(declareHonneurII),
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
                    declareHonneurII : JSON.stringify(declareHonneurII),
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
                    <Breadcrumbs title="Mon profile" breadcrumbItems={[]} />

                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    {/* <h4 className="card-title mb-4">Basic pills Wizard</h4> */}

                                    <div id="basic-pills-wizard" className="twitter-bs-wizard">
                                        <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                                            {[1, 2].map(tab => (
                                                <NavItem key={tab}>
                                                    <NavLink
                                                        style={{cursor: 'auto'}}
                                                        className={classnames({ active: activeTab === tab })}
                                                        // onClick={() => toggleTab(tab)}
                                                    >
                                                        <span className="step-number">0{tab}</span>
                                                        <span className="step-title">
                                                            {tab === 1 ? "Information personnelle" :  "Géolocalisation de votre ferme" }
                                                        </span>
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </ul>
                                        
                                            <Progress color="primary" value={progressvalue} >
                                                {progressvalue}%
                                            </Progress>
                                        
                                        <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                                            {[1, 2].map(tab => (
                                                <TabPane key={tab} tabId={tab}>
                                                    <Form>
                                                        {tab === 1 && (
                                                            <React.Fragment>
                                                                <Row>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-firstname-input1">Nom et Prénom</Label>
                                                                            <Input type="text" className="form-control" id="basicpill-firstname-input1" value={fullname} onChange={(e) =>setfullname(e.target.value)}/>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-lastname-input2">Adresse e-mail</Label>
                                                                            <Input type="text" className="form-control" id="basicpill-lastname-input2" value={Email} onChange={(e) =>setEmail(e.target.value)} />
                                                                        </div>
                                                                    </Col>
                                                                    </Row>

                                                                <Row>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-phoneno-input3">Téléphone</Label>
                                                                            <Input type="text" className="form-control" id="basicpill-phoneno-input3" onChange={(e) =>settel(e.target.value)} value={tel}/>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-email-input4">Ville de résidence</Label>
                                                                            <Select
                                                                            value={selectedCity}
                                                                            onChange={handleSelectCity}
                                                                            options={optionCity}
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
                                                                            <Label className="form-label" htmlFor="basicpill-address-input1">Adresse de résidence</Label>
                                                                            <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) =>setadr_res(e.target.value)} value={adr_res}></textarea>
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
                                                                            <Label className="form-label" htmlFor="basicpill-phoneno-input3">Nom de la ferme</Label>
                                                                            <Input type="text" className="form-control" id="basicpill-phoneno-input3" onChange={(e) =>setname_ferme(e.target.value)} value={name_ferme}/>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col lg="12">
                                                                        <div className="mb-3">
                                                                            <Label className="form-label" htmlFor="basicpill-address-input1">L'adresse de votre ferme</Label>
                                                                            <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) =>{setadr_ferm(e.target.value)}} value={adr_ferm}></textarea>
                                                                        </div>
                                                                    </Col>
                                                                    {/* ... Additional form elements for tab 2 */}
                                                                </Row>
                                                                <Row>
                                                                <div className="mb-3" >
                                                                    <Label className="form-label">
                                                                    Veuillez cocher les jours de la semaine où vous serez disponibles pour effectuer les visites des fermes : 
                                                                    </Label>

                                                                        <Select
                                                                            classNamePrefix="select2-selection"
                                                                            placeholder="Sélectionner..."
                                                                            options={Days}
                                                                            isMulti
                                                                            onChange={handlechangeDays}
                                                                            value={initialOptions}
                                                                        />
                                                                    
                                                                </div>
                                                                </Row>
                                                                <Row>
                                                                <div className="mb-3" >
                                                                    <Label className="form-label">
                                                                    Veuillez cocher les types de production que vous pouvez inspecter pour vérifier si les cahiers des charges respectifs sont respectés :
                                                                    </Label>

                                                                    <Col md={5} style={{display : 'flex', flexDirection : 'row',width : "100%"}}>
                                                                    <div style={{margin : 10,width :"30%"}}>
                                                                            <div className="form-check mb-3">
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                    Je peux inspecter:			
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                    J'ai besoin de formation pour: 
                                                                                </Label>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{margin : 10,width :"30%"}}>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked={typeinspecter[0] == 1 ? true : false} onChange={(e) =>{handleChangeInspecter(0,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                    Production végétale
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck2" checked={typeformation[0] == 1 ? true : false} onChange={(e) =>{handleChangeformation(0,e.target.checked)}}  />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                Production végétale
                                                                                </Label>
                                                                            </div>
                                                                        </div>

                                                                        <div style={{margin : 10,width :"30%"}}>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked={typeinspecter[1] == 1 ? true : false} onChange={(e) =>{handleChangeInspecter(1,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                Aviculture
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck2" checked={typeformation[1] == 1 ? true : false} onChange={(e) =>{handleChangeformation(1,e.target.checked)}}  />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                Aviculture
                                                                                </Label>
                                                                            </div>
                                                                        </div>

                                                                        <div style={{margin : 10,width :"30%"}}>
                                                                            <div className="form-check mb-3">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked={typeinspecter[2] == 1 ? true : false} onChange={(e) =>{handleChangeInspecter(2,e.target.checked)}} />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                                    Apiculture
                                                                                </Label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <Input className="form-check-input" type="checkbox" value="" id="defaultCheck2" checked={typeformation[2] == 1 ? true : false} onChange={(e) =>{handleChangeformation(2,e.target.checked)}}  />
                                                                                <Label className="form-check-label" htmlFor="defaultCheck2">
                                                                                    Apiculture
                                                                                </Label>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    
                                                                </div>
                                                                </Row>
                                                            </React.Fragment>
                                                        )}
                                                         <Modal
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
                                                            </Modal>
                                                       
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
                                            {activeTab === 2 ? 
                                                Object.keys(Data['profileUser']).length == 0 ? 
                                                    <li className={"next"}>
                                                        <Link to="#" onClick={handleClickSave}>Enregistrer</Link>
                                                    </li>
                                                    :
                                                    <li className={"next"}>
                                                        <Link to="#" onClick={updateProfile}>Mise à jour</Link>
                                                    </li>
                                            : 
                                            <li className={activeTab === 2 ? "next disabled" : "next"}>
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
