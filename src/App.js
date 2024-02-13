import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes, nonMemberRoutes } from "./routes";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./routes/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

//Fake backend
// import fakeBackend from './helpers/AuthType/fakeBackend';
import AppRoute from "./routes/route";
import Error404 from "./pages/Utility/Error404";
import NonMemberLayout from "./routes/NonMemberLayout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getLayout = this.getLayout.bind(this);
  }

  /**
   * Returns the layout
   */
  getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (this.props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  render() {
    const Layout = this.getLayout();
    const userData = localStorage.getItem("authUser");

    return (
      <React.Fragment>
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <NonAuthLayout>{route.component}</NonAuthLayout>
              }
              key={idx}
              exact={true}
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AppRoute>
                  <Layout>{route.component}</Layout>
                </AppRoute>
              }
              key={idx}
              exact={true}
            />
          ))}

          {nonMemberRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <NonMemberLayout>{route.component}</NonMemberLayout>
              }
              key={idx}
              exact={true}
            />
          ))}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
