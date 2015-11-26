/* jshint camelcase: false */
'use strict';
var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');

function json(verb, url) {
    return request(app)[verb](url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  }

describe('REST API request', function() {
  before(function(done) {
    require('./start-server');
    done();
  });

  after(function(done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });

  it('should return a list of all customers', function(done) {
    json('get', '/api/customers')
      .expect(200, function(err, res){
        assert(Array.isArray(res.body));
        assert.equal(res.body.length, 8);
        done();
      });
  });

  it('should return a list of all customers with names', function(done){
    json('get', '/api/customers?filter[fields][name]=true')
      .expect(200, function(err, res){
        assert(Array.isArray(res.body));
        assert.equal(res.body.length, 8);
        done();
      });
  });

  it('should return a customer with id 4', function(done) {
    json('get', '/api/customers/4')
      .expect(200, function(err, res){
        assert(res.body.name);
        assert(res.body.age);
        assert(res.body.id);
        assert.equal(res.body.id, 4);
        done();
      });
  });

  it('should return a customer with age less than 22', function(done) {
    json('get', '/api/customers/youngFolks')
      .expect(200, function(err, res){
        assert(Array.isArray(res.body));
        assert.notEqual(res.body.length, 0);
        assert(res.body[0].name);
        assert(res.body[0].age);
        assert(res.body[0].id);
        done();
      });
  });

  it('should return orders by customer 4', function(done) {
    json('get', '/api/customers/4/orders')
      .expect(200, function(err, res){
        assert(Array.isArray(res.body));
        assert.notEqual(res.body.length, 0);
        assert(res.body[0].description);
        assert(res.body[0].date);
        assert(res.body[0].id);
        assert(res.body[0].customerId);
        done();
      });
  });

  it('should return only 2 customers', function(done) {
    json('get',
    '/api/customers?filter[include][orders]=customer&filter[limit]=2')
      .expect(200, function(err,res){
        assert(Array.isArray(res.body));
        assert.equal(res.body.length, 2);
        done();
      });
  });

  it('should return customer address', function(done) {
    json('get',
    '/api/customers/2/address')
      .expect(200, function(err,res){
        assert(res.body.street);
        assert(res.body.city);
        assert(res.body.state);
        assert(res.body.zipCode);
        assert(res.body.id);
        done();
      });
  });

  it('should return customer emails', function(done) {
    json('get',
    '/api/customers/3/emails')
      .expect(200, function(err,res){
        assert(Array.isArray(res.body));
        assert(res.body[0].label);
        assert(res.body[0].address);
        assert(res.body[0].id);
        assert(res.body[0].name);
        done();
      });
  });

  it('should return customer accounts', function(done) {
    json('get',
    '/api/customers/1/accounts')
      .expect(200, function(err,res){
        assert(Array.isArray(res.body));
        assert(res.body[0].name);
        assert(res.body[0].balance);
        assert(res.body[0].id);
        done();
      });
  });

  it('should return accounts number', function(done) {
    json('get',
    '/api/customers/1/accounts/count')
      .expect(200, function(err,res){
        assert.equal(res.body.count, 2);
        done();
      });
  });

  it('should return people linked to book', function(done) {
    json('get',
    '/api/books/1/people')
      .expect(200, function(err,res){
        assert(Array.isArray(res.body));
        assert(res.body[0].id);
        assert(res.body[0].name);
        assert(res.body[0].notes);
        assert(res.body[0].linkedId);
        assert(res.body[0].linkedType);
        done();
      });
  });

  it('should return book author', function(done) {
    json('get',
    '/api/books/1/people/1')
      .expect(200, function(err,res){
        assert.equal(res.body.linkedType, 'Author');
        done();
      });
  });
});


describe('Unexpected Usage', function(){
  it('should not crash the server when posting a bad id', function(done){
    json('post', '/api/customers/foobar')
      .send({})
      .expect(404, done);
  });
});
