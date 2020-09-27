import React from "react";
import { formatCurrency, formatDate } from "../../utils/formatter";
import PropTypes from "prop-types";

const Cuenta = ({ cuenta }) => {
  const createdAt = formatDate(cuenta.created_at);

  return (
    <tr>
      <td>{cuenta.tipo_de_cuenta}</td>
      <td>{formatCurrency(cuenta.balance_disponible)}</td>
      <td>{formatCurrency(cuenta.balance_actual)}</td>
      <td>{cuenta.aprobada ? "Sí" : "No"}</td>
      <td>{transito ? transito : 0}</td>
      <td>{transaccion.destinatario}</td>
      <td>{createdAt}</td>
    </tr>
  );
};

Cuenta.prototypes = {
  cuenta: PropTypes.object.isRequired,
};

export default Cuenta;
