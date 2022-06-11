import React from 'react';
import './GamesPerTeamTable.css';
import GamesPerTeamMatch from './GamesPerTeamMatch';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


// Table of games
function GamesPerTeamTable(props) {

    // Research not started
    if(!props.searchStarted)
        return (null)

    // Research started and error in the result of the first API call
    else if(props.gamesError)
        return <p className="no-data-message"> Error: {props.gamesError.message} </p>

    // Research started and no error, but the API returns an empty response
    else if(props.games.length === 0)
        return <p className="no-data-message"> Results not available for these parameters </p>

    // Research started and no errors
    else {
        return(
            <TableContainer className="GamesPerTeamTableContainer">
                <Table id="table" sx={{ minWidth: 650, maxWidth: 1000}} aria-label="simple table" className="GamesPerTeamTable">
                  <TableHead>
                    <TableRow key="1">
                      <TableCell id="title-table-type" align="center"><strong>Status</strong></TableCell>
                      <TableCell id="title-table-teams" align="center" colSpan={2}><strong>Teams</strong></TableCell>
                      <TableCell id="title-table-points" align="center"><strong>Points</strong></TableCell>
                      <TableCell id="title-table-time" align="center"><strong>Date</strong></TableCell>
                      <TableCell id="title-table-time" align="center"><strong>Quarter</strong></TableCell>
                      <TableCell id="title-table-linescore" align="center"><strong>Points per Quarter</strong></TableCell>
                      <TableCell id="title-table-button" align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {props.games.map((game, id) => (
                        <GamesPerTeamMatch key={game.id.toString()} data={game} setButtonClicked={props.setButtonClicked} setGame_Id={props.setGameId} setTeamClicked={props.setTeamClicked} setTeamName={props.setTeamName} teamClicked={props.teamClicked} teamName={props.teamName} ></GamesPerTeamMatch>
                      ))}
                      <TableRow>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
        );
    }
}

export default GamesPerTeamTable;
