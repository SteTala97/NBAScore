var express = require('express');
var router = express.Router();
const axios = require('axios');

// import API Header 
const config = require('../config/standingViewConfig.js');


/* GET teamInfo by team name and season */
router.get('/', async function(req, res) {
    // richiesta alla API NBA remota per ottenere le info della squadra tramite nome (non ottiene la lista dei giocatori)
    const optionsTeam = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/teams',
        params: {name: req.query.name},
        headers: config.apiHeader
    };

    // variabile di controllo chiamata axios
    let pass = true;
    
    // chiamata all'API NBA per ottenere le info della squadra con quel nome
    var teamInfo = await axios.request(optionsTeam).then(function(response) {
        return response.data;
    }).catch(function (error) {
        pass = false;
        return error;
    });
     
    // gestione errore axios
    if(pass == false){
        return res.status(400).send({message: teamInfo.message});
    }


    // richiesta alla API NBA remota per ottenere la lista dei giocatori della squadra nell'ultima stagione regitrata dalla API NBA remota 
    const optionsPlayers = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players',
        params: {team: teamInfo.response[0].id, season: req.query.season},
        headers: config.apiHeader
    };

    // reset variabile di controllo chiamata axios
    pass = true;
    
    // chiamata all'API NBA per ottenere l'elenco dei  giocatori della squadra in quella stagione
    var teamPlayers = await axios.request(optionsPlayers).then(function(response) {
        return response.data;
    }).catch(function (error) {
        pass = false;
        return error;
    });
     
    // gestione errore axios
    if(pass == false){
        return res.status(400).send({message: teamPlayers.message});
    }

    // considero solo i Giocatori della Standard League e che sono attualmente "attivi" nella squadra
    teamPlayers = teamPlayers.response.filter(function (el) {
        return el.leagues.hasOwnProperty('standard') &&
                el.leagues.standard.active;
    });


    // costruzione della risposta, in caso di successo della chiamata all'API NBA (prima metto le info della squadra e poi aggiungo l'elenco dei giocatori)
    var teamInfoToSend = {};
    teamInfo.response.forEach(element => {  
        teamInfoToSend = {
            teamId: element.id,
            teamLogo: element.logo,
            teamName: element.name,
            nickname: element.nickname,
            city: element.city,
            conference: element.leagues.standard.conference,
            division: element.leagues.standard.division,
            players: []
        };
    });
    // costruzione elenco giocatori con: id giocatore + nominativo giocatore
    teamPlayers.forEach(player => {
        teamInfoToSend.players.push({
            playerId: player.id,
            playerName: player.firstname + " " + player.lastname
        });
    });

    res.send(teamInfoToSend);
});


module.exports = router;