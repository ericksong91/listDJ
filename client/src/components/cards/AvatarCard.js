import { useState } from 'react';
import { Button, Card, Grid } from '@mui/material';


function AvatarCard({ profileUser, user, onSubmit }) {
    const [userAvatar, setUserAvatar] = useState(!!profileUser.avatar ? profileUser.avatar : null)
    const [file, setFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    function handleChange(e) {
        setFile(e.target.files[0]);
        setIsSelected(true);
    };

    console.log(profileUser)

    return (
        <Card className='AvatarCard'>
            <Grid container>
                <Grid item xs={12}> 
                    {!!profileUser.avatar ? <img className='avatar' src={userAvatar} alt="default" /> : <div></div>}
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
                                <Button onClick={(e) => onSubmit(e, file, setIsSelected, setUserAvatar)}>Submit</Button>
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
