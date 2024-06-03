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
            titre: "Tech Conference 2024",
            lieu: "Conference Hall A",
            description: "A conference showcasing the latest in tech innovations.",
            city: "San Francisco",
            date: "2024-07-10",
            image: defaultEventImage,
        },
        {
            id: 2,
            titre: "Art Expo",
            lieu: "Art Gallery",
            description: "An exhibition of modern art from around the world.",
            city: "New York",
            date: "2024-08-15",
            image: defaultEventImage,
        },
        {
            id: 3,
            titre: "Music Festival",
            lieu: "Central Park",
            description: "A day-long festival featuring various music artists.",
            city: "Chicago",
            date: "2024-09-05",
            image: defaultEventImage,
        },
        {
            id: 4,
            titre: "Startup Pitch Night",
            lieu: "Tech Hub",
            description: "An evening where startups pitch their ideas to investors.",
            city: "Seattle",
            date: "2024-06-20",
            image: defaultEventImage,
        },
        {
            id: 5,
            titre: "Food Carnival",
            lieu: "City Square",
            description: "A carnival with food stalls, cooking demos, and more.",
            city: "Los Angeles",
            date: "2024-10-01",
            image: defaultEventImage,
        },
        {
            id: 6,
            titre: "Book Fair",
            lieu: "Exhibition Center",
            description: "A fair with book signings, readings, and author meet-and-greets.",
            city: "Boston",
            date: "2024-11-12",
            image: defaultEventImage,
        },
        {
            id: 7,
            titre: "Marathon",
            lieu: "City Streets",
            description: "Annual marathon with participants from all over the world.",
            city: "Berlin",
            date: "2024-09-25",
            image: defaultEventImage,
        },
        {
            id: 8,
            titre: "Science Fair",
            lieu: "University Hall",
            description: "A fair showcasing scientific projects and experiments.",
            city: "Cambridge",
            date: "2024-07-22",
            image: defaultEventImage,
        },
        {
            id: 9,
            titre: "Fashion Show",
            lieu: "Fashion Avenue",
            description: "A show featuring the latest fashion trends by top designers.",
            city: "Paris",
            date: "2024-08-30",
            image: defaultEventImage,
        },
        {
            id: 10,
            titre: "Film Festival",
            lieu: "Cinemax Theater",
            description: "A festival featuring films from various genres and countries.",
            city: "Toronto",
            date: "2024-10-15",
            image: defaultEventImage,
        }
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
                        title="List Evenments"
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
