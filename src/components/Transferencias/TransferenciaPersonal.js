import React, { useEffect, useState } from "react";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { Form, InputNumber, Select, Button } from "antd";
import {
  fetchCuentasByClienteId,
  realizarTransferenciaPersonal,
} from "../../state-mgmt/actions/cuenta.actions";
import { formatCurrency } from "../../utils/formatter";

const { Option } = Select;

const TransferenciaPersonal = ({
  cuentasPersonales,
  realizarTransferenciaPersonal,
  fetchCuentasByClienteId,
  cliente,
}) => {
  const [monto, setMonto] = useState();
  const [cuentaDesde, setCuentaDesde] = useState();
  const [cuentaHasta, setCuentaHasta] = useState();
  const [valido, setValido] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetchCuentasByClienteId(cliente._id);
  }, []);

  useEffect(() => {
    const montoNumber = Number(monto);

    setError("");

    setValido(cuentaDesde && cuentaHasta && montoNumber);
  }, [monto, cuentaDesde, cuentaHasta]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    alertify.confirm(
      "Confirmar transferencia",
      `¿Seguro que desea transfeirse RD$${monto.toLocaleString()}?`,
      async () => {
        if (cuentaDesde === cuentaHasta) {
          setError("No puede transferirse fondos a la misma cuenta.");
        } else {
          try {
            await realizarTransferenciaPersonal(cuentaDesde, {
              cliente_id: cliente._id,
              destinatario_numero_de_cuenta: cuentaHasta,
              cantidad: monto,
            });

            notyf.success(`¡Fondos transferidos satisfactoriamente!`);
          } catch (error) {
            setError(error.response.data.error);
          }
        }
      },
      () => undefined
    );
  };

  return (
    <div>
      <h2 className="title-styles">Tansferencia Personal</h2>
      <Form onSubmitCapture={(e) => handleSubmit(e)}>
        <Form.Item
          name={"cuentaDesde"}
          label="Desde"
          rules={[{ required: true }]}
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
                <Option key={cuenta._id} value={cuenta.numero_de_cuenta}>
                  {cuenta.numero_de_cuenta} -
                  {formatCurrency(cuenta.balance_disponible)}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={"cuentaHasta"}
          label="Hasta"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            style={{ width: 250 }}
            name="cuentaHasta"
            value={cuentaHasta}
            onChange={(cuenta) => setCuentaHasta(cuenta)}
            placeholder="Seleccione la cuenta"
            optionFilterProp="children"
          >
            {cuentasPersonales &&
              cuentasPersonales.map((cuenta) => (
                <Option key={cuenta._id} value={cuenta.numero_de_cuenta}>
                  {cuenta.numero_de_cuenta} -
                  {formatCurrency(cuenta.balance_disponible)}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={"monto"}
          label="Monto"
          rules={[
            { required: true, message: "El monto es obligatorio." },
            // { min: 10, message: "El valor mínimo a transferir es RD$10." },
          ]}
        >
          <InputNumber
            placeholder="Monto a transferir"
            style={{ width: 250 }}
            onChange={(cantidad) => setMonto(cantidad)}
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
});

export default connect(mapStateToProps, {
  fetchCuentasByClienteId,
  realizarTransferenciaPersonal,
})(TransferenciaPersonal);
