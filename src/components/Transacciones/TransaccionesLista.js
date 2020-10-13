import React, { useEffect } from "react";
import { fetchTransaccionesFromCuenta } from "../../state-mgmt/actions/cuenta.actions";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import { formatDate, formatCurrency } from "../../utils/formatter";
import { Link } from "react-router-dom";

const TransaccionLista = ({
  match,
  fetchTransaccionesFromCuenta,
  transacciones,
}) => {
  const { _id } = match.params;

  useEffect(() => {
    fetchTransaccionesFromCuenta(_id);

    return () => {
      transacciones = null;
    };
  }, []);

  const columns = [
    {
      title: "Descripción",
      dataIndex: "descripcion",
    },
    {
      title: "Cantidad en tránsito",
      dataIndex: "cantidad_en_transito",
    },
    {
      title: "Aprobada",
      dataIndex: "aprobada",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
    },
    {
      title: "Balance anterior",
      dataIndex: "balance_anterior",
    },
    {
      title: "Balance posterior",
      dataIndex: "balance_posterior",
    },
    {
      title: "Fecha/hora",
      dataIndex: "createdAt",
    },
    {
      title: "Operación",
      key: "operacion",
      render: (_, transaccion) => (
        <span>
          <Link
            to={`/cuentas/${_id}/transacciones/${transaccion._id}/detalles/${transaccion.tipo}`}
          >
            <i style={detailsStyles} className="far fa-eye"></i>
          </Link>
        </span>
      ),
    },
  ];

  const dataMapped =
    transacciones &&
    transacciones.map((transaccion) => ({
      ...transaccion,
      createdAt: formatDate(transaccion.createdAt),
      updatedAt: formatDate(transaccion.updatedAt),
      key: transaccion._id,
      aprobada: transaccion.aprobada ? "Sí" : "No",
      cantidad: formatCurrency(transaccion.cantidad),
      balance_anterior: transaccion.balance_anterior
        ? formatCurrency(transaccion.balance_anterior)
        : "",
      balance_posterior: transaccion.balance_posterior
        ? formatCurrency(transaccion.balance_posterior)
        : "",
      cantidad_en_transito: formatCurrency(transaccion.cantidad_en_transito),
    }));

  const detailsStyles = {
    color: "#2364db",
    fontSize: "2rem",
    marginRight: "20px",
  };

  return (
    <div className="container mt-4 p-5">
      <Link to="/cuentas">
        <Button className="mb-4" type="primary">
          <i className="fas fa-arrow-left"></i>
        </Button>
      </Link>
      <h2 className="title-styles">Transacciones</h2>
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
  transacciones: state.cuentas.transacciones,
});

export default connect(mapStateToProps, {
  fetchTransaccionesFromCuenta,
})(TransaccionLista);
