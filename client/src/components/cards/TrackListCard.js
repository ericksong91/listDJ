import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";
import { Container, Button, Box } from "@mui/material";

function TrackListCard({ user, owner, index, tracks, isEditing, onIsEditing,
    setlistTracks, onError, onEditSetlistTracks, onDeleteSetlists, onDelete }) {
    const [trackList, setTrackList] = useState([]);
    // const [filteredSetlistTrackList, setFilteredSetlistTrackList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     if (!tracks || !setlistTracks) {
    //         return <div>Loading...</div>
    //     } else {
    //         const arr = [];
    //         setlistTracks.forEach((slTrack) => {
    //             arr.push(tracks.find((track) => track.id === slTrack.track_id));
    //         });
    //         setFilteredTrackList([...arr]);
    //         setFilteredSetlistTrackList([...setlistTracks]);
    //     };
    // }, [tracks, setlistTracks]);

    useEffect(() => {
        setTrackList([...tracks])
    }, [tracks])

    if (!tracks || !setlistTracks) {
        return <Box></Box>
    };



    // function handleOrder(from, to) {
    //     if (to < 0 || to > filteredTrackList.length) {
    //         return
    //     } else {
    //         const arr = [...filteredTrackList];
    //         arr.splice(to, 0, arr.splice(from, 1)[0]);
    //         setFilteredTrackList([...arr]);

    //         const arr2 = [];
    //         let h = 1;

    //         while (h <= arr.length) {
    //             arr2.push({
    //                 id: filteredSetlistTrackList[h - 1].id,
    //                 setlist_id: setlistTracks[0].setlist_id,
    //                 track_id: arr[h - 1].id,
    //                 track_order: h
    //             });
    //             h++
    //         };
    //         setFilteredSetlistTrackList([...arr2]);
    //     };
    // };

    // function handleDelete(pos) {
    //     const arr = [...filteredTrackList];
    //     arr.splice(pos - 1, 1);
    //     setFilteredTrackList([...arr]);

    //     const arr2 = [];
    //     let h = 1;

    //     while (h <= arr.length) {
    //         arr2.push({
    //             id: filteredSetlistTrackList[h - 1].id,
    //             setlist_id: setlistTracks[0].setlist_id,
    //             track_id: arr[h - 1].id,
    //             track_order: h
    //         });
    //         h++
    //     };
    //     setFilteredSetlistTrackList([...arr2]);
    // };

    const tracksList = trackList.map((track, ind) =>
        <TrackCard
            key={ind}
            track={track}
            order={ind + 1}
            onOrder={handleOrder}
            isEditing={isEditing}
            onDelete={onDelete}
        />);

    return (
        <div className="SetlistTracks">
            <Container>
                {tracksList}
                {user.id === owner.user_id
                    ?
                    isEditing ?
                        <Box>
                            <Button sx={{ width: 1 / 3 }} variant="contained" onClick={() => {
                                onIsEditing(!isEditing);
                                const arr = [];
                                setlistTracks.forEach((slTrack) => {
                                    arr.push(tracks.find((track) => track.id === slTrack.track_id));
                                });
                                setTrackList([...arr]);
                            }}>
                                Cancel
                            </Button>
                            {isLoading ?
                                <Button
                                    variant="contained"
                                    sx={{ width: 1 / 3 }}
                                >Loading...</Button>
                                :
                                <Button sx={{ width: 1 / 3 }} variant="contained"
                                    onClick={() => onEditSetlistTracks(filteredSetlistTrackList, trackList, index, onIsEditing, setIsLoading, onError)}>
                                    Save Changes
                                </Button>
                            }
                            {isLoading ?
                                <Button
                                    variant="contained"
                                    sx={{ width: 1 / 3 }}
                                >Loading...</Button>
                                :
                                <Button sx={{ width: 1 / 3 }} variant="contained"
                                    onClick={() => {
                                        setIsLoading(true);
                                        if (window.confirm("Are you sure you want to delete your set?")) {
                                            onDeleteSetlists(index, onError, setIsLoading);
                                        } else {
                                            setIsLoading(false);
                                        };
                                    }}>
                                    Delete
                                </Button>
                            }
                        </Box>
                        :
                        <Box>
                            <Button fullWidth variant="contained" onClick={() => onIsEditing(!isEditing)}>Edit</Button>
                        </Box>
                    :
                    null
                }
            </Container>
        </div>
    );
}

export default TrackListCard;