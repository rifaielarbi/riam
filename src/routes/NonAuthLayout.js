import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const NonAuthLayout = (props) => {
  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };
  const UserData = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    let currentage = capitalizeFirstLetter(window.location.pathname);
    currentage = currentage.replaceAll("-", " ");
    document.title = currentage + " | Espace RIAM";
    console.log(UserData)
  }, []);

  if (UserData ) {
    if(UserData.role == 1){
    return (
        <Navigate to={{ pathname: "/dashboard", state: { from: props.location } }} />
      );
    } 
    if(UserData.role == 4 || UserData.role == 3  ){
      return (
        <Navigate to={{ pathname: "/DemandeLab", state: { from: props.location } }} />
      );
    }

  } 

  if (localStorage.getItem("nonMember") == "true") {
    return (
      <Navigate to={{ pathname: "/pricing", state: { from: props.location } }} />
    );
  }	
  
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default NonAuthLayout;
