/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.dev.js":
/*!**********************!*\
  !*** ./index.dev.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [maybe used in main (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, module, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var source_map_support__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! source-map-support */ \"source-map-support\");\n/* harmony import */ var source_map_support__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(source_map_support__WEBPACK_IMPORTED_MODULE_2__);\n/* eslint-disable import/no-extraneous-dependencies */\n\n\n\n\n\ndotenv__WEBPACK_IMPORTED_MODULE_1___default().config();\nsource_map_support__WEBPACK_IMPORTED_MODULE_2___default().install();\n\nasync function go() {\n  const appFactory = (await __webpack_require__(/*! ../src/index */ \"../src/index.js\")).default;\n  const app = await appFactory();\n  const server = http__WEBPACK_IMPORTED_MODULE_0___default().createServer(app);\n\n  server.listen(process.env.PORT);\n\n  await new Promise(function(res, rej) {\n    server.once(`error`, rej);\n    server.once(`listening`, res);\n  });\n\n  console.info(`server listening on ${process.env.PORT}`);\n\n  if (true) {\n    let currentApp = app;\n\n    module.hot.accept(/*! ../src/index */ \"../src/index.js\", __WEBPACK_OUTDATED_DEPENDENCIES__ => { (async function onAccept() {\n      server.removeListener(`request`, currentApp);\n\n      const nextAppFactory = (await __webpack_require__(/*! ../src/index */ \"../src/index.js\")).default;\n\n      currentApp = await nextAppFactory();\n\n      server.on(`request`, currentApp);\n      console.info(`server reloaded`);\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });\n    module.hot.accept(function onError(err) {\n      console.error(err);\n    });\n    module.hot.dispose(function onDispose() {\n      server.close();\n    });\n  }\n}\n\ngo().catch(function onError(err) {\n  console.error(err);\n  process.exit(1);\n});\n\n\n//# sourceURL=webpack:///./index.dev.js?");

/***/ }),

/***/ "../node_modules/node-hot-loader/HmrClient.js":
/*!****************************************************!*\
  !*** ../node_modules/node-hot-loader/HmrClient.js ***!
  \****************************************************/
