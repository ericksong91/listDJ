import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import DescriptionCard from "../cards/DescriptionCard";
import { Grid, Typography } from "@mui/material";
import BiographyCard from "../cards/BiographyCard";

function SetlistPage({ user, setlists, onEdit }) {
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
            <Typography variant="h4" sx={{ color: 'white' }}>
                Setlist Page
            </Typography>
            <Grid container>
                <Grid item xs={4}>
                    <BiographyCard user={user} />
                </Grid>
                <Grid item xs={8}>
                    <TrackListCard tracks={tracks} setlistTracks={setlistTracks} onError={setError} onEdit={onEdit} />
                </Grid>
            </Grid>
            {error}
        </div>
    );
}

export default SetlistPage;