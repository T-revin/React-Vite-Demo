import PropTypes from 'prop-types';
import Form from '../../UI/Form.jsx';

const initalModule = {
    ModuleName: null,
    ModuleCode: null,
    ModuleLevel: 0,
    ModuleYearID: null,
    ModuleLeaderID: null,
    ModuleImageURL: "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg"
}
function ModuleForm({onSubmit, onCancel, dropdowns}){
//Initialisation -----------------------------
//If value is empty string return null
const conformance = {
    html2js: {
        ModuleName: (value) => (value === "" ? null : value),
        ModuleCode: (value) => (value === "" ? null : value),
        ModuleLevel: (value) => parseInt(value),
        ModuleYearID: (value) => (value === 0 ? null : parseInt(value)),
        ModuleLeaderID: (value) => (value === 0 ? null : parseInt(value)),
        ModuleImageURL: (value) => (value === "" ? null : value),
    },

    js2html: {
        ModuleName: (value) => (value === "" ? null : value),
        ModuleCode: (value) => (value === "" ? null : value),
        ModuleLevel: (value) => value,
        ModuleYearID: (value) => (value === null ? 0: value),
        ModuleLeaderID: (value) => (value === null ? 0: value),
        ModuleImageURL: (value) =>  (value === "" ? null : value),
    }
}

const validation = {
    isValid: {
        ModuleName: (name) => name.length > 8,
        ModuleCode: (code) => /^\D{2}\d{4}$/.test(code),
        ModuleLevel: (level) => level > 2 && level < 8,
        ModuleYearID: (id) => id > 0,
        ModuleLeaderID: (id) =>  id === null || id > 0,
        ModuleImageURL: (url) => url.length > 8,//Temporary
    },
    errorMessage: {
        ModuleName: 'Module name should be at least 8 characters',
        ModuleCode: 'Module code is not in valid format',
        ModuleLevel: 'Invalid module level',
        ModuleYearID: 'No delivery year has been selected',
        ModuleLeaderID: 'Invalid module leader selected',
        ModuleImageURL: 'The URL entered is not valid URL string',
    }
};

//State ---------------------------------------
const [module, errors, handleChange, handleSubmit] = Form.useForm(
    initalModule, conformance, validation, onSubmit);

//Handlers -------------------------------------

//View -------------------------------------------
const years = dropdowns.years;
const staff = dropdowns.staff;
return(
    <Form onSubmit={handleSubmit} onCancel={onCancel}>

        <Form.Item label='Module Name' error={errors.ModuleName}>
            <input type="text" name="ModuleName" 
            value={conformance.js2html["ModuleName"] (module.ModuleName)}
            onChange={handleChange}/>
        </Form.Item>

        <Form.Item label='Module Code' error={errors.ModuleCode}>
            <input type="text" name="ModuleCode" 
            value={conformance.js2html["ModuleCode"] (module.ModuleCode)
            } 
            onChange={handleChange}/>
        </Form.Item>

        <Form.Item label='Module Level' error={errors.ModuleLevel}>
        <select name="ModuleLevel" 
        value={conformance.js2html["ModuleLevel"] (module.ModuleLevel)}
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

        <Form.Item label='Module Year' error={errors.ModuleYearID}>
            {!years.list ?(
            <p>{years.loadingMessage}</p> 
            ) : (
            <select name="ModuleYearID" 
            value={conformance.js2html["ModuleYearID"] (module.ModuleYearID)}
            onChange={handleChange}
            >
            <option value="0">None Selected</option>
                {years.list.map((year) =>(
                    <option key={year.YearID} 
                    value={year.YearID}>
                    {year.YearName}
                    </option>
                ))}
            </select>
            )}
        </Form.Item>

        <Form.Item label='Module Leader' error={errors.ModuleLeaderID}>
            {!staff.list ?(
            <p>{staff.loadingStaffMessage}</p> 
            ) : (
            <select name="ModuleLeaderID" 
            value={conformance.js2html["ModuleLeaderID"] (module.ModuleLeaderID)}
            onChange={handleChange}
            >
            <option value="0">None Selected</option>
                {staff.list.map((member) =>(
                    <option key={member.UserID} 
                    value={member.UserID}>
                    {`${member.UserFirstname} 
                    ${member.UserLastname}`}
                    </option>
                ))}
            </select>
            )}
        </Form.Item>

        <Form.Item label='Module Image' error={errors.ModuleImageURL}>
            <input type="text" name="ModuleImageURL" 
            value={conformance.js2html["ModuleImageURL"] (module.ModuleImageURL)}
            onChange={handleChange}/>  
        </Form.Item>
    </Form>
);
}

ModuleForm.propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    dropdowns: PropTypes.func,
};

export default ModuleForm;