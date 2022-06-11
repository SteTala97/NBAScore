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

let firstname = "LeBron"
let lastname = "James"

// Test API Get Players
describe('Testing API Get Player with specified firstname', function () {
    it('Respond with valid HTTP status code and typeOf', function (done) {
      // config header to request succed
      config.apiHeaderV1 = {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '6e3e2d7fd8msh2828921081e594ap193498jsnd0c99b3bc9f4'
      };
      // Make GET Request
      request(app)
        .get('/searchPlayerFirstname')
        .query({ 
          firstname: firstname
        })
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).to.be.a('array');
          res.body.map(el => {
            expect(el).have.property('id').that.is.a('string');
            expect(el).have.property('firstname').that.is.a('string');
            expect(el).have.property('lastname').that.is.a('string');
            expect(el).have.property('teamid').that.is.a('string');
            expect(el).have.property('birth').that.is.a('string');
          });

          done();
        }).timeout(5000);

    });
});

// Test API Get Players without players
describe('Testing API Get Players that no players have that firstname (empty array)', function () {
  it('Respond with valid HTTP status code and typeOf', function (done) {
    // config header to request succed
    config.apiHeaderV1 = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '6e3e2d7fd8msh2828921081e594ap193498jsnd0c99b3bc9f4'
    };
    // Make GET Request
    request(app)
      .get('/searchPlayerFirstname')
      .query({ 
        firstname: 'Nathiun'
      })
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body).to.eql([]);

        done();
      }).timeout(5000);
  });
});

// Test API Get Players fail
describe('Testing API Get Players fail', () => {
  it('Throws an error when called with wrong header', function (done) {
    // config header to request fail (use wrong key)
    config.apiHeaderV1 = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '6e3e2d7fd8msh2828921081e594ap193498jsnd0c99b3bc9f'
    };
    // Make GET Request
    request(app)
      .get('/searchPlayerFirstname')
      .query({ 
        firstname: firstname 
      })
      .end((err, res) => {
        expect(res).have.status(400);
        
        done();
      }).timeout(5000);
  }); 
});


// Test API Get Players Lastname
describe('Testing API Get Player with specified lastname', function () {
  it('Respond with valid HTTP status code and typeOf', function (done) {
    // config header to request succed
    config.apiHeaderV1 = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '6e3e2d7fd8msh2828921081e594ap193498jsnd0c99b3bc9f4'
    };
    // Make GET Request
    request(app)
      .get('/searchPlayerLastname')
      .query({ 
        lastname: lastname
      })
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.be.a('array');
        res.body.map(el => {
          expect(el).have.property('id').that.is.a('string');
          expect(el).have.property('firstname').that.is.a('string');
          expect(el).have.property('lastname').that.is.a('string');
          if(el.teamid != null){
            expect(el).have.property('teamid').that.is.a('string');
          }
          if(el.birth != null){
            expect(el).have.property('birth').that.is.a('string');
          }
        });

        done();
      }).timeout(5000);

  });
});

// Test API Get Players without players
describe('Testing API Get Players that no players have that lastname (empty array)', function () {
it('Respond with valid HTTP status code and typeOf', function (done) {
  // config header to request succed
  config.apiHeaderV1 = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': '6e3e2d7fd8msh2828921081e594ap193498jsnd0c99b3bc9f4'
  };
  // Make GET Request
  request(app)
    .get('/searchPlayerLastname')
    .query({ 
      lastname: 'Nathiun'
    })
    .end((err, res) => {
      expect(res).have.status(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.eql([]);

      done();
    }).timeout(5000);
});
});

// Test API Get Players fail
describe('Testing API Get Players fail', () => {
it('Throws an error when called with wrong header', function (done) {
  // config header to request fail (use wrong key)
  config.apiHeaderV1 = {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': '6e3e2d7fd8msh2828921081e594ap193498jsnd0c99b3bc9f'
  };
  // Make GET Request
  request(app)
    .get('/searchPlayerLastname')
    .query({ 
      lastname: lastname 
    })
    .end((err, res) => {
      expect(res).have.status(400);
      
      done();
    }).timeout(5000);
}); 
});

// Test API Get Teams per conference
describe('Testing API Get Teams per conference with specified conference', function () {
  it('Respond with valid HTTP status code and typeOf', function (done) {
    // config header to request succed
    config.apiHeaderV2 = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'c433d9b21amsh0f530d5454ead50p132030jsn0745f1394e6e'
    };
    // Make GET Request
    request(app)
      .get('/searchTeamLogo')
      .query({ 
        conference: 'east'
      })
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.be.a('array');
        res.body.map(el => {
          expect(el).have.property('id').that.is.a('number');
          if(el.name != null)
            expect(el).have.property('name').that.is.a('string');
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
      'X-RapidAPI-Key': 'c433d9b21amsh0f530d5454ead50p132030jsn0745f1394e6'
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