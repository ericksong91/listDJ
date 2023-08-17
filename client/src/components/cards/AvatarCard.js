import { useState  } from 'react';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function AvatarCard({ user, index }) {
    const [avatar, setAvatar] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    function handleChange(e) {
        setAvatar(e.target.files[0]);
        setIsSelected(true);

        // Show alert if avatar.size is greater than the maximum file size
    };

    function handleSubmit() {
        const formData = new FormData();
        formData.append('avatar', avatar);

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
        <div className='AvatarCard'>
            {!!user ? <img src={user.avatar} /> : <h1>Loading...</h1>}
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
                    <p>Filename: {avatar.name}</p>
                    <p>Filetype: {avatar.type}</p>
                    <p>Size in bytes: {avatar.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {avatar.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <div>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
}

export default AvatarCard;
