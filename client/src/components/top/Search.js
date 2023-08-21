import { TextField, Select, MenuItem } from "@mui/material";
import { Box, Grid } from "@mui/material";

function Search({ search, filter, onFilter, onSearch }) {
    const list = [
        "Set Name",
        "DJ Name",
        "Genre Name"
    ];

    const selectionList = list.map((li, ind) => <MenuItem key={ind} value={li}>{li}</MenuItem>);

    return (
        <Box>
            <Grid container sx={{marginTop: 5, marginBottom: 5}}>
                {/* <Grid item>
                    <SearchIcon sx={{ marginRight: '10px' }} />
                </Grid> */}
                <Grid item xs={10}>
                    <TextField
                        sx={{marginLeft: 5}}
                        fullWidth
                        onChange={(e) => onSearch(e.target.value)}
                        value={search}
                        type='search'
                    />
                </Grid>
                <Grid item>
                    <Select sx={{marginLeft: 5}} value={filter} onChange={(e) => onFilter(e.target.value)}>{selectionList}</Select>
                </Grid>

            </Grid>
        </Box>


    );
}

export default Search;
