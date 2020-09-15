import { combineReducers } from "redux";
import clientesReducer from "./cliente-reducer";
import authReducer from "./auth-reducer";

export default combineReducers({
  clientes: clientesReducer,
  auth: authReducer,
});
