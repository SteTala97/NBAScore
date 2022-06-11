import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Team from '../visualizzazioneInLive/Team';
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


const GameInfoGeneralInfo = (props) => {

    const info = props.gameInfo;

    if (isEmptyObject(info)) {
        return (<div></div>);
    }
    else {
        return(
            <TableContainer>
                <Table className="gameInfoTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table">
                    <TableHead>
                        <TableRow key="1">
                        <TableCell id="title-table-epmty"></TableCell>
                        <TableCell id="title-table-header" align="center"><strong>Home Team</strong></TableCell>
                        <TableCell id="title-table-header" align="center"><strong>Score</strong></TableCell>
                        <TableCell id="title-table-header" align="center"><strong>Visitor Team</strong></TableCell>
                        <TableCell id="title-table-empty" align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell id="content-table-logo" align="center" style={{  minWidth: 10,maxWidth:20}}>
                                <img src={info.homeImg} className="team-img selectable-team" alt="Logo Team"  onClick={() => { props.setTeamClicked(true); props.setTeamName(info.homeName) }}/>
                            </TableCell>
                            <TableCell id="content-table-name" align="center" sx={{width:'20%'}}>
                                <Team name={info.homeName} setTeamName={props.setTeamName} setTeamClicked={props.setTeamClicked} /> 
                            </TableCell>
                            <TableCell align="center" sx={{width:'20%'}}>{info.homeScore}&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;{info.visitorsScore}</TableCell>
                            <TableCell id="content-table-name" align="center" sx={{width:'20%'}}>
                                <Team name={info.visitorsName} setTeamName={props.setTeamName} setTeamClicked={props.setTeamClicked} /> 
                            </TableCell>
                            <TableCell id="content-table-logo" align="center" style={{  minWidth: 10,maxWidth:20}}>
                                <img src={info.visitorsImg} className="team-img selectable-team" alt="Logo Team" onClick={() => { props.setTeamClicked(true); props.setTeamName(info.visitorsName) }}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                        </TableRow>
                    </TableBody>
                </Table>
                <p className="text-arena">
                    Arena: 
                    {info.arena.name == null ? " info about the arena not currently available" : " " + info.arena.name + ", "} 
                    {info.arena.city == null ? "" : info.arena.city + " - "} 
                    {info.arena.state == null ? "" : info.arena.state}
                </p>
            </TableContainer>
        );
    }
};

export default GameInfoGeneralInfo;