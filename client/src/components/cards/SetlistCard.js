import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function SetlistCard({ set }) {



    return (
        <Card sx={{ maxWidth: 345, maxHeight: 100 }}>
            <CardHeader
                title={`${set.name}`}
                subheader={`${set.genre}`}
            />
            <CardContent>
                {`Average BPM: ${set.avg_bpm}`}
            </CardContent>
            <CardContent>
                <Link to={`/`}><Button variant="contained">More</Button></Link>
            </CardContent>
        </Card>
    );
}

export default SetlistCard;
