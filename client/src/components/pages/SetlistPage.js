import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import TrackCard from "../cards/TrackCard";
// import { useContext } from "react";
// import { UserContext } from "../context/user";

function SetlistPage( { setlists } ) {
    const index = parseInt(useParams().id);

    if (!setlists) {
        return <div></div>
    };

    const setFiltered = setlists.find(set => set.id === index);
    const tracks = setFiltered.tracks
    const setlistTracks = setFiltered.setlist_track_org
    const filteredList = [];

    // When updating by adding or removing songs, I should ONLY be updating the local cache of the set before "Save" 
    // is hit by the user. To first organize the list, I should grab the array that represents the track order (setlist_tracks)
    // After getting setlist_tracks with track order, I compare that to the array with all the tracks currently used.
    // How to deal with tracks that are the same ID?

    setlistTracks.forEach((slTrack) => {
        filteredList.push(tracks.find((track) => track.id === slTrack.track_id))
    });

    const tracksList = filteredList.map((track, ind) => <TrackCard key={ind} track={track} />);

    // const testSort = setlistTracks.sort((a, b) => setlistTracks.indexOf(a.track_order) - setlistTracks.indexOf(b.track_order))

    // console.log(testSort)

    return (
        <div className="SetlistPage">
            <h1>Setlist Page</h1>
            {tracksList}
        </div>
    );
}

export default SetlistPage;