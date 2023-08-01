import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import { Container } from '@mui/material';
import Login from "./Login";
import SetlistCard from "./cards/SetlistCard";

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

  const setlistCards = setlists.map((set) =>
    <SetlistCard key={set.id} set={set} />
  );

  // Need to add setlists by date created, show latest 5

  return (
    <div className="App">
      <h1>Hello {user.username}</h1>
      {setlistCards}
    </div>
  );
}

export default App;