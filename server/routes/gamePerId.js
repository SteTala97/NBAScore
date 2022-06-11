var express = require('express');
var router = express.Router();
const axios = require('axios');



router.get('/', async function(req, res) {

    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/games',
        params: {id: req.query.id},
        headers: {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        }
    };
       

    let pass = true;
    var game_info = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) { // API call failed
        pass = false;
        return error;
    });
    
    if(!pass){  // Manage error
        return res.status(400).send({message : game_info.message});
    }

    
    var data_to_send = [];
    game_info.response.forEach(element => {
        const data = {
            id: element.id,
            visitorsName: element.teams.visitors.name,
            visitorsImg: element.teams.visitors.logo,
            visitorsScore: element.scores.visitors.points,
            homeName: element.teams.home.name,
            homeImg: element.teams.home.logo,
            homeScore: element.scores.home.points,
            arena: element.arena
        };
        data_to_send.push(data);
    });

    res.send(data_to_send);
});


module.exports = router;