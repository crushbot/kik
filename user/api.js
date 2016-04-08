/*
 * User api methods
 */

import Router from 'koa-router';
import model from './model';

const router = new Router({
  prefix: '/user',
});

/*
 * @params
 */
router.post('/add', async (ctx) => {
  const data = ctx.request.body;

  try {
    const user = await model.create(data);
    ctx.body = { ok: true, data: user };
  } catch (err) { throw (err); }
});

/*
 * @params
 * id: Int
 */
router.post('/update', async (ctx) => {
  const id = ctx.request.body.id;
  const data = ctx.request.body;

  try {
    const user = await model.update(id, data);
    ctx.body = { ok: true, data: user };
  } catch (err) { throw (err); }
});

/*
 * @params
 * id: Int
 */
router.post('/get', async (ctx) => {
  const id = ctx.request.body.id;

  try {
    const user = await model.get(id);
    ctx.body = { ok: true, data: user };
  } catch (err) { throw (err); }
});

/*
 * @params
 * id: Int
 */
router.post('/delete', async (ctx) => {
  const id = ctx.request.body.id;

  try {
    await model.delete(id);
    ctx.body = { ok: true };
  } catch (err) { throw (err); }
});

export default router;
