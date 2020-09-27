import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Transaccion from "./Transaccion";

const TransaccionesLista = ({ fetchTransacciones, transacciones, cuenta }) => {
  useEffect(() => {
    fetchTransacciones();
  }, []);

  return (
    <div>
      <h3>Transacciones de la cuenta {cuenta.numero_de_cuenta}</h3>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Descripción</th>
            <th scope="col">Monto</th>
            <th scope="col">Tipo</th>
            <th scope="col">Aprobada</th>
            <th scope="col">Cantidad en tránsito</th>
            <th scope="col">Destinatario</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transacciones &&
            transacciones.map((transaccion) => (
              <Transaccion key={transaccion._id} transaccion={transaccion} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

TransaccionesLista.prototypes = {
  fetchTransacciones: PropTypes.func.isRequired,
  transacciones: PropTypes.array.isRequired,
  cuenta: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  transacciones: state.transacciones,
});

export default connect(mapStateToProps, { fetchTransacciones })(
  TransaccionesLista
);
