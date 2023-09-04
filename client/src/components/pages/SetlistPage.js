import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import DescriptionCard from "../cards/DescriptionCard";
import { Grid, Typography, Box } from "@mui/material";

function SetlistPage({ user, users, setlists, onEditSetlists, onDeleteSetlists }) {
    const index = parseInt(useParams().id);
    const [error, setError] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const setFiltered = setlists.find((set) => set.id === index);
    const [description, setDescription] = useState(setFiltered ? setFiltered.description : null);

    if (setlists.length === 0 || !setFiltered || !user || !users) {
        return <div></div>
    };

    return (
        <Box className="SetlistPage">
            <Box sx={{ padding: 1 }}>
                <Typography variant="h4" sx={{ color: 'white' }}>
                    {setFiltered.name}
                </Typography>
            </Box>
            <Grid container>
                <Grid item xs={2}>
                    <DescriptionCard users={users} set={setFiltered} description={description}
                        isEditing={isEditing} onSetDescription={setDescription}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TrackListCard
                        user={user}
                        owner={setFiltered.user_id}
                        index={index}
                        tracks={setFiltered.tracks}
                        description={description}
                        setlistTracks={setFiltered.setlist_track_org}
                        onError={setError}
                        isEditing={isEditing}
                        onIsEditing={setIsEditing}
                        onEditSetlists={onEditSetlists}
                        onDeleteSetlists={onDeleteSetlists}
                    />
                </Grid>
            </Grid>
            {error}
        </Box>
    );
}

export default SetlistPage;