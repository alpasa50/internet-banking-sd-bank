import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBeneficiariosFromCuenta } from "../../state-mgmt/actions/cuenta.actions";
import { formatDate } from "../../utils/formatter";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

const BeneficiariosLista = ({
  match,
  fetchBeneficiariosFromCuenta,
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
  ];

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
})(BeneficiariosLista);
