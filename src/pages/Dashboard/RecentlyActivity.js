import React, { Component } from 'react';
import { Card, CardBody, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

//Simple bar
import SimpleBar from "simplebar-react";

class RecentlyActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        }
    }

    render() {
        return (
            <React.Fragment>
                <Col lg={4}>
                    <Card>
                        <CardBody>
                            {/* <Dropdown className="float-end" isOpen={this.state.menu} toggle={() => this.setState({ menu: !this.state.menu })}>
                                <DropdownToggle tag="i" className="darrow-none card-drop" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem href="">Sales Report</DropdownItem>

                                    <DropdownItem href="">Export Report</DropdownItem>

                                    <DropdownItem href="">Profit</DropdownItem>

                                    <DropdownItem href="">Action</DropdownItem>
                                </DropdownMenu>
                            </Dropdown> */}

                            <h4 className="card-title mb-4">Activités récentes</h4>

                            <SimpleBar style={{ maxHeight: "330px" }}>
                                <ul className="list-unstyled activity-wid">
                                    <li className="activity-list">
                                        <div className="activity-icon avatar-xs">
                                            <span className="avatar-title bg-primary-subtle text-primary rounded-circle">
                                                <i className="ri-file-add-fill"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <div>
                                                <h5 className="font-size-13">28 Apr, 2023 <small className="text-muted">12:07 am</small></h5>
                                            </div>

                                            <div>
                                                <p className="text-muted mb-0">Ahmed a ajouté un fichier intitulé "Formation 2024".</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="activity-list">
                                        <div className="activity-icon avatar-xs">
                                            <span className="avatar-title bg-primary-subtle text-primary rounded-circle">
                                                <i className="ri-file-add-fill"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <div>
                                                <h5 className="font-size-13">21 Apr, 2023 <small className="text-muted">08:01 pm</small></h5>
                                            </div>

                                            <div>
                                            <p className="text-muted mb-0">Omar a ajouté un fichier intitulé "Formation 2024".</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="activity-list">
                                        <div className="activity-icon avatar-xs">
                                            <span className="avatar-title bg-primary-subtle text-primary rounded-circle">
                                                <i className="ri-file-add-fill"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <div>
                                                <h5 className="font-size-13">17 Apr, 2023 <small className="text-muted">09:23 am</small></h5>
                                            </div>

                                            <div>
                                            <p className="text-muted mb-0">Ahmed a ajouté un fichier intitulé "Formation 2023".</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="activity-list">
                                        <div className="activity-icon avatar-xs">
                                            <span className="avatar-title bg-primary-subtle text-primary rounded-circle">
                                                <i className="ri-file-add-fill"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <div>
                                                <h5 className="font-size-13">11 Apr, 2023 <small className="text-muted">05:10 pm</small></h5>
                                            </div>

                                            <div>
                                            <p className="text-muted mb-0">Yassin a ajouté un fichier intitulé "Formation 2022".</p>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </SimpleBar>
                        </CardBody>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }
}

export default RecentlyActivity;