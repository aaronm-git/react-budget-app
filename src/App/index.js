import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";

import Firebase from "../firebase";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

class App extends Component {
  render() {
    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => <route.component {...props} />}
        />
      ) : null;
    });

    return (
      <Aux>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {Firebase.auth.currentUser ? (
                <Route path="/" component={AdminLayout} />
              ) : (
                <>
                  {menu}
                  {window.location.pathname.includes("/auth/signin-1") ||
                  window.location.pathname.includes("/auth/signup-1") ||
                  window.location.pathname.includes(
                    "/auth/reset-password-1"
                  ) ? null : (
                    <Redirect to="/auth/signin-1" />
                  )}
                </>
              )}
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Aux>
    );
  }
}

export default App;
