const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiSorted = require('chai-sorted');
chai.use(chaiHttp);
chai.use(chaiSorted);

var expect = chai.expect;
const request = chai.request;

const app = require('../app');

const config = require('../config/gamesPerDateConfig');

describe('Test API gamesPerDate con data in cui vi sono partite', function () {
    it('Risponde con codice di stato HTTP valido e dati in formato JSON', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/gamesPerDate')
            .query({
                date: '2022-03-28'
            })
            .end((err, res) => {
                expect(res).have.status(200);
                expect(res.body).to.be.a('array');
                res.body.map(el => {
                    expect(el).have.property('id').that.is.a('number');
                    expect(el).have.property('homeTeam').that.is.a('string');
                    expect(el).have.property('visitorTeam').that.is.a('string');
                    expect(el).have.property('homeScore').that.is.a('number');
                    expect(el).have.property('visitorScore').that.is.a('number');
                    expect(el).have.property('status').that.is.a('number');
                    expect(el).have.property('time').that.is.a('string');
                });
                expect(res.body).to.be.sortedBy('time', {descending: false});

                done();
            });
    });
});

describe('Test API gamesPerDate con data in cui non vi sono partite', function () {
    it('Risponde con codice di stato HTTP valido e un array vuoto', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/gamesPerDate')
            .query({
                date: '2022-08-28'
            })
            .end((err, res) => {
                expect(res).have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.eql([]);

                done();
            });
    });
});

describe('Test API gamesPerDate con l\'header sbagliato (API KEY sbagliata)', function () {
    it('Lancia un errore se chiamata con l\'header sbagliato (API KEY sbagliata)', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/gamesPerDate')
            .query({
                date: '2022-03-28'
            })
            .end((err, res) => {
                expect(res).have.status(400);
                expect(res.body).have.property('message');
                expect(res.body.message).to.equal('Request failed with status code 403');

                done();
            });
    });
});

describe('Test API gamesPerDate con il parametro data scritto in un formato non corretto', function () {
    it('Lancia un errore se chiamata con il parametro data scritto in un formato non corretto', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/gamesPerDate')
            .query({
                date:'2022/03/28'
            })
            .end((err, res) => {
                expect(res).have.status(400);
                expect(res.body).have.property('message');
                expect(res.body.message).to.equal('Attenzione, vi sono degli errori nella richiesta. Gli errori sono: {"date":"The Date field must contain a valid date: Y-m-d."}');

                done();
            });
    });
});