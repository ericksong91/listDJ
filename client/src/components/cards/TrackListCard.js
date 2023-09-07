import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";
import NewTrackCard from "./NewTrackCard";
import { Container, Button, Box, Grid } from "@mui/material";

function TrackListCard({ user, owner, genres, index, tracks, isEditing, onIsEditing,
    onError, onEditSetlistTracks, onDeleteSetlists }) {
    const [trackList, setTrackList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hideButtons, setHideButtons] = useState(false);
    const [editInfo, setEditInfo] = useState(false);

    useEffect(() => {
        setTrackList([...tracks])
    }, [tracks])

    if (!tracks) {
        const arr = [1, 2, 3, 4]
        const tracksList = arr.map((track, ind) =>
            <TrackCard
                key={ind}
                track={[]}
                order={ind + 1}
                onOrder={handleOrder}
                genres={[]}
                hideButtons={hideButtons}
                isEditing={isEditing}
                editInfo={editInfo}
                onDelete={handleDelete}
                onEditTrackDescription={handleEditTrackDescription}
                onHideButtons={setHideButtons}
                onEditInfo={setEditInfo}
            />);

        return tracksList
    };

    function handleOrder(from, to) {
        if (to < 0 || to > trackList.length) {
            return
        } else {
            const arr = [...trackList];
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            setTrackList([...arr]);
        };
    };

    function handleSetlists(newTrack) {
        setTrackList([...trackList, newTrack]);
    };

    function handleDelete(pos) {
        const arr = [...trackList];
        arr.splice(pos - 1, 1);
        setTrackList([...arr]);
    };

    function handleEditTrackDescription(editedInfo, order, onHideSaveButton) {
        const editedTrackList = trackList.map((track, ind) => {
            if (ind === order - 1) {
                return editedInfo
            } else {
                return track
            };
        });

        setEditInfo(false);
        setHideButtons(false);
        onHideSaveButton(true);
        setTrackList([...editedTrackList]);
    };

    const tracksList = trackList.map((track, ind) =>
        <TrackCard
            key={`${ind} and ${track.name} and ${ind + 1}`}
            track={track}
            order={ind + 1}
            onOrder={handleOrder}
            genres={genres}
            hideButtons={hideButtons}
            isEditing={isEditing}
            editInfo={editInfo}
            onDelete={handleDelete}
            onEditTrackDescription={handleEditTrackDescription}
            onHideButtons={setHideButtons}
            onEditInfo={setEditInfo}
        />);

    return (
        <div className="SetlistTracks">
            <Container>
                {tracksList}
                {user.id === owner
                    ?
                    isEditing ?
                        <Box>
                            {editInfo ?
                             <Button sx={{ width: "49%", margin: 0.5, '&:hover': { bgcolor: 'rgb(50,50,50)' }, bgcolor: 'grey' }} variant="contained">
                                Cancel
                            </Button>
                                :
                                <Button sx={{ width: "49%", margin: 0.5, '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }} variant="contained" onClick={() => {
                                    onIsEditing(!isEditing);
                                    setHideButtons(false);
                                    setEditInfo(false);
                                    setTrackList([...tracks]);
                                }}>
                                    Cancel
                                </Button>}
                            {editInfo ?
                                <Button sx={{ width: "49%", margin: 0.5, '&:hover': { bgcolor: 'rgb(50,50,50)' }, bgcolor: 'grey' }} variant="contained">
                                    Save Changes
                                </Button>
                                :
                                isLoading ?
                                    <Button
                                        variant="contained"
                                        sx={{ width: "49%", margin: 0.5, '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }}
                                    >Loading...</Button>
                                    :
                                    <Button sx={{ width: "49%", margin: 0.5, '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }} variant="contained"
                                        onClick={() => onEditSetlistTracks(trackList, index, onIsEditing, setIsLoading, onError)}>
                                        Save Changes
                                    </Button>
                            }
                        </Box>
                        :
                        <Box>
                            <Button sx={{ '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }}
                                fullWidth variant="contained" onClick={() => onIsEditing(!isEditing)}>
                                Edit
                            </Button>
                            {isLoading ?
                                <Button
                                    variant="contained"
                                    color='error'
                                    fullWidth
                                    sx={{ marginTop: 5 }}
                                >Loading...</Button>
                                :
                                <Button color="error" variant="contained" fullWidth sx={{ marginTop: 3 }}
                                    onClick={() => {
                                        setIsLoading(true);
                                        if (window.confirm("Are you sure you want to delete your set?")) {
                                            onDeleteSetlists(index, onError, setIsLoading);
                                        } else {
                                            setIsLoading(false);
                                        };
                                    }}>
                                    Delete Set
                                </Button>
                            }
                        </Box>
                    :
                    null
                }
            </Container>
            {isEditing ?
                <Grid item sx={{ width: "1/2" }}>
                    <NewTrackCard genres={genres} onSetlist={handleSetlists} />
                </Grid>
                :
                <Box></Box>
            }
        </div >
    );
}

export default TrackListCard;