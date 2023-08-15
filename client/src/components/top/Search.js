import { useState } from 'react';
// import { UserContext } from '../context/user';
// import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { TextField } from "@mui/material";
    
function Search() {
    const [search, setSearch] = useState("");

    function handleChange(e) {
        console.log(e.target.value);
        setSearch(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
    };

    return (
        <div className='search'>
            <TextField onChange={handleChange}>{search}</TextField>
        </div>
    );
}

export default Search;
