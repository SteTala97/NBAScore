var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../config/gamesPerDateConfig');
const { resetWatchers } = require('nodemon/lib/monitor/watch');

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
        return res.status(400).send({message: "Attenzione, vi sono degli errori nella richiesta. Gli errori sono: " + JSON.stringify(games.errors)});
    }

    // Everything works, so I construct the response from the API
    winningGameList = [];
    games.response.forEach(element => {
        const game = {
            id: element.id,
            homeId: element.teams.home.id,
            visitorId: element.teams.visitors.id,
            homeTeam: element.teams.home.name,
            visitorTeam: element.teams.visitors.name,
            homeScore: element.scores.home.points,
            visitorScore: element.scores.visitors.points,
            status: element.status.short,
            type: element.status.long
        };

        // Keeping only the finished games
        if(game.type == "Finished")
            // Keeping only the games where the team of interest has won
            if((game.homeId == req.query.team && game.homeScore > game.visitorScore) ||
                (game.visitorId == req.query.team && game.visitorScore > game.homeScore))
                    winningGameList.push(game);
    });

    // Keeping only the id of the games where the team has won
    winningGameIdList = [];
    for(let i = 0; i < winningGameList.length; i++)
        winningGameIdList.push(winningGameList[i].id);

    res.send(winningGameIdList);
});

module.exports = router;