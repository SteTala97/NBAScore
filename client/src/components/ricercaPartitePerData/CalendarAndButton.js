import Calendar from 'react-calendar';
import './CalendarAndButton.css';
const axios = require('axios');
const moment = require('moment');

const CalendarAndButton = (props) => {

  function onChangeFunction(date) {
    props.setDate(date);
    props.setClickedButton(false);
    props.setButtonGameClicked(false);
  }

  function getGamesPerDate() {
    var formattedDate = moment(props.date).format('YYYY-MM-DD');
    axios.get("https://nbascore.herokuapp.com/gamesPerDate", {params: {date: formattedDate}})
      .then(function (response) {
        props.setGames(response.data);
        props.setError(null);
        props.setCallToAPI(true);
      })
      .catch(function (error) {
        props.setError(error);
        props.setCallToAPI(true);
      })
    props.setClickedButton(true);
  }

  return (
    <div className='myCalendar'>
      <div className='calendar-container'>
        <Calendar onChange={onChangeFunction} value={props.date}/>
      </div>
      <div className='button-container'>
       <button onClick={getGamesPerDate} id='chooseDate' className='chooseDate'>Choose Date</button>
      </div>
    </div>
  );
}

export default CalendarAndButton;