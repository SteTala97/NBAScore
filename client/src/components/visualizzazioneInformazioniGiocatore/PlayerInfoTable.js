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

function calculateAge(date) {
    var ageDifMs = Date.now() - new Date(date);
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  }


const PlayerInfoTable = (props) => {

    const info = props.playerInfo;
    const team = props.teamInfo;
    
    if (isEmptyObject(info)) {
        return (<div className='no-info-message'>Currently there is no info available about the selected player</div>);
    }
    else {
        return(
            <TableContainer>
                <Table className="playerTable" sx={{ minWidth: 400, maxWidth: 550}}  aria-label="simple table">
                    <TableHead>
                        <TableRow key="1">
                            <TableCell className='title' id="title-table-header" align="center" colSpan={2} style={{fontSize:"x-large"}}>
                                <strong>{info.firstName} {info.lastName}</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell id="content-table-info" align="left">
                                🌎 Country: <strong>{info.country === null ? "NA" : info.country}</strong>
                                <br></br>
                                📆 Birth date: <strong>{info.birthday === null ? "NA" : info.birthday}</strong>
                                <br></br>
                                ⏳&nbsp; Age: <strong>{info.birthday === null ? "NA" : calculateAge(info.birthday)}</strong>
                                <br></br>
                                📏 Height: <strong>{info.height === null ? "NA" : info.height.toString().concat('m')}</strong>
                                <br></br>
                                💪🏽 Weight: <strong>{info.weight === null ? "NA" : info.weight.toString().concat('Kg')}</strong>
                                <br></br>
                                #️⃣&nbsp; Jersey number: <strong>{info.jersey === null ? "NA" : info.jersey}</strong>
                                <br></br>
                                ⛹🏽‍♂️&nbsp; Role: <strong>{info.pos === null ? "NA" : info.pos}</strong>
                                <br></br>
                                📅 NBA debut: <strong>{info.nba_start === 0 ? "NA" : info.nba_start}</strong>
                                <br></br>
                                🎓 College: <strong>{info.college === null ? "NA" : info.college}</strong>
                            </TableCell>
                            <TableCell id="content-table-info" className='selectable-team' align="center" onClick={() => {
                                if(!isEmptyObject(team)){
                                    props.setViewteamInfo(true); 
                                }
                            }}
                            >
                                <img src={isEmptyObject(team) ? '' : team.logo === null ? '' : team.logo} className="player-team-logo" alt="Team Logo"></img>
                                <br></br>
                                🏀 Team: <strong>{isEmptyObject(team) ? 'NA' : team.name === null ? "NA" : team.name}</strong>
                            </TableCell>
                        </TableRow>
                        <TableRow>{/* This is an */}
                        </TableRow>{/* empty row */}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};

export default PlayerInfoTable;