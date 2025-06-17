import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Card, CardBody, Container,TabContent, TabPane, Collapse, NavLink, NavItem, Nav, Row, Col,Label, Input,Button } from "reactstrap";
import { products, } from "../../common/data/ecommerce";
import {  Modal,ModalBody, ModalHeader} from "reactstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import { GetlisteMembers, SaveEvaluateMember } from '../../services/MembersServices/Api';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import classnames from "classnames";
import { UpdateMemeberProfile } from "../../services/ProfileServices/Api";

const Members = () => {
  const [modalUpdateIsOpen,setmodalUpdateIsOpen] = useState(false)
  const [members,setmembers] = useState([])
  const [User,setUser] = useState()
  const [dropdownValues, setDropdownValues] = useState({});
  const  [openmodal, setopenModal] = useState(false)
  const [activeTabJustify,setactiveTabJustify] = useState("1")
  const [memberSelected , setmemberSelected] = useState()
  const [selectedCity , setselectedCity]  = useState("")
  const [fullname , setfullname]  = useState("")
  const [tel , settel]  = useState("")
  const [adr_res , setadr_res]  = useState("")
  const [adr_ferm , setadr_ferm]  = useState("")
  const [Email, setEmail] = useState()
  const [DaysSelected, setDaysSelected] = useState([])
  const [openmodalevaluate, setopenmodalevaluate] = useState(false)
  const [evaluatYear, setevaluatYear] = useState('')
  const [evaluatCmnt, setevaluatCmnt] = useState('')

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





  const handleClickMember = (member) =>{
    // if(member['profile']){
      console.log(member)

      setactiveTabJustify("1")
      setopenModal(true)

      setmemberSelected(member)
      setEmail(member?.email)
      setfullname(member?.NomComplet)
      settel(member?.profile?.Tel)
      setselectedCity({label: member?.profile?.City, value: member?.profile?.City})
      setadr_res(member?.profile?.adrs_res)
      setDaysSelected( member?.profile?.days_dispo ? JSON.parse(member?.profile?.days_dispo) : [])
      setadr_ferm(member?.profile?.adrs_ferme)

      console.log(member)
    // } else{
    //   toastr.warning("le membre n'a pas encourt compléter leur profil !")
    // }
  }

  const handleClickEvaluate = (member) => {
    setmemberSelected(member)
    setopenmodalevaluate(true)
  }

  const  toggleCustomJustified = (tab) => {
		setactiveTabJustify(tab)
	}

  const  handleSelectCity = async (selectedGroup) => {
    console.log(selectedGroup)
    setselectedCity(selectedGroup);
  };




  const columns = useMemo(
    () => [
      {
        Header: "Nom et Prénom",
        accessor: "NomComplet",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Email",
        accessor: "email",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Date d'adhésions",
        accessor: "DateCreation",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Accès",
        accessor: "Role",
        disableFilters: true,
        filterable: false,
      },

    ],
  );

  const Roles = [
    {
      id : 1,
      label : 'Admin'
    },
    {
      id : 2,
      label : 'Membre'
    },
    {
      id : 3,
      label : 'Consommateurs'
    },
    {
      id : 4,
      label : 'Producteur'
    },
    {
      id : 5,
      label : 'Membre du COS'
    },
    {
      id : 6,
      label : 'Membre du BE'
    },
    {
      id : 7,
      label : 'Candidat'
    },
    {
      id : 8,
      label : 'Distributeur'
    }

  ]

  const getRolelabel = (id) =>{
    console.log(id)
    const rolelabel = Roles.find((item) => item.id === id)
    return rolelabel['label']
  }

    useEffect(() =>{
      const Data = JSON.parse(localStorage.getItem("authUser"))
      setUser(Data)


      const GetData = async () =>{
        await GetlisteMembers(Data.id,Data.token).then(res =>{
          setmembers(res['data'])
          console.log(res['data'])
          res['data'].map(item =>{
            const label =  getRolelabel(item.Role)
            setDropdownValues((prevValues) => ({
              ...prevValues,
              [item.id]: label,
            }));
          })

        }).catch(err =>{
          console.log(err)
        })
      }
      GetData()
    },[])

  const initialOptions = DaysSelected.map(dayLabel => {
      const matchingOption = Days.find(day => day.label === dayLabel);
      return matchingOption || null;
  }).filter(Boolean);

  const handlechangeDays = (value) =>{
    console.log(value)
    const DaySelected = value.map(item => item.value);
    console.log(DaySelected)
    setDaysSelected(DaySelected)
  }

  const updateProfileMemeber = async () =>{
    console.log(memberSelected.profile)
    const Data = JSON.parse(localStorage.getItem("authUser"))
    memberSelected.profile['adrs_res'] = adr_res
    memberSelected.profile['Tel'] = tel
    memberSelected.profile['adrs_ferme'] = adr_ferm
    memberSelected.profile['City'] = selectedCity?.value
    memberSelected.profile['days_dispo'] = JSON.stringify(DaysSelected)

    const DataProfile = { Data : memberSelected.profile }

    await UpdateMemeberProfile(Data.token, DataProfile ).then(res =>{
      setopenModal(false)
      if(res['status'] == "success"){
        toastr.success('le profil de ' + fullname + " était bien misé à jour" )
      }
    }).catch(err =>{
      toastr.error("Erreur lors de mises à jour le profile ")
    })
  }

  const saveEvaluate = async () =>{
    const Data = JSON.parse(localStorage.getItem("authUser"))

    console.log(memberSelected?.id  + " " + evaluatYear + " " + evaluatCmnt)
    await SaveEvaluateMember(Data.id,memberSelected?.id,evaluatYear,evaluatCmnt,Data.token).then(res =>{
      console.log(res)
      if(res['status'] == "success"){
        toastr.success("L'évaluation a été ajoutée avec succès!")
        setevaluatCmnt('')
        setevaluatYear('')
        setopenmodalevaluate(false)
      }
    }).catch(err =>{
      toastr.success("Erreur lors de l'ajout de l'évaluation. Veuillez réessayer.")

    })
  }



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Gestion des membres"
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

                handleClickRow={handleClickMember}
                handleClickEvaluate={handleClickEvaluate}
                dropdownData = {dropdownValues}
                userData={User}
              />
            </CardBody>
          </Card>
          <Modal
                size="xl"
                isOpen={openmodal}
                toggle={() =>{setopenModal(false)}}
                >
                <ModalHeader >
                 Information membre
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
													<span className="d-none d-sm-block">Information personnelle</span>
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
													<span className="d-none d-sm-block">Géolocalisation de ferme</span>
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
                                      <Label className="form-label" htmlFor="basicpill-firstname-input1">Nom et Prénom</Label>
                                      <Input type="text" style={{backgroundColor : "#E1E1E1"}} className="form-control" id="basicpill-firstname-input1" value={fullname} onChange={(e) =>setfullname(e.target.value)} disabled={true}/>
                                  </div>
                              </Col>
                              <Col lg="6">
                                  <div className="mb-3">
                                      <Label className="form-label" htmlFor="basicpill-lastname-input2">Adresse e-mail</Label>
                                      <Input type="text" style={{backgroundColor : "#E1E1E1"}} className="form-control" id="basicpill-lastname-input2" value={Email} onChange={(e) =>setEmail(e.target.value)} disabled={true} />
                                  </div>
                              </Col>

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
                          <Row>
                              <Col lg="12">
                                  <div className="mb-3">
                                      <Label className="form-label" htmlFor="basicpill-address-input1">Adresse de résidence</Label>
                                      <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) =>setadr_res(e.target.value)} value={adr_res}></textarea>
                                  </div>
                              </Col>
                          </Row>
                        </Row>
                      </React.Fragment>
											</TabPane>
											<TabPane tabId="2" className="p-3">
                      <React.Fragment>
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

                      </React.Fragment>
											</TabPane>
                      <div style={{display : 'flex', alignItems : 'center' , justifyContent : 'center',margin : 10}}>
                          <Button
                              type="button"
                              color="primary" className="waves-effect waves-light"
                              onClick={updateProfileMemeber}
                          >
                              Mise à jour
                          </Button>
                      </div>
                </TabContent>

          </Modal>

          <Modal
                size="xl"
                isOpen={openmodalevaluate}
                toggle={() =>{setopenmodalevaluate(false)}}
                >
                <ModalHeader >
                  Evaluation le membre : {memberSelected?.NomComplet}
                </ModalHeader>
                <ModalBody>
                    <Row>
                      <Col lg="12">
                          <div className="mb-3">
                              <Label className="form-label" htmlFor="basicpill-address-input1">Année d'évaluation</Label>
                              <Input type="text" className="form-control" id="basicpill-phoneno-input3" onChange={(e) =>setevaluatYear(e.target.value)} value={evaluatYear}/>
                          </div>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg="12">
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="basicpill-address-input1">Commentaire</Label>
                            <textarea id="basicpill-address-input1" className="form-control" rows="2" onChange={(e) =>setevaluatCmnt(e.target.value)} value={evaluatCmnt}></textarea>
                        </div>
                    </Col>
                    </Row>
                </ModalBody>
                <div style={{display : 'flex', alignItems : 'center' , justifyContent : 'center',margin : 10}}>
                          <Button
                              type="button"
                              color="primary" className="waves-effect waves-light"
                              onClick={saveEvaluate}
                          >
                              Enregistrer
                          </Button>
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

export default Members;
