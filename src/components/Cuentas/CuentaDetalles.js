import React, { useEffect } from "react";
import { fetchCuentaById } from "../../state-mgmt/actions/cuenta.actions";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatDate, formatCurrency } from "../../utils/formatter";

const CuentaDetalles = ({ match, cuenta, fetchCuentaById }) => {
  useEffect(() => {
    const { _id } = match.params;

    fetchCuentaById(_id);
  }, []);

  return (
    <div className="mt-4">
      <Link to="/cuentas">
        <Button className="mb-4" type="primary">
          <i className="fas fa-arrow-left"></i>
        </Button>
      </Link>

      <h2>Detalles de la cuenta</h2>
      {cuenta && cuenta.numero_de_cuenta && (
        <div>
          <div className="entity-details">
            <p>
              <b>Número de cuenta: </b>
              {cuenta.numero_de_cuenta}
            </p>
            <p>
              <b>Balance disponible: </b>
              {formatCurrency(cuenta.balance_disponible)}
            </p>
            <p>
              <b>Balance actual: </b>
              {formatCurrency(cuenta.balance_actual)}
            </p>
            <p>
              <b>Balance promedio mensual: </b>
              {!Boolean(cuenta.balance_promedio_mensual)
                ? "RD$0"
                : formatCurrency(cuenta.balance_promedio_mensual)}
            </p>
            <p>
              <b>Transacciones realizadas: </b>
              {cuenta.transacciones.length}
            </p>
            <p>
              <b>Fecha de creación: </b>
              {formatDate(cuenta.createdAt)}
            </p>
            <p>
              <b>Última actualización: </b>
              {formatDate(cuenta.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cuenta: state.cuentas.cuenta,
});

export default connect(mapStateToProps, {
  fetchCuentaById,
})(CuentaDetalles);
