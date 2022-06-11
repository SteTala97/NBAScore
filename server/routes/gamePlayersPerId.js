var express = require('express');
var router = express.Router();
const axios = require('axios');



router.get('/', async function(req, res) {

    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
        params: {game: req.query.id},
        headers: {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        }
    };
       

    let pass = true;
    var players_stats = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) { // API call failed
        pass = false;
        return error;
    });
    
    if(!pass){  // Manage error
        return res.status(400).send({message : players_stats.message});
    }


    var data_to_send = [];
    players_stats.response.forEach(element => {
        const data = {
            teamName :  element.team.name,
            firstName : element.player.firstname,
            lastName :  element.player.lastname,
            id :        element.player.id,
            min :       element.min,
            totReb :    element.totReb,
            assists :   element.assists,
            points :    element.points,
            pos :       element.pos
        };
        data_to_send.push(data);
    });

    res.send(data_to_send);
});


module.exports = router;