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

  function handleEdit(updatedSetListTracks, onEdit, onError) {
    fetch(`/setlist_tracks`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedSetListTracks)
    })
      .then((r) => {
        onEdit(false);
        if (r.ok) {
          r.json().then((data) => {
            const filteredSetlists = setlists.map((set) => {
              if(set.id === data[0].setlist_id) {
                return {
                  id: set.id,
                  genre: set.genre,
                  avg_bpm: set.avg_bpm,
                  length: set.length,
                  name: set.name,
                  user_id: set.user_id,
                  setlist_track_org: data,
                  tracks: set.tracks
                  // Update tracks later when adding new tracks.
                };
              } else {
                return set
              }
            });
            setSetlists([...filteredSetlists]);
          });
        } else {
          r.json().then((error) => onError(error.errors));
        }
      });
  };

  const AuthLayout = ({ authenticated }) => {
    const location = useLocation();
    return authenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
  };

  return (
    <Paper className="App" elevation={5} sx={{ margin: 4, paddingBottom: 5, bgcolor: 'rgb(80, 75, 71)' }}>
      <Navbar user={user} />
      <Routes>
        <Route element={<AuthLayout authenticated={!!user} />}>
          <Route path='/' element={<Homepage setlists={setlists} users={users} />} />
          <Route path='/sets/:id' element={<SetlistPage setlists={setlists} onEdit={handleEdit} />} />
          <Route path='/profile/:id' element={<Profile users={users} setlists={setlists} />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Paper>
  );
};

export default App;