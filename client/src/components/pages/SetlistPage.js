import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import DescriptionCard from "../cards/DescriptionCard";
import { Grid, Typography } from "@mui/material";

function SetlistPage({ user, users, setlists, onEditSetlists, onDeleteSetlists }) {
    const index = parseInt(useParams().id);
    const [error, setError] = useState([]);
    const setFiltered = setlists.find((set) => set.id === index);

    if (!setlists || !setFiltered) {
        return <div></div>
    };

    return (
        <div className="SetlistPage">
            <Typography variant="h4" sx={{ color: 'white' }}>
                {setFiltered.name}
            </Typography>
            <Grid container>
                <Grid item xs={2}>
                    <DescriptionCard users={users} set={setFiltered} />
                </Grid>
                <Grid item xs={10}>
                    <TrackListCard
                        user={user}
                        owner={setFiltered.user_id}
                        index={index}
                        tracks={setFiltered.tracks}
                        setlistTracks={setFiltered.setlist_track_org}
                        onError={setError}
                        onEditSetlists={onEditSetlists}
                        onDeleteSetlists={onDeleteSetlists}
                    />
                </Grid>
            </Grid>
            {error}
        </div>
    );
}

export default SetlistPage;