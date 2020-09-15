import {
  INICIAR_SESION,
  OBTENER_USUARIO_ACTUAL,
  REGISTRARSE,
} from "../types/auth-types";

const initialState = {
  usuarioActual: {},
};

const clientesReducer = () => (state = initialState, action) => {
  switch (action.type) {
    case REGISTRARSE:
      return {
        ...state,
        usuarioActual: action.payload,
      };
    case INICIAR_SESION:
      return {
        ...state,
        usuarioActual: action.payload,
      };
    case OBTENER_USUARIO_ACTUAL:
      return {
        ...state,
        usuarioActual: action.payload,
      };

    default:
      return state;
  }
};

export default clientesReducer;
