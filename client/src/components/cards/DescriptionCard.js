
import { Link } from 'react-router-dom';
import {
    Card, CardHeader, Button, Grid
} from '@mui/material';

function DescriptionCard({ users, set }) {

    if (!users) {
        return <div></div>
    };

    const userFiltered = users.find((user) => user.id === parseInt(set.user_id));

    return (
        <div className="description">
            <Card>
                <CardHeader
                    title={`By ${userFiltered.username}`}
                />
                <Link to={`/profile/${set.user_id}`}><Button>View DJ Profile</Button></Link>
                <ul>{set.description}</ul>
                <ul>{set.avg_bpm}</ul>
                <ul>{set.genre}</ul>
            </Card>
        </div>
    );
}

export default DescriptionCard;
