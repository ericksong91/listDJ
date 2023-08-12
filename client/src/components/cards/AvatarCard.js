import { useState } from 'react';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function AvatarCard() {
    const [image, setImage] = useState(null);
    const [isImage, setIsImage] = useState(false);

    function onChange(e) {
        setImage(e.target.files[0]);
        setIsImage(true);

        console.log(e.target.files[0]);
    };

    function onSubmit() {

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
        </div>
    );
}

export default AvatarCard;
