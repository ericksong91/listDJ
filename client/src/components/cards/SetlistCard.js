import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function SetlistCard() {

    return (
        <Card sx={{ maxWidth: 345, maxHeight: 100 }}>
            <CardHeader
                title={`Blank`}
                subheader={`Blank`}
            />
            <CardContent>
                {"Description Here"}
            </CardContent>
            <CardContent>
                <Link to={`/`}><Button variant="contained">More</Button></Link>
            </CardContent>
        </Card>
    );
}

export default SetlistCard;
