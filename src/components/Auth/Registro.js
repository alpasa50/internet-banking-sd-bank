import React, { useState, useEffect } from "react";
import { fetchClienteByCedula } from "../../state-mgmt/actions/cliente-actions";
import { registrarse } from "../../state-mgmt/actions/auth-actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Notyf } from "notyf";
import { Form, Input, Button } from "antd";

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError("");

    setUsuario((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
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
          <div className=" col-md-6">
            <h4 className="mb-4">Registrarse</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validationMessages}
            >
              {cliente && cedulaValida && (
                <Form.Item label="Nombre completo">
                  <h6 hidden>{cliente.apellido}</h6>
                  <Input
                    name="nombreCompleto"
                    value={`${cliente.nombre} ${cliente.apellido}`}
                    className="form-control"
                    contentEditable="false"
                    onChange={handleChange}
                  />
                </Form.Item>
              )}
              <Form.Item
                name={"cedula"}
                label="Cédula"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Cédula"
                  name="cedula"
                  maxLength="11"
                  value={usuario.cedula}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
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
              <Form.Item
                name={"confirmacionContrasenia"}
                label="Confirmación de contraseña"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Confirme su contraseña"
                  value={usuario.confirmacionContrasenia}
                  name="confirmacionContrasenia"
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                />``
              </Form.Item>
              {error && (
                <div className="err-msg error-text">
                  <h3>
                    <i className="fas fa-exclamation-circle"></i> Error
                  </h3>
                  <p>{error}</p>
                </div>
              )}
              <Button type="primary" disabled={deshabilitado} htmlType="submit">
                Registrar <i className="ml-2 far fa-save"></i>
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
    // <>
    //   {redireccion ? (
    //     <Redirect to="/" />
    //   ) : (
    //     <div className="mt-3 container">
    //       <div className="row">
    //         <div className="col-md-5">
    //           <h3 className="mb-4">Registrarse</h3>

    //           <form onSubmit={manejarEnvio}>
    //             {cliente && cedulaValida && (
    //               <div className="text-left form-group">
    //                 <label for="cedula">Nombre completo</label>
    //                 <input
    //                   value={`${cliente.nombre} ${cliente.apellido}`}
    //                   name="nombre"
    //                   disabled="true"
    //                   placeholder="Nombre"
    //                   className="form-control"
    //                 />
    //               </div>
    //             )}
    //             <div className="text-left form-group">
    //               <label for="cedula">Cédula</label>
    //               <input
    //                 value={usuario.cedula}
    //                 name="cedula"
    //                 onChange={manejarCambio}
    //                 placeholder="Introduzca su cédula"
    //                 minLength="11"
    //                 maxLength="11"
    //                 className="form-control"
    //               />
    //             </div>
    //             <div className="text-left form-group">
    //               <label for="email">Email</label>
    //               <input
    //                 type="email"
    //                 disabled={!cedulaValida}
    //                 value={usuario.email}
    //                 name="email"
    //                 onChange={manejarCambio}
    //                 placeholder="abc@gmail.com"
    //                 className="form-control"
    //               />
    //             </div>
    //             {/* <div>{error.email}</div> */}
    //             <div className="text-left form-group">
    //               <label for="contrasenia">Contraseña</label>

    //               <input
    //                 value={usuario.contrasenia}
    //                 disabled={!cedulaValida}
    //                 name="contrasenia"
    //                 onChange={manejarCambio}
    //                 maxLength="20"
    //                 placeholder="Contraseña"
    //                 type="password"
    //                 className="form-control"
    //               />
    //             </div>
    //             <div className="text-left form-group">
    //               <label for="confirmacionContrasenia">
    //                 Confirmación de contraseña
    //               </label>
    //               <input
    //                 value={usuario.confirmacionContrasenia}
    //                 name="confirmacionContrasenia"
    //                 disabled={!cedulaValida}
    //                 maxLength="20"
    //                 onChange={manejarCambio}
    //                 placeholder="Confirme su contraseña"
    //                 type="password"
    //                 className="form-control"
    //               />
    //             </div>

    //             {error && (
    //               <div className="text-danger mb-3">
    //                 <i className="fas fa-exclamation-triangle mr-3"></i>
    //                 {error}
    //               </div>
    //             )}

    //             <div className="form-group">
    //               <button
    //                 disabled={deshabilitado}
    //                 type="submit"
    //                 className="btn btn-success btn-block"
    //               >
    //                 Registrarse
    //                 <i className="ml-2 far fa-save"></i>
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
  );
};

Registro.propTypes = {
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
