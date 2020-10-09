import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import { formatDate, formatCurrency } from "../../utils/formatter";
import { Link } from "react-router-dom";
import {
  fetchPrestamosFromClienteId,
  saldarPrestamo,
} from "../../state-mgmt/actions/prestamo.actions";
import alertify from "alertifyjs";
import notyf from "../../utils/notyf";

const PrestamoLista = ({
  cliente,
  fetchPrestamosFromClienteId,
  prestamos,
  saldarPrestamo,
}) => {
  useEffect(() => {
    fetchPrestamosFromClienteId(cliente._id);
  }, []);

  const columns = [
    {
      title: "Descripción",
      dataIndex: "descripcion",
    },
    {
      title: "Cantidad total",
      dataIndex: "cantidad_total",
    },
    {
      title: "Cantidad saldada",
      dataIndex: "cantidad_saldada",
    },
    {
      title: "Cantidad restante",
      dataIndex: "cantidad_restante",
    },
    {
      title: "Aprobado",
      dataIndex: "aprobado",
    },
    {
      title: "Fecha de solicitud",
      dataIndex: "createdAt",
    },
    {
      title: "Operación",
      key: "operacion",
      render: (_, prestamo) => (
        <span>
          <Link to={`prestamos/${prestamo._id}/detalles`}>
            <i style={detailsStyles} className="far fa-eye"></i>
          </Link>
          <Button
            type="primary"
            style={payBtn}
            onClick={(event) => handlePagoPrestamo(prestamo._id, event)}
          >
            Pagar
          </Button>
        </span>
      ),
    },
  ];

  const payBtn = {
    border: "none",
    backgroundColor: "#24c966",
  };

  const handlePagoPrestamo = (_id, event) => {
    event.preventDefault();

    alertify
      .prompt(
        "Monto a saldar",
        "Introduzca el monto a saldar.",
        "",
        (_, monto) => {
          const numerosValidos = !Number(monto) || monto < 0;

          if (numerosValidos) {
            notyf.error("Debe introducir un valor numérico positivo.");
          } else {
            alertify.confirm(
              "Confirmar pago",
              `Está a punto de abonarles RD$${monto.toLocaleString()} a su préstamo. ¿Desea continuar?`,
              async () => {
                try {
                  await saldarPrestamo(_id, {
                    monto,
                    cliente_id: cliente._id,
                  });

                  await fetchPrestamosFromClienteId(cliente._id);

                  const mensajeExito = `Se saldaron RD$${monto.toLocaleString()} satisfactoriamente.`;

                  notyf.success(mensajeExito);
                } catch (error) {
                  notyf.error(error.response.data.error);
                }
              },
              () => undefined
            );
          }
        },
        () => {}
      )
      .setting({ closable: false });
  };

  const dataMapped =
    prestamos &&
    prestamos.map((prestamo) => ({
      ...prestamo,
      createdAt: formatDate(prestamo.createdAt),
      updatedAt: formatDate(prestamo.updatedAt),
      key: prestamo._id,
      cantidad_total: formatCurrency(prestamo.cantidad_total),
      cantidad_saldada: formatCurrency(prestamo.cantidad_saldada),
      cantidad_restante: formatCurrency(prestamo.cantidad_restante),
      aprobado: prestamo.aprobado ? "Sí" : "No",
    }));

  const detailsStyles = {
    color: "#2364db",
    fontSize: "2rem",
    marginRight: "20px",
  };

  return (
    <div className="container mt-4">
      <h2 className="title-styles">Préstamos</h2>
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
  prestamos: state.prestamos.prestamos,
  cliente: state.auth.cliente,
});

export default connect(mapStateToProps, {
  fetchPrestamosFromClienteId,
  saldarPrestamo,
})(PrestamoLista);
