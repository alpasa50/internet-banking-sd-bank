import React, { useState, useEffect } from "react";
import { fetchClienteByCedula } from "../../../state-mgmt/actions/cliente-actions";
import { registrarse } from "../../../state-mgmt/actions/auth-actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const USUARIO_INICIAL = {
  cedula: "",
  email: "",
  contrasenia: "",
  confirmacionContrasenia: "",
};

const Registro = ({ registrarse, fetchClienteByCedula, cliente }) => {
  const [usuario, setUsuario] = useState(USUARIO_INICIAL);
  const [deshabilitado, setDeshabilitado] = useState(true);
  const [error, setError] = useState(undefined);
  const [redireccion, setRedireccion] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(usuario).every((el) => Boolean(el));

    formularioValido ? setDeshabilitado(false) : setDeshabilitado(true);
  }, [usuario]);

  useEffect(() => {
    /* const delayDebounceFn = setTimeout(
      () => fetchClienteByCedula(usuario.cedula),
      3000
    );*/

    fetchClienteByCedula(usuario.cedula);
    // return () => clearTimeout(delayDebounceFn);
  }, [usuario.cedula]);

  const manejarCambio = (event) => {
    const { name, value } = event.target;

    setUsuario((prevState) => ({ ...prevState, [name]: value }));

    /*if (name === "cedula") {
      setTimeout(async () => {
        try {
          const data = await fetchClienteByCedula(value);

          console.log(data);

          // console.log(clienteRes);
          // setCliente(clienteRes);
        } catch (error) {
          console.log(error.response.data);
        }
      }, 3000);
    }*/
  };

  const manejarEnvio = (event) => {
    event.preventDefault();

    try {
      setError("");

      registrarse({ ...cliente, tipo_entidad_asociada: "Cliente" });
    } catch (error) {}
  };

  return (
    <>
      {redireccion ? (
        <Redirect to="/" />
      ) : (
        <div className="mt-3 container">
          <div className="col-md-5">
            <h3 className="mb-4">Registrarse</h3>

            <form onSubmit={manejarEnvio}>
              <div className="form-group">
                <input
                  value={usuario.cedula}
                  name="cedula"
                  onChange={manejarCambio}
                  placeholder="Cédula"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  disabled={!cliente}
                  value={usuario.email}
                  name="email"
                  onChange={manejarCambio}
                  placeholder="Email"
                  className="form-control"
                />
              </div>
              {/* <div>{error.email}</div> */}
              <div className="form-group">
                <input
                  value={usuario.contrasenia}
                  disabled={!cliente}
                  name="contrasenia"
                  onChange={manejarCambio}
                  placeholder="Password"
                  type="password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  value={usuario.confirmacionContrasenia}
                  name="confirmacionContrasenia"
                  disabled={!cliente}
                  onChange={manejarCambio}
                  placeholder="Confirme su contraseña"
                  type="password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button
                  disabled={deshabilitado}
                  type="submit"
                  className="btn btn-success btn-block"
                >
                  Registrarse
                </button>
              </div>
            </form>
          </div>

          <div className="input-group mb-3">
            <select className="custom-select" id="inputGroupSelect03">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          {cliente && (
            <div className="col-md-4">
              <h4>
                <b>Nombre completo: </b>
                {`${cliente.nombre} ${cliente.apellido}`}
              </h4>
            </div>
          )}
        </div>
      )}
    </>
  );
};

Registro.prototypes = {
  fetchClienteByCedula: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cliente: state.clientes.cliente,
});

export default connect(mapStateToProps, { registrarse, fetchClienteByCedula })(
  Registro
);
