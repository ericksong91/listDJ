import { useState } from 'react';
import { Button, Card, Grid } from '@mui/material';


function AvatarCard({ avatar, profileUser, user, onSubmit }) {
    const [file, setFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    if(!profileUser || !user) {
        return <div></div>
    };

    function handleChange(e) {
        setFile(e.target.files[0]);
        setIsSelected(true);
    };

    return (
        <Card className='AvatarCard' sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
            <Grid container>
                <Grid item xs={12}> 
                    {!!avatar ? <img className='avatar' src={avatar} alt="default" /> : <div></div>}
                </Grid>
                {
                    profileUser.id === user.id ?
                        <div>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    component="label"
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
                                    <div>
                                        <p>Filename: {file.name}</p>
                                        <p>Filetype: {file.type}</p>
                                        <p>Size in bytes: {file.size}</p>
                                        <p>
                                            lastModifiedDate:{' '}
                                            {file.lastModifiedDate.toLocaleDateString()}
                                        </p>
                                    </div>
                                ) : (
                                    <p>Select a file to show details</p>
                                )}
                            </Grid>
                            <Grid item>
                                <Button onClick={(e) => onSubmit(e, file, setIsSelected)}>Submit</Button>
                            </Grid>
                        </div>
                        :
                        <div></div>
                }

            </Grid>
        </Card>
    );
}

export default AvatarCard;
