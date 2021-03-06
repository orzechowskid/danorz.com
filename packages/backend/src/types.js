// TODO: put data-model types somewhere common

/**
 * @typedef {Object} BlogPost
 * @property {string} author
 * @property {string[]} tags
 * @property {string} title
 */

/**
 * @typedef {Object} BlogPostComment
 * @property {string} _id
 * @property {string} name
 * @property {string} text
 */

/**
 * @typedef {Object} LinkPreview
 * @property {string} url
 */

/**
 * @typedef {Object} User
 * @property {string} emailAddress
 * @property {string} name
 * @property {Object} permissions
 */

/**
 * @typedef {Object} Content
 * @property {string} name
 * @property {string} text
 */

/**
 * @typedef {Object} Settings
 * @property {string} name
 * @property {Object.<string,any>} values
 */

/**
 * @typedef {Object} DBQuery
 * @property {number} [count] return this many things upon read
 * @property {Partial<T>} [data] create/update body
 * @property {number} [start] start here upon read
 * @property {Partial<T>} [which] only read/delete these things
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
 * @property {Object} connection
 * @property {(id: string) => Object} deserializeUser
 * @property {DBQueryFunction<BlogPost>} getBlogPosts
 * @property {DBQueryFunction<Settings>} getSettings
 * @property {DBQueryFunction<User>} getUser
 * @property {(user: Object) => string} serializeUser
 */

export {};
export default {};
