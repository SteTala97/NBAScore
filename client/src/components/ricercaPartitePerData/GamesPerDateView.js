import React, { useState, useEffect } from 'react';
import CalendarAndButton from './CalendarAndButton';
import GamesTable from './GamesTable';
import Live from '../visualizzazioneInLive/Live';
import GameInfo from '../visualizzazioneInformazioniPartita/GameInfo';
import TeamInfo from '../visualizzazioneInformazioniSquadra/TeamInfo';

const moment = require('moment');

function GamesPerDateView (props) {
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState(null);
    const [games, setGames] = useState([]);
    const [callToAPI, setCallToAPI] = useState(false);
    const [clickedButton, setClickedButton] = useState(false);

    useEffect(() => {
        props.setTeamClicked(false);
        props.setTeamName("");
    }, []);

    let ts = Date.now();
    let date_ob = new Date(ts);
    let dateDay = date_ob.getDate();
    let monthDay = date_ob.getMonth() + 1;
    let yearDay = date_ob.getFullYear();
    if(dateDay < 10)
      dateDay = '0'+dateDay;
    
    if(monthDay < 10)
      monthDay = '0'+monthDay;
    let str = yearDay + '-' + monthDay + '-' + dateDay;
    var formattedDate = moment(date).format('YYYY-MM-DD');

    const [buttonGameClicked, setButtonGameClicked] = useState(false);
    const [game_Id, setGame_Id] = useState("");

    return (
        props.teamClicked === true ?
        <TeamInfo teamName={props.teamName}/>
        :
        <React.Fragment>
            <CalendarAndButton
                date = {date}
                setDate = {setDate}
                error = {error}
                setError = {setError}
                games = {games}
                setGames = {setGames}
                callToAPI = {callToAPI}
                setCallToAPI = {setCallToAPI}
                setClickedButton = {setClickedButton}
                setButtonGameClicked = {setButtonGameClicked}
             />
             {clickedButton?
                buttonGameClicked?
                <GameInfo 
                    id = {game_Id}
                    teamName = {props.teamName}
                    teamClicked = {props.teamClicked}
                    setTeamClicked={props.setTeamClicked} 
                    setTeamName={props.setTeamName}
                /> 
                :
                formattedDate === str?
                    <Live teamClicked={props.teamClicked} setTeamClicked={props.setTeamClicked} teamName={props.teamName} setTeamName={props.setTeamName}/> 
                    :
                    <GamesTable
                        date = {date}
                        setDate = {setDate}
                        error = {error}
                        setError = {setError}
                        games = {games}
                        setGames = {setGames}
                        callToAPI = {callToAPI}
                        setCallToAPI = {setCallToAPI}
                        setButtonGameClicked={setButtonGameClicked} 
                        setGame_Id={setGame_Id}
                        setTeamClicked={props.setTeamClicked}
                        setTeamName={props.setTeamName}
                    />
                :
                <React.Fragment></React.Fragment>
             }
        </React.Fragment>
    );
}

export default GamesPerDateView;