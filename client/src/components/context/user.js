import React, { useEffect, useState } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/me').then(r => {
            if (r.ok) {
                r.json().then((data) => setUser(data))
            }
        });
    }, []);


    function login(username, password, setIsLoading, setErrors) {
        setErrors([]);
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        }).then(r => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((data) => setUser(data));
            } else {
                r.json().then((error) => setErrors(error.errors))
            }
        });

    };

    return (
        <UserContext.Provider value={{ user, login }}>
            {children}
        </UserContext.Provider>
    )
};

export { UserContext, UserProvider };