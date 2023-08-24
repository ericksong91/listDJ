import { useState, useContext } from 'react';
import SetFormCard from '../cards/SetFormCard';
import NewTrackCard from '../cards/NewTrackCard';
import { UserContext } from '../context/user';
import {
    Button, Container, Box, Grid, MenuItem
} from '@mui/material';
import { Typography } from '@mui/material';


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

    // Add tracks sequentially through Add Track button
    // When adding tracks, trigger function in NewSetForm to add it to Track array
    // Have Track array make a Setlist_Tracks array as well to keep track of position
    // Use these arrays to render out the DOM here, in the parent component
    // After adding all necessary tracks, use Submit button to gather information
    // Then send it to the App level where it will update the backend and force
    // an app refresh. Possibly, may want to have state functions called from 
    // NewSetForm for changing details OR just delete the card.

    return (
        <div className="NewSetForm">
            <Container className='NewPaintingForm' component="main">
                <Typography variant="h1" sx={{ color: "orange" }}>Submit New Setlist</Typography>
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
