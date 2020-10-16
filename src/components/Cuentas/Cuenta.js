import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { formatCurrency, formatDate } from "../../utils/formatter";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 325,
    margin: "10px 10px !important",
  },
  media: {
    height: 140,
    margin: "10px 10px",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "#fafafa",
    padding: "8px 5px",
    fontWeight: 500,
    backgroundColor: "#001c61",
  },
});

const Cuenta = ({ cuenta }) => {
  const [redirect, setRedirect] = useState("");

  const val = Math.floor(Math.random() * 901 + 1);

  const handleRedirect = (path) => {
    setRedirect(`${path}`);
  };

  const classes = useStyles();

  const beneficiariosDescription =
    cuenta.beneficiarios.length === 0
      ? ", no tiene beneficiarios"
      : cuenta.beneficiarios.length === 1
      ? ", tiene un beneficiario"
      : `, tiene ${cuenta.beneficiarios.length} beneficiarios`;

  const transaccionesDescripcion =
    cuenta.transacciones.length === 0
      ? " y aún no tiene transacciones procesadas."
      : cuenta.transacciones.length === 1
      ? " y una transacción procesada."
      : ` y ${cuenta.transacciones.length} transacciones procesadas.`;

  return (
    <div className="row">
      {redirect && <Redirect to={redirect} />}
      <Card className={classes.root} style={{ margin: "10px" }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`https://picsum.photos/${val}/300`}
            title="Contemplative Reptile"
          />
          <div className={classes.overlay}>{cuenta.tipo_de_cuenta}</div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              <span className="num-cuenta">{cuenta.numero_de_cuenta}</span>
              <span className="balance-cuenta">
                {cuenta.balance_disponible === 0
                  ? "RD$0"
                  : formatCurrency(cuenta.balance_disponible)}
              </span>
              <span className="fondos-disponibles">disponibles</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Esta cuenta cuenta fue abierta en {formatDate(cuenta.createdAt)}
              {beneficiariosDescription}
              {transaccionesDescripcion}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <VisibilityIcon
              onClick={() => handleRedirect(`/cuentas/${cuenta._id}/detalles`)}
            />
          </Button>
          <Button
            size="small"
            onClick={() =>
              handleRedirect(`/cuentas/${cuenta._id}/transacciones`)
            }
          >
            Movimientos
          </Button>
          <Button
            size="small"
            onClick={() =>
              handleRedirect(`/cuentas/${cuenta._id}/beneficiarios`)
            }
          >
            Beneficiarios
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Cuenta;
