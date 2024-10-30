/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/style/objectsList.scss":
/*!************************************!*\
  !*** ./src/style/objectsList.scss ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.contextMenu {\n  position: fixed;\n  z-index: 1000;\n  margin: 0;\n  padding: 0;\n  max-width: 100vh;\n  min-width: 200px;\n  user-select: none;\n  background: var(--background);\n}\n.contextMenu li, .contextMenu a {\n  display: flex;\n  cursor: pointer;\n  margin: 0;\n  white-space: nowrap;\n  align-items: center;\n}\n.contextMenu li .icon, .contextMenu a .icon {\n  display: inline-block;\n  flex: 0 0 50px;\n  text-align: center;\n  font-size: 1.2em;\n  line-height: 1em;\n  vertical-align: middle;\n}\n.contextMenu li .iconPlaceholder, .contextMenu a .iconPlaceholder {\n  display: inline-block;\n  width: 50px;\n}\n.contextMenu li .content, .contextMenu a .content {\n  flex: 1 1 auto;\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 15px 10px;\n  line-height: 1em;\n  vertical-align: middle;\n}\n\ndata-view {\n  border: 1px solid var(--second);\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 200px);\n  user-select: none;\n}\ndata-view table-view {\n  display: block;\n  flex-grow: 1;\n  overflow: auto;\n  --rowHeight: 41px;\n}\ndata-view table-view .head {\n  position: sticky;\n  top: 0;\n  z-index: 1;\n  height: 19px;\n  background: var(--second);\n}\ndata-view table-view .head .column {\n  background: var(--second);\n  color: var(--textSecondColor);\n  cursor: default;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: 700;\n  position: absolute;\n  padding: 0 10px;\n  box-sizing: border-box;\n  height: 19px;\n  transform: translateX(var(--move-x));\n}\ndata-view table-view .head .column.ableToSort {\n  cursor: pointer;\n}\ndata-view table-view .head .column.ableToSort::before {\n  transform: scaleY(0);\n  transition: all 300ms ease-out;\n  position: absolute;\n  right: 0;\n}\ndata-view table-view .head .column.ableToSort[data-order=asc]::before {\n  transform: scaleY(1);\n}\ndata-view table-view .head .column.ableToSort[data-order=desc]::before {\n  transform: scaleY(-1);\n}\ndata-view table-view .head .column.ableToSort .tableCopy {\n  display: none;\n}\ndata-view table-view .body {\n  position: relative;\n}\ndata-view table-view .body .tr {\n  display: flex;\n  position: absolute;\n  transition: top 300ms ease, background 100ms;\n  table-layout: fixed;\n  flex-direction: row;\n  animation: data-view-appear 200ms;\n}\n@keyframes data-view-appear {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\ndata-view table-view .body .tr.selectedMain, data-view table-view .body .tr:focus {\n  outline: 2px black dashed;\n  outline-offset: -2px;\n}\ndata-view table-view .body .tr .td {\n  padding: 5px 10px;\n  margin: 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  flex: 0 0 auto;\n  box-sizing: border-box;\n  height: var(--rowHeight);\n}\ndata-view table-view .body .tr .td button, data-view table-view .body .tr .td .button {\n  font-size: 16px;\n  margin-left: 2px;\n}\ndata-view table-view .body .tr .td.actions {\n  display: flex;\n}\ndata-view list-view {\n  display: block;\n  flex-grow: 1;\n  overflow: auto;\n}\ndata-view list-view .body {\n  position: relative;\n}\ndata-view list-view .body .tr {\n  display: grid;\n  position: absolute;\n  transition: top 300ms ease, background 100ms;\n  animation: data-view-appear 200ms;\n  grid-template-columns: max-content 1fr max-content;\n  width: 100%;\n  padding: 10px 0;\n}\ndata-view list-view .body .tr.selectedMain, data-view list-view .body .tr:focus {\n  outline: 2px black dashed;\n  outline-offset: -2px;\n}\ndata-view list-view .body .tr button, data-view list-view .body .tr .button {\n  font-size: 16px;\n  margin-left: 2px;\n}\ndata-view list-view .body .tr .icon {\n  grid-column: 1;\n  grid-row: 1/4;\n  font-size: 40px;\n  line-height: 63px;\n}\ndata-view list-view .body .tr .keyValue {\n  grid-column: 2/4;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  line-height: 21px;\n}\ndata-view list-view .body .tr .keyValue:nth-child(2), data-view list-view .body .tr .keyValue:nth-child(3) {\n  grid-column: 2;\n}\ndata-view list-view .body .tr .actions {\n  grid-column: 3;\n  grid-row: 1/3;\n}\ndata-view .foot {\n  border-top: 1px solid var(--second);\n  display: flex;\n  justify-content: space-between;\n}\n@media (max-width: 600px) {\n  data-view .foot form input {\n    width: 40px;\n  }\n  data-view .foot form input:focus {\n    width: 200px;\n    margin-left: -160px;\n  }\n}\ndata-view pagination-buttons {\n  flex: 1 1;\n  display: flex;\n  justify-content: center;\n}\ndata-view.infiniteScrollEnabled table-view .body, data-view.infiniteScrollEnabled list-view .body {\n  height: var(--height);\n}\ndata-view.infiniteScrollEnabled pagination-buttons {\n  display: none;\n}\n\npagination-buttons button.active {\n  background: var(--main);\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@green-code-studio/objects-list/./src/style/objectsList.scss?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://@green-code-studio/objects-list/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://@green-code-studio/objects-list/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/style/objectsList.scss");
/******/ var __webpack_exports__default = __webpack_exports__["default"];
/******/ export { __webpack_exports__default as default };
/******/ 
