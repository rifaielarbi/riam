import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Container, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import './event.css';
import "flatpickr/dist/themes/material_blue.css";
import Breadcrumbs from '../../components/Common/Breadcrumb';

const defaultEventImage = "https://placehold.co/300x400";

const Listevenment = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            titre: "Evenement",
            lieu: "Casablanca",
            description: "test desc 01.",
            city: "San Francisco",
            date: "2024-07-10", 
            image: require('../../assets/images/event01.jpeg'),
        },
        {
            id: 2,
            titre: "Evenement 01",
            lieu: "Rabat",
            description: "test desc.",
            date: "2024-08-15",
            image: require('../../assets/images/event02.jpg'),
        },
        // {
        //     id: 3,
        //     titre: "Music Festival",
        //     lieu: "Central Park",
        //     description: "A day-long festival featuring various music artists.",
        //     city: "Chicago",
        //     date: "2024-09-05",
        //     image: defaultEventImage,
        // }
    ]);;

    const [modal, setModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const toggle = () => setModal(!modal);

    const handleCardClick = (event) => {
        const eventId = parseInt(event.currentTarget.getAttribute("data-id"), 10);
        const selectedEventData = events.find((event) => event.id === eventId);
        setSelectedEvent(selectedEventData);
        toggle();
    };

    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>
                <Breadcrumbs
                        title="Liste des événements"
                        breadcrumbItems={[]}
                    />
                    <Row>
                        {events.map((event) => (
                            <Col key={event.id} sm={6} md={4} lg={3}>
                                <Card className="mb-3 small-card" style={{ cursor: "pointer" }} onClick={handleCardClick} data-id={event.id}>
                                    <CardBody>
                                        <img
                                            className="img-fluid rounded m-2 holder-image small-card-image"
                                            src={event.image}
                                            alt={event.titre}
                                        />
                                        <hr />
                                        <CardTitle tag="h6">{event.titre}</CardTitle>
                                        <p className="small-card-date">{event.date}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{selectedEvent && selectedEvent.titre}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md={6}>
                                <img
                                    className="img-fluid rounded mb-3"
                                    src={selectedEvent && selectedEvent.image}
                                    alt={selectedEvent && selectedEvent.titre}
                                />
                            </Col>
                            <Col md={6}>
                                <p>Lieu: {selectedEvent && selectedEvent.lieu}</p>
                                <p>Date: {selectedEvent && selectedEvent.date}</p>
                                <p>Description: {selectedEvent && selectedEvent.description}</p>
                                <p>Ville: {selectedEvent && selectedEvent.city}</p>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default Listevenment;
