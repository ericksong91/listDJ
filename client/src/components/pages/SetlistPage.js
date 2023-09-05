import { useState } from "react";
import { useParams } from "react-router-dom";
import TrackListCard from "../cards/TrackListCard";
import DescriptionCard from "../cards/DescriptionCard";
import NewTrackCard from "../cards/NewTrackCard";
import { Grid, Box } from "@mui/material";

function SetlistPage({ user, users, setlists, genres, onEditSetlists, onEditSetlistTracks, onDeleteSetlists }) {
    const index = parseInt(useParams().id);
    const [error, setError] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [setFiltered, setSetFiltered] = useState(setlists ? setlists.find((set) => set.id === index) : {});
    // const setFiltered = setlists.find((set) => set.id === index);

    if (setlists.length === 0 || !setFiltered || !user || !users) {
        return <div></div>
    };

    function handleSetlists(newTrack) {
        console.log("yay", newTrack, setFiltered);

        const newSetListOrder = {
            setlist_id: setFiltered.id,
            track_id: newTrack.id,
            track_order: setFiltered.setlist_track_org.length
        }

        const filteredSetWithTracks = {
            ...setFiltered,
            tracks: [...setFiltered.tracks, newTrack],
            setlist_track_org: [...setFiltered.setlist_track_org, newSetListOrder]
        };

        console.log(filteredSetWithTracks)

        setSetFiltered({...filteredSetWithTracks});
    };

    function handleDelete(pos) {
        const arr = [...setFiltered.tracks];
        arr.splice(pos - 1, 1);
        
        const arr2 = [];
        let h = 1;

        while (h <= arr.length) {
            arr2.push({
                id: setFiltered.setlist_track_org[h - 1].id ? setFiltered.setlist_track_org[h - 1].id : null,
                setlist_id: setFiltered.id,
                track_id: arr[h - 1].id,
                track_order: h
            });
            h++
        };

        const filteredSetWithTracks = {
            ...setFiltered,
            tracks: [...arr],
            setlist_track_org: [...arr2]
        };

        console.log(filteredSetWithTracks);
        setSetFiltered({...filteredSetWithTracks});
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
                        owner={setFiltered}
                        index={index}
                        tracks={setFiltered.tracks}
                        setlistTracks={setFiltered.setlist_track_org}
                        isEditing={isEditing}
                        onIsEditing={setIsEditing}
                        onError={setError}
                        onEditSetlistTracks={onEditSetlistTracks}
                        onDeleteSetlists={onDeleteSetlists}
                        onDelete={handleDelete}
                    />
                </Grid>
            </Grid>
            {isEditing ?
                <Grid item sx={{ width: "1/2" }}>
                    <NewTrackCard genres={genres} onSetlist={handleSetlists} />
                </Grid>
                :
                <Box></Box>}
            {error}
        </Box >
    );
}

export default SetlistPage;