const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;
const request = chai.request;
const app = require('../app');
const config = require('../config/gameInfoHeaderConfig');


describe('Test API gamePlayersPerId with proper game data', function () {
    it('Valid HTTP status code and JSON data', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/gamePlayersPerId')
            .query({
                id: '10700'
            })
            .end((err, res) => {

                expect(res).have.status(200);

                expect(res.body).to.be.a('array');

                res.body.map(el => {
                    expect(el).have.property('teamName').that.is.a('string');
                    expect(el).have.property('firstName').that.is.a('string');
                    expect(el).have.property('lastName').that.is.a('string');
                    expect(el).have.property('min').that.is.a('string');
                    expect(el).have.property('totReb').that.is.a('number');
                    expect(el).have.property('assists').that.is.a('number');
                    expect(el).have.property('points').that.is.a('number');
                    expect(el).have.property('pos').to.satisfy(function(val){
                        return val === null || typeof val == 'string'
                    });
                    
                });

                done();
            });
    });
});


// describe('Test API gamePlayersPerId with invalid game id', function () {
//     it('Valid HTTP status code and JSON data results in empty array', function (done) {
//         config.apiHeader = {
//             'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
//             'X-RapidAPI-Key': 'YOU NEED TO INSERT A VALID RapidAPI API-KEY HERE',
//             'Content-Type': 'application/json'
//         };
//         request(app)
//             .get('/gamePlayersPerId')
//             .query({
//                 id: '9999999999'
//             })
//             .end((err, res) => {

//                 expect(res).have.status(200);
//                 expect(res.body).to.be.a('array');
//                 expect(res.body).to.eql([]);

//                 done();
//             });
//     });
// });


// describe('Test API gamePlayersPerId with wrong header (wrong "X-RapidAPI-Key" field)', function () {
//     it('Returns error state code and message', function (done) {
//         config.apiHeader = {
//             'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
//             'X-RapidAPI-Key': 'THIS_IS_AN_INVALID_API_KEY',
//             'Content-Type': 'application/json'
//         };
//         request(app)
//             .get('/gamePlayersPerId')
//             .query({
//                 id: '10700'
//             })
//             .end((err, res) => {
//                 expect(res).have.status(400);
//                 expect(res.body).have.property('message');
//                 expect(res.body.message).to.equal('Request failed with status code 403');

//                 done();
//             });
//     });
// });