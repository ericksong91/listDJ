import { Link } from 'react-router-dom';
import { Card, CardHeader, Button, Box, Typography } from '@mui/material';
import { TextField } from '@mui/material'

function DescriptionCard({ users, set, description, isEditing, onSetDescription }) {

    if (users.length === 0 || !users) {
        return <div></div>
    };

    console.log(users)

    const userFiltered = users.find((user) => user.id === parseInt(set.user_id));

    return (
        <Box className="description">
            <Card sx={{ marginLeft: 1, marginTop: 0.5, padding: 2, bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                <CardHeader
                    title={`${userFiltered.username}`}
                    subheader={set.date}
                    subheaderTypographyProps={{ color: 'white' }}
                />
                {isEditing ?
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="desc"
                        label="desc"
                        name="desc"
                        type="text"
                        className="textfield"
                        multiline
                        minRows={3}
                        maxRows={5}
                        inputProps={{ style: { color: 'white' }, maxLength: 150 }}
                        autoFocus
                        value={description}
                        sx={{ label: { color: 'white' } }}
                        onChange={(e) => onSetDescription(e.target.value)}
                    />
                    :
                    <Typography variant="h7">{description}</Typography>}
                <ul>{set.avg_bpm}</ul>
                <ul>{set.genre}</ul>
                <Link to={`/profile/${set.user_id}`}><Button fullWidth sx={{ color: 'orange' }}>View DJ Profile</Button></Link>
            </Card>
        </Box>
    );
}

export default DescriptionCard;
