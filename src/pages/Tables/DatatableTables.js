import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Card, CardBody, Container } from "reactstrap";
import { products, } from "../../common/data/ecommerce";
import Modal from 'react-modal';
import { useSelector } from "react-redux";

const Members = () => {
  const [modalUpdateIsOpen,setmodalUpdateIsOpen] = useState(false)
  const user = useSelector(state => state.Login.user);

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
        Header: "Nom",
        accessor: "name",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Prénom",
        accessor: "Prénom",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Email",
        accessor: "Email",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Date de création",
        accessor: "createDate",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Accès",
        accessor: "role",
        disableFilters: true,
        filterable: false,
      },
    ],
    []
  );

  const breadcrumbItems = [
    { title: "Data Tables", link: "#" },
  ]

  useEffect(() =>{
    console.log(user)
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
                data={products || []}
                isPagination={false}
                // isGlobalFilter={false}
                iscustomPageSize={false}
                isBordered={false}
                customPageSize={10}
                // openModalUpdate={openModal}
                // isAddOptions={true}
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
