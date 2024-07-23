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
                style={isActive('/dashboard') ? { color: 'white'} : { color : "#8590a5" }}

              >
                <i className="ri-dashboard-line" style={{fontWeight : isActive('/dashboard') ? "bold" :  "500"}}></i>
                <span className="ms-1">{t('Dashboard')}</span>
              </Link>
            </li>
          }
          {Data?.role === 1 &&
            <li>
              <Link to="/members" className="waves-effect"
                style={isActive('/members') ? { color: 'white' } : { color : "#8590a5" }}

              >
                <i className="ri-team-fill" style={{fontWeight : isActive('/members') ? "bold" :  "500"}}></i>
                <span className="ms-1">{t('GestionDroit')}</span>
              </Link>
            </li>
          }
          {Data?.role === 1 &&
            <li>
              <Link to="/adfiles" className="waves-effect"
                style={isActive('/adfiles') ? { color: 'white'} : { color : "#8590a5" }}
              >
                <i className="ri-upload-fill" style={{fontWeight : isActive('/adfiles') ? "bold" :  "500"}}></i>
                <span className="ms-1">{t('upload files')}</span>
              </Link>
            </li>
          }

          {(Data?.role === 3 || Data?.role === 1) &&
            <li>
              <Link to="/DemandeLab" className="waves-effect"
                  style={isActive('/DemandeLab') ? { color: 'white' } : { color : "#8590a5" ,}}
              >
                <i className="ri-file-edit-line" style={isActive('/DemandeLab') ? {fontWeight : "bold",color: 'white'} :  {fontWeight : "500", color : "#8590a5"}}></i>
                <span className="ms-1">Demande de labellisation</span>
              </Link>
            </li>
          }

          {Data?.role === 1 &&
            <li>
              <Link to="/DemandeLabList" className="waves-effect">
                <i className="ri-file-list-line" style={isActive('/DemandeLabList') ? {fontWeight : "bold",color: 'white'} :  {fontWeight : "500", color : "#8590a5"}}></i>
                <span className="ms-1">labellisation liste</span>
              </Link>
            </li>
          }

          {(Data?.role === 3 ||  Data?.role === 4) &&
            <li>
              <Link to="/formation" className="waves-effect" 
                      style={isActive('/formation') ? { color: 'white' } : { color : "#8590a5"  }}
              >
                <i className="ri-book-2-line" style={isActive('/formation') ? {fontWeight : "bold",color: 'white'} :  {fontWeight : "500", color : "#8590a5"}}></i>
                <span className="ms-1">Demande de formation</span>
              </Link>
            </li>
          }

          {Data?.role === 4 && (
            <>
                <li>
                    <Link to="/point-de-vente" className="waves-effect">
                        <i className="ri-store-3-fill"></i>
                        <span className="ms-1">Point de Vente</span>
                    </Link>
                </li>
               
            </>
        )}
         

          {Data?.role === 1 &&
            <li>
              <Link to="/evenments" className="waves-effect">
                <i className="ri-calendar-event-fill" style={isActive('/evenments') ? {fontWeight : "bold",color: 'white'} :  {fontWeight : "500", color : "#8590a5"}}></i>
                <span className="ms-1">Ajouter Evenment</span>
              </Link>
            </li>
           } 
          {Data?.role === 4 &&
            <li>
              <Link to="/List-evenment" className="waves-effect">
                <i className="ri-file-paper-2-line" style={isActive('List-evenment') ? {fontWeight : "bold",color: 'white'} :  {fontWeight : "500", color : "#8590a5"}}></i>
                <span className="ms-1">List Evenment</span>
              </Link>
            </li>
         }


          {Data?.role === 4 &&
              <li>
                <Link to="/ListeAgriculteurs" className="waves-effect">
                  <i className="ri-group-line" style={isActive('List-evenment') ? {fontWeight : "bold",color: 'white'} :  {fontWeight : "500", color : "#8590a5"}}></i>
                  <span className="ms-1">liste des agriculteurs</span>
                </Link>
              </li>
          }    
          {(Data?.role === 3 ||  Data?.role === 4) && (
              <li>
                  <Link to="/mes-fichier" className="waves-effect" style={isActive('/mes-fichier') ? { color: 'white' } : { color: '#8590a5' }}>
                      <i className="ri-article-line" style={isActive('/mes-fichier') ? { fontWeight: 'bold', color: 'white' } : { fontWeight: '500', color: '#8590a5' }}></i>
                      <span className="ms-1">Mes fichiers</span>
                  </Link>
              </li>
         )}  
          <li>
            <Link to="/files" className="waves-effect"
                  style={isActive('/files') ? { color: 'white' } : { color : "#8590a5"  }}
