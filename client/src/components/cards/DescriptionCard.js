import {
    Card
} from '@mui/material';

function DescriptionCard({ users, set }) {

    if (!users) {
        return <div></div>
    };

    const userFiltered = users.find((user) => user.id === parseInt(set.user_id));

    return (
        <div className="description">
            <Card>
                <ul>{userFiltered.username}</ul>
                <ul>{set.description}</ul>
                <ul>{set.avg_bpm}</ul>
                <ul>{set.genre}</ul>
            </Card>
        </div>
    );
}

export default DescriptionCard;
