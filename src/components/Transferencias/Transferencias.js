import React, { useState } from "react";
import { Radio, Button } from "antd";
import TransferenciaPersonal from "../../components/Transferencias/TransferenciaPersonal";
import TransferenciaATerceros from "../../components/Transferencias/TansferenciaATerceros";
import TransferenciaInterbancaria from "../../components/Transferencias/TransferenciaInterbancaria";

const { Group } = Radio;

const Transferencias = () => {
  const [
    tipoDeTransferenciaSelected,
    setTipoDeTransferenciaSelected,
  ] = useState();

  const handleChange = (event) => {
    const { value } = event.target;

    setTipoDeTransferenciaSelected(value);
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    fontSize: "1rem",
    lineHeight: "30px",
  };

  return (
    <div>
      {!tipoDeTransferenciaSelected && (
        <>
          <h2 className="title-styles mt-3">Transferencias</h2>

          <h6>Seleccione el tipo de transferencia</h6>
          <Group onChange={handleChange} value={tipoDeTransferenciaSelected}>
            <Radio style={radioStyle} value="Personal">
              Personal
            </Radio>
            <Radio style={radioStyle} value="Terceros">
              A terceros
            </Radio>
            <Radio style={radioStyle} value="Interbancaria">
              Interbancaria
            </Radio>
          </Group>
        </>
      )}
      {tipoDeTransferenciaSelected && (
        <div className="mt-3">
          <Button
            className="mb-4"
            type="primary"
            onClick={() => setTipoDeTransferenciaSelected(null)}
          >
            <i className="fas fa-arrow-left"></i>
          </Button>

          {tipoDeTransferenciaSelected === "Personal" && (
            <TransferenciaPersonal />
          )}
          {tipoDeTransferenciaSelected === "Terceros" && (
            <TransferenciaATerceros />
          )}
          {tipoDeTransferenciaSelected === "Interbancaria" && (
            <TransferenciaInterbancaria />
          )}
        </div>
      )}
    </div>
  );
};

export default Transferencias;
