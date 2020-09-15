import React from "react";
import "./App.css";
import store from "../src/state-mgmt/store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import Registro from "./components/Auth/Registro/Registro";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="App ">
          <Route path="/" exact component={Home} />

          <Route path="/auth/registrarse" exact component={Registro} />
          {/* <Route path="/auth/iniciar-sesion" exact component={Inicio} /> */}
        </div>
      </Router>
    </Provider>
  );
};

export default App;
