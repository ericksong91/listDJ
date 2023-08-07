import SetlistCard from "./cards/SetlistCard";

function Homepage({ setlists }) {
    const setlistCards = setlists.map((set) =>
        <SetlistCard key={set.id} set={set} />
    );

    return (
        <div className="Home">
            {setlistCards}
        </div>
    );
}

export default Homepage;