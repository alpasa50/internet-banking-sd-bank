import React, { useEffect } from "react";
import Cuenta from "./Cuenta";
import { fetchCuentasByClienteId } from "../../state-mgmt/actions/cuenta.actions";
import { connect } from "react-redux";

const CuentasLista = ({
  cliente,
  fetchCuentasByClienteId,
  cuentasPersonales,
}) => {
  useEffect(() => {
    fetchCuentasByClienteId(cliente._id);
  }, []);

  return (
    <div className="mt-4">
      <h4 className="mb-3 title-styles">
        Cuentas de {cliente.nombre} {cliente.apellido}
      </h4>

      {cuentasPersonales &&
        cuentasPersonales.map((cuenta) => (
          <Cuenta key={cuenta._id} cuenta={cuenta} />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cuentasPersonales: state.cuentas.cuentasPersonales,
  cliente: state.auth.cliente,
});

export default connect(mapStateToProps, {
  fetchCuentasByClienteId,
})(CuentasLista);
