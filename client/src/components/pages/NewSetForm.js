import { useState } from 'react';
import {
    Button, Container, Box, TextField, Card, CardHeader, Grid
} from '@mui/material';

function NewSetForm({ user, onNewSetlist }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [track, setTrack] = useState("");
    const [trackBPM, setTrackBPM] = useState("");
    const [trackKey, setTrackKey] = useState("");
    const [trackGenre, setTrackGenre] = useState("");

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
                <h1>Submit New Painting</h1>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container justifyContent={"center"}>
                        <Card sx={{ maxheight: 800 }} >
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
                            <Card>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="song name"
                                    name="song name"
                                    type="text"
                                    inputProps={{ maxLength: 100 }}
                                    label={`Song Name (${100 - genre.length} chars left)`}
                                    value={song}
                                    onChange={(e) => setGenre(e.target.value)}
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
                        </Card>
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
            </Container>
        </div>
    );
}

export default NewSetForm;
