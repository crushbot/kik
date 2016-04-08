/**
 * Bot tests
 */
import assert from 'assert';
import req from 'supertest';
import nock from 'nock';
import bot from '../bot';


let messageChecker;
nock('https://api.kik.com')
  .post('/v1/message')
  .reply(200, (err, body, cb) => {
    const currentMessageChecker = messageChecker;

    messageChecker = null;

    if (currentMessageChecker) {
      currentMessageChecker(err, body, cb);
    }
  })
  .get('/v1/user/testuser')
  .reply(200, {
    firstName: 'Gwendolyn',
    lastName: 'Ferguson',
    profilePicUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
    profilePicLastModified: 1458959883,
  });

describe('Open chat', () => {
  context('reply with onboarding', () => {
    it('should welcome user', (done) => {
      messageChecker = (err, res) => {
        assert.equal(res.messages.length, 2);
        assert.equal(res.messages[0].body.includes('Gwendolyn'), true);
        done();
      };

      req(bot.incoming())
        .post(bot.incomingPath)
        .send({
          messages: [{
            id: '3652a09b-4be8-4006-ac56-5d8b31464078',
            type: 'start-chatting',
            from: 'testuser',
          }],
        })
        .expect(200)
        .end(() => {});
    });
  });
});
