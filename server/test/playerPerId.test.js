const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;
const request = chai.request;
const app = require('../app');
const config = require('../config/playerInfoHeaderConfig.js');


describe('Test API playerPerId with proper player data', function () {
    it('Valid HTTP status code and JSON data', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/playerInfo')
            .query({
                id: '265' // LeBron James' id
            })
            .end((err, res) => {

                expect(res).have.status(200);
                expect(res.body).to.be.a('array');

                res.body.map(el => {
                    expect(el).have.property('firstName').that.is.a('string');
                    expect(el).have.property('lastName').that.is.a('string');
                    expect(el).have.property('birthday').that.is.a('string');
                    expect(el).have.property('country').that.is.a('string');
                    expect(el).have.property('college').that.is.a('string');
                    expect(el).have.property('nba_start').that.is.a('number');
                    expect(el).have.property('height').that.is.a('string');
                    expect(el).have.property('weight').that.is.a('string');
                    expect(el).have.property('jersey').that.is.a('number');
                    expect(el).have.property('pos').that.is.a('string');
                });

                done();
            });
    });
});


describe('Test API playerPerId with invalid player id', function () {
    it('Valid HTTP status code and JSON data results in empty array', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/playerInfo')
            .query({
                id: '9999999999'
            })
            .end((err, res) => {

                expect(res).have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.eql([]);

                done();
            });
    });
});
