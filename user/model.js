/*
 * User model
 */
import gcloud from 'gcloud';
import config from '../config';
import {
  save,
  read,
  remove,
  list,
} from './datastore';

const ds = gcloud.datastore.dataset(config.gcloud);
const kind = 'User';

export default {
  save: (id, data) =>
    save({ ds, kind }, id, data),

  get: (id) =>
    read({ ds, kind }, id),

  delete: (id) =>
    remove({ ds, kind }, id),

  list: () =>
    list({ ds, kind }),
};
