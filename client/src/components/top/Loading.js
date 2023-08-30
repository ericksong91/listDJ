import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/user'

function Loading({ onIsPageLoading }) {
    const { user } = useContext(UserContext);

    if (!user) {
        onIsPageLoading(false)
    };

    return (
        <div>Loading!!!</div>
    )
}

export default Loading