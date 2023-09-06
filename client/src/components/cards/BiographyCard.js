import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Typography, TextField, CardMedia } from '@mui/material';

function BiographyCard({ profileUser, user, errors, onEdit }) {
    const [biography, setBiography] = useState(profileUser.bio);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Box className='bio'>
            <Card sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white', marginTop: 5 }}>
                <CardHeader
                    title="Biography"
                />
                <CardContent>
                    {profileUser.id === user.id ?
                        null
                        :
                        <Card sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white', margin: 1, width: 100 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 100, height: 100 }}
                                image={!!profileUser.avatar ? profileUser.avatar : null}
                            />
                        </Card>}
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
                                onChange={(e) => setBiography(e.target.value.trimStart())}
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
                            <Button variant="contained" sx={{ '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }} onClick={() => onEdit(biography, user.id, setIsEditing)}>Save</Button>
                            :
                            <Button variant="contained" sx={{ '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }} onClick={() => setIsEditing(!isEditing)}>Edit</Button>
                        :
                        <div></div>}
                </CardContent>
                <Typography variant="h7" sx={{ color: 'red' }}>{errors.map((error, ind) => <Box sx={{ padding: 1 }}><li key={ind + 1}>{error}</li></Box>)}</Typography>
            </Card>
        </Box>
    );
}

export default BiographyCard;
