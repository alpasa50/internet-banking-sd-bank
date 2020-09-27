import React, { useState, useEffect } from "react";
import { fetchClienteByCedula } from "../../state-mgmt/actions/cliente-actions";
import { registrarse } from "../../state-mgmt/actions/auth-actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Notyf } from "notyf";

const USUARIO_INICIAL = {
  cedula: "",
  email: "",
  contrasenia: "",
  confirmacionContrasenia: "",
  perfil: "IB Usuario",
  tipo_entidad_asociada: "Cliente",
};

const notyf = new Notyf({
  duration: 1000,
  position: {
    x: "right",
    y: "top",
  },
});

const Registro = ({ registrarse, fetchClienteByCedula, cliente }) => {
  const [usuario, setUsuario] = useState(USUARIO_INICIAL);
  const [deshabilitado, setDeshabilitado] = useState(true);
  const [error, setError] = useState(undefined);
  const [cedulaValida, setCedulaValida] = useState(false);
  const [redireccion, setRedireccion] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(usuario).every((el) => Boolean(el));

    formularioValido ? setDeshabilitado(false) : setDeshabilitado(true);
  }, [usuario]);

  useEffect(() => {
    setError(undefined);

    if (usuario.cedula.length === 11) {
      fetchClienteByCedula(usuario.cedula)
        .then(() => setCedulaValida(true))
        .catch((error) => {
          setError(error.response.data.error);
          setCedulaValida(false);
        });
    } else {
      setUsuario((state) => ({
        ...state,
        email: "",
        confirmacionContrasenia: "",
        contrasenia: "",
      }));
      setCedulaValida(false);
    }
  }, [usuario.cedula]);

  const manejarCambio = (event) => {
    const { name, value } = event.target;

    setError("");

    setUsuario((prevState) => ({ ...prevState, [name]: value }));
  };

  const manejarEnvio = async (event) => {
    event.preventDefault();

    try {
      setError("");

      if (usuario.contrasenia !== usuario.confirmacionContrasenia) {
        setError("Las contraseñas no coinciden!");
      } else {
        await registrarse({ ...usuario });
        notyf.success("¡Usuario creado exitosamente!");

        setTimeout(() => setRedireccion(true), 1500);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      {redireccion ? (
        <Redirect to="/" />
      ) : (
        <div className="mt-3 container">
          <div className="row">
            <div className="col-md-5">
              <h3 className="mb-4">Registrarse</h3>

              <form onSubmit={manejarEnvio}>
                {cliente && cedulaValida && (
                  <div className="text-left form-group">
                    <label for="cedula">Nombre completo</label>
                    <input
                      value={`${cliente.nombre} ${cliente.apellido}`}
                      name="nombre"
                      disabled="true"
                      placeholder="Nombre"
                      className="form-control"
                    />
                  </div>
                )}
                <div className="text-left form-group">
                  <label for="cedula">Cédula</label>
                  <input
                    value={usuario.cedula}
                    name="cedula"
                    onChange={manejarCambio}
                    placeholder="Introduzca su cédula"
                    minLength="11"
                    maxLength="11"
                    className="form-control"
                  />
                </div>
                <div className="text-left form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    disabled={!cedulaValida}
                    value={usuario.email}
                    name="email"
                    onChange={manejarCambio}
                    placeholder="abc@gmail.com"
                    className="form-control"
                  />
                </div>
                {/* <div>{error.email}</div> */}
                <div className="text-left form-group">
                  <label for="contrasenia">Contraseña</label>

                  <input
                    value={usuario.contrasenia}
                    disabled={!cedulaValida}
                    name="contrasenia"
                    onChange={manejarCambio}
                    maxLength="20"
                    placeholder="Contraseña"
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="text-left form-group">
                  <label for="confirmacionContrasenia">
                    Confirmación de contraseña
                  </label>
                  <input
                    value={usuario.confirmacionContrasenia}
                    name="confirmacionContrasenia"
                    disabled={!cedulaValida}
                    maxLength="20"
                    onChange={manejarCambio}
                    placeholder="Confirme su contraseña"
                    type="password"
                    className="form-control"
                  />
                </div>

                {error && (
                  <div className="text-danger mb-3">
                    <i className="fas fa-exclamation-triangle mr-3"></i>
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <button
                    disabled={deshabilitado}
                    type="submit"
                    className="btn btn-success btn-block"
                  >
                    Registrarse
                    <i className="ml-2 far fa-save"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Registro.prototypes = {
  fetchClienteByCedula: PropTypes.func.isRequired,
  registrarse: PropTypes.func.isRequired,
  cliente: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cliente: state.clientes.cliente,
});

export default connect(mapStateToProps, {
  registrarse,
  fetchClienteByCedula,
})(Registro);
