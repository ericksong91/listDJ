import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import Navbar from "./top/Navbar";
import Homepage from "./Homepage";
import Profile from "./pages/Profile"
import Login from "./top/Login";
import Signup from "./top/Signup";
import SetlistPage from "./pages/SetlistPage";
import NewSetForm from "./pages/NewSetForm";
import { Routes, Route, useNavigate, Navigate, Outlet, useLocation } from "react-router-dom";
import { Paper } from "@mui/material";
import '../css/App.css'

function App() {
  const [setlists, setSetlists] = useState([]);
  const { user, users, handleDeleteUser } = useContext(UserContext);
  const navigate = useNavigate();

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

  function handleEditSetlistTracks(updatedSetListTracks, onEdit, onIsLoading, onError) {
    fetch(`/setlist_tracks`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedSetListTracks)
    })
      .then((r) => {
        onEdit(false);
        onIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            const filteredSetlists = setlists.map((set) => {
              if (set.id === data[0].setlist_id) {
                return {
                  id: set.id,
                  genre: set.genre,
                  description: set.description,
                  avg_bpm: set.avg_bpm,
                  length: set.length,
                  name: set.name,
                  user_id: set.user_id,
                  setlist_track_org: data,
                  tracks: set.tracks
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

  function handleEditSetlists(set, name, description, onIsLoading, onIsEditing, onErrors) {
    const editedSet = {
      name: name,
      description: description
    };

    fetch(`/setlists/${set.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedSet)
    })
      .then((r) => {
        onIsLoading(false);
        onIsEditing(false);
        if (r.ok) {
          r.json().then((data) => {
            const filteredSetlists = setlists.map((set) => {
              if (set.id === data.id) {
                return data
              } else {
                return set
              }
            });
            setSetlists([...filteredSetlists]);
          })
        } else {
          r.json().then((error) => onErrors(error.errors))
        }
      });
  };

  function handleNewTrack() {

  }

  function handleDelete(id, onIsLoading, onErrors) {
    handleDeleteUser(id, setlists, onIsLoading, onErrors, setSetlists);
    navigate('/');
  };

  function handleNewSetlists(newSetlist, newSet, onErrors, onIsLoading) {
    fetch('/setlists', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ set: newSet, tracks: newSetlist })
    })
      .then((r) => {
        onIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            setSetlists([data, ...setlists]);
            navigate(`profile/${data.user_id}`);
          });
        } else {
          r.json().then((error) => onErrors(error.errors));
        }
      })
  };

  function handleDeleteSetlists(id, onError, onIsLoading, navigate) {
    fetch(`/setlists/${id}`, {
      method: 'DELETE'
    })
      .then((r) => {
        onIsLoading(false);
        if (r.ok) {
          const filteredSetlists = setlists.filter((set) => set.id !== id);
          setSetlists([...filteredSetlists]);
          navigate('/');
        } else {
          r.json().then((error) => onError(error.errors))
        }
      })
  };

  const AuthLayout = ({ authenticated }) => {
    const location = useLocation();
    return authenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
  };

  return (
    <Paper className="App" elevation={5} sx={{ margin: 1, paddingBottom: 5, bgcolor: 'rgb(40, 40, 40)' }}>
      <Navbar user={user} />
      <Routes>
        <Route element={<AuthLayout authenticated={!!user} />}>
          <Route path='/' element={<Homepage setlists={setlists} users={users} />} />
          <Route path='/sets/:id' element={
            <SetlistPage
              user={user}
              users={users}
              setlists={setlists}
              onEditSetlists={handleEditSetlists}
              onEditSetlistTracks={handleEditSetlistTracks}
              onDeleteSetlists={handleDeleteSetlists} />}
          />
          <Route path='/profile/:id' element={<Profile setlists={setlists} user={user} users={users} onDelete={handleDelete} />} />
          <Route path='/new' element={<NewSetForm user={user} onNewSetlist={handleNewSetlists} />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Paper>
  );
};

export default App;