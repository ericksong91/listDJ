// import { useState, useContext } from 'react';
// import { UserContext } from '../context/user';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function BiographyCard({ user }) {

    return (
        <div className='bio'>
            <h1>biography card</h1>
            {user.username}

        </div>
    );
}

export default BiographyCard;
