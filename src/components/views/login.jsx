import {useAuth} from '../auth/useAuth.jsx';
import Action from '../UI/Actions.jsx';

function Login()
{

 const {login} = useAuth();
 const staff = {
    UserID: 820,
    UserFirstname: "Graeme",
    UserLastname: "Jones",
    UserEmail: "Ku06696@kingston.ac.uk",
    UserRegistered: 1,
    UserLevel: 0,
    UserYearID: 0,
    UserUsertypeID: 1,
    UserImageURL: "https://generated.photos/face/neutral-white-middle-aged-male-with-short-gray-hair-and-blue-eyes--5e6849b06d3b380006e3c5cb",
    UserUsertypeName: "Staff",
    UserYearName: null
};
const student = {
    UserID: 276,
    UserFirstname: "Hashim",
    UserLastname: "ABDALLAH",
    UserEmail: "K1083353@kingston.ac.uk",
    UserRegistered: 0,
    UserLevel: 4,
    UserYearID: 1,
    UserUsertypeID: 2,
    UserImageURL: "https://images.generated.photos/eL1-OlKDqGf1IaL_b2O8aSj7osDX_eFVHZEoJ0f3ZV0/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzYwNjc0LmpwZw.jpg",
    UserUsertypeName: "Student",
    UserYearName: "2022-23"
};
//Handlers ------------------------------
const handleStudent = () => 
{
	login(student);
};

const handleStaff = () => 
{
	login(staff);
};
//View ----------------------------------
return (
	<Action.Tray>
		<Action.Add showText buttonText='Login as student' onClick={handleStudent}/>
		<Action.Add showText buttonText='Login as staff' onClick={handleStaff}/>
	</Action.Tray>
);

}

export default Login;