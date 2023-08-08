import SetlistCard from "../cards/SetlistCard";
import TrackCard from "../cards/TrackCard";

function Profile({ user, setlists }) {

    console.log(user);
    const filteredList = setlists.filter((set) => parseInt(set.user_id) === parseInt(user.id));

    const filteredSets = filteredList.map((set) => <SetlistCard set={set} />);

    return (
        <div className="Profile">
            <h1>Profile Page</h1>
            {filteredSets}  
        </div>
    );
};

export default Profile;