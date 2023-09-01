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
            <Grid container justifyContent="center">
                <Grid item>
                    <Typography variant="h2" sx={{ color: 'orange' }}>
                        {`${profileUser.username}'s Page`}
                    </Typography>
                </Grid>
                <Grid container justifyContent={'center'} sx={{ bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                    {!profileUser ? <div></div> : <AvatarCard avatar={userAvatar} profileUser={profileUser} user={user} onSubmit={handleSubmit} />}
                    <Grid item xs={6}>
                        {!profileUser ? <div></div> : <BiographyCard profileUser={profileUser} user={user} index={index} />}
                    </Grid>
                </Grid>
            </Grid>
            {filteredSets}
        </Box>
    );
};

export default Profile;