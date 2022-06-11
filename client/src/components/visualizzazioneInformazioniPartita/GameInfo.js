import './GameInfo.css';
import PlayerInfo from '../visualizzazioneInformazioniGiocatore/PlayerInfo';
import React, { useEffect, useState } from 'react';
import GameInfoNavBar from './GameInfo-navbar';
import GameInfoPlayers from './GameInfo-players';
import GameInfoStatistics from './GameInfo-statistics';
import GameInfoGeneralInfo from './GameInfo-generalInfo';
import TeamInfo from '../visualizzazioneInformazioniSquadra/TeamInfo';


const axios = require('axios');


export default function GameInfo (props) {

    // Possible states are: "game_stats", "home" and "visitors";
    const [info, setInfo] = useState("");

    // Possible states are: "true" and "false";
    const [playerInfo, setPlayerInfo] = useState(false);

    // The state is a numerical value containing a player's id
    const [playerId, setPlayerId] = useState(0);

    // The state is an object containing game info
    const [gameInfo, setGameInfo] = useState({});

    // The state is an object containing game statistics
    const [gameStats, setGameStats] = useState({});

    // The state is an object containing players statistics for a given game
    const [playersStats, setPlayersStats] = useState("");
   
    const gameId = props.id;

    useEffect( () => {
        getGameInfo(gameId);
        getGameStatistics(gameId);
        getPlayersStatistics(gameId);
    }, [gameId]);

    // ↓ GET calls to the server ↓ //

    const getGameInfo = (gameId) => {
        axios.get('https://nbascore.herokuapp.com/gamePerId', {params: { id: gameId}})
        .then(function (res) {
            setGameInfo(res.data[0]); // '[0]' because there's going to be
        })                            //  only one game per id
        .catch(function (error) {
                console.error(error);
        })
    };

    const getGameStatistics = (gameId) => {
        axios.get('https://nbascore.herokuapp.com/gameStatisticsPerId', {params: { id: gameId}})
        .then(function (res) {
            setGameStats(res.data);
        }) 
        .catch(function (error) {
                console.error(error);
        })
    };

    const getPlayersStatistics = (gameId) => {
        axios.get('https://nbascore.herokuapp.com/gamePlayersPerId', {params: { id: gameId}})
        .then(function (res) {
            setPlayersStats(res.data);
        })
        .catch(function (error) {
                console.error(error);
        })
    };

    // ↑ GET calls to the server ↑ //



    return(
           props.teamClicked === true ? 
            <TeamInfo teamName = {props.teamName} /> 
            : 
            <React.Fragment>
                <GameInfoGeneralInfo 
                    gameInfo = {gameInfo} 
                    setTeamClicked={props.setTeamClicked} 
                    setTeamName={props.setTeamName}
                />
                <GameInfoNavBar 
                    setInfo = {setInfo} 
                    setPlayerInfo = {setPlayerInfo}
                />
                {info === "game_stats" ?
                    <GameInfoStatistics 
                        gameStats = {gameStats}
                    /> 
                    : <div></div>
                }
                {info === "home" || info === "visitors" ?
                    playerInfo ?
                    <PlayerInfo 
                        playerId = {playerId}
                        setTeamClicked={props.setTeamClicked} 
                        setTeamName={props.setTeamName}
                    >
                    </PlayerInfo>
                    :
                    <GameInfoPlayers 
                        team = {info} 
                        data = {gameInfo}
                        playersStats = {playersStats}
                        setPlayerInfo = {setPlayerInfo}
                        setPlayerId = {setPlayerId}
                    /> 
                : <div></div>
            }
        </React.Fragment>
    );
};