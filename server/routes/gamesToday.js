var express = require('express');
var router = express.Router();
const axios = require('axios');

// import API Header
const config = require('../config/apiConfig.js');

// Check se un JSON è vuoto
function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
}


/* GET funzione per prendere tutte le partite che ci sono oggi*/
router.get('/', async function(req, res) {
    var gamesWellFormatted = [];

    // richiesta alla API NBA remota
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/games',
        params: {date: req.query.data},
        headers: config.apiHeader
    };
       
    //variabile di controllo chiamata axios
    let pass = true;
    
    // chiamata all'API NBA per ottenere le partite salvate nella var games (se ci sono errori vengono salvati in games)
    var games = await axios.request(options).then(function(response) {

        return response.data;
    }).catch(function (error) {
        pass = false;
        return error;
    });
    
    // gestione errore axios
    if(pass == false){
        return res.status(400).send(games.message);
    }

    // verifico se ci sono errori del response dell'API NBA
    if(!isEmptyObject(games.errors)){
        return res.status(400).send("Attention! You made the following mistakes: \n " + JSON.stringify(games.errors));
    }

    //costruzione della risposta, in caso di successo della chiamata all'API NBA
    games.response.forEach(element => {  
        const game = {
            id: element.id, //identificare la partita e da passare tra componenti ed altri
            typeGame: element.status.long, //Not Started, live, Finished
            currentPeriods: element.periods.current,
            totalPeriods: element.periods.total,
            linescoreHome: element.scores.home.linescore, //questo è un array composto [0:"36", 1:"25", 2:"36", 3: "24"]
            linescoreVisitors: element.scores.visitors.linescore, //questo è un array composto [0:"36", 1:"25", 2:"36", 3: "24"]
            teamScoreHome: element.scores.home.points,
            teamScoreVisitors: element.scores.visitors.points,
            teamNameHome: element.teams.home.name,
            teamLogoHome: element.teams.home.logo,
            teamCodeHome: element.teams.home.code,
            teamNameVisitors: element.teams.visitors.name,
            teamLogoVisitors: element.teams.visitors.logo,
            teamCodeVisitors: element.teams.visitors.code,
            time: element.date.start.substring(11, 16)
        };
        //viene aggiunta la partita formattata bene alla lista che sarà inviata al frontend
        gamesWellFormatted.push(game);
    });

    // Ordering the games according to the time
    gamesWellFormatted.sort(function(a, b) {
        if(a.time < b.time) { return -1; }
        if(a.time > b.time) { return 1; }
        return 0;
    })
    
    res.send(gamesWellFormatted);
});


module.exports = router;
