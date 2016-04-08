/*
 * Utils method to interact with database cloud storage
 */

/*
 * Translates from Datastore's entity format to
 * the format expected by the application.
 *
 * Datastore format:
 *   {
 *     key: [kind, id],
 *     data: {
 *       property: value
 *     }
 *   }
 *
 * Application format:
 *   {
 *     id: id,
 *     property: value
 *   }
 */
export const fromDatastore = (obj) => {
  obj.data.id = obj.key.id;
  return obj.data;
};

/*
 * Translates from the application's format to the datastore's
 * extended entity property format. It also handles marking any
 * specified properties as non-indexed. Does not translate the key.
 *
 * Application format:
 *   {
 *     id: id,
 *     property: value,
 *     unindexedProperty: value
 *   }
 *
 * Datastore extended format:
 *   [
 *     {
 *       name: property,
 *       value: value
 *     },
 *     {
 *       name: unindexedProperty,
 *       value: value,
 *       excludeFromIndexes: true
 *     }
 *   ]
 */
export const toDatastore = (obj, nonIndexed) => {
  nonIndexed = nonIndexed || [];
  const results = [];
  Object.keys(obj).forEach((k) => {
    if (obj[k] === undefined) { return; }
    results.push({
      name: k,
      value: obj[k],
      excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
    });
  });
  return results;
};

/*
 * Get a specific kind isntance by id
 */
export const read = ({ ds, kind }, id) =>
  new Promise((resolve, reject) => {
    const key = ds.key([kind, id]);
    ds.get(key, (err, entity) => {
      if (err) {
        return reject({
          status: err.status || 500,
          message: err.message,
        });
      }
      if (!entity) {
        return reject({
          status: 404,
          message: 'Not found',
        });
      }
      return resolve(fromDatastore(entity));
    });
  });

/*
 * Get all kind instances
 */
export const list = ({ ds, kind }) =>
  new Promise((resolve, reject) => {
    const q = ds.createQuery([kind]);

    ds.runQuery(q, (err, entities) => {
      if (err) {
        return reject({
          status: err.status || 500,
          message: err.message,
        });
      }
      return resolve(entities.map(fromDatastore));
    });
  });

/*
 * Update a kind instance if id is provided, or create a new one
 */
export const save = ({ ds, kind }, id, data) =>
  new Promise((resolve, reject) => {
    const entity = {
      key: ds.key([kind, id]),
      data: toDatastore(data),
    };

    ds.save(
      entity,
      (err) => {
        data.id = entity.key.id;
        return (err) ?
          reject({
            status: err.status || 500,
            message: err.message,
          }) :
          resolve(data);
      }
    );
  });

/*
 * Remvove a specific kind instance by id
 */
export const remove = ({ ds, kind }, id) =>
  new Promise((resolve, reject) => {
    const key = ds.key([kind, id]);
    ds.delete(key, (err) => {
      if (err) {
        return reject({
          status: err.status || 500,
          message: err.message,
        });
      }
      return resolve();
    });
  });
