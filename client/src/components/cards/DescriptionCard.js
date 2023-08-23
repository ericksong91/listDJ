import {
    Grid,
    Card,
    Typography,
} from '@mui/material';

function DescriptionCard({ user }) {

    return (
        <div className="description">
            <Grid item>
            {user.username}
            </Grid>
        </div>

    );
}

export default DescriptionCard;
