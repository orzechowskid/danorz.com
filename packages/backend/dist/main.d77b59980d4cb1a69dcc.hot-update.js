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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => /* binding */ init\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posts */ \"../src/db/mongo/posts.js\");\n\n\n\n\nasync function init() {\n  if (!process.env.DB_PASS\n      || !process.env.DB_USER\n      || !process.env.DB_URI) {\n    throw new Error(`missing mongo user/pass or db uri`);\n  }\n\n  const connection = await new Promise(function getConnection(res, rej) {\n    const auth = {\n      password: process.env.DB_PASS,\n      user: process.env.DB_USER\n    };\n    const connectionInstance = mongoose__WEBPACK_IMPORTED_MODULE_0___default().createConnection(\n      process.env.DB_URI, {\n        auth,\n        useFindAndModify: false,\n        useNewUrlParser: true,\n        useUnifiedTopology: true\n      }\n    );\n\n    connectionInstance.once(`open`, async function onConnect() {\n      _posts__WEBPACK_IMPORTED_MODULE_1__.init(connectionInstance);\n      res(connectionInstance);\n    });\n  });\n\n  return connection;\n}\n\n\n\n\n//# sourceURL=webpack:///../src/db/mongo/index.js?");

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

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PostSchema\": () => /* binding */ PostSchema,\n/* harmony export */   \"addComment\": () => /* binding */ addComment,\n/* harmony export */   \"addPost\": () => /* binding */ addPost,\n/* harmony export */   \"getPosts\": () => /* binding */ getPosts,\n/* harmony export */   \"init\": () => /* binding */ init\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ \"../src/types.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '.Comment'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n\n\n\n\nconst opts = {\n  strict: `throw`\n};\n\nconst PostSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_1___default().Schema)({\n  author: {\n    required: true,\n    type: String\n  },\n  comments: [ Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '.Comment'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) ],\n  peerResourceId: {\n    required: true,\n    type: String\n  },\n  tags: [ String ],\n  text: {\n    required: true,\n    type: String\n  },\n  title: {\n    required: true,\n    type: String\n  }\n}, opts);\n\nlet Post = null;\n\n/** @type {types.DBQueryFunction<types.BlogPostComment>} */\nasync function addComment(dbQuery) {\n  const {\n    data: newComment,\n    which\n  } = dbQuery;\n  const {\n    id\n  } = which;\n\n  try {\n    const post = await Post.findById(id).exec();\n\n    post.comments = [\n      ...post.comments,\n      new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '.Comment'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(newComment) // peer resource id here?\n    ];\n\n    await post.save();\n\n    return {\n      data: post.comments.slice(-1),\n      metadata: {\n        total: 1\n      }\n    };\n  } catch (ex) {\n    return {\n      data: [],\n      metadata: {\n        error: ex.toString()\n      }\n    };\n  }\n}\n\n/** @type {types.DBQueryFunction<types.BlogPost>} */\nasync function addPost(dbQuery) {\n  const {\n    data: newPost\n  } = dbQuery;\n\n  try {\n    const post = new Post(newPost);\n\n    await post.save();\n\n    return {\n      data: [ newPost ],\n      metadata: {\n        total: 1\n      }\n    };\n  } catch (ex) {\n    return {\n      data: [],\n      metadata: {\n        error: ex.toString()\n      }\n    };\n  }\n}\n\n/** @type {types.DBQueryFunction<types.BlogPost>} */\nasync function getPosts(dbQuery) {\n  const {\n    count = 1,\n    start = 0,\n    which\n  } = dbQuery;\n  const findArgs = which && which._id\n    ? { _id: which._id }\n    : {};\n  const dataQuery = Post.find(findArgs)\n    .sort(`field -_id`)\n    .skip(+start)\n    .limit(+count)\n    .lean()\n    .exec();\n  const totalQuery = Post.count(findArgs)\n    .exec();\n\n  const [ total, data ] = await Promise.all([\n    totalQuery,\n    dataQuery\n  ]);\n\n  return {\n    data,\n    metadata: {\n      total\n    }\n  };\n}\n\nfunction init(dbConnection) {\n  Post = dbConnection.model(`Post`, PostSchema);\n}\n\n\n//# sourceURL=webpack:///../src/db/mongo/posts.js?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "832c1653de7f1bf5397e"
/******/ 	})();
/******/ 	
/******/ }
;