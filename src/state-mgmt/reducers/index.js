import { combineReducers } from "redux";
import clientesReducers from "./cliente-reducers";

export default combineReducers({
  clientes: clientesReducers,
});
