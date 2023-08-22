import { useState } from "react";
import { useParams } from "react-router-dom";
// import TrackCard from "../cards/TrackCard";
import TrackListCard from "../cards/TrackListCard";
import { Button, Typography } from "@mui/material";

function SetlistPage({ setlists }) {
    const index = parseInt(useParams().id);
    const setFiltered = setlists.find(set => set.id === index);
    const [edit, setEdit] = useState(false);

    if (!setlists || !setFiltered) {
        return <div></div>
    };

    const tracks = setFiltered.tracks
    const setlistTracks = setFiltered.setlist_track_org

    // setlistTracks.forEach((slTrack) => {
    //     filteredList.push(tracks.find((track) => track.id === slTrack.track_id))
    // });

    // const tracksList = filteredList.map((track, ind) => <TrackCard key={ind} track={track} />);

    // //Component for just holding the tracks
    // //Array of tracks, 

    // console.log(tracks, setlistTracks)

    return (
        <div className="SetlistPage">
            <Button variant="contained" onChange={() => setEdit(!edit)}>Edit</Button>
            <Typography variant="h4" sx={{color: 'white', alignContent: "center"}}>
                Setlist Page
            </Typography>
            <TrackListCard tracks={tracks} setlistTracks={setlistTracks} />
            {/* {tracksList} */}
        </div>
    );
}

export default SetlistPage;

    // When updating by adding or removing songs, I should ONLY be updating the local cache of the set before "Save" 
    // is hit by the user. To first organize the list, I should grab the array that represents the track order (setlist_tracks)
    // After getting setlist_tracks with track order, I compare that to the array with all the tracks currently used.
    // How to deal with tracks that are the same ID?

    // const testSort = setlistTracks.sort((a, b) => setlistTracks.indexOf(a.track_order) - setlistTracks.indexOf(b.track_order))

    // console.log(testSort)