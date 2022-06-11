import React, { useState, useEffect } from 'react';
import InputFirstLastName from './InputFirstLastName';
import PlayersTable from './PlayersTable';
import PlayerInfo from '../visualizzazioneInformazioniGiocatore/PlayerInfo';
import TeamInfo from '../visualizzazioneInformazioniSquadra/TeamInfo';
import './SearchPlayer.css';
const axios = require('axios');

function SearchPlayer (props) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState(null);
    const [playersFirstname, setPlayersFirstname] = useState([]);
    const [playersLastname, setPlayersLastname] = useState([]);
    const [callToAPI, setCallToAPI] = useState(false);
    const [teams, setTeams] = useState([]);
    const [buttonPlayerClicked, setButtonPlayerClicked] = useState(false);
    const [player_Id, setPlayer_Id] = useState("");

    // Similar to componentDidMount and componentDidUpdate:  
    // Vengono presi tutte le squadre del west e east side con i vari loghi e informazioni utili
    useEffect(() => {  
        props.setTeamClicked(false);
        props.setTeamName("");

        axios.get("https://nbascore.herokuapp.com/searchTeamLogo", {params: { conference: "West"}})
        .then(function (response) {
            setTeams(teams => [...teams, ...response.data]);
            setError(null);
            setCallToAPI(true);
        })
        .catch(function (error) {
            setError(error);
            setCallToAPI(true);
        
        })
        axios.get("https://nbascore.herokuapp.com/searchTeamLogo", {params: { conference: "East"}})
        .then(function (response) {
            setTeams(teams => [...teams, ...response.data]);
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
            {props.teamClicked === true ?
                <TeamInfo teamName = {props.teamName} />
                :
                <React.Fragment>
                    <InputFirstLastName
                        firstname = {firstname}
                        setFirstname = {setFirstname}
                        lastname = {lastname}
                        setLastname = {setLastname}
                        error = {error}
                        setError = {setError}
                        setPlayersFirstname = {setPlayersFirstname}
                        setPlayersLastname = {setPlayersLastname}
                        callToAPI = {callToAPI}
                        setCallToAPI = {setCallToAPI}
                        setButtonPlayerClicked = {setButtonPlayerClicked}
                    />
                    {buttonPlayerClicked ?
                        <PlayerInfo playerId = {player_Id} 
                                    setTeamClicked={props.setTeamClicked} 
                                    setTeamName={props.setTeamName} 
                        />
                        :
                        <PlayersTable
                            teams = {teams}
                            error = {error}
                            setError = {setError}
                            firstname = {firstname}
                            setFirstname = {setFirstname}
                            lastname = {lastname}
                            setLastname = {setLastname}
                            playersFirstname = {playersFirstname}
                            playersLastname = {playersLastname}
                            callToAPI = {callToAPI}
                            setCallToAPI = {setCallToAPI}
                            setButtonPlayerClicked={setButtonPlayerClicked} 
                            setPlayer_Id={setPlayer_Id}

                            setTeamClicked={props.setTeamClicked} 
                            setTeamName={props.setTeamName} 
                            teamClicked={props.teamClicked} 
                            teamName={props.teamName}
                        />
                    }
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default SearchPlayer;
