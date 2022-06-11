const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.use(require("chai-sorted"));

//const should = chai.should();
var expect = chai.expect;
const request = chai.request;

// app is supposed to point to the app.js file
const app = require('../app.js');

// import API Header
const config = require('../config/standingViewConfig.js');

// COMMENTA SOTTO PER NON FARE TROPPE API AD OGNI TEST, DE-COMMENTA QUANDO HAI FINITO GLI ALTRI TEST

// Test API Get Standings
describe('Testing API Get Standings', function () {
    it('Respond with valid HTTP status code, JSON Structure', function (done) {
      // config header to request succed
      config.apiHeader = {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
        'Content-Type': 'application/json'
      };
      // Make GET Request
      request(app)
        .get('/standings')
        .query({ 
          season: 2021, 
          conference: 'East' 
        })
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).to.be.a('array');
          res.body.map(el => {
            expect(el).have.property('id').that.is.a('number');
            expect(el).have.property('teamName').that.is.a('string');
            expect(el).have.property('gamesPlayed', el.wonGames + el.lostGames).that.is.a('number');
            expect(el).have.property('wonGames').that.is.a('number');
            expect(el).have.property('lostGames').that.is.a('number');
            expect(el).have.property('winPercentage').that.is.a('string');       
            expect(el).have.property('positionInStanding', res.body.map(function(e) { return e.teamName; }).indexOf(el.teamName)+1).that.is.a('number');
            expect(el).have.property('conference').that.is.a('string');
            expect(el).have.property('season').that.is.a('number');
          });
          expect(res.body).to.be.sortedBy("winPercentage", {descending: true});
     
          done();
        });
    });
});


// caso in cui non ci sono standing per quella season e conference 
describe('Testing API Get Standings empty standing', function () {
  it('Respond with valid HTTP status code and empty array in the body', function (done) {
    // config header to request succed
    config.apiHeader = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
      'Content-Type': 'application/json'
    };

    request(app)
    .get('/standings')
    .query({ 
      season: 2015, 
      conference: 'East' 
    })
    .end((err, res) => {
      expect(res).have.status(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.eql([]);
               
      done();
    });
  });
});


// Test API Get standings fail
describe('Testing API Get Standings fail', () => {
  it('Throws an error when called with wrong header', function (done) {
    // config header to request fail (use wrong key)
    config.apiHeader = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
      'Content-Type': 'application/json'
    };
    // Make GET Request
    request(app)
      .get('/standings')
      .query({ 
        season: 2021, 
        conference: 'East' 
      })
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).have.property('message');
        expect(res.body.message).to.equal('Request failed with status code 403');
        
        done();
      });
  }); 
});


// Test API Get standings fail withou season
describe('Testing API Get Standings without season parameter', () => {
  it('Throws an error when called without season parameter', function (done) {
    // config header to request 
    config.apiHeader = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
      'Content-Type': 'application/json'
    };
    // Make GET Request
    request(app)
      .get('/standings')
      .query({ 
        conference: 'East' 
      })
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).have.property('message');
        expect(res.body.message).to.equal('Attention! You made the following mistakes: \n {\"season\":\"The Season field is required.\"}');
        
        done();
      });
  }); 
});