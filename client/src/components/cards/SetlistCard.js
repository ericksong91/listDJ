import record from '../images/record.png'
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Card,
    Typography,
} from '@mui/material';

function SetlistCard({ set, user }) {
    const navigate = useNavigate()
    if (!user) {
        return <div>Loading...</div>
    };

    return (
        <Grid item xs={12} onClick={() => { navigate(`/sets/${set.id}`) }}>
            <Card className="setCard" sx={{'&:hover': {
                boxShadow: 5,
                backgroundColor: 'rgb(53,54,56)'
            },
                padding: 1,
                bgcolor: 'rgb(31, 30, 29)'
            }}>
                <Grid container>
                    <Grid item xs={2} align="center">
                        <img className="disc" alt={`default`} src={record} />
                    </Grid>
                    <Grid item xs={2} align="center">
                        <Typography variant="h4" component="h4" sx={{color: 'white'}}>
                            {set.name}
                        </Typography>
                        <Typography variant="h5" component="h5" sx={{color: 'white'}}>
                            {set.genre}
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={6} xl={4} align="center">
                        <Typography variant="h5" sx={{color: 'white'}}>
                            <ul>{`By: ${user.username}`}</ul>
                            <ul>{`Average BPM: ${set.avg_bpm}`}</ul>
                            <ul>{`Est. Length: ${set.length} mins`}</ul>
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}

export default SetlistCard;
