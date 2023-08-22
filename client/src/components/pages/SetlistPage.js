import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import { Button, Typography } from "@mui/material";

function SetlistPage({ setlists }) {
    const index = parseInt(useParams().id);
    const setFiltered = setlists.find(set => set.id === index);
    const [error, setError] = useState([]);

    if (!setlists || !setFiltered) {
        return <div></div>
    };

    const tracks = setFiltered.tracks
    const setlistTracks = setFiltered.setlist_track_org

    function handleSave (newList, onEdit) {
       console.log("Saving...")

        fetch(`/setlist/${index}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newList)
        })
        .then((r)=> {
            onEdit(false);
            if(r.ok) {
                r.json().then((data) => console.log(data))
            } else {
                r.json().then((error) => setError(error.errors))
            }
        })
    };

    return (
        <div className="SetlistPage">
            <Typography variant="h4" sx={{color: 'white', alignContent: "center"}}>
                Setlist Page
            </Typography>
            <TrackListCard tracks={tracks} setlistTracks={setlistTracks} onSave={handleSave} />
            {error}
        </div>
    );
}

export default SetlistPage;