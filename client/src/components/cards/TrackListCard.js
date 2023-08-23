import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";
import { Container, Paper, Button } from "@mui/material";

function TrackList({ tracks, setlistTracks, onError, onEdit }) {
    const [filteredTrackList, setFilteredTrackList] = useState([]);
    const [filteredSetlistTrackList, setFilteredSetlistTrackList] = useState([]);
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
            {editing ?
                <div>
                    <Button variant="contained" onClick={() => {
                        setEditing(!editing);
                        const arr = [];
                        setlistTracks.forEach((slTrack) => {
                            arr.push(tracks.find((track) => track.id === slTrack.track_id));
                        });
                        setFilteredTrackList([...arr]);
                    }}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => onEdit(filteredSetlistTrackList, setEditing, onError)}>Save Changes</Button>
                </div>
                :
                <div>
                    <Button variant="contained" onClick={() => setEditing(!editing)}>Edit</Button>
                </div>
            }
            <Container sx={{ padding: 5 }}>
                <Paper sx={{
                    alignContent: "center",
                    bgcolor: 'rgb(80, 75, 71)'
                }}>
                    {tracksList}
                </Paper>
            </Container>
        </div>
    );
}

export default TrackList;