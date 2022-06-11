// header per le richieste API riguardo Standing View (messo a 'let' per fare i test. in produzione va messo a 'const')
let apiHeader = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': '346d7c1683msh1ae24e3f1285f19p1f8468jsnd09122b2ee62',
    'Content-Type': 'application/json'
};

exports.apiHeader = apiHeader;