const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiSorted = require('chai-sorted');
chai.use(chaiHttp);
chai.use(chaiSorted);

var expect = chai.expect;
const request = chai.request;

const app = require('../app');

const config = require('../config/gamesPerDateConfig');

describe('Test API playersStatisticsPerTeamAndSeason corretto', function () {
    it('Risponde con codice di stato HTTP valido e dati in formato JSON', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/playersStatisticsPerTeamAndSeason')
            .query({
                season: '2021',
                team: '1'
            })
            .end((err, res) => {
                expect(res).have.status(200);
                expect(res.body).to.be.a('array');
                res.body.map(el => {
                    expect(el).have.property('playerId').that.is.a('number');
                    expect(el).have.property('player').that.is.a('string');
                    expect(el).have.property('gameId').that.is.a('number');
                    expect(el).have.property('pos').that.is.a('string');
                });

                done();
            })
    }).timeout(5000);
});

describe('Test API playersStatisticsPerTeamAndSeason con team non esistente', function () {
    it('Risponde con codice di stato HTTP valido e un array vuoto', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/playersStatisticsPerTeamAndSeason')
            .query({
                season: '2021',
                team: '1000'
            })
            .end((err, res) => {
                expect(res).have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.eql([]);

                done();
            });
    });
});

describe('Test API playersStatisticsPerTeamAndSeason con stagione non esistente', function () {
    it('Risponde con codice di stato HTTP valido e un array vuoto', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/playersStatisticsPerTeamAndSeason')
            .query({
                season: '2025',
                team: '1'
            })
            .end((err, res) => {
                expect(res).have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.eql([]);

                done();
            });
    });
});

describe('Test API playersStatisticsPerTeamAndSeason con l\'header sbagliato (API KEY sbagliata)', function () {
    it('Lancia un errore se chiamata con l\'header sbagliato (API KEY sbagliata)', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/playersStatisticsPerTeamAndSeason')
            .query({
                season: '2021',
                team: '1'
            })
            .end((err, res) => {
                expect(res).have.status(400);
                expect(res.body).have.property('message');
                expect(res.body.message).to.equal('Request failed with status code 403');

                done();
            });
    });
});