/*! flagged exports */
/*! export HmrClient [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__, module, __webpack_require__.h, __webpack_require__.* */
/***/ ((module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = exports.HmrClient = void 0;\n\nvar _LogColors = _interopRequireDefault(__webpack_require__(/*! ./LogColors */ \"../node_modules/node-hot-loader/LogColors.js\"));\n\nvar _Logger = _interopRequireDefault(__webpack_require__(/*! ./Logger */ \"../node_modules/node-hot-loader/Logger.js\"));\n\nvar _LogLevel = __webpack_require__(/*! ./LogLevel */ \"../node_modules/node-hot-loader/LogLevel.js\");\n\nvar _messageActionType = _interopRequireDefault(__webpack_require__(/*! ./messageActionType */ \"../node_modules/node-hot-loader/messageActionType.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nclass HmrClient {\n  constructor() {\n    _defineProperty(this, \"logger\", new _Logger.default(_LogColors.default.cyan('[HMR]')));\n\n    _defineProperty(this, \"lastHash\", '');\n\n    _defineProperty(this, \"sendRestartMessage\", () => {\n      // If forked process\n      if (process.send) {\n        const message = {\n          action: _messageActionType.default.RestartRequired\n        };\n        process.send(message);\n      }\n    });\n\n    _defineProperty(this, \"logApplyResult\", (logLevel, outdatedModules, renewedModules) => {\n      const unacceptedModules = !renewedModules || !renewedModules.length ? outdatedModules : outdatedModules.filter(moduleId => renewedModules.indexOf(moduleId) < 0);\n\n      if (unacceptedModules.length > 0 && logLevel >= _LogLevel.LogLevel.ERRORS) {\n        this.logger.warn(\"The following modules couldn't be hot updated: (They would need to restart the application!)\");\n        unacceptedModules.forEach(moduleId => {\n          this.logger.warn(` - ${moduleId}`);\n        });\n        this.sendRestartMessage();\n      }\n\n      if (!renewedModules || !renewedModules.length) {\n        if (logLevel >= _LogLevel.LogLevel.MINIMAL) {\n          this.logger.info('Nothing hot updated.');\n        }\n\n        return;\n      }\n\n      if (logLevel >= _LogLevel.LogLevel.NORMAL) {\n        this.logger.info('Updated modules:');\n        renewedModules.forEach(moduleId => {\n          this.logger.info(` - ${moduleId}`);\n        });\n        const numberIds = renewedModules.every(moduleId => typeof moduleId === 'number');\n\n        if (numberIds) {\n          this.logger.info('Consider using the NamedModulesPlugin for module names.');\n        }\n      }\n\n      if (this.isUpToDate()) {\n        this.logUpToDate(logLevel);\n      }\n    });\n\n    _defineProperty(this, \"logUpToDate\", logLevel => {\n      if (logLevel >= _LogLevel.LogLevel.MINIMAL) {\n        this.logger.info('App is up to date.');\n      }\n    });\n\n    _defineProperty(this, \"defaultMessageListener\", ({\n      action,\n      stats,\n      logLevel\n    }) => {\n      // webpackHotUpdate\n      if (action !== _messageActionType.default.CompilerDone) {\n        return;\n      }\n\n      this.lastHash = stats.hash;\n\n      if (!this.isUpToDate()) {\n        const status = module.hot.status();\n\n        if (status === 'idle') {\n          if (logLevel >= _LogLevel.LogLevel.MINIMAL) {\n            this.logger.info('Checking for updates...');\n          }\n\n          this.checkAndApplyUpdates(logLevel);\n        } else if (['abort', 'fail'].indexOf(status) >= 0) {\n          if (logLevel >= _LogLevel.LogLevel.ERRORS) {\n            this.logger.warn(`Cannot apply update as a previous update ${status}ed. You need to restart the application!`);\n          }\n\n          this.sendRestartMessage();\n        }\n      } else {\n        this.logUpToDate(logLevel);\n      }\n    });\n\n    _defineProperty(this, \"isUpToDate\", () => this.lastHash.indexOf(__webpack_require__.h()) >= 0);\n\n    _defineProperty(this, \"checkAndApplyUpdates\", logLevel => {\n      module.hot.check().then(outdatedModules => {\n        if (!outdatedModules) {\n          if (logLevel >= _LogLevel.LogLevel.ERRORS) {\n            this.logger.warn('Cannot find update. You need to restart the application!');\n          }\n\n          return Promise.resolve();\n        }\n\n        return module.hot.apply({\n          ignoreUnaccepted: true,\n          ignoreDeclined: true,\n          ignoreErrored: true,\n          // true - allows to restore state after errors.\n          onUnaccepted: info => {\n            if (logLevel >= _LogLevel.LogLevel.ERRORS) {\n              this.logger.warn(`Ignored an update to unaccepted module ${info.chain.join(' -> ')}`);\n            }\n          },\n          onDeclined: info => {\n            if (logLevel >= _LogLevel.LogLevel.ERRORS) {\n              this.logger.warn(`Ignored an update to declined module ${info.chain.join(' -> ')}`);\n            }\n          },\n          onErrored: info => {\n            if (logLevel >= _LogLevel.LogLevel.ERRORS) {\n              this.logger.warn(`Ignored an error while updating module ${info.moduleId} (${info.type})`); // If ignoreErrored is true and throw info.error then module.hot.status() always\n              // equals 'apply' and module.hot.check() will not work.\n\n              this.logger.error(info.error);\n            }\n          }\n        }).then(renewedModules => {\n          if (!this.isUpToDate()) {\n            this.checkAndApplyUpdates(logLevel);\n          }\n\n          this.logApplyResult(logLevel, outdatedModules, renewedModules);\n        });\n      }).catch(err => {\n        if (['abort', 'fail'].indexOf(module.hot.status()) >= 0) {\n          if (logLevel >= _LogLevel.LogLevel.ERRORS) {\n            this.logger.error('Cannot check for update. You need to restart the application!');\n            this.logger.error(err.stack || err.message);\n          }\n\n          this.sendRestartMessage();\n        } else if (logLevel >= _LogLevel.LogLevel.ERRORS) {\n          this.logger.error(`Check updates failed: ${err.stack}` || err.message);\n        }\n      });\n    });\n  }\n\n  run(messageListener = this.defaultMessageListener) {\n    if (false) {}\n\n    this.logger.info('Waiting for update signal from webpack...');\n    process.on('message', messageListener);\n    return this;\n  }\n\n}\n\nexports.HmrClient = HmrClient;\n\nvar _default = new HmrClient().run();\n\nexports.default = _default;\n\n//# sourceURL=webpack:///../node_modules/node-hot-loader/HmrClient.js?");

/***/ }),

/***/ "../node_modules/node-hot-loader/LogColors.js":
/*!****************************************************!*\
  !*** ../node_modules/node-hot-loader/LogColors.js ***!
  \****************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nclass LogColors {} // Make functions from LogColors.defaultColors which apply string and surround it with color definition.\n\n\nexports.default = LogColors;\n\n_defineProperty(LogColors, \"defaultColors\", {\n  bold: '\\u001b[1m',\n  yellow: '\\u001b[1m\\u001b[33m',\n  red: '\\u001b[1m\\u001b[31m',\n  green: '\\u001b[1m\\u001b[32m',\n  cyan: '\\u001b[1m\\u001b[36m',\n  magenta: '\\u001b[1m\\u001b[35m'\n});\n\nObject.keys(LogColors.defaultColors).forEach(color => {\n  LogColors[color] = str => `${LogColors.defaultColors[color]}${str}\\u001b[39m\\u001b[22m`;\n});\n\n//# sourceURL=webpack:///../node_modules/node-hot-loader/LogColors.js?");

/***/ }),

