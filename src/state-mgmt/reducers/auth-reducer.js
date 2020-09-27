import {
  FETCH_PERFILES,
  INICIAR_SESION,
  OBTENER_USUARIO_ACTUAL,
  REGISTRARSE,
  CERRAR_SESION,
} from "../types/auth-types";

const initialState = {
  usuarioActual: JSON.parse(localStorage.getItem("usuarioActual")) || {},
  cliente: JSON.parse(localStorage.getItem("cliente")) || {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PERFILES:
      return {
        ...state,
        perfiles: action.payload,
      };
    case REGISTRARSE:
      return {
        ...state,
        usuarioActual: {
          token: action.payload.token,
          email: action.payload.email,
        },
        cliente: action.payload.cliente,
      };
    case INICIAR_SESION:
      return {
        ...state,
        usuarioActual: {
          token: action.payload.token,
          email: action.payload.email,
        },
        cliente: action.payload.cliente,
      };
    case OBTENER_USUARIO_ACTUAL:
      return {
        ...state,
        usuarioActual: action.payload,
      };
    case CERRAR_SESION:
      return {
        ...state,
        usuarioActual: action.payload,
      };
    default:
      return state;
  }
}
