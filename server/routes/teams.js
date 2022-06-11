var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../config/gamesPerDateConfig.js');

// Check for empty JavaScript object
function isEmpty(obj) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
}

// Get Teams
router.get('/', async function(req, res) {
    // API Request
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/teams',
        headers: config.apiHeader
      };

    // Axios Check Variable
    var axiosError = false;

    // API Call
    var teams = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) {
        axiosError = true;
        return error;
    });

    // Check For Axios Error
    if(axiosError == true) {
        return res.status(400).send({message: teams.message});
    }

    // Check For API Response Errors
    if(!isEmpty(teams.errors)) {
        return res.status(400).send({message: "Attenzione, vi sono degli errori nella richiesta. Gli errori sono: " + JSON.stringify(teams.errors)});
    }

    // Everything works, so I construct the response from the API
    teamList = [];
    teams.response.forEach(element => {
        const team = {
            id: element.id,
            name: element.name,
            conference: element.leagues?.standard?.conference,
            nbaFranchise: element.nbaFranchise
        };

        // Keeping only NBA teams (in the remote API there are other teams which are not part of the NBA)
        // The team with 37 as id is not part of the NBA, but it has nbaFranchise=true, so I have to implement a special check (it's an error in the remote API data)
        if(team.nbaFranchise === true && team.id !== 37)
            teamList.push(team);
    });

    // Ordering the teams in alfhabetical order
    teamList.sort(function(a, b) {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })

    res.send(teamList);
});

module.exports = router;
