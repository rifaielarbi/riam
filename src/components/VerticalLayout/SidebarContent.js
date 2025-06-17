import React, { useEffect, useState } from "react";
import MetisMenu from "metismenujs";
import { Link, useLocation } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../Common/withRouter";

import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader
} from "../../store/actions";

const Data = JSON.parse(localStorage.getItem("authUser"));

const SidebarContent = ({ t }) => {
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  const dispatch = useDispatch();
  const layoutState = useSelector(state => state.Layout);

  useEffect(() => {
    initMenu();
  }, [location.pathname, layoutState.type]);

  const isActive = (path) => location.pathname === path;


  const initMenu = () => {
    new MetisMenu("#side-menu");
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      //activateParentDropdown(matchingMenuItem);
    }
  };

  const activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active");
          parent3.childNodes[0].classList.add("mm-active");
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    setPathName(location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">{t('Menu')}</li>
          {Data?.role === 1 &&
              <li>
                <Link to="/dashboard" className="waves-effect"
                      style={isActive('/dashboard') ? {color: 'white'} : {color: "#8590a5"}}

                >
                  <i className="ri-dashboard-line" style={{fontWeight: isActive('/dashboard') ? "bold" : "500"}}></i>
                  <span className="ms-1">{t('Dashboard')}</span>
                </Link>
              </li>
          }
          {Data?.role === 1 &&
              <li>
                <Link to="/members" className="waves-effect"
                      style={isActive('/members') ? {color: 'white'} : {color: "#8590a5"}}

                >
                  <i className="ri-team-fill" style={{fontWeight: isActive('/members') ? "bold" : "500"}}></i>
                  <span className="ms-1">{t('GestionDroit')}</span>
                </Link>
              </li>
          }
          {Data?.role === 1 &&
              <li>
                <Link to="/adfiles" className="waves-effect"
                      style={isActive('/adfiles') ? {color: 'white'} : {color: "#8590a5"}}
                >
                  <i className="ri-upload-fill" style={{fontWeight: isActive('/adfiles') ? "bold" : "500"}}></i>
                  <span className="ms-1">{t('upload files')}</span>
                </Link>
              </li>
          }

          {(Data?.role === 3 || Data?.role === 1) &&
              <li>
                <Link to="/DemandeLab" className="waves-effect"
                      style={isActive('/DemandeLab') ? {color: 'white'} : {color: "#8590a5",}}
                >
                  <i className="ri-file-edit-line" style={{fontWeight: isActive('/members') ? "bold" : "500"}}></i>
                  <span className="ms-1">Demande de labellisation</span>
                </Link>
              </li>
          }

          {Data?.role === 1 &&
              <li>
                <Link to="/DemandeLabList" className="waves-effect"
                      style={isActive('/DemandeLabList') ? {color: 'white'} : {color: "#8590a5",}}
                >
                  <i className="ri-file-list-line" style={{fontWeight: isActive('/members') ? "bold" : "500"}}></i>

                  <span className="ms-1">labellisation liste</span>
                </Link>
              </li>
          }

          {(Data?.role === 3 || Data?.role === 4) &&
              <li>
                <Link to="/formation" className="waves-effect"
                      style={isActive('/formation') ? {color: 'white'} : {color: "#8590a5"}}
                >
                  <i className="ri-book-2-line" style={{fontWeight: isActive('/members') ? "bold" : "500"}}></i>

                  <span className="ms-1">Demande de formation</span>

                </Link>
              </li>
          }

          {Data?.role === 1 && (
              <>
                <li>
                  <Link to="/point-de-vente" className="waves-effect"
                        style={isActive('/point-de-vente') ? {color: 'white'} : {color: "#8590a5",}}
                  >
                    <i className="ri-store-3-fill"></i>
                    <span className="ms-1">Point de Vente</span>
                  </Link>
                </li>

              </>
          )}


          {Data?.role === 1 &&
              <li>
                <Link to="/evenments" className="waves-effect"
                      style={isActive('/evenments') ? {color: 'white'} : {color: "#8590a5",}}
                >
                  <i className="ri-calendar-event-fill" style={{fontWeight: isActive('/members') ? "bold" : "500"}}></i>
                  <span className="ms-1">Ajouter Evenments</span>
                </Link>
              </li>
          }
          {Data?.role === 4 &&
              <li>
                <Link to="/List-evenment" className="waves-effect">
                  <i className="ri-file-paper-2-line" style={{fontWeight: isActive('/members') ? "bold" : "500"}}></i>
                  <span className="ms-1">List Evenment</span>
                </Link>
              </li>
          }


          {Data?.role === 4 &&
              <li>
                <Link to="/ListeAgriculteurs" className="waves-effect">
                  <i className="ri-group-line" style={{fontWeight: isActive('/members') ? "bold" : "500"}}></i>

                  <span className="ms-1">liste des agriculteurs</span>
                </Link>
              </li>
          }
          {(Data?.role === 3 || Data?.role === 4) && (
              <li>
                <Link to="/mes-fichier" className="waves-effect"
                      style={isActive('/mes-fichier') ? {color: 'white'} : {color: '#8590a5'}}>
                  <i className="ri-article-line" style={{fontWeight: isActive('/members') ? "bold" : "500"}}></i>

                  <span className="ms-1">Mes fichiers</span>
                </Link>
              </li>
          )}
          <li>
            <Link to="/files" className="waves-effect"
                  style={isActive('/files') ? {color: 'white'} : {color: "#8590a5"}}
            >
              <i className="ri-folder-2-line" style={{fontWeight: isActive('/members') ? "bold" : "500"}}></i>

              <span className="ms-1">{t('Bibliothèque')}</span>
            </Link>
          </li>
          <li>
            <a
                href="https://jnaneco.ma/"
                className="waves-effect"
                style={isActive('/#') ? {color: 'white'} : {color: '#8590a5'}}
                target="_blank" // ou enlève target si tu veux que ça s’ouvre dans la même fenêtre
                rel="noopener noreferrer"
            >
              <i className="ri-store-2-line"></i>
              <span className="ms-1">{t('Ecommerce')}</span>
            </a>
          </li>

        </ul>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(SidebarContent));
