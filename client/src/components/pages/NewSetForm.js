import { useState } from 'react';
import {
    Button, Container, Box, TextField, Card, CardMedia, CardHeader, CardContent,
    FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';

function NewSetForm({ user, onNewSetlist }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    if (!user) {
        return <div>Loading...</div>
    };

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const newSetlist = {
            name: name,
            description: description,
            genre: genre,
            avg_bpm: 0,
            length: 0,
            user_id: user.id
        };

        onNewSetlist(newSetlist, setErrors)
    };

    return (
        <div className="NewSetForm">
            <Container className='NewPaintingForm' component="main">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <h1>Submit New Painting</h1>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent={"center"}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ maxWidth: 300, maxheight: 800 }} >
                                    <CardHeader
                                        title={"Details"}
                                        subheader={name}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Setlist Name"
                                        name="name"
                                        type="text"
                                        inputProps={{ maxLength: 30 }}
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        multiline={true}
                                        minRows={4}
                                        id="description"
                                        name="description"
                                        type="text"
                                        inputProps={{ maxLength: 150 }}
                                        label={`Description (${150 - description.length} chars left)`}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="genre"
                                        name="genre"
                                        type="text"
                                        inputProps={{ maxLength: 50 }}
                                        label={`Genre (${50 - genre.length} chars left)`}
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                    />
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ maxWidth: 345, maxheight: 600 }} >
                                    <CardHeader
                                        title={"Preview"}
                                        subheader={name}
                                    />
                                    <CardContent>
                                        <ul>{description}</ul>
                                        <ul>{genre}</ul>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                        {errors}
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default NewSetForm;
