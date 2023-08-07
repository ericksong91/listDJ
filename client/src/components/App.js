import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import Homepage from "./Homepage";
import Login from "./top/Login";
import Signup from "./top/Signup";
import SetlistPage from "./pages/SetlistPage";
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

  const AuthLayout = ({ authenticated }) =>
    authenticated
      ? <Homepage setlists={setlists} user={user} />
      : <Navigate to="/login" replace />;

  return (
    <div className="App">
      <Routes>
        <Route element={<AuthLayout authenticated={!!user} />}>
          <Route path='/' element={<Homepage setlists={setlists} user={user} />} />
          <Route path='/sets/:id' element={<SetlistPage />} />
        </Route>
        <Route path='/login'
          element={!user ? <Login /> : <Navigate replace to="/" />}
        />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>

  )
}

export default App;