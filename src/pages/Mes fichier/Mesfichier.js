import React, { useState } from "react";
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

const Mesfichier = ({ props }) => {
    const [showFileUploadModal, setShowFileUploadModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const toggleFileUploadModal = () => {
        setShowFileUploadModal(!showFileUploadModal);
    };

    const handleAcceptedFiles = (files) => {
        setSelectedFiles(prevFiles => [
            ...prevFiles,
            ...files.map(file => ({
                name: file.name,
                size: file.size,
                date: new Date().toLocaleDateString() // Supposons que la date est la date/heure actuelle
            }))
        ]);
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

    const FileUploadModal = () => (
        <Modal isOpen={showFileUploadModal} toggle={toggleFileUploadModal} size="xl">
            <ModalHeader toggle={toggleFileUploadModal}>FORMULAIRE DE TÉLÉVERSEMENT DE FICHIER</ModalHeader>
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
                                    <Button color="primary" type="button" className="waves-effect waves-light" onClick={handleSendFiles}>Envoyer les fichiers</Button>
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </Form>
            </ModalBody>
        </Modal>
    );

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs
                        title="Ajouter ficher"
                        breadcrumbItems={[]}
                    />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <div className="d-flex justify-content-end m-2 mt-2">
                                    <Button color="success" onClick={toggleFileUploadModal}>
                                        Ajouter fichier
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
                                        <div style={{ width: "40%", display: 'flex', justifyContent: "flex-start" }}>
                                            <span></span>
                                        </div>
                                        <div style={{ width: "20%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                            <span>Auteur</span>
                                        </div>
                                        <div style={{ width: "20%", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                            <span>Taille fichier</span>
                                        </div>
                                        <div style={{ width: "10%", cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                            <span>Télécharger</span>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <FileUploadModal />
        </React.Fragment>
    );
};

export default Mesfichier;