/***/ "../node_modules/node-hot-loader/LogLevel.js":
/*!***************************************************!*\
  !*** ../node_modules/node-hot-loader/LogLevel.js ***!
  \***************************************************/
/*! flagged exports */
/*! export LogLevel [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export parseLogLevel [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.parseLogLevel = parseLogLevel;\nexports.LogLevel = void 0;\n// https://webpack.js.org/configuration/stats/#stats\nconst LogLevel = {\n  NONE: 0,\n  // none\n  ERRORS: 1,\n  // errors-only\n  MINIMAL: 2,\n  // minimal\n  NORMAL: 3 // normal\n\n};\nexports.LogLevel = LogLevel;\n\nfunction parseLogLevel(stats) {\n  let level = LogLevel.NORMAL;\n  level = stats === false ? LogLevel.NONE : level;\n  level = stats === 'none' ? LogLevel.NONE : level;\n  level = stats === 'errors-only' ? LogLevel.ERRORS : level;\n  level = stats === 'minimal' ? LogLevel.MINIMAL : level;\n  return level;\n}\n\n//# sourceURL=webpack:///../node_modules/node-hot-loader/LogLevel.js?");

/***/ }),

/***/ "../node_modules/node-hot-loader/Logger.js":
/*!*************************************************!*\
  !*** ../node_modules/node-hot-loader/Logger.js ***!
  \*************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nvar _LogColors = _interopRequireDefault(__webpack_require__(/*! ./LogColors */ \"../node_modules/node-hot-loader/LogColors.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nclass Logger {\n  constructor(prefix) {\n    _defineProperty(this, \"prefix\", void 0);\n\n    this.prefix = prefix;\n  }\n\n  info(message, ...optionalParams) {\n    console.log(this.prefix, message, ...optionalParams);\n  }\n\n  warn(message, ...optionalParams) {\n    console.warn(this.prefix, _LogColors.default.yellow(message), ...optionalParams);\n  }\n\n  error(message, ...optionalParams) {\n    const string = message.stack || message;\n    console.error(this.prefix, _LogColors.default.red(string), ...optionalParams);\n  }\n\n}\n\nexports.default = Logger;\n\n//# sourceURL=webpack:///../node_modules/node-hot-loader/Logger.js?");

