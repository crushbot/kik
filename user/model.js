/*
 * User model
 */

import gcloud from 'gcloud';
import config from '../config';
import {
  update,
  read,
  remove,
  list,
} from 'gcloud-node-datastore-utils';

const ds = gcloud.datastore.dataset(config.gcloud);
const kind = 'User';

export default {
  create: (data) =>
    update({ ds, kind }, null, data),

  get: (id) =>
    read({ ds, kind }, id),

  update: (id, data) =>
    update({ ds, kind }, id, data),

  delete: (id) =>
    remove({ ds, kind }, id),

  list: () =>
    list({ ds, kind }),
};
