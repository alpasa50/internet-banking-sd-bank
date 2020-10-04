import React, { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "../../utils/formatter";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Cuenta = ({ cuenta }) => {
  const [redirect, setRedirect] = useState("");

  const createdAt = formatDate(cuenta.created_at);

  const handleRedirect = (path) => {
    setRedirect(`${path}`);
  };

  return (
    <Card className="card-styles">
      {redirect && <Redirect to={redirect} />}
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
        <Card.Link
          onClick={() => handleRedirect(`/cuentas/${cuenta._id}/detalles`)}
        >
          <i className="ml-1 fas fa-info-circle"></i> Detalles
        </Card.Link>
        <Card.Link
          className="ml-3 movimientos"
          onClick={() => handleRedirect(`/cuentas/${cuenta._id}/transacciones`)}
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
