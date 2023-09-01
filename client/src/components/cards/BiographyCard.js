import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';

function BiographyCard({ profileUser, user }) {

    return (
        <Box className='bio'>
            <Card sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white', padding: 1, margin: 1 }}>
                <CardHeader
                    title="Biography"
                />
                <CardContent>
                    {profileUser.bio}
                </CardContent>
                <CardContent>
                    {user.id === profileUser.id ? <Button variant="contained">Edit</Button> : <div></div>}
                </CardContent>
            </Card>
        </Box>
    );
}

export default BiographyCard;
