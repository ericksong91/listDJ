import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function SetlistCard({ set, user }) {
    return (
        <Card sx={{ maxWidth: 700, maxHeight: 300 }}>
            <CardHeader
                title={`${set.name}`}
                subheader={`${set.genre}`}
            />
            <CardContent>
                <ul>{`By: ${user.username}`}</ul>
                <ul>{`Average BPM: ${set.avg_bpm}`}</ul>
                <ul>{`Est. Length: ${set.length} mins`}</ul>
            </CardContent>
            <CardContent>
                <Link to={`/sets/${set.id}`}><Button variant="contained">More</Button></Link>
            </CardContent>
        </Card>
    );
}

export default SetlistCard;
