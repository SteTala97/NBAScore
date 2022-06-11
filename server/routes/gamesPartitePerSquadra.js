var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../config/gameInfoHeaderConfig');

// Check for empty JavaScript object
function isEmpty(obj) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
}

// Get Games Per Team And Season
router.get('/', async function(req, res) {
    // API Request
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/games',
        params: {season: req.query.season, team: req.query.team},
        headers: config.apiHeader
      };

    // Axios Check Variable
    var axiosError = false;

    // API Call
    var games = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) {
        axiosError = true;
        return error;
    });

    // Check For Axios Error
    if(axiosError == true) {
        return res.status(400).send({message: games.message});
    }

    // Check For API Response Errors
    if(!isEmpty(games.errors)) {
        return res.status(400).send({message: "ERROR! Message: " + JSON.stringify(games.errors)});
    }


    var gamesList = [];
    games.response.forEach(element => {
        const game = {
            id: element.id,
            typeGame: element.status.long,
            currentPeriods: element.periods.current,
            totalPeriods: element.periods.total,
            linescoreHome: element.scores.home.linescore,
            linescoreVisitors: element.scores.visitors.linescore,
            teamScoreHome: element.scores.home.points,
            teamScoreVisitors: element.scores.visitors.points,
            teamNameHome: element.teams.home.name,
            teamLogoHome: element.teams.home.logo,
            teamNameVisitors: element.teams.visitors.name,
            teamLogoVisitors: element.teams.visitors.logo,
            date: element.date.start.substring(0, 10)
        };
        gamesList.push(game);
    });

    // Ordering the games according to the date (from most recent to latest)
    gamesList.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    })

    res.send(gamesList);
});

module.exports = router;
