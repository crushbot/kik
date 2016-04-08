/**
 * User tests
 */

import assert from 'assert';
import req from 'supertest';
import app from '../server';

describe('User', () => {
  // To track and modify our created user
  let trackedUser;

  context('create', () => {
    it('should save and return user entity', (done) => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
      };

      req(app.listen())
        .post('/user/add')
        .send(user)
        .end((err, res) => {
          trackedUser = res.body.data;
          assert.equal(res.body.ok, true, 'status is not ok');
          assert.equal(res.body.data.firstName, user.firstName, 'firstName does not match');
          assert.equal(res.body.data.lastName, user.lastName, 'lastName does not match');
          done();
        });
    });
  });

  context('get', () => {
    it('by id', (done) => {
      req(app.listen())
        .post('/user/get')
        .send({ id: trackedUser.id })
        .end((err, res) => {
          assert.equal(res.body.ok, true, 'status is not ok');
          assert.deepEqual(res.body.data, trackedUser, 'user does not match');
          done();
        });
    });

    it('with invalid id', (done) => {
      req(app.listen())
        .post('/user/get')
        .send({ id: 13103012330 })
        .end((err, res) => {
          assert.equal(res.body.ok, false, 'status should not be ok');
          assert.equal(res.status, 404, 'wrong status code');
          done();
        });
    });
  });

  context('update', () => {
    it('should update and return user entity', (done) => {
      const updatedUser = {
        id: trackedUser.id,
        firstName: 'Alexandro',
        lastName: 'Del Piero',
      };

      req(app.listen())
        .post('/user/update')
        .send(updatedUser)
        .end((err, res) => {
          assert.equal(res.body.ok, true, 'status is not ok');
          assert.equal(res.body.data.firstName, updatedUser.firstName, 'firstName does not match');
          assert.equal(res.body.data.lastName, updatedUser.lastName, 'lastName does not match');
          done();
        });
    });
  });

  context('delete', () => {
    it('should delete and return ok', (done) => {
      req(app.listen())
        .post('/user/delete')
        .send({ id: trackedUser.id })
        .end((err, res) => {
          assert.equal(res.body.ok, true, 'status is not ok');
          done();
        });
    });

    it('should not find deleted user', (done) => {
      req(app.listen())
        .post('/user/get')
        .send({ id: trackedUser.id })
        .end((err, res) => {
          assert.equal(res.body.ok, false, 'status should not be ok');
          assert.equal(res.status, 404, 'wrong status code');
          done();
        });
    });
  });
});
