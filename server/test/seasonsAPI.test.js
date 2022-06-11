const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
//const should = chai.should();
var expect = chai.expect;
const request = chai.request;

// app is supposed to point to the app.js file
const app = require('../app.js');


// import API Header
const config = require('../config/standingViewConfig.js');

// COMMENTA SOTTO PER NON FARE TROPPE API AD OGNI TEST, DE-COMMENTA QUANDO HAI FINITO GLI ALTRI TEST

// Test API Get Seasons
describe('Testing API Get Seasons', function () {
    it('Respond with valid HTTP status code and typeOf', function (done) {
      // config header to request succed
      config.apiHeader = {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '346d7c1683msh1ae24e3f1285f19p1f8468jsnd09122b2ee62',
        'Content-Type': 'application/json'
      };
      // Make GET Request
      request(app)
        .get('/seasons')
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).to.be.a('array');

          
          done();
        });
    });
});


// Test API Get seasons fail
describe('Testing API Get Seasons fail', () => {
  it('Throws an error when called with wrong header', function (done) {
    // config header to request fail (use wrong key)
    config.apiHeader = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '346d7c1683msh1ae24e3f1285f19p1f8468jsnd09122b2ee6',
      'Content-Type': 'application/json'
    };
    // Make GET Request
    request(app)
      .get('/seasons')
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).have.property('message');
        expect(res.body.message).to.equal('Request failed with status code 403');
        
        done();
      });
  }); 
});