import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Typography, TextField } from '@mui/material';

function BiographyCard({ profileUser, user }) {
    const [biography, setBiography] = useState(profileUser.bio);
    const [isEditing, setIsEditing] = useState(false)
    const { setUser } = useContext(UserContext);

    const styles = theme => ({
        multilineColor: {
            color: 'red'
        }
    });

    function handleEdit() {
        console.log("Saving", biography);

        fetch('/user')

    };

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
                            <Button variant="contained" onClick={() => setIsEditing(!isEditing)}>Edit</Button>
                            :
                            <Button variant="contained" onClick={() => handleEdit()}>Save</Button>
                        :
                        <div></div>}
                </CardContent>
            </Card>
        </Box>
    );
}

export default BiographyCard;