/***/ }),

/***/ "../node_modules/node-hot-loader/messageActionType.js":
/*!************************************************************!*\
  !*** ../node_modules/node-hot-loader/messageActionType.js ***!
  \************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\nconst messageActionType = {\n  CompilerStart: 'CompilerStart',\n  CompilerDone: 'CompilerDone',\n  RestartRequired: 'RestartRequired'\n};\nvar _default = messageActionType;\nexports.default = _default;\n\n//# sourceURL=webpack:///../node_modules/node-hot-loader/messageActionType.js?");

/***/ }),

/***/ "../src/api/analyticsRoutes.js":
/*!*************************************!*\
  !*** ../src/api/analyticsRoutes.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"../src/types.js\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\nrouter.use(`*`, async function doAnalytics(req, res, next) {\n  //  /** @type {types.DBConnection} */\n  //  const db = res.locals.db;\n  let err = null;\n\n  try {\n    const response = {\n      data: [ `ok` ],\n      metadata: {\n        count: 1\n      }\n    };\n\n    res.json(response)\n      .end();\n  }\n  catch (ex) {\n    err = ex;\n  }\n\n  next(err);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n\n//# sourceURL=webpack:///../src/api/analyticsRoutes.js?");

/***/ }),

/***/ "../src/api/blogRoutes.js":
/*!********************************!*\
  !*** ../src/api/blogRoutes.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"../src/types.js\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\n// TODO: require auth for all blog routes\n\nrouter.get(`*`, async function getBlogPosts(req, res, next) {\n  /** @type {types.DBConnection} */\n  const db = res.locals.db;\n  let err = null;\n\n  try {\n    const response = await db.getBlogPosts({ count: 5 });\n\n    res.json(response)\n      .end();\n  }\n  catch (ex) {\n    err = ex;\n  }\n\n  next(err);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n\n//# sourceURL=webpack:///../src/api/blogRoutes.js?");

/***/ }),

/***/ "../src/api/index.js":
/*!***************************!*\
  !*** ../src/api/index.js ***!
  \***************************/
/*! namespace exports */
/*! export factory [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"factory\": () => /* binding */ factory\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _analyticsRoutes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analyticsRoutes */ \"../src/api/analyticsRoutes.js\");\n/* harmony import */ var _blogRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blogRoutes */ \"../src/api/blogRoutes.js\");\n/* harmony import */ var _privateRoutes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./privateRoutes */ \"../src/api/privateRoutes.js\");\n\n\n\n\n\n\nfunction factory(dbConnection) {\n  const router = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\n  router.use(function addDB(req, res, next) {\n    res.locals.db = dbConnection;\n\n    next();\n  });\n\n  router.use(function noCors(req, res, next) {\n    res.header(`Access-Control-Allow-Headers`, `Content-Type`); // todo: wildcard?\n    res.header(`Access-Control-Allow-Origin`, `*`);\n    next();\n  });\n\n  router.use(`/analytics`, _analyticsRoutes__WEBPACK_IMPORTED_MODULE_1__.default);\n  router.use(`/blog`, _blogRoutes__WEBPACK_IMPORTED_MODULE_2__.default);\n  router.use(`/my`, _privateRoutes__WEBPACK_IMPORTED_MODULE_3__.default);\n\n  return router;\n}\n\n\n\n\n//# sourceURL=webpack:///../src/api/index.js?");

/***/ }),

