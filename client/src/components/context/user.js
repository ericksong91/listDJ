import React, { useEffect, useState } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const genresList = [
        "Electro-Funk",
        "Deep House",
        "Dubstep",
        "Happy Hardcore",
        "Hardstyle",
        "UK Garage",
        "Soulful House",
        "Tech House",
        "Acid House",
        "Hard Trance",
        "Acid Techno",
        "Minimal/Deep Tech",
        "Speed Garage",
        "Breakbeat Hardcore",
        "Drum and Bass",
        "Liquid DnB",
        "Jersey Club",
        "Baltimore Club",
        "Electro",
        "Big Room",
        "Trap",
        "Disco",
        "Hard Dance",
        "Jungle"
    ];

    useEffect(() => {
        fetch('/users')
            .then(r => {
                if (r.ok) {
                    r.json().then(data => setUsers(data))
                } else {
                    r.json().then(error => alert(error.errors))
                };
            });
    }, []);

    useEffect(() => {
        fetch('/me').then(r => {
            if (r.ok) {
                r.json().then((data) => {
                    setIsFetching(false);
                    setUser(data);
                })
            } else {
                setIsFetching(false);
            };
        });
    }, []);

    function login(username, password, setIsLoading, setErrors) {
        username = username.toLowerCase();
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
                r.json().then((error) => setErrors(error.errors));
            };
        });
    };

    function signup(username, password, passwordConfirmation, bio, setIsLoading, setErrors) {
        username = username.toLowerCase();
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
                        setUsers([...users, data]);
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

    function handleDeleteUser(id, setlists, onIsLoading, onErrors, setSetlists) {
        fetch(`/users/${id}`, {
            method: 'DELETE'
        })
            .then((r) => {
                onIsLoading(false);
                if (r.ok) {
                    const filteredSetlists = setlists.filter((set) => set.user_id !== id);
                    const filteredUsers = users.filter((user) => user.id !== id);

                    setUser(null);
                    setUsers([...filteredUsers]);
                    setSetlists([...filteredSetlists]);
                } else {
                    r.json().then((error) => onErrors(error.errors));
                };
            });
    };

    return (
        <UserContext.Provider value={{
            user, users, genresList, isFetching, setUser, setUsers,
            setIsFetching, login, logout, signup, handleDeleteUser
        }}>
            {children}
        </UserContext.Provider>
    )
};

export { UserContext, UserProvider };