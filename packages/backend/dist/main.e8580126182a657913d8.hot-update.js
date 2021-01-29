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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"factory\": () => /* binding */ factory\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _blogRoutes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blogRoutes */ \"../src/api/blogRoutes.js\");\n/* harmony import */ var _privateRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./privateRoutes */ \"../src/api/privateRoutes.js\");\n\n\n\n\n\nfunction factory(dbConnection) {\n  const router = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\n  router.use(function addDB(req, res, next) {\n    res.locals.db = dbConnection;\n\n    next();\n  });\n\n  router.use(function noCors(req, res, next) {\n    res.header(`Access-Control-Allow-Origin`, `*`);\n    next();\n  });\n\n  router.use(`/blog`, _blogRoutes__WEBPACK_IMPORTED_MODULE_1__.default);\n  router.use(`/my`, _privateRoutes__WEBPACK_IMPORTED_MODULE_2__.default);\n\n  return router;\n}\n\n\n\n\n//# sourceURL=webpack:///../src/api/index.js?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "d6ae450d8047e1674cfa"
/******/ 	})();
/******/ 	
/******/ }
;