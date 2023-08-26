import { TextField, Select, MenuItem } from "@mui/material";
import { Paper, Grid, Card } from "@mui/material";

function Search({ search, filter, onFilter, onSearch }) {
    const list = [
        "Set Name",
        "DJ Name",
        "Genre Name"
    ];

    const selectionList = list.map((li, ind) => <MenuItem key={ind} value={li}>{li}</MenuItem>);

    return (
        <Card sx={{ bgcolor: 'rgb(60, 60, 60)', margin: 2 }}>
            <Grid container sx={{ marginTop: 5, marginBottom: 5 }}>
                <Grid item xs={8} sx={{marginRight: 1}}>
                    <TextField
                        sx={{ marginLeft: 5, color: 'white', input: { color: 'white' }, label: {color: 'white'} }}
                        fullWidth
                        onChange={(e) => onSearch(e.target.value)}
                        value={search}
                        type='search'
                        id="standard-search"
                        label="Search field"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={3}>
                    <Select sx={{ marginLeft: 5, color: 'white' }} value={filter} onChange={(e) => onFilter(e.target.value)}>{selectionList}</Select>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Search;
