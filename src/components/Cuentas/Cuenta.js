import React, { useEffect } from "react";
import { formatCurrency, formatDate } from "../../utils/formatter";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const Cuenta = ({ cuenta }) => {
  const createdAt = formatDate(cuenta.created_at);



  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{cuenta.numero_de_cuenta}</Card.Title>
        <hr />
        <Card.Subtitle className="mb-2 text-muted">
          {cuenta.tipo_de_cuenta}
        </Card.Subtitle>
        <Card.Text style={{ color: "green" }}>
          {formatCurrency(cuenta.balance_actual)} disponibles
        </Card.Text>
        <Card.Text>Esta cuenta fue abierta en {createdAt}.</Card.Text>
        <Card.Link to={`/cuenta/${cuenta.numero_de_cuenta}/detalles`}>
          Detalles
          <i className="ml-1 fas fa-info-circle"></i>
        </Card.Link>
        <Card.Link
          styles={linkStyles}
          to={`/cuenta/${cuenta.numero_de_cuenta}/movimientos`}
        >
          Movimientos <i className="ml-1 fas fa-cash-register"></i>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

Cuenta.propTypes = {
  cuenta: PropTypes.object.isRequired,
};

export default Cuenta;
