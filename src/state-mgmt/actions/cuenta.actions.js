import axios from "axios";
import { API_URL } from "../../utils/constants";
import {
  FETCH_CUENTAS_FROM_CLIENTE_CEDULA,
  FETCH_CUENTAS_FROM_CLIENTE_ID,
  FETCH_TRANSACCIONES_CUENTA,
  FETCH_CUENTA_BY_ID,
  FETCH_TIPO_TRANSACCION,
  FETCH_TRANSACCION_BY_ID,
} from "../types/cuenta-types";

const BASE_CUENTA_URL = `${API_URL}/cuentas`;

export const fetchCuentaById = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${BASE_CUENTA_URL}/${_id}`);

  dispatch({
    type: FETCH_CUENTA_BY_ID,
    payload: data,
  });
};

export const fetchCuentasByClienteId = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${BASE_CUENTA_URL}/cliente/${_id}`);

  dispatch({
    type: FETCH_CUENTAS_FROM_CLIENTE_ID,
    payload: data,
  });
};

export const fetchCuentasFromClienteCedula = (cedula) => async (dispatch) => {
  const { data } = await axios.get(
    `${BASE_CUENTA_URL}/cliente/por-cedula/${cedula}`
  );

  dispatch({
    type: FETCH_CUENTAS_FROM_CLIENTE_CEDULA,
    payload: data,
  });
};

export const fetchTransaccionesFromCuenta = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${BASE_CUENTA_URL}/${_id}/transacciones`);

  dispatch({
    type: FETCH_TRANSACCIONES_CUENTA,
    payload: data,
  });
};

export const fetchTipoDeTransaccionById = (_id) => async (dispatch) => {
  const { data } = await axios.get(
    `${BASE_CUENTA_URL}/transacciones/${_id}/tipo`
  );

  dispatch({
    type: FETCH_TIPO_TRANSACCION,
    payload: data,
  });
};

export const fetchTransaccionById = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${BASE_CUENTA_URL}/transacciones/${_id}`);

  dispatch({
    type: FETCH_TRANSACCION_BY_ID,
    payload: data,
  });
};
