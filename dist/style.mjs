/******/ var __webpack_modules__ = ({

/***/ "./src/style/objectsList.scss"
/*!************************************!*\
  !*** ./src/style/objectsList.scss ***!
  \************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `data-view {
  border: 1px solid var(--second);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  user-select: none;
}
data-view table-view {
  display: block;
  flex-grow: 1;
  overflow: auto;
  --rowHeight: 41px;
}
data-view table-view .head {
  position: sticky;
  top: 0;
  z-index: 1;
  height: 19px;
  background: var(--second);
}
data-view table-view .head .column {
  background: var(--second);
  color: var(--textSecondColor);
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  position: absolute;
  padding: 0 10px;
  box-sizing: border-box;
  height: 19px;
  transform: translateX(var(--move-x));
}
data-view table-view .head .column.ableToSort {
  cursor: pointer;
}
data-view table-view .head .column.ableToSort::before {
  transform: scaleY(0);
  transition: all 300ms ease-out;
  position: absolute;
  right: 0;
}
data-view table-view .head .column.ableToSort[data-order=asc]::before {
  transform: scaleY(1);
}
data-view table-view .head .column.ableToSort[data-order=desc]::before {
  transform: scaleY(-1);
}
data-view table-view .head .column.ableToSort .tableCopy {
  display: none;
}
data-view table-view .body {
  position: relative;
}
data-view table-view .body .tr {
  display: flex;
  position: absolute;
  transition: top 300ms ease, background 100ms;
  table-layout: fixed;
  flex-direction: row;
  animation: data-view-appear 200ms;
}
@keyframes data-view-appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
data-view table-view .body .tr.selectedMain, data-view table-view .body .tr:focus {
  outline: 2px black dashed;
  outline-offset: -2px;
}
data-view table-view .body .tr .td {
  padding: 5px 10px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  flex: 0 0 auto;
  box-sizing: border-box;
  height: var(--rowHeight);
  line-height: calc(var(--rowHeight) - 10px);
}
data-view table-view .body .tr .td button, data-view table-view .body .tr .td .button {
  font-size: 16px;
  margin-left: 2px;
}
data-view table-view .body .tr .td.actions {
  display: flex;
}
data-view list-view {
  display: block;
  flex-grow: 1;
  overflow: auto;
}
data-view list-view .body {
  position: relative;
}
data-view list-view .body .tr {
  display: grid;
  position: absolute;
  transition: top 300ms ease, background 100ms;
  animation: data-view-appear 200ms;
  grid-template-columns: max-content 1fr max-content;
  width: 100%;
  padding: 10px 0;
}
data-view list-view .body .tr.selectedMain, data-view list-view .body .tr:focus {
  outline: 2px black dashed;
  outline-offset: -2px;
}
data-view list-view .body .tr button, data-view list-view .body .tr .button {
  font-size: 16px;
  margin-left: 2px;
}
data-view list-view .body .tr .icon {
  grid-column: 1;
  grid-row: 1/4;
  font-size: 40px;
  line-height: 63px;
}
data-view list-view .body .tr .keyValue {
  grid-column: 2/4;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 21px;
}
data-view list-view .body .tr .keyValue:nth-child(2), data-view list-view .body .tr .keyValue:nth-child(3) {
  grid-column: 2;
}
data-view list-view .body .tr .actions {
  grid-column: 3;
  grid-row: 1/3;
}
data-view calendar-view {
  flex-grow: 1;
}
data-view calendar-view .bodyContainer {
  overflow: scroll;
  display: grid;
  min-height: 100%;
}
data-view calendar-view .body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  min-height: 100%;
}
data-view calendar-view .body .day {
  display: flex;
  flex-direction: column;
}
data-view calendar-view .body .day .calendarDayActionsWrapper {
  flex-grow: 1;
}
data-view graph-view {
  flex-grow: 1;
}
data-view graph-view .bodyContainer {
  height: 100%;
}
data-view graph-view .bodyContainer svg {
  height: 100%;
  width: 100%;
}
data-view graph-view .bodyContainer svg .lineGraph {
  fill: none;
  stroke: black;
  stroke-width: 2px;
}
data-view .foot {
  border-top: 1px solid var(--second);
  display: flex;
  justify-content: space-between;
}
data-view .foot .button-wrapper {
  display: flex;
}
@media (max-width: 600px) {
  data-view .foot form input {
    width: 40px;
  }
  data-view .foot form input:focus {
    width: 200px;
    margin-left: -160px;
  }
}
data-view pagination-buttons {
  flex: 1 1;
  display: flex;
  justify-content: center;
}
data-view.infiniteScrollEnabled table-view .body, data-view.infiniteScrollEnabled list-view .body {
  height: var(--height);
}
data-view.infiniteScrollEnabled pagination-buttons {
  display: none;
}

pagination-buttons button.active {
  background: var(--main);
}

.categoryTableContainer:not(:has(.filter)) .filterHeader {
  display: none;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./node_modules/css-loader/dist/runtime/api.js"
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js"
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
(module) {



module.exports = function (i) {
  return i[1];
};

/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ const __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	const cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	const module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	if (!(moduleId in __webpack_modules__)) {
/******/ 		delete __webpack_module_cache__[moduleId];
/******/ 		const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 		e.code = 'MODULE_NOT_FOUND';
/******/ 		throw e;
/******/ 	}
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ // getDefaultExport function for compatibility with non-harmony modules
/******/ __webpack_require__.n = (module) => {
/******/ 	const getter = module && module.__esModule ?
/******/ 		() => (module['default']) :
/******/ 		() => (module);
/******/ 	__webpack_require__.d(getter, { a: getter });
/******/ 	return getter;
/******/ };
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ // define getter/value functions for harmony exports
/******/ __webpack_require__.d = (exports, definition) => {
/******/ 	for(var key in definition) {
/******/ 		if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 			Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 		}
/******/ 	}
/******/ };
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ // define __esModule on exports
/******/ __webpack_require__.r = (exports) => {
/******/ 	Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 	Object.defineProperty(exports, '__esModule', { value: true });
/******/ };
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module used 'module' so it can't be inlined
/******/ let __webpack_exports__ = __webpack_require__("./src/style/objectsList.scss");
/******/ const __webpack_exports__default = __webpack_exports__["default"];
/******/ export { __webpack_exports__default as default };
/******/ 
