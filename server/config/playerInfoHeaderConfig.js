/*
    Test mode:       "let apiHeader = {...};"
    Production mode: "const apiHeader = {...};"
*/

let apiHeader = {
    // const apiHeader = {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
        'Content-Type': 'application/json'
    };
    
    exports.apiHeader = apiHeader;
    