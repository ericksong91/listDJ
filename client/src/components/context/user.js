import React from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {

    const user = "Hello";

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
};

export { UserContext, UserProvider };