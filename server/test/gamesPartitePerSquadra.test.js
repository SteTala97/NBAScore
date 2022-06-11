const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;
const request = chai.request;
const app = require('../app');
const config = require('../config/gameInfoHeaderConfig');


describe('Test API gamesPartitePerSquadra with proper data', function () {
    it('Valid HTTP status code and JSON data', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'b3a1a9629bmsh37dc67ee03b7cedp1cf78bjsnc905da0d7b09',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/gamesPartitePerSquadra')
            .query({
                season: '2021', // current season
                team: '1'       // Atlanta Hawks' id
            })
            .end((err, res) => {

                expect(res).have.status(200);

                expect(res.body).to.be.a('array');

                res.body.map(el => {
                    expect(el).have.property('id').that.is.a('number');
                    expect(el).have.property('typeGame').that.is.a('string');
                    expect(el).have.property('currentPeriods').that.is.a('number');
                    expect(el).have.property('totalPeriods').that.is.a('number');
                    expect(el).have.property('linescoreHome').that.is.a('array');
                    expect(el).have.property('linescoreVisitors').that.is.a('array');
                    expect(el).have.property('teamNameHome').that.is.a('string');
                    expect(el).have.property('teamLogoHome').that.is.a('string');
                    expect(el).have.property('teamNameVisitors').that.is.a('string');
                    expect(el).have.property('teamLogoVisitors').that.is.a('string');
                    expect(el).have.property('date').that.is.a('string');
                });

                done();
            });
    });
});


describe('Test API gamesPartitePerSquadra with invalid API KEY', function () {
    it('Returns error state code and message', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'THIS_IS_AND_INVALID_API_KEY',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/gamesPartitePerSquadra')
            .query({
                season: '2021', // current season
                team: '1'       // Atlanta Hawks' id
            })
            .end((err, res) => {
                expect(res).have.status(400);
                expect(res.body).have.property('message');
                expect(res.body.message).to.equal('Request failed with status code 403');

                done();
            });
    });
});