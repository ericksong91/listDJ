import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import SetlistCard from "../cards/SetlistCard";
import AvatarCard from "../cards/AvatarCard";
import BiographyCard from "../cards/BiographyCard";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box, Grid, Container } from "@mui/material";

function Profile({ setlists, user, users, onDelete }) {
    const index = parseInt(useParams().id);
    const { setUser, setUsers } = useContext(UserContext);
    const profileUser = users.find((user) => user.id === index);
    const [userAvatar, setUserAvatar] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!!profileUser) {
            setUserAvatar(profileUser.avatar);
        };
    }, [userAvatar, profileUser])

    if (!user || !users || !setlists || !profileUser) {
        return <div></div>
    };

    function handleEdit(biography, id, setIsEditing, setIsLoading) {
        fetch(`/users/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: user.id,
                bio: biography,
                username: user.username
            })
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    r.json().then((data) => {
                        const filteredUsers = users.map((user) => {
                            if (user.id === data.id) {
                                return data
                            } else {
                                return user
                            }
                        });

                        setUser(data);
                        setUsers([...filteredUsers]);
                        setIsEditing(false);
                        setErrors([]);
                    })
                } else {
                    r.json().then((error) => setErrors(error.errors))
                }
            })
    };

    function handleSubmitAvatar(e, avatar, setIsSelected) {
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
                    r.json().then((error) => setErrors(error.errors))
                }
            });
    };

    const filteredList = setlists.filter((set) => set.user_id === index);

    const filteredSets = filteredList.map((set) => <SetlistCard key={set.id} user={profileUser} set={set} />);

    return (
        <Box className="Profile">
            <Grid container justifyContent="center" sx={{ marginBottom: 2 }}>
                <Grid item>
                    <Typography variant="h2" sx={{ color: 'orange', paddingTop: 1 }}>
                        {`${profileUser.username}'s Page`}
                    </Typography>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Grid item>
                        {!profileUser ?
                            <div></div>
                            :
                            <AvatarCard avatar={userAvatar} profileUser={profileUser}
                                user={user} onSubmitAvatar={handleSubmitAvatar} />}
                    </Grid>
                    <Grid item xs={6}>
                        {!profileUser ?
                            <div></div>
                            :
                            <BiographyCard user={user} profileUser={profileUser}
                                index={index} errors={errors} onDelete={onDelete}
                                onEdit={handleEdit} onErrors={setErrors} />}
                    </Grid>
                </Grid>
            </Grid>
            <Container>
                <Grid container spacing={5}>
                    {filteredSets}
                </Grid>
            </Container>
        </Box>
    );
};

export default Profile;