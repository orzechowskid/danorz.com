// TODO: put data-model types somewhere common

/**
 * @typedef {Object} BlogPost
 * @property {string} author
 * @property {string[]} tags
 * @property {string} title
 */

/**
 * @typedef {Object} BlogPostComment
 * @property {string} id
 */

/**
 * @typedef {Object} DBQuery
 * @property {number} [count] return this many things upon read
 * @property {T} [data] create/update body
 * @property {number} [start] start here upon read
 * @property {T} [which] only read/delete these things
 * @template T
 */

/**
 * @typedef {Object} BaseDBRecord
 * @property {string} _id
 */

/**
 * @typedef {T & BaseDBRecord} DBRecord
 * @template T
 */

/**
 * @typedef {Object} DBResult
 * @property {Array<DBRecord<T>>} data
 * @property {Object} metadata
 * @property {string} [metadata.error]
 * @property {number} metadata.total
 * @template T
 */

/**
 * @typedef {Promise<DBResult<T>>} DBQueryResult
 * @template T
 */

/**
 * @typedef {(arg0: DBQuery<T>) => DBQueryResult<T>} DBQueryFunction
 * @template T
 */

/**
 * @typedef {Object} DBConnection
 * @property {DBQueryFunction<BlogPost>} getBlogPosts
 */

export {};
export default {};
