import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import classnames from 'classnames';

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

const Pricing = () => {
    const [activeTab, setActiveTab] = useState('1');
    const navigate = useNavigate();

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    useEffect(() => {
        // Your existing code for updating document title
    }, []);

    const handleLogoutClick = () => {
        localStorage.removeItem("authUser");
        localStorage.setItem("nonMember", "false");
        navigate('/login')
        // window.location.reload()
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* <Breadcrumbs title="Pricing" breadcrumbItems={this.state.breadcrumbItems} /> */}
                    <p onClick={handleLogoutClick}>Logout</p>
                    <Row className="justify-content-center">
                        <Col lg={5}>
                            <div className="text-center mb-5">
                                <h4>Simple Pricing Plans</h4>
                                <p className="text-muted mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo veritatis</p>

                                <Nav pills className="pricing-nav-tabs">
                                    <NavItem>
                                        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggleTab('1'); }}>Monthly</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classnames({ active: activeTab === '2' }, "ms-1")} onClick={() => { toggleTab('2'); }}>Yearly</NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        {/* ... Rest of your code for pricing boxes */}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Pricing;
