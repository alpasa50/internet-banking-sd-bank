import React from "react";
import { formatCurrency, formatDate } from "../../utils/formatter";
import PropTypes from "prop-types";

const Transaccion = ({ transaccion }) => {
  const tipoTrans =
    transaccion.tipo === "Deposito" ? "Depósito" : transaccion.tipo;

  const createdAt = formatDate(transaccion.created_at);

  const transito = transaccion.cantidad_en_transito;

  return (
    <tr>
      <td>{transaccion.descripcion}</td>
      <td>{formatCurrency(transaccion.cantidad)}</td>
      <td>{tipoTrans}</td>
      <td>{transaccion.aprobada ? "Sí" : "No"}</td>
      <td>{transito ? transito : 0}</td>
      <td>{transaccion.destinatario}</td>
      <td>{createdAt}</td>
    </tr>
  );
};

Transaccion.prototypes = {
  transaccion: PropTypes.object.isRequired,
};

export default Transaccion;
