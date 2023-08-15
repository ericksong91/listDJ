// import { UserContext } from '../context/user';
// import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { TextField, Select, MenuItem } from "@mui/material";

function Search({ search, onSearch }) {
    const list = [
        "DJ Name",
        "Mix Title",
        "Genre"
    ];

    // const selectionList = list.map((li) => <MenuItem value={li}>{li}</MenuItem>);

    return (
        <div className='search'>
            <TextField onChange={(e) => onSearch(e.target.value)}>{search}</TextField>
            {/* <Select onChange={}>{selectionList}</Select> */}
        </div>
    );
}

export default Search;
