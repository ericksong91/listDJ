import { useState } from "react";
import SetlistCard from "./cards/SetlistCard";
import Search from "./top/Search";

function Homepage({ setlists }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const filteredSetList = setlists.filter((set) => {
        
        const lowercase = set.name.toLowerCase();
        return lowercase.includes(search.toLowerCase());
    });

    const setlistList = filteredSetList.map((set) => <SetlistCard key={set.id} set={set} />);

    return (
        <div className="Home">
            <Search onSearch={setSearch} onFilter={setFilter} filter={filter} search={search} />
            {setlistList}
        </div>
    );
};

export default Homepage;