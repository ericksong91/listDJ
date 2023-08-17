import record from '../images/record.png'
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Grid,
    Box,
    Card,
    Typography
} from '@mui/material';

function SetlistCard({ set, user }) {
    const navigate = useNavigate(`/sets/${set.id}`)
    if (!user) {
        return <div>Loading...</div>
    };

    return (
            <Grid item xs={12} onClick={()=>{navigate()}}>
                <Card elevation={3} className="paper">
                    <Grid container>
                        <Grid item xs={1}>
                            <img className="img" src={record} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h4" component="h4">
                                {set.name}
                            </Typography>
                            <Typography variant="h5" component="h5">
                                {set.genre}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <ul>{`By: ${user.username}`}</ul>
                            <ul>{`Average BPM: ${set.avg_bpm}`}</ul>
                            <ul>{`Est. Length: ${set.length} mins`}</ul>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
    );
}

export default SetlistCard;
