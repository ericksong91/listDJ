import { useState, useEffect } from "react";
import TrackCard from "../cards/TrackCard";
import { Container, Paper, Button } from "@mui/material";

function TrackListCard({ tracks, setlistTracks, onSave }) {
    const [filteredList, setFilteredList] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!tracks || !setlistTracks) {
            return <div>Loading...</div>
        } else {
            const arr = [];
            setlistTracks.forEach((slTrack) => {
                arr.push(tracks.find((track) => track.id === slTrack.track_id));
            });
            setFilteredList(arr);
        };
    }, [tracks, setlistTracks]);

    function handleOrder(from, to) {

        if (to < 0 || to > filteredList.length) {
            return
        } else {
            console.log(from, to);
            const arr = filteredList;
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            setFilteredList([...arr]);
        };
    };

    const tracksList = filteredList.map((track, ind) =>
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
                    <Button variant="contained" onClick={() => setEdit(!edit)}>Cancel</Button>
                    <Button variant="contained" onClick={() => onSave(filteredList, setEdit)}>Save Changes</Button>
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