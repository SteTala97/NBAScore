import React from 'react'
import './Match.css'
import Team from './Team.js';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Info from '@mui/icons-material/Info';
import Button from '@mui/material/Button';

function Progress(props) {
    const type = props.typeGame;
    if(type === "In Play"){
        return <LinearProgress color="success" />
    }else{
        return ""
    }
}

export default class Match extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            id: null, //identificare la partita e da passare tra componenti ed altri
            typeGame: "", //Not Started, live, Finished
            currentPeriods: null,
            totalPeriods: null,
            linescoreHome: null, //questo è un array composto [0:"36", 1:"25", 2:"36", 3: "24"]
            linescoreVisitors: null, //questo è un array composto [0:"36", 1:"25", 2:"36", 3: "24"]
            teamScoreHome: null,
            teamScoreVisitors: null,
            teamNameHome: null,
            teamLogoHome: null,
            teamCodeHome: null,
            teamNameVisitors: null,
            teamLogoVisitors: null,
            teamCodeVisitors: null,
            time: null
        }
    }

    render() {

        return (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell id="content-table-type" component="th" scope="row" align="center" sx={{width:'10%'}}>
                    {this.props.data === null ? this.state.typeGame : this.props.data.typeGame}
                    <Box sx={{ width: '10vh' }}>
                    <Progress typeGame = {this.props.data===null ? this.state.typeGame : this.props.data.typeGame}></Progress>
                    </Box>
                </TableCell>
                <TableCell id="content-table-logo" align="right" sx={{width:'15%'}}>
                    <img src={this.props.data===null ? this.state.teamLogoHome : this.props.data.teamLogoHome} className="team-logo selectable-team" alt="Logo Team" onClick={() => { this.props.setTeamClicked(true); this.props.setTeamName(this.props.data.teamNameHome) }}/>
                    <br></br><br></br>
                    <img src={this.props.data===null ? this.state.teamLogoVisitors : this.props.data.teamLogoVisitors} className="team-logo selectable-team" alt="Logo Team" onClick={() => { this.props.setTeamClicked(true); this.props.setTeamName(this.props.data.teamNameVisitors) }}/>
                </TableCell>
                <TableCell id="content-table-name" align="left" sx={{width:'15%'}}>
                    <Team name={this.props.data===null ? this.state.teamNameHome : this.props.data.teamNameHome} setTeamName={this.props.setTeamName} setTeamClicked={this.props.setTeamClicked} /> 
                    <br></br><br></br><br></br>
                    <Team name={this.props.data===null ? this.state.teamNameVisitors : this.props.data.teamNameVisitors} setTeamName={this.props.setTeamName} setTeamClicked={this.props.setTeamClicked} />
                </TableCell>
                <TableCell id="content-table-score" align="center" sx={{width:'10%'}}> 
                    {this.props.data===null || this.props.data.teamScoreHome===null ? " - " : this.props.data.teamScoreHome}
                    <br></br><br></br><br></br>
                    {this.props.data===null || this.props.data.teamScoreVisitors===null ? " - " : this.props.data.teamScoreVisitors}
                </TableCell>
                <TableCell id="content-table-time" align="center" sx={{width:'10%'}}>{this.props.data === null ? this.state.time : this.props.data.time}</TableCell>
                <TableCell id="content-table-quarter" align="center" sx={{width:'10%'}}>{this.props.data===null ? this.state.currentPeriods : this.props.data.currentPeriods} of {this.props.data===null ? this.state.totalPeriods : this.props.data.totalPeriods}</TableCell>
                <TableCell id="content-table-pointsPerQuarter" align="center" sx={{width:'15%'}}> 
                    [
                    {this.props.data===null || this.props.data.typeGame==="Scheduled" || this.props.data.linescoreHome.length===0 ? "\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0" : this.props.data.linescoreHome.map(
                        (scorePeriod) => " "+scorePeriod+" ")}
                    ]
                    <br></br><br></br><br></br>
                    [
                    {this.props.data===null || this.props.data.typeGame==="Scheduled" || this.props.data.linescoreVisitors.length===0 ? "\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0" : this.props.data.linescoreVisitors.map(
                        (scorePeriod) => " "+scorePeriod+" ")}
                    ]
                </TableCell>
                <TableCell id="content-table-button" align="center" sx={{width:'10%'}}> 
                    <div>
                    <Button onClick={() => {this.props.setButtonClicked(true); this.props.setGame_Id(this.props.data.id) }} variant="contained" color="success" endIcon={<Info fontSize='medium'/>} className="more-info-button"> 
                        More Info
                    </Button>
                    </div>
                </TableCell>
            </TableRow>
        );
    
    }
    
}

