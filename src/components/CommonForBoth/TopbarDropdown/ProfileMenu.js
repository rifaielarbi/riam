import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withTranslation } from "react-i18next";
import avatar from '../../../assets/icons/user.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ t }) => {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    const toggle = () => {
        setMenu(prevMenu => !prevMenu);
    };

    const logout  = async () =>{
        localStorage.removeItem("authUser");
        localStorage.setItem("nonMember", "false");
        // navigate('/login')
        window.location.reload()
   }


    let username = "";
    if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        console.log(obj)
        username = obj.fullname
    }

    const openProfile = () =>{
        navigate('/profile')
    }

    return (
        <React.Fragment>
            <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block user-dropdown">
                <DropdownToggle tag="button" className="btn header-item waves-effect" id="page-header-user-dropdown">
                    <img className="rounded-circle header-profile-user me-1" src={avatar} alt="Header Avatar" />
                    <span className="d-none d-xl-inline-block ms-1 text-transform">{username}</span>
                    <i className="mdi mdi-chevron-down d-none ms-1 d-xl-inline-block"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    {/* <DropdownItem href="#"><i className="ri-user-line align-middle me-1"></i> {t('Profile')}</DropdownItem>
                    <DropdownItem href="#"><i className="ri-wallet-2-line align-middle me-1"></i> {t('My Wallet')}</DropdownItem>
                    <DropdownItem className="d-block" href="#"><span className="badge badge-success float-end mt-1">11</span><i className="ri-settings-2-line align-middle me-1"></i> {t('Settings')}</DropdownItem>
                    */}
                    <DropdownItem onClick={openProfile}><i className="ri-user-line align-middle me-1"></i> {t('Profil')}</DropdownItem>
                    <DropdownItem divider /> 
                    <DropdownItem className="text-danger" onClick={logout}><i className="ri-shut-down-line align-middle me-1 text-danger"></i> {t('Logout')}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default withTranslation()(ProfileMenu);
