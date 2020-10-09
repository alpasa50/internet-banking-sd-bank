import React, { useEffect, useState } from "react";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";
import { Form, InputNumber, Radio, Input, Select, Button } from "antd";
import {
  fetchCuentasByClienteId,
  transferirATercero,
  fetchBeneficiariosMismoBanco,
  fetchClienteNCuentaFromTercero
} from "../../state-mgmt/actions/cuenta.actions";
import { connect } from "react-redux";
import { formatCurrency } from "../../utils/formatter";

const { Group } = Radio;

const { Option } = Select;

const INITIAL_TRANSFER = {
  cantidad: 0,
  agregar_beneficiario: false,
  destinatario_numero_de_cuenta: "",
  cliente_id: "",
};

const TransferenciaATerceros = ({
  fetchCuentasByClienteId,
  transferirATercero,
  cuentasPersonales,
  cuentaFromTercero,
  fetchClienteNCuentaFromTercero,
  fetchBeneficiariosMismoBanco,
  destinatario,
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

  useEffect(() => {
    fetchCuentasByClienteId(cliente._id);
  }, []);

  useEffect(() => {
    fetchBeneficiariosMismoBanco(cuentaDesde);
  }, [cuentaDesde]);

  useEffect(() => {
    if (
      beneficiarios &&
      beneficiarios.length &&
      destinatario &&
      destinatario.cedula
    ) {
      const agregable = beneficiarios.find(
        (beneficiario) => beneficiario.cuenta_beneficiario === destinatario.destinatario_numero_de_cuenta
      );

      setBeneficiarioAgregable(!agregable);
    }
  }, [destinatario]);

  useEffect(() => {
    setError("");

    console.log(transferencia);
    setValido(cuentaDesde && transferencia.cantidad);
  }, [transferencia, cuentaDesde]);

  const handleChangeNumCuenta = async (event) => {
    const { value } = event.target;

    setError("");
    try {
      if (value.length === 10) {
        await fetchClienteNCuentaFromTercero(cliente._id, value);

        setTransferencia(prevState => ({...prevState, destinatario_numero_de_cuenta: value }))

        setCuentaEncontrada(true);
      } else {
        setCuentaEncontrada(false);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { cantidad } = transferencia;

    alertify.confirm(
      "Confirmar transferencia",
      `¿Seguro que desea transferir RD$${cantidad.toLocaleString()}?`,
      async () => {
        try {
          let objBody = undefined;

          if (beneficiarioONo) {
            const transferenciaCopy = { ...transferencia };

            delete transferenciaCopy.destinatario_numero_de_cuenta;
            delete transferenciaCopy.agregar_beneficiario;

            objBody = {
              ...transferenciaCopy,
              cliente_id: cliente._id,
              beneficiario_id: beneficiarioSelected,
            };
          } else {
            objBody = {
              ...transferencia,
              cliente_id: cliente._id,
              destinatario_numero_de_cuenta: cuentaFromTercero.numero_de_cuenta,
            };
          }

          await transferirATercero(cuentaDesde, objBody);

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
      <h2 className="title-styles">Tansferencia a terceros</h2>
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
              onChange={handleChangeNumCuenta}
            />
          </Form.Item>
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

        

        {destinatario && cuentaEncontrada && (
          <>
            {!beneficiarioONo && (
              <p style={{ fontWeight: 400, fontSize: "1rem" }}>
                Destinatario: {destinatario.nombre} {destinatario.apellido} -{" "}
                {destinatario.cedula}
              </p>
            )}
            {beneficiarioAgregable && (
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
          </>
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
  destinatario: state.cuentas.destinatario,
  beneficiarios: state.cuentas.beneficiarios,
});

export default connect(mapStateToProps, {
  fetchCuentasByClienteId,
  transferirATercero,
  fetchClienteNCuentaFromTercero,
  fetchBeneficiariosMismoBanco,
})(TransferenciaATerceros);
