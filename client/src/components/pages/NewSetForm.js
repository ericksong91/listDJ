import { useState, useContext } from 'react';
import SetFormCard from '../cards/SetFormCard';
import NewTrackCard from '../cards/NewTrackCard';
import TrackCard from '../cards/TrackCard';
import { UserContext } from '../context/user';
import {
    Button, Container, Box, Grid, MenuItem
} from '@mui/material';
import { Typography } from '@mui/material';

function NewSetForm({ user, onNewSetlist }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [newSetlist, setNewSetlist] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const { genresList, camelotKeys } = useContext(UserContext);

    if (!user || !genresList || !camelotKeys) {
        return <div>Loading...</div>
    };

    const camelotKeysSelect = camelotKeys.map((key, ind) => <MenuItem key={ind} value={key}>{key}</MenuItem>);
    const genresListSelect = genresList.map((gen, ind) => <MenuItem key={ind} value={gen}>{gen}</MenuItem>);

    function handleOrder(from, to) {
        if (to < 0 || to > newSetlist.length) {
            return
        } else {
            const arr = [...newSetlist];
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            setNewSetlist([...arr]);
        };
    };

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        
        const newSet = {
            user_id: user.id,
            name: name,
            description: description,
            genre: genre,
            length: 0,
            avg_bpm: 0
        };

        onNewSetlist(newSetlist, newSet, setErrors);
    };

    function handleSetlist(track) {
        setNewSetlist([...newSetlist, track]);
    };

    const filteredSetlists = newSetlist.map((track, order) =>
        <TrackCard
            key={order}
            track={track}
            order={order + 1}
            editing={true}
            onOrder={handleOrder}
        />);

    return (
        <div className="NewSetForm">
            <Container className='NewPaintingForm' component="main">
                <Typography variant="h1" sx={{ color: "orange" }}>Submit New Setlist</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container justifyContent={"center"}>
                        <SetFormCard
                            // onSetDetails={handleSetDetails}
                            onName={setName}
                            onGenre={setGenre}
                            onDescription={setDescription}
                            name={name}
                            genre={genre}
                            description={description}
                        />
                        <NewTrackCard
                            camelotKeys={camelotKeysSelect}
                            genres={genresListSelect}
                            onSetlist={handleSetlist}
                        />
                    </Grid>
                </Box>
                <Typography variant="h3" sx={{ color: "orange" }}>{name}</Typography>
                <Typography variant="h5" sx={{ color: "grey" }}>{description}</Typography>
                <Grid container sx={{ paddingTop: 5 }}>
                    <Grid item xs={12}>
                        {filteredSetlists}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => handleSubmit(e)}
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                    </Grid>
                    {errors}
                </Grid>
            </Container>
        </div>
    );
}

export default NewSetForm;
