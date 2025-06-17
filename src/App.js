import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import { authProtectedRoutes, publicRoutes, nonMemberRoutes } from "./routes";
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./routes/NonAuthLayout";
import NonMemberLayout from "./routes/NonMemberLayout";
import AppRoute from "./routes/route";
import Error404 from "./pages/Utility/Error404";

import "./assets/scss/theme.scss";

class App extends Component {
  getLayout = () => {
    switch (this.props.layout.layoutType) {
      case "horizontal":
        return HorizontalLayout;
      default:
        return VerticalLayout;
    }
  };

  render() {
    const Layout = this.getLayout();

    return (
        <Routes>
          {publicRoutes.map((route, idx) => (
              <Route
                  path={route.path}
                  element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                  key={idx}
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
              />
          ))}

          {nonMemberRoutes.map((route, idx) => (
              <Route
                  path={route.path}
                  element={
                    <NonMemberLayout>{route.component}</NonMemberLayout>
                  }
                  key={idx}
              />
          ))}

          <Route path="*" element={<Error404 />} />
        </Routes>
    );
  }
}

const mapStateToProps = (state) => ({
  layout: state.Layout,
});

export default connect(mapStateToProps)(App);
