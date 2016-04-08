/*
 * Api server
 */
import Koa from 'koa';
import logger from 'koa-logger';
import compress from 'koa-compress';
import bot from './bot';
import config from './config';

const app = new Koa();
app.use(logger());
app.use(compress());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = { ok: false, message: err.message };
    ctx.status = err.status || 500;
  }
});

// Initialize bot
app.use(bot.incoming());

// Start server
app.listen(config.port);

// Export application
export default app;
