import TrackCard from "../cards/TrackCard";
import { Container, Paper } from "@mui/material";

function TrackListCard({ tracks, setlistTracks }) {

    if (!tracks || !setlistTracks) {
        return <div>Loading...</div>
    };

    const filteredList = [];

    setlistTracks.forEach((slTrack) => {
        filteredList.push(tracks.find((track) => track.id === slTrack.track_id))
    });

    console.log(filteredList)

    function handleOrder(from, to) {
        console.log(from, to);
        filteredList.splice(to, 0, filteredList.splice(from, 1)[0]);
        console.log(filteredList);
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