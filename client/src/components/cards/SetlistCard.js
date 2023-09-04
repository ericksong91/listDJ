import record from '../images/record.png'
import { useNavigate } from 'react-router-dom';
import { Grid, Card, Typography } from '@mui/material';

function SetlistCard({ set, user }) {
    const navigate = useNavigate()

    if (!user) {
        return <div>Loading...</div>
    };

    return (
        <Grid item xs={12} onClick={() => { navigate(`/sets/${set.id}`) }}>
            <Card className="setCard" sx={{
                '&:hover': {
                    boxShadow: 5,
                    backgroundColor: 'rgb(53,54,56)'
                },
                padding: 1,
                bgcolor: 'rgb(31, 30, 29)'
            }}>
                <Grid container sx={{ flexDirection: 'row' }}>
                    <Grid item xs={2} sx={{ paddingRight: 2 }}>
                        {user.avatar ? <img className="disc" alt={`${user.username}`} src={user.avatar} /> : <img className="disc" alt={`default`} src={record} />}
                    </Grid>
                    <Grid item xs={2} sx={{ paddingTop: 4, paddingRight: 5 }}>
                        <Typography variant="h4" sx={{ color: 'orange' }}>
                            {set.name}
                        </Typography>
                        <Typography variant="p" sx={{ color: "white" }}>
                            {set.date}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ paddingTop: 9 }}>
                        <Typography variant="h5" component="h5" sx={{ color: 'white' }}>
                            {set.genre}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ paddingTop: 9 }}>
                        <Typography variant="h5" sx={{ color: 'white' }}>
                            {`BPM: ${set.avg_bpm}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ paddingTop: 9 }}>
                        <Typography variant="h5" sx={{ color: 'white' }}>
                            {`${set.length} mins`}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ paddingTop: 9 }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            {`By: ${user.username}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Card >
        </Grid >
    );
}

export default SetlistCard;
