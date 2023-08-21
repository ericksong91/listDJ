import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import Navbar from "./top/Navbar";
import Homepage from "./Homepage";
import Profile from "./pages/Profile"
import Login from "./top/Login";
import Signup from "./top/Signup";
import SetlistPage from "./pages/SetlistPage";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Paper } from "@mui/material";
import '../css/App.css'

function App() {
  const [setlists, setSetlists] = useState([]);
  const { user, users } = useContext(UserContext);

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

  const AuthLayout = ({ authenticated }) => {
    const location = useLocation();
    return authenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
  };

  return (
      <Paper className="App" elevation={5} variant="outlined" sx={{ margin: 4 }}>
        <Navbar user={user} />
        <Routes>
          <Route element={<AuthLayout authenticated={!!user} />}>
            <Route path='/' element={<Homepage setlists={setlists} users={users} />} />
            <Route path='/sets/:id' element={<SetlistPage setlists={setlists} />} />
            <Route path='/profile/:id' element={<Profile users={users} setlists={setlists} />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Paper>
  );
};

export default App;