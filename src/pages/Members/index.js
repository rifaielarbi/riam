import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Card, CardBody, Container } from "reactstrap";
import { products, } from "../../common/data/ecommerce";
import Modal from 'react-modal';
import { useSelector } from "react-redux";
import { GetlisteMembers } from '../../services/MembersServices/Api';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const Members = () => {
  const [modalUpdateIsOpen,setmodalUpdateIsOpen] = useState(false)
  const [members,setmembers] = useState([])
  const [User,setUser] = useState()
  const [dropdownValues, setDropdownValues] = useState({});
  const closeModal = ()  =>{
    setmodalUpdateIsOpen(false);
  }

  const openModal = ()  =>{
    setmodalUpdateIsOpen(true);
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: 100
    },
  };

  const products = [
    {
      id: 1,
      name: "Airi",
      Prénom: "Satou",
      Email: "test@gmail.com",
      createDate: "2008/11/28",
      role: "Consommateurs",
    },
  
    {
      id: 2,
      name: "Angelica ",
      Prénom: "Ramos",
      Email: "test@gmail.com",
      createDate: "2009/10/09",
      role: "Partenaires,",
    },
  
    {
      id: 3,
      name: "Ashton ",
      Prénom: "Cox",
      Email: "test@gmail.com",
      createDate: "2009/01/12",
      role: "COS",
    },
  
    {
      id: 4,
      name: "Bradley",
      Prénom: "Greer",
      Email: "test@gmail.com",
      createDate: "2012/10/13",
      role: "Distributeurs/producteurs",
    }
  ]

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
    []
  );

  const Roles = [
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
      label : 'Distributeurs/producteurs'
    },
    {
      id : 5,
      label : 'COS'
    },
    {
      id : 6,
      label : 'BE'
    },
    {
      id : 7,
      label : 'Candidats avec CV'
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
                dropdownData = {dropdownValues}
                userData={User}
              />
            </CardBody>
          </Card>

          
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
