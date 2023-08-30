import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";
import { useNavigate } from "react-router-dom";
// import NewTrackCard from "./NewTrackCard";
import { Container, Button, Box } from "@mui/material";

function TrackListCard({ user, owner, index, tracks, setlistTracks, onError, onEditSetlists, onDeleteSetlists }) {
    const [filteredTrackList, setFilteredTrackList] = useState([]);
    const [filteredSetlistTrackList, setFilteredSetlistTrackList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    // const { camelotKeys, genresList } = useContext(UserContext);

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

    function handleDelete(track, pos) {
        console.log(track, pos)
    };

    // function handleSetlist(track, order) {
    //     setFilteredTrackList([...filteredTrackList, track]);
    //     const arr = [...filteredTrackList, track]

    //     const arr2 = [];
    //     let h = 1;

    //     while (h <= arr.length) {
    //         console.log(!!filteredSetlistTrackList[h - 1].id)
    //         arr2.push({
    //             id: !!filteredSetlistTrackList[h - 1].id ? filteredSetlistTrackList[h - 1].id : null,
    //             setlist_id: setlistTracks[0].setlist_id,
    //             track_id: !!arr[h - 1].id ? arr[h - 1].id : null,
    //             track_order: h
    //         });
    //         h++
    //     };
    //     setFilteredSetlistTrackList([...arr2]);
    // };

    const tracksList = filteredTrackList.map((track, ind) =>
        <TrackCard
            key={ind}
            track={track}
            order={ind + 1}
            onOrder={handleOrder}
            editing={editing}
            onDelete={handleDelete}
        />);

    return (
        <div className="SetlistTracks">
            <Container>
                {tracksList}
                {user.id === owner
                    ?
                    editing ?
                        <Box>
                            <Button sx={{ width: 1 / 3 }} variant="contained" onClick={() => {
                                setEditing(!editing);
                                const arr = [];
                                setlistTracks.forEach((slTrack) => {
                                    arr.push(tracks.find((track) => track.id === slTrack.track_id));
                                });
                                setFilteredTrackList([...arr]);
                            }}>
                                Cancel
                            </Button>
                            <Button sx={{ width: 1 / 3 }} variant="contained"
                                onClick={() => onEditSetlists(filteredSetlistTrackList, setEditing, onError)}>
                                Save Changes
                            </Button>
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
                            <Button fullWidth variant="contained" onClick={() => setEditing(!editing)}>Edit</Button>
                        </Box>
                    :
                    <Box>

                    </Box>
                }
                {/* <Box sx={{ width: '200%' }}>
                    {
                        editing ?
                            <NewTrackCard
                                camelotKeys={camelotKeys}
                                genres={genresList}
                                onSetlist={handleSetlist}
                            />
                            :
                            <Box></Box>
                    }
                </Box> */}
            </Container>
        </div>
    );
}

export default TrackListCard;