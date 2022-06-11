import React from 'react'

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


export default class GamesPerTeamMatch extends React.Component {

    constructor(props) {

        super(props);
    
        this.state = {
            id:                null,
            typeGame:            "",
            currentPeriods:    null,
            totalPeriods:      null,
            linescoreHome:     null,
            linescoreVisitors: null,
            teamScoreHome:     null,
            teamScoreVisitors: null,
            teamNameHome:      null,
            teamLogoHome:      null,
            teamNameVisitors:  null,
            teamLogoVisitors:  null,
            date:              null
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
                    <div id="content-team-name" className='team-text selectable-team' onClick={() => { this.props.setTeamClicked(true); this.props.setTeamName(this.props.data.teamNameHome) }}> 
                        {this.props.data===null ? this.state.teamNameHome : this.props.data.teamNameHome}
                    </div>
                    <br></br><br></br><br></br>
                    <div id="content-team-name" className='team-text selectable-team' onClick={() => { this.props.setTeamClicked(true); this.props.setTeamName(this.props.data.teamNameVisitors) }}> 
                        {this.props.data===null ? this.state.teamNameVisitors : this.props.data.teamNameVisitors}
                    </div>
                </TableCell>
                <TableCell id="content-table-score" align="center" sx={{width:'10%'}}>
                    {this.props.data===null || this.props.data.teamScoreHome===null ? " - " : this.props.data.teamScoreHome}
                    <br></br><br></br><br></br>
                    {this.props.data===null || this.props.data.teamScoreVisitors===null ? " - " : this.props.data.teamScoreVisitors}
                </TableCell>
                <TableCell id="content-table-date" align="center" sx={{width:'15%'}}>{this.props.data === null ? this.state.date : this.props.data.date}</TableCell>
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
                    <Button onClick={() => { this.props.setButtonClicked(true); this.props.setGame_Id(this.props.data.id) }} variant="contained" color="success" endIcon={<Info fontSize='medium'/>} className="more-info-button"> 
                        More Info
                    </Button>
                    </div>
                </TableCell>
            </TableRow>
        );
    
    }
    
}

