import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Box, TextField } from '@mui/material';
import { UserContext } from '../context/user';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const { user, login } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!!user && location.state?.from) {
            return navigate(location.state.from)
        };
    }, [user, location.state.from, navigate]);


    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        login(username, password, setIsLoading, setErrors);
        setPassword("");
    };

    return (
        <Container className='LoginPage' component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1>Log In</h1>
                <Box component="form" onSubmit={handleSubmit}>
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
                    {errors}
                </Box>
            </Box>
            <Link to="/signup">
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Don't have an account? Signup!
                </Button>
            </Link>
        </Container>
    );
}

export default Login;