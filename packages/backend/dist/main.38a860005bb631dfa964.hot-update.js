/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "main";
exports.ids = null;
exports.modules = {

/***/ "../src/db/index.js":
/*!**************************!*\
  !*** ../src/db/index.js ***!
  \**************************/
/*! namespace exports */
/*! export initDB [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initDB\": () => /* binding */ initDB\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"../src/types.js\");\n/* harmony import */ var _mongo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mongo */ \"../src/db/mongo/index.js\");\n\n\n\n\n/**\n * @return {Promise<types.DBConnection>}\n */\nasync function initDB() {\n  return _mongo__WEBPACK_IMPORTED_MODULE_1__.default.init();\n}\n\n\n\n\n//# sourceURL=webpack:///../src/db/index.js?");

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

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => /* binding */ init\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\n\nasync function init() {\n  if (!process.env.DBDB_PASS\n      || !process.env.DBDB_USER\n      || !process.env.DB_URI) {\n    throw new Error(`missing mongo user/pass or db uri`);\n  }\n\n  const connection = await new Promise(function getConnection(res, rej) {\n    const auth = {\n      password: process.env.DB_PASS,\n      user: process.env.DB_USER\n    };\n    const connectionInstance = mongoose__WEBPACK_IMPORTED_MODULE_0___default().createConnection(\n      process.env.DB_URI, {\n        auth,\n        useFindAndModify: false,\n        useNewUrlParser: true,\n        useUnifiedTopology: true\n      }\n    );\n\n    connectionInstance.once(`open`, async function onConnect() {\n      res(connectionInstance);\n    });\n  });\n\n  return connection;\n}\n\n\n\n\n//# sourceURL=webpack:///../src/db/mongo/index.js?");

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

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"../src/api/index.js\");\n/* harmony import */ var _db_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db/index */ \"../src/db/index.js\");\n/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/index */ \"../src/utils/index.js\");\n\n\n\n\n\n\nasync function factory() {\n  const app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n  const dbConnection = await (0,_db_index__WEBPACK_IMPORTED_MODULE_2__.initDB)();\n\n  app.use(`/api/1`, (0,_api__WEBPACK_IMPORTED_MODULE_1__.factory)(dbConnection));\n\n  app.get(`*`, function getAny(req, res) {\n    console.log(req.query);\n    res.json({\n      request: (0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.doStuff)(req.method, req.path),\n      response: \"sup dogg\"\n    }).end();\n  });\n\n  return app;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (factory);\n\n\n//# sourceURL=webpack:///../src/index.js?");

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

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// TODO: put data-model types somewhere common\n\n/**\n * @typedef {Object} BlogPost\n * @property {string} author\n * @property {string[]} tags\n * @property {string} title\n */\n\n/**\n * @typedef {Object} BlogPostComment\n * @property {string} id\n */\n\n/**\n * @typedef {Object} DBQuery\n * @property {number} [count] return this many things upon read\n * @property {T} [data] create/update body\n * @property {number} [start] start here upon read\n * @property {T} [which] only read/delete these things\n * @template T\n */\n\n/**\n * @typedef {Object} BaseDBRecord\n * @property {string} _id\n */\n\n/**\n * @typedef {T & BaseDBRecord} DBRecord\n * @template T\n */\n\n/**\n * @typedef {Object} DBResult\n * @property {Array<DBRecord<T>>} data\n * @property {Object} metadata\n * @property {string} [metadata.error]\n * @property {number} metadata.total\n * @template T\n */\n\n/**\n * @typedef {Promise<DBResult<T>>} DBQueryResult\n * @template T\n */\n\n/**\n * @typedef {(arg0: DBQuery<T>) => DBQueryResult<T>} DBQueryFunction\n * @template T\n */\n\n/**\n * @typedef {Object} DBConnection\n * @property {DBQueryFunction<BlogPost>} getBlogPosts\n */\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});\n\n\n//# sourceURL=webpack:///../src/types.js?");

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

"use strict";
eval("module.exports = require(\"mongoose\");;\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "e8580126182a657913d8"
/******/ 	})();
/******/ 	
/******/ }
;