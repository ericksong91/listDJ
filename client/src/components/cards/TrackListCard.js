import { useState, useEffect } from "react";
import TrackCard from "../cards/TrackCard";
import { Container, Paper, Button } from "@mui/material";

function TrackListCard({ index, tracks, setlistTracks, onSave }) {
    const [filteredTrackList, setfilteredTrackList] = useState([]);
    const [filteredSetlistTrackList, setFilteredSetlistTrackList] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!tracks || !setlistTracks) {
            return <div>Loading...</div>
        } else {
            const arr = [];
            setlistTracks.forEach((slTrack) => {
                arr.push(tracks.find((track) => track.id === slTrack.track_id));
            });
            setfilteredTrackList([...arr]);
            setFilteredSetlistTrackList([...setlistTracks]);
        };
    }, [tracks, setlistTracks]);

    function handleOrder(from, to) {
        if (to < 0 || to > filteredTrackList.length) {
            return
        } else {
            const arr = [...filteredTrackList];
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            setfilteredTrackList([...arr]);

            const arr2 = [];
            let h = 1;

            while (h <= arr.length) {
                arr2.push({
                    id: filteredSetlistTrackList[h - 1].id,
                    setlist_id: index,
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
            edit={edit}
        />);

    return (
        <div className="SetlistTracks">
            {edit ?
                <div>
                    <Button variant="contained" onClick={() => {
                        setEdit(!edit);
                        const arr = [];
                        setlistTracks.forEach((slTrack) => {
                            arr.push(tracks.find((track) => track.id === slTrack.track_id));
                        });
                        setfilteredTrackList([...arr]);
                    }}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => onSave(filteredSetlistTrackList, setEdit)}>Save Changes</Button>
                </div>
                :
                <div>
                    <Button variant="contained" onClick={() => setEdit(!edit)}>Edit</Button>
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

export default TrackListCard;