import useLoad from "../api/useLoad.js";
import { useModal, Modal } from '../UI/Modal.jsx';
import Action from '../UI/Actions.jsx';
import UserForm from '../entity/user/UserForm.jsx';
import {CardContainer } from "../UI/Card.jsx";
import UserCard from "../entity/user/UserCard.jsx";


function Students(){
//Initialisation ----------------------------------
const newStudent = {
  UserFirstname: "Nathan",
  UserLastname: "Olsson",
  UserEmail: "K9999999@kingston.ac.uk",
  UserRegistered: 0,
  UserLevel: 4,
  UserYearID: 1,
  UserUsertypeID: 2,
  UserImageURL:
  "https://images.generated.photos/vnopGiDivHG6UKp3AgGkY44U3nOfR3lLsWNKdA-KEyQ/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjAzMjQyLmpwZw.jpg",
  UserUsertypeName: "Student",
  UserYearName: "2022-23",
};
const loggedInUserGroup = 13;
const myGroupEndpoint = 
`/users/groups/${loggedInUserGroup}`;
const yearsEndpoint = `/years`;
const usertypesEndpoint = '/usertypes';
    
//State --------------------------------------------
const [students,setStudents,loadingMessage] = useLoad(myGroupEndpoint);
const [years, ,loadingYearsMessage] = useLoad(yearsEndpoint);
const [usertypes, ,loadingUsertypesMessage] = useLoad(usertypesEndpoint);
const [showForm, formTitle, openForm, closeForm] = useModal(false);
//Handlers -----------------------------------------
const handleSubmit = (user) =>{
  user.UserID = Math.floor(10000 * Math.random());
  setStudents([...students, user]);
  closeForm();
  console.log(JSON.stringify(user));
};
//View ---------------------------------------------
const addNewUser = 'Add new User';
const dropdowns = {
	years: {
		list: years,
		loadingMessage: loadingYearsMessage,
	},
  usertypes: {
		list: usertypes,
		loadingMessage: loadingUsertypesMessage,
	},
}
return(
    <>
    <h1>Students</h1>
    <Modal show={showForm} title={formTitle}>
    <UserForm onSubmit={handleSubmit} onCancel={closeForm}
    dropdowns={dropdowns}/> 
    </Modal>
    <Action.Tray>
    <Action.Add showText buttonText= {addNewUser}
    onClick ={() => openForm(addNewUser)}/>
    </Action.Tray>

    {!students ?( //If there is no students loading message
      <p>{loadingMessage}</p>
    ) : students.length === 0 ? ( //Else
      <p>No Records Found.</p>
    ) : (
    <CardContainer>
    {
      students.map((user)=> 
      <UserCard user={user} key={user.UserEmail}/>)}
    </CardContainer>
    )}
  </>
);
}


export default Students;