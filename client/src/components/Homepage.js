import SetlistCard from "./cards/SetlistCard";

function Homepage({ setlists, user }) {
    if (!setlists) {
        return
    }

    const setlistCards = setlists.map((set) =>
        <SetlistCard key={set.id} set={set} />
    );

    return (
        <div className="Home">
            <h1>Hello {user.username}</h1>
            {setlistCards}
        </div>
    );
}

export default Homepage;