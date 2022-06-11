var express = require('express');
var router = express.Router();
const axios = require('axios');

// import API Header
const config = require('../config/standingViewConfig.js');


// Check se un JSON è vuoto
function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
}


/* GET standings by conference and season*/
router.get('/', async function(req, res) {
    var standingFormatted = [];

    // richiesta alla API NBA remota
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/standings',
        params: {league: 'standard', season: req.query.season, conference: req.query.conference},
        headers: config.apiHeader
    };

    //variabile di controllo chiamata axios
    let pass = true;
    
    // chiamata all'API NBA per ottenere le standings di quella conference e season
    var standing = await axios.request(options).then(function(response) {
        return response.data;
    }).catch(function (error) {
        pass = false;
        return error;
    });
    
    // gestione errore axios
    if(pass == false){
        return res.status(400).send({message: standing.message});
    }

    // verifico se ci sono errori del response dell'API NBA
    if(!isEmptyObject(standing.errors)){
        return res.status(400).send({message: "Attention! You made the following mistakes: \n " + JSON.stringify(standing.errors)});
    }

    // ordinamento della classifica dal migliore al peggiore
    standing = standing.response;
    standing.sort((a, b) => parseFloat(b.win.percentage) - parseFloat(a.win.percentage));

    //costruzione della risposta, in caso di successo della chiamata all'API NBA
    standing.forEach(element => {  
        const positionStanding = standing.map(function(e) { return e.team.name; }).indexOf(element.team.name)+1;

        const classified = {
            id: element.team.id,
            teamName: element.team.name,
            gamesPlayed: element.win.total + element.loss.total,
            wonGames: element.win.total,
            lostGames: element.loss.total,
            winPercentage: element.win.percentage,
            teamLogo: element.team.logo,
            positionInStanding: positionStanding,
            conference: req.query.conference,
            season: parseInt(req.query.season)
        };
        standingFormatted.push(classified);
    });

    res.send(standingFormatted);
});


module.exports = router;