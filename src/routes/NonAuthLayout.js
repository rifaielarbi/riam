import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const NonAuthLayout = (props) => {
  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  useEffect(() => {
    let currentage = capitalizeFirstLetter(window.location.pathname);
    currentage = currentage.replaceAll("-", " ");
    document.title = currentage + " | Espace RIAM";
  }, []);

  if (localStorage.getItem("authUser") ) {
    return (
        <Navigate to={{ pathname: "/dashboard", state: { from: props.location } }} />
      );
  } 

  if (localStorage.getItem("nonMember") == "true") {
    return (
      <Navigate to={{ pathname: "/pricing", state: { from: props.location } }} />
    );
  }	
  
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default NonAuthLayout;
