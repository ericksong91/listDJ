import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import Login from "./Login";

function App() {
  const [setlists, setSetlists] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch('/setlists')
      .then(r => {
        if (r.ok) {
          r.json().then(data => setSetlists(data))
        } else {
          r.json().then(error => alert(error.errors))
        };
      });
  }, []);

  if (!user) {
    return <Login />
  };

  console.log(setlists)

  return (
    <div className="App">
      <h1>Hello {user.username}</h1>
    </div>
  );
}

export default App;