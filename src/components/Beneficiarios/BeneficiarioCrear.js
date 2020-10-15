import React, { useEffect, useState } from "react";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";
import { Form, InputNumber, Radio, Input, Select, Button } from "antd";
import { connect } from "react-redux";
import { bancosDominicanos } from "../../utils/bancos-dominicanos";

import { fetchCuentaById } from "../../state-mgmt/actions/cuenta.actions";

const { Group } = Radio;

const { Option } = Select;

const INITIAL_BENEFICIARIO = {
  nombre: "",
  cedula: "",
  banco_beneficiario: "",
  cuenta_beneficiario: "",
  email: "",
};

const BeneficiarioCrear = ({ match, cuenta, beneficiarios, cliente }) => {
  const [beneficario, setBeneficiario] = useState(INITIAL_BENEFICIARIO);
  const [otroBanco, setOtroBanco] = useState();
  const [error, setError] = useState();
  const [tipoBeneficiario, setTipoBeneficiario] = useState(false);

  useEffect(() => {
    const { _id } = match.params;

    fetchCuentaById(_id);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError("");

    setBeneficiario((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-4">
      <h2 className="alt-title">Agregar beneficiario</h2>
      {cuenta && cuenta.numero_de_cuenta && (
        <Form.Item name={"numero_de_cuenta"} label="Beneficiario a la cuenta">
          <Input
            name="mismoBanco"
            contentEditable={false}
            style={{ width: 250 }}
            className="form-control"
            value={cuenta.numero_de_cuenta}
          />
        </Form.Item>
      )}
      <Form.Item
        name={"tipoBeneficiario"}
        initialValue={false}
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
            console.log(event.target.value);
            // setBeneficiario(INITIAL_BENEFICIARIO);
            setTipoBeneficiario(event.target.value);
          }}
          value={tipoBeneficiario}
        >
          <Radio value={true}>Tercero</Radio>
          <Radio value={false}>Interbancario</Radio>
        </Group>
      </Form.Item>
      <Form.Item
        name={"cedula"}
        label="Cédula"
        rules={[
          {
            required: true,
            message: "Debe especificar el nombre completo del beneficiario.",
          },
        ]}
      >
        <Input
          placeholder="Nombre completo del beneficiario"
          name="nombre"
          style={{ width: 250 }}
          maxLength="11"
          className="form-control"
          value={beneficario.nombre}
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
          value={beneficario.banco_beneficiario}
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
      {beneficario.banco_beneficiario === "Otro" && (
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
            message: "Debe especificar el número de cuenta del beneficiario.",
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
          value={beneficario.cuenta_beneficiario}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name={"email"} label="Email" type={"email"}>
        <Input
          placeholder="correo@gmail.com"
          name="email"
          style={{ width: 300 }}
          value={beneficario.email}
          className="form-control"
          onChange={handleChange}
        />
      </Form.Item>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cuentasPersonales: state.cuentas.cuentasPersonales,
  cuenta: state.cuentas.cuenta,
  cliente: state.auth.cliente,
  cuentaFromTercero: state.cuentas.cuentaFromTercero,
  beneficiarios: state.cuentas.beneficiarios,
});

export default connect(mapStateToProps, {
  fetchCuentaById,
})(BeneficiarioCrear);
