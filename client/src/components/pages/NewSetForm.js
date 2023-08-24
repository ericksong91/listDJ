import { useState, useContext } from 'react';
import SetFormCard from '../cards/SetFormCard';
import { UserContext } from '../context/user';
import {
    Button, Container, Box, Grid, MenuItem
} from '@mui/material';
import NewTrackCard from '../cards/NewTrackCard';

function NewSetForm({ user, onNewSetlist }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const { genresList, camelotKeys } = useContext(UserContext);

    if (!user || !genresList || !camelotKeys) {
        return <div>Loading...</div>
    };

    const camelotKeysSelect = camelotKeys.map((key, ind) => <MenuItem key={ind} value={key}>{key}</MenuItem>);
    const genresListSelect = genresList.map((gen, ind) => <MenuItem key={ind} value={gen}>{gen}</MenuItem>);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        // const newSetlist = {
        //     name: name,
        //     description: description,
        //     genre: genre,
        //     avg_bpm: 0,
        //     length: 0,
        //     user_id: user.id
        // };

        // onNewSetlist(newSetlist, setErrors)
    };

    return (
        <div className="NewSetForm">
            <Container className='NewPaintingForm' component="main">
                <h1>Submit New Painting</h1>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container justifyContent={"center"}>
                        <SetFormCard onSubmit={handleSubmit} />
                        <NewTrackCard camelotKeys={camelotKeysSelect} genres={genresListSelect} />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                        {errors}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default NewSetForm;
