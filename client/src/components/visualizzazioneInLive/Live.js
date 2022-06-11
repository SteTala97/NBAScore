import React, { useState, useEffect } from 'react';
import './Live.css';
import Match from './Match.js';
import GameInfo from '../visualizzazioneInformazioniPartita/GameInfo';
import TeamInfo from '../visualizzazioneInformazioniSquadra/TeamInfo';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MuiAlert from '@mui/material/Alert';


const axios = require('axios');

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CheckEmpty(props) {
  const empty = props.totalGames.length===0 ? true : false;
  if(props.callDone){
    if(empty){
      return <Alert id="alert-no-match" severity="warning">There are no games at the moment!</Alert>
    }else{
      return <TableGames id="table-games" totalGames = {props.totalGames} setTeamClicked = {props.setTeamClicked} teamClicked={props.teamClicked} setTeamName={props.setTeamName} teamName={props.teamName}></TableGames>
    }
  }else{
    return <React.Fragment></React.Fragment>
  }
}

function TableGames(props) {

  const [buttonClicked, setButtonClicked] = useState(false);
  const [game_Id, setGame_Id] = useState("");

  
  useEffect(() => {
    props.setTeamClicked(false);
    props.setTeamName("");
  }, []);

  return(
    <React.Fragment>
    {buttonClicked === true ?
      <GameInfo 
          id = {game_Id}
          teamName = {props.teamName}
          teamClicked = {props.teamClicked}
          setTeamClicked={props.setTeamClicked} 
          setTeamName={props.setTeamName}
      /> 
      :
      props.teamClicked === true ?
        <TeamInfo teamName = {props.teamName} />
        :
        <TableContainer className="LiveTableContainer">
          <Table id="table" sx={{ minWidth: 650, maxWidth: 1000}} aria-label="simple table" className="LiveTable">
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
                {props.totalGames.map((game) => (
                  <Match key={game.id.toString()} data={game} setButtonClicked={setButtonClicked} setGame_Id={setGame_Id} setTeamClicked={props.setTeamClicked} setTeamName={props.setTeamName} teamClicked={props.teamClicked} teamName={props.teamName}></Match>
                ))}
                <TableRow>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }
      </React.Fragment>
  );
}

export default class Live extends React.Component {

  componentDidMount(props) {
    this.interval = setInterval(() => this.tick(), 1000);
    this.fetch();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.setState(state => ({
      callDone: false
    }));
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
    if(this.state.seconds%120 === 0){
      this.fetch()
    }
  }

  fetch(){
    var context = this;

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    if(date < 10)
      date = '0'+date;
    
    if(month < 10)
      month = '0'+month;
    let str = year + '-' + month + '-' + date;
    axios.get("https://nbascore.herokuapp.com/gamesToday", { params: { data: str} })
      .then(function (response) {
        context.setState({
          games: response.data,
          callDone: true
        });
      })
      .catch(function (error) {
      })
  }

  constructor(props) {

    super(props);

    this.state = {
      games: [],
      seconds: parseInt(props.startTimeInSeconds, 10) || 0,
      callDone: false
    }
  }

  render() {
    return (
        <CheckEmpty totalGames = {this.state.games} callDone = {this.state.callDone} teamClicked={this.props.teamClicked} setTeamClicked = {this.props.setTeamClicked} teamName={this.props.teamName} setTeamName={this.props.setTeamName}></CheckEmpty>        
    );
  }

}