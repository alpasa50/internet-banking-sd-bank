import { API_URL } from "../../utils/constants";
import axios from "axios";
import {
  REGISTRARSE,
  INICIAR_SESION,
  OBTENER_USUARIO_ACTUAL,
} from "../types/auth-types";

export const registrarse = (usuario) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(
    `${API_URL}/auth/sign-up`,
    usuario,
    headers
  );

  dispatch({
    type: REGISTRARSE,
    payload: data,
  });
};

export const iniciarSesion = (usuario) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(
    `${API_URL}/auth/sign-in`,
    usuario,
    headers
  );

  dispatch({
    type: INICIAR_SESION,
    payload: data,
  });
};

export const obtenerUsuarioActual = () => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.get(`${API_URL}/auth/current-user`);

  dispatch({
    type: OBTENER_USUARIO_ACTUAL,
    payload: data,
  });
};
