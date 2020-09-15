import {
  FETCH_CLIENTE_BY_CEDULA,
  FETCH_CLIENTE_BY_ID,
} from "../types/cliente-types";

const initialState = {
  clientes: [],
  cliente: {},
};

const clientesReducer = () => (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTE_BY_CEDULA:
      return {
        ...state,
        cliente: action.payload,
      };
    case FETCH_CLIENTE_BY_ID:
      return {
        ...state,
        cliente: action.payload,
      };
    default:
      return state;
  }
};

export default clientesReducer;
