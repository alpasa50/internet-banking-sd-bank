import {
  FETCH_PERFILES,
  INICIAR_SESION,
  OBTENER_USUARIO_ACTUAL,
  REGISTRARSE,
  CERRAR_SESION,
} from "../types/auth-types";

const usuarioActualState = localStorage.getItem("usuarioActual");
const clienteState = localStorage.getItem("cliente");

const initialState = {
  usuarioActual: usuarioActualState ? JSON.parse(usuarioActualState) : {},
  cliente: clienteState ? JSON.parse(clienteState) : {},
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
        cliente: action.payload.entidad,
      };
    case INICIAR_SESION:
      return {
        ...state,
        usuarioActual: {
          token: action.payload.token,
          email: action.payload.email,
        },
        cliente: action.payload.entidad,
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
