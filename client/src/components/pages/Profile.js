import SetlistCard from "../cards/SetlistCard";
import AvatarCard from "../cards/AvatarCard";
// import TrackCard from "../cards/TrackCard";

function Profile({ user, setlists }) {
    const filteredList = setlists.filter((set) => parseInt(set.user_id) === parseInt(user.id));

    const filteredSets = filteredList.map((set) => <SetlistCard key={set.id} set={set} />);

    return (
        <div className="Profile">
            <h1>Profile Page</h1>
            <AvatarCard user={user}/>
            {filteredSets}  
        </div>
    );
};

export default Profile;