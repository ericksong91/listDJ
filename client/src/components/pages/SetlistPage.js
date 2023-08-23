import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import { Typography } from "@mui/material";

function SetlistPage({ setlists, onEdit }) {
    const index = parseInt(useParams().id);
    const [error, setError] = useState([]);
    const setFiltered = setlists.find((set) => set.id === index);

    if (!setlists || !setFiltered) {
        return <div></div>
    };

    const tracks = setFiltered.tracks
    const setlistTracks = setFiltered.setlist_track_org

    return (
        <div className="SetlistPage">
            <Typography variant="h4" sx={{ color: 'white', alignContent: "center" }}>
                Setlist Page
            </Typography>
            <TrackListCard tracks={tracks} setlistTracks={setlistTracks} onError={setError} onEdit={onEdit} />
            {error}
        </div>
    );
}

export default SetlistPage;