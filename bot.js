/*
 * Bot methods
 */
import Bot from '@kikinteractive/kik';
import config from './config';

const bot = new Bot({
  username: config.kik.username,
  apiKey: config.kik.apiKey,
  baseUrl: config.kik.baseUrl,
});

export default bot;
