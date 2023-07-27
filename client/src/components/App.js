import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import Login from "./Login";

function App() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Login />
  };

  return (
    <div className="App">
      <h1>Hello {user.username}</h1>
    </div>
  );
}

export default App;