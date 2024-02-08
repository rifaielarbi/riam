import React, { Component } from 'react';
import withRouter from '../components/Common/withRouter';
import { Navigate } from 'react-router-dom';
// import { withRouter } from "react-router-dom";

class NonMemberLayout extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.capitalizeFirstLetter.bind(this);
    }
    
    capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
      };

      componentDidMount(){
        let currentage = this.capitalizeFirstLetter(this.props.router.location.pathname);
        currentage = currentage.replaceAll("-" , " ");

        document.title =
          currentage + " | Espace RIAM";
    }
    render() {
        if (localStorage.getItem("authUser")) {
            return (
                <Navigate to={{ pathname: "/dashboard", state: { from: this.props.location } }} />
              );
          }

          

          if (localStorage.getItem("nonMember") == "false") {
            return (
                <Navigate to={{ pathname: "/login", state: { from: this.props.location } }} />
              );
          }
        // if(localStorage.getItem("authUser"))


        return <React.Fragment>
            {this.props.children}
        </React.Fragment>;
    }
}

export default (withRouter(NonMemberLayout));