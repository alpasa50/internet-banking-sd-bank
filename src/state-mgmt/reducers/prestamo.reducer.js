import {
  FETCH_PRESTAMOS_FROM_CLIENTE_ID,
  FETCH_PRESTAMO_BY_ID,
} from "../types/prestamo.types";

const initialState = {
  prestamos: [],
  prestamo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRESTAMO_BY_ID:
      return {
        ...state,
        prestamo: action.payload,
      };
    case FETCH_PRESTAMOS_FROM_CLIENTE_ID:
      return {
        ...state,
        prestamos: action.payload,
      };
    default:
      return { ...state };
  }
}
