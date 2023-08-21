import logo from '../images/listDJlogo.png'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { Button, Container, Grid, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="Navbar">
      <Container maxWidth="lg">
        {!user ? <h2>Welcome, Guest!</h2> : <Box sx={{ display: 'flex' }}>
          <img className="avatar-small" alt="avatar" src={user.avatar} />
          <Typography variant="h5" sx={{ marginLeft: 5 }}>
            Welcome, {user.username}!
          </Typography>
        </Box>}
        <Box align="center">
          <img src={logo} alt='logo' />
        </Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" sx={{
              '&:hover': {
                bgcolor: 'rgb(194,98,0)'
              },
              bgcolor: 'rgb(245,150,0)'
            }} onClick={() => navigate(-1)}>Back</Button>
          </Grid>
          <Grid item>
            <Link to="/"><Button variant="contained" sx={{
              '&:hover': {
                bgcolor: 'rgb(194,98,0)'
              },
              bgcolor: 'rgb(245,150,0)'
            }}>Home</Button></Link>
          </Grid>
          <Grid item>
            {!user ? <Link to="/login"><Button variant="contained" sx={{
              '&:hover': {
                bgcolor: 'rgb(194,98,0)'
              },
              bgcolor: 'rgb(245,150,0)'
            }}>Login</Button></Link>
              :
              <Link to={`/profile/${user.id}`}><Button variant="contained" sx={{
                '&:hover': {
                  bgcolor: 'rgb(194,98,0)'
                },
                bgcolor: 'rgb(245,150,0)'
              }}>View Profile</Button></Link>}
          </Grid>
          <Grid item>
            {!user ? null
              :
              <Link to="/"><Button variant="contained" sx={{
                '&:hover': {
                  bgcolor: 'rgb(194,98,0)'
                }, 
                bgcolor: 'rgb(245,150,0)'
              }} onClick={logout}>Logout</Button></Link>}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Navbar;
