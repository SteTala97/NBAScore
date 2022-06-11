import React, { useState, useEffect } from 'react';
import GamesPerTeamNavbar from './GamesPerTeamNavbar';
import GamesPerTeamTable from './GamesPerTeamTable';
import GameInfo from '../visualizzazioneInformazioniPartita/GameInfo';
import TeamInfo from '../visualizzazioneInformazioniSquadra/TeamInfo';

// Root page for the visualization of the games scheduled (both finished or not) for a given team and season
function GamesPerTeam (props) {
    const [team, setTeam] = useState("");
    const [teams, setTeams] = useState([]);
    const [teamError, setTeamError] = useState(null);

    const [season, setSeason] = useState(0);
    const [seasons, setSeasons] = useState([]);
    const [seasonError, setSeasonError] = useState(null);

    const [searchStarted, setSearchStarted] = useState(false);

    const [games, setGames] = useState([]);
    const [gamesError, setGamesError] = useState(null);

    const [buttonClicked, setButtonClicked] = useState(false);
    const [gameId, setGameId] = useState("");

    useEffect(() => {
        props.setTeamClicked(false);
        props.setTeamName("");
    }, []);

    return (
        // Here there's going to be the conditional rendering to toggle between this component and GameInfo
        <React.Fragment>
            {props.teamClicked === true ?            
                <TeamInfo teamName = {props.teamName} />
                :
                buttonClicked === true ?
                    <GameInfo 
                        id = {gameId}
                    /> 
                    :
                    <React.Fragment>
                        <GamesPerTeamNavbar
                            team = {team}
                            setTeam = {setTeam}
                            teams = {teams}
                            setTeams = {setTeams}
                            teamError = {teamError}
                            setTeamError = {setTeamError}

                            season = {season}
                            setSeason = {setSeason}
                            seasons = {seasons}
                            setSeasons = {setSeasons}
                            seasonError = {seasonError}
                            setSeasonError = {setSeasonError}

                            searchStarted = {searchStarted}
                            setSearchStarted = {setSearchStarted}

                            games = {games}
                            setGames = {setGames}
                            gamesError = {gamesError}
                            setGamesError = {setGamesError}
                        />
                        <GamesPerTeamTable
                            team = {team}
                            setTeam = {setTeam}
                            teams = {teams}
                            setTeams = {setTeams}
                            teamError = {teamError}
                            setTeamError = {setTeamError}

                            season = {season}
                            setSeason = {setSeason}
                            seasons = {seasons}
                            setSeasons = {setSeasons}
                            seasonError = {seasonError}
                            setSeasonError = {setSeasonError}

                            searchStarted = {searchStarted}
                            setSearchStarted = {setSearchStarted}

                            games = {games}
                            setGames = {setGames}
                            gamesError = {gamesError}
                            setGamesError = {setGamesError}

                            setButtonClicked = {setButtonClicked}
                            setGameId = {setGameId}

                            setTeamClicked={props.setTeamClicked} 
                            setTeamName={props.setTeamName} 
                            teamClicked={props.teamClicked} 
                            teamName={props.teamName} 
                        />
                    </React.Fragment>
            }
        </React.Fragment>
    );
}

export default GamesPerTeam;
