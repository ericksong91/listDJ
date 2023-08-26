import {
    Grid,
    Card,
    Typography,
} from '@mui/material';

function DescriptionCard({ user, set }) {
    return (
        <div className="description">
            <Card>
                <ul>{user.username}</ul>
                <ul>{set.description}</ul>
                <ul>{set.avg_bpm}</ul>
                <ul>{set.genre}</ul>
            </Card>
        </div>
    );
}

export default DescriptionCard;
