import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import DescriptionCard from "../cards/DescriptionCard";
import { Grid, Box } from "@mui/material";

function SetlistPage({ user, users, setlists, onEditSetlists, onEditSetlistTracks, onDeleteSetlists }) {
    const index = parseInt(useParams().id);
    const [error, setError] = useState([]);
    const setFiltered = setlists.find((set) => set.id === index);

    if (setlists.length === 0 || !setFiltered || !user || !users) {
        return <div></div>
    };

    return (
        <Box className="SetlistPage">
            <Grid container>
                <Grid item xs={2}>
                    <DescriptionCard user={user} users={users} set={setFiltered} onEditSetlists={onEditSetlists} />
                </Grid>
                <Grid item xs={10}>
                    <TrackListCard
                        user={user}
                        owner={setFiltered.user_id}
                        index={index}
                        tracks={setFiltered.tracks}
                        setlistTracks={setFiltered.setlist_track_org}
                        onError={setError}
                        onEditSetlistTracks={onEditSetlistTracks}
                        onDeleteSetlists={onDeleteSetlists}
                    />
                </Grid>
            </Grid>
            {error}
        </Box>
    );
}

export default SetlistPage;