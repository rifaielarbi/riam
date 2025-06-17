import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

// const AppRoute = ({
// 	component: Component,
// 	layout: Layout,
// 	isAuthProtected,
// 	...rest
// }) => (
// 		<Route
// 			{...rest}
// 			render={props => {

// 				if (isAuthProtected && !localStorage.getItem("authUser")) {
// 					return (
// 						<Navigate to={{ pathname: "/login", state: { from: props.location } }} />
// 					);
// 				}

// 				return (
// 					<Layout>
// 						<Component {...props} />
// 					</Layout>
// 				);
// 			}}
// 		/>
// 	);



const AppRoute = (props) => {

	useEffect(() =>{
		const Data = localStorage.getItem("authUser")
		},[])

	if (!localStorage.getItem("authUser") ) {
		return (
		  <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
		);
	  }

	  if (localStorage.getItem("nonMember") === "true") {
		return (
		  <Navigate to={{ pathname: "/pricing", state: { from: props.location } }} />
		);
	  }

	//   if (JSON.parse(localStorage.getItem("nonMember")) == true  ) {
	// 	// alert('non member : ' + localStorage.getItem("nonMember"))
	// 	return (
	// 	  <Navigate to={{ pathname: "/comingsoon", state: { from: props.location } }} />
	// 	);
	//   }

	  return (<React.Fragment>
		{props.children}
	  </React.Fragment>);
}

export default AppRoute;

