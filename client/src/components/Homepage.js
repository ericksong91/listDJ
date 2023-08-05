import SetlistCard from "./cards/SetlistCard";
import { Outlet } from "react-router-dom";

function Homepage({ setlists, user }) {
    const setlistCards = setlists.map((set) =>
        <SetlistCard key={set.id} set={set} />
    );

    return (
        <div className="Home">
            <h1>Hello {user.username}</h1>
            {setlistCards}
            <Outlet />
        </div>
    );
}

export default Homepage;