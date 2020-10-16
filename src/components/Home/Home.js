import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../App/App.scss";

const Home = () => {
  const imgStyles = {
    Width: "500px",
    height: "250px",
  };

  return (
    <div className="container-mt-4 text-center">
      <div className="row logo-text">
        <img
          src="https://res.cloudinary.com/dvoo3wu0v/image/upload/v1602795502/black_logo_qej0gv.png"
          className="p-5"
          alt="logo"
          className="img-fluid mt-4"
          style={imgStyles}
        />
        <h4>Donde tu dinero está seguro.</h4>
      </div>
      <hr />
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dvoo3wu0v/image/upload/v1602795504/Feria_de_veh%C3%ADculos_gcrusq.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/Finanzas_personales.png" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Oficina cerrada temporalmente.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className="row p-5">
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <h4 className="card-header">Cuentas de ahorro</h4>
            <div className="card-body">
              <p
                className="card-text"
                style={{ fontStyle: "italic", fontWeight: "bold" }}
              >
                <img
                  src="/2.jpg"
                  className="p-5"
                  alt="logo_ahorro"
                  width="100%"
                  height="100%"
                />
                Ahorrar no es solo guardar, sino también saber gastar
              </p>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <h4 className="card-header">Préstamos</h4>
            <div className="card-body">
              <p
                className="card-text"
                style={{ fontStyle: "italic", fontWeight: "bold" }}
              >
                <img
                  src="/firma.png"
                  className="p-2"
                  alt="logo_ahorro"
                  width="80%"
                  height="85%"
                />
                Solución a tus compromisos de estudio o trabajo.
              </p>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <h4 className="card-header">Transferencias</h4>
            <div className="card-body">
              <p
                className="card-text"
                style={{ fontStyle: "italic", fontWeight: "bold" }}
              >
                <img
                  src="/transfer.png"
                  className="p-2"
                  alt="logo_ahorro"
                  width="100%"
                  height="100%"
                />
                <br /> <br /> <br />
                Transferencias al instante a través de la plataforma.
              </p>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
