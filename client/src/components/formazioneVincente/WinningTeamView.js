import React, { useState } from 'react';
import WinningTeamSearch from './WinningTeamSearch.js';
import WinningTeamTable from './WinningTeamTable.js';
import PlayerInfo from '../visualizzazioneInformazioniGiocatore/PlayerInfo';

// Root page for the visualization of the winning team
function WinningTeamView () {
    const [team, setTeam] = useState("");
    const [teams, setTeams] = useState([]);
    const [teamError, setTeamError] = useState(null);

    const [season, setSeason] = useState(0);
    const [seasons, setSeasons] = useState([]);
    const [seasonError, setSeasonError] = useState(null);

    const [searchStarted, setSearchStarted] = useState(false);

    const [winningGames, setWinningGames] = useState([]);
    const [winningGamesError, setWinningGamesError] = useState(null);

    const [statistics, setStatistics] = useState([]);
    const [statisticsError, setStatisticsError] = useState(null);

    const [playerInfo, setPlayerInfo] = useState(false);
    const [playerId, setPlayerId] = useState(0);

    return (
        playerInfo === true ?
            <PlayerInfo playerId = {playerId} />
        :
        <React.Fragment>
            <WinningTeamSearch
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

                winningGames = {winningGames}
                setWinningGames = {setWinningGames}
                winningGamesError = {winningGamesError}
                setWinningGamesError = {setWinningGamesError}

                statistics = {statistics}
                setStatistics = {setStatistics}
                statisticsError = {statisticsError}
                setStatisticsError = {setStatisticsError}

                playerInfo = {playerInfo}
                setPlayerInfo = {setPlayerInfo}
                playerId = {playerId}
                setPlayerId = {setPlayerId}

             />
             <WinningTeamTable
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

                winningGames = {winningGames}
                setWinningGames = {setWinningGames}
                winningGamesError = {winningGamesError}
                setWinningGamesError = {setWinningGamesError}

                statistics = {statistics}
                setStatistics = {setStatistics}
                statisticsError = {statisticsError}
                setStatisticsError = {setStatisticsError}

                playerInfo = {playerInfo}
                setPlayerInfo = {setPlayerInfo}
                playerId = {playerId}
                setPlayerId = {setPlayerId}
             />
        </React.Fragment>
    );
}

export default WinningTeamView;