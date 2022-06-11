//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let express = require("express");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();


chai.use(chaiHttp);
  /*
  * Test the /GET route
  */
  describe('/GET index', () => {
      it('it should GET the index', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
  });