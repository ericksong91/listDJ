import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import SetlistCard from "../cards/SetlistCard";
import AvatarCard from "../cards/AvatarCard";
import BiographyCard from "../cards/BiographyCard";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box, Grid } from "@mui/material";

function Profile({ setlists }) {
    const index = parseInt(useParams().id);
    const { user, users, setUser, setUsers } = useContext(UserContext);
    const profileUser = users.find((user) => user.id === index);
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
        if (!!profileUser) {
            setUserAvatar(profileUser.avatar);
        };
    }, [userAvatar, profileUser])

    if (!user || !users || !setlists) {
        return <div>Loading...</div>
    };

    console.log(user)
    console.log(users)

    function handleSubmit(e, avatar, setIsSelected) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('avatar', avatar);

        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            body: formData
        })
            .then(r => {
                if (r.ok) {
                    r.json().then((data) => {
                        const filteredUsers = users.map((u) => {
                            if (u.id === data.id) {
                                return data
                            } else {
                                return u
                            }
                        });

                        setUser(data);
                        setUsers(filteredUsers);
                        setUserAvatar(data.avatar);
                        setIsSelected(false);
                    })
                } else {
                    r.json().then((error) => console.log(error))
                }
            });
    };

    const filteredList = setlists.filter((set) => parseInt(set.user_id) === parseInt(index));

    const filteredSets = filteredList.map((set) => <SetlistCard key={set.id} user={profileUser} set={set} />);

    return (
        <Box className="Profile">
            <Typography variant="h4" sx={{ color: 'orange' }}>
                Profile Page
            </Typography>
            <Grid container>
                <Grid item xs={6}>
                    {!profileUser ? <div></div> : <AvatarCard avatar={userAvatar} profileUser={profileUser} user={user} onSubmit={handleSubmit} />}
                </Grid>
                <Grid item xs={6}>
                    {!profileUser ? <div></div> : <BiographyCard user={profileUser} index={index} />}
                </Grid>
            </Grid>
            {filteredSets}
        </Box>
    );
};

export default Profile;