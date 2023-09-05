import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import DescriptionCard from "../cards/DescriptionCard";
import { Grid, Box } from "@mui/material";

function SetlistPage({ user, users, setlists, genres, onEditSetlists, onEditSetlistTracks, onDeleteSetlists }) {
    const index = parseInt(useParams().id);
    const [error, setError] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const setFiltered = setlists.find((set) => set.id === index);
    const sortedTracks = [];

    if (setlists.length === 0 || !setFiltered || !user || !users) {
        return <div></div>
    };

    setFiltered.setlist_track_org.forEach((st) => {
        setFiltered.tracks.forEach((t) => {
            if (st.track_id === t.id) {
                sortedTracks.push(t);
            };
        });
    });

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
                        tracks={sortedTracks}
                        genres={genres}
                        setlistTracks={setFiltered.setlist_track_org}
                        isEditing={isEditing}
                        onIsEditing={setIsEditing}
                        onError={setError}
                        onEditSetlistTracks={onEditSetlistTracks}
                        onDeleteSetlists={onDeleteSetlists}
                    />
                </Grid>
            </Grid>
            {error}
        </Box >
    );
}

export default SetlistPage;