import React, { useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Container, Row, Col, Card, CardBody, Button, FormGroup, Label, Input, Table } from 'reactstrap';
import toastr from 'toastr'
import 'flatpickr/dist/themes/material_blue.css';


toastr.options = {
    positionClass: "toast-bottom-right",
    closeButton : true
  }

export default function Poindevent() {
    const [formErrors, setFormErrors] = useState({});
    const [formValues, setFormValues] = useState({
        nom: '',
        numero_telefon: '',
        localisation: '',
        heurs_ouvert_fermetur: '',
        heurs_fermeture: '',
        image: '',
        produits: []
    });
    const [products, setProducts] = useState([]);

    const handleFormData = (event) => {

        const newProduct = {
            image : formValues.image,
            name : formValues.produit
        }

        setFormValues(prevState => ({
            ...prevState,
            produits: [...prevState.produits, newProduct]
        }));
        setProducts([...products, { image: formValues.image, produit: formValues.produit }]);
        // event.preventDefault();
        // Vérification des erreurs avant de soumettre
        // const errors = validateForm();
        // if (Object.keys(errors).length === 0) {
            // Ajouter le produit au tableau des produits
            // 
            // Réinitialiser les valeurs du formulaire
            // setFormValues({
            //     nom: '',
            //     numero_telefon: '',
            //     localisation: '',
            //     heurs_ouvert_fermetur: '',
            //     heurs_fermeture: '',
            //     image: '',
            //     produit: ''
            // });
            // console.log(formValues)
            // Réinitialiser les erreurs du formulaire
            setFormErrors({});
        // } else {
        //     console.error('Il y a des erreurs dans le formulaire.');
        //     setFormErrors(errors);
        // }
    };


    const handleSubmit = () =>{
        console.log(formValues)
        setFormValues({
                nom: '',
                numero_telefon: '',
                localisation: '',
                heurs_ouvert_fermetur: '',
                heurs_fermeture: '',
                image: '',
                produit: ''
            });
            setFormErrors({});
            setProducts([])
            toastr.success("Le point de vente a été ajouté.")

    }

    const validateForm = () => {
        let errors = {};
        if (formValues.nom.length < 3) {
            errors.nom = 'Le nom doit comporter au moins 3 caractères.';
        }
        if (!/^\d+$/.test(formValues.numero_telefon)) {
            errors.numero_telefon = 'Le numéro de téléphone doit être numérique.';
        }
        if (formValues.localisation.length === 0) {
            errors.localisation = 'La localisation est requise.';
        }
        if (!validateTimeFormat(formValues.heurs_ouvert_fermetur)) {
            errors.heurs_ouvert_fermetur = 'Format d\'heure invalide (HH:MM).';
        }
        if (!validateTimeFormat(formValues.heurs_fermeture)) {
            errors.heurs_fermeture = 'Format d\'heure invalide (HH:MM).';
        }
        if (formValues.heurs_ouvert_fermetur >= formValues.heurs_fermeture) {
            errors.heurs_ouvert_fermetur = 'L\'heure d\'ouverture doit être avant l\'heure de fermeture.';
            errors.heurs_fermeture = 'L\'heure de fermeture doit être après l\'heure d\'ouverture.';
        }
        if (!formValues.image) {
            errors.image = 'L\'image est requise.';
        }
        if (formValues.produit.length === 0) {
            errors.produit = 'Le produit est requis.';
        }
        return errors;

    };

    const validateTimeFormat = (timeString) => {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormValues({ ...formValues, [name]: files[0] });
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Point De Vente" breadcrumbItems={[]} />
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="nom-input">Nom</Label>
                                                    <Input
                                                        type="text"
                                                        name="nom"
                                                        id="nom-input"
                                                        placeholder="Entrez le nom"
                                                        value={formValues.nom}
                                                        required
                                                        onChange={handleInputChange}
                                                    />
                                                    {formErrors.nom && (
                                                        <div className="text-danger">{formErrors.nom}</div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="numero-telefon-input">Numéro de téléphone</Label>
                                                    <Input
                                                        type="text"
                                                        name="numero_telefon"
                                                        id="numero-telefon-input"
                                                        placeholder="Entrez le numéro de téléphone"
                                                        value={formValues.numero_telefon}
                                                        required
                                                        onChange={handleInputChange}
                                                    />
                                                    {formErrors.numero_telefon && (
                                                        <div className="text-danger">{formErrors.numero_telefon}</div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="localisation-input">Localisation</Label>
                                                    <Input
                                                        type="text"
                                                        name="localisation"
                                                        id="localisation-input"
                                                        placeholder="Entrez la localisation"
                                                        value={formValues.localisation}
                                                        required
                                                        onChange={handleInputChange}
                                                    />
                                                    {formErrors.localisation && (
                                                        <div className="text-danger">{formErrors.localisation}</div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="heurs-ouverture-input">Heures ouverture</Label>
                                                    <Input
                                                        type="text"
                                                        name="heurs_ouvert_fermetur"
                                                        id="heurs-ouverture-input"
                                                        placeholder="Entrez les heures d'ouverture (HH:MM)"
                                                        value={formValues.heurs_ouvert_fermetur}
                                                        required
                                                        onChange={handleInputChange}
                                                    />
                                                    {formErrors.heurs_ouvert_fermetur && (
                                                        <div className="text-danger">{formErrors.heurs_ouvert_fermetur}</div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="heurs-fermeture-input">Heures fermeture</Label>
                                                    <Input
                                                        type="text"
                                                        name="heurs_fermeture"
                                                        id="heurs-fermeture-input"
                                                        placeholder="Entrez les heures de fermeture (HH:MM)"
                                                        value={formValues.heurs_fermeture}
                                                        required
                                                        onChange={handleInputChange}
                                                    />
                                                    {formErrors.heurs_fermeture && (
                                                        <div className="text-danger">{formErrors.heurs_fermeture}</div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Breadcrumbs title="AJOUTER les PRODUITS" breadcrumbItems={[]} style={{ margin: '20%' }} />

                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="image-input">Image</Label>
                                                    <Input
                                                        type="file"
                                                        name="image"
                                                        id="image-input"
                                                        onChange={handleFileChange}
                                                        required
                                                    />
                                                    {formErrors.image && (
                                                        <div className="text-danger">{formErrors.image}</div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="produit-input">Nom de produit</Label>
                                                    <Input
                                                        type="text"
                                                        name="produit"
                                                        id="produit-input"
                                                        placeholder="Entrez le produit"
                                                        value={formValues.produit}
                                                        required
                                                        onChange={handleInputChange}
                                                    />
                                                    {formErrors.produit && (
                                                        <div className="text-danger">{formErrors.produit}</div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <div className="d-flex justify-content-end">
                                            <Button color="success" type="submit" onClick={handleFormData}>
                                                Ajouter
                                            </Button>
                                        </div>

                                    

                                        <h4 style={{ fontSize: 20 }} className="card-title m-3">Liste produits ajouté</h4>

                                        <Row>
                                            <Col lg={12}>
                                                <Card>
                                                    <CardBody>
                                                        <div className="table-responsive">
                                                            <Table hover className="mb-0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Image</th>
                                                                        <th>Nom De Produit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {products.map((product, index) => (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <img
                                                                                    src={URL.createObjectURL(product.image)}
                                                                                    alt="Produit"
                                                                                    style={{ width: '50px', height: '50px' }}
                                                                                />
                                                                            </td>
                                                                            <td>{product.produit}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                </CardBody>
                    <div className="d-flex justify-content-end m-3">
                        <Button color="success" type="submit" onClick={handleSubmit}>
                            Enregistrer
                        </Button>
                    </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}
