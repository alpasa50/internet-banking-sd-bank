import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../App/App.scss";

const Home = () => {
  return (
    <div className="text-center">
      <img
        src="/sd-bank-logo.jpeg"
        className="p-5"
        alt="logo"
        width={500}
        height={250}
      />
      <hr />
      <h4 style={{ fontStyle: "italic" }}>Donde tu dinero esta seguro</h4>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Feria de Vehiculos.png"
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
            <h4 className="card-header" style={{ backgroundColor: "#001529" }}>
              Cuentas de ahorro
            </h4>
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
                "Ahorrar no es solo guardar, sino saber gastar"
              </p>
            </div>
            <div
              className="card-footer"
              style={{ backgroundColor: "#001529" }}
            ></div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <h4 className="card-header" style={{ backgroundColor: "#001529" }}>
              Prestamos
            </h4>
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
                "Solucion a tus compromisos de estudio o trabajo."
              </p>
            </div>
            <div
              className="card-footer"
              style={{ backgroundColor: "#001529" }}
            ></div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <h4 className="card-header" style={{ backgroundColor: "#001529" }}>
              Transferencias
            </h4>
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
                "Trasnferencias al instante a traves de la plataforma"
              </p>
            </div>
            <div
              className="card-footer"
              style={{ backgroundColor: "#001529" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
