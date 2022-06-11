/*
    Test mode:       "let apiHeader = {...};"
    Production mode: "const apiHeader = {...};"
*/

let apiHeader = {
// const apiHeader = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': 'b3a1a9629bmsh37dc67ee03b7cedp1cf78bjsnc905da0d7b09',
    'Content-Type': 'application/json'
};

exports.apiHeader = apiHeader;
