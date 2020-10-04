import {
  FETCH_CUENTAS_BY_CIENTE_ID,
  FETCH_CUENTA_BY_ID,
  FETCH_CUENTAS_FROM_CLIENTE_CEDULA,
  FETCH_CUENTAS_FROM_CLIENTE_ID,
  FETCH_TRANSACCIONES_CUENTA,
  FETCH_TIPO_TRANSACCION,
  FETCH_TRANSACCION_BY_ID,
} from "../types/cuenta-types";

const initialState = {
  cuentas: [],
  cuenta: {},
  transacciones: [],
  perfiles: [],
  transaccion: {},
  transaccionTipo: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CUENTAS_BY_CIENTE_ID:
      return {
        ...state,
        cuentas: action.payload,
      };
    case FETCH_CUENTA_BY_ID:
      return {
        ...state,
        cuenta: action.payload,
      };
    case FETCH_TIPO_TRANSACCION:
      return {
        ...state,
        transaccionTipo: action.payload,
      };
    case FETCH_TRANSACCION_BY_ID:
      return {
        ...state,
        transaccion: action.payload,
      };
    case FETCH_CUENTAS_FROM_CLIENTE_CEDULA:
      return {
        ...state,
        cuentas: action.payload,
      };
    case FETCH_CUENTAS_FROM_CLIENTE_ID:
      return {
        ...state,
        cuentas: action.payload,
      };
    case FETCH_TRANSACCIONES_CUENTA:
      return {
        ...state,
        transacciones: action.payload,
      };

    default:
      return state;
  }
}
