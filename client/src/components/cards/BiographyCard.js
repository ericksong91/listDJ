import { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function BiographyCard() {
    const { user } = useContext(UserContext);

    return (
        <div className='bio'>

        </div>
    );
}

export default BiographyCard;
