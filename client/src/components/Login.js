import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";

function Login() {
  const { user } = useContext(UserContext);

  return (
    <div className="Login">
      <h1>Hello, You're not logged in!</h1>
    </div>
  );
}

export default Login;