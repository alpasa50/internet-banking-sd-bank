import React, { useEffect } from "react";
import { fetchPrestamoById } from "../../state-mgmt/actions/prestamo.actions";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatDate, formatCurrency } from "../../utils/formatter";

const PrestamoDetalles = ({ match, prestamo, fetchPrestamoById }) => {
  useEffect(() => {
    const { _id } = match.params;

    fetchPrestamoById(_id);
  }, []);

  return (
    <div className="mt-4">
      <Link to="/prestamos">
        <Button className="mb-4" type="primary">
          <i className="fas fa-arrow-left"></i>
        </Button>
      </Link>

      <h2>Detalles del préstamo</h2>
      {prestamo && prestamo.descripcion && (
        <div>
          <div className="entity-details">
            <p>
              <b>Descripción: </b>
              {prestamo.descripcion}
            </p>
            <p>
              <b>Cantidad total: </b>
              {formatCurrency(prestamo.cantidad_total)}
            </p>
            <p>
              <b>Cantidad saldada: </b>
              {formatCurrency(prestamo.cantidad_saldada)}
            </p>
            <p>
              <b>Cantidad restante: </b>
              {formatCurrency(prestamo.cantidad_restante)}
            </p>
            <p>
              <b>Aprobado: </b>
              {prestamo.aprobado ? "Sí" : "No"}
            </p>
            <p>
              <b>Fecha de solicitud: </b>
              {formatDate(prestamo.createdAt)}
            </p>
            <p>
              <b>Fecha de último pago: </b>
              {formatDate(prestamo.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  prestamo: state.prestamos.prestamo,
});

export default connect(mapStateToProps, {
  fetchPrestamoById,
})(PrestamoDetalles);
