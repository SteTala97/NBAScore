import PlayerInfoTable from './PlayerInfoTable';
import TeamInfo from '../visualizzazioneInformazioniSquadra/TeamInfo';
import './PlayerInfoTable.css'
import React, { useEffect, useState } from 'react';


const axios = require('axios');


export default function PlayerInfo (props) {

    // The state is an object containing player's info
    const [playerInfo, setPlayerInfo] = useState("");

    // The state is an object containing the available seasons
    const [season, setSeason] = useState(0);

    // The state is an object containing player's team's info
    const [teamInfo, setTeamInfo] = useState({});
    
    // The state is an object which indicates whether TeamInfo can be viewed
    const [viewteamInfo, setViewteamInfo] = useState(false);

    const playerId = props.playerId;

    useEffect( () => {
        getPlayerInfo(playerId);
        getSeasons();
    }, [playerId]);

    useEffect( () => {
        getTeamInfo(playerId, season)
    }, [season, playerId]);
    

    // ↓ GET calls to the server ↓

    const getPlayerInfo = (playerId) => {
        axios.get('https://nbascore.herokuapp.com/playerInfo', {params: { id: playerId}})
        .then(function (res) {
            setPlayerInfo(res.data[0]); // '[0]' because there's going to be
        })                              //  only one player per id
        .catch(function (error) {
                console.error(error);
        })
    };

    const getSeasons = () => {
        axios.get('https://nbascore.herokuapp.com/seasons')
        .then(function (res) {
            setSeason(res.data.pop()); // consider only the latest season
        })
        .catch(function (error) {
                console.error(error);
        })
    };

    const getTeamInfo = (playerId, season) => {
        if(season) {
            axios.get('https://nbascore.herokuapp.com/playerStats', {params: { id: playerId, season: season }})
            .then(function (res) {
                if(props.setTeamName && res.data.length !== 0) {
                    props.setTeamName(res.data[0].name);
                }
                setTeamInfo(res.data[0]); // '[0]' because there's going to be many elements (player's 
            })                            // statistics per game), but only one is needed to get the team
            .catch(function (error) {
                    console.error(error);
            })
        }
    };

    // ↑ GET calls to the server ↑
    

    return(
        viewteamInfo === true ? 
        <TeamInfo teamName={teamInfo.name}/>
        :
        <React.Fragment>
            <PlayerInfoTable 
                playerInfo = {playerInfo} 
                teamInfo = {teamInfo}
                setViewteamInfo = {props.setTeamClicked ? props.setTeamClicked : setViewteamInfo}
            />
        </React.Fragment>
    );
};