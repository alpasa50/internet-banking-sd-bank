import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { iniciarSesion } from "../../state-mgmt/actions/auth-actions";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import notyf from "../../utils/notyf";
import { Form, Input, Button } from "antd";

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError("");

    setUsuario((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      await iniciarSesion({ ...usuario });
      notyf.success("¡Sesión iniciada exitosamente!");

      setTimeout(() => setRedireccion(true), 300);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const validationMessages = {
    required: "El campo ${label} es obligatorio.",
    types: {
      email: "${label} no es un email válido.",
      number: "${label} no es un número válido.",
    },
    number: {
      range: "${label} debe estar entre ${min} y ${max} caracteres.",
    },
  };

  return (
    <>
      {redireccion ? (
        <Redirect to="/" />
      ) : (
        <div className="container mt-4">
          <div className="col-md-6">
            <h4 className="mb-4">Iniciar Sesión</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validationMessages}
            >
              <Form.Item
                name={"email"}
                label="Email"
                type={"email"}
                rules={[{ required: true, email: true }]}
              >
                <Input
                  placeholder="correo@gmail.com"
                  name="email"
                  value={usuario.email}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"contrasenia"}
                label="Contraseña"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Contraseña"
                  name="contrasenia"
                  value={usuario.contrasenia}
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>

              {error && (
                <div className="error-text">
                  <h3>
                    <i className="fas fa-exclamation-circle"></i> Error
                  </h3>
                  <p>{error}</p>
                </div>
              )}
              <Button type="primary" disabled={deshabilitado} htmlType="submit">
                Iniciar Sesión <i className="ml-2 far fa-save"></i>
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

InicioSesion.propTypes = {
  iniciarSesion: PropTypes.func.isRequired,
};

export default connect(null, {
  iniciarSesion,
})(InicioSesion);
