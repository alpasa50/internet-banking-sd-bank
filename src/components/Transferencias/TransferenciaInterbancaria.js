import React, { useEffect, useState } from "react";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";
import { Form, InputNumber, Radio, Input, Select, Button } from "antd";
import {
  fetchCuentasByClienteId,
  fetchBeneficiariosInterbancarios,
  transferirAOtroBanco
} from "../../state-mgmt/actions/cuenta.actions";
import { connect } from "react-redux";
import { formatCurrency } from "../../utils/formatter";
import { bancosDominicanos } from "../../utils/bancos-dominicanos";

const { Group } = Radio;

const { Option } = Select;

const INITIAL_TRANSFER = {
  cantidad: 0,
  agregar_beneficiario: false,
  destinatario_numero_de_cuenta: "",
  destinatario_banco: "",
  destinatario_nombre: "",
  destinatario_tipo_de_cuenta: "Ahorro",
  destinatario_cedula: "",
  cliente_id: "",
};

const TransferenciaInterbancaria = ({
  fetchCuentasByClienteId,
  transferirAOtroBanco,
  cuentasPersonales,
  fetchBeneficiariosInterbancarios,
  beneficiarios,
  cliente,
}) => {
  const [transferencia, setTransferencia] = useState(INITIAL_TRANSFER);
  const [cuentaDesde, setCuentaDesde] = useState();
  const [valido, setValido] = useState(false);
  const [error, setError] = useState(undefined);
  const [cuentaEncontrada, setCuentaEncontrada] = useState(false);
  const [beneficiarioSelected, setBeneficiarioSelected] = useState();
  const [beneficiarioAgregable, setBeneficiarioAgregable] = useState();
  const [beneficiarioONo, setBeneficiarioONo] = useState(false);
  const [otroBanco, setOtroBanco] = useState();

  useEffect(() => {
    fetchCuentasByClienteId(cliente._id);
  }, []);

  useEffect(() => {
    fetchBeneficiariosInterbancarios(cuentaDesde);

    return () => {
      beneficiarios = null;
    }
  }, [cuentaDesde]);

  useEffect(() => {
    const { destinatario_numero_de_cuenta} = transferencia;
    
    if ( destinatario_numero_de_cuenta.length > 9 ) {
      const agregable = beneficiarios.find(
        (beneficiario) => beneficiario.cuenta_beneficiario === destinatario_numero_de_cuenta
      );

      setBeneficiarioAgregable(!agregable);
    } else setBeneficiarioAgregable(false)
  }, [transferencia.destinatario_numero_de_cuenta]);


  console.log();
  useEffect(() => {
    setError("");

    setValido(cuentaDesde && transferencia.cantidad);
  }, [transferencia, cuentaDesde]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError("");

    setTransferencia((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { cantidad } = transferencia;

    console.log("event", event);

    alertify.confirm(
      "Confirmar transferencia",
      `¿Seguro que desea transferir RD$${cantidad.toLocaleString()}?`,
      async () => {
        try {
          let objBody = undefined;

          if (beneficiarioONo) {
            const transferenciaCopy = { ...transferencia };

            delete transferenciaCopy.agregar_beneficiario;

            objBody = {
              ...transferenciaCopy,
              cliente_id: cliente._id,
              beneficiario_id: beneficiarioSelected,
            };
          } else {
            const bancoDestinatario = transferencia.destinatario_banco === "Otro" ? otroBanco : transferencia.destinatario_banco;
            
            objBody = {
              ...transferencia,
              destinatario_banco: bancoDestinatario,
              cliente_id: cliente._id
            };
          }

          console.log(objBody);

          await transferirAOtroBanco(cuentaDesde, objBody);

          notyf.success(`¡Fondos transferidos satisfactoriamente!`);
        } catch (error) {
          setError(error.response.data.error);
        }
      },
      () => undefined
    );
  };

  const beneficiariosLista = () => {
    if (beneficiarios && beneficiarios.length) {
      return beneficiarios.map((valBeneficiario) => (
        <Option key={valBeneficiario._id} value={valBeneficiario._id}>
          {valBeneficiario.nombre} {valBeneficiario.apellido} -{" "}
          {valBeneficiario.cedula}
        </Option>
      ));
    }
  };

  return (
    <div>
      <h2 className="title-styles">Transferencia interbancaria</h2>
      <Form onSubmitCapture={(e) => handleSubmit(e)}>
        <Form.Item
          name={"cuentaDesde"}
          label="Desde"
          rules={[
            { required: true, message: "Debe seleccionar una de sus cuentas." },
          ]}
        >
          <Select
            showSearch
            style={{ width: 250 }}
            name="cuentaDesde"
            value={cuentaDesde}
            onChange={(cuenta) => setCuentaDesde(cuenta)}
            placeholder="Seleccione la cuenta"
            optionFilterProp="children"
          >
            {cuentasPersonales &&
              cuentasPersonales.map((cuenta) => (
                <Option key={cuenta._id} value={cuenta._id}>
                  {cuenta.numero_de_cuenta} -
                  {formatCurrency(cuenta.balance_disponible)}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={"beneficiarioONo"}
          initialValue={false}
          label="Transferir a beneficiario"
          rules={[
            {
              required: true,
              message:
                "Debe seleccionar si desea transferir a un beneficiario.",
            },
          ]}
        >
          <Group
            onChange={(event) => {
              setTransferencia(INITIAL_TRANSFER);
              setBeneficiarioONo(event.target.value);
            }}
            value={beneficiarioONo}
          >
            <Radio value={true}>Sí</Radio>
            <Radio value={false}>No</Radio>
          </Group>
        </Form.Item>
        {!beneficiarioONo && (
          <>
            <Form.Item
              name={"destinatario_banco"}
              label="Banco"
              rules={[
                {
                  required: true,
                  message: "Debe especificar el banco del destinatario.",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: 300 }}
                name="destinatario_banco"
                // value={cuentaDesde}
                onChange={(val) =>
                  setTransferencia((prev) => ({
                    ...prev,
                    destinatario_banco: val,
                  }))
                }
                value={transferencia.destinatario_banco}
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
            {transferencia.destinatario_banco === "Otro" && (
              <Form.Item
                name={"otro_banco"}
                label="Banco del destinatario"
                rules={[
                  {
                    required: true,
                    message: "Debe especificar el banco del destinatario.",
                  },
                ]}
              >
                <Input
                  placeholder="Introduzca el banco del destinatario"
                  name="otro_banco"
                  style={{ width: 250 }}
                  className="form-control"
                  value={otroBanco}
                  onChange={(event) => setOtroBanco(event.target.value)}
                />
              </Form.Item>
            )}

            <Form.Item
              name={"destinatario_numero_de_cuenta"}
              label="Cuenta a transferir"
              rules={[
                {
                  required: true,
                  message:
                    "Debe especificar el número de cuenta del destinatario.",
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
                name="destinatario_numero_de_cuenta"
                style={{ width: 250 }}
                min={10}
                max={10}
                maxLength="10"
                className="form-control"
                value={transferencia.destinatario_numero_de_cuenta}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name={"destinatario_tipo_de_cuenta"}
              label="Tipo de cuenta"
              initialValue="Ahorro"
              rules={[
                {
                  required: true,
                  message:
                    "Debe seleccionar el tipo de cuenta del destinatario.",
                },
              ]}
            >
              <Group
                onChange={handleChange}
                name="destinatario_tipo_de_cuenta"
                value={transferencia.destinatario_tipo_de_cuenta}
              >
                <Radio value="Ahorro">Ahorro</Radio>
                <Radio value="Corriente">Corriente</Radio>
              </Group>
            </Form.Item>
            <Form.Item
              name={"destinatario_cedula"}
              label="Cédula"
              rules={[
                {
                  required: true,
                  message: "Debe especificar la cédula del destinatario.",
                },
              ]}
            >
              <Input
                placeholder="Cédula del destinatario"
                name="destinatario_cedula"
                style={{ width: 250 }}
                maxLength="11"
                className="form-control"
                value={transferencia.cedula}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name={"destinatario_nombre"}
              label="Nombre completo"
              rules={[
                {
                  required: true,
                  message:
                    "Debe especificar el nombre completo del destinatario.",
                },
              ]}
            >
              <Input
                placeholder="Nombre completo del destinatario"
                name="destinatario_nombre"
                style={{ width: 250 }}
                min={10}
                max={10}
                className="form-control"
                value={transferencia.destinatario_nombre}
                onChange={handleChange}
              />
            </Form.Item>
          </>
        )}
        <>
          {beneficiarioONo && (
            <Form.Item
              name={"beneficiarioSelected"}
              label="Beneficiario"
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar uno de sus beneficiarios.",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: 300 }}
                name="beneficiarioCuenta"
                defaultValue=""
                // value={cuentaDesde}
                onChange={(beneficiarioS) =>
                  setBeneficiarioSelected(beneficiarioS)
                }
                placeholder="Seleccione la cuenta"
                optionFilterProp="children"
              >
                {beneficiariosLista()}
              </Select>
            </Form.Item>
          )}
        </>

        {  beneficiarioAgregable && (
              <Form.Item
                name={"agregar_beneficiario"}
                initialValue={false}
                label="Agregar como beneficiario"
                rules={[
                  {
                    required: true,
                    message:
                      "Debe seleccionar si desea agregar al cliente como beneficiario.",
                  },
                ]}
              >
                <Group
                  onChange={(event) => {
                    setTransferencia((prev) => ({
                      ...prev,
                      agregar_beneficiario: event.target.value,
                    }));
                  }}
                  value={transferencia.agregar_beneficiario}
                >
                  <Radio value={true}>Sí</Radio>
                  <Radio value={false}>No</Radio>
                </Group>
              </Form.Item>
        )}
        <Form.Item
          name={"cantidad"}
          label="Cantidad"
          rules={[
            {
              required: true,
              message: "La cantidad a transferir es obligatoria.",
            },
            // { min: 10, message: "El valor mínimo a transferir es RD$10." },
          ]}
        >
          <InputNumber
            placeholder="Cantidad a transferir"
            style={{ width: 250 }}
            onChange={(val) =>
              setTransferencia((prev) => ({ ...prev, cantidad: val }))
            }
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

        <p style={{ color: "green", fontSize: "1rem" }}>
          Pagará RD$10 adicionales por la transferencia.
        </p>
        <Button type="primary" disabled={!valido} htmlType="submit">
          Transferir
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cuentasPersonales: state.cuentas.cuentasPersonales,
  cliente: state.auth.cliente,
  cuentaFromTercero: state.cuentas.cuentaFromTercero,
  beneficiarios: state.cuentas.beneficiarios,
});

export default connect(mapStateToProps, {
  fetchCuentasByClienteId,
  transferirAOtroBanco,
  fetchBeneficiariosInterbancarios,
})(TransferenciaInterbancaria);
