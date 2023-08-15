import SetlistCard from "./cards/SetlistCard";
import Search from "./top/Search";

function Homepage({ setlists }) {
    const setlistCards = setlists.map((set) =>
        <SetlistCard key={set.id} set={set} />
    );

    return (
        <div className="Home">
            <Search />
            {setlistCards}
        </div>
    );
}

export default Homepage;