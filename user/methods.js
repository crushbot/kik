/*
 * User methods
 */
import User from './model';

export const saveUser = (username, data) =>
  User.save(username, Object.assign({
    pendingCrush: null,
    crushs: [],
    messages: [],
  }, data));

export const getUser = (username) =>
  User.get(username)
    .catch(() =>
      saveUser(username)
        .then((user) => user));