/***/ "../src/api/privateRoutes.js":
/*!***********************************!*\
  !*** ../src/api/privateRoutes.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\n/* require auth on all private routes */\n// router.use(function requireAuth() { });\n\nrouter.get(`*`, function noop(req, res) {\n  const response = {\n    data: [{\"_id\":\"5e80e46a825e6800048bea84\",\"tags\":[\"programming\",\"jobs\",\"interviewing\"],\"text\":\"It's perhaps not super surprising that I got laid off earlier this month; global pandemics play hell on the travel industry, go figure.  It's weird to be the interviewee after 3+ years of interviewing frontend devs of all experience levels (and not interviewing anywhere at all myself during that period - I was happy where I was!).  And one of the things I'm learning is that most places have such godawful interview practices it's a wonder anybody actually works there.\\n\\n(and I have a whole aside, not super relevant here, about how a lot of that is due to new grads having crushing student-loan debt and tons of economic anxiety and companies being eager to provide a WE'RE FUN WE PLAY HARD AND PLEASE STAY AT THE OFFICE TIL 10PM office culture and it all combines to make companies feel like they have the power to grind applicants into the ground.)\\n\\nIt seems insane to me to conduct an interview any way other than one which mimics to the greatest extent possible the actual working conditions of the position. How are you going to be able to tell that a candidate is someone you'd want on the team and not just someone who has memorized a bunch of algorithms but can't code their way out of a wet paper bag?  When I ran frontend interviews at Wanderu the process went something like:\\n\\n- check out their Github/etc. presence, to see what kinds of code they write and what kinds of things they like to work on; then\\n- hold a ~30-minute pre-screen phone chat, to ask and answer some technical questions and to get a feel for what one-on-one meetings would be like; then\\n- provide an open-book take-home coding exercise, where they're given a codebase (closely based on the Wanderu production codebase) and a requirements doc and some design wireframes, to see if they can build out a (small, maybe ~250LOC) feature over the course of a few days; then\\n- have the other frontend devs tear apart their submission before and during the interview, to see how well they handle criticism of their code; then\\n- interview with designers, product people, and upper management, to see how well they interact with the people they'd be working with every day.\\n\\nFor this particular team and for this particular company's product, FizzBuzz is bullshit. Whiteboarding syntactically-correct code is bullshit. Memorizing trivia about today's hot Javascript framework is bullshit. And I think that's true for a lot of dev positions at a lot of companies. Very few places are doing the sort of work where every dev should know how to write a red-black tree class blindfolded. But those places are the Microsofts and Googles of the world, and if they're interviewing candidates a certain way then that must be the best way for every two-guys-and-a-webapp startup to do it too!, so here we are.\\n\\nBut every company in the world should be asking me to speak intelligently about what weird corners of past codebases I've had to pay extra unit-test attention to, or what proposals I wish TC39 would hurry up and get into the next version of ES.  Companies that instead ask me to turn an array into a binary tree, or to find the longest palindrome in a given string, or a trivia question where the answer should really be \\\"install a popular and well-tested npm module which does it for me\\\" are just wasting everybody's time.\",\"title\":\"interviewing is weird\",\"author\":\"orzechod@gmail.com\",\"comments\":[{\"_id\":\"5e9b178d8ac20e000401b919\",\"gravatarHash\":\"56caefa1a6f1f58ee54d9a5a753c7692\",\"name\":\"orzechod@gmail.com\",\"text\":\"lol interviewed at this one place and literally had to write the function which found the longest palindrome in a string.  ended up taking a position offered to me elsewhere.\"},{\"_id\":\"5f009d25eb4d30000459a464\",\"gravatarHash\":\"56caefa1a6f1f58ee54d9a5a753c7692\",\"name\":\"orzechod@gmail.com\",\"text\":\"http://lpiassaasly.website\"}],\"peerResourceId\":\"9dd0cd8b-0e3d-48df-bf0b-f7ac96020f1e\",\"__v\":\"2\"}\n    ],\n    metadata: {\n      count: 1\n    }\n  };\n\n  res.json(response).end();\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n\n//# sourceURL=webpack:///../src/api/privateRoutes.js?");

/***/ }),

/***/ "../src/db/index.js":
/*!**************************!*\
  !*** ../src/db/index.js ***!
  \**************************/
