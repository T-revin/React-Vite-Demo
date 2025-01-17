import PropTypes from "prop-types";
import { Card } from "../../UI/Card.jsx";
import "./UserCard.scss";

function UserCard({user}){
    //Initialisation
    //State
    //Handles
    //View
    return(
        <div className="studentCard" >
        <Card>
        <p>{user.UserEmail.substring(0,8)}</p>
        <p>{`${user.UserFirstname} ${user.UserLastname}`}</p>
        <img src={user.UserImageURL} alt={user.UserEmail.substring(0,8)}/>
        </Card>
        </div>
    );
}

UserCard.propTypes =
{
    user: PropTypes.shape
    ({
        UserEmail: PropTypes.string.isRequired,
        UserFirstname: PropTypes.string.isRequired,
        UserLastname: PropTypes.string.isRequired,
        UserImageURL: PropTypes.string.isRequired,
    }),
};
export default UserCard;