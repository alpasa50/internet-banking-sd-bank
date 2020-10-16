import React, { useEffect, useState } from "react";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";
import { Form, InputNumber, Radio, Input, Select, Button } from "antd";
import { connect } from "react-redux";
import { bancosDominicanos } from "../../utils/bancos-dominicanos";
import { Redirect } from "react-router-dom";

import {
  fetchClienteNCuentaFromTercero,
  fetchCuentaById,
  createBeneficiario,
} from "../../state-mgmt/actions/cuenta.actions";

const { Group } = Radio;

const { Option } = Select;

const INITIAL_BENEFICIARIO = {
  nombre: "",
  cedula: "",
  banco_beneficiario: "",
  cuenta_beneficiario: "",
  tipo_de_cuenta: "",
  email: "",
};

const BeneficiarioCrear = ({
  match,
  cuenta,
  beneficiarios,
  fetchClienteNCuentaFromTercero,
  createBeneficiario,
  cliente,
  cuentaFromTercero,
  fetchCuentaById,
  destinatario,
}) => {
  const { _id } = match.params;

  const [beneficiario, setBeneficiario] = useState(INITIAL_BENEFICIARIO);
  const [cuentaTercero, setCuentaTercero] = useState("");
  const [otroBanco, setOtroBanco] = useState();
  const [valido, setValido] = useState(false);
  const [error, setError] = useState();
  const [tipoBeneficiario, setTipoBeneficiario] = useState("Tercero");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetchCuentaById(_id);
  }, []);

  useEffect(() => {
    setError("");

    console.log(cuentaTercero);

    if (cuentaTercero.length === 10) {
      fetchClienteNCuentaFromTercero(cliente._id, cuentaTercero).catch((e) =>
        setError(e.response.data.error)
      );
    }
  }, [cuentaTercero]);

  useEffect(() => {
    const formularioValido = Object.values(beneficiario).every((el) =>
      Boolean(el)
    );

    if (tipoBeneficiario === "Tercero") {
      setValido(cuentaTercero.length === 10);
    } else {
      setValido(formularioValido);
    }
    // setValido(true);
  }, [beneficiario, cuentaTercero]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError("");

    setBeneficiario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    alertify.confirm(
      "¿Desea continuar?",
      "¿Seguro que desea añadir a este beneficiario?",
      async () => {
        try {
          const body =
            tipoBeneficiario === "Interbancario" &&
            beneficiario.banco_beneficiario === "Otro"
              ? {
                  ...beneficiario,
                  banco_beneficiario: otroBanco,
                  tipo: "Interbancario",
                }
              : tipoBeneficiario === "Interbancario"
              ? {
                  ...beneficiario,
                  tipo: "Interbancario",
                }
              : {
                  tipo: "Tercero",
                  cuenta_beneficiario: beneficiario.cuenta_beneficiario,
                  cuenta_beneficiario: cuentaTercero,
                };

          console.log(body);

          await createBeneficiario(_id, body);

          setRedirect(true);
          notyf.success("¡Beneficiario agregado satisfactoriamente!");
        } catch (error) {
          setError(error.response.data.error);
        }
      },
      () => undefined
    );
  };

  return (
    <div className="mt-4">
      {redirect && <Redirect to={`/cuentas/${_id}/beneficiarios`} />}
      <div className="row">
        <div className="col-md-4">
          <h2 className="alt-title">Agregar beneficiario </h2>
        </div>
        {cuenta && cuenta.numero_de_cuenta && (
          <div className="col-md-4">
            <table className="table table-striped cd-beneficiario">
              <thead>
                <tr>
                  <th colSpan="2" className="text-center">
                    Detalles de tu cuenta
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Número</th>
                  <td>{cuenta.numero_de_cuenta}</td>
                </tr>
                <tr>
                  <th>Tipo</th>
                  <td>{cuenta.tipo_de_cuenta}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Form onSubmitCapture={(e) => handleSubmit(e)}>
        <Form.Item
          name={"tipoBeneficiario"}
          initialValue="Tercero"
          label="Tipo de beneficiario"
          rules={[
            {
              required: true,
              message: "Debe seleccionar el tipo de beneficiario.",
            },
          ]}
        >
          <Group
            onChange={(event) => {
              setBeneficiario(INITIAL_BENEFICIARIO);
              setTipoBeneficiario(event.target.value);
            }}
            value={tipoBeneficiario}
          >
            <Radio value="Tercero">Tercero</Radio>
            <Radio value="Interbancario">Interbancario</Radio>
          </Group>
        </Form.Item>
        {tipoBeneficiario === "Tercero" && (
          <>
            <Form.Item
              name={"cuenta_tercero"}
              label="Cuenta del beneficiario"
              rules={[
                {
                  required: true,
                  message:
                    "Debe especificar el número de cuenta del beneficiario.",
                },
                {
                  min: 10,
                  message: "El número de cuenta debe de ser de 10 dígitos.",
                },
                {
                  max: 10,
                  message: "El número de cuenta debe de ser de 10 dígitos.",
                },
              ]}
            >
              <Input
                name="cuenta_tercero"
                contentEditable={false}
                style={{ width: 250 }}
                className="form-control"
                maxLength="10"
                value={cuentaTercero}
                onChange={(e) => setCuentaTercero(e.target.value)}
              />
            </Form.Item>
            {cuentaFromTercero && destinatario && cuentaTercero.length === 10 && (
              <div>
                {!error && (
                  <>
                    <p>
                      <b>Nombre completo: </b>
                      {destinatario.nombre} {destinatario.apellido}
                    </p>
                    <p>
                      <b>Cédula: </b>
                      {destinatario.cedula}
                    </p>
                    <p>
                      <b>Número de cuenta: </b>{" "}
                      {cuentaFromTercero.numero_de_cuenta}{" "}
                    </p>
                    <p>
                      <b>Tipo de cuenta: </b>
                      {cuentaFromTercero.tipo_de_cuenta}
                    </p>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {tipoBeneficiario === "Interbancario" && (
          <>
            <Form.Item
              name={"cedula"}
              label="Cédula"
              rules={[
                {
                  required: true,
                  message: "Debe especificar la cédula del beneficiario.",
                },
              ]}
            >
              <Input
                placeholder="Cédula del beneficiario"
                name="cedula"
                style={{ width: 250 }}
                maxLength="11"
                className="form-control"
                value={beneficiario.cedula}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name={"nombre"}
              label="Nombre completo"
              rules={[
                {
                  required: true,
                  message:
                    "Debe especificar el nombre completo del beneficiario.",
                },
              ]}
            >
              <Input
                placeholder="Nombre completo del beneficiario"
                name="nombre"
                style={{ width: 250 }}
                className="form-control"
                value={beneficiario.nombre}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name={"banco_beneficiario"}
              label="Banco"
              rules={[
                {
                  required: true,
                  message: "Debe especificar el banco del beneficiario.",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: 300 }}
                name="banco_beneficiario"
                // value={cuentaDesde}
                onChange={(val) =>
                  setBeneficiario((prev) => ({
                    ...prev,
                    banco_beneficiario: val,
                  }))
                }
                value={beneficiario.banco_beneficiario}
                placeholder="Seleccione un banco"
                optionFilterProp="children"
              >
                {bancosDominicanos.map((banco) => (
                  <Option key={banco} value={banco}>
                    {banco}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {beneficiario.banco_beneficiario === "Otro" && (
              <Form.Item
                name={"otro_banco"}
                label="Banco del beneficiario"
                rules={[
                  {
                    required: true,
                    message: "Debe especificar el banco del beneficiario.",
                  },
                ]}
              >
                <Input
                  placeholder="Introduzca el banco del beneficiario"
                  name="otro_banco"
                  style={{ width: 250 }}
                  className="form-control"
                  value={otroBanco}
                  onChange={(event) => setOtroBanco(event.target.value)}
                />
              </Form.Item>
            )}
            <Form.Item
              name={"cuenta_beneficiario"}
              label="Cuenta a transferir"
              rules={[
                {
                  required: true,
                  message:
                    "Debe especificar el número de cuenta del beneficiario.",
                },
                {
                  min: 10,
                  message: "El número de cuenta debe de ser de 10 dígitos.",
                },
                {
                  max: 10,
                  message: "El número de cuenta debe de ser de 10 dígitos.",
                },
                // { min: 10, message: "El valor mínimo a transferir es RD$10." },
              ]}
            >
              <Input
                placeholder="Número de cuenta de 10 dígitos"
                name="cuenta_beneficiario"
                style={{ width: 250 }}
                min={10}
                max={10}
                maxLength="10"
                className="form-control"
                value={beneficiario.cuenta_beneficiario}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name={"email"} label="Email" type={"email"}>
              <Input
                placeholder="correo@gmail.com"
                name="email"
                style={{ width: 300 }}
                value={beneficiario.email}
                className="form-control"
                onChange={handleChange}
              />
            </Form.Item>
          </>
        )}

        {error && (
          <div className="err-msg error-text">
            <h3>
              <i className="fas fa-exclamation-circle"></i> Error
            </h3>
            <p>{error}</p>
          </div>
        )}
        <Button type="primary" disabled={!valido} htmlType="submit">
          Agregar <i className="ml-2 far fa-save"></i>
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cuentasPersonales: state.cuentas.cuentasPersonales,
  cuenta: state.cuentas.cuenta,
  cliente: state.auth.cliente,
  destinatario: state.cuentas.destinatario,
  cuentaFromTercero: state.cuentas.cuentaFromTercero,
  beneficiarios: state.cuentas.beneficiarios,
});

export default connect(mapStateToProps, {
  fetchClienteNCuentaFromTercero,
  createBeneficiario,
  fetchCuentaById,
})(BeneficiarioCrear);