/*! namespace exports */
/*! export initDB [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initDB\": () => /* binding */ initDB\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"../src/types.js\");\n/* harmony import */ var _mongo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mongo */ \"../src/db/mongo/index.js\");\n\n\n\n\n/**\n * @return {Promise<types.DBConnection>}\n */\nasync function initDB() {\n  return (0,_mongo__WEBPACK_IMPORTED_MODULE_1__.init)();\n}\n\n\n\n\n//# sourceURL=webpack:///../src/db/index.js?");

/***/ }),

/***/ "../src/db/mongo/comments.js":
/*!***********************************!*\
  !*** ../src/db/mongo/comments.js ***!
  \***********************************/
/*! namespace exports */
/*! export CommentModel [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CommentSchema [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CommentSchema\": () => /* binding */ CommentSchema,\n/* harmony export */   \"CommentModel\": () => /* binding */ CommentModel\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst opts = {\n  strict: `throw`\n};\n\nconst CommentSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  gravatarHash: String,\n  name: {\n    required: true,\n    type: String\n  },\n  text: {\n    required: true,\n    type: String\n  }\n}, opts);\n\nconst CommentModel = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(`Comment`, CommentSchema);\n\n\n//# sourceURL=webpack:///../src/db/mongo/comments.js?");

/***/ }),

/***/ "../src/db/mongo/index.js":
/*!********************************!*\
  !*** ../src/db/mongo/index.js ***!
  \********************************/
/*! namespace exports */
/*! export init [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => /* binding */ init\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posts */ \"../src/db/mongo/posts.js\");\n\n\n\n\nclass DBConnection {\n  constructor(connection) {\n    this.connection = connection;\n  }\n\n  getBlogPosts(...args) {\n    return _posts__WEBPACK_IMPORTED_MODULE_1__.getPosts(...args);\n  }\n}\n\nasync function init() {\n  if (!process.env.DB_PASS\n      || !process.env.DB_USER\n      || !process.env.DB_URI) {\n    throw new Error(`missing mongo user/pass or db uri`);\n  }\n\n  const connection = await new Promise(function getConnection(res, rej) {\n    const auth = {\n      password: process.env.DB_PASS,\n      user: process.env.DB_USER\n    };\n    const connectionInstance = mongoose__WEBPACK_IMPORTED_MODULE_0___default().createConnection(\n      process.env.DB_URI, {\n        auth,\n        useFindAndModify: false,\n        useNewUrlParser: true,\n        useUnifiedTopology: true\n      }\n    );\n\n    connectionInstance.once(`open`, async function onConnect() {\n      console.info(`connected to database`);\n      _posts__WEBPACK_IMPORTED_MODULE_1__.init(connectionInstance);\n      res(new DBConnection(connectionInstance));\n    });\n  });\n\n  return connection;\n}\n\n\n\n\n//# sourceURL=webpack:///../src/db/mongo/index.js?");

/***/ }),

/***/ "../src/db/mongo/posts.js":
/*!********************************!*\
  !*** ../src/db/mongo/posts.js ***!
  \********************************/
