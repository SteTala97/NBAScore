import React, { useState, useEffect } from 'react';
import InputName from './InputName';
import TeamsTable from './TeamsTable';
import TeamInfo from '../visualizzazioneInformazioniSquadra/TeamInfo';
import './SearchTeam.css';
const axios = require('axios');

function SearchTeam () {
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [callToAPI, setCallToAPI] = useState(false);
    const [teams, setTeams] = useState([]);
    const [teamsRes, setTeamsRes] = useState([]);
    const [buttonTeamClicked, setButtonTeamClicked] = useState(false);
    const [teamNameSel, setTeamNameSel] = useState("");

    // Similar to componentDidMount and componentDidUpdate:  
    // Vengono presi tutte le squadre con le informazioni utili
    useEffect(() => {  
        axios.get("https://nbascore.herokuapp.com/searchTeamLogo", {params: { conference: "no"}})
        .then(function (response) {
            setTeams(response.data);
            setTeamsRes(response.data);
            setError(null);
            setCallToAPI(true);
        })
        .catch(function (error) {
            setError(error);
            setCallToAPI(true);
        
        })
    }, []);

    return (
        <React.Fragment>
            <InputName
                setName = {setName}
                setError = {setError}
                setCallToAPI = {setCallToAPI}
                setButtonTeamClicked = {setButtonTeamClicked}
                teams = {teams}
                setTeamsRes = {setTeamsRes}
                setTeamNameSel={setTeamNameSel}
            />
            {buttonTeamClicked && name !== null ?
                <TeamInfo teamName = {teamNameSel} />
                :
                <TeamsTable
                    teamsRes = {teamsRes}
                    error = {error}
                    callToAPI = {callToAPI}
                    setButtonTeamClicked={setButtonTeamClicked} 
                    setTeamNameSel={setTeamNameSel}
                />
            }
        </React.Fragment>
    );
}

export default SearchTeam;
