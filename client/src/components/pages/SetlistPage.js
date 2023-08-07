import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TrackCard from "../cards/TrackCard";
// import { useContext } from "react";
// import { UserContext } from "../context/user";

function SetlistPage( { setlists } ) {
    const index = parseInt(useParams().id);
    const navigate = useNavigate();

    console.log(setlists);

    if (!setlists) {

    }

    // const tracksList = tracks.map((track) => {
    //     return <TrackCard track={track} />
    // })

    return (
        <div className="SetlistPage">
            <h1>Setlist Page</h1>
            {/* {tracksList} */}
        </div>
    );
}

export default SetlistPage;