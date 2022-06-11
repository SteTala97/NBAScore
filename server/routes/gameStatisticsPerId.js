var express = require('express');
var router = express.Router();
const axios = require('axios');



router.get('/', async function(req, res) {

    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/games/statistics',
        params: {id: req.query.id},
        headers: {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        }
    };
       

    let pass = true;
    var game_stats = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) { // API call failed
        pass = false;
        return error;
    });

    if(!pass){  // Manage error
        return res.status(400).send({message : game_stats.message});
    }


    var data_to_send = [];
    game_stats.response.forEach(element => {
        const data = {
            // General info
            teamImg  : element.team.logo,
            // Statistics
            teamFgm :      element.statistics[0].fgm,
            teamFga :      element.statistics[0].fga,
            teamFgp :      element.statistics[0].fgp,
            teamTpm :      element.statistics[0].tpm,
            teamTpa :      element.statistics[0].tpa,
            teamTpp :      element.statistics[0].tpp,
            teamFtm :      element.statistics[0].ftm,
            teamFta :      element.statistics[0].fta,
            teamFtp :      element.statistics[0].ftp,
            teamTotReb :   element.statistics[0].totReb,
            teamOffReb :   element.statistics[0].offReb,
            teamDefReb :   element.statistics[0].defReb,
            teamAssists :  element.statistics[0].assists,
            teamBlocks :   element.statistics[0].blocks,
            teamSteals :   element.statistics[0].steals,
            teamTurnovers: element.statistics[0].turnovers,
            teamPtsInPaint:element.statistics[0].pointsInPaint,
            teamFouls :    element.statistics[0].pFouls
        };
        data_to_send.push(data);
    });

    res.send(data_to_send);
});


module.exports = router;