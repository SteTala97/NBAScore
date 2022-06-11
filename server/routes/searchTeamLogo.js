var express = require('express');
var router = express.Router();
const axios = require('axios');
// import API Header
const config = require('../config/apiConfig.js');

router.get('/', async function(req, res) {
    var conference = req.query.conference;
    var options = {};
    if(conference !== "no"){
        options = {
            method: 'GET',
            url: 'https://api-nba-v1.p.rapidapi.com/teams',
            params: {conference: conference},
            headers: config.apiHeaderV2
            
        };
    }else{
        options = {
            method: 'GET',
            url: 'https://api-nba-v1.p.rapidapi.com/teams',
            headers: config.apiHeaderV2
          };
    }
       

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

    var data_to_send = [];
    if(conference !== "no"){
        team_info.response.forEach(element => {
            const data = {
                id: element?.id,
                name: element?.name,
                logo: element?.logo
            };
            data_to_send.push(data);
        });
    }else{
        team_info.response.forEach(element => {
            if(element?.nbaFranchise === true && element?.logo !== null){
                const data = {
                    id: element?.id,
                    name: element?.name,
                    nickname: element?.nickname,
                    code: element?.code,
                    logo: element?.logo,
                    city: element?.city
                };
                data_to_send.push(data);
            }
        });
    }

    res.send(data_to_send);
});


module.exports = router;