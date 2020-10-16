import axios from "axios";
import { API_URL } from "../../utils/constants";
import {
  FETCH_CUENTAS_FROM_CLIENTE_CEDULA,
  FETCH_CUENTAS_FROM_CLIENTE_ID,
  FETCH_TRANSACCIONES_CUENTA,
  FETCH_CUENTA_BY_ID,
  TRANSFERENCIA_PERSONAL,
  FETCH_TIPO_TRANSACCION,
  FETCH_TRANSACCION_BY_ID,
  TRANSFERENCIA_A_TERCERO,
  FETCH_CUENTA_FROM_TERCERO,
  FETCH_BENEFICIARIOS_FROM_CUENTA,
  TRANSFERENCIA_INTERBANCARIA,
  CREATE_BENEFICIARIO,
  DELETE_BENEFICIARIO,
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

  console.log(data);

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

export const realizarTransferenciaPersonal = (numero_de_cuenta, body) => async (
  dispatch
) => {
  const { data } = await axios.put(
    `${BASE_CUENTA_URL}/${numero_de_cuenta}/transferencia-personal`,
    body
  );

  dispatch({
    type: TRANSFERENCIA_PERSONAL,
    payload: data,
  });
};

export const transferirATercero = (_id, body) => async (dispatch) => {
  const { data } = await axios.put(
    `${BASE_CUENTA_URL}/${_id}/transferencia-mismo-banco`,
    body
  );

  dispatch({
    type: TRANSFERENCIA_A_TERCERO,
    payload: data,
  });
};

export const transferirAOtroBanco = (_id, body) => async (dispatch) => {
  const { data } = await axios.put(
    `${BASE_CUENTA_URL}/${_id}/transferencia-interbancaria`,
    body
  );

  console.log(data);

  dispatch({
    type: TRANSFERENCIA_INTERBANCARIA,
    payload: data,
  });
};

export const fetchClienteNCuentaFromTercero = (_id, numero_de_cuenta) => async (
  dispatch
) => {
  const { data } = await axios.get(
    `${BASE_CUENTA_URL}/${numero_de_cuenta}/cliente/${_id}/cliente-cuenta`
  );

  console.log(data);
  dispatch({
    type: FETCH_CUENTA_FROM_TERCERO,
    payload: data,
  });
};

export const fetchBeneficiariosFromCuenta = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${BASE_CUENTA_URL}/${_id}/beneficiarios`);

  console.log(data);

  dispatch({
    type: FETCH_BENEFICIARIOS_FROM_CUENTA,
    payload: data,
  });
};

export const fetchBeneficiariosMismoBanco = (_id) => async (dispatch) => {
  const { data } = await axios.get(
    `${BASE_CUENTA_URL}/${_id}/beneficiarios-mismo-banco`
  );

  dispatch({
    type: FETCH_BENEFICIARIOS_FROM_CUENTA,
    payload: data,
  });
};

export const fetchBeneficiariosInterbancarios = (_id) => async (dispatch) => {
  const { data } = await axios.get(
    `${BASE_CUENTA_URL}/${_id}/beneficiarios-interbancarios`
  );

  dispatch({
    type: FETCH_BENEFICIARIOS_FROM_CUENTA,
    payload: data,
  });
};

export const createBeneficiario = (_id, body) => async (dispatch) => {
  console.log("hello World!");

  const { data } = await axios.post(
    `${BASE_CUENTA_URL}/${_id}/beneficiarios`,
    body
  );

  dispatch({
    type: CREATE_BENEFICIARIO,
    payload: data,
  });
};

export const deleteBeneficiario = (_id) => async (dispatch) => {
  const { data } = await axios.delete(`${BASE_CUENTA_URL}/beneficiarios/${_id}`);

  dispatch({
    type: DELETE_BENEFICIARIO,
    payload: data,
  });
};
