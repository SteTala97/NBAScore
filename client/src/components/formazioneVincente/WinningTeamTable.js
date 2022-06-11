import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// Visualization of the winning team
function WinningTeamTable(props) {
    // Research not started
    if(!props.searchStarted)
        return (null)
    // Research started and error in the result of the first API call
    else if(props.winningGamesError)
        return <p className="no-data-message"> Error: {props.winningGamesError.message} </p>
    // Research started and error in the result of the second API call
    else if(props.statisticsError)
        return <p className="no-data-message"> Error: {props.statisticsError.message} </p>
    // Research started and no error, but one of the two APIs returns an empty response
    else if(props.winningGames.length === 0 || props.statistics.length === 0)
        return <p className="no-data-message"> Results not available for these parameters </p>
    // Research started and no error, but the API of the players statistics contains wrong data
    // In fact, the initial team for every game is composed by 5 players, so if we have a length that isn't a multiple of 5 it means we have, for example, 6 or 4 players per team
    else if(props.statistics.length % 5 !== 0)
        return <p className="no-data-message"> Results not available for these parameters, because the remote API contains wrong data </p>
    // Research started, no error and length of statistics is fine
    else {
        // The players statistics API returns a list where every element contains the data for a certain player in a certain game
        // Consecutive elements refer to different players in the same game
        // Since in the server we kept only players with a position, it means that we have to have exactly 5 consecutive elements referring to the same game
        // If it's not, it means the API of the players statistics contains wrong data
        var checkGamesId = true;
        for(var i = 0; i < props.statistics.length; i = i + 5) {
            if(props.statistics[i].gameId !== props.statistics[i + 1].gameId ||
                props.statistics[i + 1].gameId !== props.statistics[i + 2].gameId ||
                props.statistics[i + 2].gameId !== props.statistics[i + 3].gameId ||
                props.statistics[i + 3].gameId !== props.statistics[i + 4].gameId)
                    checkGamesId = false;

            if(!checkGamesId)
                return <p className="no-data-message"> Results not available for these parameters, because the remote API contains wrong data </p>
        }

        // Dictionary where the key is the concatenation of the IDs of the players of the team and the value is the number of wins of that team
        var dictionary = {};

        for(i = 0; i < props.statistics.length; i = i + 5) {
            // Considering only the games where the team has won
            if(props.winningGames.includes(props.statistics[i].gameId)) {
                var key = props.statistics[i].playerId + " " +
                          props.statistics[i + 1].playerId + " " +
                          props.statistics[i + 2].playerId + " " +
                          props.statistics[i + 3].playerId + " " +
                          props.statistics[i + 4].playerId;

                var array = key.split(' ');
                var array_sorted = array.sort();
                key = array_sorted.join(' ');

                // Already in the dictionary, so I increment the value by one
                if(key in dictionary)
                    dictionary[key] = dictionary[key] + 1;
                // First time, so I set the value to one
                else
                    dictionary[key] = 1;
            }
        }

        var max_win = 0;
        var total_win = 0;
        var team_max_win = "";
        
        // Selecting the maximum number of wins (and which formation did it) and the total number of wins of the team
        for(key in dictionary) {
            total_win = total_win + dictionary[key];
            if(dictionary[key] > max_win) {
                max_win = dictionary[key];
                team_max_win = key;
            }
        }
        team_max_win = team_max_win.split(' ');

        var team_max_win_names = [];
        var toSearch = true;

        // Searching the name of the players of the winning team
        for(i = 0; i < team_max_win.length; i++) {
            toSearch = true;
            for(var j = 0; j < props.statistics.length && toSearch; j++) {
                if(team_max_win[i] == props.statistics[j].playerId) {
                    team_max_win_names.push(props.statistics[j].player);
                    toSearch = false;
                }
            }
        }

        return (
            <TableContainer align="center">
                <Table id="winningTeamTable" aria-label="simple table" cellSpacing="0" sx={{ height: "max-content", minWidth: 100, maxWidth: 300, marginTop: 6}}>
                    <TableHead>
                        <TableRow key="1">
                            <TableCell align="center"><strong>This is the most winning formation: it has won {max_win} games on a total of {total_win} games won by this team</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                        
                        <TableRow>
                            <TableCell>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => { props.setPlayerInfo(true); props.setPlayerId(team_max_win[0]) }}>
                                            <ListItemText align="center" primary={team_max_win_names[0]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => { props.setPlayerInfo(true); props.setPlayerId(team_max_win[1]) }}>
                                            <ListItemText align="center" primary={team_max_win_names[1]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => { props.setPlayerInfo(true); props.setPlayerId(team_max_win[2]) }}>
                                            <ListItemText align="center" primary={team_max_win_names[2]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => { props.setPlayerInfo(true); props.setPlayerId(team_max_win[3]) }}>
                                            <ListItemText align="center" primary={team_max_win_names[3]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => { props.setPlayerInfo(true); props.setPlayerId(team_max_win[4]) }}>
                                            <ListItemText align="center" primary={team_max_win_names[4]} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </TableCell>            
                        </TableRow>
                    </TableBody>                    
                </Table>
            </TableContainer>
        );
    }
}

export default WinningTeamTable;
