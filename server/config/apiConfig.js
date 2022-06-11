// header per le richieste API riguardo Standing View (messo a 'let' per fare i test. in produzione va messo a 'const')
let apiHeader = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
    'Content-Type': 'application/json'
};

let apiHeaderV1 = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
};

let apiHeaderV2 = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE'
};

exports.apiHeaderV1 = apiHeaderV1;
exports.apiHeaderV2 = apiHeaderV2;
exports.apiHeader = apiHeader;
