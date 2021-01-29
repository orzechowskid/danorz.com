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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => /* binding */ init\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posts */ \"../src/db/mongo/posts.js\");\n\n\n\n\nclass DBConnection {\n  constructor(connection) {\n    this.connection = connection;\n  }\n\n  getBlogPosts(...args) {\n    return _posts__WEBPACK_IMPORTED_MODULE_1__.getPosts(...args);\n  }\n}\n\nasync function init() {\n  if (!process.env.DB_PASS\n      || !process.env.DB_USER\n      || !process.env.DB_URI) {\n    throw new Error(`missing mongo user/pass or db uri`);\n  }\n\n  const connection = await new Promise(function getConnection(res, rej) {\n    const auth = {\n      password: process.env.DB_PASS,\n      user: process.env.DB_USER\n    };\n    const connectionInstance = mongoose__WEBPACK_IMPORTED_MODULE_0___default().createConnection(\n      process.env.DB_URI, {\n        auth,\n        useFindAndModify: false,\n        useNewUrlParser: true,\n        useUnifiedTopology: true\n      }\n    );\n\n    connectionInstance.once(`open`, async function onConnect() {\n      console.info(`connected to database`);\n      _posts__WEBPACK_IMPORTED_MODULE_1__.init(connectionInstance);\n      res(new DBConnection(connectionInstance));\n    });\n  });\n\n  return connection;\n}\n\n\n\n\n//# sourceURL=webpack:///../src/db/mongo/index.js?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "0677ff3504ccc52468f6"
/******/ 	})();
/******/ 	
/******/ }
;