// header per le richieste API riguardo Standing View (messo a 'let' per fare i test. in produzione va messo a 'const')
let apiHeader = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': 'c433d9b21amsh0f530d5454ead50p132030jsn0745f1394e6e',
    'Content-Type': 'application/json'
};

let apiHeaderV1 = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': '6e3e2d7fd8msh2828921081e594ap193498jsnd0c99b3bc9f4',
};

let apiHeaderV2 = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': 'c433d9b21amsh0f530d5454ead50p132030jsn0745f1394e6e'
};

exports.apiHeaderV1 = apiHeaderV1;
exports.apiHeaderV2 = apiHeaderV2;
exports.apiHeader = apiHeader;
