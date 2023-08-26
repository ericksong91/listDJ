import { useContext } from 'react';
import { UserContext } from '../context/user';
import SetlistCard from "../cards/SetlistCard";
import AvatarCard from "../cards/AvatarCard";
import BiographyCard from "../cards/BiographyCard";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box, Grid } from "@mui/material";

function Profile({ setlists }) {
    const index = parseInt(useParams().id);
    const { user, setUser } = useContext(UserContext);

    if (!user) {
        return <div>Loading...</div>
    };

    function handleSubmit(e, avatar, setIsSelected, setUserAvatar) {
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
                        setUser(data);
                        setUserAvatar(data.avatar);
                        setIsSelected(false);
                    })
                } else {
                    r.json().then((error) => console.log(error))
                }
            });
    };

    const filteredList = setlists.filter((set) => parseInt(set.user_id) === parseInt(index));

    const filteredSets = filteredList.map((set) => <SetlistCard key={set.id} user={user} set={set} />);

    return (
        <Box className="Profile">
            <Typography variant="h4" sx={{ color: 'orange' }}>
                Profile Page
            </Typography>
            <Grid container>
                <Grid item xs={6}>
                    <AvatarCard user={user} onSubmit={handleSubmit} />
                </Grid>
                <Grid item xs={6}>
                    <BiographyCard user={user} index={index} />
                </Grid>
            </Grid>
            {filteredSets}
        </Box>
    );
};

export default Profile;