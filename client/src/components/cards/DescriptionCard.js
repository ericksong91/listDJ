import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Button, Box, Typography, CardContent } from '@mui/material';
import { TextField } from '@mui/material'

function DescriptionCard({ user, users, set, onEditSetlists }) {
    const [description, setDescription] = useState(set ? set.description : null);
    const [name, setName] = useState(set ? set.name : null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    if (users.length === 0 || !users) {
        return <div></div>
    };

    const userFiltered = users.find((user) => user.id === parseInt(set.user_id));

    return (
        <Box className="description">
            <Card sx={{ marginLeft: 1, marginTop: 0.5, padding: 1, bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                <CardHeader
                    title={
                        isEditing ?
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="name"
                                name="name"
                                type="text"
                                className="textfield"
                                inputProps={{ maxLength: 50 }}
                                autoFocus
                                value={name}
                                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                                onChange={(e) => setName(e.target.value)}
                            />
                            :
                            <Typography variant="h4" sx={{ color: 'white' }}>{name}</Typography>

                    }
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
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    :
                    <Typography variant="h7">{description}</Typography>}
                <CardContent>{`BPM: ${set.avg_bpm}`}</CardContent>
                <CardContent>{`Genre: ${set.genre}`}</CardContent>
                <Link to={`/profile/${set.user_id}`}><Button fullWidth sx={{ color: 'orange' }}>View DJ Profile</Button></Link>

                {user.id === parseInt(userFiltered.id) ?
                    <CardContent>
                        {isEditing ?
                            isLoading ?
                                <Button variant="contained">Loading...</Button>
                                :
                                <Button variant="contained" onClick={() => {
                                    setIsLoading(true);
                                    onEditSetlists(set, name, description, setIsLoading, setIsEditing, setErrors);
                                }}>Save</Button>
                            :
                            <Button variant="contained" onClick={() => setIsEditing(true)}>Edit</Button>
                        }
                    </CardContent>
                    :
                    null}
                <Typography variant="h7" sx={{ color: 'red' }}>{errors.map((error, ind) => <li key={ind + 1}>{error}</li>)}</Typography>
            </Card>
        </Box>
    );
}

export default DescriptionCard;
