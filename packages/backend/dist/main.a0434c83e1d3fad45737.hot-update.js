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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"../src/api/index.js\");\n/* harmony import */ var _db_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db/index */ \"../src/db/index.js\");\n/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/index */ \"../src/utils/index.js\");\n\n\n\n\n\n\nasync function factory() {\n  const app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n  const dbConnection = await (0,_db_index__WEBPACK_IMPORTED_MODULE_2__.initDB)();\n\n  app.use(`/api/1`, (0,_api__WEBPACK_IMPORTED_MODULE_1__.factory)(dbConnection));\n\n  /* middleware with arguments.length of 4 is treated as an error handler */\n  /* eslint-disable-next-line no-unused-vars */\n  app.use(function(err, req, res, next) {\n    console.warn(err);\n    res.status(500).end();\n  });\n\n  return app;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (factory);\n\n\n//# sourceURL=webpack:///../src/index.js?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "f39a891a5970ee4ae62c"
/******/ 	})();
/******/ 	
/******/ }
;