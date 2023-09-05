import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Typography, TextField } from '@mui/material';

function BiographyCard({ profileUser, user, errors, onDelete, onEdit, onErrors }) {
    const [biography, setBiography] = useState(profileUser.bio);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Box className='bio'>
            <Card sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white', padding: 1, margin: 1, marginTop: 16.5 }}>
                <CardHeader
                    title="Biography"
                />
                <CardContent>
                    {isEditing ?
                        <Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="bio"
                                label="bio"
                                name="bio"
                                type="text"
                                className="textfield"
                                multiline
                                minRows={3}
                                maxRows={5}
                                inputProps={{ style: { color: 'white' }, maxLength: 150 }}
                                autoFocus
                                value={biography}
                                sx={{ label: { color: 'white' } }}
                                onChange={(e) => setBiography(e.target.value)}
                            />
                        </Box>
                        :
                        <Typography
                            variant="h7"
                            align="center"
                            style={{ wordWrap: "break-word" }}
                        >{biography}</Typography>}
                </CardContent>
                <CardContent>
                    {user.id === profileUser.id ?
                        isEditing ?
                            <Button variant="contained" sx={{ '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }} onClick={() => onEdit(biography, user.id, setIsEditing, setIsLoading)}>Save</Button>
                            :
                            <Button variant="contained" sx={{ '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }} onClick={() => setIsEditing(!isEditing)}>Edit</Button>
                        :
                        <div></div>}
                </CardContent>
                <Typography variant="h7" sx={{ color: 'red' }}>{errors.map((error, ind) => <li key={ind + 1}>{error}</li>)}</Typography>
            </Card>
            {isEditing ?
                isLoading ?
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 3, mb: 2 }}
                    >Loading...</Button>
                    :
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => onDelete(user.id, setIsLoading, onErrors)}
                    >Delete Account</Button>
                :
                <div></div>
            }
        </Box>
    );
}

export default BiographyCard;