/*! namespace exports */
/*! export PostSchema [provided] [no usage info] [missing usage info prevents renaming] */
/*! export addComment [provided] [no usage info] [missing usage info prevents renaming] */
/*! export addPost [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getPosts [provided] [no usage info] [missing usage info prevents renaming] */
/*! export init [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PostSchema\": () => /* binding */ PostSchema,\n/* harmony export */   \"addComment\": () => /* binding */ addComment,\n/* harmony export */   \"addPost\": () => /* binding */ addPost,\n/* harmony export */   \"getPosts\": () => /* binding */ getPosts,\n/* harmony export */   \"init\": () => /* binding */ init\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ \"../src/types.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _comments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comments */ \"../src/db/mongo/comments.js\");\n\n\n\n\n\n\nconst opts = {\n  strict: `throw`\n};\n\nconst PostSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_1___default().Schema)({\n  author: {\n    required: true,\n    type: String\n  },\n  comments: [ _comments__WEBPACK_IMPORTED_MODULE_2__.CommentSchema ],\n  peerResourceId: {\n    required: true,\n    type: String\n  },\n  tags: [ String ],\n  text: {\n    required: true,\n    type: String\n  },\n  title: {\n    required: true,\n    type: String\n  }\n}, opts);\n\nlet Post = null;\n\n/** @type {types.DBQueryFunction<types.BlogPostComment>} */\nasync function addComment(dbQuery) {\n  const {\n    data: newComment,\n    which\n  } = dbQuery;\n  const {\n    id\n  } = which;\n\n  try {\n    const post = await Post.findById(id).exec();\n\n    post.comments = [\n      ...post.comments,\n      new _comments__WEBPACK_IMPORTED_MODULE_2__.CommentModel(newComment) // peer resource id here?\n    ];\n\n    await post.save();\n\n    return {\n      data: post.comments.slice(-1),\n      metadata: {\n        total: 1\n      }\n    };\n  } catch (ex) {\n    return {\n      data: [],\n      metadata: {\n        error: ex.toString()\n      }\n    };\n  }\n}\n\n/** @type {types.DBQueryFunction<types.BlogPost>} */\nasync function addPost(dbQuery) {\n  const {\n    data: newPost\n  } = dbQuery;\n\n  try {\n    const post = new Post(newPost);\n\n    await post.save();\n\n    return {\n      data: [ newPost ],\n      metadata: {\n        total: 1\n      }\n    };\n  } catch (ex) {\n    return {\n      data: [],\n      metadata: {\n        error: ex.toString()\n      }\n    };\n  }\n}\n\n/** @type {types.DBQueryFunction<types.BlogPost>} */\nasync function getPosts(dbQuery) {\n  const {\n    count = 1,\n    start = 0,\n    which\n  } = dbQuery;\n  const findArgs = which && which._id\n    ? { _id: which._id }\n    : {};\n  const dataQuery = Post.find(findArgs)\n    .sort(`field -_id`)\n    .skip(+start)\n    .limit(+count)\n    .lean()\n    .exec();\n  const totalQuery = Post.countDocuments(findArgs)\n    .exec();\n\n  const [ total, data ] = await Promise.all([\n    totalQuery,\n    dataQuery\n  ]);\n\n  return {\n    data,\n    metadata: {\n      total\n    }\n  };\n}\n\nfunction init(dbConnection) {\n  Post = dbConnection.model(`Post`, PostSchema);\n}\n\n\n//# sourceURL=webpack:///../src/db/mongo/posts.js?");

/***/ }),

/***/ "../src/index.js":
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"../src/api/index.js\");\n/* harmony import */ var _db_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db/index */ \"../src/db/index.js\");\n\n\n\n\n\nasync function factory() {\n  const app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n  const dbConnection = await (0,_db_index__WEBPACK_IMPORTED_MODULE_2__.initDB)();\n\n  app.use(`/api/1`, (0,_api__WEBPACK_IMPORTED_MODULE_1__.factory)(dbConnection));\n\n  /* middleware with arguments.length of 4 is treated as an error handler */\n  /* eslint-disable-next-line no-unused-vars */\n  app.use(function(err, req, res, next) {\n    console.warn(err);\n    res.status(500).end();\n  });\n\n  return app;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (factory);\n\n\n//# sourceURL=webpack:///../src/index.js?");

/***/ }),

