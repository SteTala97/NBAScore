import React from 'react';
import './GamesTable.css';
import Team from '../visualizzazioneInLive/Team';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Info from '@mui/icons-material/Info';
import Button from '@mui/material/Button';

function GamesTable(props) {
    if(props.callToAPI) {
        // Se l'API remota non è disponibile
        if(props.error) {
            return (
                <p id="apiNotAvailable" className='text-center'>Service temporarily unavailable. Unable to connect to the remote API.</p>
            );
        }

        // Se non vi sono partite per la data selezionata
        if(props.games.length === 0) {
            return (
                <p id="noGames" className='text-center'>There are no games for this date</p>
            );
        }

        var notStartedGames = [];
        var finishedGames = [];

        // Separazione partite non iniziate, live e terminate
        props.games.forEach(element => {
            if(element.status === 1) {
                notStartedGames.push(element);
            }
            if(element.status === 3) {
                finishedGames.push(element);
            }
        });

        // Gestione della grafica per la tabella delle partite terminate
        var finished = null;
        if(finishedGames.length !== 0) {
            finished = <div>
                        <TableContainer>
                            <Table id='finishedGamesTable' className="finishedGamesTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table">
                            <TableHead>
                                <TableRow key="1">
                                <TableCell id="title-table-type" align="center"><strong>Status</strong></TableCell>
                                <TableCell id="title-table-teams" align="center" colSpan={2}><strong>Teams</strong></TableCell>
                                <TableCell id="title-table-points" align="center"><strong>Points</strong></TableCell>
                                <TableCell id="title-table-time" align="center"><strong>Time</strong></TableCell>
                                <TableCell id="title-table-time" align="center"><strong>Quarter</strong></TableCell>
                                <TableCell id="title-table-linescore" align="center"><strong>Points per Quarter</strong></TableCell>
                                <TableCell id="title-table-button" align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    {finishedGames.map(game => (
                                        <TableRow key={game.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell id="content-table-type" scope="row" align="center" sx={{width:'10%'}}>
                                            {game.type}
                                        </TableCell>
                                        <TableCell id="content-table-logo" align="right" sx={{width:'15%'}}>
                                            <img src={game.teamLogoHome} className="team-logo selectable-team" alt="Logo Team" onClick={() => { props.setTeamClicked(true); props.setTeamName(game.homeTeam) }}/>
                                            <br></br><br></br>
                                            <img src={game.teamLogoVisitors} className="team-logo selectable-team" alt="Logo Team" onClick={() => { props.setTeamClicked(true); props.setTeamName(game.visitorTeam) }}/>
                                        </TableCell>
                                        <TableCell id="content-table-name" align="left" sx={{width:'15%'}}>
                                            <Team name={game.homeTeam} setTeamName={props.setTeamName} setTeamClicked={props.setTeamClicked}/> 
                                            <br></br><br></br><br></br>
                                            <Team name={game.visitorTeam} setTeamName={props.setTeamName} setTeamClicked={props.setTeamClicked}/>
                                        </TableCell>
                                        <TableCell id="content-table-score" align="center" sx={{width:'10%'}}>
                                            {game.homeScore}
                                            <br></br><br></br><br></br>
                                            {game.visitorScore}
                                        </TableCell>
                                        <TableCell id="content-table-time" align="center" sx={{width:'10%'}}>{game.time}</TableCell>
                                        <TableCell id="content-table-quarter" align="center" sx={{width:'10%'}}>{game.currentPeriods} of {game.totalPeriods}</TableCell>
                                        <TableCell id="content-table-pointsPerQuarter" align="center" sx={{width:'15%'}}> 
                                            [
                                                {game.linescoreHome.map((scorePeriod) => " "+scorePeriod+" ")}
                                            ]
                                            <br></br><br></br><br></br>
                                            [
                                                {game.linescoreVisitors.map((scorePeriod) => " "+scorePeriod+" ")}
                                            ]                    
                                        </TableCell>
                                        <TableCell id="content-table-button" align="center" sx={{width:'10%'}}> 
                                            <div>
                                            <Button onClick={() => { props.setButtonGameClicked(true); props.setGame_Id(game.id) }} variant="contained" color="success" endIcon={<Info fontSize='medium'/>}>
                                                More Info
                                            </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                    <TableRow>
                                    </TableRow>
                                </TableBody>                    
                            </Table>
                        </TableContainer>
                       </div>
        }


        // Gestione della grafica per la tabella delle partite non iniziate
        var notStarted = null;
        if(notStartedGames.length !== 0) {
            notStarted = <div>
                          <TableContainer>
                            <Table id='notStartedGamesTable' className="notStartedGamesTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table">
                            <TableHead>
                                <TableRow key="1">
                                <TableCell id="title-table-type" align="center"><strong>Status</strong></TableCell>
                                <TableCell id="title-table-teams" align="center" colSpan={2}><strong>Teams</strong></TableCell>
                                <TableCell id="title-table-points" align="center"><strong>Points</strong></TableCell>
                                <TableCell id="title-table-time" align="center"><strong>Time</strong></TableCell>
                                <TableCell id="title-table-time" align="center"><strong>Quarter</strong></TableCell>
                                <TableCell id="title-table-linescore" align="center"><strong>Points per Quarter</strong></TableCell>
                                <TableCell id="title-table-button" align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    {notStartedGames.map(game => (
                                        <TableRow key={game.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell id="content-table-type" scope="row" align="center" sx={{width:'10%'}}>
                                            {game.type}
                                        </TableCell>
                                        <TableCell id="content-table-logo" align="right" sx={{width:'15%'}}>
                                            <img src={game.teamLogoHome} className="team-logo selectable-team" alt="Logo Team" onClick={() => { props.setTeamClicked(true); props.setTeamName(game.homeTeam) }}/>
                                            <br></br><br></br>
                                            <img src={game.teamLogoVisitors} className="team-logo selectable-team" alt="Logo Team" onClick={() => { props.setTeamClicked(true); props.setTeamName(game.visitorTeam) }}/>
                                        </TableCell>
                                        <TableCell id="content-table-name" align="left" sx={{width:'15%'}}>
                                            <Team name={game.homeTeam} setTeamName={props.setTeamName} setTeamClicked={props.setTeamClicked}/> 
                                            <br></br><br></br><br></br>
                                            <Team name={game.visitorTeam} setTeamName={props.setTeamName} setTeamClicked={props.setTeamClicked}/>
                                        </TableCell>
                                        <TableCell id="content-table-score" align="center" sx={{width:'10%'}}>
                                            -
                                            <br></br><br></br><br></br>
                                            -
                                        </TableCell>
                                        <TableCell id="content-table-time" align="center" sx={{width:'10%'}}>{game.time}</TableCell>
                                        <TableCell id="content-table-quarter" align="center" sx={{width:'10%'}}>{game.currentPeriods} of {game.totalPeriods}</TableCell>
                                        <TableCell id="content-table-pointsPerQuarter" align="center" sx={{width:'15%'}}> 
                                            {"[\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0]"}
                                            <br></br><br></br><br></br>
                                            {"[\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0]"}
                                        </TableCell>
                                        <TableCell id="content-table-button" align="center" sx={{width:'10%'}}> 
                                            <div>
                                            <Button onClick={() => { props.setButtonGameClicked(true); props.setGame_Id(game.id) }} variant="contained" color="success" endIcon={<Info fontSize='medium'/>}>
                                                More Info
                                            </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                    <TableRow>
                                    </TableRow>
                                </TableBody>                    
                            </Table>
                        </TableContainer>
                       </div>
        }

        return (
            <div className='gamesTables'>
                {finished}
                {notStarted}
            </div>
        );
    }
    else {
        return (null);
    }
}

export default GamesTable;