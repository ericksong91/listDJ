import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import DescriptionCard from "../cards/DescriptionCard";
import { Grid, Typography } from "@mui/material";
import BiographyCard from "../cards/BiographyCard";

function SetlistPage({ user, setlists, onEditSetlists }) {
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
                <Grid item xs={4}>
                    <DescriptionCard user={user} set={setFiltered} />
                </Grid>
                <Grid item xs={8}>
                    <TrackListCard
                        tracks={setFiltered.tracks}
                        setlistTracks={setFiltered.setlist_track_org}
                        onError={setError}
                        onEditSetlists={onEditSetlists}
                    />
                </Grid>
            </Grid>
            {error}
        </div>
    );
}

export default SetlistPage;