const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;
const request = chai.request;
const app = require('../app');
const config = require('../config/gameInfoHeaderConfig');


describe('Test API gamePerId with proper game data', function () {
    it('Valid HTTP status code and JSON data', function (done) {
        config.apiHeader = {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'b3a1a9629bmsh37dc67ee03b7cedp1cf78bjsnc905da0d7b09',
            'Content-Type': 'application/json'
        };
        request(app)
            .get('/gamePerId')
            .query({
                id: '10700'
            })
            .end((err, res) => {

                expect(res).have.status(200);

                expect(res.body).to.be.a('array');

                res.body.map(el => {
                    expect(el).have.property('id').that.is.a('number');
                    expect(el).have.property('visitorsName').that.is.a('string');
                    expect(el).have.property('visitorsImg').that.is.a('string');
                    expect(el).have.property('visitorsScore').that.is.a('number');
                    expect(el).have.property('homeName').that.is.a('string');
                    expect(el).have.property('homeImg').that.is.a('string');
                    expect(el).have.property('homeScore').that.is.a('number');
                    expect(el).have.property('arena').that.is.a('object');
                });

                done();
            });
    });
});


// describe('Test API gamePerId with invalid game id', function () {
//     it('Valid HTTP status code and JSON data results in empty array', function (done) {
//         config.apiHeader = {
//             'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
//             'X-RapidAPI-Key': 'b3a1a9629bmsh37dc67ee03b7cedp1cf78bjsnc905da0d7b09',
//             'Content-Type': 'application/json'
//         };
//         request(app)
//             .get('/gamePerId')
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


// describe('Test API gamePerId with wrong header (wrong "X-RapidAPI-Key" field)', function () {
//     it('Returns error state code and message', function (done) {
//         config.apiHeader = {
//             'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
//             'X-RapidAPI-Key': 'c3a1a9629bmsh37dc67ee03b7cedp1cf78bjsnc905da0d7b09',
//             'Content-Type': 'application/json'
//         };
//         request(app)
//             .get('/gamePerId')
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