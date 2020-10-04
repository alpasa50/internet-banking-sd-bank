import React from "react";
import { useEffect } from "react";
import Cuenta from "./Cuenta";
import { fetchCuentasByClienteId } from "../../state-mgmt/actions/cuenta.actions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const CuentasLista = ({ cliente, fetchCuentasByClienteId, cuentas }) => {
  useEffect(() => {
    fetchCuentasByClienteId(cliente._id);
  }, []);

  return (
    <div className="mt-4">
      <h4 className="mb-3 title-styles">
        Cuentas de {cliente.nombre} {cliente.apellido}
      </h4>

      {cuentas &&
        cuentas.map((cuenta) => <Cuenta key={cuenta._id} cuenta={cuenta} />)}
    </div>
  );
};

CuentasLista.propTypes = {
  fetchCuentasByClienteId: PropTypes.func.isRequired,
  cuentas: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);

  return {
    cuentas: state.cuentas.cuentas,
    cliente: state.auth.cliente,
  };
};

export default connect(mapStateToProps, {
  fetchCuentasByClienteId,
})(CuentasLista);
