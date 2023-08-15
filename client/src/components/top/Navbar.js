import { useContext } from "react";
import { UserContext } from "../context/user";
import { Button, Container, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="Navbar">
      <Container maxWidth="lg">
        {!user ? <h2>Welcome, Guest!</h2> : <h2>Welcome, {user.username}!</h2>}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
              <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
          </Grid>
          <Grid item>
              <Link to="/"><Button variant="contained">Home</Button></Link>
          </Grid>
          <Grid item>
            {!user ? <Link to="/login"><Button variant="contained">Login</Button></Link>
              :
              <Link to="/profile"><Button variant="contained">View Profile</Button></Link>}
          </Grid>
          <Grid item>
            {!user ? null
              :
              <Link to="/"><Button variant="contained" onClick={logout}>Logout</Button></Link>}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Navbar;
