import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user";

function SetlistPage() {
    const index = parseInt(useParams().id);
    const { user, tracks } = useContext(UserContext);

    return (
        <div className="SetlistPage">
            <h1>Setlist Page</h1>
        </div>
    );
}

export default SetlistPage;