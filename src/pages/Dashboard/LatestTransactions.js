import React, { useState } from 'react';
import { Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const LatestTransactions = ({latestMembers}) => {
  const [menu, setMenu] = useState(false);

  const data = {
    columns: [
      {
        dataField: "NomComplet",
        text: "Nom et Prénom"
      },
      {
        dataField: "email",
        text: "Email"
      },
      {
        dataField: "DateCreation",
        text: "Date d'inscris"
      },
      {
        dataField: "Membership",
        text: "Adherée"
      },
    ],
    rows: [
      // Add your rows here
    ]
  };

  const expandRow = {
    renderer: row => (
      <>
        Action :
        <Link to="#" className="me-3 text-primary"><i className="mdi mdi-pencil font-size-18"></i></Link>
        <Link to="#" className="text-danger" ><i className="mdi mdi-trash-can font-size-18"></i></Link>
      </>
    ),
    showExpandColumn: true,
    expandByColumnOnly: true
  };

  const options = {
    hideSizePerPage: false,
    hidePageListOnlyOnePage: false,
    sizePerPageList: [{
      text: '5th', value: 5
    }, {
      text: '10th', value: 10
    }, {
      text: 'All', value: data.rows.length
    }]
  };

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
  };

  return (
    <>
      <Col lg={8}>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Nouvelles membères</h4>
            <div className="table-responsive">
              <BootstrapTable
                keyField='id'
                data={latestMembers}
                columns={data.columns}
                //expandRow={expandRow}
                // pagination={paginationFactory(options)}
                //selectRow={selectRow}
                
              />
              
              
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default LatestTransactions;
