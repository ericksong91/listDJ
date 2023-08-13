import { useState } from 'react';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function AvatarCard() {
    const [image, setImage] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    function onChange(e) {
        setImage(e.target.files[0]);
        setIsSelected(true);

        console.log(e.target.files[0]);
    };

    function onSubmit() {

        const formData = new FormData();

        formData.append('File', image);

        console.log(formData);

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
