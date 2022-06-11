const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
//const should = chai.should();
var expect = chai.expect;
const request = chai.request;

// app is supposed to point to the app.js file
const app = require('../app.js');


// import API Header
const config = require('../config/apiConfig.js');

// Test API Get Teams per conference
describe('Testing API Get Teams', function () {
  it('Respond with valid HTTP status code and typeOf', function (done) {
    // config header to request succed
    config.apiHeaderV2 = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE'
    };
    // Make GET Request
    request(app)
      .get('/searchTeamLogo')
      .query({ 
        conference: 'no'
      })

      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.be.a('array');
        res.body.map(el => {
            expect(el).have.property('id').that.is.a('number');
            if(el.name != null)
                expect(el).have.property('name').that.is.a('string');
            if(el.nickname != null)
                expect(el).have.property('nickname').that.is.a('string');
            if(el.code != null)
                expect(el).have.property('code').that.is.a('string');
            if(el.city != null)
                expect(el).have.property('city').that.is.a('string');
            if(el.logo != null)
                expect(el).have.property('logo').that.is.a('string');
        });

        done();
      }).timeout(5000);

  });
});

// Test API Get Teams fail
describe('Testing API Get Teams fail', () => {
it('Throws an error when called with wrong header', function (done) {
  // config header to request fail (use wrong key)
  config.apiHeaderV2 = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE'
  };
  // Make GET Request
  request(app)
    .get('/searchTeamLogo')
    .query({ 
      conference: 'east' 
    })
    .end((err, res) => {
      expect(res).have.status(400);
      
      done();
    }).timeout(5000);
}); 
});