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
    const [newSet, setNewSet] = useState({});
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
        if (to < 0 || to > newSetlist.length) {
            return
        } else {
            const arr = [...newSetlist];
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            setNewSetlist([...arr]);

            // const arr2 = [];
            // let h = 1;

            // while (h <= arr.length) {
            //     arr2.push({
            //         id: filteredSetlistTrackList[h - 1].id,
            //         setlist_id: setlistTracks[0].setlist_id,
            //         track_id: arr[h - 1].id,
            //         track_order: h
            //     });
            //     h++
            // };
            // setFilteredSetlistTrackList([...arr2]);
        };
    };

    function handleSetDetails(e, name, description, genre) {
        e.preventDefault();
        setNewSet({
            user_id: user.id,
            name: name,
            description: description,
            genre: genre,
            length: Math.ceil(totalLength / 60),
            avg_bpm: 0
        });

    
    };

    console.log(newSet)
    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        onNewSetlist(newSetlist, newSet, setErrors);
    };

    function handleSetlist(track) {
        setTotalLength(totalLength + parseInt(track.length));
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
                        <SetFormCard onSetDetails={handleSetDetails} />
                        <NewTrackCard camelotKeys={camelotKeysSelect} genres={genresListSelect} onSetlist={handleSetlist} />
                    </Grid>
                </Box>
                <Typography variant="h3" sx={{ color: "orange" }}>{newSet.name}</Typography>
                <Typography variant="h5" sx={{ color: "grey" }}>{newSet.description}</Typography>
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
