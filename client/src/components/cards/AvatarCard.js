import { useState } from 'react';
import { Button, Card, Grid, Box, CardMedia } from '@mui/material';


function AvatarCard({ avatar, profileUser, user, onSubmitAvatar }) {
    const [file, setFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [error, setError] = useState('');

    if (!profileUser || !user) {
        return <div></div>
    };

    function handleChange(e) {
        if (e.target.files[0].size > 1000000) {
            setError("File cannot be larger than 1MB");
        } else {
            setFile(e.target.files[0]);
            setIsSelected(true);
        };
    };

    return (
        <Box className='AvatarCard' >
            {/* <Card sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white', margin: 1, width: 100, marginTop: 3 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100 }}
                    image={!!avatar ? avatar : null}
                />
            </Card> */}
            {profileUser.id === user.id ?
                <Card sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white', margin: 1, width: 300, padding: 0.5 }}>
                    <Card sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white', margin: 1, width: 100, marginTop: 3 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 100, height: 100 }}
                            image={!!avatar ? avatar : null}
                        />
                    </Card>
                    {
                        profileUser.id === user.id ?
                            <Grid container justifyContent={"center"}>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{ width: "50%", '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }}
                                    >
                                        Upload Avatar
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleChange}
                                            hidden
                                        />
                                    </Button>
                                    {isSelected ? (
                                        <Box justifyContent={"center"}>
                                            <p>Filename: {file.name}</p>
                                            <p>Filetype: {file.type}</p>
                                            <p>Size in bytes: {`${Math.ceil(file.size / 1000)} KBs`}</p>
                                        </Box>
                                    ) : (
                                        <Box justifyContent={"center"}>
                                            <p>Filename: </p>
                                            <p>Filetype: </p>
                                            <p>Size in bytes: </p>
                                            {error}
                                        </Box>
                                    )}
                                </Grid>
                                {isSelected ?
                                    <Grid item xs={12} >
                                        <Button sx={{ color: 'orange' }} onClick={(e) => onSubmitAvatar(e, file, setIsSelected)}>Submit</Button>
                                    </Grid>
                                    :
                                    <div></div>
                                }
                            </Grid>
                            :
                            <Box></Box>
                    }
                </Card>
                : null}
        </Box >
    );
}

export default AvatarCard;
