import { FETCH_CLIENTES, FETCH_CLIENTE } from "../types/cliente-types";

const initialState = {
  clientes: [],
  cliente: {},
};

const clientesReducers = () => (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
      };
    case FETCH_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
      };
    default:
      return state;
  }
};

export default clientesReducers;
