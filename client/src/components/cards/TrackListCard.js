import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";
import { Navigate } from "react-router-dom";
import { Container, Paper, Button, Box } from "@mui/material";

function TrackListCard({ user, owner, index, tracks, setlistTracks, onError, onEditSetlists, onDeleteSetlists }) {
    const [filteredTrackList, setFilteredTrackList] = useState([]);
    const [filteredSetlistTrackList, setFilteredSetlistTrackList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (!tracks || !setlistTracks) {
            return <div>Loading...</div>
        } else {
            const arr = [];
            setlistTracks.forEach((slTrack) => {
                arr.push(tracks.find((track) => track.id === slTrack.track_id));
            });
            setFilteredTrackList([...arr]);
            setFilteredSetlistTrackList([...setlistTracks]);
        };
    }, [tracks, setlistTracks]);

    function handleOrder(from, to) {
        if (to < 0 || to > filteredTrackList.length) {
            return
        } else {
            const arr = [...filteredTrackList];
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            setFilteredTrackList([...arr]);

            const arr2 = [];
            let h = 1;

            while (h <= arr.length) {
                arr2.push({
                    id: filteredSetlistTrackList[h - 1].id,
                    setlist_id: setlistTracks[0].setlist_id,
                    track_id: arr[h - 1].id,
                    track_order: h
                });
                h++
            };
            setFilteredSetlistTrackList([...arr2]);
        };
    };

    const tracksList = filteredTrackList.map((track, ind) =>
        <TrackCard
            key={ind}
            track={track}
            order={ind + 1}
            onOrder={handleOrder}
            editing={editing}
        />);

    return (
        <div className="SetlistTracks">
            <Container sx={{ padding: 5 }}>
                <Paper sx={{
                    alignContent: "center",
                    bgcolor: 'rgb(80, 75, 71)'
                }}>
                    {tracksList}
                </Paper>
                {parseInt(user.id) === parseInt(owner)
                    ?
                    editing ?
                        <Box>
                            <Button sx={{ width: 1 / 3 }} variant="contained" onClick={() => {
                                setEditing(!editing);
                                const arr = [];
                                setlistTracks.forEach((slTrack) => {
                                    arr.push(tracks.find((track) => track.id === slTrack.track_id));
                                });
                                setFilteredTrackList([...arr]);
                            }}>
                                Cancel
                            </Button>
                            <Button sx={{ width: 1 / 3 }} variant="contained"
                                onClick={() => onEditSetlists(filteredSetlistTrackList, setEditing, onError)}>
                                Save Changes
                            </Button>
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
                                            <Navigate replace to="/" />;
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
                            <Button fullWidth variant="contained" onClick={() => setEditing(!editing)}>Edit</Button>
                        </Box>
                    :
                    <Box></Box>
                }
            </Container>
        </div>
    );
}

export default TrackListCard;