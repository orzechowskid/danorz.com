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

/***/ "../src/api/blogRoutes.js":
/*!********************************!*\
  !*** ../src/api/blogRoutes.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '~/types'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\n/* require auth on all private routes */\n// router.use(function requireAuth() { });\n\nrouter.get(`*`, function noop(req, res) {\n  const {\n    /** @type {types.DBConnection} */\n    db\n  } = res.locals;\n  const response = { data: [], metadata: { count: 0 } };\n\n  res.json(response).end();\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n\n//# sourceURL=webpack:///../src/api/blogRoutes.js?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "1b26c3e3f3c47e43f96f"
/******/ 	})();
/******/ 	
/******/ }
;