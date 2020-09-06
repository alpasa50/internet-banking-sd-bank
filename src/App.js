import React from "react";
import "./App.css";
import store from "../src/state-mgmt/store/index";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
