import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/user";

function SetlistPage() {
    const { user, tracks } = useContext(UserContext);


    console.log(user)

    console.log(tracks)

    return (
        <div className="SetlistPage">
        </div>
    );
}

export default SetlistPage;