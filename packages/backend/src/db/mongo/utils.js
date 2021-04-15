import * as types from '../../types.js';

/**
 * @param {import('mongoose').Model} model
 * @param {types.DBQuery<T>} dbQuery
 * @return {types.DBQueryResult}
 * @template T
 */
async function runStandardGetQuery(model, dbQuery) {
  let data = null;
  let error = null;
  let total = null;

  try {
    const {
      count = 1,
      start = 0,
      which
    } = dbQuery;
    const dataQuery = model.find(which)
      .sort(`field -_id`)
      .skip(+start)
      .limit(+count)
      .lean()
      .exec();
    const totalQuery = model.countDocuments(which)
      .exec();

    [ total, data ] = await Promise.all([
      totalQuery,
      dataQuery
    ]);
  }
  catch (ex) {
    error = ex.message;
  }

  return {
    data,
    metadata: {
      error,
      total
    }
  };
}

export {
  runStandardGetQuery
};
