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
                <Menu.Item key="6">
                  <Link to="/prestamos">Préstamos</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/transferencias">Transferencias</Link>
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
  );

  return <>{navbar}</>;
};

const mapStateToProps = (state) => ({
  usuarioActual: state.auth.usuarioActual,
  cliente: state.auth.cliente,
});

export default connect(mapStateToProps, { cerrarSesion })(Header);
