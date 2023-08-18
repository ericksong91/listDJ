import { TextField, Select, MenuItem } from "@mui/material";
import { Box, Grid } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Search({ search, filter, onFilter, onSearch }) {
    const list = [
        "Set Name",
        "DJ Name",
        "Genre Name"
    ];

    const selectionList = list.map((li, ind) => <MenuItem key={ind} value={li}>{li}</MenuItem>);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon sx={{ marginRight: '10px' }} />
            <TextField
                onChange={(e) => onSearch(e.target.value)}
                sx={{ width: 600 }}
                value={search}
                type='search'
            />
                
            <Select value={filter} onChange={(e) => onFilter(e.target.value)}>{selectionList}</Select>
        </Box>


    );
}

export default Search;
