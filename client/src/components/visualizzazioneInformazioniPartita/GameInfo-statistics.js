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
  

const GameInfoStatistics = (props) => {
    
    const stats = props.gameStats;

    if (isEmptyObject(stats)) {
        return (<p className="no-data-message">
                    Game statistics not currently available
                </p>);
    }
    else {
        // General info
        const visitorsImg  = stats[0].teamImg;
        const homeImg  = stats[1].teamImg;
        // Statistics
        const visitorsFgm =      stats[0].teamFgm;
        const visitorsFga =      stats[0].teamFga; 
        const visitorsFgp =      stats[0].teamFgp; 
        const visitorsTpm =      stats[0].teamTpm; 
        const visitorsTpa =      stats[0].teamTpa; 
        const visitorsTpp =      stats[0].teamTpp; 
        const visitorsFtm =      stats[0].teamFtm; 
        const visitorsFta =      stats[0].teamFta; 
        const visitorsFtp =      stats[0].teamFtp; 
        const visitorsTotReb =   stats[0].teamTotReb;
        const visitorsOffReb =   stats[0].teamOffReb; 
        const visitorsDefReb =   stats[0].teamDefReb; 
        const visitorsAssists =  stats[0].teamAssists;
        const visitorsBlocks  =  stats[0].teamBlocks;
        const visitorsSteals =   stats[0].teamSteals;
        const visitorsTurnovers= stats[0].teamTurnovers;
        const visitorsPtsInPaint=stats[0].teamPtsInPaint;
        const visitorsFouls =    stats[0].teamFouls;
        const homeFgm        = stats[1].teamFgm;
        const homeFga        = stats[1].teamFga;
        const homeFgp        = stats[1].teamFgp;
        const homeTpm        = stats[1].teamTpm;
        const homeTpa        = stats[1].teamTpa;
        const homeTpp        = stats[1].teamTpp;
        const homeFtm        = stats[1].teamFtm;
        const homeFta        = stats[1].teamFta;
        const homeFtp        = stats[1].teamFtp;
        const homeTotReb     = stats[1].teamTotReb;
        const homeOffReb     = stats[1].teamOffReb;
        const homeDefReb     = stats[1].teamDefReb;
        const homeAssists    = stats[1].teamAssists;
        const homeBlocks     = stats[1].teamBlocks;
        const homeSteals     = stats[1].teamSteals;
        const homeTurnovers  = stats[1].teamTurnovers;
        const homePtsInPaint = stats[1].teamPtsInPaint;
        const homeFouls      = stats[1].teamFouls;
        
        return(
            <TableContainer>
                <Table className="gameInfoStatisticsTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table">
                    <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img" sx={{width:'33%'}}>
                            <img src={homeImg} className="team-img" alt="Logo Team"/>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img" sx={{width:'33%'}}>
                            <strong>Statistics</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img" sx={{width:'33%'}}>
                            <img src={visitorsImg} className="team-img" alt="Logo Team"/>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeFgm}/{homeFga}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Field goals</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsFgm}/{visitorsFga}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeFgp}%
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>% Field goals</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsFgp}%
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeTpm}/{homeTpa}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>3 pointers</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsTpm}/{visitorsTpa}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeTpp}%
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>% 3 pointers</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsTpp}%
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeFtm}/{homeFta}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Free throws</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsFtm}/{visitorsFta}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeFtp}%
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>% Free throws</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsFtp}%
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeTotReb}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Total rebounds</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsTotReb}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeOffReb}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Offensive rebounds</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsOffReb}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeDefReb}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Defensive rebounds</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsDefReb}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeAssists}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Assists</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsAssists}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeBlocks}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Blocks</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsBlocks}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeSteals}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Steals</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsSteals}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeTurnovers}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Turnovers</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsTurnovers}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homePtsInPaint}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Points in the paint</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsPtsInPaint}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell align="center" id="content-table-team-img">
                            {homeFouls}
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            <strong>Personal fouls</strong>
                        </TableCell>
                        <TableCell align="center" id="content-table-team-img">
                            {visitorsFouls}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};

export default GameInfoStatistics;