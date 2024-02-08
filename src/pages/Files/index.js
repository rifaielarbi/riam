import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  InputGroup,
  InputGroupText,
} from "reactstrap";

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import LoadingModal from "../../components/Modal/loadingModal";
import { GetlistFiles,DownloadFile  } from '../../services/FilesServices/Api';
import FileItem from '../../components/FileItem/item'
import { AvField, AvForm } from "availity-reactstrap-validation";


const Index = ({props}) => {
  const [showloading , setshowloading] = useState(false)
  const [listFiles, setlistFiles] = useState([])
  const Data = JSON.parse(localStorage.getItem("authUser"))
  const [searchValue, setSearchValue] = useState('');

  toastr.options = {
    positionClass: "toast-bottom-right",
  }
  
  useEffect(() =>{
    console.log(Data)
    const getData = async () =>{
        await GetlistFiles(Data.role,Data.token).then(res =>{
            if (res['status'] == "success"){
                setlistFiles(res['data'])
            }
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
    }
    getData()
  },[])


  const handleDownloadFile = async (filename) => {
    try {
      const response = await DownloadFile(filename, Data.token);
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

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCancelSearch = () => {
    setSearchValue('');
  };
  
  



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs
            title="Add Product"
            breadcrumbItems={breadcrumbItems}
          /> */}

              <Row>
                  <Breadcrumbs
                      title="Fichiers partagés"
                      breadcrumbItems={[]}
                />
                 {/* <AvForm>
                <InputGroup>
                    <AvField
                    type="text"
                    name="search"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    />
                    {searchValue && (
                        <InputGroupText>
                        <Button color="link" onClick={handleCancelSearch}>
                            <i className="fa fa-times-circle" /> 
                        </Button>
                        </InputGroupText>
                    )}
                </InputGroup>
                </AvForm>  */}
                
                  <Col lg={12}>

                    <Card>
                    <CardBody>
                    <div style={{
                        display : 'flex', 
                        flexDirection : 'row', 
                        alignItems : 'center',
                        justifyContent : 'center',
                        // backgroundColor : '#FAFAF9',
                        borderRadius : 5,
                        marginTop : 10,
                        marginBottom : 10,
                        // borderWidth : 1,
                        // borderStyle : "solid",
                        // borderColor: "#F3F3F3",
                        padding : 10
                        }} >
                        <div style={{width : "10%",display : 'flex', justifyContent : 'center', fontWeight : 'bold'}}>
                            <span>
                            Nom fichier
                            </span>
                        </div>
                        <div style={{width : "40%", display : 'flex', justifyContent : "flex-start"}}>
                            <span>
                            </span>
                        </div>
                        <div style={{width : "20%",display : 'flex', alignItems : 'center', justifyContent : 'center', fontWeight : 'bold'}}>
                            <span>
                            Auteur
                            </span>
                        </div>
                        <div style={{width : "20%",display : 'flex', alignItems : 'center', justifyContent : 'center', fontWeight : 'bold'}}>
                            <span>
                                Taille fichier
                            </span>
                        </div>
                        <div style={{width : "10%", cursor :'pointer',display : 'flex', alignItems : 'center', justifyContent : 'center', fontWeight : 'bold'}}>
                            <span>Telecharger</span>
                        
                        </div>
                        </div>

                        {listFiles.map((item,index) =>{
                            return(
                            <FileItem
                                Filename={item.Filename}
                                FilePath={item.Filepath}
                                Author={item.NomComplet}
                                filesize={item.Size}
                                key={index}
                                handleDownload={handleDownloadFile}
                            />
                            )
                        })}
                       
                    </CardBody>
                    </Card>
                </Col>
                 
          </Row>
        </Container>
        <LoadingModal show={showloading}/>  
 
      </div>
    </React.Fragment>
  );
};

export default Index;
