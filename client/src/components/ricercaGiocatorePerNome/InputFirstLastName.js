import { TextField } from '@mui/material';
import './InputFirstLastName.css';
const axios = require('axios');

const InputFirstLastName = (props) => {

        
    function getPlayersPerFirstname() {
        if(props.firstname !== ""){
            axios.get("https://nbascore.herokuapp.com/searchPlayerFirstname", { params: { firstname: props.firstname} })
            .then(function (response) {
                props.setPlayersFirstname(response.data);
                props.setError(null);
                props.setCallToAPI(true);
            })
            .catch(function (error) {
                props.setError(error);
                props.setCallToAPI(true);
            })
        }else{
            props.setPlayersFirstname([]);
        }
    }
    function getPlayersPerLastname() {
        if(props.lastname !== ""){
            axios.get("https://nbascore.herokuapp.com/searchPlayerLastname", {params: { lastname: props.lastname}})
            .then(function (response) {
                props.setPlayersLastname(response.data);
                props.setError(null);
                props.setCallToAPI(true);
            })
            .catch(function (error) {
                props.setError(error);
                props.setCallToAPI(true);
            })
        }else{
            props.setPlayersLastname([]);
        }
    }

    function onClicked() {
        props.setButtonPlayerClicked(false);
        getPlayersPerFirstname();
        getPlayersPerLastname();
    }

    const onChangedFirstname = (event)=>{
        // show the user input value to console
        const firstnameValue = event.target.value;
        props.setFirstname(firstnameValue);
    };
    const onChangedLastname = (event)=>{
        // show the user input value to console
        const lastnameValue = event.target.value;
        props.setLastname(lastnameValue);
    };

    return (
        <div className='myTextInput'>
        <div className='textinput-container'>
                <TextField onChange={onChangedFirstname} id="firstname" label="Firstname" variant="outlined" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <TextField onChange={onChangedLastname} id="lastname" label="Lastname" variant="outlined" />
        </div>
        <div className='button-container'>
            <button onClick={onClicked} id='chooseName' className='chooseName'>Search</button>
        </div>
        </div>
    );
}

export default InputFirstLastName;
