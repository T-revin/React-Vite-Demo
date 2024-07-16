import PropTypes from 'prop-types';
import Form from '../../UI/Form.jsx';

const initalUser = {
	UserFirstname: null,
	UserLastname: null,
	UserEmail: null,
	UserRegistered: 0,
	UserLevel: 0,
	UserYearID: null,
	UserUsertypeID: null,
	UserImageURL:
	"https://images.generated.photos/vnopGiDivHG6UKp3AgGkY44U3nOfR3lLsWNKdA-KEyQ/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjAzMjQyLmpwZw.jpg",
}
function UserForm({onSubmit, onCancel, dropdowns}){
//Initialisation ------------------------------
const conformance = {
    html2js: {
        UserFirstname: (value) => (value === '' ? null : value),
        UserLastname: (value) => (value === '' ? null : value),
		UserEmail: (value) => (value === '' ? null : value),
		UserRegistered: (value) => value === 'true',
        UserLevel: (value) => parseInt(value),
        UserYearID: (value) => (value === 0 ? null : parseInt(value)),
        UserUsertypeID: (value) => (value === 0 ? null : parseInt(value)),
        UserImageURL: (value) => (value === '' ? null : value),
    },

    js2html: {
        UserFirstname: (value) => (value === null ? '' : value),
		UserLastname: (value) => (value === null ? '' : value),
		UserEmail: (value) => (value === null ? '' : value),
        UserRegistered: (value) => value,
        UserLevel: (value) => value,
		UserYearID: (value) => (value === null ? 0: value),
		UserUsertypeID: (value) => (value === null ? 0: value),
        UserImageURL: (value) =>  (value === null ? '' : value),
    }
}

const validation = {
    isValid: {
        UserFirstname: (name) => name && name.length > 1,
		UserLastname: (name) => name && name.length > 1,
        UserEmail: (email) => email && email.length > 8, //Temporary
		UserRegistered: (status) => status === true || status === false,
        UserLevel: (level) => level >= 3 && level <= 7,
        UserYearID: (id) => id === null || id >0,
        UserUsertypeID: (id) =>  id === null || id > 0,
        UserImageURL: (url) => url.length > 8,//Temporary
    },
    errorMessage: {
        UserFirstname: 'There should be at least one characters',
		UserLastname: 'There should be at least one characters',
        UserEmail: 'Invalid Email format',
		UserRegistered: 'Registration status must be true or false',
		UserLevel: 'Must be in the range og f 3 to 7 inclusive',
		UserYearID: 'Invalid delivery year has been selected',
		UserUsertypeID: 'Invalid user type selected',
        UserImageURL: 'The URL entered is not valid URL string',
    }
};

//State ---------------------------------------
const [user, errors, handleChange, handleSubmit] = Form.useForm(
    initalUser, conformance, validation, onSubmit);
//Handlers ------------------------------------

//View ----------------------------------------
const years = dropdowns.years;
const usertypes = dropdowns.usertypes;
return(
<Form onSubmit={handleSubmit} onCancel={onCancel}>

	<Form.Item label='First Name' error={errors.UserFirstname}>
	<input type="text" name='UserFirstname' 
	value={conformance.js2html['UserFirstname'] (user.UserFirstname)}
	onChange={handleChange}/>
	</Form.Item>

	<Form.Item label='Last Name' error={errors.UserLastname}>
	<input type='text' name='UserLastname' 
	value={conformance.js2html['UserLastname'] (user.UserLastname)}
	onChange={handleChange}/>
	</Form.Item>

	<Form.Item label='User Email' error={errors.UserEmail}>
	<input type='text' name='UserEmail' 
	value={conformance.js2html['UserEmail'] (user.UserEmail)}
	onChange={handleChange}/>
	</Form.Item>

	<Form.Item label='User register?' error={errors.UserRegistered}>
	<div className='FormRadioGroup'>
		<div className='FormRadioOption'>
		<input type='radio' name='UserRegistered' 
		value={true} 
		checked={conformance.js2html['UserRegistered'](user.UserRegistered)} 
		onChange={handleChange}/>
		Yes 
		</div>
		<div className='FormRadioOption'>
		<input type='radio' name='UserRegistered' 
		value={false} 
		checked={!conformance.js2html['UserRegistered'](user.UserRegistered)} 
		onChange={handleChange}/>
		No
		</div>
	</div>
	</Form.Item>

	<Form.Item label='Student Level' error={errors.UserLevel}>
        <select name="UserLevel" 
        value={conformance.js2html["UserLevel"] (user.UserLevel)}
        onChange={handleChange}>
            <option value="0" disabled>None Selected</option>
            {
                //Array of numbers to choose
                [3,4,5,6,7].map((level) =>(
                    <option key={level}>
                    {level}
                    </option>))
            }
        </select>
    </Form.Item>

	<Form.Item label='User Year' error={errors.UserYearID}>
		{!years.list ?(
		<p>{years.loadingMessage}</p> 
		) : (
		<select name='UserYearID' 
		value={conformance.js2html['UserYearID'] (user.UserYearID)}
		onChange={handleChange}
		>
		<option value='0'>None Selected</option>
			{years.list.map((year) =>(
				<option key={year.YearID} 
				value={year.YearID}>
				{year.YearName}
				</option>
			))}
		</select>
		)}
    </Form.Item>

	<Form.Item label='User type' error={errors.UserUsertypeID}>
		{!usertypes.list ?(
		<p>{usertypes.loadingMessage}</p> 
		) : (
		<select name='UserUsertypeID' 
		value={conformance.js2html['UserUsertypeID'] (user.UserUsertypeID)}
		onChange={handleChange}
		>
		<option value='0'>None Selected</option>
			{usertypes.list.map((type) =>(
				<option key={type.UsertypeID} 
				value={type.UsertypeID}>
				{type.UsertypeName}
				</option>
			))}
		</select>
		)}
    </Form.Item>
	<Form.Item label='User Image' error={errors.UserImageURL}>
		<input type="text" name="UserImageURL" 
		value={conformance.js2html["UserImageURL"] (user.UserImageURL)}
		onChange={handleChange}/>  
    </Form.Item>
</Form>
);
}

UserForm.propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    dropdowns: PropTypes.func,
};

export default UserForm;