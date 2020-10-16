import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBeneficiariosFromCuenta } from "../../state-mgmt/actions/cuenta.actions";
import { formatDate } from "../../utils/formatter";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";

import { deleteBeneficiario } from "../../state-mgmt/actions/cuenta.actions";

const BeneficiariosLista = ({
  match,
  fetchBeneficiariosFromCuenta,
  deleteBeneficiario,
  beneficiarios,
}) => {
  const { _id } = match.params;

  useEffect(() => {
    fetchBeneficiariosFromCuenta(_id);
  }, []);

  const columns = [
    {
      title: "Nombre completo",
      dataIndex: "nombre",
    },
    {
      title: "Cédula",
      dataIndex: "cedula",
    },
    {
      title: "Banco",
      dataIndex: "banco_beneficiario",
    },
    {
      title: "Número de cuenta",
      dataIndex: "cuenta_beneficiario",
    },
    {
      title: "Agregado en",
      dataIndex: "createdAt",
    },
    {
      title: "Operación",
      key: "operacion",
      render: (_, beneficiario) => (
        <span>
          <DeleteOutlined
            style={deleteIStyles}
            onClick={(event) => onDeleteBeneficiario(beneficiario.key, event)}
          />
        </span>
      ),
    },
  ];

  const deleteIStyles = {
    color: "#f52d1b",
    fontSize: "1.2rem",
  };

  const onDeleteBeneficiario = async (beneficiarioId, event) => {
    event.preventDefault();

    alertify.confirm(
      "Confirmar eliminación",
      "¿Seguro que desea eliminar a este beneficiario?",
      async () => {
        try {
          await deleteBeneficiario(beneficiarioId);

          await fetchBeneficiariosFromCuenta(_id);

          notyf.success("Beneficiario eliminado satisfactoriamente.");
        } catch (error) {
          notyf.error(error.response.data.error);
        }
      },
      () => undefined
    );
  };

  const dataMapped =
    beneficiarios &&
    beneficiarios.map((beneficiario) => ({
      ...beneficiario,
      createdAt: formatDate(beneficiario.createdAt),
      updatedAt: formatDate(beneficiario.updatedAt),
      key: beneficiario._id,
    }));

  return (
    <div className="container mt-4">
      <Link to="/cuentas">
        <Button className="mb-4" type="primary">
          <i className="fas fa-arrow-left"></i>
        </Button>
      </Link>
      <h2 className="title-styles">Beneficiarios</h2>
      <Link to={`/cuentas/${_id}/beneficiarios/crear`}>
        <Button className="mb-4 mt-2" type="primary">
          Agregar beneficiario <i className="ml-2 fas fa-user-plus"></i>
        </Button>
      </Link>
      <Table
        className="ant-table"
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered
        dataSource={dataMapped}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  beneficiarios: state.cuentas.beneficiarios,
});

export default connect(mapStateToProps, {
  fetchBeneficiariosFromCuenta,
  deleteBeneficiario,
})(BeneficiariosLista);
