import React, { useEffect, useState } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const genresList = [
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
    
    const camelotKeys = [
        "1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B", "6A", "6B", "7A", "7B",
        "8A", "8B", "9A", "9B", "10A", "10B", "11A", "11B", "12A", "12B"
    ];


    useEffect(() => {
        console.log('fetch users')
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
                r.json().then((data) => setUser(data))
            }
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
                r.json().then((error) => setErrors(error.errors))
            }
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
        <UserContext.Provider value={{ user, users, genresList, camelotKeys, setUser, login, logout, signup }}>
            {children}
        </UserContext.Provider>
    )
};

export { UserContext, UserProvider };