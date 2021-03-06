import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { Route, BrowserRouter } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { createStore, applyMiddleware } from "redux";

import App from "./components/App.js";
import reducers from "./reducers/reducers_index.js";

import CustomerLogin from "./components/customer/CustomerLogin.js";
import CustomerDashboard from "./components/customer/CustomerDashboard.js";

import AdminLogin from "./components/admin/AdminLogin.js";
import AdminDashboard from "./components/admin/AdminDashboard.js";
import RequireAdminAuth from "./components/hoc/requireAdminAuth.js";
import RequireCustomerAuth from "./components/hoc/requireCustomerAuth.js";
import Landing from "./components/landing.js";
import { styles } from "./styles/styles";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <div className="body" style={styles.body}>
          <Route path="/" component={App} />
          <Route exact path="/" component={Landing} />
          <Route
            path="/customer/dashboard"
            component={RequireCustomerAuth(CustomerDashboard)}
          />

          <Route exact path="/customer/login" component={CustomerLogin} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route
            path="/admin/dashboard"
            component={RequireAdminAuth(AdminDashboard)}
          />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector("#root")
);
