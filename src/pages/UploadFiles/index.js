import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "reactstrap";
import Select from "react-select";
import Dropzone from "react-dropzone";
import classnames from "classnames";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { SaveFile } from "../../services/FilesServices/Api";
import LoadingModal from "../../components/Modal/loadingModal";



const Index = ({props}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const Data = JSON.parse(localStorage.getItem("authUser"))
  const [showloading , setshowloading] = useState(false)
  const [AccesRole, setAccesRole] = useState([])
  const [Filename, setFilename] = useState("")
  toastr.options = {
    positionClass: "toast-bottom-right",
  }
  const options = [
    { value: "2", label: "Membre" },
    { value: "3", label: "Consommateurs" },
    { value: "4", label: "Distributeurs/producteurs" },
    { value: "5", label: "COS" },
    { value: "6", label: "BE" },
    { value: "7", label: "Candidats avec CV" },
  ];

  const handleAcceptedFiles = (files) => {
    const updatedFiles = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        htmlFormattedSize: htmlFormatBytes(file.size),
      })
    );

    setSelectedFiles(updatedFiles);
  };

  const htmlFormatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleSaveFile = async () =>{
    const formData = new FormData();
    

    for (let file of selectedFiles){
      const additionalData = {
        "UserId" : Data.id,
        "FileName" : Filename,
        "Filepath" : file.name,
        "Role" : AccesRole,
        "FileSize": file.size 
      }
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });

      const blobData = await fetch(URL.createObjectURL(file)).then((res) => res.blob());
      const blob = new Blob([blobData], { type: file.type });
      formData.append('files', blob, file.name);
    }
    await SaveFile(formData).then(res =>{
      if(res['status'] == "success"){
        toastr.success("Le fichier a été importé avec succès.")
        setSelectedFiles([])
        setshowloading(false)
      } else {
        toastr.error("Une erreur est survenue lors de l'importation du fichier.", "Erreur!");
      }
    }).catch(err =>{
      console.log(err)
      setshowloading(false)
    })
  }

  const handlechangeRole = (value) =>{
    const RoleSelected = value.map(item => parseInt(item.value));
    setAccesRole(RoleSelected)
  }

  const handleFilenamechange = value =>{
    setFilename(value.target.value)
  }



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
                      title="Charger es fichiers"
                      breadcrumbItems={[]}
                   />
                  <Col lg={12}>

                        <Card>
                            <CardBody>
                            {/* <CardTitle className="h5">Information du fichier</CardTitle> */}
                            <div id="addproduct-nav-pills-wizard" className="twitter-bs-wizard">
                            <div className="row">
                            <div className="col-md-6">
                                <Label className="form-label" htmlFor="productname">
                                    Nom de fichier 
                                </Label>
                                <Input
                                  id="productname"
                                  name="productname"
                                  type="text"
                                  className="form-control"
                                  onChange={handleFilenamechange}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3" >
                                    <Label className="form-label">
                                        Accès
                                    </Label>

                                    <Select
                                      classNamePrefix="select2-selection"
                                      placeholder="Sélectionner..."
                                      title="Accès"
                                      options={options}
                                      isMulti
                                      onChange={handlechangeRole}
                                    />

                                </div>
                                </div>
                            </div>
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
                                {selectedFiles.map((f, i) => {
                                return (
                                    <Card
                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                    key={i + "-file"}
                                    >
                                    <div className="p-2">
                                        <Row className="align-items-center">
                                        {/* <Col className="col-auto">
                                            <img
                                            data-dz-thumbnail=""
                                            height="80"
                                            className="avatar-sm rounded bg-light"
                                            alt={f.name}
                                            src={f.preview}
                                            />
                                        </Col> */}
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
                            <div className="text-center mt-4">
                            <Button color="primary" type="button" className="waves-effect waves-light" onClick={() =>{
                              setshowloading(true)
                              handleSaveFile()
                              }}>Sauvgarder</Button>
                            </div>
                        </div>
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
