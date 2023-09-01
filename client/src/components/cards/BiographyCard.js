import { Button, Card, CardContent, CardHeader } from '@mui/material';

function BiographyCard({ profileUser, user }) {

    return (
        <div className='bio'>
            <Card sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                <CardHeader
                    title={profileUser.bio}
                />
                <CardContent>
                    {`Links`}
                </CardContent>
                {user.id === profileUser.id ? <Button variant="contained">Edit</Button> : <div></div>}
            </Card>
        </div>
    );
}

export default BiographyCard;
