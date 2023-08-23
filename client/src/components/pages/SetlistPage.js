import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrackList from "./TrackList";
import { Typography } from "@mui/material";

function SetlistPage({ setlists, onEdit }) {
    const index = parseInt(useParams().id);
    const [error, setError] = useState([]);
    const setFiltered = setlists.find((set) => set.id === index);
    // const [tracks, setTracks] = useState([]);
    // const [setlistTracks, setSetlistTracks] = useState([]);

    // useEffect(() => {
    //     if (!setlists) {
    //         return <div></div>
    //     } else {
    //         setTracks(setlists.find(set => set.id === index).tracks);
    //         setSetlistTracks(setlists.find(set => set.id === index).setlist_track_org)
    //     };
    // }, [setlists, index]);

    //The issue right now is that the mother data from Setlists state in App is overriding all the changes done 
    //in the children component. You need to update the Setlists parent state with an array with 
    // All the previous setlists and the new additional setlist (filter, exclude anything that isn't index id)

    if (!setlists) {
        return <div></div>
    };

    const tracks = setFiltered.tracks
    const setlistTracks = setFiltered.setlist_track_org


    // function handleSave(newList, onEdit, onFilteredSetlistTrackList) {
    //     fetch(`/setlist_tracks`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newList)
    //     })
    //         .then((r) => {
    //             onEdit(false);
    //             if (r.ok) {
    //                 r.json().then((data) => {
    //                     console.log([...data])
    //                     setSetlistTracks([...data]);
    //                     onFilteredSetlistTrackList([...data]);
    //                 });
    //             } else {
    //                 r.json().then((error) => setError(error.errors));
    //             }
    //         });
    // };

    return (
        <div className="SetlistPage">
            <Typography variant="h4" sx={{ color: 'white', alignContent: "center" }}>
                Setlist Page
            </Typography>
            <TrackList index={index} tracks={tracks} setlistTracks={setlistTracks} onEdit={onEdit} />
            {error}
        </div>
    );
}

export default SetlistPage;