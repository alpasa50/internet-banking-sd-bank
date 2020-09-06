import { FETCH_CLIENTES } from "../types/cliente-types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchClientes = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/clientes`);

  dispatch({
    type: FETCH_CLIENTES,
    payload: data,
  });
};
