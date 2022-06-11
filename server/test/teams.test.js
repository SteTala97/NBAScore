const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiSorted = require('chai-sorted');
chai.use(chaiHttp);
chai.use(chaiSorted);

var expect = chai.expect;
const request = chai.request;

const app = require('../app');

const config = require('../config/gamesPerDateConfig');

describe('Test API teams corretto', function () {
    it('Risponde con codice di stato HTTP valido e dati in formato JSON', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/teams')
            .end((err, res) => {
                expect(res).have.status(200);
                expect(res.body).to.be.a('array');
                res.body.map(el => {
                    expect(el).have.property('id').that.is.a('number');
                    expect(el).have.property('name').that.is.a('string');
                    expect(el).have.property('conference').that.is.a('string');
                    expect(el).have.property('nbaFranchise').that.is.a('boolean');
                });
                expect(res.body).to.be.sortedBy('name', {descending: false});

                done();
            });
    });
});

describe('Test API teams con l\'header sbagliato (API KEY sbagliata)', function () {
    it('Lancia un errore se chiamata con l\'header sbagliato (API KEY sbagliata)', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/teams')
            .end((err, res) => {
                expect(res).have.status(400);
                expect(res.body).have.property('message');
                expect(res.body.message).to.equal('Request failed with status code 403');

                done();
            });
    });
});