import React from "react";
import "./App.scss";
import store from "../../state-mgmt/store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "../Header/Header";
import Registro from "../Auth/Registro";
import InicioSesion from "../Auth/InicioSesion";
import CuentasLista from "../Cuentas/CuentasLista";
import CuentaDetalles from "../Cuentas/CuentaDetalles";
import TransaccionesLista from "../Transacciones/TransaccionesLista";
import TransaccionDetalles from "../Transacciones/TransaccionDetalles";
import AuthRoute from "./AuthRoute";
import PrestamosLista from "../Prestamos/PrestamosLista";
import PrestamoDetalles from "../Prestamos/PrestamoDetalles";
import Transferencias from "../Transferencias/Transferencias";
import SecuredRoute from "./SecuredRoute";

import "notyf/notyf.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="container">
          <Route path="/" exact component={Home} />

          <AuthRoute path="/auth/registrarse" component={Registro} />
          <AuthRoute
            path="/auth/iniciar-sesion"
            exact
            component={InicioSesion}
          />
          <SecuredRoute
            path="/cuentas/:_id/detalles"
            component={CuentaDetalles}
          />
          <SecuredRoute
            path="/cuentas/:_id/transacciones"
            component={TransaccionesLista}
          />
          <SecuredRoute
            path="/cuentas/:_id/transacciones/:transaccion_id/detalles/:tipo"
            component={TransaccionDetalles}
          />
          <SecuredRoute path="/cuentas" component={CuentasLista} />

          <SecuredRoute path="/prestamos" component={PrestamosLista} />
          <SecuredRoute
            path="/prestamos/:_id/detalles"
            component={PrestamoDetalles}
          />
          <SecuredRoute path="/transferencias" component={Transferencias} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
