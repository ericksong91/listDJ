import { useState } from "react";
import SetlistCard from "./cards/SetlistCard";
import Search from "./top/Search";
import { Box, Grid, Container, Typography } from "@mui/material";

function Homepage({ setlists, users }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Set Name");
    const filteredSetUsers = [];

    if (!setlists || !users) {
        return <div>Loading...</div>
    };

    const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()));

    const filteredSetList = setlists.filter((set) => {
        if (filter === "Set Name") {
            return set.name.toLowerCase().includes(search.toLowerCase());
        } else if (filter === "Genre Name") {
            return set.genre.toLowerCase().includes(search.toLowerCase());
        } else {
            if (search === "") {
                return set
            } else {
                filteredUsers.find((user) => {
                    if (parseInt(set.user_id) === user.id) {
                        return filteredSetUsers.push(set)
                    } else {
                        return null
                    };
                });
            };
        };
        return null
    });

    let setlistList = [];

    if (filter === "DJ Name") {
        if (search === "") {
            setlistList = setlists.map((set) => <SetlistCard key={set.id}
                set={set}
                user={users.find((user) => user.id === parseInt(set.user_id))} />);
        } else {
            setlistList = filteredSetUsers.map((set) => <SetlistCard key={set.id}
                set={set}
                user={users.find((user) => user.id === parseInt(set.user_id))} />)
        };
    } else {
        setlistList = filteredSetList.map((set) => <SetlistCard key={set.id}
            set={set}
            user={users.find((user) => user.id === parseInt(set.user_id))} />);
    };

    return (
        <Box className="Home" sx={{ padding: 3 }}>
            <Search onSearch={setSearch} onFilter={setFilter} filter={filter} search={search} />
            <Container>
                <Typography variant="h3" sx={{ color: 'orange', padding: 2 }}>Latest Mixes</Typography>
                <Grid container spacing={5}>
                    {setlistList}
                </Grid>
            </Container>
        </Box>
    );
};

export default Homepage;