import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Container, Label, FormGroup, InputGroup, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Dropzone from "react-dropzone";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Select from "react-select";

const Evenment = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedMulti, setSelectedMulti] = useState([]);
    const [optionGroup, setOptionGroup] = useState([
        { label: "Public", value: "public" },
        { label: "Producteur", value: "producteur" },
        { label: "Consommateur", value: "consommateur" },
        { label: "Association", value: "association" },
        { label: "Coopérative", value: "cooperative" }
    ]);

    const handleAcceptedFiles = (files) => {
        const updatedFiles = files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        );
        setSelectedFiles(updatedFiles);
    };

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const handleMulti = (selectedOptions) => {
        console.log(selectedOptions)
        setSelectedMulti(selectedOptions);
    };

    const handleFormData = (event, values) => {
        event.preventDefault();

        const formData = {
            files: selectedFiles,
            multiSelect: selectedMulti,
            titre: values.titre,
            lieu: values.lieu,
            description: values.textarea,
            city: values.city,
        };
        console.log("Form Data:", formData);

        // Clear form inputs
        setSelectedFiles([]);
        setSelectedMulti(null);
        event.target.reset();
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col xs={12}>
                            <CardTitle className="text-3xl mb-4"><h3>Ajouter Evenment</h3></CardTitle>
                            <Card>
                                <CardBody>
                                    <AvForm onValidSubmit={handleFormData}>

                                        <Row>
                                            <Col md={6}>
                                                <Dropzone onDrop={handleAcceptedFiles}>
                                                    {({ getRootProps, getInputProps }) => (
                                                        <div className="dropzone input-uploading input-uplaoding">
                                                            <div className="dz-message needsclick uplaod-button" {...getRootProps()}>
                                                                <input {...getInputProps()} />
                                                                <div className="mb-3 upload-button uplaod-button ">
                                                                    <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                                                </div>
                                                                <h4>Drop files here or click to upload.</h4>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Dropzone>
                                            </Col>
                                            <Col md={6}>
                                                <div className="dropzone-previews mt-4">
                                                    <Row>
                                                        {selectedFiles.map((file, index) => (
                                                            <Col md={6} key={index} className="mb-3">
                                                                <Card className="shadow-none border dz-success dz-complete">
                                                                    <div className="p-2 displayer-img">
                                                                        <Row className="align-items-center">
                                                                            <Col className="d-flex flex-column align-items-center">
                                                                                <img
                                                                                    height={300}
                                                                                    width={300}
                                                                                    className="rounded bg-light mb-2"
                                                                                    alt={file.name}
                                                                                    src={file.preview}
                                                                                    style={{
                                                                                        objectFit: 'fill',
                                                                                        maxHeight: '300px',
                                                                                        maxWidth: '100%',
                                                                                    }}
                                                                                />
                                                                                <h6>{file.name}</h6>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </Card>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <Label htmlFor="titre-input" className="col-md-2 col-form-label">Titre</Label>
                                                <AvField
                                                    name="titre"
                                                    type="text"
                                                    id="titre-input"
                                                    className="form-control"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Ce champ est requis' }
                                                    }}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Label htmlFor="lieu-input" className="col-md-2 col-form-label">Lieu</Label>
                                                <AvField
                                                    name="lieu"
                                                    type="text"
                                                    id="lieu-input"
                                                    className="form-control"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Ce champ est requis' }
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={12}>
                                                <Label htmlFor="textarea-input" className="col-md-2 col-form-label">Description</Label>
                                                <AvField
                                                    name="textarea"
                                                    type="textarea"
                                                    rows="5"
                                                    id="textarea-input"
                                                    className="form-control"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Ce champ est requis' }
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <FormGroup className="mb-4">
                                                    <Label>Date</Label>
                                                    <InputGroup>
                                                        <Flatpickr
                                                            className="form-control d-block"
                                                            placeholder="dd M,yyyy"
                                                            options={{
                                                                mode: "range",
                                                                dateFormat: "Y-m-d"
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <Label>Spécifée</Label>
                                                <Select
                                                    value={selectedMulti}
                                                    name="selectedMulti"
                                                    isMulti={true}
                                                    onChange={handleMulti}
                                                    options={optionGroup}
                                                    classNamePrefix="select2-selection"
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={12}>
                                                <Label htmlFor="city-select" className="col-md-2 col-form-label">ville</Label>
                                                <AvField
                                                    type="select"
                                                    name="city"
                                                    id="city-select"
                                                    className="form-control"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Ce champ est requis' }
                                                    }}
                                                >
                                                    <option defaultValue>Select ville...</option>
                                                    <option>City 1</option>
                                                    <option>City 2</option>
                                                    <option>City 3</option>

                                                </AvField>
                                            </Col>
                                        </Row>
                                        <div className="d-flex justify-content-end">
                                            <Button color="success">
                                            sauvgarder

                                            </Button>
                                        </div>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Evenment;
