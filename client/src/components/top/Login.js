import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Button, Container, Box, TextField, Card, Typography } from '@mui/material';
import { CircularProgress } from "@mui/material";
import { UserContext } from '../context/user';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const { user, isFetching, login } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!!user && location.state?.from) {
            return navigate(location.state.from)
        };
    }, [user, navigate, location]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        login(username, password, setIsLoading, setErrors);
        setPassword("");
    };

    if (isFetching) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ padding: 20 }} />
            </Box>
        );
    };

    if (user) {
        return <Navigate replace to="/" />;
    } else {
        return (
            <Container className='LoginPage' component="main" maxWidth="xs">
                <Card sx={{ padding: 3, marginBottom: 3, bgcolor: 'rgb(50,50,50)', boxShadow: 10 }}>
                    <Box
                        sx={{
                            marginTop: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h4" sx={{ color: 'white' }}>Log In</Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ input: { color: 'white' }, label: { color: 'white' } }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="user"
                                label="Username"
                                name="user"
                                autoComplete="user"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            {isLoading ?
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >Loading...</Button>
                                :
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >Login</Button>}
                             <Typography variant="h7" sx={{ color: 'red' }}>{errors.map((error, ind) => <li key={ind + 1}>{error}</li>)}</Typography>
                        </Box>
                    </Box>
                    <Link to="/signup">
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Don't have an account? Signup!
                        </Button>
                    </Link>
                </Card>
            </Container>
        );
    }
}

export default Login;