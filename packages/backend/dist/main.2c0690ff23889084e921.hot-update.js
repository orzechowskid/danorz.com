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

/***/ "../src/api/analyticsRoutes.js":
/*!*************************************!*\
  !*** ../src/api/analyticsRoutes.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"../src/types.js\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\nrouter.get(`*`, async function doAnalytics(req, res, next) {\n  console.log(req.method, req.path, req.body);\n  /** @type {types.DBConnection} */\n//  const db = res.locals.db;\n  let err = null;\n\n  try {\n    const response = {\n      data: [ `dogg` ],\n      metadata: {\n        count: 1\n      }\n    };\n\n    res.json(response)\n      .end();\n  }\n  catch (ex) {\n    err = ex;\n  }\n\n  next(err);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n\n//# sourceURL=webpack:///../src/api/analyticsRoutes.js?");

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

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"factory\": () => /* binding */ factory\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _analyticsRoutes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analyticsRoutes */ \"../src/api/analyticsRoutes.js\");\n/* harmony import */ var _blogRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blogRoutes */ \"../src/api/blogRoutes.js\");\n/* harmony import */ var _privateRoutes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./privateRoutes */ \"../src/api/privateRoutes.js\");\n\n\n\n\n\n\nfunction factory(dbConnection) {\n  const router = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\n  router.use(function addDB(req, res, next) {\n    res.locals.db = dbConnection;\n\n    next();\n  });\n\n  router.use(function noCors(req, res, next) {\n    res.header(`Access-Control-Allow-Origin`, `*`);\n    next();\n  });\n\n  router.use(`/analytics`, _analyticsRoutes__WEBPACK_IMPORTED_MODULE_1__.default);\n  router.use(`/blog`, _blogRoutes__WEBPACK_IMPORTED_MODULE_2__.default);\n  router.use(`/my`, _privateRoutes__WEBPACK_IMPORTED_MODULE_3__.default);\n\n  return router;\n}\n\n\n\n\n//# sourceURL=webpack:///../src/api/index.js?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "42573d8dc10457d50a47"
/******/ 	})();
/******/ 	
/******/ }
;