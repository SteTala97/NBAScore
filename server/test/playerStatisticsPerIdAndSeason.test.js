const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;
const request = chai.request;
const app = require('../app');
const config = require('../config/playerInfoHeaderConfig.js');


describe('Test API playerStatisticsPerIdAndSeason with proper player and season data', function () {
    it('Valid HTTP status code and JSON data', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'b3a1a9629bmsh37dc67ee03b7cedp1cf78bjsnc905da0d7b09',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/playerStats')
            .query({
                id: '265', // LeBron James' id
                season: '2021' // current season
            })
            .end((err, res) => {

                expect(res).have.status(200);
                expect(res.body).to.be.a('array');

                res.body.map(el => {
                    expect(el).have.property('id').that.is.a('number');
                    expect(el).have.property('name').that.is.a('string');
                    expect(el).have.property('logo').that.is.a('string');
                });

                done();
            });
    });
});


describe('Test API playerStatisticsPerIdAndSeason with valid season but invalid player id', function () {
    it('Valid HTTP status code and JSON data results in empty array', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'b3a1a9629bmsh37dc67ee03b7cedp1cf78bjsnc905da0d7b09',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/playerStats')
            .query({
                id: '9999999999',// invalid player id
                season: '2021' // current season
            })
            .end((err, res) => {

                expect(res).have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.eql([]);

                done();
            });
    });
});


// describe('Test API playerStatisticsPerIdAndSeason with valid player id but invalid season', function () {
//     it('Valid HTTP status code and JSON data results in empty array', function (done) {
//         config.apiHeader = {
//             'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
//             'X-RapidAPI-Key': 'b3a1a9629bmsh37dc67ee03b7cedp1cf78bjsnc905da0d7b09',
//             'Content-Type': 'application/json'
//         };
//         request(app)
//             .get('/playerStats')
//             .query({
//                 id: '265',// LeBron James' id
//                 season: '9999999999' // invalid season
//             })
//             .end((err, res) => {

//                 expect(res).have.status(200);
//                 expect(res.body).to.be.a('array');
//                 expect(res.body).to.eql([]);

//                 done();
//             });
//     });
// });
