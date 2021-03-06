import { combineReducers } from "redux";
import clienteReducer from "./cliente.reducer";
import cuentaReducer from "./cuenta.reducer";
import authReducer from "./auth.reducer";
import prestamoReducer from "./prestamo.reducer";

export default combineReducers({
  auth: authReducer,
  clientes: clienteReducer,
  cuentas: cuentaReducer,
  prestamos: prestamoReducer,
});
