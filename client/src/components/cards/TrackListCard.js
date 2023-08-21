import TrackCard from "../cards/TrackCard";

function TrackListCard({ tracks, setlistTracks }) {

    if (!tracks || !setlistTracks) {
        return <div>Help</div>
    };

    const filteredList = [];

    setlistTracks.forEach((slTrack) => {
        filteredList.push(tracks.find((track) => track.id === slTrack.track_id))
    });

    const tracksList = filteredList.map((track, ind) => <TrackCard key={ind} track={track} />);

    return (
        <div className="SetlistTracks">
            {tracksList}
        </div>
    );
}

export default TrackListCard;