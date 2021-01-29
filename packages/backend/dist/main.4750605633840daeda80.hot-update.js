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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"../src/types.js\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\nrouter.use(`*`, async function doAnalytics(req, res, next) {\n  //  /** @type {types.DBConnection} */\n  //  const db = res.locals.db;\n  let err = null;\n\n  try {\n    const response = {\n      data: [ `ok` ],\n      metadata: {\n        count: 1\n      }\n    };\n\n    res.json(response)\n      .end();\n  }\n  catch (ex) {\n    err = ex;\n  }\n\n  next(err);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n\n//# sourceURL=webpack:///../src/api/analyticsRoutes.js?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "da36b545649f4ae1956b"
/******/ 	})();
/******/ 	
/******/ }
;