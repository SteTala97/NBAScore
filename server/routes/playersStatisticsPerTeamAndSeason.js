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

// Get Players Statistics Per Team And Season
router.get('/', async function(req, res) {
    // API Request
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
        params: {season: req.query.season, team: req.query.team},
        headers: config.apiHeader
      };

    // Axios Check Variable
    var axiosError = false;

    // API Call
    var statistics = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) {
        axiosError = true;
        return error;
    });

    // Check For Axios Error
    if(axiosError == true) {
        return res.status(400).send({message: statistics.message});
    }

    // Check For API Response Errors
    if(!isEmpty(statistics.errors)) {
        return res.status(400).send({message: "Attenzione, vi sono degli errori nella richiesta. Gli errori sono: " + JSON.stringify(statistics.errors)});
    }

    // Everything works, so I construct the response from the API
    statisticList = [];
    statistics.response.forEach(element => {
        const statistic = {
            playerId: element.player.id,
            player: element.player.firstname + " " + element.player.lastname,
            gameId: element.game.id,
            pos: element.pos
        };

        // Keeping only statistics where player has a position. It means that he was in the starting team
        if(statistic.pos != null)
            statisticList.push(statistic);
    });

    res.send(statisticList);
});

module.exports = router;