import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { cerrarSesion } from "../../state-mgmt/actions/auth-actions";
import notyf from "../../utils/notyf";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header = ({ usuarioActual, cerrarSesion, cliente }) => {
  const { SubMenu } = Menu;

  const { Header: HeaderL } = Layout;

  const handleCerrarSesion = () => {
    cerrarSesion();

    notyf.success("¡Sesión cerrada exitosamente!");
  };

  const navbar = (
    <div>
      <HeaderL className="header">
        <div className="container">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">SD Bank</Link>
            </Menu.Item>
            {/* <Menu.Item key="5" onClick={() => handleClick("clientes")}> */}
            {usuarioActual.email && (
              <>
                <Menu.Item key="5">
                  <Link to="/cuentas">Cuentas</Link>
                </Menu.Item>
                {/* <Menu.Item key="6">
                  <Link to="/perfiles">Perfiles</Link>
                </Menu.Item> */}
                <SubMenu
                  key="sub1"
                  icon={<UserOutlined />}
                  title={`${cliente.nombre} ${cliente.apellido}`}
                >
                  <Menu.Item onClick={() => handleCerrarSesion()} key="9">
                    <Link to="/">Cerrar sesión</Link>
                  </Menu.Item>
                </SubMenu>
              </>
            )}

            {!usuarioActual.email && (
              <>
                <Menu.Item key="8">
                  <Link to="/auth/iniciar-sesion">Iniciar sesión</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/auth/registrarse">Registro</Link>
                </Menu.Item>
              </>
            )}
          </Menu>
        </div>
      </HeaderL>
    </div>

    // <Navbar style={mainStyle} bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand>
    //       <Link className="navbar-brand" to="/">
    //         Sd-Bank
    //       </Link>
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       {usuarioActual.email && cliente.nombre &&  (
    //         <Nav className="ml-auto">
    //           <Link className="navbar-brand" to="/cuentas">
    //             Cuentas
    //           </Link>
    //           <Link className="navbar-brand" to="/link">
    //             Transferencias
    //           </Link>
    //           <NavDropdown
    //             title={`${cliente.nombre} ${cliente.apellido}`}
    //             id="basic-nav-dropdown"
    //           >
    //             <NavDropdown.Item onClick={() => handleCerrarSesion()}>
    //               <Link className="navbar-brand" to="/">
    //                 Cerrar sesión
    //               </Link>
    //             </NavDropdown.Item>
    //           </NavDropdown>
    //         </Nav>
    //       )}

    //       {!usuarioActual.email && (
    //         <Nav className="ml-auto">
    //           <Link className="navbar-brand" to="/auth/iniciar-sesion">
    //             Iniciar sesión
    //           </Link>
    //           <Link className="navbar-brand" to="/auth/registrarse">
    //             Registrarse
    //           </Link>
    //         </Nav>
    //       )}
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );

  return <>{navbar}</>;
};

const mapStateToProps = (state) => ({
  usuarioActual: state.auth.usuarioActual,
  cliente: state.auth.cliente,
});

export default connect(mapStateToProps, { cerrarSesion })(Header);
