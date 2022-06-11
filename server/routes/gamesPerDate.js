var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../config/gamesPerDateConfig');

// Check for empty JavaScript object
function isEmpty(obj) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
}

// Get Games Per Date
router.get('/', async function(req, res) {
    // API Request
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/games',
        params: {date: req.query.date},
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
        return res.status(400).send({message: "Attenzione, vi sono degli errori nella richiesta. Gli errori sono: " + JSON.stringify(games.errors)});
    }

    // Everything works, so I construct the response from the API
    gameList = [];
    games.response.forEach(element => {
        const game = {
            id: element.id,
            homeTeam: element.teams.home.name,
            currentPeriods: element.periods.current,
            totalPeriods: element.periods.total,
            visitorTeam: element.teams.visitors.name,
            homeScore: element.scores.home.points,
            visitorScore: element.scores.visitors.points,
            status: element.status.short,
            type: element.status.long,
            linescoreHome: element.scores.home.linescore,
            linescoreVisitors: element.scores.visitors.linescore, //questo è un array composto [0:"36", 1:"25", 2:"36", 3: "24"]
            teamLogoHome: element.teams.home.logo,
            teamLogoVisitors: element.teams.visitors.logo,
            time: element.date.start.substring(11, 16)
        };
        gameList.push(game);
    });

    // Ordering the games according to the time
    gameList.sort(function(a, b) {
        if(a.time < b.time) { return -1; }
        if(a.time > b.time) { return 1; }
        return 0;
    })
    res.send(gameList);
});

module.exports = router;