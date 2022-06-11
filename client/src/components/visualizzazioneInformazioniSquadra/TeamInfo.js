import TeamInfoTable from './TeamInfoTable';
import PlayersList from './PlayersList';
import PlayerInfo from '../visualizzazioneInformazioniGiocatore/PlayerInfo';
import './TeamInfo.css';

import React, { useState, useEffect } from 'react';
const axios = require('axios');


/* Visualizzazione delle info di una specifica squadra con relativo elenco dei giocatori, nell'ultima stagione disponibile.
    La pagina visualizza le informazioni di una certa squadra e il relativo elenco di giocatori, e in cima alla pagina viene riportato
    il logo della squadra.
    In caso di errori o di loading delle informazioni, la pagina visualizza un opportuno messaggio.
    Richiede come props il nome della squadra di cui si vogliono le info.
*/
function TeamInfo(props) {
    // teamInfo: indica le informazioni sulla squadra richiesta
    const [teamInfo, setTeamInfo] = useState({});
    // lastSeason: indica l'ultima stagione disponibile
    const [lastSeason, setLastSeason] = useState(0);

    // playersSubList: indica un'array di array di giocatori, che viene utilizzato per la visualizzazione
    const [playersSubList, setPlayersSubList] = useState([]);

    // requestState: indica lo stato della richiesta al server. i Valori possibili sono: "inProgress" - "complete"
    const [requestState, setRequestState] = useState("inProgress");
    // requestError: indica se c'è stato un errore durante la richiesta al server.
    const [requestError, setRequestError] = useState(null);

    // Possible states are: "true" and "false";
    const [playerInfo, setPlayerInfo] = useState(false); 
    // The state is a numerical value containing a player's id
    const [playerId, setPlayerId] = useState(0); 

    /* al caricamento del componente, prima richiedi al server l'elenco delle stagioni da cui estrai l'ultima stagione
        e poi richiedi al server le Info, nell'ultima stagione, della squadra di cui hai ricevuto il nome */
    useEffect( () => {
        async function loadSeasons() {
            await axios.get("https://nbascore.herokuapp.com/seasons") 
                .then(function (response) {
                    let seasonToUse = Math.max.apply(Math, response.data);
                    setLastSeason(seasonToUse);
                    setRequestError(null); 
                })
                .catch(function (error) {
                    setRequestError(error);
                })    
        }

        loadSeasons();
    }, []);

    
    useEffect( () => {
        async function loadTeamInfo() {
            if (lastSeason){ 
                await axios.get("https://nbascore.herokuapp.com/teamInfo", { params: { name: props.teamName, season: lastSeason} }) 
                    .then(function (response) {
                        setTeamInfo(response.data);
                        setRequestError(null); 
                        setRequestState("complete");
                    })
                    .catch(function (error) {
                        setRequestError(error);
                    })     
            }   
        }
        
        loadTeamInfo();
    }, [lastSeason]);

    // dividi la lista di giocatori in 2 sotto-liste da circa NumGiocatori/2 giocatori ciascuna, utile per la visualizzazione su 2 colonne
    useEffect( () => {
        if(teamInfo && teamInfo.players && teamInfo.players.length !== 0){
            const chunkSize = Math.ceil(teamInfo.players.length/2);
            const array = teamInfo.players;
            const PlayersSplitted = array.map((e, i) => { 
                return i % chunkSize === 0 ? array.slice(i, i + chunkSize) : null 
            }).filter(e => { return e; })
            setPlayersSubList(PlayersSplitted);
        }
    }, [teamInfo]);

   
    // se requestError ha un valore diverso da null significa che la richiesta al server per ottenere le info della squadra è fallita
    if(requestError){
        return (
            <div className='statusMessage'>
                Service temporarily unavailable. Unable to connect to the remote API. 
                <br />
                {requestError.message}
            </div>
        );
    }

    // se requestState ha valore "inProgress", ciò significa che la richiesta al server per ottenere le info della squadra è ancora in corso
    else if (requestState === "inProgress") {
        return (null)
    }
   
    // si è pronti a visualizzare la schermata delle info della squadra o, all'occorrenza, la schermata delle info di uno dei giocatori di quella squadra
    else {        
        return (
            playerInfo === true ?
            <PlayerInfo playerId = {playerId} />
            :
            <React.Fragment>
                <img src={teamInfo.teamLogo ? teamInfo.teamLogo : "NA"} alt="Logo Team NA" className="team-logo-info"></img>
                <TeamInfoTable 
                    teamInfo = {teamInfo}
                />
                <br/> 
                <PlayersList 
                    teamId = {teamInfo.teamId} 
                    playersSubList = {playersSubList}
                    setPlayerId = {setPlayerId}
                    setPlayerInfo = {setPlayerInfo}
                />
            </React.Fragment>
        );
    }
}

export default TeamInfo;