import React from "react";
import { useEffect } from "react";
import Cuenta from "./Cuenta";

const CuentasLista = ({ cliente, fetchCuentas, cuentas }) => {
  useEffect(() => {
    fetchCuentas();
  }, []);

  return (
    <div>
      <h4>
        Cuentas de {cliente.nombre} {cliente.apellido}
      </h4>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tipo</th>
            <th scope="col">Balance disponible</th>
            <th scope="col">Balance actual</th>
            <th scope="col">Número</th>
            <th scope="col">Cantidad en tránsito</th>
          </tr>
        </thead>
        <tbody>
          {cuentas &&
            cuentas.map((cuenta) => (
              <Cuenta key={cuenta._id} cuenta={cuenta} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

CuentasLista.propTypes = {
  fetchCuentas: PropTypes.func.isRequired,
  cuentas: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cuentas: state.cuentas.cuentas,
  cliente: state.auth.cliente,
});

export default connect(mapStateToProps, {
  fetchCuentas,
})(CuentasLista);
