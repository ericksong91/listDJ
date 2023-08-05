import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user";

function SetlistPage() {
    const index = parseInt(useParams().id);
    const { user, tracks } = useContext(UserContext);

    console.log(index)

    console.log(user)

    console.log(tracks)

    return (
        <div className="SetlistPage">
            <h1>Headsfjoiaj</h1>
        </div>
    );
}

export default SetlistPage;