
import { Link } from 'react-router-dom';
import { Card, CardHeader, Button, Box } from '@mui/material';

function DescriptionCard({ users, set }) {

    if (!users) {
        return <div></div>
    };

    const userFiltered = users.find((user) => user.id === parseInt(set.user_id));

    return (
        <Box className="description">
            <Card sx={{ marginLeft: 1, bgcolor: 'rgb(50, 50, 50)', color: 'white', paddingBottom: 2 }}>
                <CardHeader
                    title={`${userFiltered.username}`}
                />
                <ul>{set.description}</ul>
                <ul>{set.avg_bpm}</ul>
                <ul>{set.genre}</ul>
                <Link to={`/profile/${set.user_id}`}><Button fullWidth sx={{ color: 'orange' }}>View DJ Profile</Button></Link>
            </Card>
        </Box>
    );
}

export default DescriptionCard;
