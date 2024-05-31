import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Card, CardBody, Container, TabContent, TabPane, Collapse, NavLink, NavItem, Nav, Row, Col, Label, Input, Button } from "reactstrap";
import { products, } from "../../common/data/ecommerce";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import { GetlisteMembers, SaveEvaluateMember } from '../../services/MembersServices/Api';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import classnames from "classnames";
import { UpdateMemeberProfile } from "../../services/ProfileServices/Api";
import { DownloadDmFile, GetliseDemandes } from "../../services/DemandeLabServices/Api";
import FileItem from '../../components/FileItem/item'
import { DownloadFile } from "../../services/FilesServices/Api";
import EditableTables from "../Tables/EditableTables";
import { PostAvis } from "../../services/AvisServices/Apis";

const DemandeLabList = () => {
    const [modalUpdateIsOpen, setmodalUpdateIsOpen] = useState(false)
    const [members, setmembers] = useState([])
    const [User, setUser] = useState()
    const [dropdownValues, setDropdownValues] = useState({});
    const [openmodal, setopenModal] = useState(false)
    const [activeTabJustify, setactiveTabJustify] = useState("1")
    const [activeTabJustifyAvis, setactiveTabJustifyAvis] = useState(1)
    const [memberSelected, setmemberSelected] = useState()
    const [fullname, setfullname] = useState("")
    const [tel, settel] = useState("")
    const [adr_res, setadr_res] = useState("")
    const [adr_ferm, setadr_ferm] = useState("")
    const [Email, setEmail] = useState()
    const [DaysSelected, setDaysSelected] = useState([])
    const [openmodalevaluate, setopenmodalevaluate] = useState(false)
    const [evaluatYear, setevaluatYear] = useState('')
    const [evaluatCmnt, setevaluatCmnt] = useState('')
    const [ArrayShow, setArrayShow] = useState(1)
    const [DemandeDetails, setDemandeDetails] = useState({})
    const Data = JSON.parse(localStorage.getItem("authUser"))
    const [nomprod, setnomprod] = useState('')
    const [coordGPS, setcoordGPS] = useState('')
    const [lieuFerme, setlieuFerme] = useState('')
    const [Nomsenquets, setNomsenquets] = useState('')
    const [Avis1, setAvis1] = useState({ coloc: "", conat: "" })
    const [Avis2, setAvis2] = useState({ coloc: "", conat: "" })
    const [Avis3, setAvis3] = useState({ coloc: "", conat: "" })
    const [Avis4, setAvis4] = useState({ coloc: "", conat: "" })
    const [CmntColoc, setCmntColoc] = useState("")
    const [dateConat, setdateConat] = useState('')
    const [CmntConat, setCmntConat] = useState('')













    const handleClickDemande = (demande) => {
        console.log(demande)

        setactiveTabJustify("1")
        setopenModal(true)

        setDemandeDetails(JSON.parse(demande.data))
        console.log(JSON.parse(demande.data))

        setmemberSelected(demande)
        //   setEmail(member?.email)
        //   setfullname(member?.NomComplet)
        //   settel(member?.profile?.Tel)
        //   setselectedCity({label: member?.profile?.City, value: member?.profile?.City})
        //   setadr_res(member?.profile?.adrs_res)
        //   setDaysSelected( member?.profile?.days_dispo ? JSON.parse(member?.profile?.days_dispo) : [])
        //   setadr_ferm(member?.profile?.adrs_ferme)


    }

    const toggleCustomJustified = (tab) => {
        setactiveTabJustify(tab)
    }

    const toggleCustomJustifiedavis = (tab) => {
        setactiveTabJustifyAvis(tab)
    }

    const shownextTable = () => {
        if (ArrayShow < 5) {
            setArrayShow(prevValue => prevValue + 1);
        }
    }

    const showpreviousTable = () => {
        if (ArrayShow > 1) {
            setArrayShow(prevValue => prevValue - 1);
        }
    }


    const handleDownloadFile = async (filename) => {
        try {
            const response = await DownloadDmFile(filename, Data.token);
            console.log(response)
            const blobData = response.data;

            // Create a blob URL
            const url = window.URL.createObjectURL(blobData);

            // Create an anchor element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);

            // Trigger a click on the link to start the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);

            // Revoke the blob URL to free up resources
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleClickNext = async () => {

        setactiveTabJustifyAvis(activeTabJustifyAvis + 1)
        console.log(nomprod + " " + coordGPS + " " + lieuFerme + " " + Nomsenquets)

        console.log(Avis1)
        console.log(Avis2)
        console.log(Avis3)
        console.log(Avis4)


    }








    const columns = useMemo(
        () => [
            {
                Header: "Type",
                accessor: "type",
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Nom de la ferme",
                accessor: "NameFerme",
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Lieu de la ferme",
                accessor: "LieuFerme",
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Téléphone",
                accessor: "tel",
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Date d'ajoute",
                accessor: "timeadd",
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Évaluation",
                accessor: "Evaluation",
                disableFilters: true,
                filterable: false,
            },
        ],
    );

    useEffect(() => {
        const Data = JSON.parse(localStorage.getItem("authUser"))
        setUser(Data)


        const GetData = async () => {
            await GetliseDemandes(Data.token).then(res => {
                console.log(res['data'])
                setmembers(res['data'])

            }).catch(err => {
                console.log(err)
            })
        }
        GetData()
    }, [])

    const handleClickEvaluate = (member) => {
        console.log(member)
        setmemberSelected(member)
        setopenmodalevaluate(true)
    }

    const handlePostAvis = async () => {
        const FormData = {
            dm_id: memberSelected.id,
            user_id: Data.id,
            member_id: memberSelected.UserId,
            Nom_Prod: nomprod,
            CoordGps: coordGPS,
            lieu_ferme: lieuFerme,
            type_enquet: Nomsenquets,
            Avis_favorable: JSON.stringify(Avis1),
            Avis_favorable_ameli: JSON.stringify(Avis2),
            Avis_dfavorable: JSON.stringify(Avis3),
            Avis_dfavorable_mesur: JSON.stringify(Avis4),
            Cmnt_coloc: JSON.stringify(CmntColoc),
            Date_conat: dateConat,
            Cmnt_conat: CmntConat
        }
        console.log(FormData)

        await PostAvis(Data.token, FormData).then(res => {
            console.log(res)
            if (res['status'] == "success") {
                setopenmodalevaluate(false)
                toastr.success("Avis du Comité local et du Comité national  était bien ajouté")

            }
        }).catch(err => {
            toastr.error("Erreur d'envoi. Merci de réessayer plus tard")

        })
    }

    const handlechangeCmntColoc = (data) => {
        setCmntColoc(data)
    }







    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs
                        title="Demandes labellisation"
                        breadcrumbItems={[]}
                    />

                    <Card>
                        <CardBody>
                            <TableContainer
                                columns={columns || []}
                                data={members || []}
                                isPagination={false}
                                // isGlobalFilter={false}
                                iscustomPageSize={false}
                                isBordered={false}
                                customPageSize={10}
                                // openModalUpdate={openModal}
                                // isAddOptions={true}
                                handleClickRow={handleClickDemande}
                                dropdownData={dropdownValues}
                                userData={User}
                                handleClickEvaluate={handleClickEvaluate}
                            />
                        </CardBody>
                    </Card>
                    <Modal
                        size="xl"
                        isOpen={openmodal}
                        toggle={() => { setopenModal(false) }}
                    >
                        <ModalHeader >
                            Details de la demande
                        </ModalHeader>
                        <ModalBody>
                            <Nav tabs className="nav-tabs-custom nav-justified">
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTabJustify === "1"
                                        })}
                                        onClick={() => {
                                            toggleCustomJustified("1");
                                        }}
                                    >
                                        <span className="d-none d-sm-block">Informations sur la ferme</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTabJustify === "2"
                                        })}
                                        onClick={() => {
                                            toggleCustomJustified("2");
                                        }}
                                    >
                                        <span className="d-none d-sm-block">Surface et productions</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTabJustify === "3"
                                        })}
                                        onClick={() => {
                                            toggleCustomJustified("3");
                                        }}
                                    >
                                        <span className="d-none d-sm-block">Pièce joints</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </ModalBody>
                        <TabContent activeTab={activeTabJustify}>
                            <TabPane tabId="1" className="p-3">
                                <React.Fragment>
                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-firstname-input1">Type : </Label>
                                                <span style={{ marginLeft: 10 }}>{DemandeDetails['typedmnd'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-lastname-input2">Nom de la ferme : </Label>
                                                <span style={{ marginLeft: 10 }}>{DemandeDetails['name_ferme'] || '-'} </span>

                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-phoneno-input3">Statut de la ferme : </Label>
                                                <span style={{ marginLeft: 10 }}>{DemandeDetails['status_ferme'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-phoneno-input3">Téléphone contact principal : </Label>
                                                <span style={{ marginLeft: 10 }}>{DemandeDetails['tel_princp'] || '-'}</span>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">lieu de la ferme : </Label>
                                                <span style={{ marginLeft: 10 }}>{DemandeDetails['lieu_ferme'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Coordonnées GPS : </Label>
                                                <span style={{ marginLeft: 10 }}>{DemandeDetails['coordGps'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Email : </Label>
                                                <span style={{ marginLeft: 10 }}>{DemandeDetails['email'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Site web : </Label>
                                                <span style={{ marginLeft: 10 }}>{DemandeDetails['siteweb'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Ville de résidence : </Label>
                                                <span style={{ marginLeft: 10 }}>{DemandeDetails['ville'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Statut de l’exploitant (propriétaire, co-propriétaire,  gérant, bénéficiaire…) : </Label>
                                                <span >{DemandeDetails['statusexpo'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="12">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Noms de toutes les personnes concernées susceptibles de répondre à l’enquête lors de la visite de ferme / de réaliser une enquête  : </Label>
                                                <span>{DemandeDetails['personnes'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Adresse contact principal  : </Label>
                                                <span>{DemandeDetails['adr_princp'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Quels sont les jours qui vous conviennent le plus pour les COLOC ?  : </Label>
                                                <span>{DemandeDetails['DaysSelected'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Depuis quand êtes-vous installés sur cette ferme ? : </Label>
                                                <span >{DemandeDetails['qt1'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Depuis quand produisez-vous de manière agro-écologique ?  : </Label>
                                                <span >{DemandeDetails['qt2'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">S’il y a lieu, date de 1ère labellisation SPG ? : </Label>
                                                <span >{DemandeDetails['qt3'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Avez-vous déjà participé à des visites SPG ?  : </Label>
                                                <span >{DemandeDetails['qt4'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Comment avec vous découvert à l’agro-écologie ? : </Label>
                                                <span >{DemandeDetails['qt5'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Votre production est-elle déjà labellisée, certifiée par un organisme tiers ? : </Label>
                                                <span >{DemandeDetails['qt6'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Où vendez-vous vos produits actuellement ? : </Label>
                                                <span  >{DemandeDetails['qt7'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3 d-flex flex-column ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">En moyenne combien de jours par semaine passez-vous personnellement sur la ferme ? : </Label>
                                                <span >{DemandeDetails['qt8'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                </React.Fragment>
                            </TabPane>
                            <TabPane tabId="2" className="p-3">
                                <React.Fragment>
                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3 ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Quelle est la surface TOTALE de votre ferme en agroécologie  (en ha) ? : </Label>
                                                <span style={{ marginLeft: 10 }} >{DemandeDetails['surfaceTotal'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3 ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Sur combien de sites (lieux) différents ? : </Label>
                                                <span style={{ marginLeft: 10 }} >{DemandeDetails['sitesdiff'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex flex-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >

                                        <Col lg="1" onClick={showpreviousTable}>
                                            <img src={require('../../assets/icons/previous.png')} style={{ height: 50 }} />
                                        </Col>

                                        <Col className="table-responsive" lg="10">
                                            {ArrayShow == 1 &&
                                                <div className="table-responsive">
                                                    <Label>Productions</Label>
                                                    <Table bordered className="mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Productions végétales</th>
                                                                <th>Nombre de parcelles</th>
                                                                <th>Situation des parcelles : agriculture biologique, agroécologie ou agriculture conventionnelle</th>
                                                                <th>Surface totale (Ha)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {DemandeDetails['production1'] ? DemandeDetails['production1']?.map((item, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.Prodve}</td>
                                                                        <td>{item.nbrparc}</td>
                                                                        <td>{item.situation}</td>
                                                                        <td>{item.surf}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                                :
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            }


                                            {ArrayShow == 2 &&
                                                <div className="table-responsive">
                                                    <Label>Productions</Label>
                                                    <Table bordered className="mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Productions animales</th>
                                                                <th>Nombres de têtes mères</th>
                                                                <th>Races</th>
                                                                <th>Conduite du cheptel : agriculture biologique, agroécologie ou agriculture conventionnelle</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {DemandeDetails['production2'] ? DemandeDetails['production2']?.map((item, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.Prodve}</td>
                                                                        <td>{item.nbrmer}</td>
                                                                        <td>{item.Races}</td>
                                                                        <td>{item.situation}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                                :
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>

                                                            }
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            }

                                            {ArrayShow == 3 &&
                                                <div className="table-responsive">
                                                    <Label>Productions</Label>
                                                    <Table bordered className="mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Produits transformés (exemple : fraise)</th>
                                                                <th>Types de transformation (exemple : confiture)</th>
                                                                <th>Pourcentage de produits issus de la ferme (exemple : si 50% de sucre, 50% de fraises = 50%)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {DemandeDetails['production3'] ? DemandeDetails['production3']?.map((item, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.Prodve}</td>
                                                                        <td>{item.type}</td>
                                                                        <td>{item.Pourcentage}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                                :
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>

                                                            }
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            }

                                            {ArrayShow == 4 &&

                                                <div className="table-responsive">
                                                    <Label>Arboricultire</Label>
                                                    <Table bordered className="mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Espèce d’arbre (ex : oliviers, grenadiers, …)</th>
                                                                <th>Nombre de chaque espèce</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {DemandeDetails['arboric'] ? DemandeDetails['arboric']?.map((item, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.Espèce}</td>
                                                                        <td>{item.nbr}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                                :
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            }

                                            {ArrayShow == 5 &&
                                                <div className="table-responsive">
                                                    <Label>Productions</Label>
                                                    <Table bordered className="mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>Pour la fertilisation</th>
                                                                <th>En prévention et pour lutter contre les maladies</th>
                                                                <th>En prévention et pour lutter contre la concurrence des espèces non cultivées</th>
                                                                <th>En prévention et pour lutter contre les ravageurs</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {DemandeDetails['pratiques'] ? DemandeDetails['pratiques']?.map((item, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>Moyens utilisés (techniques, produits...)</td>
                                                                        <td>{item.fertil}</td>
                                                                        <td>{item.luttermld}</td>
                                                                        <td>{item.lutternoncult}</td>
                                                                        <td>{item.lutterravag}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                                :
                                                                <tr>
                                                                    <td>Moyens utilisés (techniques, produits...)</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            }



                                        </Col>

                                        <Col lg="1" onClick={shownextTable}>
                                            <img src={require('../../assets/icons/next.png')} style={{ height: 50 }} />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: 20 }}>
                                        <Col lg="6">
                                            <div className="mb-3 ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">De quel(s) type(s) d’accès à la ressource en eau (sources, seguia, puits, forages) dispose votre ferme ou jardin et combien ? : </Label>
                                                <span>{DemandeDetails['typeacces'] || '-'}</span>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3 ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Quelle est la profondeur de vos puits et/ou forages ? : </Label>
                                                <span style={{ marginLeft: 10 }} >{DemandeDetails['profondeur'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="12">
                                            <div className="mb-3 ">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Connaissez-vous la situation des ressources en eau dans votre zone ? : </Label>
                                                <span>{DemandeDetails['situationEau'] || '-'}</span>
                                            </div>
                                        </Col>
                                    </Row>


                                </React.Fragment>
                            </TabPane>
                            <TabPane tabId="3" className="p-3">
                                {/* <div style={{display : 'flex', flexDirection : 'column'}}>
                        {DemandeDetails['uploadsFiles']?.map((item,index) =>{
                            return(
                                <span>{item.path}</span>
                            )
                        })}
                        </div> */}
                                <Col lg={12}>

                                    <Card>
                                        <CardBody>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                // backgroundColor : '#FAFAF9',
                                                borderRadius: 5,
                                                marginTop: 10,
                                                marginBottom: 10,
                                                // borderWidth : 1,
                                                // borderStyle : "solid",
                                                // borderColor: "#F3F3F3",
                                                padding: 10
                                            }} >
                                                <div style={{ width: "70%", display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold', alignItems: 'flex-start' }}>
                                                    <span>
                                                        Nom fichier
                                                    </span>
                                                </div>
                                                {/* <div style={{width : "40%", display : 'flex', justifyContent : "flex-start"}}>
                            <span>
                            </span>
                        </div> */}
                                                {/* <div style={{width : "20%",display : 'flex', alignItems : 'center', justifyContent : 'center', fontWeight : 'bold'}}>
                            <span>
                            Auteur
                            </span>
                        </div> */}
                                                <div style={{ width: "20%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                    <span>
                                                        Taille fichier
                                                    </span>
                                                </div>
                                                <div style={{ width: "10%", cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                    <span>Telecharger</span>

                                                </div>
                                            </div>

                                            {DemandeDetails['uploadsFiles']?.map((item, index) => {
                                                return (
                                                    <FileItem
                                                        Filename={item.path}
                                                        FilePath={item.path}
                                                        filesize={item.htmlFormattedSize}
                                                        key={index}
                                                        handleDownload={handleDownloadFile}
                                                    />
                                                )
                                            })}

                                        </CardBody>
                                    </Card>
                                </Col>


                            </TabPane>


                        </TabContent>

                    </Modal>

                    <Modal
                        size="xl"
                        isOpen={openmodalevaluate}
                        toggle={() => { setopenmodalevaluate(false) }}
                    >
                        <ModalHeader >
                            Avis du Comité local et du Comité national
                        </ModalHeader>

                        <ModalBody>
                            <div id="basic-pills-wizard" className="twitter-bs-wizard">
                                <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                                    {[1, 2, 3].map(tab => (
                                        <NavItem key={tab}>
                                            <NavLink
                                                style={{ cursor: 'auto' }}
                                                className={classnames({ active: activeTabJustifyAvis === tab })}
                                            // onClick={() => toggleTab(tab)}
                                            >
                                                <span className="step-number">0{tab}</span>
                                                <span className="step-title">
                                                    {tab === 1 ? "Informations du producteur" : tab === 2 ? "Date du COLOC" : "Commentaires du COLOC / CONAT"}
                                                </span>
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </ul>
                            </div>
                            {/* <Nav tabs className="nav-tabs-custom nav-justified">
					<NavItem>
						<NavLink
							style={{ cursor: "pointer" }}
							className={classnames({
								active: activeTabJustifyAvis === "1"
							})}
							onClick={() => {
                                toggleCustomJustifiedavis("1");
							}}
						>
							<span className="d-none d-sm-block">Informations du producteur</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							style={{ cursor: "pointer" }}
							className={classnames({
								active: activeTabJustifyAvis === "2"
							})}
							onClick={() => {
								toggleCustomJustifiedavis("2");
							}}
						>
							<span className="d-none d-sm-block">Date du COLOC</span>
						</NavLink>
					</NavItem>
                    <NavItem>
						<NavLink
							style={{ cursor: "pointer" }}
							className={classnames({
								active: activeTabJustifyAvis === "3"
							})}
							onClick={() => {
								toggleCustomJustifiedavis("3");
							}}
						>
							<span className="d-none d-sm-block">Pièce joints</span>
						</NavLink>
					</NavItem>
				</Nav> */}

                            <TabContent activeTab={activeTabJustifyAvis}>
                                <TabPane tabId={1} className="p-3">
                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Nom du producteur</Label>
                                                <Input type="text" className="form-control" id="basicpill-phoneno-input3" onChange={(e) => setnomprod(e.target.value)} value={nomprod} />
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Coordonnées GPS</Label>
                                                <Input type="text" className="form-control" id="basicpill-phoneno-input3" onChange={(e) => setcoordGPS(e.target.value)} value={coordGPS} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="12">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">lieu de la ferme</Label>
                                                <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setlieuFerme(e.target.value)} value={lieuFerme}></textarea>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="12">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Noms des enquêteurs et indiquez le type d’enquêteurs (Producteur, Consommateur, intermédiaire, Expert)</Label>
                                                <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setNomsenquets(e.target.value)} value={Nomsenquets}></textarea>
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId={2} className="p-3">

                                    <Row>
                                        <Col lg="12" className="d-flex justify-content-center align-items-center flex-column">
                                            <Row lg="12">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis favorable à l’utilisation du label </Label>
                                                </div>
                                            </Row>

                                            <Row className="d-flex justify-content-center align-items-center flex-row" style={{ width: "100%" }}>
                                                <Col lg="6" className=" d-flex justify-content-center align-items-center flex-column" >
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis COLOC </Label>
                                                    <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setAvis1({ ...Avis1, coloc: e.target.value })} value={Avis1['coloc']}></textarea>
                                                </Col>
                                                <Col lg="6" className=" d-flex justify-content-center align-items-center flex-column" >
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis CONAT </Label>
                                                    <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setAvis1({ ...Avis1, conat: e.target.value })} value={Avis1['conat']}></textarea>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>


                                    <Row className="mt-3">
                                        <Col lg="12" className="d-flex justify-content-center align-items-center flex-column">
                                            <Row lg="12">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis favorable à l’utilisation du label avec amélioration attendue </Label>
                                                </div>
                                            </Row>

                                            <Row className="d-flex justify-content-center align-items-center flex-row" style={{ width: "100%" }}>
                                                <Col lg="6" className=" d-flex justify-content-center align-items-center flex-column" >
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis COLOC </Label>
                                                    <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setAvis2({ ...Avis2, coloc: e.target.value })} value={Avis2['coloc']}></textarea>
                                                </Col>
                                                <Col lg="6" className=" d-flex justify-content-center align-items-center flex-column" >
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis CONAT </Label>
                                                    <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setAvis2({ ...Avis2, conat: e.target.value })} value={Avis2['conat']}></textarea>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <Col lg="12" className="d-flex justify-content-center align-items-center flex-column">
                                            <Row lg="12">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis défavorable temporairement à l’utilisation du label, avec mesures rectificatives attendues </Label>
                                                </div>
                                            </Row>

                                            <Row className="d-flex justify-content-center align-items-center flex-row" style={{ width: "100%" }}>
                                                <Col lg="6" className=" d-flex justify-content-center align-items-center flex-column" >
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis COLOC </Label>
                                                    <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setAvis3({ ...Avis3, coloc: e.target.value })} value={Avis3['coloc']}></textarea>
                                                </Col>
                                                <Col lg="6" className=" d-flex justify-content-center align-items-center flex-column" >
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis CONAT </Label>
                                                    <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setAvis3({ ...Avis3, conat: e.target.value })} value={Avis3['conat']}></textarea>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <Col lg="12" className="d-flex justify-content-center align-items-center flex-column">
                                            <Row lg="12">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis défavorable à l’utilisation du label </Label>
                                                </div>
                                            </Row>

                                            <Row className="d-flex justify-content-center align-items-center flex-row" style={{ width: "100%" }}>
                                                <Col lg="6" className=" d-flex justify-content-center align-items-center flex-column" >
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis COLOC </Label>
                                                    <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setAvis4({ ...Avis4, coloc: e.target.value })} value={Avis4['coloc']}></textarea>
                                                </Col>
                                                <Col lg="6" className=" d-flex justify-content-center align-items-center flex-column" >
                                                    <Label className="form-label" htmlFor="basicpill-address-input1">Avis CONAT </Label>
                                                    <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) => setAvis4({ ...Avis4, conat: e.target.value })} value={Avis4['conat']}></textarea>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </TabPane>

                                <TabPane tabId={3} className="p-3">
                                    <EditableTables columns={
                                        [
                                            {
                                                dataField: "amelior",
                                                text: "Améliorations attendues et/ou mesures rectificatives attendues",
                                                sort: false
                                            },
                                            {
                                                dataField: "Entre",
                                                text: "Entrée en vigueur et délai",
                                                sort: false
                                            },

                                        ]
                                    } rows={
                                        [
                                            { id: 1, amelior: "", Entre: "" },
                                            { id: 2, amelior: "", Entre: "" },
                                            { id: 3, amelior: "", Entre: "" },
                                            { id: 4, amelior: "", Entre: "" },

                                        ]
                                    } type={2} handlechange={handlechangeCmntColoc} />

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Date du CONAT</Label>
                                                <Input type="text" className="form-control" id="basicpill-phoneno-input3" onChange={(e) => setdateConat(e.target.value)} value={dateConat} />
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input1">Commentaires du CONAT</Label>
                                                <Input type="text" className="form-control" id="basicpill-phoneno-input3" onChange={(e) => setCmntConat(e.target.value)} value={CmntConat} />
                                            </div>
                                        </Col>
                                    </Row>


                                </TabPane>
                            </TabContent>


                        </ModalBody>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 10, marginLeft: 30, marginRight: 30 }}>
                            <Button
                                type="button"
                                className={activeTabJustifyAvis === 1 ? "previous disabled" : "previous" + " waves-effect waves-light"}
                                color="primary"

                                onClick={() => setactiveTabJustifyAvis(activeTabJustifyAvis - 1)}
                            >
                                Précédent
                            </Button>
                            {activeTabJustifyAvis == 3 ?
                                <Button
                                    type="button"
                                    color="primary"
                                    className="waves-effect waves-light"
                                    onClick={handlePostAvis}
                                >
                                    Enregistrer
                                </Button>

                                :
                                <Button
                                    type="button"
                                    color="primary"
                                    className={activeTabJustifyAvis === 3 ? "previous disabled" : "previous" + " waves-effect waves-light"}
                                    onClick={handleClickNext}
                                >
                                    Suivant
                                </Button>
                            }
                        </div>
                    </Modal>


                </Container>
                {/* <Modal
            isOpen={modalUpdateIsOpen}
            onRequestClose={closeModal} 
            style={customStyles}
          ></Modal> */}
            </div>
        </React.Fragment>
    );
};

export default DemandeLabList;
