import { useState, useEffect } from "react";
import TrackCard from "../cards/TrackCard";
import { Container, Paper } from "@mui/material";

function TrackListCard({ tracks, setlistTracks }) {
    const [filteredList, setFilteredList] = useState([]);

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

    console.log(filteredList.length)

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
            onOrder={handleOrder} />);

    return (
        <div className="SetlistTracks">
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