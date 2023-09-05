import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";
import NewTrackCard from "./NewTrackCard";
import { Container, Button, Box, Grid } from "@mui/material";

function TrackListCard({ user, owner, genres, checked, index, tracks, isEditing, onIsEditing,
    setlistTracks, onError, onEditSetlistTracks, onDeleteSetlists }) {
    const [trackList, setTrackList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTrackList([...tracks])
    }, [tracks])

    if (!tracks || !setlistTracks) {
        return <Box></Box>
    };

    function handleOrder(from, to) {
        if (to < 0 || to > trackList.length) {
            return
        } else {
            const arr = [...trackList];
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            setTrackList([...arr]);
        };
    };

    function handleSetlists(newTrack) {
        setTrackList([...trackList, newTrack]);
    };

    function handleDelete(pos) {
        const arr = [...trackList];
        arr.splice(pos - 1, 1);
        setTrackList([...arr]);
    };

    const tracksList = trackList.map((track, ind) =>
        <TrackCard
            key={ind}
            track={track}
            order={ind + 1}
            checked={checked}
            onOrder={handleOrder}
            isEditing={isEditing}
            onDelete={handleDelete}
        />);

    return (
        <div className="SetlistTracks">
            <Container>
                {tracksList}
                {user.id === owner
                    ?
                    isEditing ?
                        <Box>
                            <Button sx={{ width: 1 / 3 }} variant="contained" onClick={() => {
                                onIsEditing(!isEditing);
                                setTrackList([...tracks]);
                            }}>
                                Cancel
                            </Button>
                            {isLoading ?
                                <Button
                                    variant="contained"
                                    sx={{ width: 1 / 3 }}
                                >Loading...</Button>
                                :
                                <Button sx={{ width: 1 / 3 }} variant="contained"
                                    onClick={() => onEditSetlistTracks(trackList, index, onIsEditing, setIsLoading, onError)}>
                                    Save Changes
                                </Button>
                            }
                            {isLoading ?
                                <Button
                                    variant="contained"
                                    sx={{ width: 1 / 3 }}
                                >Loading...</Button>
                                :
                                <Button sx={{ width: 1 / 3 }} variant="contained"
                                    onClick={() => {
                                        setIsLoading(true);
                                        if (window.confirm("Are you sure you want to delete your set?")) {
                                            onDeleteSetlists(index, onError, setIsLoading);
                                        } else {
                                            setIsLoading(false);
                                        };
                                    }}>
                                    Delete
                                </Button>
                            }
                        </Box>
                        :
                        <Box>
                            <Button fullWidth variant="contained" onClick={() => onIsEditing(!isEditing)}>Edit</Button>
                        </Box>
                    :
                    null
                }
            </Container>
            {
                isEditing ?
                    <Grid item sx={{ width: "1/2" }}>
                        <NewTrackCard genres={genres} onSetlist={handleSetlists} />
                    </Grid>
                    :
                    <Box></Box>
            }
        </div >
    );
}

export default TrackListCard;