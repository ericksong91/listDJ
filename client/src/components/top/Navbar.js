import logo from '../images/listDJlogo.png'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { Button, Container, Grid, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Box className="Navbar">
      <Container maxWidth="lg">
        {!user ?
          <Typography variant="h6" sx={{ paddingTop: 1.5, paddingLeft: 1, color: "orange" }}>Welcome, Guest!</Typography>
          :
          <Grid container>
            <Grid item xs={0.5}>
              {!!user.avatar ? <img className="avatar-small" alt="avatar" src={user.avatar} /> : <div></div>}
            </Grid>
            <Grid item sx={{ paddingTop: 1.5, paddingLeft: 1 }}>
              <Typography variant="h6" sx={{ color: 'orange' }}>
                Welcome, {user.username}!
              </Typography>
            </Grid>
          </Grid>}
        <Box align="center">
          <img src={logo} alt='logo' className='logo' />
        </Box>
        {!user ? null :
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
              <Link to={`/profile/${user.id}`}><Button variant="contained" sx={{
                '&:hover': {
                  bgcolor: 'rgb(194,98,0)'
                },
                bgcolor: 'rgb(245,150,0)'
              }}>View Profile</Button></Link>
            </Grid>
            <Grid item>
              <Link to="/new"><Button variant="contained" sx={{
                '&:hover': {
                  bgcolor: 'rgb(194,98,0)'
                },
                bgcolor: 'rgb(245,150,0)'
              }}>Create New Set</Button></Link>
            </Grid>
            <Grid item>
              <Link to="/"><Button variant="contained" sx={{
                '&:hover': {
                  bgcolor: 'rgb(194,98,0)'
                },
                bgcolor: 'rgb(245,150,0)'
              }} onClick={logout}>Logout</Button></Link>
            </Grid>
          </Grid>
        }
      </Container>
    </Box>
  );
}

export default Navbar;
