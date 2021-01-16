import 'preact';

/**
 * @typedef {function(Props): preact.VNode} Component
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
 */

/**
 * @typedef {Object} I18nState
 * @property {string} locale
 */

/**
 * @typedef {Object} AppState
 * @property {BannerState} banner
 * @property {I18nState} i18n
 * @property {SessionState} session
 */

/**
 * @typedef {function(AppState): T} Selector
 * @template T
 */

/**
 * @typedef {(AppState, ...) => Promise.<{[x:string]:T}>} ActionCreator
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
 * @typedef {Object} BlogPost
 * @property {string} _id
 * @property {Comment[]} comments
 * @property {string[]} [tags]
 * @property {string} text
 * @property {string} title
 */

export {};
export default {};
