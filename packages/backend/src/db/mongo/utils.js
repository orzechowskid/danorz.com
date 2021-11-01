/**
 * @param {import('mongoose').Model<import('~/t').Indexed<Payload>>} model
 * @param {import('~/t').DBQuery<Payload>} dbQuery
 * @return {Promise<import('~/t').DBQueryResult<Payload>>}
 * @template Payload
 */
export async function runStandardCreateQuery(model, dbQuery) {
  const {
    data
  } = dbQuery;

  try {
    const newItem = new model(data);
    const newItemJson = await newItem.save();

    return {
      data: [ newItemJson ],
      metadata: {
        total: 1
      }
    };
  }
  catch (ex) {
  }
}

/**
 * @param {import('mongoose').Model<Payload>} model
 * @param {import('~/t').DBQuery<Payload>} dbQuery
 * @return {Promise<import('~/t').DBQueryResult<Payload>>}
 * @template Payload
 */
export async function runStandardGetQuery(model, dbQuery) {
  let data = null;
  let error = null;
  let total = null;

  try {
    const {
      count,
      start = 0,
      which
    } = dbQuery;
    const dataQuery = model.find(which)
      .sort(`field -_id`) // TODO: make this part of the dbquery
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

/**
 * @param {import('mongoose').Model<Payload>} model
 * @param {import('~/t').DBQuery<Payload>} dbQuery
 * @return {Promise<import('~/t').DBQueryResult<Payload>>}
 * @template Payload
 */
export async function runStandardSingleItemQuery(model, dbQuery) {
  const {
    which = {}
  } = dbQuery;

  return model.findOne(which)
    .lean()
    .exec();
}
