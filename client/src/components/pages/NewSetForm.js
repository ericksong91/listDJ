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
    const [totalLength, setTotalLength] = useState(0);
    const [avgBPM, setAvgBPM] = useState(0);
    const { genresList, camelotKeys } = useContext(UserContext);

    if (!user || !genresList || !camelotKeys) {
        return <div>Loading...</div>
    };

    const camelotKeysSelect = camelotKeys.map((key, ind) => <MenuItem key={ind} value={key}>{key}</MenuItem>);
    const genresListSelect = genresList.map((gen, ind) => <MenuItem key={ind} value={gen}>{gen}</MenuItem>);

    function handleOrder(from, to) {
        console.log("Changed Order")
        // if (to < 0 || to > filteredTrackList.length) {
        //     return
        // } else {
        //     const arr = [...filteredTrackList];
        //     arr.splice(to, 0, arr.splice(from, 1)[0]);
        //     setFilteredTrackList([...arr]);

        //     const arr2 = [];
        //     let h = 1;

        //     while (h <= arr.length) {
        //         arr2.push({
        //             id: filteredSetlistTrackList[h - 1].id,
        //             setlist_id: setlistTracks[0].setlist_id,
        //             track_id: arr[h - 1].id,
        //             track_order: h
        //         });
        //         h++
        //     };
        //     setFilteredSetlistTrackList([...arr2]);
        // };
    };

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

    function handleSetlist(track, order) {
        console.log("Firing setlist")
        setNewSetlist([...newSetlist, <TrackCard key={order - 1} track={track} order={order} editing={true} onOrder={handleOrder} />])
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
                        <NewTrackCard camelotKeys={camelotKeysSelect} genres={genresListSelect} onSetlist={handleSetlist} />
                    </Grid>
                </Box>
                <Grid container sx={{paddingTop: 5}}>
                    <Grid item xs={12}>
                        {newSetlist}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
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
