import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <h1>Hello {user}</h1>
    </div>
  );
}

export default App;