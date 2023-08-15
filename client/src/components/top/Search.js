// import { UserContext } from '../context/user';
// import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { TextField, Select, MenuItem } from "@mui/material";

function Search({ search, filter, onFilter, onSearch }) {
    const list = [
        "Set Name",
        "DJ Name",
        "Genre Name"
    ];

    const selectionList = list.map((li, ind) => <MenuItem key={ind} value={li}>{li}</MenuItem>);

    return (
        <div className='search'>
            <TextField onChange={(e) => onSearch(e.target.value)}>{search}</TextField>
            <Select value={filter} onChange={(e) => onFilter(e.target.value)}>{selectionList}</Select>
        </div>
    );
}

export default Search;
