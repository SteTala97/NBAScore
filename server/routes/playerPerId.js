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
        url: 'https://api-nba-v1.p.rapidapi.com/players',
        params: {id: req.query.id},
        headers: {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'b3a1a9629bmsh37dc67ee03b7cedp1cf78bjsnc905da0d7b09',
            'Content-Type': 'application/json'
        }
    };


    let pass = true;
    var player_info = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) { // API call failed
        pass = false;
        return error;
    });
    
    if(!pass){  // Manage axios error 
        return res.status(400).send({message : player_info.message});
    }

    if(!isEmptyObject(player_info.errors)){ // Manage external API error
        return res.status(400).send("Attention! You made the following mistakes: \n " + JSON.stringify(player_info.errors));
    }


    var data_to_send = [];
    player_info.response.forEach(element => {
        const data = {
            firstName : element.firstname,
            lastName :  element.lastname,
            birthday :  element.birth.date,
            country :   element.birth.country,
            college :   element.college,
            nba_start : element.nba.start,
            height :    element.height.meters,
            weight :    element.weight.kilograms,
            jersey :    element?.leagues?.standard?.jersey,
            pos :       element?.leagues?.standard?.pos
        };
        data_to_send.push(data);
    });

    res.send(data_to_send);
});


module.exports = router;