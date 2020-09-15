import {
  FETCH_CLIENTE_BY_ID,
  FETCH_CLIENTE_BY_CEDULA,
} from "../types/cliente-types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchClienteById = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/clientes/${_id}`);

  dispatch({
    type: FETCH_CLIENTE_BY_ID,
    payload: data,
  });
};

export const fetchClienteByCedula = (cedula) => async (dispatch) => {
  const params = {
    cedula,
  };

  const { data } = await axios.get(`${API_URL}/clientes/por_cedula/${cedula} `);

  console.log(data);

  dispatch({
    type: FETCH_CLIENTE_BY_CEDULA,
    payload: data,
  });
};
