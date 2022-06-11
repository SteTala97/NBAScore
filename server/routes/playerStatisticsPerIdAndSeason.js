var express = require('express');
var router = express.Router();
const axios = require('axios');


function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
}


router.get('/', async function(req, res) {
    
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
        params: {id: req.query.id, season: req.query.season},
        headers: {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        }
    };

    let pass = true;
    var team_info = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) { // API call failed
        pass = false;
        return error;
    });
    
    if(!pass){  // Manage error
        return res.status(400).send({message : team_info.message});
    }

    if(!isEmptyObject(team_info.errors)){ // Manage external API error
        return res.status(400).send("Attention! You made the following mistakes: \n " + JSON.stringify(team_info.errors));
    }


    var data_to_send = [];
    if (team_info.response.length > 0) {
        const data = {
            id :   team_info.response[0].team.id,
            name : team_info.response[0].team.name,
            logo : team_info.response[0].team.logo
        };
        data_to_send.push(data);
    }
    res.send(data_to_send);
});


module.exports = router;