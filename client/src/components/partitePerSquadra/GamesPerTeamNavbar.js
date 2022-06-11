import React, { useEffect } from 'react';
import './GamesPerTeamNavbar.css'
const axios = require('axios');

// Selection of the team and the season for the research
const GamesPerTeamNavbar = (props) => {
    
    // When the component is loaded we require the list of the teams and the list of the seasons
    useEffect( () => {
        async function loadTeams() {
            await axios.get("https://nbascore.herokuapp.com/teams") 
                .then(function (response) {
                    props.setTeams(response.data);
                    props.setTeamError(null);
                })
                .catch(function (error) {
                    props.setTeamError(error);
                })
        }

        loadTeams();

        async function loadSeasons() {
            await axios.get("https://nbascore.herokuapp.com/seasons") 
                .then(function (response) {
                    props.setSeasons(response.data);
                    props.setSeasonError(null);
                })
                .catch(function (error) {
                    props.setSeasonError(error);
                })
        }

        loadSeasons();
    }, []);
        

    // Search the winning team
    async function search() {             
        // Missing input parameters
        if(props.team === "") {
            alert("You have to select a Team!");
        }
        else if(props.season === 0) {
            alert("You have to select a Season!");
        }
        // Call to the API needed to complete the research
        else{

            await axios.get("https://nbascore.herokuapp.com/gamesPartitePerSquadra", { params: { season: props.season, team: props.team } })
                .then(function (response) {
                    props.setGames(response.data);
                    props.setGamesError(null);
                })
                .catch(function (error) {
                    props.setGamesError(error);
                })
            props.setSearchStarted(true);
        }
    }

    // Request to obtain the list of teams has failed
    if(props.teamError){
        return (
            <div>
                Service temporarily unavailable. Unable to connect to the remote API. 
                <br />
                {props.teamError.message}
            </div>
        );
    }
    // Request to obtain the list of seasons has failed
    else if(props.seasonError){
        return (
            <div>
                Service temporarily unavailable. Unable to connect to the remote API. 
                <br />
                {props.seasonError.message}
            </div>
        );
    }
    // Everything is ok, we can render the research component
    else {
        return (
            <div className='search-menu'>
                    <form className='select'>
                        <select data-testid="teamToSearch" id="teamToSearch" onChange={e=>props.setTeam(e.target.value)}>
                            <option value="" selected disabled>Select Team</option>
                            {
                                props.teams.map((team, id) => (
                                    <option value={team.id}>{team.name}</option>
                                )) 
                            }
                        </select>
                    </form>
                    <form className='select'>
                        <select data-testid="seasonToSearch" id="seasonToSearch" onChange={e=>props.setSeason(e.target.value)}>
                            <option value="" selected disabled>Select Season</option>
                            {
                                props.seasons.map((season, id) => (
                                    <option value={season}>{season}</option>
                                )) 
                            }
                        </select>
                    </form>
            <button className="search-button" onClick={search}>Search</button> 
            </div>
        )
    };    
}

export default GamesPerTeamNavbar;
