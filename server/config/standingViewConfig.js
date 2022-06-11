// header per le richieste API riguardo Standing View (messo a 'let' per fare i test. in produzione va messo a 'const')
let apiHeader = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
    'Content-Type': 'application/json'
};

exports.apiHeader = apiHeader;