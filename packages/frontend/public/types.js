/* this doesn't reeeeally return an Element but it's a good hint for now */
/**
 * @typedef {function(Props): Element?} Component
 * @template Props
 */

/** @typedef {('info'|'warning'|'error')} Severity */

/**
 * @typedef {Object} BannerState
 * @property {boolean} dismissable
 * @property {Severity} severity
 * @property {string} text
 */

/**
 * @typedef {Object} SessionState
 * @property {boolean} isSignedIn
 * @property {string} name
 * @property {string} preferredLocale
 */

/**
 * @typedef {Object} I18nState
 * @property {Object} dictionaries
 * @property {string} locale
 * @property {Object} supportedLocales
 */

/**
 * @typedef {Object} AppInfoState
 * @property {string} clientVersion
 * @property {string} serverVersion
 */

/**
 * @typedef {Object} AppState
 * @property {AppInfoState} appInfo
 * @property {BannerState} banner
 * @property {I18nState} i18n
 * @property {SessionState} session
 */

/**
 * @typedef {function(AppState): T} Selector
 * @template T
 */

/**
 * @typedef {(state: AppState, ...) => (Promise.<Record.<S,T>> | undefined)} ActionCreator
 * @template {string} S
 * @template T
 */

/**
 * @typedef {(T) | (() => T)} LocalStateSetter
 * @template T
 */

/**
 * @typedef {[T, (arg0: LocalStateSetter<T>) => void]} LocalState
 * @template T
 */

/**
 * @typedef {Object} RemoteData
 * @property {T[]} data
 * @property {Object} metadata
 * @property {string} [metadata.error]
 * @property {number} [metadata.total]
 * @template T
 */

/**
 * @typedef {Object} RemoteDataResult
 * @property {T[]} data
 * @property {string} localError
 * @property {Object} metadata
 * @property {(arg0: Object) => void} doCreate
 * @property {(arg0: Object) => void} doDelete
 * @property {() => void} doGet
 * @property {(arg0: Object) => void} doUpdate
 * @template T
 */

/**
 * @typedef {Object} FeedItem
 * @property {boolean} full
 */

/**
 * @typedef {Object} BlogPostComment
 * @property {string} _id
 * @property {string} gravatarHash
 * @property {string} name
 * @property {string} text
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} _id
 * @property {BlogPostComment[]} comments
 * @property {string[]} [tags]
 * @property {string} text
 * @property {string} title
 */

/**
 * @typedef {Object} AnalyticsEvent
 * @property {string} eventType
 * @property {string} [eventAction]
 * @property {string} [eventContext]
 */

/**
 * @typedef {Object} PreactRef
 * @property {T} current
 * @template T
 */

export {};
