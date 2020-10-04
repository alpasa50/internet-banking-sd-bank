import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = (props) => {
  const { path, usuarioActual } = props;

  return (
    <Route
      path={path}
      exact
      render={(data) =>
        !usuarioActual.token ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to="/"></Redirect>
        )
      }
    ></Route>
  );
};

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  usuarioActual: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  usuarioActual: state.auth.usuarioActual,
});

export default connect(mapStateToProps, null)(AuthRoute);
