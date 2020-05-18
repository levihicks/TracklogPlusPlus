import React, { useState, useEffect } from "react";
import { authObserver } from "../firebase";
import AuthContext from "./context";

const withAuthProvider = (Component) => (props) => {
  const [authState, setAuthState] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    let listener = authObserver(
      (authUser) => {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setAuthState(authUser);
      },
      () => {
        localStorage.removeItem("authUser");
        setAuthState(null);
      }
    );
    return () => listener();
  }, [props]);

  return (
    <AuthContext.Provider value={authState}>
      <Component {...props} />
    </AuthContext.Provider>
  );
};

export default withAuthProvider;