/***/ "../src/types.js":
/*!***********************!*\
  !*** ../src/types.js ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// TODO: put data-model types somewhere common\n\n/**\n * @typedef {Object} BlogPost\n * @property {string} author\n * @property {string[]} tags\n * @property {string} title\n */\n\n/**\n * @typedef {Object} BlogPostComment\n * @property {string} id\n */\n\n/**\n * @typedef {Object} DBQuery\n * @property {number} [count] return this many things upon read\n * @property {T} [data] create/update body\n * @property {number} [start] start here upon read\n * @property {T} [which] only read/delete these things\n * @template T\n */\n\n/**\n * @typedef {Object} BaseDBRecord\n * @property {string} _id\n */\n\n/**\n * @typedef {T & BaseDBRecord} DBRecord\n * @template T\n */\n\n/**\n * @typedef {Object} DBResult\n * @property {Array<DBRecord<T>>} data\n * @property {Object} metadata\n * @property {string} [metadata.error]\n * @property {number} metadata.total\n * @template T\n */\n\n/**\n * @typedef {Promise<DBResult<T>>} DBQueryResult\n * @template T\n */\n\n/**\n * @typedef {(arg0: DBQuery<T>) => DBQueryResult<T>} DBQueryFunction\n * @template T\n */\n\n/**\n * @typedef {Object} DBConnection\n * @property {DBQueryFunction<BlogPost>} getBlogPosts\n */\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});\n\n\n//# sourceURL=webpack:///../src/types.js?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = require(\"dotenv\");;\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = require(\"express\");;\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = require(\"http\");;\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = require(\"mongoose\");;\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = require(\"source-map-support\");;\n\n//# sourceURL=webpack:///external_%22source-map-support%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => "" + __webpack_require__.h() + ".hot-update.json";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "da36b545649f4ae1956b"
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: currentChildModule !== moduleId,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 					else hot._acceptedDependencies[dep] = callback || function () {};
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				registeredStatusHandlers[i].call(null, newStatus);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			setStatus("check");
/******/ 			return __webpack_require__.hmrM().then(function (update) {
/******/ 				if (!update) {
/******/ 					setStatus(applyInvalidatedModules() ? "ready" : "idle");
/******/ 					return null;
/******/ 				}
/******/ 		
/******/ 				setStatus("prepare");
/******/ 		
/******/ 				var updatedModules = [];
/******/ 				blockingPromises = [];
/******/ 				currentUpdateApplyHandlers = [];
/******/ 		
/******/ 				return Promise.all(
/******/ 					Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 						promises,
/******/ 						key
/******/ 					) {
/******/ 						__webpack_require__.hmrC[key](
/******/ 							update.c,
/******/ 							update.r,
/******/ 							update.m,
/******/ 							promises,
/******/ 							currentUpdateApplyHandlers,
/******/ 							updatedModules
/******/ 						);
/******/ 						return promises;
/******/ 					},
/******/ 					[])
/******/ 				).then(function () {
/******/ 					return waitForBlockingPromises(function () {
/******/ 						if (applyOnUpdate) {
/******/ 							return internalApply(applyOnUpdate);
/******/ 						} else {
/******/ 							setStatus("ready");
/******/ 		
/******/ 							return updatedModules;
/******/ 						}
/******/ 					});
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				setStatus("abort");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			// handle errors in accept handlers and self accepted module load
/******/ 			if (error) {
/******/ 				setStatus("fail");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw error;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			if (queuedInvalidatedModules) {
/******/ 				return internalApply(options).then(function (list) {
/******/ 					outdatedModules.forEach(function (moduleId) {
/******/ 						if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 					});
/******/ 					return list;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			setStatus("idle");
/******/ 			return Promise.resolve(outdatedModules);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"main": 1
/******/ 		};
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				if (
/******/ 					__webpack_require__.c[outdatedModuleId] &&
/******/ 					__webpack_require__.c[outdatedModuleId].hot._selfAccepted &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!__webpack_require__.c[outdatedModuleId].hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: __webpack_require__.c[outdatedModuleId].hot._requireSelf,
/******/ 						errorHandler: __webpack_require__.c[outdatedModuleId].hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "accept-errored",
/******/ 												moduleId: outdatedModuleId,
/******/ 												dependencyId: dependenciesForCallbacks[k],
/******/ 												error: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err);
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 									}
/******/ 									reportError(err);
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			}).catch(function(err) { if(err.code !== "MODULE_NOT_FOUND") throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("../node_modules/node-hot-loader/HmrClient.js");
/******/ 	return __webpack_require__("./index.dev.js");
/******/ })()
;