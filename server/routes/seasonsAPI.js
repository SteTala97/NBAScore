var express = require('express');
var router = express.Router();
const axios = require('axios');

// import API Header
const config = require('../config/standingViewConfig.js');


/* GET all seasons */
router.get('/', async function(req, res) {
    var seasons = [];

    // richiesta alla API NBA remota
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/seasons',
        headers: config.apiHeader
    };
      
    //variabile di controllo chiamata axios
    let pass = true;
    
    // chiamata all'API NBA per ottenere le seasons
    var seasons = await axios.request(options).then(function(response) {
        return response.data.response;
    }).catch(function (error) {
        pass = false;
        return error;
    });

    // gestione errore axios
    if(pass == false){
        return res.status(400).send({message: seasons.message});
    }

    res.send(seasons);
});


module.exports = router;