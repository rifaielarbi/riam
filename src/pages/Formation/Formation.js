import React, { useEffect, useState } from "react";
import { Input, Label, Button, Card, CardBody, Table } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import './formation.css';

function Formation() {
    const [formations, setFormations] = useState([]);
    const [user, setUser] = useState(null);
    const [newFormation, setNewFormation] = useState({
        type: "",
        description: ""
    });
    const [selectedType, setSelectedType] = useState(null);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleAddFormation = () => {
        if (!selectedType) {
            setFormError("Veuillez sélectionner le type de formation.");
            return;
        }

        if (!newFormation.description) {
            setFormError("Veuillez entrer une description pour la formation.");
            return;
        }

        if (newFormation.description.length > 200) {
            setFormError("La description ne peut pas dépasser 200 caractères.");
            return;
        }

        const newEntry = {
            type: selectedType,
            createDate: new Date().toLocaleDateString(),
            description: newFormation.description
        };
        setFormations([...formations, newEntry]);
        // Vider les champs après l'ajout
        setNewFormation({
            type: "",
            description: ""
        });
        setSelectedType(null);
        setFormError("");
    };

    const handleRadioChange = (e) => {
        setSelectedType(e.target.value);
        setNewFormation({ ...newFormation, type: e.target.value });
        setFormError("");
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <h2>Demande de Formation</h2>
                <div className="bg-white shadow p-3 mb-5 rounded">
                    <div className='d-flex justify-content-center justify-content-around mt-5'>
                        <div className="form-check mb-3">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="formationType"
                                value="Formation 1"
                                checked={selectedType === "Formation 1"}
                                onChange={handleRadioChange}
                            />
                            <Label className="form-check-label">Formation 1</Label>
                        </div>
                        <div className="form-check mb-3">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="formationType"
                                value="Formation 2"
                                checked={selectedType === "Formation 2"}
                                onChange={handleRadioChange}
                            />
                            <Label className="form-check-label">Formation 2</Label>
                        </div>
                        <div className="form-check mb-3">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="formationType"
                                value="Formation 3"
                                checked={selectedType === "Formation 3"}
                                onChange={handleRadioChange}
                            />
                            <Label className="form-check-label">Formation 3</Label>
                        </div>
                    </div>
                    {formError && <p className="text-danger">{formError}</p>}
                    <div className="mb-3">
                        <Label className="form-label">
                            Description
                            <p className="text-gray-500">
                                <span>Maximum 200 caractères</span>
                            </p>
                        </Label>


                        <textarea
                            className="form-control"
                            rows="5"
                            value={newFormation.description}
                            required
                            onChange={(e) => {
                                if (e.target.value.length <= 200) {
                                    setNewFormation({ ...newFormation, description: e.target.value });
                                    setFormError("");
                                }
                            }}
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button color="success" onClick={handleAddFormation}>
                            Ajouter
                        </Button>
                    </div>
                    <Breadcrumbs title="Mes Formations" breadcrumbItems={[]} />
                    <Card>
                        <CardBody>
                            <h4 className="card-title">Mes Formations</h4>
                            <div className="table-responsive">
                                <Table className="mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Type de Formation</th>
                                            <th>Date de Création</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formations.map((formation, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{formation.type}</td>
                                                <td>{formation.createDate}</td>
                                                <td>{formation.description.length > 20 ? `${formation.description.substring(0, 20)}...` : formation.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                    <div className="d-flex justify-content-end">
                        <Button color="success" onClick={() => console.log(formations)}>
                            Envoyer formation
                        </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Formation;
