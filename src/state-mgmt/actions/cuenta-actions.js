import axios from "axios";
import { API_URL } from "../../utils/constants";
import {
  FETCH_CUENTA_DETALLES,
  FETCH_CUENTAS_FROM_CLIENTE_CEDULA,
  FETCH_CUENTAS_FROM_CLIENTE_ID,
  FETCH_TRANSACCIONES_CUENTA,
} from "../types/cuenta-types";

const BASE_CUENTA_URL = `${API_URL}/cuentas`;

export const fetchCuentaDetallesById = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${BASE_CUENTA_URL}/${_id}`);

  dispatch({
    type: FETCH_CUENTAS_FROM_CLIENTE_CEDULA,
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

export const fetchCuentaDetallesFromNoCuenta = (numero_de_cuenta) => async (
  dispatch
) => {
  const { data } = await axios.get(
    `${BASE_CUENTA_URL}/${numero_de_cuenta}/detalles`
  );

  dispatch({
    type: FETCH_CUENTA_DETALLES,
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
