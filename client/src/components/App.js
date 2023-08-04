import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import Homepage from "./Homepage";
import Login from "./top/Login";
import Signup from "./top/Signup";
import { Routes, Route, Navigate } from "react-router-dom";

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
    return <Navigate to path="/login" />
  };

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage setlists={setlists} user={user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>

  )
}

export default App;