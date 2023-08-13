import { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function AvatarCard() {
    const [image, setImage] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const { user } = useContext(UserContext);

    function onChange(e) {
        setImage(e.target.files[0]);
        setIsSelected(true);

        console.log(e.target.files[0]);
    };

    function onSubmit() {
        const formData = new FormData();
        formData.append('image', image);

        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            body: formData
        })
            .then(r => {
                if (r.ok) {
                    r.json().then((data) => console.log(data))
                } else {
                    r.json().then((error) => console.log(error))
                }
            })
    };

    return (
        <div>
            <Button
                variant="contained"
                component="label"
            >
                Upload Avatar
                <input
                    type="file"
                    onChange={onChange}
                    hidden
                />
            </Button>
            {isSelected ? (
                <div>
                    <p>Filename: {image.name}</p>
                    <p>Filetype: {image.type}</p>
                    <p>Size in bytes: {image.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {image.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <div>
                <Button onClick={onSubmit}>Submit</Button>
            </div>
        </div>
    );
}

export default AvatarCard;
