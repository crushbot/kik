/*
 * Bot methods
 */
import Bot from '@kikinteractive/kik';
import { saveUser, getUser } from './user/methods';
import config from './config';

const bot = new Bot({
  username: config.kik.username,
  apiKey: config.kik.apiKey,
  baseUrl: config.kik.baseUrl,
  skipSignatureCheck: !process.env.PRODUCTION || true,
});

bot.onStartChattingMessage((message) => {
  const username = message.from;

  bot.getUserProfile(username)
    .then((profile) => {
      saveUser(username, {
        firstName: profile.firstName,
        lastName: profile.lastName,
      });
      message.reply(`
        Hey ${profile.firstName}!
        Tap the username of your crush.
        If, and only if both of you have a crush on each other, we'll let you know!`);
      message.reply(`
        What's the username of your crush ?`
      );
    });
});

bot.onTextMessage(/^yes|yeah|ye$/i, (incoming) => {
  const username = incoming.from;
  getUser(username).then((user) => {
    if (user.pendingCrush) {
      user.crushs.push(user.pendingCrush);
      saveUser(username, user);
      bot.send(Bot.Message.text(`
        You did it ! We'll notify you if "${user.pendingCrush}" also got a crush on you ;)
      `), username);
    }
  });
});

bot.onTextMessage(/^no|not|cancel$/i, (incoming) => {
  const username = incoming.from;
  getUser(username).then((user) => {
    user.pendingCrush = null;
    saveUser(username, user);
    bot.send(Bot.Message.text(`
      You did it ! We'll notify you if "${user.pendingCrush}" also got a crush on you ;)
    `), username);
  });
});

bot.onTextMessage((incoming) => {
  bot.send(Bot.Message.text(`
    You have a crush on "${incoming.body.trim().toLowerCase()}". Is that correct ?
  `).addTextResponse('yes')
    .addTextResponse('cancel')
  , incoming.from);
});

export default bot;
