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


// Test API Get TeamInfo
describe('Testing API Get TeamInfo', function () {
    it('Respond with valid HTTP status code, JSON Structure', function (done) {
      // config header to request succed
      config.apiHeader = {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '346d7c1683msh1ae24e3f1285f19p1f8468jsnd09122b2ee62',
        'Content-Type': 'application/json'
      };
      // Make GET Request
      request(app)
        .get('/teamInfo')
        .query({ 
            name: 'Miami Heat',
            season: 2021
        })
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).to.be.a('object');
          
          expect(res.body).have.property('teamId').that.is.a('number');
          expect(res.body).have.property('teamLogo').that.is.a('string');
          expect(res.body).have.property('teamName').that.is.a('string');
          expect(res.body).have.property('nickname').that.is.a('string');
          expect(res.body).have.property('city').that.is.a('string');
          expect(res.body).have.property('conference').that.is.a('string');
          expect(res.body).have.property('division').that.is.a('string');
          expect(res.body).have.property('players').that.is.a('array');

          res.body.players.map(player => {
            expect(player).have.property('playerId').that.is.a('number');
            expect(player).have.property('playerName').that.is.a('string');                 
          });

          done();
        });
      });
});


// Test API Get TeamInfo fail
describe('Testing API Get TeamInfo fail', () => {
  it('Throws an error when called with wrong header', function (done) {
    // config header to request fail (use wrong key)
    config.apiHeader = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '346d7c1683msh1ae24e3f1285f19p1f8468jsnd09122b2ee6',
      'Content-Type': 'application/json'
    };
    // Make GET Request
    request(app)
      .get('/teamInfo')
      .query({ 
          name: 'Miami Heat',
          season: 2021
      })
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).have.property('message');
        expect(res.body.message).to.equal('Request failed with status code 403');
        
        done();
      });
  }); 
});