>
              <i className="ri-folder-2-line" style={ isActive('files') ? {fontWeight : "bold",color: 'white'} :  {fontWeight : "500", color : "#8590a5"}}></i>
              <span className="ms-1">{t('Bibliothèque')}</span>
            </Link>
          </li>
          <li>
              <Link to="/#" className="waves-effect"
                    style={isActive('/#') ? { color: 'white' } : { color : "#8590a5"  }}
              >
                <i className="ri-store-2-line"></i>
                <span className="ms-1">{t('Ecommerce')}</span>
              </Link>
            </li>

            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-brush-line"></i>
                <span className="ms-1">{t('Icons')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/icons-remix">{t('Remix Icons')}</Link></li>
                <li><Link to="/material-design">{t('Material Design')}</Link></li>
                <li><Link to="/dripicons">{t('Dripicons')}</Link></li>
                <li><Link to="/font-awesome-5">{t('Font awesome 5')}</Link></li>
              </ul>
            </li> */}

           {/* theme Pages
             <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ms-1">{t('Calendar')}</span>
              </Link>
            </li>

            <li>
              <Link to="/chat" className=" waves-effect">
                <i className="ri-chat-1-line"></i>
                <span className="ms-1">{t('Chat')}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-store-2-line"></i>
                <span className="ms-1">{t('Ecommerce')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/ecommerce-products">{t('Products')}</Link></li>
                <li><Link to="/ecommerce-product-detail/1">{t('Product Detail')}</Link></li>
                <li><Link to="/ecommerce-orders">{t('Orders')}</Link></li>
                <li><Link to="/ecommerce-customers">{t('Customers')}</Link></li>
                <li><Link to="/ecommerce-cart">{t('Cart')}</Link></li>
                <li><Link to="/ecommerce-checkout">{t('Checkout')}</Link></li>
                <li><Link to="/ecommerce-shops">{t('Shops')}</Link></li>
                <li><Link to="/ecommerce-add-product">{t('Add Product')}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-mail-send-line"></i>
                <span className="ms-1">{t('Email')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/email-inbox">{t('Inbox')}</Link></li>
                <li><Link to="/email-read">{t('Read Email')}</Link></li>
              </ul>
            </li>

            <li className="menu-title">{t('Pages')}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-account-circle-line"></i>
                <span className="ms-1">{t('Authentication')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/login">{t('Login')}</Link></li>
                <li><Link to="/register">{t('Register')}</Link></li>
                <li><Link to="/forgot-password">{t('Recover Password')}</Link></li>
                <li><Link to="/lock-screen">{t('Lock Screen')}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-profile-line"></i>
                <span className="ms-1">{t('Utility')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/starter">{t('Starter Page')}</Link></li>
                <li><Link to="/maintenance">{t('Maintenance')}</Link></li>
                <li><Link to="/comingsoon">{t('Coming Soon')}</Link></li>
                <li><Link to="/timeline">{t('Timeline')}</Link></li>
                <li><Link to="/faqs">{t('FAQs')}</Link></li>
                <li><Link to="/pricing">{t('Pricing')}</Link></li>
                <li><Link to="/404">{t('Error 404')}</Link></li>
                <li><Link to="/500">{t('Error 500')}</Link></li>
              </ul>
            </li>

            <li className="menu-title">{t('Components')}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-pencil-ruler-2-line"></i>
                <span className="ms-1">{t('UI Elements')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/ui-alerts">{t('Alerts')}</Link></li>
                <li><Link to="/ui-buttons">{t('Buttons')}</Link></li>
                <li><Link to="/ui-cards">{t('Cards')}</Link></li>
                <li><Link to="/ui-carousel">{t('Carousel')}</Link></li>
                <li><Link to="/ui-dropdowns">{t('Dropdowns')}</Link></li>
                <li><Link to="/ui-grid">{t('Grid')}</Link></li>
                <li><Link to="/ui-images">{t('Images')}</Link></li>
                <li><Link to="/ui-lightbox">{t('Lightbox')}</Link></li>
                <li><Link to="/ui-modals">{t('Modals')}</Link></li>
                <li><Link to="/ui-rangeslider">{t('Range Slider')}</Link></li>
                <li><Link to="/ui-roundslider">{t('Round Slider')}</Link></li>
                <li><Link to="/ui-session-timeout">{t('Session Timeout')}</Link></li>
                <li><Link to="/ui-progressbars">{t('Progress Bars')}</Link></li>
                <li><Link to="/ui-tabs-accordions">{t('Tabs & Accordions')}</Link></li>
                <li><Link to="/ui-typography">{t('Typography')}</Link></li>
                <li><Link to="/ui-video">{t('Video')}</Link></li>
                <li><Link to="/ui-general">{t('General')}</Link></li>
                <li><Link to="/ui-rating">{t('Rating')}</Link></li>
                <li><Link to="/ui-notifications">{t('Notifications')}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="waves-effect">
                <i className="ri-eraser-fill"></i>
                <span className="badge rounded-pill bg-danger float-end">6</span>
                <span className="ms-1">{t('Forms')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/form-elements">{t('Form Elements')}</Link></li>
                <li><Link to="/form-validation">{t('Form Validation')}</Link></li>
                <li><Link to="/form-advanced">{t('Form Advanced Plugins')}</Link></li>
                <li><Link to="/form-editors">{t('Form Editors')}</Link></li>
                <li><Link to="/form-file-upload">{t('Form File Upload')}</Link></li>
                <li><Link to="/form-xeditable">{t('Form X-editable')}</Link></li>
                <li><Link to="/form-wizard">{t('Form Wizard')}</Link></li>
                <li><Link to="/form-mask">{t('Form Mask')}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-table-2"></i>
                <span className="ms-1">{t('Tables')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/basic-tables">{t('Basic Tables')}</Link></li>
                <li><Link to="/datatable-table">{t('Data Tables')}</Link></li>
                <li><Link to="/responsive-table">{t('Responsive Table')}</Link></li>
                <li><Link to="/editable-table">{t('Editable Table')}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-bar-chart-line"></i>
                <span className="ms-1">{t('Charts')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/apex-charts">{t("Apex Charts")}</Link></li>
                <li><Link to="/chartjs">{t('Chartjs Charts')}</Link></li>
                <li><Link to="/charts-knob">{t('Jquery Knob Charts')}</Link></li>
                <li><Link to="/charts-sparkline">{t('Sparkline Charts')}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-brush-line"></i>
                <span className="ms-1">{t('Icons')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/icons-remix">{t('Remix Icons')}</Link></li>
                <li><Link to="/material-design">{t('Material Design')}</Link></li>
                <li><Link to="/dripicons">{t('Dripicons')}</Link></li>
                <li><Link to="/font-awesome-5">{t('Font awesome 5')}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-map-pin-line"></i>
                <span className="ms-1">{t('Maps')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/google-maps">{t('Google Maps')}</Link></li>
                <li><Link to="/vector-maps">{t('Vector Maps')}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-share-line"></i>
                <span className="ms-1">{t('Multi Level')}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/#">{t('Level 1.1')}</Link></li>
                <li><Link to="/#" className="has-arrow">{t('Level 1.2')}</Link>
                  <ul className="sub-menu">
                    <li><Link to="/#">{t('Level 2.1')}</Link></li>
                    <li><Link to="/#">{t('Level 2.2')}</Link></li>
                  </ul>
                </li>
              </ul>
            </li>   */}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(SidebarContent));
