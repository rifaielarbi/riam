import React, { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    Container,
    Badge,
    Table
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Dropzone from "react-dropzone";
import { DownloadFile, GetlistUserFiles, SaveUserFile } from "../../services/FilesServices/Api";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import FileItem from '../../components/FileItem/item'


const Mesfichier = ({ props }) => {
    const [showFileUploadModal, setShowFileUploadModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const Data = JSON.parse(localStorage.getItem("authUser"))
    const [showloading , setshowloading] = useState(false)
    const [listFiles, setlistFiles] = useState([])


    useEffect(() =>{
        const getData = async () =>{
            await GetlistUserFiles(Data.id,Data.token).then(res =>{
                if (res['status'] == "success"){
                    setlistFiles(res['data'])
                }
                console.log(res)
            }).catch(err =>{
                console.log(err)
            })
        }
        getData()
      },[showFileUploadModal])

    const toggleFileUploadModal = () => {
        setShowFileUploadModal(!showFileUploadModal);
    };

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

    const handleRemoveFile = (index) => {
        setSelectedFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };

    const handleSendFiles = () => {
        console.log("Fichiers sélectionnés:", selectedFiles);
        setSelectedFiles([]);
    };

    const handleSaveFile = async () =>{
        const formData = new FormData();
        const DataArray = []
        for (let file of selectedFiles){
          const additionalData = {
            "UserId" : Data.id,
            "FileName" : file.name,
            "Filepath" : file.name,
            "FileSize": file.size 
          }
        //   Object.keys(additionalData).forEach((key) => {
        //     formData.append(key, additionalData[key]);
        //   });
        DataArray.push(additionalData)
          

          const blobData = await fetch(URL.createObjectURL(file)).then((res) => res.blob());
          const blob = new Blob([blobData], { type: file.type });
          formData.append('files', blob, file.name);
        }
        formData.append('filesData', JSON.stringify(DataArray));

        await SaveUserFile(formData).then(res =>{
          if(res['status'] == "success"){
            toastr.success("Le fichier a été importé avec succès.")
            setSelectedFiles([])
            setShowFileUploadModal(false)
            setshowloading(false)
          } else {
            toastr.error("Une erreur est survenue lors de l'importation du fichier.", "Erreur!");
          }
        }).catch(err =>{
          console.log(err)
          setshowloading(false)
        })
      }

    // const FileUploadModal = () => (
    //     <Modal isOpen={showFileUploadModal} toggle={toggleFileUploadModal} size="xl">
    //         <ModalHeader toggle={toggleFileUploadModal}>FORMULAIRE DE TÉLÉVERSEMENT DE FICHIER</ModalHeader>
    //         <ModalBody>
    //             <Form>
    //                 <Dropzone
    //                     onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles)}
    //                 >
    //                     {({ getRootProps, getInputProps }) => (
    //                         <div className="dropzone">
    //                             <div className="dz-message needsclick" {...getRootProps()}>
    //                                 <input {...getInputProps()} />
    //                                 <div className="mb-3">
    //                                     <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
    //                                 </div>
    //                                 <h4>Déposez les fichiers ici ou cliquez pour télécharger.</h4>
    //                             </div>
    //                         </div>
    //                     )}
    //                 </Dropzone>
    //                 {selectedFiles.length > 0 && (
    //                     <Card className="mt-3">
    //                         <CardBody>
    //                             <CardTitle>Fichiers Sélectionnés</CardTitle>
    //                             {selectedFiles.map((file, index) => (
    //                                 <Row key={index} className="align-items-center mb-2">
    //                                     <Col className="col-auto">
    //                                         <h6 className="text-truncate font-size-14 mb-0">{file.name}</h6>
    //                                     </Col>
    //                                     <Col>
    //                                         <Badge color="primary">{formatBytes(file.size)}</Badge>
    //                                     </Col>
    //                                     <Col className="col-auto">
    //                                         <Button color="danger" size="sm" onClick={() => handleRemoveFile(index)}><i className="ri-delete-bin-2-line"></i></Button>
    //                                     </Col>
    //                                 </Row>
    //                             ))}
    //                             <div className="text-center mt-4">
    //                                 <Button color="primary" type="button" className="waves-effect waves-light" onClick={handleSendFiles}>Envoyer les fichiers</Button>
    //                             </div>
    //                         </CardBody>
    //                     </Card>
    //                 )}
    //             </Form>
    //         </ModalBody>
    //     </Modal>
    // );

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

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

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs
                        title="Mes fichiers"
                        breadcrumbItems={[]}
                    />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <div className="d-flex justify-content-end m-2 mt-2">
                                    <Button color="success" onClick={toggleFileUploadModal}>
                                        Ajouter un fichier
                                    </Button>
                                </div>
                                <CardBody>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 5,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        padding: 10
                                    }}>
                                        <div style={{ width: "10%", display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                                            <span>Nom fichier</span>
                                        </div>
                                        <div style={{ width: "60%", display: 'flex', justifyContent: "flex-start" }}>
                                            <span></span>
                                        </div>
                                        {/* <div style={{ width: "20%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                            <span>Auteur</span>
                                        </div> */}
                                        <div style={{ width: "20%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                            <span>Taille fichier</span>
                                        </div>
                                        <div style={{ width: "10%", cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                            <span>Télécharger</span>
                                        </div>
                                    </div>
                                    {listFiles.map((item,index) =>{
                                            return(
                                            <FileItem
                                                Filename={item.Filename}
                                                FilePath={item.Filepath}
                                                // Author={item.NomComplet}
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
            </div>
            <Modal isOpen={showFileUploadModal} toggle={toggleFileUploadModal} size="xl">
            <ModalHeader toggle={toggleFileUploadModal}></ModalHeader>
            <ModalBody>
                <Form>
                    <Dropzone
                        onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles)}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                                <div className="dz-message needsclick" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="mb-3">
                                        <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                    </div>
                                    <h4>Déposez les fichiers ici ou cliquez pour télécharger.</h4>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                    {selectedFiles.length > 0 && (
                        <Card className="mt-3">
                            <CardBody>
                                <CardTitle>Fichiers Sélectionnés</CardTitle>
                                {selectedFiles.map((file, index) => (
                                    <Row key={index} className="align-items-center mb-2">
                                        <Col className="col-auto">
                                            <h6 className="text-truncate font-size-14 mb-0">{file.name}</h6>
                                        </Col>
                                        <Col>
                                            <Badge color="primary">{formatBytes(file.size)}</Badge>
                                        </Col>
                                        <Col className="col-auto">
                                            <Button color="danger" size="sm" onClick={() => handleRemoveFile(index)}><i className="ri-delete-bin-2-line"></i></Button>
                                        </Col>
                                    </Row>
                                ))}
                                <div className="text-center mt-4">
                                    <Button color="primary" type="button" className="waves-effect waves-light" onClick={handleSaveFile}>Envoyer les fichiers</Button>
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </Form>
            </ModalBody>
        </Modal>
        </React.Fragment>
    );
};

export default Mesfichier;
