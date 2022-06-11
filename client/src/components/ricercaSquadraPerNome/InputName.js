import { TextField } from '@mui/material';
import './InputName.css';

const InputName = (props) => {

    const onChangedName = (event)=>{
        const nameValue = event.target.value;
        props.setName(nameValue);
        
        var teamsList = [];
        props.teams.forEach(team => {
            if(team.name.includes(nameValue))
            {
                teamsList.push(team);
            }
        });
        // si ha un solo team
        if(teamsList.length === 1){
            props.setTeamNameSel(teamsList[0].name);
            props.setButtonTeamClicked(true);
        }else{
            props.setTeamsRes(teamsList);
            props.setButtonTeamClicked(false);
        }
    };

    return (
        <div className='myTextInput'>
            <TextField onChange={onChangedName} id="name" label="Name" variant="outlined" />
        </div>
    );
}

export default InputName;
