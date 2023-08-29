// import { useState, useContext } from 'react';
// import { UserContext } from '../context/user';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function BiographyCard({ user }) {

    return (
        <div className='bio'>
            <Card>
                {user.bio}
            </Card>
        </div>
    );
}

export default BiographyCard;
