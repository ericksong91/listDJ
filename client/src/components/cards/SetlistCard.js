import { Link } from 'react-router-dom';
import {
    Button,
    Grid,
    Box,
    Paper,
    Typography
} from '@mui/material';

function SetlistCard({ set, user }) {
    if(!user) {
        return <div>Loading...</div>
    };

    return (
        <Grid item xs={12}>
            <Paper elevation={3} className="paper">
                <Box xs={1}>
                    <Typography>
                        {set.name}
                        {set.genre}
                    </Typography>
                    <ul>{`By: ${user.username}`}</ul>
                    <ul>{`Average BPM: ${set.avg_bpm}`}</ul>
                    <ul>{`Est. Length: ${set.length} mins`}</ul>
                    <Link to={`/sets/${set.id}`}><Button variant="contained">More</Button></Link>
                </Box>
            </Paper>
        </Grid>
    );
}

export default SetlistCard;
