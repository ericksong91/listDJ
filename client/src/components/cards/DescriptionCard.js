
import { Link } from 'react-router-dom';
import { Card, CardHeader, Button, Box, Typography } from '@mui/material';

function DescriptionCard({ users, set }) {

    if (!users) {
        return <div></div>
    };

    const userFiltered = users.find((user) => user.id === parseInt(set.user_id));

    return (
        <Box className="description">
            <Card sx={{ marginLeft: 1, marginTop: 0.5, padding: 2, bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                <CardHeader
                    title={`${userFiltered.username}`}
                    subheader={set.date}
                    subheaderTypographyProps={{ color: 'white' }}
                />
                <Typography variant="h7">{set.description}</Typography>
                <ul>{set.avg_bpm}</ul>
                <ul>{set.genre}</ul>
                <Link to={`/profile/${set.user_id}`}><Button fullWidth sx={{ color: 'orange' }}>View DJ Profile</Button></Link>
            </Card>
        </Box>
    );
}

export default DescriptionCard;
