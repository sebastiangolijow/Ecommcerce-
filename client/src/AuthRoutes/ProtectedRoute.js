import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useLocalStorage } from "../LocalStorage/useLocalStorage";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userLoged = useSelector((state) => state.usersReducer.userLoged);
  // eslint-disable-next-line
  const [userLogedStorage, setUserLogedStorage, getUserLogedStorage] = useLocalStorage(
    "supabase.auth.token",
    ""
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userLoged?.id || userLogedStorage ) {
          if (rest.restringed && userLoged.permission === rest.restringed) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location.pathname,
                  },
                }}
              />
            );
          } else if (
            props.location.pathname.toLocaleLowerCase() === "/access"
          ) {
            if (props.location.state?.from) {
              return (
                <Redirect
                  to={{
                    pathname: props.location.state.from,
                    state: {
                      from: props.location.pathname,
                    },
                  }}
                />
              );
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/",
                    state: {
                      from: props.location.pathname,
                    },
                  }}
                />
              );
            }
          } else {
            return <Component {...props} />;
          }
        } else {
          if (props.location.pathname.toLocaleLowerCase() === "/access") {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/access",
                  state: {
                    from: props.location.pathname,
                  },
                }}
              />
            );
          }
        }
      }}
    />
  );
};
