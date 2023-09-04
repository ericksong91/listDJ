import { useState, useContext } from "react";
import { UserContext } from '../context/user';
import { Navigate, Link } from "react-router-dom";
import { Button, Container, Box, TextField, Card, Typography } from '@mui/material';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [bio, setBio] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user, signup } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        signup(username, password, passwordConfirmation, bio, setIsLoading, setErrors);
    };

    if (user) {
        return <Navigate replace to="/" />
    };

    return (
        <Container className='SignupPage' component="main" maxWidth="xs">
            <Card sx={{ padding: 3, marginBottom: 3, bgcolor: 'rgb(50,50,50)', boxShadow: 10 }}>
                <Box
                    sx={{
                        marginTop: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ color: 'white' }}>Sign Up</Typography>
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
                            label="Password (9 - 17 characters)"
                            inputProps={{ maxLength: 17, minLength: 9 }}
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password_confirmation"
                            name="password_confirmation"
                            label="Password Confirmation"
                            inputProps={{ maxLength: 17, minLength: 9 }}
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => { setPasswordConfirmation(e.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="biography"
                            name="biography"
                            label={`Biography (${150 - bio.length} chars left)`}
                            inputProps={{ style: { color: 'white' }, maxLength: 150 }}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
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
                            >Signup</Button>}
                        <Typography variant="h7" sx={{ color: 'red' }}>{errors.map((error, ind) => <li key={ind + 1}>{error}</li>)}</Typography>
                    </Box>
                </Box>
                <Link to="/login">
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Already have an account? Login!
                    </Button>
                </Link>
            </Card>
        </Container>
    )
}

export default Signup;