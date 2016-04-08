/*
 * Bot server
 */
import http from 'http';
import bot from './bot';
import config from './config';

const app = http.createServer(bot.incoming())
  .listen(config.port);

// Export application
export default app;
