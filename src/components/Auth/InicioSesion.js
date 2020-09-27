import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { iniciarSesion } from "../../state-mgmt/actions/auth-actions";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import notyf from "../../utils/notyf";

const USUARIO_INICIAL = {
  email: "",
  contrasenia: "",
};

const InicioSesion = ({ iniciarSesion }) => {
  const [usuario, setUsuario] = useState(USUARIO_INICIAL);
  const [deshabilitado, setDeshabilitado] = useState(true);
  const [error, setError] = useState(undefined);
  const [redireccion, setRedireccion] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(usuario).every((el) => Boolean(el));

    formularioValido ? setDeshabilitado(false) : setDeshabilitado(true);
  }, [usuario]);

  const manejarCambio = (event) => {
    const { name, value } = event.target;

    setError("");

    setUsuario((prevState) => ({ ...prevState, [name]: value }));
  };

  const manejarEnvio = async (event) => {
    event.preventDefault();

    try {
      setError("");

      await iniciarSesion({ ...usuario });
      notyf.success("¡Sesión iniciada exitosamente!");

      setTimeout(() => setRedireccion(true), 1500);
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
              <h3 className="mb-4">Iniciar sesión</h3>

              <form onSubmit={manejarEnvio}>
                <div className="text-left form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    value={usuario.email}
                    name="email"
                    onChange={manejarCambio}
                    placeholder="abc@gmail.com"
                    className="form-control"
                  />
                </div>
                <div className="text-left form-group">
                  <label for="contrasenia">Contraseña</label>

                  <input
                    value={usuario.contrasenia}
                    name="contrasenia"
                    onChange={manejarCambio}
                    maxLength="20"
                    placeholder="Contraseña"
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
                    Iniciar sesión
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

InicioSesion.prototypes = {
  iniciarSesion: PropTypes.func.isRequired,
};

export default connect(null, {
  iniciarSesion,
})(InicioSesion);
