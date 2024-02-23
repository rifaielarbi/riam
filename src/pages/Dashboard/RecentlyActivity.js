import moment from 'moment';
import React, { useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const RecentlyActivity = ({latestFiles}) => {

    return (
        <React.Fragment>
            <Col lg={4}>
                <Card>
                    <CardBody>
                        {/* 
                        <Dropdown className="float-end" isOpen={menu} toggle={() => setMenu(!menu)}>
                            <DropdownToggle tag="i" className="darrow-none card-drop" aria-expanded="false">
                                <i className="mdi mdi-dots-vertical"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="">Sales Report</DropdownItem>
                                <DropdownItem href="">Export Report</DropdownItem>
                                <DropdownItem href="">Profit</DropdownItem>
                                <DropdownItem href="">Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> 
                        */} 

                        <h4 className="card-title mb-4">Fichiers récents</h4>

                        <SimpleBar style={{ maxHeight: "330px" }}>
                            <ul className="list-unstyled activity-wid">
                                {latestFiles.map((item,key) =>{
                                    return(
                                        <li className="activity-list">
                                        <div className="activity-icon avatar-xs">
                                            <span className="avatar-title bg-primary-subtle text-primary rounded-circle">
                                                <i className="ri-file-add-fill"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <div>
                                                <h5 className="font-size-13">{moment(item.timeadd).format('DD/MM/YYYY')} <small className="text-muted">{moment(item.timeadd).format('hh:mm a')}</small></h5>
                                            </div>

                                            <div>
                                                <p className="text-muted mb-0">{item.NomComplet} a ajouté un fichier intitulé "{item.Filename}".</p>
                                            </div>
                                        </div>
                                        </li>
                                    )
                                })}
                              
                            </ul>
                        </SimpleBar>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default RecentlyActivity;
