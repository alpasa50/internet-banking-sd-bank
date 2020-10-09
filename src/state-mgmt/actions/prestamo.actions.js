import axios from "axios";
import { API_URL } from "../../utils/constants";
import {
  FETCH_PRESTAMO_BY_ID,
  FETCH_PRESTAMOS_FROM_CLIENTE_ID,
  PAGAR_PRESTAMO,
} from "../types/prestamo.types";

const BASE_PRESTAMO_URL = `${API_URL}/prestamos`;

export const fetchPrestamoById = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${BASE_PRESTAMO_URL}/${_id}`);

  dispatch({
    type: FETCH_PRESTAMO_BY_ID,
    payload: data,
  });
};

export const fetchPrestamosFromClienteId = (clienteId) => async (dispatch) => {
  const { data } = await axios.get(
    `${BASE_PRESTAMO_URL}/cliente/${clienteId}/`
  );
  dispatch({
    type: FETCH_PRESTAMOS_FROM_CLIENTE_ID,
    payload: data,
  });
};

export const saldarPrestamo = (_id, body) => async (dispatch) => {
  await axios.put(`${BASE_PRESTAMO_URL}/${_id}/pago`, body);

  dispatch({
    type: PAGAR_PRESTAMO,
    payload: {},
  });
};
