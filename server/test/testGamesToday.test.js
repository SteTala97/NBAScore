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

let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
if(date < 10)
    date = '0'+date;

if(month < 10)
    month = '0'+month;
let str = year + '-' + month + '-' + date;

// Test API Get Games of the day
describe('Testing API Get Games of the day', function () {
    it('Respond with valid HTTP status code and typeOf', function (done) {
      // config header to request succed
      config.apiHeader = {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
        'Content-Type': 'application/json'
      };
      // Make GET Request
      request(app)
        .get('/gamesToday')
        .query({ 
          data: str
        })
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).to.be.a('array');
          res.body.map(el => {
            expect(el).have.property('id').that.is.a('number');
            expect(el).have.property('typeGame').that.is.a('string');
            expect(el).have.property('teamNameHome').that.is.a('string');
            expect(el).have.property('teamNameVisitors').that.is.a('string');
            expect(el).have.property('teamLogoHome').that.is.a('string');
            expect(el).have.property('teamLogoVisitors').that.is.a('string');
          });

          done();
        });

    });
});

// Test API Get Games without matches
describe('Testing API Get Games without games (empty array)', function () {
  it('Respond with valid HTTP status code and typeOf', function (done) {
    // config header to request succed
    config.apiHeader = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
      'Content-Type': 'application/json'
    };
    // Make GET Request
    request(app)
      .get('/gamesToday')
      .query({ 
        data: '2022-02-24'
      })
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body).to.eql([]);

        done();
      });
  });
});

// Test API Get Games of the day fail
describe('Testing API Get Games of the day fail', () => {
  it('Throws an error when called with wrong header', function (done) {
    // config header to request fail (use wrong key)
    config.apiHeader = {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
      'Content-Type': 'application/json'
    };
    // Make GET Request
    request(app)
      .get('/gamesToday')
      .query({ 
        date: str 
      })
      .end((err, res) => {
        expect(res).have.status(400);
        
        done();
      });
  }); 
});