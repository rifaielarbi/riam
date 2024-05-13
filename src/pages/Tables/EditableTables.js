import React, { useState } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { element } from "prop-types";

// const products = [
//   { id: 1, age: 25, qty: 1500, cost: 1000 },
//   { id: 2, age: 34, qty: 1900, cost: 1300 },
//   { id: 3, age: 67, qty: 1300, cost: 1300 },
//   { id: 4, age: 23, qty: 1100, cost: 6400 },
//   { id: 5, age: 78, qty: 1400, cost: 4000 }
// ];



const EditableTables = ({rows,columns,type,handlechange}) => {
  const [rowsvalues, setRows] = useState(rows);

  const [breadcrumbItems] = useState([
    { title: "Tables", link: "#" },
    { title: "Editable Table", link: "#" }
  ]);

 

  const handleAfterSaveCell = (oldValue, newValue, row, column) => {
    console.log(column)
    if(type == 1){
      const updatedArray = rowsvalues.map(item => {
        if (item.Prodve.toLowerCase() === row.Prodve.toLowerCase()) {
          // Replace the entire row with the new row
          return { ...row };  // Using the spread operator to create a new object
        } else {
          return item;
        }
      });
      setRows(updatedArray);
      handlechange(updatedArray)
    } else{
      const updatedArray = rowsvalues.map(item => {
        if (item.id === row.id) {
          // Replace the entire row with the new row
          return { ...row };  // Using the spread operator to create a new object
        } else {
          return item;
        }
      });
      setRows(updatedArray);
      handlechange(updatedArray)

    }
   

      


    // updatedProducts.forEach(element => {
    //   if(element.Prodve === row.Prodve){
    //     console.log(element)
    //     console.log(element.Prodve + " " + row.Prodve)
    //     element.surf = row.surf
    //     element.nbrparc = row.nbrparc
    //     element.situation = row.situation
    //   }
    // });

    // const rowIndex = row; 
    // const columnIndex = column;
    // if (rowIndex >= 0 && rowIndex < updatedProducts.length) {
    //   if (columnIndex >= 0 && columnIndex < Object.keys(updatedProducts[rowIndex]).length) {
    //     updatedProducts[rowIndex][Object.keys(updatedProducts[rowIndex])[columnIndex]] = newValue;
    //     setProducts(updatedProducts);
    //     console.log(updatedProducts)
    //   }
    // }
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid>
          {/* <Breadcrumbs title="Editable Table" breadcrumbItems={breadcrumbItems} /> */}
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  
                  <div className="table-responsive">
                    <BootstrapTable
                      keyField={type == 1  ? "Prodve" : 'id'}
          
                      data={rowsvalues}
                      columns={columns}
                      cellEdit={cellEditFactory({
                         mode: "click",
                          blurToSave: true,
                          afterSaveCell: handleAfterSaveCell
                      })}
                    />
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

export default EditableTables;
