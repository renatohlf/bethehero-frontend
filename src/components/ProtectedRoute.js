import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./../utils/auth";
import { routes } from './../static/routes';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: routes.login(),
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
