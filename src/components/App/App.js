import React from "react";
import "./App.css";
import store from "../../state-mgmt/store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "../Header/Header";
import Registro from "../Auth/Registro";
import InicioSesion from "../Auth/InicioSesion";
import AuthRoute from "./AuthRoute";
// import SecuredRoute from "./SecuredRoute";
import "notyf/notyf.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="App ">
          <Route path="/" exact component={Home} />

          <AuthRoute path="/auth/registrarse" exact component={Registro} />
          <AuthRoute
            path="/auth/iniciar-sesion"
            exact
            component={InicioSesion}
          />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
