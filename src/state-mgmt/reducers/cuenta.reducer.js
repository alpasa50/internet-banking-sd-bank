import {
  FETCH_CUENTAS_BY_CIENTE_ID,
  FETCH_CUENTA_BY_ID,
  FETCH_CUENTAS_FROM_CLIENTE_CEDULA,
  FETCH_CUENTAS_FROM_CLIENTE_ID,
  FETCH_TRANSACCIONES_CUENTA,
  FETCH_TIPO_TRANSACCION,
  FETCH_TRANSACCION_BY_ID,
  TRANSFERENCIA_PERSONAL,
  TRANSFERENCIA_A_TERCERO,
  FETCH_CUENTA_FROM_TERCERO,
  FETCH_BENEFICIARIOS_FROM_CUENTA,
  TRANSFERENCIA_INTERBANCARIA,
  CREATE_BENEFICIARIO,
  DELETE_BENEFICIARIO,
} from "../types/cuenta-types";

const initialState = {
  cuentas: [],
  cuentasPersonales: [],
  cuentasMismoBanco: [],
  cuentaFromTercero: {},
  destinatario: null,
  cuenta: {},
  transacciones: [],
  perfiles: [],
  transaccion: {},
  beneficiarios: [],
  transaccionTipo: null,
  resFactura: null,
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
        cuentasPersonales: action.payload,
      };
    case TRANSFERENCIA_PERSONAL:
      return {
        ...state,
      };
    case TRANSFERENCIA_A_TERCERO:
      return {
        ...state,
      };
    case CREATE_BENEFICIARIO:
      return {
        ...state,
      };
    case DELETE_BENEFICIARIO:
      return {
        ...state,
      };
    case TRANSFERENCIA_INTERBANCARIA:
      return {
        ...state,
        resFactura: action.payload,
      };
    case FETCH_TRANSACCIONES_CUENTA:
      return {
        ...state,
        transacciones: action.payload,
      };
    case FETCH_CUENTA_FROM_TERCERO:
      return {
        ...state,
        cuentaFromTercero: action.payload.cuenta,
        destinatario: action.payload.cliente,
      };
    case FETCH_BENEFICIARIOS_FROM_CUENTA:
      return {
        ...state,
        beneficiarios: action.payload,
      };
    default:
      return state;
  }
}
