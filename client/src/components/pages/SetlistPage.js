import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import { Typography } from "@mui/material";

function SetlistPage({ setlists }) {
    const index = parseInt(useParams().id);
    const setFiltered = setlists.find(set => set.id === index);
    const [tracks, setTracks] = useState([]);
    const [setlistTracks, setSetlistTracks] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        if (!setlists) {
            return <div></div>
        } else {
            setTracks([...setFiltered.tracks]);
            setSetlistTracks([...setFiltered.setlist_track_org])
        }
    }, [setlists, setFiltered])

    function handleSave(newList, onEdit) {
        console.log("Saving...")

        fetch(`/setlist_tracks`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newList)
        })
            .then((r) => {
                onEdit(false);
                if (r.ok) {
                    r.json().then((data) => setSetlistTracks([...data]))
                } else {
                    r.json().then((error) => setError(error.errors))
                }
            });
    };

    return (
        <div className="SetlistPage">
            <Typography variant="h4" sx={{ color: 'white', alignContent: "center" }}>
                Setlist Page
            </Typography>
            <TrackListCard index={index} tracks={tracks} setlistTracks={setlistTracks} onSave={handleSave} />
            {error}
        </div>
    );
}

export default SetlistPage;