import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import Login from "./top/Login";
import SetlistCard from "./cards/SetlistCard";

function SetlistPage() {

  if (!user) {
    return <Login />
  };

  return (
    <div className="SetlistPage">
      <h1>Hello {user.username}</h1>
      {setlistCards}
    </div>
  );
}

export default SetlistPage;