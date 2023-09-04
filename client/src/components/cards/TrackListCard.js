import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box } from "@mui/material";

function TrackListCard({ user, owner, index, tracks, setlistTracks, onError, onEditSetlistTracks, onDeleteSetlists }) {
    const [filteredTrackList, setFilteredTrackList] = useState([]);
    const [filteredSetlistTrackList, setFilteredSetlistTrackList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!tracks || !setlistTracks) {
            return <div>Loading...</div>
        } else {
            const arr = [];
            setlistTracks.forEach((slTrack) => {
                arr.push(tracks.find((track) => track.id === slTrack.track_id));
            });
            setFilteredTrackList([...arr]);
            setFilteredSetlistTrackList([...setlistTracks]);
        };
    }, [tracks, setlistTracks]);

    function handleOrder(from, to) {
        if (to < 0 || to > filteredTrackList.length) {
            return
        } else {
            const arr = [...filteredTrackList];
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            setFilteredTrackList([...arr]);

            const arr2 = [];
            let h = 1;

            while (h <= arr.length) {
                arr2.push({
                    id: filteredSetlistTrackList[h - 1].id,
                    setlist_id: setlistTracks[0].setlist_id,
                    track_id: arr[h - 1].id,
                    track_order: h
                });
                h++
            };
            setFilteredSetlistTrackList([...arr2]);
        };
    };

    function handleDelete(pos) {
        const arr = [...filteredTrackList];
        arr.splice(pos - 1, 1);
        setFilteredTrackList([...arr]);

        const arr2 = [];
        let h = 1;

        while (h <= arr.length) {
            arr2.push({
                id: filteredSetlistTrackList[h - 1].id,
                setlist_id: setlistTracks[0].setlist_id,
                track_id: arr[h - 1].id,
                track_order: h
            });
            h++
        };
        setFilteredSetlistTrackList([...arr2]);
    };

    const tracksList = filteredTrackList.map((track, ind) =>
        <TrackCard
            key={ind}
            track={track}
            order={ind + 1}
            onOrder={handleOrder}
            isEditing={isEditing}
            onDelete={handleDelete}
        />);


    console.log(owner)
    console.log(user)

    return (
        <div className="SetlistTracks">
            <Container>
                {tracksList}
                {user.id === owner.user_id
                    ?
                    isEditing ?
                        <Box>
                            <Button sx={{ width: 1 / 3 }} variant="contained" onClick={() => {
                                setIsEditing(!isEditing);
                                const arr = [];
                                setlistTracks.forEach((slTrack) => {
                                    arr.push(tracks.find((track) => track.id === slTrack.track_id));
                                });
                                setFilteredTrackList([...arr]);
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
                                    onClick={() => onEditSetlistTracks(filteredSetlistTrackList, setIsEditing, setIsLoading, onError)}>
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
                                            onDeleteSetlists(index, onError, setIsLoading, navigate);
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
                            <Button fullWidth variant="contained" onClick={() => setIsEditing(!isEditing)}>Edit</Button>
                        </Box>
                    :
                    null
                }
            </Container>
        </div>
    );
}

export default TrackListCard;