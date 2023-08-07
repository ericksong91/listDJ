import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function TrackCard({ track }) {
    return (
        <Card sx={{ maxWidth: 700, maxHeight: 100 }}>
            <CardHeader
                title={`${track.name}`}
                subheader={`${track.genre}`}
            />
            <CardContent>
                <ul>{`Average BPM: ${track.bpm}`}</ul>
                <ul>{`Key: ${track.key}`}</ul>
            </CardContent>
            {/* <CardContent>
                <Link to={`/`}><Button variant="contained">More</Button></Link>
            </CardContent> */}
        </Card>
    );
}

export default TrackCard;