import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { cerrarSesion } from "../../state-mgmt/actions/auth-actions";
import notyf from "../../utils/notyf";

const Header = ({ usuarioActual, cerrarSesion, cliente }) => {
  const handleCerrarSesion = () => {
    cerrarSesion();

    notyf.success("¡Sesión cerrada exitosamente!");
  };

  const mainStyle = {
    cursor: "pointer",
  };

  const navbar = (
    <Navbar style={mainStyle} bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">
            Sd-Bank
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {usuarioActual.email && (
            <Nav className="ml-auto">
              <Link className="navbar-brand" to="/home">
                Cuentas
              </Link>
              <Link className="navbar-brand" to="/link">
                Transferencias
              </Link>
              <NavDropdown
                title={`${cliente.nombre} ${cliente.apellido}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => handleCerrarSesion()}>
                  <Link className="navbar-brand" to="/">
                    Cerrar sesión
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {!usuarioActual.email && (
            <Nav className="ml-auto">
              <Link className="navbar-brand" to="/auth/iniciar-sesion">
                Iniciar sesión
              </Link>
              <Link className="navbar-brand" to="/auth/registrarse">
                Registrarse
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  return <>{navbar}</>;
};

const mapStateToProps = (state) => ({
  usuarioActual: state.auth.usuarioActual,
  cliente: state.auth.cliente,
});

export default connect(mapStateToProps, { cerrarSesion })(Header);
