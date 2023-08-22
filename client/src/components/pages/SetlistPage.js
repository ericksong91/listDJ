import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import { Button, Typography } from "@mui/material";

function SetlistPage({ setlists }) {
    const index = parseInt(useParams().id);
    const setFiltered = setlists.find(set => set.id === index);
    const [edit, setEdit] = useState(false);

    if (!setlists || !setFiltered) {
        return <div></div>
    };

    const tracks = setFiltered.tracks
    const setlistTracks = setFiltered.setlist_track_org

    return (
        <div className="SetlistPage">
            <Button variant="contained" onChange={() => setEdit(!edit)}>Edit</Button>
            <Typography variant="h4" sx={{color: 'white', alignContent: "center"}}>
                Setlist Page
            </Typography>
            <TrackListCard tracks={tracks} setlistTracks={setlistTracks} onEdit={setEdit} />
        </div>
    );
}

export default SetlistPage;