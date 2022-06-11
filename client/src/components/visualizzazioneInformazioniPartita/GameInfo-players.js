import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}


const GameInfoPlayers = (props) => {

  const players_stats = props.playersStats;
  // General game informations; this comes from the previous API call
  const prev_response = props.data;  

  if (isEmptyObject(players_stats)) {
    return (<p className="no-data-message">
              Players statistics not currently available
            </p>);
  }
  else {
    // Set the correct team logo to display, weather it's the visitors' or home's
    let img = "";
    if (props.team === "home") {
      img = prev_response.homeImg;
    }
    else if (props.team === "visitors") {
      img = prev_response.visitorsImg;
    }
    else {
      throw new Error("Unspecified field 'team' in GameInfoPlayers props!")
    }
    const team_img = img;


    // Select only the players to display (visitors or home)
    let players_array = [];
    for (const player of players_stats) {
      if (props.team === "home" && player.teamName === props.data.homeName) {
        players_array.push(player);
      }
      else if (props.team === "visitors" && player.teamName === props.data.visitorsName) {
        players_array.push(player);
      }
    }
    const players = players_array;


    return(
        <TableContainer>
          <Table className="gameInfoPlayersTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table">
              <TableHead>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell colspan="7" align="center" id="content-table-team-img">
                        <img src={team_img} className="team-img" alt="Logo Team"/>
                      </TableCell>
                  </TableRow>
              </TableHead>
              <TableBody key="table-key">
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell id="content-table-header" align="center" style={{  minWidth: 10,maxWidth:20}}>
                        <strong>Player</strong>
                      </TableCell>
                      <TableCell id="content-table-header" align="center" style={{  minWidth: 10,maxWidth:20}}>
                        <strong>Role</strong>
                      </TableCell>
                      <TableCell id="content-table-header" align="center" style={{  minWidth: 10,maxWidth:20}}>
                        <strong>Min</strong> ⏱ 
                      </TableCell>
                      <TableCell id="content-table-header" align="center" style={{  minWidth: 10,maxWidth:20}}>
                       <strong>Pts</strong> 🏀
                      </TableCell>
                      <TableCell id="content-table-header" align="center" style={{  minWidth: 10,maxWidth:20}}>
                        <strong>Reb</strong> 🤾🏽
                      </TableCell>
                      <TableCell id="content-table-header" align="center" style={{  minWidth: 10,maxWidth:20}}>
                       <strong>Ast</strong> ⛹🏽‍♂️
                      </TableCell>
                  </TableRow>
                  {players.map((val, id) => (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell id="content-table-info" className='selectable-team' align="center" style={{  minWidth: 10,maxWidth:20}} onClick={() => {props.setPlayerId(val.id); props.setPlayerInfo(true)}}>
                        {val.firstName} {val.lastName}
                      </TableCell>
                      <TableCell id="content-table-info" align="center" style={{  minWidth: 10,maxWidth:20}}>
                        {val.pos === null ? "-" : val.pos}
                      </TableCell>
                      <TableCell id="content-table-info" align="center" style={{  minWidth: 10,maxWidth:20}}>
                        {val.min === null ? "0:00" : val.min}
                      </TableCell>
                      <TableCell id="content-table-info" align="center" style={{  minWidth: 10,maxWidth:20}}>
                       {val.points === null ? "0" : val.points}
                      </TableCell>
                      <TableCell id="content-table-info" align="center" style={{  minWidth: 10,maxWidth:20}}>
                        {val.totReb === null ? "0" : val.totReb}
                      </TableCell>
                      <TableCell id="content-table-info" align="center" style={{  minWidth: 10,maxWidth:20}}>
                       {val.assists === null ? "0" : val.assists}
                      </TableCell>
                  </TableRow>
                  ))}
                  <TableRow>
                  </TableRow>
              </TableBody>
          </Table>
      </TableContainer>
    );
  }
};

export default GameInfoPlayers;