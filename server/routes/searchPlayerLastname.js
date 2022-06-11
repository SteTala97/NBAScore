var express = require('express');
var router = express.Router();
const axios = require('axios');
// import API Header
const config = require('../config/apiConfig.js');

router.get('/', async function(req, res) {
    var lastname= req.query.lastname;
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players/lastName/'+lastname,
        headers: config.apiHeaderV1
    };
       

    let pass = true;
    var players_info = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) { // API call failed
        pass = false;
        return error;
    });
    
    if(!pass){  // Manage error
        return res.status(400).send({message : players_info.message});
    }

    var data_to_send = [];
    players_info.api.players.forEach(element => {
        const data = {
            id: element.playerId,
            firstname: element.firstName,
            lastname: element.lastName,
            teamid: element.teamId,
            birth: element.dateOfBirth,
            //position: element.leagues.standard.pos
        };
        data_to_send.push(data);
    });

    res.send(data_to_send);
});


module.exports = router;