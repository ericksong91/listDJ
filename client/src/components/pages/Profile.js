import SetlistCard from "../cards/SetlistCard";
import AvatarCard from "../cards/AvatarCard";
import BiographyCard from "../cards/BiographyCard";
import { useParams } from "react-router-dom";

function Profile({ users, setlists }) {
    const index = parseInt(useParams().id);

    if(!users) {
        return <div>Loading...</div>
    };

    const user = users.find((user) => user.id === index);

    const filteredList = setlists.filter((set) => parseInt(set.user_id) === parseInt(user.id));

    const filteredSets = filteredList.map((set) => <SetlistCard key={set.id} user={user} set={set} />);

    return (
        <div className="Profile">
            <h1>Profile Page</h1>
            <AvatarCard user={user} index={index} />
            <BiographyCard user={user} index={index} />
            {filteredSets}
        </div>
    );
};

export default Profile;