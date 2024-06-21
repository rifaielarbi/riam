import React, { useEffect, useState } from "react";
import { Input, Label, Button, Card, CardBody, Table } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import './formation.css';
import moment from "moment";
import { AddFormation } from "../../services/FormationServices/Api";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

toastr.options = {
    positionClass: "toast-bottom-right",
    closeButton : true
  }

function Formation() {
    const [formations, setFormations] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("authUser"))

    const [user, setUser] = useState(null);
    const [newFormation, setNewFormation] = useState({
        type: "",
        description: ""
    });
    const [selectedType, setSelectedType] = useState(null);
    const [selectedTypelabel, setSelectedTypelebel] = useState(null);
    const [Description, setDescription] = useState('')
    const [formError, setFormError] = useState("");

    useEffect(() => {
       
        console.log(storedUser)
      
    }, []);

    const handleAddFormation = () => {
        if (!selectedType) {
            setFormError("Veuillez sélectionner le type de formation.");
            return;
        }

        if (!Description) {
            setFormError("Veuillez entrer une description pour la formation.");
            return;
        }

        if (Description.length > 200) {
            setFormError("La description ne peut pas dépasser 200 caractères.");
            return;
        }

        const newEntry = {
            type: selectedType,
            typelabel: selectedTypelabel,
            createDate: moment(new Date().toLocaleDateString()).format('DD/MM/YYYY'),
            description: Description
        };
        setFormations([...formations, newEntry]);
        setDescription('')
        setSelectedType(null);
        setFormError("");
    };

    const handleRadioChange = (e) => {
        setSelectedType(e.target.value);
        setSelectedTypelebel(e.target.name);
        setFormError("");
    };

 
    const handleRemoveFormation = (index) =>{
        const formationData = [...formations]
        formationData.splice(index, 1)
        console.log(formationData)
        setFormations(formationData)
    }


    const handleSendFormation = async () =>{
        const SendData = {}
        SendData.UserId = storedUser.id
        SendData.FormationData = JSON.stringify(formations)
        console.log(storedUser.token)
        await AddFormation(storedUser.token,SendData).then((res) =>{
           if(res.status == "success") {
            toastr.success("Votre demande de formation a été ajoutée avec succès. Merci !")
            setFormations([])
           }
        }).catch(err =>{
            toastr.error("Error !!!.")
        })
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs
                    title="Demande de Formation"
                    breadcrumbItems={[]}
                />
                <div className="bg-white shadow p-3 mb-5 rounded">
                    <div className='d-flex justify-content-center justify-content-around mt-5'>
                        <div className="form-check mb-3">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="Aviculture écologique"
                                value="AviEco"
                                checked={selectedType === "AviEco"}
                                onChange={handleRadioChange}
                            />
                            <Label className="form-check-label">Aviculture écologique</Label>
                        </div>
                        <div className="form-check mb-3">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="Agroécologie"
                                value="Agreo"
                                checked={selectedType === "Agreo"}
                                onChange={handleRadioChange}
                            />
                            <Label className="form-check-label">Agroécologie</Label>
                        </div>
                        <div className="form-check mb-3">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="Apiculture écologique"
                                value="AcpiEco"
                                checked={selectedType === "AcpiEco"}
                                onChange={handleRadioChange}
                            />
                            <Label className="form-check-label">Apiculture écologique</Label>
                        </div>
                        <div className="form-check mb-3">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="Sol vivant"
                                value="SolViv"
                                checked={selectedType === "SolViv"}
                                onChange={handleRadioChange}
                            />
                            <Label className="form-check-label">Sol vivant</Label>
                        </div>
                        <div className="form-check mb-3">
                            <Input
                                className="form-check-input"
                                type="radio"
                                name="Multiplication des semences."
                                value="Multi"
                                checked={selectedType === "Multi"}
                                onChange={handleRadioChange}
                            />
                            <Label className="form-check-label">Multiplication des semences.</Label>
                        </div>
                    </div>
                    {formError && <p className="text-danger">{formError}</p>}
                    <div className="mb-3">
                        <Label className="form-label" style={{display : "flex", alignItems  : 'center', flexDirection : 'row'}}>
                            Description &nbsp; 
                                <span style={{fontSize : 12, color : "grey"}}> ( Maximum 200 caractères )</span>
                        </Label>


                        <textarea
                            className="form-control"
                            rows="5"
                            value={Description}
                            required
                            onChange={(e) => {
                                if (e.target.value.length <= 200) {
                                    setDescription(e.target.value)
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
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formations.map((formation, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{formation.typelabel}</td>
                                                <td>{formation.createDate}</td>
                                                <td>{formation.description.length > 20 ? `${formation.description.substring(0, 20)}...` : formation.description}</td>
                                                <td style={{paddingLeft : 30}}>
                                                <i className="ri-delete-bin-fill" style={{color : "#B02032", fontSize : 18}}
                                                    onClick={() =>{handleRemoveFormation(index)}}
                                                />
                                                </td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                    <div className="d-flex justify-content-end">
                        <Button color="success" onClick={handleSendFormation}>
                            Envoyer formation
                        </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Formation;
