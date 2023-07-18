import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";

function App() {
  const { user } = useContext(UserContext);
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);

  return (
    <div className="App">
      <h1>Hello {user}</h1>
    </div>
  );
}

export default App;