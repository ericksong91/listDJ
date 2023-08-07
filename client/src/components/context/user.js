import React, { useEffect, useState } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetch('/tracks')
            .then(r => {
                if (r.ok) {
                    r.json().then(data => setTracks(data))
                } else {
                    r.json().then(error => alert(error.errors))
                };
            });
    }, []);

    useEffect(() => {
        fetch('/me').then(r => {
            if (r.ok) {
                r.json().then((data) => setUser(data))
            }
        });
    }, []);


    function login(username, password, setIsLoading, setErrors) {
        username = username.toLowerCase()
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

    function signup(username, password, passwordConfirmation, bio, setIsLoading, setErrors) {
        username = username.toLowerCase()
        setErrors([]);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
                bio
            })
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    r.json().then((data) => {
                        setUser(data);
                    });
                } else {
                    r.json().then((error) => setErrors(error.errors));
                }
            })

    };

    function logout() {
        fetch("/logout", { method: "DELETE" })
            .then((r) => {
                if (r.ok) {
                    setUser(null)
                }
            });
    };

    return (
        <UserContext.Provider value={{ user, tracks, login, logout, signup }}>
            {children}
        </UserContext.Provider>
    )
};

export { UserContext, UserProvider };