import React, { useEffect } from "react";
import {
  fetchTipoDeTransaccionById,
  fetchTransaccionById,
} from "../../state-mgmt/actions/cuenta.actions";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatDate, formatCurrency } from "../../utils/formatter";

const TransaccionDetalles = ({
  match,
  transaccion,
  fetchTransaccionById,
  fetchTipoDeTransaccionById,
  transaccionTipo,
}) => {
  const { _id, transaccion_id, tipo } = match.params;

  useEffect(() => {
    fetchTransaccionById(transaccion_id);

    fetchTipoDeTransaccionById(tipo);
  }, []);

  return (
    <div className="mt-4">
      <Link to={`/cuentas/${_id}/transacciones`}>
        <Button className="mb-4" type="primary">
          <i className="fas fa-arrow-left"></i>
        </Button>
      </Link>

      <h2>Detalles de la transacción</h2>
      {transaccion && transaccion.cantidad && transaccionTipo && (
        <div>
          <div className="entity-details">
            <p>
              <b>Monto: </b>
              {formatCurrency(transaccion.cantidad)}
            </p>
            <p>
              <b>Monto en tránsito: </b>
              {!Boolean(transaccion.cantidad_en_transito)
                ? "RD$0"
                : formatCurrency(transaccion.cantidad_en_transito)}
            </p>
            <p>
              <b>Descripción: </b>
              {transaccion.descripcion}
            </p>
            <p>
              <b>Aprobada: </b>
              {transaccion.aprobada ? "Sí" : "No"}
            </p>
            <p>
              <b>Tipo: </b>
              {transaccionTipo.tipo}
            </p>
            <p>
              <b>Fecha de creación: </b>
              {formatDate(transaccion.createdAt)}
            </p>
            <p>
              <b>Última actualización: </b>
              {formatDate(transaccion.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  transaccion: state.cuentas.transaccion,
  transaccionTipo: state.cuentas.transaccionTipo,
});

export default connect(mapStateToProps, {
  fetchTransaccionById,
  fetchTipoDeTransaccionById,
})(TransaccionDetalles);
