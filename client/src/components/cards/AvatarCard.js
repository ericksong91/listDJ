import { useState } from 'react';
import { Button, Card, Grid } from '@mui/material';


function AvatarCard({ user, onSubmit }) {
    const [userAvatar, setUserAvatar] = useState(!!user.avatar ? user.avatar : null)
    const [file, setFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    function handleChange(e) {
        setFile(e.target.files[0]);
        setIsSelected(true);
    };

    return (
        <Card className='AvatarCard'>
            <Grid container>


                <Grid item>
                    {!!user.avatar ? <img className='avatar' src={userAvatar} alt="default" /> : <div></div>}
                </Grid>
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
                <Button onClick={(e) => onSubmit(e, file, setIsSelected, setUserAvatar)}>Submit</Button>
            </Grid>
        </Card>
    );
}

export default AvatarCard;
