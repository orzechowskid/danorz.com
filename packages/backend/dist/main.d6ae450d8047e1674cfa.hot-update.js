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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initDB\": () => /* binding */ initDB\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"../src/types.js\");\n/* harmony import */ var _mongo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mongo */ \"../src/db/mongo/index.js\");\n\n\n\n\n/**\n * @return {Promise<types.DBConnection>}\n */\nasync function initDB() {\n  return mongo.init();\n}\n\n\n\n\n//# sourceURL=webpack:///../src/db/index.js?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "8f0ff51ddbd127b343cf"
/******/ 	})();
/******/ 	
/******/ }
;