module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "020e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastProduct_vue_vue_type_style_index_0_id_4538c332_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e8cb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastProduct_vue_vue_type_style_index_0_id_4538c332_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastProduct_vue_vue_type_style_index_0_id_4538c332_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastProduct_vue_vue_type_style_index_0_id_4538c332_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "0a06":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var buildURL = __webpack_require__("30b5");
var InterceptorManager = __webpack_require__("f6b4");
var dispatchRequest = __webpack_require__("5270");
var mergeConfig = __webpack_require__("4a7b");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0a9d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getParsingFlags; });
function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0df4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return indexOf; });
var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}




/***/ }),

/***/ "0df6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "0eaa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0f49":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return YEAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return MONTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HOUR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MINUTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SECOND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MILLISECOND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return WEEK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return WEEKDAY; });
var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;


/***/ }),

/***/ "0fc9":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "10e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deprecate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return deprecateSimple; });
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3031");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("886e");
/* harmony import */ var _is_undefined__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("93fc");




function warn(msg) {
    if (_hooks__WEBPACK_IMPORTED_MODULE_1__[/* hooks */ "a"].suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return Object(_extend__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function () {
        if (_hooks__WEBPACK_IMPORTED_MODULE_1__[/* hooks */ "a"].deprecationHandler != null) {
            _hooks__WEBPACK_IMPORTED_MODULE_1__[/* hooks */ "a"].deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (_hooks__WEBPACK_IMPORTED_MODULE_1__[/* hooks */ "a"].deprecationHandler != null) {
        _hooks__WEBPACK_IMPORTED_MODULE_1__[/* hooks */ "a"].deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

_hooks__WEBPACK_IMPORTED_MODULE_1__[/* hooks */ "a"].suppressDeprecationWarnings = false;
_hooks__WEBPACK_IMPORTED_MODULE_1__[/* hooks */ "a"].deprecationHandler = null;


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "1173":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1654":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("71c1")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("30f1")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "1691":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1d2b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "203a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DangerScale_vue_vue_type_style_index_0_id_f4e71c6c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("76a1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DangerScale_vue_vue_type_style_index_0_id_f4e71c6c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DangerScale_vue_vue_type_style_index_0_id_f4e71c6c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DangerScale_vue_vue_type_style_index_0_id_f4e71c6c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "2070":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "20d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2398":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hasOwnProp; });
function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "241e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "243d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultLongDateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return longDateFormat; });
var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}


/***/ }),

/***/ "2444":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__("c532");
var normalizeHeaderName = __webpack_require__("c8af");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__("b50d");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("b50d");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("f28c")))

/***/ }),

/***/ "24c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var global = __webpack_require__("e53d");
var ctx = __webpack_require__("d864");
var classof = __webpack_require__("40c3");
var $export = __webpack_require__("63b6");
var isObject = __webpack_require__("f772");
var aFunction = __webpack_require__("79aa");
var anInstance = __webpack_require__("1173");
var forOf = __webpack_require__("a22a");
var speciesConstructor = __webpack_require__("f201");
var task = __webpack_require__("4178").set;
var microtask = __webpack_require__("aba2")();
var newPromiseCapabilityModule = __webpack_require__("656e");
var perform = __webpack_require__("4439");
var userAgent = __webpack_require__("bc13");
var promiseResolve = __webpack_require__("cd78");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("5168")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("5c95")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("45f2")($Promise, PROMISE);
__webpack_require__("4c95")(PROMISE);
Wrapper = __webpack_require__("584a")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("4ee1")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "252c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export install */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResizeObserver; });
function getInternetExplorerVersion() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return -1;
}

var isIE = void 0;

function initCompat() {
	if (!initCompat.init) {
		initCompat.init = true;
		isIE = getInternetExplorerVersion() !== -1;
	}
}

var ResizeObserver = { render: function render() {
		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "resize-observer", attrs: { "tabindex": "-1" } });
	}, staticRenderFns: [], _scopeId: 'data-v-b329ee4c',
	name: 'resize-observer',

	methods: {
		compareAndNotify: function compareAndNotify() {
			if (this._w !== this.$el.offsetWidth || this._h !== this.$el.offsetHeight) {
				this._w = this.$el.offsetWidth;
				this._h = this.$el.offsetHeight;
				this.$emit('notify');
			}
		},
		addResizeHandlers: function addResizeHandlers() {
			this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify);
			this.compareAndNotify();
		},
		removeResizeHandlers: function removeResizeHandlers() {
			if (this._resizeObject && this._resizeObject.onload) {
				if (!isIE && this._resizeObject.contentDocument) {
					this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify);
				}
				delete this._resizeObject.onload;
			}
		}
	},

	mounted: function mounted() {
		var _this = this;

		initCompat();
		this.$nextTick(function () {
			_this._w = _this.$el.offsetWidth;
			_this._h = _this.$el.offsetHeight;
		});
		var object = document.createElement('object');
		this._resizeObject = object;
		object.setAttribute('aria-hidden', 'true');
		object.setAttribute('tabindex', -1);
		object.onload = this.addResizeHandlers;
		object.type = 'text/html';
		if (isIE) {
			this.$el.appendChild(object);
		}
		object.data = 'about:blank';
		if (!isIE) {
			this.$el.appendChild(object);
		}
	},
	beforeDestroy: function beforeDestroy() {
		this.removeResizeHandlers();
	}
};

// Install the components
function install(Vue) {
	Vue.component('resize-observer', ResizeObserver);
	Vue.component('ResizeObserver', ResizeObserver);
}

// Plugin
var plugin = {
	// eslint-disable-next-line no-undef
	version: "0.4.5",
	install: install
};

// Auto-install
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}


/* unused harmony default export */ var _unused_webpack_default_export = (plugin);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "25eb":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "29f2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toInt; });
/* harmony import */ var _abs_floor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("38c8");


function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = Object(_abs_floor__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(coercedNumber);
    }

    return value;
}


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d83":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__("387f");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2e67":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "3024":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "3031":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extend; });
/* harmony import */ var _has_own_prop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2398");


function extend(a, b) {
    for (var i in b) {
        if (Object(_has_own_prop__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(b, i)) {
            a[i] = b[i];
        }
    }

    if (Object(_has_own_prop__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(b, 'toString')) {
        a.toString = b.toString;
    }

    if (Object(_has_own_prop__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}


/***/ }),

/***/ "30b5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "30f1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var $iterCreate = __webpack_require__("8f60");
var setToStringTag = __webpack_require__("45f2");
var getPrototypeOf = __webpack_require__("53e2");
var ITERATOR = __webpack_require__("5168")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "32fc":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("e53d").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "335c":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6b4c");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "3625":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return formattingTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return formatTokenFunctions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addFormatToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return formatMoment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return expandFormat; });
/* harmony import */ var _utils_zero_fill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4de3");
/* harmony import */ var _utils_is_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6937");



var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return Object(_utils_zero_fill__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += Object(_utils_is_function__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}


/***/ }),

/***/ "36c3":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("335c");
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "3702":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("481b");
var ITERATOR = __webpack_require__("5168")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "376f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoModal_vue_vue_type_style_index_0_id_006085b8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c790");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoModal_vue_vue_type_style_index_0_id_006085b8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoModal_vue_vue_type_style_index_0_id_006085b8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoModal_vue_vue_type_style_index_0_id_006085b8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "384c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultCalendar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calendar; });
/* harmony import */ var _utils_is_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6937");
var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};



function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return Object(_utils_is_function__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(output) ? output.call(mom, now) : output;
}


/***/ }),

/***/ "387f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "38bc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductHeader_vue_vue_type_style_index_0_id_37cd4608_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f6d4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductHeader_vue_vue_type_style_index_0_id_37cd4608_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductHeader_vue_vue_type_style_index_0_id_37cd4608_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductHeader_vue_vue_type_style_index_0_id_37cd4608_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "38c8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return absFloor; });
function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3915":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3934":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "3a38":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "3c11":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("63b6");
var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var speciesConstructor = __webpack_require__("f201");
var promiseResolve = __webpack_require__("cd78");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "3d0f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "40c3":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("6b4c");
var TAG = __webpack_require__("5168")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "4137":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isNumber; });
function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}


/***/ }),

/***/ "4178":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("d864");
var invoke = __webpack_require__("3024");
var html = __webpack_require__("32fc");
var cel = __webpack_require__("1ec9");
var global = __webpack_require__("e53d");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("6b4c")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "42e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makeGetSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return stringGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return stringSet; });
/* harmony import */ var _units_aliases__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f987");
/* harmony import */ var _units_priorities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d4a2");
/* harmony import */ var _utils_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("886e");
/* harmony import */ var _utils_is_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("6937");
/* harmony import */ var _units_month__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("9279");
/* harmony import */ var _units_year__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ec30");







function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set(this, unit, value);
            _utils_hooks__WEBPACK_IMPORTED_MODULE_2__[/* hooks */ "a"].updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && Object(_units_year__WEBPACK_IMPORTED_MODULE_5__[/* isLeapYear */ "d"])(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), Object(_units_month__WEBPACK_IMPORTED_MODULE_4__[/* daysInMonth */ "a"])(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = Object(_units_aliases__WEBPACK_IMPORTED_MODULE_0__[/* normalizeUnits */ "c"])(units);
    if (Object(_utils_is_function__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = Object(_units_aliases__WEBPACK_IMPORTED_MODULE_0__[/* normalizeObjectUnits */ "b"])(units);
        var prioritized = Object(_units_priorities__WEBPACK_IMPORTED_MODULE_1__[/* getPrioritizedUnits */ "b"])(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = Object(_units_aliases__WEBPACK_IMPORTED_MODULE_0__[/* normalizeUnits */ "c"])(units);
        if (Object(_utils_is_function__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(this[units])) {
            return this[units](value);
        }
    }
    return this;
}


/***/ }),

/***/ "43fc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("63b6");
var newPromiseCapability = __webpack_require__("656e");
var perform = __webpack_require__("4439");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "4436":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BottomLine_vue_vue_type_style_index_0_id_0c46d67f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("924a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BottomLine_vue_vue_type_style_index_0_id_0c46d67f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BottomLine_vue_vue_type_style_index_0_id_0c46d67f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BottomLine_vue_vue_type_style_index_0_id_0c46d67f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4439":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "4474":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultLocaleWeekdays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return localeWeekdays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return defaultLocaleWeekdaysShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return localeWeekdaysShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultLocaleWeekdaysMin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return localeWeekdaysMin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return localeWeekdaysParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getSetDayOfWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getSetLocaleDayOfWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getSetISODayOfWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return weekdaysRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return weekdaysShortRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return weekdaysMinRegex; });
/* harmony import */ var _format_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3625");
/* harmony import */ var _aliases__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f987");
/* harmony import */ var _priorities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d4a2");
/* harmony import */ var _parse_regex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("f66e");
/* harmony import */ var _parse_token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("dff0");
/* harmony import */ var _utils_to_int__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("29f2");
/* harmony import */ var _utils_is_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("cef3");
/* harmony import */ var _utils_index_of__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("0df4");
/* harmony import */ var _utils_has_own_prop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("2398");
/* harmony import */ var _create_utc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("90e5");
/* harmony import */ var _create_parsing_flags__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("0a9d");












// FORMATTING

Object(_format_format__WEBPACK_IMPORTED_MODULE_0__[/* addFormatToken */ "a"])('d', 0, 'do', 'day');

Object(_format_format__WEBPACK_IMPORTED_MODULE_0__[/* addFormatToken */ "a"])('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

Object(_format_format__WEBPACK_IMPORTED_MODULE_0__[/* addFormatToken */ "a"])('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

Object(_format_format__WEBPACK_IMPORTED_MODULE_0__[/* addFormatToken */ "a"])('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

Object(_format_format__WEBPACK_IMPORTED_MODULE_0__[/* addFormatToken */ "a"])('e', 0, 0, 'weekday');
Object(_format_format__WEBPACK_IMPORTED_MODULE_0__[/* addFormatToken */ "a"])('E', 0, 0, 'isoWeekday');

// ALIASES

Object(_aliases__WEBPACK_IMPORTED_MODULE_1__[/* addUnitAlias */ "a"])('day', 'd');
Object(_aliases__WEBPACK_IMPORTED_MODULE_1__[/* addUnitAlias */ "a"])('weekday', 'e');
Object(_aliases__WEBPACK_IMPORTED_MODULE_1__[/* addUnitAlias */ "a"])('isoWeekday', 'E');

// PRIORITY
Object(_priorities__WEBPACK_IMPORTED_MODULE_2__[/* addUnitPriority */ "a"])('day', 11);
Object(_priorities__WEBPACK_IMPORTED_MODULE_2__[/* addUnitPriority */ "a"])('weekday', 11);
Object(_priorities__WEBPACK_IMPORTED_MODULE_2__[/* addUnitPriority */ "a"])('isoWeekday', 11);

// PARSING

Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('d',    _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* match1to2 */ "d"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('e',    _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* match1to2 */ "d"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('E',    _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* match1to2 */ "d"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

Object(_parse_token__WEBPACK_IMPORTED_MODULE_4__[/* addWeekParseToken */ "c"])(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        Object(_create_parsing_flags__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(config).invalidWeekday = input;
    }
});

Object(_parse_token__WEBPACK_IMPORTED_MODULE_4__[/* addWeekParseToken */ "c"])(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES
function shiftWeekdays (ws, n) {
    return ws.slice(n, 7).concat(ws.slice(0, n));
}

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    var weekdays = Object(_utils_is_array__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this._weekdays) ? this._weekdays :
        this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
    return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
        : (m) ? weekdays[m.day()] : weekdays;
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
        : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
        : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = Object(_create_utc__WEBPACK_IMPORTED_MODULE_9__[/* createUTC */ "a"])([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = _utils_index_of__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = Object(_create_utc__WEBPACK_IMPORTED_MODULE_9__[/* createUTC */ "a"])([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* matchWord */ "s"];
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* matchWord */ "s"];
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* matchWord */ "s"];
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = Object(_create_utc__WEBPACK_IMPORTED_MODULE_9__[/* createUTC */ "a"])([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* regexEscape */ "t"])(shortPieces[i]);
        longPieces[i] = Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* regexEscape */ "t"])(longPieces[i]);
        mixedPieces[i] = Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* regexEscape */ "t"])(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "45f2":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("d9f6").f;
var has = __webpack_require__("07e3");
var TAG = __webpack_require__("5168")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "467f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__("2d83");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "473a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4764":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isDate; });
function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}


/***/ }),

/***/ "481b":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4a7b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4c95":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var dP = __webpack_require__("d9f6");
var DESCRIPTORS = __webpack_require__("8e60");
var SPECIES = __webpack_require__("5168")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "4d0a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4de3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return zeroFill; });
function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}


/***/ }),

/***/ "4ee1":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("5168")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "50ed":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "5139":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-array.js
var is_array = __webpack_require__("cef3");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-object.js
var is_object = __webpack_require__("fa1e");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/utils/is-object-empty.js
function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-undefined.js
var is_undefined = __webpack_require__("93fc");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-number.js
var is_number = __webpack_require__("4137");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-date.js
var is_date = __webpack_require__("4764");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/utils/map.js
function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/valid.js + 1 modules
var valid = __webpack_require__("ffd7");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/moment/constructor.js
var moment_constructor = __webpack_require__("91bc");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/locale/locales.js
var locales = __webpack_require__("f200");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/hooks.js
var hooks = __webpack_require__("886e");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/month.js + 1 modules
var month = __webpack_require__("9279");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/constants.js
var constants = __webpack_require__("0f49");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/parsing-flags.js
var parsing_flags = __webpack_require__("0a9d");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/create/check-overflow.js




function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && Object(parsing_flags["a" /* default */])(m).overflow === -2) {
        overflow =
            a[constants["e" /* MONTH */]]       < 0 || a[constants["e" /* MONTH */]]       > 11  ? constants["e" /* MONTH */] :
            a[constants["a" /* DATE */]]        < 1 || a[constants["a" /* DATE */]]        > Object(month["a" /* daysInMonth */])(a[constants["i" /* YEAR */]], a[constants["e" /* MONTH */]]) ? constants["a" /* DATE */] :
            a[constants["b" /* HOUR */]]        < 0 || a[constants["b" /* HOUR */]]        > 24 || (a[constants["b" /* HOUR */]] === 24 && (a[constants["d" /* MINUTE */]] !== 0 || a[constants["f" /* SECOND */]] !== 0 || a[constants["c" /* MILLISECOND */]] !== 0)) ? constants["b" /* HOUR */] :
            a[constants["d" /* MINUTE */]]      < 0 || a[constants["d" /* MINUTE */]]      > 59  ? constants["d" /* MINUTE */] :
            a[constants["f" /* SECOND */]]      < 0 || a[constants["f" /* SECOND */]]      > 59  ? constants["f" /* SECOND */] :
            a[constants["c" /* MILLISECOND */]] < 0 || a[constants["c" /* MILLISECOND */]] > 999 ? constants["c" /* MILLISECOND */] :
            -1;

        if (Object(parsing_flags["a" /* default */])(m)._overflowDayOfYear && (overflow < constants["i" /* YEAR */] || overflow > constants["a" /* DATE */])) {
            overflow = constants["a" /* DATE */];
        }
        if (Object(parsing_flags["a" /* default */])(m)._overflowWeeks && overflow === -1) {
            overflow = constants["g" /* WEEK */];
        }
        if (Object(parsing_flags["a" /* default */])(m)._overflowWeekday && overflow === -1) {
            overflow = constants["h" /* WEEKDAY */];
        }

        Object(parsing_flags["a" /* default */])(m).overflow = overflow;
    }

    return m;
}


// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/date-from-array.js
var date_from_array = __webpack_require__("cab0");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/year.js
var year = __webpack_require__("ec30");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/week-calendar-utils.js
var week_calendar_utils = __webpack_require__("86ee");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/local.js
var local = __webpack_require__("e755");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/utils/defaults.js
// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/create/from-array.js









function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks["a" /* hooks */].now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, expectedWeekday, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[constants["a" /* DATE */]] == null && config._a[constants["e" /* MONTH */]] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[constants["i" /* YEAR */]], currentDate[constants["i" /* YEAR */]]);

        if (config._dayOfYear > Object(year["a" /* daysInYear */])(yearToUse) || config._dayOfYear === 0) {
            Object(parsing_flags["a" /* default */])(config)._overflowDayOfYear = true;
        }

        date = Object(date_from_array["b" /* createUTCDate */])(yearToUse, 0, config._dayOfYear);
        config._a[constants["e" /* MONTH */]] = date.getUTCMonth();
        config._a[constants["a" /* DATE */]] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[constants["b" /* HOUR */]] === 24 &&
            config._a[constants["d" /* MINUTE */]] === 0 &&
            config._a[constants["f" /* SECOND */]] === 0 &&
            config._a[constants["c" /* MILLISECOND */]] === 0) {
        config._nextDay = true;
        config._a[constants["b" /* HOUR */]] = 0;
    }

    config._d = (config._useUTC ? date_from_array["b" /* createUTCDate */] : date_from_array["a" /* createDate */]).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[constants["b" /* HOUR */]] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
        Object(parsing_flags["a" /* default */])(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[constants["i" /* YEAR */]], Object(week_calendar_utils["b" /* weekOfYear */])(Object(local["a" /* createLocal */])(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = Object(week_calendar_utils["b" /* weekOfYear */])(Object(local["a" /* createLocal */])(), dow, doy);

        weekYear = defaults(w.gg, config._a[constants["i" /* YEAR */]], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from beginning of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to beginning of week
            weekday = dow;
        }
    }
    if (week < 1 || week > Object(week_calendar_utils["c" /* weeksInYear */])(weekYear, dow, doy)) {
        Object(parsing_flags["a" /* default */])(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        Object(parsing_flags["a" /* default */])(config)._overflowWeekday = true;
    } else {
        temp = Object(week_calendar_utils["a" /* dayOfYearFromWeeks */])(weekYear, week, weekday, dow, doy);
        config._a[constants["i" /* YEAR */]] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/deprecate.js
var deprecate = __webpack_require__("10e2");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/day-of-week.js
var day_of_week = __webpack_require__("4474");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/create/from-string.js









// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        Object(parsing_flags["a" /* default */])(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        month["c" /* defaultLocaleMonthsShort */].indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = day_of_week["c" /* defaultLocaleWeekdaysShort */].indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            Object(parsing_flags["a" /* default */])(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = date_from_array["b" /* createUTCDate */].apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        Object(parsing_flags["a" /* default */])(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks["a" /* hooks */].createFromInputFallback(config);
}

hooks["a" /* hooks */].createFromInputFallback = Object(deprecate["a" /* deprecate */])(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// EXTERNAL MODULE: ./node_modules/moment/src/lib/parse/regex.js
var regex = __webpack_require__("f66e");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/parse/token.js
var parse_token = __webpack_require__("dff0");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/format/format.js
var format_format = __webpack_require__("3625");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/create/from-string-and-format.js










// constant that refers to the ISO standard
hooks["a" /* hooks */].ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks["a" /* hooks */].RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks["a" /* hooks */].ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks["a" /* hooks */].RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    Object(parsing_flags["a" /* default */])(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = Object(format_format["b" /* expandFormat */])(config._f, config._locale).match(format_format["e" /* formattingTokens */]) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(Object(regex["b" /* getParseRegexForToken */])(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                Object(parsing_flags["a" /* default */])(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (format_format["d" /* formatTokenFunctions */][token]) {
            if (parsedInput) {
                Object(parsing_flags["a" /* default */])(config).empty = false;
            }
            else {
                Object(parsing_flags["a" /* default */])(config).unusedTokens.push(token);
            }
            Object(parse_token["b" /* addTimeToArrayFromToken */])(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            Object(parsing_flags["a" /* default */])(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    Object(parsing_flags["a" /* default */])(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        Object(parsing_flags["a" /* default */])(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[constants["b" /* HOUR */]] <= 12 &&
        Object(parsing_flags["a" /* default */])(config).bigHour === true &&
        config._a[constants["b" /* HOUR */]] > 0) {
        Object(parsing_flags["a" /* default */])(config).bigHour = undefined;
    }

    Object(parsing_flags["a" /* default */])(config).parsedDateParts = config._a.slice(0);
    Object(parsing_flags["a" /* default */])(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[constants["b" /* HOUR */]] = meridiemFixWrap(config._locale, config._a[constants["b" /* HOUR */]], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/extend.js
var extend = __webpack_require__("3031");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/create/from-string-and-array.js






// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        Object(parsing_flags["a" /* default */])(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = Object(moment_constructor["b" /* copyConfig */])({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!Object(valid["b" /* isValid */])(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += Object(parsing_flags["a" /* default */])(tempConfig).charsLeftOver;

        //or tokens
        currentScore += Object(parsing_flags["a" /* default */])(tempConfig).unusedTokens.length * 10;

        Object(parsing_flags["a" /* default */])(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    Object(extend["a" /* default */])(config, bestMoment || tempConfig);
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/aliases.js
var aliases = __webpack_require__("f987");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/create/from-object.js




function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = Object(aliases["b" /* normalizeObjectUnits */])(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/create/from-anything.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return prepareConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createLocalOrUTC; });




















function createFromConfig (config) {
    var res = new moment_constructor["a" /* Moment */](checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || Object(locales["b" /* getLocale */])(config._l);

    if (input === null || (format === undefined && input === '')) {
        return Object(valid["a" /* createInvalid */])({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (Object(moment_constructor["c" /* isMoment */])(input)) {
        return new moment_constructor["a" /* Moment */](checkOverflow(input));
    } else if (Object(is_date["a" /* default */])(input)) {
        config._d = input;
    } else if (Object(is_array["a" /* default */])(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!Object(valid["b" /* isValid */])(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (Object(is_undefined["a" /* default */])(input)) {
        config._d = new Date(hooks["a" /* hooks */].now());
    } else if (Object(is_date["a" /* default */])(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (Object(is_array["a" /* default */])(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (Object(is_object["a" /* default */])(input)) {
        configFromObject(config);
    } else if (Object(is_number["a" /* default */])(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks["a" /* hooks */].createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((Object(is_object["a" /* default */])(input) && isObjectEmpty(input)) ||
            (Object(is_array["a" /* default */])(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}


/***/ }),

/***/ "5168":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("dbdb")('wks');
var uid = __webpack_require__("62a0");
var Symbol = __webpack_require__("e53d").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "5270":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var transformData = __webpack_require__("c401");
var isCancel = __webpack_require__("2e67");
var defaults = __webpack_require__("2444");
var isAbsoluteURL = __webpack_require__("d925");
var combineURLs = __webpack_require__("e683");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "5346":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeConfigs; });
/* harmony import */ var _utils_is_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6937");
/* harmony import */ var _utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3031");
/* harmony import */ var _utils_is_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fa1e");
/* harmony import */ var _utils_has_own_prop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2398");





function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (Object(_utils_is_function__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, parentConfig), prop;
    for (prop in childConfig) {
        if (Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(childConfig, prop)) {
            if (Object(_utils_is_object__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(parentConfig[prop]) && Object(_utils_is_object__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(childConfig[prop])) {
                res[prop] = {};
                Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(res[prop], parentConfig[prop]);
                Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(parentConfig, prop) &&
                !Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(childConfig, prop) &&
                Object(_utils_is_object__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, res[prop]);
        }
    }
    return res;
}


/***/ }),

/***/ "53e2":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("07e3");
var toObject = __webpack_require__("241e");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5559":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("dbdb")('keys');
var uid = __webpack_require__("62a0");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "555f":
/***/ (function(module, exports) {

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
/**
 * Owl carousel
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Proxied event handlers.
		 * @protected
		 */
		this._handlers = {};

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from being retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Widths of all items.
		 */
		this._widths = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		/**
		 * Current state information for the drag operation.
		 * @todo #261
		 * @protected
		 */
		this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		};

		/**
		 * Current state information and their tags.
		 * @type {Object}
		 * @protected
		 */
		this._states = {
			current: {},
			tags: {
				'initializing': [ 'busy' ],
				'animating': [ 'busy' ],
				'dragging': [ 'interacting' ]
			}
		};

		$.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
			this._handlers[handler] = $.proxy(this[handler], this);
		}, this));

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Workers, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,
		rewind: false,
		checkVisibility: true,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,

		fallbackEasing: 'swing',
		slideTransition: '',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		refreshClass: 'owl-refresh',
		loadedClass: 'owl-loaded',
		loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		stageClass: 'owl-stage',
		stageOuterClass: 'owl-stage-outer',
		grabClass: 'owl-grab'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Enumeration for types.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Type = {
		Event: 'event',
		State: 'state'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * List of workers involved in the update process.
	 */
	Owl.Workers = [ {
		filter: [ 'width', 'settings' ],
		run: function() {
			this._width = this.$element.width();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			this.$stage.children('.cloned').remove();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var margin = this.settings.margin || '',
				grid = !this.settings.autoWidth,
				rtl = this.settings.rtl,
				css = {
					'width': 'auto',
					'margin-left': rtl ? margin : '',
					'margin-right': rtl ? '' : margin
				};

			!grid && this.$stage.children().css(css);

			cache.css = css;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				merge = null,
				iterator = this._items.length,
				grid = !this.settings.autoWidth,
				widths = [];

			cache.items = {
				merge: false,
				width: width
			};

			while (iterator--) {
				merge = this._mergers[iterator];
				merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

				cache.items.merge = merge > 1 || cache.items.merge;

				widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
			}

			this._widths = widths;
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var clones = [],
				items = this._items,
				settings = this.settings,
				// TODO: Should be computed from number of min width items in stage
				view = Math.max(settings.items * 2, 4),
				size = Math.ceil(items.length / 2) * 2,
				repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
				append = '',
				prepend = '';

			repeat /= 2;

			while (repeat > 0) {
				// Switch to only using appended clones
				clones.push(this.normalize(clones.length / 2, true));
				append = append + items[clones[clones.length - 1]][0].outerHTML;
				clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
				prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
				repeat -= 1;
			}

			this._clones = clones;

			$(append).addClass('cloned').appendTo(this.$stage);
			$(prepend).addClass('cloned').prependTo(this.$stage);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				size = this._clones.length + this._items.length,
				iterator = -1,
				previous = 0,
				current = 0,
				coordinates = [];

			while (++iterator < size) {
				previous = coordinates[iterator - 1] || 0;
				current = this._widths[this.relative(iterator)] + this.settings.margin;
				coordinates.push(previous + current * rtl);
			}

			this._coordinates = coordinates;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var padding = this.settings.stagePadding,
				coordinates = this._coordinates,
				css = {
					'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
					'padding-left': padding || '',
					'padding-right': padding || ''
				};

			this.$stage.css(css);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var iterator = this._coordinates.length,
				grid = !this.settings.autoWidth,
				items = this.$stage.children();

			if (grid && cache.items.merge) {
				while (iterator--) {
					cache.css.width = this._widths[this.relative(iterator)];
					items.eq(iterator).css(cache.css);
				}
			} else if (grid) {
				cache.css.width = cache.items.width;
				items.css(cache.css);
			}
		}
	}, {
		filter: [ 'items' ],
		run: function() {
			this._coordinates.length < 1 && this.$stage.removeAttr('style');
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
			cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
			this.reset(cache.current);
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.active').removeClass('active');
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

			this.$stage.children('.center').removeClass('center');
			if (this.settings.center) {
				this.$stage.children().eq(this.current()).addClass('center');
			}
		}
	} ];

	/**
	 * Create the stage DOM element
	 */
	Owl.prototype.initializeStage = function() {
		this.$stage = this.$element.find('.' + this.settings.stageClass);

		// if the stage is already in the DOM, grab it and skip stage initialization
		if (this.$stage.length) {
			return;
		}

		this.$element.addClass(this.options.loadingClass);

		// create stage
		this.$stage = $('<' + this.settings.stageElement + '>', {
			"class": this.settings.stageClass
		}).wrap( $( '<div/>', {
			"class": this.settings.stageOuterClass
		}));

		// append stage
		this.$element.append(this.$stage.parent());
	};

	/**
	 * Create item DOM elements
	 */
	Owl.prototype.initializeItems = function() {
		var $items = this.$element.find('.owl-item');

		// if the items are already in the DOM, grab them and skip item initialization
		if ($items.length) {
			this._items = $items.get().map(function(item) {
				return $(item);
			});

			this._mergers = this._items.map(function() {
				return 1;
			});

			this.refresh();

			return;
		}

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// check visibility
		if (this.isVisible()) {
			// update view
			this.refresh();
		} else {
			// invalidate width
			this.invalidate('width');
		}

		this.$element
			.removeClass(this.options.loadingClass)
			.addClass(this.options.loadedClass);
	};

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.enter('initializing');
		this.trigger('initialize');

		this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

		if (this.settings.autoWidth && !this.is('pre-loading')) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
			}
		}

		this.initializeStage();
		this.initializeItems();

		// register event handlers
		this.registerEventHandlers();

		this.leave('initializing');
		this.trigger('initialized');
	};

	/**
	 * @returns {Boolean} visibility of $element
	 *                    if you know the carousel will always be visible you can set `checkVisibility` to `false` to
	 *                    prevent the expensive browser layout forced reflow the $element.is(':visible') does
	 */
	Owl.prototype.isVisible = function() {
		return this.settings.checkVisibility
			? this.$element.is(':visible')
			: true;
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			if (typeof settings.stagePadding === 'function') {
				settings.stagePadding = settings.stagePadding();
			}
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class',
					this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
				);
			}
		}

		this.trigger('change', { property: { name: 'settings', value: settings } });
		this._breakpoint = match;
		this.settings = settings;
		this.invalidate('settings');
		this.trigger('changed', { property: { name: 'settings', value: this.settings } });
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.options.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};

		!this.is('valid') && this.enter('valid');
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		this.enter('refreshing');
		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		this.$element.addClass(this.options.refreshClass);

		this.update();

		this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		this.trigger('refreshed');
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (!this.isVisible()) {
			return false;
		}

		this.enter('resizing');

		if (this.trigger('resize').isDefaultPrevented()) {
			this.leave('resizing');
			return false;
		}

		this.invalidate('width');

		this.refresh();

		this.leave('resizing');
		this.trigger('resized');
	};

	/**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 * @protected
	 */
	Owl.prototype.registerEventHandlers = function() {
		if ($.support.transition) {
			this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
		}

		if (this.settings.responsive !== false) {
			this.on(window, 'resize', this._handlers.onThrottledResize);
		}

		if (this.settings.mouseDrag) {
			this.$element.addClass(this.options.dragClass);
			this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
		}

		if (this.settings.touchDrag){
			this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
		}
	};

	/**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var stage = null;

		if (event.which === 3) {
			return;
		}

		if ($.support.transform) {
			stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
			stage = {
				x: stage[stage.length === 16 ? 12 : 4],
				y: stage[stage.length === 16 ? 13 : 5]
			};
		} else {
			stage = this.$stage.position();
			stage = {
				x: this.settings.rtl ?
					stage.left + this.$stage.width() - this.width() + this.settings.margin :
					stage.left,
				y: stage.top
			};
		}

		if (this.is('animating')) {
			$.support.transform ? this.animate(stage.x) : this.$stage.stop()
			this.invalidate('position');
		}

		this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

		this.speed(0);

		this._drag.time = new Date().getTime();
		this._drag.target = $(event.target);
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
		this._drag.pointer = this.pointer(event);

		$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

		$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
			var delta = this.difference(this._drag.pointer, this.pointer(event));

			$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

			if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
				return;
			}

			event.preventDefault();

			this.enter('dragging');
			this.trigger('drag');
		}, this));
	};

	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var minimum = null,
			maximum = null,
			pull = null,
			delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this.difference(this._drag.stage.start, delta);

		if (!this.is('dragging')) {
			return;
		}

		event.preventDefault();

		if (this.settings.loop) {
			minimum = this.coordinates(this.minimum());
			maximum = this.coordinates(this.maximum() + 1) - minimum;
			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
		} else {
			minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
		}

		this._drag.stage.current = stage;

		this.animate(stage.x);
	};

	/**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragEnd = function(event) {
		var delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this._drag.stage.current,
			direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

		$(document).off('.owl.core');

		this.$element.removeClass(this.options.grabClass);

		if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
			this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
			this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
			this.invalidate('position');
			this.update();

			this._drag.direction = direction;

			if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
				this._drag.target.one('click.owl.core', function() { return false; });
			}
		}

		if (!this.is('dragging')) {
			return;
		}

		this.leave('dragging');
		this.trigger('dragged');
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate, direction) {
		var position = -1,
			pull = 30,
			width = this.width(),
			coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				// on a left pull, check on current index
				if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
					position = index;
				// on a right pull, check on previous index
				// to do so, subtract width from value and set position = index + 1
				} else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
					position = index + 1;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] !== undefined ? coordinates[index + 1] : value - width)) {
					position = direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @todo #270
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		var animate = this.speed() > 0;

		this.is('animating') && this.onTransitionEnd();

		if (animate) {
			this.enter('animating');
			this.trigger('translate');
		}

		if ($.support.transform3d && $.support.transition) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px,0px,0px)',
				transition: (this.speed() / 1000) + 's' + (
					this.settings.slideTransition ? ' ' + this.settings.slideTransition : ''
				)
			});
		} else if (animate) {
			this.$stage.animate({
				left: coordinate + 'px'
			}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
		} else {
			this.$stage.css({
				left: coordinate + 'px'
			});
		}
	};

	/**
	 * Checks whether the carousel is in a specific state or not.
	 * @param {String} state - The state to check.
	 * @returns {Boolean} - The flag which indicates if the carousel is busy.
	 */
	Owl.prototype.is = function(state) {
		return this._states.current[state] && this._states.current[state] > 0;
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} [part] - The part to invalidate.
	 * @returns {Array.<String>} - The invalidated parts.
	 */
	Owl.prototype.invalidate = function(part) {
		if ($.type(part) === 'string') {
			this._invalidated[part] = true;
			this.is('valid') && this.leave('valid');
		}
		return $.map(this._invalidated, function(v, i) { return i });
	};

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position of an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = this._items.length,
			m = relative ? 0 : this._clones.length;

		if (!this.isNumeric(position) || n < 1) {
			position = undefined;
		} else if (position < 0 || position >= n + m) {
			position = ((position - m / 2) % n + n) % n + m / 2;
		}

		return position;
	};

	/**
	 * Converts an absolute position of an item into a relative one.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position -= this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var settings = this.settings,
			maximum = this._coordinates.length,
			iterator,
			reciprocalItemsWidth,
			elementWidth;

		if (settings.loop) {
			maximum = this._clones.length / 2 + this._items.length - 1;
		} else if (settings.autoWidth || settings.merge) {
			iterator = this._items.length;
			if (iterator) {
				reciprocalItemsWidth = this._items[--iterator].width();
				elementWidth = this.$element.width();
				while (iterator--) {
					reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
					if (reciprocalItemsWidth > elementWidth) {
						break;
					}
				}
			}
			maximum = iterator + 1;
		} else if (settings.center) {
			maximum = this._items.length - 1;
		} else {
			maximum = this._items.length - settings.items;
		}

		if (relative) {
			maximum -= this._clones.length / 2;
		}

		return Math.max(maximum, 0);
	};

	/**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		return relative ? 0 : this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var multiplier = 1,
			newPosition = position - 1,
			coordinate;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			if (this.settings.rtl) {
				multiplier = -1;
				newPosition = position + 1;
			}

			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
		} else {
			coordinate = this._coordinates[newPosition] || 0;
		}

		coordinate = Math.ceil(coordinate);

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		if (factor === 0) {
			return 0;
		}

		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		var current = this.current(),
			revert = null,
			distance = position - this.relative(current),
			direction = (distance > 0) - (distance < 0),
			items = this._items.length,
			minimum = this.minimum(),
			maximum = this.maximum();

		if (this.settings.loop) {
			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
				distance += direction * -1 * items;
			}

			position = current + distance;
			revert = ((position - minimum) % items + items) % items + minimum;

			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
				current = revert - distance;
				position = revert;
				this.reset(current);
			}
		} else if (this.settings.rewind) {
			maximum += 1;
			position = (position % maximum + maximum) % maximum;
		} else {
			position = Math.max(minimum, Math.min(maximum, position));
		}

		this.speed(this.duration(current, position, speed));
		this.current(position);

		if (this.isVisible()) {
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onTransitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.leave('animating');
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			console.warn('Can not detect viewport width.');
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		var current = this.relative(this._current);

		position = position === undefined ? this._items.length : this.normalize(position, true);
		content = content instanceof jQuery ? content : $(content);

		this.trigger('add', { content: content, position: position });

		content = this.prepare(content);

		if (this._items.length === 0 || position === this._items.length) {
			this._items.length === 0 && this.$stage.append(content);
			this._items.length !== 0 && this._items[position - 1].after(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this._items[current] && this.reset(this._items[current].index());

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Preloads images with auto width.
	 * @todo Replace by a more generic approach
	 * @protected
	 */
	Owl.prototype.preloadAutoWidthImages = function(images) {
		images.each($.proxy(function(i, element) {
			this.enter('pre-loading');
			element = $(element);
			$(new Image()).one('load', $.proxy(function(e) {
				element.attr('src', e.target.src);
				element.css('opacity', 1);
				this.leave('pre-loading');
				!this.is('pre-loading') && !this.is('initializing') && this.refresh();
			}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
		}, this));
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		this.$element.off('.owl.core');
		this.$stage.off('.owl.core');
		$(document).off('.owl.core');

		if (this.settings.responsive !== false) {
			window.clearTimeout(this.resizeTimer);
			this.off(window, 'resize', this._handlers.onThrottledResize);
		}

		for (var i in this._plugins) {
			this._plugins[i].destroy();
		}

		this.$stage.children('.cloned').remove();

		this.$stage.unwrap();
		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();
		this.$stage.remove();
		this.$element
			.removeClass(this.options.refreshClass)
			.removeClass(this.options.loadingClass)
			.removeClass(this.options.loadedClass)
			.removeClass(this.options.rtlClass)
			.removeClass(this.options.dragClass)
			.removeClass(this.options.grabClass)
			.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
			.removeData('owl.carousel');
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=carousel] - The event namespace.
	 * @param {String} [state] - The state which is associated with the event.
	 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace, state, enter) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.register({ type: Owl.Type.Event, name: name });
			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].call(this, event);
			}
		}

		return event;
	};

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
	Owl.prototype.enter = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			if (this._states.current[name] === undefined) {
				this._states.current[name] = 0;
			}

			this._states.current[name]++;
		}, this));
	};

	/**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	Owl.prototype.leave = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			this._states.current[name]--;
		}, this));
	};

	/**
	 * Registers an event or state.
	 * @public
	 * @param {Object} object - The event or state to register.
	 */
	Owl.prototype.register = function(object) {
		if (object.type === Owl.Type.Event) {
			if (!$.event.special[object.name]) {
				$.event.special[object.name] = {};
			}

			if (!$.event.special[object.name].owl) {
				var _default = $.event.special[object.name]._default;
				$.event.special[object.name]._default = function(e) {
					if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
						return _default.apply(this, arguments);
					}
					return e.namespace && e.namespace.indexOf('owl') > -1;
				};
				$.event.special[object.name].owl = true;
			}
		} else if (object.type === Owl.Type.State) {
			if (!this._states.tags[object.name]) {
				this._states.tags[object.name] = object.tags;
			} else {
				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
			}

			this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
				return $.inArray(tag, this._states.tags[object.name]) === i;
			}, this));
		}
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	};

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	};

	/**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @protected
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
	Owl.prototype.pointer = function(event) {
		var result = { x: null, y: null };

		event = event.originalEvent || event || window.event;

		event = event.touches && event.touches.length ?
			event.touches[0] : event.changedTouches && event.changedTouches.length ?
				event.changedTouches[0] : event;

		if (event.pageX) {
			result.x = event.pageX;
			result.y = event.pageY;
		} else {
			result.x = event.clientX;
			result.y = event.clientY;
		}

		return result;
	};

	/**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @protected
	 * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
	 * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
	 */
	Owl.prototype.isNumeric = function(number) {
		return !isNaN(parseFloat(number));
	};

	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @protected
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
	Owl.prototype.difference = function(first, second) {
		return {
			x: first.x - second.x,
			y: first.y - second.y
		};
	};

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @todo Navigation plugin `next` and `prev`
	 * @public
	 */
	$.fn.owlCarousel = function(option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			var $this = $(this),
				data = $this.data('owl.carousel');

			if (!data) {
				data = new Owl(this, typeof option == 'object' && option);
				$this.data('owl.carousel', data);

				$.each([
					'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
				], function(i, event) {
					data.register({ type: Owl.Type.Event, name: event });
					data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
						if (e.namespace && e.relatedTarget !== this) {
							this.suppress([ event ]);
							data[event].apply(this, [].slice.call(arguments, 1));
							this.release([ event ]);
						}
					}, data));
				});
			}

			if (typeof option == 'string' && option.charAt(0) !== '_') {
				data[option].apply(data, args);
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto refresh plugin.
	 * @class The Auto Refresh Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoRefresh = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Refresh interval.
		 * @protected
		 * @type {number}
		 */
		this._interval = null;

		/**
		 * Whether the element is currently visible or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._visible = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoRefresh) {
					this.watch();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoRefresh.Defaults = {
		autoRefresh: true,
		autoRefreshInterval: 500
	};

	/**
	 * Watches the element.
	 */
	AutoRefresh.prototype.watch = function() {
		if (this._interval) {
			return;
		}

		this._visible = this._core.isVisible();
		this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
	};

	/**
	 * Refreshes the element.
	 */
	AutoRefresh.prototype.refresh = function() {
		if (this._core.isVisible() === this._visible) {
			return;
		}

		this._visible = !this._visible;

		this._core.$element.toggleClass('owl-hidden', !this._visible);

		this._visible && (this._core.invalidate('width') && this._core.refresh());
	};

	/**
	 * Destroys the plugin.
	 */
	AutoRefresh.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this._interval);

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);
					//TODO: Need documentation for this new option
					if (settings.lazyLoadEager > 0) {
						n += settings.lazyLoadEager;
						// If the carousel is looping also preload images that are to the "left"
						if (settings.loop) {
              position -= settings.lazyLoadEager;
              n++;
            }
					}

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position)), load);
						position++;
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false,
		lazyLoadEager: 0
	};

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
                url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src') || $element.attr('data-srcset');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
            } else if ($element.is('source')) {
                $element.one('load.owl.lazy', $.proxy(function() {
                    this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
                }, this)).attr('srcset', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url("' + url + '")',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		this._previousHeight = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight && e.property.name === 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight
					&& e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
		this._intervalId = null;
		var refThis = this;

		// These changes have been taken from a PR by gavrochelegnou proposed in #1575
		// and have been made compatible with the latest jQuery version
		$(window).on('load', function() {
			if (refThis._core.settings.autoHeight) {
				refThis.update();
			}
		});

		// Autoresize the height of the carousel when window is resized
		// When carousel has images, the height is dependent on the width
		// and should also change on resize
		$(window).resize(function() {
			if (refThis._core.settings.autoHeight) {
				if (refThis._intervalId != null) {
					clearTimeout(refThis._intervalId);
				}

				refThis._intervalId = setTimeout(function() {
					refThis.update();
				}, 250);
			}
		});

	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		var start = this._core._current,
			end = start + this._core.settings.items,
			lazyLoadEnabled = this._core.settings.lazyLoad,
			visible = this._core.$stage.children().toArray().slice(start, end),
			heights = [],
			maxheight = 0;

		$.each(visible, function(index, item) {
			heights.push($(item).height());
		});

		maxheight = Math.max.apply(null, heights);

		if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) {
			maxheight = this._previousHeight;
		}

		this._previousHeight = maxheight;

		this._core.$stage.parent()
			.height(maxheight)
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] !== 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * All event handlers.
		 * @todo The cloned content removale is too late
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
				}
			}, this),
			'resize.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.is('resizing')) {
					this._core.$stage.find('.cloned .owl-video-frame').remove();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position' && this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				var $element = $(e.content).find('.owl-video');

				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {
			var type = (function() {
					if (target.attr('data-vimeo-id')) {
						return 'vimeo';
					} else if (target.attr('data-vzaar-id')) {
						return 'vzaar'
					} else {
						return 'youtube';
					}
				})(),
				id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
				width = target.attr('data-width') || this._core.settings.videoWidth,
				height = target.attr('data-height') || this._core.settings.videoHeight,
				url = target.attr('href');

		if (url) {

			/*
					Parses the id's out of the following urls (and probably more):
					https://www.youtube.com/watch?v=:id
					https://youtu.be/:id
					https://vimeo.com/:id
					https://vimeo.com/channels/:channel/:id
					https://vimeo.com/groups/:group/videos/:id
					https://app.vzaar.com/videos/:id

					Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
			*/

			id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else if (id[3].indexOf('vzaar') > -1) {
				type = 'vzaar';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {
		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'width:' + video.width + 'px;height:' + video.height + 'px;' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = $('<div/>',{
						"class": 'owl-video-tn ' + lazyClass,
						"srcType": path
					});
				} else {
					tnLink = $( '<div/>', {
						"class": "owl-video-tn",
						"style": 'opacity:1;background-image:url(' + path + ')'
					});
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap( $( '<div/>', {
			"class": "owl-video-wrapper",
			"style": dimensions
		}));

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: '//vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		} else if (video.type === 'vzaar') {
			$.ajax({
				type: 'GET',
				url: '//vzaar.com/api/videos/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data.framegrab_url;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
		this._core.leave('playing');
		this._core.trigger('stopped', null, 'video');
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} event - The event arguments.
	 */
	Video.prototype.play = function(event) {
		var target = $(event.target),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html,
			iframe;

		if (this._playing) {
			return;
		}

		this._core.enter('playing');
		this._core.trigger('play', null, 'video');

		item = this._core.items(this._core.relative(item.index()));

		this._core.reset(item.index());

		html = $( '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>' );
		html.attr( 'height', height );
		html.attr( 'width', width );
		if (video.type === 'youtube') {
			html.attr( 'src', '//www.youtube.com/embed/' + video.id + '?autoplay=1&rel=0&v=' + video.id );
		} else if (video.type === 'vimeo') {
			html.attr( 'src', '//player.vimeo.com/video/' + video.id + '?autoplay=1' );
		} else if (video.type === 'vzaar') {
			html.attr( 'src', '//view.vzaar.com/' + video.id + '/player?autoplay=true' );
		}

		iframe = $(html).wrap( '<div class="owl-video-frame" />' ).insertAfter(item.find('.owl-video'));

		this._playing = item.addClass('owl-video-playing');
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {
		var element = document.fullscreenElement || document.mozFullScreenElement ||
				document.webkitFullscreenElement;

		return element && $(element).parent().hasClass('owl-video-frame');
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this.swapping = e.type == 'translated';
				}
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1) {
			return;
		}

		if (!$.support.animation || !$.support.transition) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.one($.support.animation.end, clear)
				.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing);
		}

		if (incoming) {
			next.one($.support.animation.end, clear)
				.addClass('animated owl-animated-in')
				.addClass(incoming);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.onTransitionEnd();
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @author Tom De Caluwé
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The autoplay timeout id.
		 * @type {Number}
		 */
		this._call = null;

		/**
		 * Depending on the state of the plugin, this variable contains either
		 * the start time of the timer or the current timer value if it's
		 * paused. Since we start in a paused state we initialize the timer
		 * value.
		 * @type {Number}
		 */
		this._time = 0;

		/**
		 * Stores the timeout currently used.
		 * @type {Number}
		 */
		this._timeout = 0;

		/**
		 * Indicates whenever the autoplay is paused.
		 * @type {Boolean}
		 */
		this._paused = true;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'settings') {
					if (this._core.settings.autoplay) {
						this.play();
					} else {
						this.stop();
					}
				} else if (e.namespace && e.property.name === 'position' && this._paused) {
					// Reset the timer. This code is triggered when the position
					// of the carousel was changed through user interaction.
					this._time = 0;
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoplay) {
					this.play();
				}
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				if (e.namespace) {
					this.play(t, s);
				}
			}, this),
			'stop.owl.autoplay': $.proxy(function(e) {
				if (e.namespace) {
					this.stop();
				}
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.play();
				}
			}, this),
			'touchstart.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'touchend.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause) {
					this.play();
				}
			}, this)
		};

		// register event handlers
		this._core.$element.on(this._handlers);

		// set default options
		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * Transition to the next slide and set a timeout for the next transition.
	 * @private
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype._next = function(speed) {
		this._call = window.setTimeout(
			$.proxy(this._next, this, speed),
			this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()
		);

		if (this._core.is('interacting') || document.hidden) {
			return;
		}
		this._core.next(speed || this._core.settings.autoplaySpeed);
	}

	/**
	 * Reads the current timer value when the timer is playing.
	 * @public
	 */
	Autoplay.prototype.read = function() {
		return new Date().getTime() - this._time;
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		var elapsed;

		if (!this._core.is('rotating')) {
			this._core.enter('rotating');
		}

		timeout = timeout || this._core.settings.autoplayTimeout;

		// Calculate the elapsed time since the last transition. If the carousel
		// wasn't playing this calculation will yield zero.
		elapsed = Math.min(this._time % (this._timeout || timeout), timeout);

		if (this._paused) {
			// Start the clock.
			this._time = this.read();
			this._paused = false;
		} else {
			// Clear the active timeout to allow replacement.
			window.clearTimeout(this._call);
		}

		// Adjust the origin of the timer to match the new timeout value.
		this._time += this.read() % timeout - elapsed;

		this._timeout = timeout;
		this._call = window.setTimeout($.proxy(this._next, this, speed), timeout - elapsed);
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		if (this._core.is('rotating')) {
			// Reset the clock.
			this._time = 0;
			this._paused = true;

			window.clearTimeout(this._call);
			this._core.leave('rotating');
		}
	};

	/**
	 * Pauses the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		if (this._core.is('rotating') && !this._paused) {
			// Pause the clock.
			this._time = this.read();
			this._paused = true;

			window.clearTimeout(this._call);
		}
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		this.stop();

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
						$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
				}
			}, this),
			'added.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, this._templates.pop());
				}
			}, this),
			'remove.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && !this._initialized) {
					this._core.trigger('initialize', null, 'navigation');
					this.initialize();
					this.update();
					this.draw();
					this._initialized = true;
					this._core.trigger('initialized', null, 'navigation');
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._initialized) {
					this._core.trigger('refresh', null, 'navigation');
					this.update();
					this.draw();
					this._core.trigger('refreshed', null, 'navigation');
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navText: [
			'<span aria-label="' + 'Previous' + '">&#x2039;</span>',
			'<span aria-label="' + 'Next' + '">&#x203a;</span>'
		],
		navSpeed: false,
		navElement: 'button type="button" role="presentation"',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: [
			'owl-prev',
			'owl-next'
		],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotsData: false,
		dotsSpeed: false,
		dotsContainer: false
	};

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var override,
			settings = this._core.settings;

		// create DOM structure for relative navigation
		this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
			: $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$previous = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[0])
			.html(settings.navText[0])
			.prependTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.prev(settings.navSpeed);
			}, this));
		this._controls.$next = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[1])
			.html(settings.navText[1])
			.appendTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.next(settings.navSpeed);
			}, this));

		// create DOM structure for absolute navigation
		if (!settings.dotsData) {
			this._templates = [ $('<button role="button">')
				.addClass(settings.dotClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
			: $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$absolute.on('click', 'button', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$absolute)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, settings.dotsSpeed);
		}, this));

		/*$el.on('focusin', function() {
			$(document).off(".carousel");

			$(document).on('keydown.carousel', function(e) {
				if(e.keyCode == 37) {
					$el.trigger('prev.owl')
				}
				if(e.keyCode == 39) {
					$el.trigger('next.owl')
				}
			});
		});*/

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	};

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override, settings;
		settings = this._core.settings;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			if (control === '$relative' && settings.navContainer) {
				this._controls[control].html('');
			} else {
				this._controls[control].remove();
			}
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			maximum = this._core.maximum(true),
			settings = this._core.settings,
			size = settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items;

		if (settings.slideBy !== 'page') {
			settings.slideBy = Math.min(settings.slideBy, settings.items);
		}

		if (settings.dots || settings.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: Math.min(maximum, i - lower),
						end: i - lower + size - 1
					});
					if (Math.min(maximum, i - lower) === maximum) {
						break;
					}
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	};

	/**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference,
			settings = this._core.settings,
			disabled = this._core.items().length <= settings.items,
			index = this._core.relative(this._core.current()),
			loop = settings.loop || settings.rewind;

		this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

		if (settings.nav) {
			this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
			this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
		}

		this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

		if (settings.dots) {
			difference = this._pages.length - this._controls.$absolute.children().length;

			if (settings.dotsData && difference !== 0) {
				this._controls.$absolute.html(this._templates.join(''));
			} else if (difference > 0) {
				this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
			} else if (difference < 0) {
				this._controls.$absolute.children().slice(difference).remove();
			}

			this._controls.$absolute.find('.active').removeClass('active');
			this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}
	};

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items)
		};
	};

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var current = this._core.relative(this._core.current());
		return $.grep(this._pages, $.proxy(function(page, index) {
			return page.start <= current && page.end >= current;
		}, this)).pop();
	};

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			settings = this._core.settings;

		if (settings.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += settings.slideBy : position -= settings.slideBy;
		}

		return position;
	};

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	};

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	};

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard && this._pages.length) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash index for the items.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.startPosition === 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

					if (!hash) {
						return;
					}

					this._hashes[hash] = e.content;
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position') {
					var current = this._core.items(this._core.relative(this._core.current())),
						hash = $.map(this._hashes, function(item, hash) {
							return item === current ? hash : null;
						}).join();

					if (!hash || window.location.hash.slice(1) === hash) {
						return;
					}

					window.location.hash = hash;
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function(e) {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]);

			if (position === undefined || position === this._core.current()) {
				return;
			}

			this._core.to(this._core.relative(position), false, true);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.3.4
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	var style = $('<support>').get(0).style,
		prefixes = 'Webkit Moz O ms'.split(' '),
		events = {
			transition: {
				end: {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition: 'transitionend',
					OTransition: 'oTransitionEnd',
					transition: 'transitionend'
				}
			},
			animation: {
				end: {
					WebkitAnimation: 'webkitAnimationEnd',
					MozAnimation: 'animationend',
					OAnimation: 'oAnimationEnd',
					animation: 'animationend'
				}
			}
		},
		tests = {
			csstransforms: function() {
				return !!test('transform');
			},
			csstransforms3d: function() {
				return !!test('perspective');
			},
			csstransitions: function() {
				return !!test('transition');
			},
			cssanimations: function() {
				return !!test('animation');
			}
		};

	function test(property, prefixed) {
		var result = false,
			upper = property.charAt(0).toUpperCase() + property.slice(1);

		$.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
			if (style[property] !== undefined) {
				result = prefixed ? property : true;
				return false;
			}
		});

		return result;
	}

	function prefixed(property) {
		return test(property, true);
	}

	if (tests.csstransitions()) {
		/* jshint -W053 */
		$.support.transition = new String(prefixed('transition'))
		$.support.transition.end = events.transition.end[ $.support.transition ];
	}

	if (tests.cssanimations()) {
		/* jshint -W053 */
		$.support.animation = new String(prefixed('animation'))
		$.support.animation.end = events.animation.end[ $.support.animation ];
	}

	if (tests.csstransforms()) {
		/* jshint -W053 */
		$.support.transform = new String(prefixed('transform'));
		$.support.transform3d = tests.csstransforms3d();
	}

})(window.Zepto || window.jQuery, window, document);


/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5871":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DangerElevationMobile_vue_vue_type_style_index_0_id_62f1bab0_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("78ce");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DangerElevationMobile_vue_vue_type_style_index_0_id_62f1bab0_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DangerElevationMobile_vue_vue_type_style_index_0_id_62f1bab0_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DangerElevationMobile_vue_vue_type_style_index_0_id_62f1bab0_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "588d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaGallery_vue_vue_type_style_index_0_id_46d985aa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f231");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaGallery_vue_vue_type_style_index_0_id_46d985aa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaGallery_vue_vue_type_style_index_0_id_46d985aa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaGallery_vue_vue_type_style_index_0_id_46d985aa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5b4e":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("36c3");
var toLength = __webpack_require__("b447");
var toAbsoluteIndex = __webpack_require__("0fc9");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "5c95":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("35e8");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5e73":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultOrdinal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultDayOfMonthOrdinalParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ordinal; });
var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}



/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "5fdb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return localeWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultLocaleWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return localeFirstDayOfWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return localeFirstDayOfYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getSetWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getSetISOWeek; });
/* harmony import */ var _format_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3625");
/* harmony import */ var _aliases__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f987");
/* harmony import */ var _priorities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d4a2");
/* harmony import */ var _parse_regex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("f66e");
/* harmony import */ var _parse_token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("dff0");
/* harmony import */ var _utils_to_int__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("29f2");
/* harmony import */ var _create_local__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("e755");
/* harmony import */ var _week_calendar_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("86ee");









// FORMATTING

Object(_format_format__WEBPACK_IMPORTED_MODULE_0__[/* addFormatToken */ "a"])('w', ['ww', 2], 'wo', 'week');
Object(_format_format__WEBPACK_IMPORTED_MODULE_0__[/* addFormatToken */ "a"])('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

Object(_aliases__WEBPACK_IMPORTED_MODULE_1__[/* addUnitAlias */ "a"])('week', 'w');
Object(_aliases__WEBPACK_IMPORTED_MODULE_1__[/* addUnitAlias */ "a"])('isoWeek', 'W');

// PRIORITIES

Object(_priorities__WEBPACK_IMPORTED_MODULE_2__[/* addUnitPriority */ "a"])('week', 5);
Object(_priorities__WEBPACK_IMPORTED_MODULE_2__[/* addUnitPriority */ "a"])('isoWeek', 5);

// PARSING

Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('w',  _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* match1to2 */ "d"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('ww', _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* match1to2 */ "d"], _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* match2 */ "h"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('W',  _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* match1to2 */ "d"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* addRegexToken */ "a"])('WW', _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* match1to2 */ "d"], _parse_regex__WEBPACK_IMPORTED_MODULE_3__[/* match2 */ "h"]);

Object(_parse_token__WEBPACK_IMPORTED_MODULE_4__[/* addWeekParseToken */ "c"])(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return Object(_week_calendar_utils__WEBPACK_IMPORTED_MODULE_7__[/* weekOfYear */ "b"])(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 6th is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = Object(_week_calendar_utils__WEBPACK_IMPORTED_MODULE_7__[/* weekOfYear */ "b"])(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "6144":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return compareArrays; });
/* harmony import */ var _to_int__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("29f2");


// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && Object(_to_int__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(array1[i]) !== Object(_to_int__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}


/***/ }),

/***/ "6238":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastPlugin_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a70b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastPlugin_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastPlugin_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastPlugin_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "62a0":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "656e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("79aa");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "6900":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Locale; });
function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}


/***/ }),

/***/ "6937":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isFunction; });
function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}


/***/ }),

/***/ "696e":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c207");
__webpack_require__("1654");
__webpack_require__("6c1c");
__webpack_require__("24c5");
__webpack_require__("3c11");
__webpack_require__("43fc");
module.exports = __webpack_require__("584a").Promise;


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b4c":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6c1c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c367");
var global = __webpack_require__("e53d");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var TO_STRING_TAG = __webpack_require__("5168")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "6cf1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "71a5":
/***/ (function(module, exports, __webpack_require__) {

(function(t,e){ true?module.exports=e(__webpack_require__("8bbf")):undefined})("undefined"!==typeof self?self:this,function(t){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="fb15")}({"14fd":function(t,e,n){var o,i;
/*! PhotoSwipe Default UI - 4.1.3 - 2019-01-08
* http://photoswipe.com
* Copyright (c) 2019 Dmitry Semenov; */
/*! PhotoSwipe Default UI - 4.1.3 - 2019-01-08
* http://photoswipe.com
* Copyright (c) 2019 Dmitry Semenov; */
(function(r,a){o=a,i="function"===typeof o?o.call(e,n,e,t):o,void 0===i||(t.exports=i)})(0,function(){"use strict";var t=function(t,e){var n,o,i,r,a,s,l,u,c,p,d,f,m,h,w,b,g,v,y=this,_=!1,x=!0,A=!0,I={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(t,e){return t.title?(e.children[0].innerHTML=t.title,!0):(e.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return t.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return t.currItem.title||""},indexIndicatorSep:" / ",fitControlsWidth:1200},k=function(t){if(b)return!0;t=t||window.event,w.timeToIdle&&w.mouseUsed&&!c&&N();for(var n,o,i=t.target||t.srcElement,r=i.getAttribute("class")||"",a=0;a<H.length;a++)n=H[a],n.onTap&&r.indexOf("pswp__"+n.name)>-1&&(n.onTap(),o=!0);if(o){t.stopPropagation&&t.stopPropagation(),b=!0;var s=e.features.isOldAndroid?600:30;setTimeout(function(){b=!1},s)}},M=function(){return!t.likelyTouchDevice||w.mouseUsed||screen.width>w.fitControlsWidth},T=function(t,n,o){e[(o?"add":"remove")+"Class"](t,"pswp__"+n)},C=function(){var t=1===w.getNumItemsFn();t!==h&&(T(o,"ui--one-slide",t),h=t)},S=function(){T(l,"share-modal--hidden",A)},E=function(){return A=!A,A?(e.removeClass(l,"pswp__share-modal--fade-in"),setTimeout(function(){A&&S()},300)):(S(),setTimeout(function(){A||e.addClass(l,"pswp__share-modal--fade-in")},30)),A||O(),!1},D=function(e){e=e||window.event;var n=e.target||e.srcElement;return t.shout("shareLinkClick",e,n),!!n.href&&(!!n.hasAttribute("download")||(window.open(n.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),A||E(),!1))},O=function(){for(var t,e,n,o,i,r="",a=0;a<w.shareButtons.length;a++)t=w.shareButtons[a],n=w.getImageURLForShare(t),o=w.getPageURLForShare(t),i=w.getTextForShare(t),e=t.url.replace("{{url}}",encodeURIComponent(o)).replace("{{image_url}}",encodeURIComponent(n)).replace("{{raw_image_url}}",n).replace("{{text}}",encodeURIComponent(i)),r+='<a href="'+e+'" target="_blank" class="pswp__share--'+t.id+'"'+(t.download?"download":"")+">"+t.label+"</a>",w.parseShareButtonOut&&(r=w.parseShareButtonOut(t,r));l.children[0].innerHTML=r,l.children[0].onclick=D},L=function(t){for(var n=0;n<w.closeElClasses.length;n++)if(e.hasClass(t,"pswp__"+w.closeElClasses[n]))return!0},j=0,N=function(){clearTimeout(v),j=0,c&&y.setIdle(!1)},P=function(t){t=t||window.event;var e=t.relatedTarget||t.toElement;e&&"HTML"!==e.nodeName||(clearTimeout(v),v=setTimeout(function(){y.setIdle(!0)},w.timeToIdleOutside))},z=function(){w.fullscreenEl&&!e.features.isOldAndroid&&(n||(n=y.getFullscreenAPI()),n?(e.bind(document,n.eventK,y.updateFullscreen),y.updateFullscreen(),e.addClass(t.template,"pswp--supports-fs")):e.removeClass(t.template,"pswp--supports-fs"))},R=function(){w.preloaderEl&&(Z(!0),p("beforeChange",function(){clearTimeout(m),m=setTimeout(function(){t.currItem&&t.currItem.loading?(!t.allowProgressiveImg()||t.currItem.img&&!t.currItem.img.naturalWidth)&&Z(!1):Z(!0)},w.loadingIndicatorDelay)}),p("imageLoadComplete",function(e,n){t.currItem===n&&Z(!0)}))},Z=function(t){f!==t&&(T(d,"preloader--active",!t),f=t)},F=function(t){var n=t.vGap;if(M()){var a=w.barsSize;if(w.captionEl&&"auto"===a.bottom)if(r||(r=e.createEl("pswp__caption pswp__caption--fake"),r.appendChild(e.createEl("pswp__caption__center")),o.insertBefore(r,i),e.addClass(o,"pswp__ui--fit")),w.addCaptionHTMLFn(t,r,!0)){var s=r.clientHeight;n.bottom=parseInt(s,10)||44}else n.bottom=a.top;else n.bottom="auto"===a.bottom?0:a.bottom;n.top=a.top}else n.top=n.bottom=0},U=function(){w.timeToIdle&&p("mouseUsed",function(){e.bind(document,"mousemove",N),e.bind(document,"mouseout",P),g=setInterval(function(){j++,2===j&&y.setIdle(!0)},w.timeToIdle/2)})},B=function(){var t;p("onVerticalDrag",function(t){x&&t<.95?y.hideControls():!x&&t>=.95&&y.showControls()}),p("onPinchClose",function(e){x&&e<.9?(y.hideControls(),t=!0):t&&!x&&e>.9&&y.showControls()}),p("zoomGestureEnded",function(){t=!1,t&&!x&&y.showControls()})},H=[{name:"caption",option:"captionEl",onInit:function(t){i=t}},{name:"share-modal",option:"shareEl",onInit:function(t){l=t},onTap:function(){E()}},{name:"button--share",option:"shareEl",onInit:function(t){s=t},onTap:function(){E()}},{name:"button--zoom",option:"zoomEl",onTap:t.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(t){a=t}},{name:"button--close",option:"closeEl",onTap:t.close},{name:"button--arrow--left",option:"arrowEl",onTap:t.prev},{name:"button--arrow--right",option:"arrowEl",onTap:t.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){n.isFullscreen()?n.exit():n.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(t){d=t}}],Y=function(){var t,n,i,r=function(o){if(o)for(var r=o.length,a=0;a<r;a++){t=o[a],n=t.className;for(var s=0;s<H.length;s++)i=H[s],n.indexOf("pswp__"+i.name)>-1&&(w[i.option]?(e.removeClass(t,"pswp__element--disabled"),i.onInit&&i.onInit(t)):e.addClass(t,"pswp__element--disabled"))}};r(o.children);var a=e.getChildByClass(o,"pswp__top-bar");a&&r(a.children)};y.init=function(){e.extend(t.options,I,!0),w=t.options,o=e.getChildByClass(t.scrollWrap,"pswp__ui"),p=t.listen,B(),p("beforeChange",y.update),p("doubleTap",function(e){var n=t.currItem.initialZoomLevel;t.getZoomLevel()!==n?t.zoomTo(n,e,333):t.zoomTo(w.getDoubleTapZoom(!1,t.currItem),e,333)}),p("preventDragEvent",function(t,e,n){var o=t.target||t.srcElement;o&&o.getAttribute("class")&&t.type.indexOf("mouse")>-1&&(o.getAttribute("class").indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(o.tagName))&&(n.prevent=!1)}),p("bindEvents",function(){e.bind(o,"pswpTap click",k),e.bind(t.scrollWrap,"pswpTap",y.onGlobalTap),t.likelyTouchDevice||e.bind(t.scrollWrap,"mouseover",y.onMouseOver)}),p("unbindEvents",function(){A||E(),g&&clearInterval(g),e.unbind(document,"mouseout",P),e.unbind(document,"mousemove",N),e.unbind(o,"pswpTap click",k),e.unbind(t.scrollWrap,"pswpTap",y.onGlobalTap),e.unbind(t.scrollWrap,"mouseover",y.onMouseOver),n&&(e.unbind(document,n.eventK,y.updateFullscreen),n.isFullscreen()&&(w.hideAnimationDuration=0,n.exit()),n=null)}),p("destroy",function(){w.captionEl&&(r&&o.removeChild(r),e.removeClass(i,"pswp__caption--empty")),l&&(l.children[0].onclick=null),e.removeClass(o,"pswp__ui--over-close"),e.addClass(o,"pswp__ui--hidden"),y.setIdle(!1)}),w.showAnimationDuration||e.removeClass(o,"pswp__ui--hidden"),p("initialZoomIn",function(){w.showAnimationDuration&&e.removeClass(o,"pswp__ui--hidden")}),p("initialZoomOut",function(){e.addClass(o,"pswp__ui--hidden")}),p("parseVerticalMargin",F),Y(),w.shareEl&&s&&l&&(A=!0),C(),U(),z(),R()},y.setIdle=function(t){c=t,T(o,"ui--idle",t)},y.update=function(){x&&t.currItem?(y.updateIndexIndicator(),w.captionEl&&(w.addCaptionHTMLFn(t.currItem,i),T(i,"caption--empty",!t.currItem.title)),_=!0):_=!1,A||E(),C()},y.updateFullscreen=function(o){o&&setTimeout(function(){t.setScrollOffset(0,e.getScrollY())},50),e[(n.isFullscreen()?"add":"remove")+"Class"](t.template,"pswp--fs")},y.updateIndexIndicator=function(){w.counterEl&&(a.innerHTML=t.getCurrentIndex()+1+w.indexIndicatorSep+w.getNumItemsFn())},y.onGlobalTap=function(n){n=n||window.event;var o=n.target||n.srcElement;if(!b)if(n.detail&&"mouse"===n.detail.pointerType){if(L(o))return void t.close();e.hasClass(o,"pswp__img")&&(1===t.getZoomLevel()&&t.getZoomLevel()<=t.currItem.fitRatio?w.clickToCloseNonZoomable&&t.close():t.toggleDesktopZoom(n.detail.releasePoint))}else if(w.tapToToggleControls&&(x?y.hideControls():y.showControls()),w.tapToClose&&(e.hasClass(o,"pswp__img")||L(o)))return void t.close()},y.onMouseOver=function(t){t=t||window.event;var e=t.target||t.srcElement;T(o,"ui--over-close",L(e))},y.hideControls=function(){e.addClass(o,"pswp__ui--hidden"),x=!1},y.showControls=function(){x=!0,_||y.update(),e.removeClass(o,"pswp__ui--hidden")},y.supportsFullscreen=function(){var t=document;return!!(t.exitFullscreen||t.mozCancelFullScreen||t.webkitExitFullscreen||t.msExitFullscreen)},y.getFullscreenAPI=function(){var e,n=document.documentElement,o="fullscreenchange";return n.requestFullscreen?e={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:o}:n.mozRequestFullScreen?e={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+o}:n.webkitRequestFullscreen?e={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+o}:n.msRequestFullscreen&&(e={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),e&&(e.enter=function(){if(u=w.closeOnScroll,w.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK)return t.template[this.enterK]();t.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},e.exit=function(){return w.closeOnScroll=u,document[this.exitK]()},e.isFullscreen=function(){return document[this.elementK]}),e}};return t})},"178d":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAABYCAQAAACjBqE3AAAB6klEQVR4Ae3bsWpUQRTG8YkkanwCa7GzVotsI/gEgk9h4Vu4ySLYmMYgbJrc3lrwZbJwC0FMt4j7F6Y4oIZrsXtgxvx/1c0ufEX4cnbmLCmSJEmSJEmSJEmSJP3XCBPvbJU+8doWmDFwyZpLBmYlNJebz0KwzykwsuSYJSNwykEJreV2BaBMaLIQZ2xYcFgqDlmw4ayE/FwL0dDk4Qh4W37DAjgqIT+3HRbigjH+iikVdxgZStgyN0Su2sXIeTwTT+esdpcbIlfNAuZ/TxresG4zV8kYWSZNiKUTokMMSWeIwTNEn4fK2TW3gRNgVkJLuVksROA9G+bEvoATNlBCa7nZXEwdxEZxzpKRKFh+bsv8LmPFmhX1OwfIz81jIRJQ5eeqG9B+riRJkiRJkiRJkiRJkiRJkiRJUkvA/8RQoEpKlJWINFkJ62AlrEP/mNBibnv2yz/A3t7Uq3LcpoxP8COjC1T5vxoAD5VdoEqdDrd5QuW1swtUSaueh3zkiuBiqgtA2OlkeMcP/uDqugsJdbjHF65VdPMKwS0+WQc/MgKvrIOHysB9vgPwk8+85hmPbnQdvHZyDMAFD7L3EOpgMcVdvnHFS0/vlatrXvCVx0U9gt3fxvnA0/hB4nmRJEmSJEmSJEmSJGmHfgFLaDPoMu5xWwAAAABJRU5ErkJggg=="},"1de3":function(t,e,n){var o=n("b041");e=t.exports=n("2350")(!1),e.push([t.i,"/*! PhotoSwipe Default UI CSS by Dmitry Semenov | photoswipe.com | MIT license */.pswp__button{width:44px;height:44px;position:relative;background:none;cursor:pointer;overflow:visible;-webkit-appearance:none;display:block;border:0;padding:0;margin:0;float:right;opacity:.75;-webkit-transition:opacity .2s;transition:opacity .2s;-webkit-box-shadow:none;box-shadow:none}.pswp__button:focus,.pswp__button:hover{opacity:1}.pswp__button:active{outline:none;opacity:.9}.pswp__button::-moz-focus-inner{padding:0;border:0}.pswp__ui--over-close .pswp__button--close{opacity:1}.pswp__button,.pswp__button--arrow--left:before,.pswp__button--arrow--right:before{background:url("+o(n("178d"))+") 0 0 no-repeat;background-size:264px 88px;width:44px;height:44px}@media (-webkit-min-device-pixel-ratio:1.1),(-webkit-min-device-pixel-ratio:1.09375),(min-resolution:1.1dppx),(min-resolution:105dpi){.pswp--svg .pswp__button,.pswp--svg .pswp__button--arrow--left:before,.pswp--svg .pswp__button--arrow--right:before{background-image:url("+o(n("f301"))+')}.pswp--svg .pswp__button--arrow--left,.pswp--svg .pswp__button--arrow--right{background:none}}.pswp__button--close{background-position:0 -44px}.pswp__button--share{background-position:-44px -44px}.pswp__button--fs{display:none}.pswp--supports-fs .pswp__button--fs{display:block}.pswp--fs .pswp__button--fs{background-position:-44px 0}.pswp__button--zoom{display:none;background-position:-88px 0}.pswp--zoom-allowed .pswp__button--zoom{display:block}.pswp--zoomed-in .pswp__button--zoom{background-position:-132px 0}.pswp--touch .pswp__button--arrow--left,.pswp--touch .pswp__button--arrow--right{visibility:hidden}.pswp__button--arrow--left,.pswp__button--arrow--right{background:none;top:50%;margin-top:-50px;width:70px;height:100px;position:absolute}.pswp__button--arrow--left{left:0}.pswp__button--arrow--right{right:0}.pswp__button--arrow--left:before,.pswp__button--arrow--right:before{content:"";top:35px;background-color:rgba(0,0,0,.3);height:30px;width:32px;position:absolute}.pswp__button--arrow--left:before{left:6px;background-position:-138px -44px}.pswp__button--arrow--right:before{right:6px;background-position:-94px -44px}.pswp__counter,.pswp__share-modal{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pswp__share-modal{display:block;background:rgba(0,0,0,.5);width:100%;height:100%;top:0;left:0;padding:10px;position:absolute;z-index:1600;opacity:0;-webkit-transition:opacity .25s ease-out;transition:opacity .25s ease-out;-webkit-backface-visibility:hidden;will-change:opacity}.pswp__share-modal--hidden{display:none}.pswp__share-tooltip{z-index:1620;position:absolute;background:#fff;top:56px;border-radius:2px;display:block;width:auto;right:44px;-webkit-box-shadow:0 2px 5px rgba(0,0,0,.25);box-shadow:0 2px 5px rgba(0,0,0,.25);-webkit-transform:translateY(6px);transform:translateY(6px);-webkit-transition:-webkit-transform .25s;transition:-webkit-transform .25s;transition:transform .25s;transition:transform .25s,-webkit-transform .25s;-webkit-backface-visibility:hidden;will-change:transform}.pswp__share-tooltip a{display:block;padding:8px 12px;font-size:14px;line-height:18px}.pswp__share-tooltip a,.pswp__share-tooltip a:hover{color:#000;text-decoration:none}.pswp__share-tooltip a:first-child{border-radius:2px 2px 0 0}.pswp__share-tooltip a:last-child{border-radius:0 0 2px 2px}.pswp__share-modal--fade-in{opacity:1}.pswp__share-modal--fade-in .pswp__share-tooltip{-webkit-transform:translateY(0);transform:translateY(0)}.pswp--touch .pswp__share-tooltip a{padding:16px 12px}a.pswp__share--facebook:before{content:"";display:block;width:0;height:0;position:absolute;top:-12px;right:15px;border:6px solid transparent;border-bottom-color:#fff;-webkit-pointer-events:none;-moz-pointer-events:none;pointer-events:none}a.pswp__share--facebook:hover{background:#3e5c9a;color:#fff}a.pswp__share--facebook:hover:before{border-bottom-color:#3e5c9a}a.pswp__share--twitter:hover{background:#55acee;color:#fff}a.pswp__share--pinterest:hover{background:#ccc;color:#ce272d}a.pswp__share--download:hover{background:#ddd}.pswp__counter{position:absolute;left:0;top:0;height:44px;font-size:13px;line-height:44px;color:#fff;opacity:.75;padding:0 10px}.pswp__caption{position:absolute;left:0;bottom:0;width:100%;min-height:44px}.pswp__caption small{font-size:11px;color:#bbb}.pswp__caption__center{text-align:left;max-width:420px;margin:0 auto;font-size:13px;padding:10px;line-height:20px;color:#ccc}.pswp__caption--empty{display:none}.pswp__caption--fake{visibility:hidden}.pswp__preloader{width:44px;height:44px;position:absolute;top:0;left:50%;margin-left:-22px;opacity:0;-webkit-transition:opacity .25s ease-out;transition:opacity .25s ease-out;will-change:opacity;direction:ltr}.pswp__preloader__icn{width:20px;height:20px;margin:12px}.pswp__preloader--active{opacity:1}.pswp__preloader--active .pswp__preloader__icn{background:url('+o(n("76dc"))+") 0 0 no-repeat}.pswp--css_animation .pswp__preloader--active{opacity:1}.pswp--css_animation .pswp__preloader--active .pswp__preloader__icn{-webkit-animation:clockwise .5s linear infinite;animation:clockwise .5s linear infinite}.pswp--css_animation .pswp__preloader--active .pswp__preloader__donut{-webkit-animation:donut-rotate 1s cubic-bezier(.4,0,.22,1) infinite;animation:donut-rotate 1s cubic-bezier(.4,0,.22,1) infinite}.pswp--css_animation .pswp__preloader__icn{background:none;opacity:.75;width:14px;height:14px;position:absolute;left:15px;top:15px;margin:0}.pswp--css_animation .pswp__preloader__cut{position:relative;width:7px;height:14px;overflow:hidden}.pswp--css_animation .pswp__preloader__donut{-webkit-box-sizing:border-box;box-sizing:border-box;width:14px;height:14px;border:2px solid #fff;border-radius:50%;border-left-color:transparent;border-bottom-color:transparent;position:absolute;top:0;left:0;background:none;margin:0}@media screen and (max-width:1024px){.pswp__preloader{position:relative;left:auto;top:auto;margin:0;float:right}}@-webkit-keyframes clockwise{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes clockwise{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes donut-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(-140deg);transform:rotate(-140deg)}to{-webkit-transform:rotate(0);transform:rotate(0)}}@keyframes donut-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(-140deg);transform:rotate(-140deg)}to{-webkit-transform:rotate(0);transform:rotate(0)}}.pswp__ui{-webkit-font-smoothing:auto;visibility:visible;opacity:1;z-index:1550}.pswp__top-bar{position:absolute;left:0;top:0;height:44px;width:100%}.pswp--has_mouse .pswp__button--arrow--left,.pswp--has_mouse .pswp__button--arrow--right,.pswp__caption,.pswp__top-bar{-webkit-backface-visibility:hidden;will-change:opacity;-webkit-transition:opacity 333ms cubic-bezier(.4,0,.22,1);transition:opacity 333ms cubic-bezier(.4,0,.22,1)}.pswp--has_mouse .pswp__button--arrow--left,.pswp--has_mouse .pswp__button--arrow--right{visibility:visible}.pswp__caption,.pswp__top-bar{background-color:rgba(0,0,0,.5)}.pswp__ui--fit .pswp__caption,.pswp__ui--fit .pswp__top-bar{background-color:rgba(0,0,0,.3)}.pswp__ui--idle .pswp__button--arrow--left,.pswp__ui--idle .pswp__button--arrow--right,.pswp__ui--idle .pswp__top-bar{opacity:0}.pswp__ui--hidden .pswp__button--arrow--left,.pswp__ui--hidden .pswp__button--arrow--right,.pswp__ui--hidden .pswp__caption,.pswp__ui--hidden .pswp__top-bar{opacity:.001}.pswp__ui--one-slide .pswp__button--arrow--left,.pswp__ui--one-slide .pswp__button--arrow--right,.pswp__ui--one-slide .pswp__counter{display:none}.pswp__element--disabled{display:none!important}.pswp--minimal--dark .pswp__top-bar{background:none}",""])},2350:function(t,e){function n(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"===typeof btoa){var r=o(i),a=i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"});return[n].concat(a).concat([r]).join("\n")}return[n].join("\n")}function o(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,"+e;return"/*# "+n+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"===typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"===typeof r&&(o[r]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"===typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},"3dfa":function(t,e,n){"use strict";var o=n("5c9f"),i=n.n(o);i.a},"45a1":function(t,e,n){"use strict";var o=n("c1e2"),i=n.n(o);i.a},"499e":function(t,e,n){"use strict";function o(t,e){for(var n=[],o={},i=0;i<e.length;i++){var r=e[i],a=r[0],s=r[1],l=r[2],u=r[3],c={id:t+":"+i,css:s,media:l,sourceMap:u};o[a]?o[a].parts.push(c):n.push(o[a]={id:a,parts:[c]})}return n}n.r(e),n.d(e,"default",function(){return m});var i="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r={},a=i&&(document.head||document.getElementsByTagName("head")[0]),s=null,l=0,u=!1,c=function(){},p=null,d="data-vue-ssr-id",f="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function m(t,e,n,i){u=n,p=i||{};var a=o(t,e);return h(a),function(e){for(var n=[],i=0;i<a.length;i++){var s=a[i],l=r[s.id];l.refs--,n.push(l)}e?(a=o(t,e),h(a)):a=[];for(i=0;i<n.length;i++){l=n[i];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete r[l.id]}}}}function h(t){for(var e=0;e<t.length;e++){var n=t[e],o=r[n.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](n.parts[i]);for(;i<n.parts.length;i++)o.parts.push(b(n.parts[i]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(b(n.parts[i]));r[n.id]={id:n.id,refs:1,parts:a}}}}function w(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function b(t){var e,n,o=document.querySelector("style["+d+'~="'+t.id+'"]');if(o){if(u)return c;o.parentNode.removeChild(o)}if(f){var i=l++;o=s||(s=w()),e=v.bind(null,o,i,!1),n=v.bind(null,o,i,!0)}else o=w(),e=y.bind(null,o),n=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else n()}}var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function v(t,e,n,o){var i=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=g(e,i);else{var r=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}function y(t,e){var n=e.css,o=e.media,i=e.sourceMap;if(o&&t.setAttribute("media",o),p.ssrId&&t.setAttribute(d,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}},"5c9f":function(t,e,n){var o=n("fa4e");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("499e").default;i("74b42241",o,!0,{sourceMap:!1,shadowMode:!1})},"65d9":function(t,e,n){"use strict";
/**
  * vue-class-component v6.3.2
  * (c) 2015-present Evan You
  * @license MIT
  */function o(t){return t&&"object"===typeof t&&"default"in t?t["default"]:t}Object.defineProperty(e,"__esModule",{value:!0});var i=o(n("8bbf")),r="undefined"!==typeof Reflect&&Reflect.defineMetadata;function a(t,e){s(t,e),Object.getOwnPropertyNames(e.prototype).forEach(function(n){s(t.prototype,e.prototype,n)}),Object.getOwnPropertyNames(e).forEach(function(n){s(t,e,n)})}function s(t,e,n){var o=n?Reflect.getOwnMetadataKeys(e,n):Reflect.getOwnMetadataKeys(e);o.forEach(function(o){var i=n?Reflect.getOwnMetadata(o,e,n):Reflect.getOwnMetadata(o,e);n?Reflect.defineMetadata(o,i,t,n):Reflect.defineMetadata(o,i,t)})}var l={__proto__:[]},u=l instanceof Array;function c(t){return function(e,n,o){var i="function"===typeof e?e:e.constructor;i.__decorators__||(i.__decorators__=[]),"number"!==typeof o&&(o=void 0),i.__decorators__.push(function(e){return t(e,n,o)})}}function p(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return i.extend({mixins:t})}function d(t){var e=typeof t;return null==t||"object"!==e&&"function"!==e}function f(t,e){var n=e.prototype._init;e.prototype._init=function(){var e=this,n=Object.getOwnPropertyNames(t);if(t.$options.props)for(var o in t.$options.props)t.hasOwnProperty(o)||n.push(o);n.forEach(function(n){"_"!==n.charAt(0)&&Object.defineProperty(e,n,{get:function(){return t[n]},set:function(e){t[n]=e},configurable:!0})})};var o=new e;e.prototype._init=n;var i={};return Object.keys(o).forEach(function(t){void 0!==o[t]&&(i[t]=o[t])}),i}var m=["data","beforeCreate","created","beforeMount","mounted","beforeDestroy","destroyed","beforeUpdate","updated","activated","deactivated","render","errorCaptured"];function h(t,e){void 0===e&&(e={}),e.name=e.name||t._componentTag||t.name;var n=t.prototype;Object.getOwnPropertyNames(n).forEach(function(t){if("constructor"!==t)if(m.indexOf(t)>-1)e[t]=n[t];else{var o=Object.getOwnPropertyDescriptor(n,t);void 0!==o.value?"function"===typeof o.value?(e.methods||(e.methods={}))[t]=o.value:(e.mixins||(e.mixins=[])).push({data:function(){var e;return e={},e[t]=o.value,e}}):(o.get||o.set)&&((e.computed||(e.computed={}))[t]={get:o.get,set:o.set})}}),(e.mixins||(e.mixins=[])).push({data:function(){return f(this,t)}});var o=t.__decorators__;o&&(o.forEach(function(t){return t(e)}),delete t.__decorators__);var s=Object.getPrototypeOf(t.prototype),l=s instanceof i?s.constructor:i,u=l.extend(e);return w(u,t,l),r&&a(u,t),u}function w(t,e,n){Object.getOwnPropertyNames(e).forEach(function(o){if("prototype"!==o){var i=Object.getOwnPropertyDescriptor(t,o);if(!i||i.configurable){var r=Object.getOwnPropertyDescriptor(e,o);if(!u){if("cid"===o)return;var a=Object.getOwnPropertyDescriptor(n,o);if(!d(r.value)&&a&&a.value===r.value)return}0,Object.defineProperty(t,o,r)}}})}function b(t){return"function"===typeof t?h(t):function(e){return h(e,t)}}b.registerHooks=function(t){m.push.apply(m,t)},e.default=b,e.createDecorator=c,e.mixins=p},"76dc":function(t,e){t.exports="data:image/gif;base64,R0lGODlhFAAUAPMIAIeHhz8/P1dXVycnJ8/Pz7e3t5+fn29vb////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAIACwAAAAAFAAUAEAEUxDJSatFxtwaggWAdIyHJAhXoRYSQUhDPGx0TbmujahbXGWZWqdDAYEsp5NupLPkdDwE7oXwWVasimzWrAE1tKFHErQRK8eL8mMUlRBJVI307uoiACH5BAUHAAgALAEAAQASABIAAAROEMkpS6E4W5upMdUmEQT2feFIltMJYivbvhnZ3R0A4NMwIDodz+cL7nDEn5CH8DGZh8MtEMBEoxkqlXKVIgQCibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpjaE4W5spANUmFQX2feFIltMJYivbvhnZ3d1x4BNBIDodz+cL7nDEn5CH8DGZAsFtMMBEoxkqlXKVIgIBibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpAaA4W5vpOdUmGQb2feFIltMJYivbvhnZ3Z0g4FNRIDodz+cL7nDEn5CH8DGZgcCNQMBEoxkqlXKVIgYDibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpz6E4W5upENUmAQD2feFIltMJYivbvhnZ3V0Q4JNhIDodz+cL7nDEn5CH8DGZg8GtUMBEoxkqlXKVIggEibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkphaA4W5tpCNUmHQf2feFIltMJYivbvhnZ3d0w4BMAIDodz+cL7nDEn5CH8DGZBMLNYMBEoxkqlXKVIgoFibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpQ6A4W5vpGNUmCQL2feFIltMJYivbvhnZ3R1B4NNxIDodz+cL7nDEn5CH8DGZhcINAMBEoxkqlXKVIgwGibbK9YLBYvLtHH5K0J0IACH5BAUHAAcALAEAAQASABIAAANCeLo6wzA6FxkhbaoQ4L3ZxnXLh0EjWZ4RV71VUcCLIByyTNt2PsO8m452sBGJBsNxkUwuD03lAQBASqnUJ7aq5UYSADs="},"8bbf":function(e,n){e.exports=t},b041:function(t,e){t.exports=function(t){return"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)?'"'+t.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':t)}},b24f:function(t,e,n){var o,i;
/*! PhotoSwipe - v4.1.3 - 2019-01-08
* http://photoswipe.com
* Copyright (c) 2019 Dmitry Semenov; */
/*! PhotoSwipe - v4.1.3 - 2019-01-08
* http://photoswipe.com
* Copyright (c) 2019 Dmitry Semenov; */
(function(r,a){o=a,i="function"===typeof o?o.call(e,n,e,t):o,void 0===i||(t.exports=i)})(0,function(){"use strict";var t=function(t,e,n,o){var i={features:null,bind:function(t,e,n,o){var i=(o?"remove":"add")+"EventListener";e=e.split(" ");for(var r=0;r<e.length;r++)e[r]&&t[i](e[r],n,!1)},isArray:function(t){return t instanceof Array},createEl:function(t,e){var n=document.createElement(e||"div");return t&&(n.className=t),n},getScrollY:function(){var t=window.pageYOffset;return void 0!==t?t:document.documentElement.scrollTop},unbind:function(t,e,n){i.bind(t,e,n,!0)},removeClass:function(t,e){var n=new RegExp("(\\s|^)"+e+"(\\s|$)");t.className=t.className.replace(n," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(t,e){i.hasClass(t,e)||(t.className+=(t.className?" ":"")+e)},hasClass:function(t,e){return t.className&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(t.className)},getChildByClass:function(t,e){var n=t.firstChild;while(n){if(i.hasClass(n,e))return n;n=n.nextSibling}},arraySearch:function(t,e,n){var o=t.length;while(o--)if(t[o][n]===e)return o;return-1},extend:function(t,e,n){for(var o in e)if(e.hasOwnProperty(o)){if(n&&t.hasOwnProperty(o))continue;t[o]=e[o]}},easing:{sine:{out:function(t){return Math.sin(t*(Math.PI/2))},inOut:function(t){return-(Math.cos(Math.PI*t)-1)/2}},cubic:{out:function(t){return--t*t*t+1}}},detectFeatures:function(){if(i.features)return i.features;var t=i.createEl(),e=t.style,n="",o={};if(o.oldIE=document.all&&!document.addEventListener,o.touch="ontouchstart"in window,window.requestAnimationFrame&&(o.raf=window.requestAnimationFrame,o.caf=window.cancelAnimationFrame),o.pointerEvent=!!window.PointerEvent||navigator.msPointerEnabled,!o.pointerEvent){var r=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var a=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);a&&a.length>0&&(a=parseInt(a[1],10),a>=1&&a<8&&(o.isOldIOSPhone=!0))}var s=r.match(/Android\s([0-9\.]*)/),l=s?s[1]:0;l=parseFloat(l),l>=1&&(l<4.4&&(o.isOldAndroid=!0),o.androidVersion=l),o.isMobileOpera=/opera mini|opera mobi/i.test(r)}for(var u,c,p=["transform","perspective","animationName"],d=["","webkit","Moz","ms","O"],f=0;f<4;f++){n=d[f];for(var m=0;m<3;m++)u=p[m],c=n+(n?u.charAt(0).toUpperCase()+u.slice(1):u),!o[u]&&c in e&&(o[u]=c);n&&!o.raf&&(n=n.toLowerCase(),o.raf=window[n+"RequestAnimationFrame"],o.raf&&(o.caf=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]))}if(!o.raf){var h=0;o.raf=function(t){var e=(new Date).getTime(),n=Math.max(0,16-(e-h)),o=window.setTimeout(function(){t(e+n)},n);return h=e+n,o},o.caf=function(t){clearTimeout(t)}}return o.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,i.features=o,o}};i.detectFeatures(),i.features.oldIE&&(i.bind=function(t,e,n,o){e=e.split(" ");for(var i,r=(o?"detach":"attach")+"Event",a=function(){n.handleEvent.call(n)},s=0;s<e.length;s++)if(i=e[s],i)if("object"===typeof n&&n.handleEvent){if(o){if(!n["oldIE"+i])return!1}else n["oldIE"+i]=a;t[r]("on"+i,n["oldIE"+i])}else t[r]("on"+i,n)});var r=this,a=25,s=3,l={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(t){return"A"===t.tagName},getDoubleTapZoom:function(t,e){return t?1:e.initialZoomLevel<.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};i.extend(l,o);var u,c,p,d,f,m,h,w,b,g,v,y,_,x,A,I,k,M,T,C,S,E,D,O,L,j,N,P,z,R,Z,F,U,B,H,Y,W,G,J,K,Q,V,X,q,$,tt,et,nt,ot,it,rt,at,st,lt,ut,ct,pt=function(){return{x:0,y:0}},dt=pt(),ft=pt(),mt=pt(),ht={},wt=0,bt={},gt=pt(),vt=0,yt=!0,_t=[],xt={},At=!1,It=function(t,e){i.extend(r,e.publicMethods),_t.push(t)},kt=function(t){var e=$e();return t>e-1?t-e:t<0?e+t:t},Mt={},Tt=function(t,e){return Mt[t]||(Mt[t]=[]),Mt[t].push(e)},Ct=function(t){var e=Mt[t];if(e){var n=Array.prototype.slice.call(arguments);n.shift();for(var o=0;o<e.length;o++)e[o].apply(r,n)}},St=function(){return(new Date).getTime()},Et=function(t){lt=t,r.bg.style.opacity=t*l.bgOpacity},Dt=function(t,e,n,o,i){(!At||i&&i!==r.currItem)&&(o/=i?i.fitRatio:r.currItem.fitRatio),t[E]=y+e+"px, "+n+"px"+_+" scale("+o+")"},Ot=function(t){ot&&(t&&(g>r.currItem.fitRatio?At||(pn(r.currItem,!1,!0),At=!0):At&&(pn(r.currItem),At=!1)),Dt(ot,mt.x,mt.y,g))},Lt=function(t){t.container&&Dt(t.container.style,t.initialPosition.x,t.initialPosition.y,t.initialZoomLevel,t)},jt=function(t,e){e[E]=y+t+"px, 0px"+_},Nt=function(t,e){if(!l.loop&&e){var n=d+(gt.x*wt-t)/gt.x,o=Math.round(t-ge.x);(n<0&&o>0||n>=$e()-1&&o<0)&&(t=ge.x+o*l.mainScrollEndFriction)}ge.x=t,jt(t,f)},Pt=function(t,e){var n=ve[t]-bt[t];return ft[t]+dt[t]+n-n*(e/v)},zt=function(t,e){t.x=e.x,t.y=e.y,e.id&&(t.id=e.id)},Rt=function(t){t.x=Math.round(t.x),t.y=Math.round(t.y)},Zt=null,Ft=function(){Zt&&(i.unbind(document,"mousemove",Ft),i.addClass(t,"pswp--has_mouse"),l.mouseUsed=!0,Ct("mouseUsed")),Zt=setTimeout(function(){Zt=null},100)},Ut=function(){i.bind(document,"keydown",r),Z.transform&&i.bind(r.scrollWrap,"click",r),l.mouseUsed||i.bind(document,"mousemove",Ft),i.bind(window,"resize scroll orientationchange",r),Ct("bindEvents")},Bt=function(){i.unbind(window,"resize scroll orientationchange",r),i.unbind(window,"scroll",b.scroll),i.unbind(document,"keydown",r),i.unbind(document,"mousemove",Ft),Z.transform&&i.unbind(r.scrollWrap,"click",r),J&&i.unbind(window,h,r),clearTimeout(F),Ct("unbindEvents")},Ht=function(t,e){var n=sn(r.currItem,ht,t);return e&&(nt=n),n},Yt=function(t){return t||(t=r.currItem),t.initialZoomLevel},Wt=function(t){return t||(t=r.currItem),t.w>0?l.maxSpreadZoom:1},Gt=function(t,e,n,o){return o===r.currItem.initialZoomLevel?(n[t]=r.currItem.initialPosition[t],!0):(n[t]=Pt(t,o),n[t]>e.min[t]?(n[t]=e.min[t],!0):n[t]<e.max[t]&&(n[t]=e.max[t],!0))},Jt=function(){if(E){var e=Z.perspective&&!O;return y="translate"+(e?"3d(":"("),void(_=Z.perspective?", 0px)":")")}E="left",i.addClass(t,"pswp--ie"),jt=function(t,e){e.left=t+"px"},Lt=function(t){var e=t.fitRatio>1?1:t.fitRatio,n=t.container.style,o=e*t.w,i=e*t.h;n.width=o+"px",n.height=i+"px",n.left=t.initialPosition.x+"px",n.top=t.initialPosition.y+"px"},Ot=function(){if(ot){var t=ot,e=r.currItem,n=e.fitRatio>1?1:e.fitRatio,o=n*e.w,i=n*e.h;t.width=o+"px",t.height=i+"px",t.left=mt.x+"px",t.top=mt.y+"px"}}},Kt=function(t){var e="";l.escKey&&27===t.keyCode?e="close":l.arrowKeys&&(37===t.keyCode?e="prev":39===t.keyCode&&(e="next")),e&&(t.ctrlKey||t.altKey||t.shiftKey||t.metaKey||(t.preventDefault?t.preventDefault():t.returnValue=!1,r[e]()))},Qt=function(t){t&&(V||Q||it||W)&&(t.preventDefault(),t.stopPropagation())},Vt=function(){r.setScrollOffset(0,i.getScrollY())},Xt={},qt=0,$t=function(t){Xt[t]&&(Xt[t].raf&&j(Xt[t].raf),qt--,delete Xt[t])},te=function(t){Xt[t]&&$t(t),Xt[t]||(qt++,Xt[t]={})},ee=function(){for(var t in Xt)Xt.hasOwnProperty(t)&&$t(t)},ne=function(t,e,n,o,i,r,a){var s,l=St();te(t);var u=function(){if(Xt[t]){if(s=St()-l,s>=o)return $t(t),r(n),void(a&&a());r((n-e)*i(s/o)+e),Xt[t].raf=L(u)}};u()},oe={shout:Ct,listen:Tt,viewportSize:ht,options:l,isMainScrollAnimating:function(){return it},getZoomLevel:function(){return g},getCurrentIndex:function(){return d},isDragging:function(){return J},isZooming:function(){return tt},setScrollOffset:function(t,e){bt.x=t,R=bt.y=e,Ct("updateScrollOffset",bt)},applyZoomPan:function(t,e,n,o){mt.x=e,mt.y=n,g=t,Ot(o)},init:function(){if(!u&&!c){var n;r.framework=i,r.template=t,r.bg=i.getChildByClass(t,"pswp__bg"),N=t.className,u=!0,Z=i.detectFeatures(),L=Z.raf,j=Z.caf,E=Z.transform,z=Z.oldIE,r.scrollWrap=i.getChildByClass(t,"pswp__scroll-wrap"),r.container=i.getChildByClass(r.scrollWrap,"pswp__container"),f=r.container.style,r.itemHolders=I=[{el:r.container.children[0],wrap:0,index:-1},{el:r.container.children[1],wrap:0,index:-1},{el:r.container.children[2],wrap:0,index:-1}],I[0].el.style.display=I[2].el.style.display="none",Jt(),b={resize:r.updateSize,orientationchange:function(){clearTimeout(F),F=setTimeout(function(){ht.x!==r.scrollWrap.clientWidth&&r.updateSize()},500)},scroll:Vt,keydown:Kt,click:Qt};var o=Z.isOldIOSPhone||Z.isOldAndroid||Z.isMobileOpera;for(Z.animationName&&Z.transform&&!o||(l.showAnimationDuration=l.hideAnimationDuration=0),n=0;n<_t.length;n++)r["init"+_t[n]]();if(e){var a=r.ui=new e(r,i);a.init()}Ct("firstUpdate"),d=d||l.index||0,(isNaN(d)||d<0||d>=$e())&&(d=0),r.currItem=qe(d),(Z.isOldIOSPhone||Z.isOldAndroid)&&(yt=!1),t.setAttribute("aria-hidden","false"),l.modal&&(yt?t.style.position="fixed":(t.style.position="absolute",t.style.top=i.getScrollY()+"px")),void 0===R&&(Ct("initialLayout"),R=P=i.getScrollY());var p="pswp--open ";for(l.mainClass&&(p+=l.mainClass+" "),l.showHideOpacity&&(p+="pswp--animate_opacity "),p+=O?"pswp--touch":"pswp--notouch",p+=Z.animationName?" pswp--css_animation":"",p+=Z.svg?" pswp--svg":"",i.addClass(t,p),r.updateSize(),m=-1,vt=null,n=0;n<s;n++)jt((n+m)*gt.x,I[n].el.style);z||i.bind(r.scrollWrap,w,r),Tt("initialZoomInEnd",function(){r.setContent(I[0],d-1),r.setContent(I[2],d+1),I[0].el.style.display=I[2].el.style.display="block",l.focus&&t.focus(),Ut()}),r.setContent(I[1],d),r.updateCurrItem(),Ct("afterInit"),yt||(x=setInterval(function(){qt||J||tt||g!==r.currItem.initialZoomLevel||r.updateSize()},1e3)),i.addClass(t,"pswp--visible")}},close:function(){u&&(u=!1,c=!0,Ct("close"),Bt(),tn(r.currItem,null,!0,r.destroy))},destroy:function(){Ct("destroy"),Ke&&clearTimeout(Ke),t.setAttribute("aria-hidden","true"),t.className=N,x&&clearInterval(x),i.unbind(r.scrollWrap,w,r),i.unbind(window,"scroll",r),Ie(),ee(),Mt=null},panTo:function(t,e,n){n||(t>nt.min.x?t=nt.min.x:t<nt.max.x&&(t=nt.max.x),e>nt.min.y?e=nt.min.y:e<nt.max.y&&(e=nt.max.y)),mt.x=t,mt.y=e,Ot()},handleEvent:function(t){t=t||window.event,b[t.type]&&b[t.type](t)},goTo:function(t){t=kt(t);var e=t-d;vt=e,d=t,r.currItem=qe(d),wt-=e,Nt(gt.x*wt),ee(),it=!1,r.updateCurrItem()},next:function(){r.goTo(d+1)},prev:function(){r.goTo(d-1)},updateCurrZoomItem:function(t){if(t&&Ct("beforeChange",0),I[1].el.children.length){var e=I[1].el.children[0];ot=i.hasClass(e,"pswp__zoom-wrap")?e.style:null}else ot=null;nt=r.currItem.bounds,v=g=r.currItem.initialZoomLevel,mt.x=nt.center.x,mt.y=nt.center.y,t&&Ct("afterChange")},invalidateCurrItems:function(){A=!0;for(var t=0;t<s;t++)I[t].item&&(I[t].item.needsUpdate=!0)},updateCurrItem:function(t){if(0!==vt){var e,n=Math.abs(vt);if(!(t&&n<2)){r.currItem=qe(d),At=!1,Ct("beforeChange",vt),n>=s&&(m+=vt+(vt>0?-s:s),n=s);for(var o=0;o<n;o++)vt>0?(e=I.shift(),I[s-1]=e,m++,jt((m+2)*gt.x,e.el.style),r.setContent(e,d-n+o+1+1)):(e=I.pop(),I.unshift(e),m--,jt(m*gt.x,e.el.style),r.setContent(e,d+n-o-1-1));if(ot&&1===Math.abs(vt)){var i=qe(k);i.initialZoomLevel!==g&&(sn(i,ht),pn(i),Lt(i))}vt=0,r.updateCurrZoomItem(),k=d,Ct("afterChange")}}},updateSize:function(e){if(!yt&&l.modal){var n=i.getScrollY();if(R!==n&&(t.style.top=n+"px",R=n),!e&&xt.x===window.innerWidth&&xt.y===window.innerHeight)return;xt.x=window.innerWidth,xt.y=window.innerHeight,t.style.height=xt.y+"px"}if(ht.x=r.scrollWrap.clientWidth,ht.y=r.scrollWrap.clientHeight,Vt(),gt.x=ht.x+Math.round(ht.x*l.spacing),gt.y=ht.y,Nt(gt.x*wt),Ct("beforeResize"),void 0!==m){for(var o,a,u,c=0;c<s;c++)o=I[c],jt((c+m)*gt.x,o.el.style),u=d+c-1,l.loop&&$e()>2&&(u=kt(u)),a=qe(u),a&&(A||a.needsUpdate||!a.bounds)?(r.cleanSlide(a),r.setContent(o,u),1===c&&(r.currItem=a,r.updateCurrZoomItem(!0)),a.needsUpdate=!1):-1===o.index&&u>=0&&r.setContent(o,u),a&&a.container&&(sn(a,ht),pn(a),Lt(a));A=!1}v=g=r.currItem.initialZoomLevel,nt=r.currItem.bounds,nt&&(mt.x=nt.center.x,mt.y=nt.center.y,Ot(!0)),Ct("resize")},zoomTo:function(t,e,n,o,r){e&&(v=g,ve.x=Math.abs(e.x)-mt.x,ve.y=Math.abs(e.y)-mt.y,zt(ft,mt));var a=Ht(t,!1),s={};Gt("x",a,s,t),Gt("y",a,s,t);var l=g,u={x:mt.x,y:mt.y};Rt(s);var c=function(e){1===e?(g=t,mt.x=s.x,mt.y=s.y):(g=(t-l)*e+l,mt.x=(s.x-u.x)*e+u.x,mt.y=(s.y-u.y)*e+u.y),r&&r(e),Ot(1===e)};n?ne("customZoomTo",0,1,n,o||i.easing.sine.inOut,c):c(1)}},ie=30,re=10,ae={},se={},le={},ue={},ce={},pe=[],de={},fe=[],me={},he=0,we=pt(),be=0,ge=pt(),ve=pt(),ye=pt(),_e=function(t,e){return t.x===e.x&&t.y===e.y},xe=function(t,e){return Math.abs(t.x-e.x)<a&&Math.abs(t.y-e.y)<a},Ae=function(t,e){return me.x=Math.abs(t.x-e.x),me.y=Math.abs(t.y-e.y),Math.sqrt(me.x*me.x+me.y*me.y)},Ie=function(){X&&(j(X),X=null)},ke=function(){J&&(X=L(ke),Ue())},Me=function(){return!("fit"===l.scaleMode&&g===r.currItem.initialZoomLevel)},Te=function(t,e){return!(!t||t===document)&&(!(t.getAttribute("class")&&t.getAttribute("class").indexOf("pswp__scroll-wrap")>-1)&&(e(t)?t:Te(t.parentNode,e)))},Ce={},Se=function(t,e){return Ce.prevent=!Te(t.target,l.isClickableElement),Ct("preventDragEvent",t,e,Ce),Ce.prevent},Ee=function(t,e){return e.x=t.pageX,e.y=t.pageY,e.id=t.identifier,e},De=function(t,e,n){n.x=.5*(t.x+e.x),n.y=.5*(t.y+e.y)},Oe=function(t,e,n){if(t-B>50){var o=fe.length>2?fe.shift():{};o.x=e,o.y=n,fe.push(o),B=t}},Le=function(){var t=mt.y-r.currItem.initialPosition.y;return 1-Math.abs(t/(ht.y/2))},je={},Ne={},Pe=[],ze=function(t){while(Pe.length>0)Pe.pop();return D?(ct=0,pe.forEach(function(t){0===ct?Pe[0]=t:1===ct&&(Pe[1]=t),ct++})):t.type.indexOf("touch")>-1?t.touches&&t.touches.length>0&&(Pe[0]=Ee(t.touches[0],je),t.touches.length>1&&(Pe[1]=Ee(t.touches[1],Ne))):(je.x=t.pageX,je.y=t.pageY,je.id="",Pe[0]=je),Pe},Re=function(t,e){var n,o,i,a,s=mt[t]+e[t],u=e[t]>0,c=ge.x+e.x,p=ge.x-de.x;if(n=s>nt.min[t]||s<nt.max[t]?l.panEndFriction:1,s=mt[t]+e[t]*n,(l.allowPanToNext||g===r.currItem.initialZoomLevel)&&(ot?"h"!==rt||"x"!==t||Q||(u?(s>nt.min[t]&&(n=l.panEndFriction,nt.min[t]-s,o=nt.min[t]-ft[t]),(o<=0||p<0)&&$e()>1?(a=c,p<0&&c>de.x&&(a=de.x)):nt.min.x!==nt.max.x&&(i=s)):(s<nt.max[t]&&(n=l.panEndFriction,s-nt.max[t],o=ft[t]-nt.max[t]),(o<=0||p>0)&&$e()>1?(a=c,p>0&&c<de.x&&(a=de.x)):nt.min.x!==nt.max.x&&(i=s))):a=c,"x"===t))return void 0!==a&&(Nt(a,!0),q=a!==de.x),nt.min.x!==nt.max.x&&(void 0!==i?mt.x=i:q||(mt.x+=e.x*n)),void 0!==a;it||q||g>r.currItem.fitRatio&&(mt[t]+=e[t]*n)},Ze=function(t){if(!("mousedown"===t.type&&t.button>0))if(Xe)t.preventDefault();else if(!G||"mousedown"!==t.type){if(Se(t,!0)&&t.preventDefault(),Ct("pointerDown"),D){var e=i.arraySearch(pe,t.pointerId,"id");e<0&&(e=pe.length),pe[e]={x:t.pageX,y:t.pageY,id:t.pointerId}}var n=ze(t),o=n.length;$=null,ee(),J&&1!==o||(J=at=!0,i.bind(window,h,r),Y=ut=st=W=q=V=K=Q=!1,rt=null,Ct("firstTouchStart",n),zt(ft,mt),dt.x=dt.y=0,zt(ue,n[0]),zt(ce,ue),de.x=gt.x*wt,fe=[{x:ue.x,y:ue.y}],B=U=St(),Ht(g,!0),Ie(),ke()),!tt&&o>1&&!it&&!q&&(v=g,Q=!1,tt=K=!0,dt.y=dt.x=0,zt(ft,mt),zt(ae,n[0]),zt(se,n[1]),De(ae,se,ye),ve.x=Math.abs(ye.x)-mt.x,ve.y=Math.abs(ye.y)-mt.y,et=Ae(ae,se))}},Fe=function(t){if(t.preventDefault(),D){var e=i.arraySearch(pe,t.pointerId,"id");if(e>-1){var n=pe[e];n.x=t.pageX,n.y=t.pageY}}if(J){var o=ze(t);if(rt||V||tt)$=o;else if(ge.x!==gt.x*wt)rt="h";else{var r=Math.abs(o[0].x-ue.x)-Math.abs(o[0].y-ue.y);Math.abs(r)>=re&&(rt=r>0?"h":"v",$=o)}}},Ue=function(){if($){var t=$.length;if(0!==t)if(zt(ae,$[0]),le.x=ae.x-ue.x,le.y=ae.y-ue.y,tt&&t>1){if(ue.x=ae.x,ue.y=ae.y,!le.x&&!le.y&&_e($[1],se))return;zt(se,$[1]),Q||(Q=!0,Ct("zoomGestureStarted"));var e=Ae(ae,se),n=Ge(e);n>r.currItem.initialZoomLevel+r.currItem.initialZoomLevel/15&&(ut=!0);var o=1,i=Yt(),a=Wt();if(n<i)if(l.pinchToClose&&!ut&&v<=r.currItem.initialZoomLevel){var s=i-n,u=1-s/(i/1.2);Et(u),Ct("onPinchClose",u),st=!0}else o=(i-n)/i,o>1&&(o=1),n=i-o*(i/3);else n>a&&(o=(n-a)/(6*i),o>1&&(o=1),n=a+o*i);o<0&&(o=0),e,De(ae,se,we),dt.x+=we.x-ye.x,dt.y+=we.y-ye.y,zt(ye,we),mt.x=Pt("x",n),mt.y=Pt("y",n),Y=n>g,g=n,Ot()}else{if(!rt)return;if(at&&(at=!1,Math.abs(le.x)>=re&&(le.x-=$[0].x-ce.x),Math.abs(le.y)>=re&&(le.y-=$[0].y-ce.y)),ue.x=ae.x,ue.y=ae.y,0===le.x&&0===le.y)return;if("v"===rt&&l.closeOnVerticalDrag&&!Me()){dt.y+=le.y,mt.y+=le.y;var c=Le();return W=!0,Ct("onVerticalDrag",c),Et(c),void Ot()}Oe(St(),ae.x,ae.y),V=!0,nt=r.currItem.bounds;var p=Re("x",le);p||(Re("y",le),Rt(mt),Ot())}}},Be=function(t){if(Z.isOldAndroid){if(G&&"mouseup"===t.type)return;t.type.indexOf("touch")>-1&&(clearTimeout(G),G=setTimeout(function(){G=0},600))}var e;if(Ct("pointerUp"),Se(t,!1)&&t.preventDefault(),D){var n=i.arraySearch(pe,t.pointerId,"id");if(n>-1)if(e=pe.splice(n,1)[0],navigator.msPointerEnabled){var o={4:"mouse",2:"touch",3:"pen"};e.type=o[t.pointerType],e.type||(e.type=t.pointerType||"mouse")}else e.type=t.pointerType||"mouse"}var a,s=ze(t),u=s.length;if("mouseup"===t.type&&(u=0),2===u)return $=null,!0;1===u&&zt(ce,s[0]),0!==u||rt||it||(e||("mouseup"===t.type?e={x:t.pageX,y:t.pageY,type:"mouse"}:t.changedTouches&&t.changedTouches[0]&&(e={x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY,type:"touch"})),Ct("touchRelease",t,e));var c=-1;if(0===u&&(J=!1,i.unbind(window,h,r),Ie(),tt?c=0:-1!==be&&(c=St()-be)),be=1===u?St():-1,a=-1!==c&&c<150?"zoom":"swipe",tt&&u<2&&(tt=!1,1===u&&(a="zoomPointerUp"),Ct("zoomGestureEnded")),$=null,V||Q||it||W)if(ee(),H||(H=He()),H.calculateSwipeSpeed("x"),W){var p=Le();if(p<l.verticalDragRange)r.close();else{var d=mt.y,f=lt;ne("verticalDrag",0,1,300,i.easing.cubic.out,function(t){mt.y=(r.currItem.initialPosition.y-d)*t+d,Et((1-f)*t+f),Ot()}),Ct("onVerticalDrag",1)}}else{if((q||it)&&0===u){var m=We(a,H);if(m)return;a="zoomPointerUp"}it||("swipe"===a?!q&&g>r.currItem.fitRatio&&Ye(H):Je())}},He=function(){var t,e,n={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(o){fe.length>1?(t=St()-B+50,e=fe[fe.length-2][o]):(t=St()-U,e=ce[o]),n.lastFlickOffset[o]=ue[o]-e,n.lastFlickDist[o]=Math.abs(n.lastFlickOffset[o]),n.lastFlickDist[o]>20?n.lastFlickSpeed[o]=n.lastFlickOffset[o]/t:n.lastFlickSpeed[o]=0,Math.abs(n.lastFlickSpeed[o])<.1&&(n.lastFlickSpeed[o]=0),n.slowDownRatio[o]=.95,n.slowDownRatioReverse[o]=1-n.slowDownRatio[o],n.speedDecelerationRatio[o]=1},calculateOverBoundsAnimOffset:function(t,e){n.backAnimStarted[t]||(mt[t]>nt.min[t]?n.backAnimDestination[t]=nt.min[t]:mt[t]<nt.max[t]&&(n.backAnimDestination[t]=nt.max[t]),void 0!==n.backAnimDestination[t]&&(n.slowDownRatio[t]=.7,n.slowDownRatioReverse[t]=1-n.slowDownRatio[t],n.speedDecelerationRatioAbs[t]<.05&&(n.lastFlickSpeed[t]=0,n.backAnimStarted[t]=!0,ne("bounceZoomPan"+t,mt[t],n.backAnimDestination[t],e||300,i.easing.sine.out,function(e){mt[t]=e,Ot()}))))},calculateAnimOffset:function(t){n.backAnimStarted[t]||(n.speedDecelerationRatio[t]=n.speedDecelerationRatio[t]*(n.slowDownRatio[t]+n.slowDownRatioReverse[t]-n.slowDownRatioReverse[t]*n.timeDiff/10),n.speedDecelerationRatioAbs[t]=Math.abs(n.lastFlickSpeed[t]*n.speedDecelerationRatio[t]),n.distanceOffset[t]=n.lastFlickSpeed[t]*n.speedDecelerationRatio[t]*n.timeDiff,mt[t]+=n.distanceOffset[t])},panAnimLoop:function(){if(Xt.zoomPan&&(Xt.zoomPan.raf=L(n.panAnimLoop),n.now=St(),n.timeDiff=n.now-n.lastNow,n.lastNow=n.now,n.calculateAnimOffset("x"),n.calculateAnimOffset("y"),Ot(),n.calculateOverBoundsAnimOffset("x"),n.calculateOverBoundsAnimOffset("y"),n.speedDecelerationRatioAbs.x<.05&&n.speedDecelerationRatioAbs.y<.05))return mt.x=Math.round(mt.x),mt.y=Math.round(mt.y),Ot(),void $t("zoomPan")}};return n},Ye=function(t){if(t.calculateSwipeSpeed("y"),nt=r.currItem.bounds,t.backAnimDestination={},t.backAnimStarted={},Math.abs(t.lastFlickSpeed.x)<=.05&&Math.abs(t.lastFlickSpeed.y)<=.05)return t.speedDecelerationRatioAbs.x=t.speedDecelerationRatioAbs.y=0,t.calculateOverBoundsAnimOffset("x"),t.calculateOverBoundsAnimOffset("y"),!0;te("zoomPan"),t.lastNow=St(),t.panAnimLoop()},We=function(t,e){var n,o,a;if(it||(he=d),"swipe"===t){var s=ue.x-ce.x,u=e.lastFlickDist.x<10;s>ie&&(u||e.lastFlickOffset.x>20)?o=-1:s<-ie&&(u||e.lastFlickOffset.x<-20)&&(o=1)}o&&(d+=o,d<0?(d=l.loop?$e()-1:0,a=!0):d>=$e()&&(d=l.loop?0:$e()-1,a=!0),a&&!l.loop||(vt+=o,wt-=o,n=!0));var c,p=gt.x*wt,f=Math.abs(p-ge.x);return n||p>ge.x===e.lastFlickSpeed.x>0?(c=Math.abs(e.lastFlickSpeed.x)>0?f/Math.abs(e.lastFlickSpeed.x):333,c=Math.min(c,400),c=Math.max(c,250)):c=333,he===d&&(n=!1),it=!0,Ct("mainScrollAnimStart"),ne("mainScroll",ge.x,p,c,i.easing.cubic.out,Nt,function(){ee(),it=!1,he=-1,(n||he!==d)&&r.updateCurrItem(),Ct("mainScrollAnimComplete")}),n&&r.updateCurrItem(!0),n},Ge=function(t){return 1/et*t*v},Je=function(){var t=g,e=Yt(),n=Wt();g<e?t=e:g>n&&(t=n);var o,a=1,s=lt;return st&&!Y&&!ut&&g<e?(r.close(),!0):(st&&(o=function(t){Et((a-s)*t+s)}),r.zoomTo(t,0,200,i.easing.cubic.out,o),!0)};It("Gestures",{publicMethods:{initGestures:function(){var t=function(t,e,n,o,i){M=t+e,T=t+n,C=t+o,S=i?t+i:""};D=Z.pointerEvent,D&&Z.touch&&(Z.touch=!1),D?navigator.msPointerEnabled?t("MSPointer","Down","Move","Up","Cancel"):t("pointer","down","move","up","cancel"):Z.touch?(t("touch","start","move","end","cancel"),O=!0):t("mouse","down","move","up"),h=T+" "+C+" "+S,w=M,D&&!O&&(O=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),r.likelyTouchDevice=O,b[M]=Ze,b[T]=Fe,b[C]=Be,S&&(b[S]=b[C]),Z.touch&&(w+=" mousedown",h+=" mousemove mouseup",b.mousedown=b[M],b.mousemove=b[T],b.mouseup=b[C]),O||(l.allowPanToNext=!1)}}});var Ke,Qe,Ve,Xe,qe,$e,tn=function(e,n,o,a){var s;Ke&&clearTimeout(Ke),Xe=!0,Ve=!0,e.initialLayout?(s=e.initialLayout,e.initialLayout=null):s=l.getThumbBoundsFn&&l.getThumbBoundsFn(d);var u=o?l.hideAnimationDuration:l.showAnimationDuration,c=function(){$t("initialZoom"),o?(r.template.removeAttribute("style"),r.bg.removeAttribute("style")):(Et(1),n&&(n.style.display="block"),i.addClass(t,"pswp--animated-in"),Ct("initialZoom"+(o?"OutEnd":"InEnd"))),a&&a(),Xe=!1};if(!u||!s||void 0===s.x)return Ct("initialZoom"+(o?"Out":"In")),g=e.initialZoomLevel,zt(mt,e.initialPosition),Ot(),t.style.opacity=o?0:1,Et(1),void(u?setTimeout(function(){c()},u):c());var f=function(){var n=p,a=!r.currItem.src||r.currItem.loadError||l.showHideOpacity;e.miniImg&&(e.miniImg.style.webkitBackfaceVisibility="hidden"),o||(g=s.w/e.w,mt.x=s.x,mt.y=s.y-P,r[a?"template":"bg"].style.opacity=.001,Ot()),te("initialZoom"),o&&!n&&i.removeClass(t,"pswp--animated-in"),a&&(o?i[(n?"remove":"add")+"Class"](t,"pswp--animate_opacity"):setTimeout(function(){i.addClass(t,"pswp--animate_opacity")},30)),Ke=setTimeout(function(){if(Ct("initialZoom"+(o?"Out":"In")),o){var r=s.w/e.w,l={x:mt.x,y:mt.y},p=g,d=lt,f=function(e){1===e?(g=r,mt.x=s.x,mt.y=s.y-R):(g=(r-p)*e+p,mt.x=(s.x-l.x)*e+l.x,mt.y=(s.y-R-l.y)*e+l.y),Ot(),a?t.style.opacity=1-e:Et(d-e*d)};n?ne("initialZoom",0,1,u,i.easing.cubic.out,f,c):(f(1),Ke=setTimeout(c,u+20))}else g=e.initialZoomLevel,zt(mt,e.initialPosition),Ot(),Et(1),a?t.style.opacity=1:Et(1),Ke=setTimeout(c,u+20)},o?25:90)};f()},en={},nn=[],on={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return Qe.length}},rn=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},an=function(t,e,n){var o=t.bounds;o.center.x=Math.round((en.x-e)/2),o.center.y=Math.round((en.y-n)/2)+t.vGap.top,o.max.x=e>en.x?Math.round(en.x-e):o.center.x,o.max.y=n>en.y?Math.round(en.y-n)+t.vGap.top:o.center.y,o.min.x=e>en.x?0:o.center.x,o.min.y=n>en.y?t.vGap.top:o.center.y},sn=function(t,e,n){if(t.src&&!t.loadError){var o=!n;if(o&&(t.vGap||(t.vGap={top:0,bottom:0}),Ct("parseVerticalMargin",t)),en.x=e.x,en.y=e.y-t.vGap.top-t.vGap.bottom,o){var i=en.x/t.w,r=en.y/t.h;t.fitRatio=i<r?i:r;var a=l.scaleMode;"orig"===a?n=1:"fit"===a&&(n=t.fitRatio),n>1&&(n=1),t.initialZoomLevel=n,t.bounds||(t.bounds=rn())}if(!n)return;return an(t,t.w*n,t.h*n),o&&n===t.initialZoomLevel&&(t.initialPosition=t.bounds.center),t.bounds}return t.w=t.h=0,t.initialZoomLevel=t.fitRatio=1,t.bounds=rn(),t.initialPosition=t.bounds.center,t.bounds},ln=function(t,e,n,o,i,a){e.loadError||o&&(e.imageAppended=!0,pn(e,o,e===r.currItem&&At),n.appendChild(o),a&&setTimeout(function(){e&&e.loaded&&e.placeholder&&(e.placeholder.style.display="none",e.placeholder=null)},500))},un=function(t){t.loading=!0,t.loaded=!1;var e=t.img=i.createEl("pswp__img","img"),n=function(){t.loading=!1,t.loaded=!0,t.loadComplete?t.loadComplete(t):t.img=null,e.onload=e.onerror=null,e=null};return e.onload=n,e.onerror=function(){t.loadError=!0,n()},e.src=t.src,e},cn=function(t,e){if(t.src&&t.loadError&&t.container)return e&&(t.container.innerHTML=""),t.container.innerHTML=l.errorMsg.replace("%url%",t.src),!0},pn=function(t,e,n){if(t.src){e||(e=t.container.lastChild);var o=n?t.w:Math.round(t.w*t.fitRatio),i=n?t.h:Math.round(t.h*t.fitRatio);t.placeholder&&!t.loaded&&(t.placeholder.style.width=o+"px",t.placeholder.style.height=i+"px"),e.style.width=o+"px",e.style.height=i+"px"}},dn=function(){if(nn.length){for(var t,e=0;e<nn.length;e++)t=nn[e],t.holder.index===t.index&&ln(t.index,t.item,t.baseDiv,t.img,!1,t.clearPlaceholder);nn=[]}};It("Controller",{publicMethods:{lazyLoadItem:function(t){t=kt(t);var e=qe(t);e&&(!e.loaded&&!e.loading||A)&&(Ct("gettingData",t,e),e.src&&un(e))},initController:function(){i.extend(l,on,!0),r.items=Qe=n,qe=r.getItemAt,$e=l.getNumItemsFn,l.loop,$e()<3&&(l.loop=!1),Tt("beforeChange",function(t){var e,n=l.preload,o=null===t||t>=0,i=Math.min(n[0],$e()),a=Math.min(n[1],$e());for(e=1;e<=(o?a:i);e++)r.lazyLoadItem(d+e);for(e=1;e<=(o?i:a);e++)r.lazyLoadItem(d-e)}),Tt("initialLayout",function(){r.currItem.initialLayout=l.getThumbBoundsFn&&l.getThumbBoundsFn(d)}),Tt("mainScrollAnimComplete",dn),Tt("initialZoomInEnd",dn),Tt("destroy",function(){for(var t,e=0;e<Qe.length;e++)t=Qe[e],t.container&&(t.container=null),t.placeholder&&(t.placeholder=null),t.img&&(t.img=null),t.preloader&&(t.preloader=null),t.loadError&&(t.loaded=t.loadError=!1);nn=null})},getItemAt:function(t){return t>=0&&(void 0!==Qe[t]&&Qe[t])},allowProgressiveImg:function(){return l.forceProgressiveLoading||!O||l.mouseUsed||screen.width>1200},setContent:function(t,e){l.loop&&(e=kt(e));var n=r.getItemAt(t.index);n&&(n.container=null);var o,a=r.getItemAt(e);if(a){Ct("gettingData",e,a),t.index=e,t.item=a;var s=a.container=i.createEl("pswp__zoom-wrap");if(!a.src&&a.html&&(a.html.tagName?s.appendChild(a.html):s.innerHTML=a.html),cn(a),sn(a,ht),!a.src||a.loadError||a.loaded)a.src&&!a.loadError&&(o=i.createEl("pswp__img","img"),o.style.opacity=1,o.src=a.src,pn(a,o),ln(e,a,s,o,!0));else{if(a.loadComplete=function(n){if(u){if(t&&t.index===e){if(cn(n,!0))return n.loadComplete=n.img=null,sn(n,ht),Lt(n),void(t.index===d&&r.updateCurrZoomItem());n.imageAppended?!Xe&&n.placeholder&&(n.placeholder.style.display="none",n.placeholder=null):Z.transform&&(it||Xe)?nn.push({item:n,baseDiv:s,img:n.img,index:e,holder:t,clearPlaceholder:!0}):ln(e,n,s,n.img,it||Xe,!0)}n.loadComplete=null,n.img=null,Ct("imageLoadComplete",e,n)}},i.features.transform){var c="pswp__img pswp__img--placeholder";c+=a.msrc?"":" pswp__img--placeholder--blank";var p=i.createEl(c,a.msrc?"img":"");a.msrc&&(p.src=a.msrc),pn(a,p),s.appendChild(p),a.placeholder=p}a.loading||un(a),r.allowProgressiveImg()&&(!Ve&&Z.transform?nn.push({item:a,baseDiv:s,img:a.img,index:e,holder:t}):ln(e,a,s,a.img,!0,!0))}Ve||e!==d?Lt(a):(ot=s.style,tn(a,o||a.img)),t.el.innerHTML="",t.el.appendChild(s)}else t.el.innerHTML=""},cleanSlide:function(t){t.img&&(t.img.onload=t.img.onerror=null),t.loaded=t.loading=t.img=t.imageAppended=!1}}});var fn,mn,hn={},wn=function(t,e,n){var o=document.createEvent("CustomEvent"),i={origEvent:t,target:t.target,releasePoint:e,pointerType:n||"touch"};o.initCustomEvent("pswpTap",!0,!0,i),t.target.dispatchEvent(o)};It("Tap",{publicMethods:{initTap:function(){Tt("firstTouchStart",r.onTapStart),Tt("touchRelease",r.onTapRelease),Tt("destroy",function(){hn={},fn=null})},onTapStart:function(t){t.length>1&&(clearTimeout(fn),fn=null)},onTapRelease:function(t,e){if(e&&!V&&!K&&!qt){var n=e;if(fn&&(clearTimeout(fn),fn=null,xe(n,hn)))return void Ct("doubleTap",n);if("mouse"===e.type)return void wn(t,e,"mouse");var o=t.target.tagName.toUpperCase();if("BUTTON"===o||i.hasClass(t.target,"pswp__single-tap"))return void wn(t,e);zt(hn,n),fn=setTimeout(function(){wn(t,e),fn=null},300)}}}}),It("DesktopZoom",{publicMethods:{initDesktopZoom:function(){z||(O?Tt("mouseUsed",function(){r.setupDesktopZoom()}):r.setupDesktopZoom(!0))},setupDesktopZoom:function(e){mn={};var n="wheel mousewheel DOMMouseScroll";Tt("bindEvents",function(){i.bind(t,n,r.handleMouseWheel)}),Tt("unbindEvents",function(){mn&&i.unbind(t,n,r.handleMouseWheel)}),r.mouseZoomedIn=!1;var o,a=function(){r.mouseZoomedIn&&(i.removeClass(t,"pswp--zoomed-in"),r.mouseZoomedIn=!1),g<1?i.addClass(t,"pswp--zoom-allowed"):i.removeClass(t,"pswp--zoom-allowed"),s()},s=function(){o&&(i.removeClass(t,"pswp--dragging"),o=!1)};Tt("resize",a),Tt("afterChange",a),Tt("pointerDown",function(){r.mouseZoomedIn&&(o=!0,i.addClass(t,"pswp--dragging"))}),Tt("pointerUp",s),e||a()},handleMouseWheel:function(t){if(g<=r.currItem.fitRatio)return l.modal&&(!l.closeOnScroll||qt||J?t.preventDefault():E&&Math.abs(t.deltaY)>2&&(p=!0,r.close())),!0;if(t.stopPropagation(),mn.x=0,"deltaX"in t)1===t.deltaMode?(mn.x=18*t.deltaX,mn.y=18*t.deltaY):(mn.x=t.deltaX,mn.y=t.deltaY);else if("wheelDelta"in t)t.wheelDeltaX&&(mn.x=-.16*t.wheelDeltaX),t.wheelDeltaY?mn.y=-.16*t.wheelDeltaY:mn.y=-.16*t.wheelDelta;else{if(!("detail"in t))return;mn.y=t.detail}Ht(g,!0);var e=mt.x-mn.x,n=mt.y-mn.y;(l.modal||e<=nt.min.x&&e>=nt.max.x&&n<=nt.min.y&&n>=nt.max.y)&&t.preventDefault(),r.panTo(e,n)},toggleDesktopZoom:function(e){e=e||{x:ht.x/2+bt.x,y:ht.y/2+bt.y};var n=l.getDoubleTapZoom(!0,r.currItem),o=g===n;r.mouseZoomedIn=!o,r.zoomTo(o?r.currItem.initialZoomLevel:n,e,333),i[(o?"remove":"add")+"Class"](t,"pswp--zoomed-in")}}});var bn,gn,vn,yn,_n,xn,An,In,kn,Mn,Tn,Cn,Sn={history:!0,galleryUID:1},En=function(){return Tn.hash.substring(1)},Dn=function(){bn&&clearTimeout(bn),vn&&clearTimeout(vn)},On=function(){var t=En(),e={};if(t.length<5)return e;var n,o=t.split("&");for(n=0;n<o.length;n++)if(o[n]){var i=o[n].split("=");i.length<2||(e[i[0]]=i[1])}if(l.galleryPIDs){var r=e.pid;for(e.pid=0,n=0;n<Qe.length;n++)if(Qe[n].pid===r){e.pid=n;break}}else e.pid=parseInt(e.pid,10)-1;return e.pid<0&&(e.pid=0),e},Ln=function(){if(vn&&clearTimeout(vn),qt||J)vn=setTimeout(Ln,500);else{yn?clearTimeout(gn):yn=!0;var t=d+1,e=qe(d);e.hasOwnProperty("pid")&&(t=e.pid);var n=An+"&gid="+l.galleryUID+"&pid="+t;In||-1===Tn.hash.indexOf(n)&&(Mn=!0);var o=Tn.href.split("#")[0]+"#"+n;Cn?"#"+n!==window.location.hash&&history[In?"replaceState":"pushState"]("",document.title,o):In?Tn.replace(o):Tn.hash=n,In=!0,gn=setTimeout(function(){yn=!1},60)}};It("History",{publicMethods:{initHistory:function(){if(i.extend(l,Sn,!0),l.history){Tn=window.location,Mn=!1,kn=!1,In=!1,An=En(),Cn="pushState"in history,An.indexOf("gid=")>-1&&(An=An.split("&gid=")[0],An=An.split("?gid=")[0]),Tt("afterChange",r.updateURL),Tt("unbindEvents",function(){i.unbind(window,"hashchange",r.onHashChange)});var t=function(){xn=!0,kn||(Mn?history.back():An?Tn.hash=An:Cn?history.pushState("",document.title,Tn.pathname+Tn.search):Tn.hash=""),Dn()};Tt("unbindEvents",function(){p&&t()}),Tt("destroy",function(){xn||t()}),Tt("firstUpdate",function(){d=On().pid});var e=An.indexOf("pid=");e>-1&&(An=An.substring(0,e),"&"===An.slice(-1)&&(An=An.slice(0,-1))),setTimeout(function(){u&&i.bind(window,"hashchange",r.onHashChange)},40)}},onHashChange:function(){if(En()===An)return kn=!0,void r.close();yn||(_n=!0,r.goTo(On().pid),_n=!1)},updateURL:function(){Dn(),_n||(In?bn=setTimeout(Ln,800):Ln())}}}),i.extend(r,oe)};return t})},c1e2:function(t,e,n){var o=n("e46a");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("499e").default;i("35f03c91",o,!0,{sourceMap:!1,shadowMode:!1})},d86b:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,"/*! PhotoSwipe main CSS by Dmitry Semenov | photoswipe.com | MIT license */.pswp{display:none;position:absolute;width:100%;height:100%;left:0;top:0;overflow:hidden;-ms-touch-action:none;touch-action:none;z-index:1500;-webkit-text-size-adjust:100%;-webkit-backface-visibility:hidden;outline:none}.pswp *{-webkit-box-sizing:border-box;box-sizing:border-box}.pswp img{max-width:none}.pswp--animate_opacity{opacity:.001;will-change:opacity;-webkit-transition:opacity 333ms cubic-bezier(.4,0,.22,1);transition:opacity 333ms cubic-bezier(.4,0,.22,1)}.pswp--open{display:block}.pswp--zoom-allowed .pswp__img{cursor:-webkit-zoom-in;cursor:-moz-zoom-in;cursor:zoom-in}.pswp--zoomed-in .pswp__img{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.pswp--dragging .pswp__img{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.pswp__bg{background:#000;opacity:0;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-backface-visibility:hidden}.pswp__bg,.pswp__scroll-wrap{position:absolute;left:0;top:0;width:100%;height:100%}.pswp__scroll-wrap{overflow:hidden}.pswp__container,.pswp__zoom-wrap{-ms-touch-action:none;touch-action:none;position:absolute;left:0;right:0;top:0;bottom:0}.pswp__container,.pswp__img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}.pswp__zoom-wrap{position:absolute;width:100%;-webkit-transform-origin:left top;transform-origin:left top;-webkit-transition:-webkit-transform 333ms cubic-bezier(.4,0,.22,1);transition:-webkit-transform 333ms cubic-bezier(.4,0,.22,1);transition:transform 333ms cubic-bezier(.4,0,.22,1);transition:transform 333ms cubic-bezier(.4,0,.22,1),-webkit-transform 333ms cubic-bezier(.4,0,.22,1)}.pswp__bg{will-change:opacity;-webkit-transition:opacity 333ms cubic-bezier(.4,0,.22,1);transition:opacity 333ms cubic-bezier(.4,0,.22,1)}.pswp--animated-in .pswp__bg,.pswp--animated-in .pswp__zoom-wrap{-webkit-transition:none;transition:none}.pswp__container,.pswp__zoom-wrap{-webkit-backface-visibility:hidden}.pswp__item{right:0;bottom:0;overflow:hidden}.pswp__img,.pswp__item{position:absolute;left:0;top:0}.pswp__img{width:auto;height:auto}.pswp__img--placeholder{-webkit-backface-visibility:hidden}.pswp__img--placeholder--blank{background:#222}.pswp--ie .pswp__img{width:100%!important;height:auto!important;left:0;top:0}.pswp__error-msg{position:absolute;left:0;top:50%;width:100%;text-align:center;font-size:14px;line-height:16px;margin-top:-8px;color:#ccc}.pswp__error-msg a{color:#ccc;text-decoration:underline}",""])},e46a:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,'.pswp__button.pswp__button--rotation{background-position:50%;background-repeat:no-repeat;background-size:auto}.pswp__button.pswp__button--rotation.pswp__button.pswp__button--rotation--left,.pswp__button.pswp__button--rotation.pswp__button.pswp__button--rotation--right{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASBJREFUeNqk00FLAkEYxnFHuwidypQ6eOkcgVcvWtkp7CiiR+ki9AUEP0mIXf0A1SUkhEAkwnOGQaghCtJF8OD2f2UWh0Fpy4Hfws7su+8y86xyHMe3yfCvmNvGNZ4whnTooYY0lPmwsr7gDLc4wCseMEEIp4jhGTl8LCrkBVoaM7wjacybEvhEH4eL5lwqOMc3OoisKXbto4smlEy86c5TXP1S7JKGMjJy03CWY46Cx5e0cS+n8KU3sIML3Hg8wTqO/bqwjCPc/SECQ+xucSlh/o8MhSUnaoMkttH3edwwW0pvetZeiCPsMQctBMyFHQx1EhNrik90EgduEu09SKKKKF7wiBH2rH8hj679L7iCKKKOiU6pdK3hUuJrPv8jwAASlMcqHuTzOgAAAABJRU5ErkJggg==")}.pswp__button.pswp__button--rotation.pswp__button.pswp__button--rotation--right{-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}.pswp__img.pswp__img--transition{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}',""])},f301:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9Ijg4IiB2aWV3Qm94PSIwIDAgMjY0IDg4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5kZWZhdWx0LXNraW4gMjwvdGl0bGU+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Zz48cGF0aCBkPSJNNjcuMDAyIDU5LjV2My43NjhjLTYuMzA3Ljg0LTkuMTg0IDUuNzUtMTAuMDAyIDkuNzMyIDIuMjItMi44MyA1LjU2NC01LjA5OCAxMC4wMDItNS4wOThWNzEuNUw3MyA2NS41ODUgNjcuMDAyIDU5LjV6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTMgMjl2LTVoMnYzaDN2MmgtNXpNMTMgMTVoNXYyaC0zdjNoLTJ2LTV6TTMxIDE1djVoLTJ2LTNoLTN2LTJoNXpNMzEgMjloLTV2LTJoM3YtM2gydjV6IiBpZD0iU2hhcGUiLz48L2c+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTYyIDI0djVoLTJ2LTNoLTN2LTJoNXpNNjIgMjBoLTV2LTJoM3YtM2gydjV6TTcwIDIwdi01aDJ2M2gzdjJoLTV6TTcwIDI0aDV2MmgtM3YzaC0ydi01eiIvPjwvZz48cGF0aCBkPSJNMjAuNTg2IDY2bC01LjY1Ni01LjY1NiAxLjQxNC0xLjQxNEwyMiA2NC41ODZsNS42NTYtNS42NTYgMS40MTQgMS40MTRMMjMuNDE0IDY2bDUuNjU2IDUuNjU2LTEuNDE0IDEuNDE0TDIyIDY3LjQxNGwtNS42NTYgNS42NTYtMS40MTQtMS40MTRMMjAuNTg2IDY2eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMTEuNzg1IDY1LjAzTDExMCA2My41bDMtMy41aC0xMHYtMmgxMGwtMy0zLjUgMS43ODUtMS40NjhMMTE3IDU5bC01LjIxNSA2LjAzeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNTIuMjE1IDY1LjAzTDE1NCA2My41bC0zLTMuNWgxMHYtMmgtMTBsMy0zLjUtMS43ODUtMS40NjhMMTQ3IDU5bDUuMjE1IDYuMDN6IiBmaWxsPSIjZmZmIi8+PGc+PHBhdGggaWQ9IlJlY3RhbmdsZS0xMSIgZmlsbD0iI2ZmZiIgZD0iTTE2MC45NTcgMjguNTQzbC0zLjI1LTMuMjUtMS40MTMgMS40MTQgMy4yNSAzLjI1eiIvPjxwYXRoIGQ9Ik0xNTIuNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIGlkPSJPdmFsLTEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUwIDIxaDV2MWgtNXoiLz48L2c+PGc+PHBhdGggZD0iTTExNi45NTcgMjguNTQzbC0xLjQxNCAxLjQxNC0zLjI1LTMuMjUgMS40MTQtMS40MTQgMy4yNSAzLjI1eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMDguNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA2IDIxaDV2MWgtNXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA5LjA0MyAxOS4wMDhsLS4wODUgNS0xLS4wMTcuMDg1LTV6Ii8+PC9nPjwvZz48L2c+PC9zdmc+"},f6fd:function(t,e){(function(t){var e="currentScript",n=t.getElementsByTagName("script");e in t||Object.defineProperty(t,e,{get:function(){try{throw new Error}catch(o){var t,e=(/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(o.stack)||[!1])[1];for(t in n)if(n[t].src==e||"interactive"==n[t].readyState)return n[t];return null}}})})(document)},fa4e:function(t,e,n){e=t.exports=n("2350")(!1),e.i(n("d86b"),""),e.i(n("1de3"),""),e.push([t.i,".pswipe-gallery [data-pswp-src]{cursor:pointer;cursor:-webkit-zoom-in;cursor:zoom-in}",""])},fb15:function(t,e,n){"use strict";var o;(n.r(e),"undefined"!==typeof window)&&(n("f6fd"),(o=window.document.currentScript)&&(o=o.src.match(/(.+\/)[^\/]+\.js(\?.*)?$/))&&(n.p=o[1]));var i=n("b24f"),r=n.n(i),a=n("14fd"),s=n.n(a),l=n("8bbf"),u=n.n(l),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pswp",attrs:{tabindex:"-1",role:"dialog","aria-hidden":"true"}},[n("div",{staticClass:"pswp__bg"}),n("div",{staticClass:"pswp__scroll-wrap"},[t._m(0),n("div",{staticClass:"pswp__ui pswp__ui--hidden"},[n("div",{staticClass:"pswp__top-bar"},[n("div",{staticClass:"pswp__counter"}),n("button",{staticClass:"pswp__button pswp__button--close",attrs:{title:"Close (Esc)"}}),n("button",{staticClass:"pswp__button pswp__button--share",attrs:{title:"Share"}}),n("button",{staticClass:"pswp__button pswp__button--fs",attrs:{title:"Toggle fullscreen"}}),t.rotate?[n("button",{staticClass:"pswp__button pswp__button--rotation pswp__button--rotation--right",attrs:{title:"Rotate Right"},on:{pswpTap:function(e){return t.handleRotate("right")}}}),n("button",{staticClass:"pswp__button pswp__button--rotation pswp__button--rotation--left",attrs:{title:"Rotate Left"},on:{pswpTap:function(e){return t.handleRotate("left")}}})]:t._e(),n("button",{staticClass:"pswp__button pswp__button--zoom",attrs:{title:"Zoom in/out"}}),t._m(1)],2),t._m(2),n("button",{staticClass:"pswp__button pswp__button--arrow--left",attrs:{title:"Previous (arrow left)"}}),n("button",{staticClass:"pswp__button pswp__button--arrow--right",attrs:{title:"Next (arrow right)"}}),t._m(3)])])])},p=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pswp__container"},[n("div",{staticClass:"pswp__item"}),n("div",{staticClass:"pswp__item"}),n("div",{staticClass:"pswp__item"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pswp__preloader"},[n("div",{staticClass:"pswp__preloader__icn"},[n("div",{staticClass:"pswp__preloader__cut"},[n("div",{staticClass:"pswp__preloader__donut"})])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pswp__share-modal pswp__share-modal--hidden pswp__single-tap"},[n("div",{staticClass:"pswp__share-tooltip"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pswp__caption"},[n("div",{staticClass:"pswp__caption__center"})])}];function d(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a}var f=n("65d9"),m=n.n(f);function h(t){return void 0===t&&(t={}),Object(f["createDecorator"])(function(e,n){(e.props||(e.props={}))[n]=t})}function w(t){return w="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function b(t,e){return y(t)||v(t,e)||g()}function g(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function v(t,e){var n=[],o=!0,i=!1,r=void 0;try{for(var a,s=t[Symbol.iterator]();!(o=(a=s.next()).done);o=!0)if(n.push(a.value),e&&n.length===e)break}catch(l){i=!0,r=l}finally{try{o||null==s["return"]||s["return"]()}finally{if(i)throw r}}return n}function y(t){if(Array.isArray(t))return t}function _(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function x(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function A(t,e,n){return e&&x(t.prototype,e),n&&x(t,n),t}function I(t,e){return!e||"object"!==w(e)&&"function"!==typeof e?k(t):e}function k(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function M(t){return M=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},M(t)}function T(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&C(t,e)}function C(t,e){return C=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},C(t,e)}var S="pswp__img--transition",E=function(t){function e(){var t;return _(this,e),t=I(this,M(e).apply(this,arguments)),t.rotate=!1,t.isRotateTransform=!1,t}return T(e,t),A(e,[{key:"handleRotate",value:function(t){var e=this,n=J.get(),o=n.container,i=n.currItem,r=i.container.lastChild;if(i.loaded&&!this.isRotateTransform){n.updateSize(!1);var a=Dt(r,t),s=b(a,2),l=(s[0],s[1]),u=l%180!==0;i.verticalRotated=u;var c="rotate(".concat(l,"deg)"),p=Ot(o,i),d=jt(p,r,u),f=b(d,2),m=f[0],h=f[1],w=function t(){r.removeEventListener(Pt,t),r.classList.remove(S);var o=r.naturalHeight,a=r.naturalWidth;u?(i.w=o,i.h=a,r.style[Nt("transform")]=c+h):(i.w=a,i.h=o,r.style[Nt("transform")]=c),n.updateSize(!1),e.isRotateTransform=!1};r.addEventListener(Pt,w),r.classList.add(S),this.isRotateTransform=!0,r.style[Nt("transform")]=c+m}}},{key:"created",value:function(){var t=this;kt.on("opened",function(e){e.rotate&&(t.rotate=!0);var n=J.get();n.listen("destroy",function(){t.rotate=!1})})}}]),e}(u.a);E=d([m()({name:"Pswp"})],E);var D=E,O=D;n("45a1");function L(t,e,n,o,i,r,a,s){var l,u="function"===typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),o&&(u.functional=!0),r&&(u._scopeId="data-v-"+r),a?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},u._ssrRegister=l):i&&(l=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),l)if(u.functional){u._injectStyles=l;var c=u.render;u.render=function(t,e){return l.call(e),c(t,e)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,l):[l]}return{exports:t,options:u}}var j=L(O,c,p,!1,null,null,null),N=j.exports;function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)}return n}function z(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?P(n,!0).forEach(function(e){R(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function R(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Z(t){return B(t)||U(t)||F()}function F(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function U(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function B(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function H(t,e){return G(t)||W(t,e)||Y()}function Y(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function W(t,e){var n=[],o=!0,i=!1,r=void 0;try{for(var a,s=t[Symbol.iterator]();!(o=(a=s.next()).done);o=!0)if(n.push(a.value),e&&n.length===e)break}catch(l){i=!0,r=l}finally{try{o||null==s["return"]||s["return"]()}finally{if(i)throw r}}return n}function G(t){if(Array.isArray(t))return t}var J,K=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},Q=function(t){return"number"===typeof t},V=function(t){return"string"===typeof t},X=function(t){return"[object Object]"===Object.prototype.toString.call(t)},q=function(t){return"[object Function]"===Object.prototype.toString.call(t)},$=function(t){return void 0!==t&&null!==t},tt=function(t){return t&&"IMG"===t.tagName},et=function(t){return 1===t.nodeType},nt=function(t){return!tt(t)&&!!t.dataset.pswpSrc},ot=function(t){throw new Error("[vue-pswipe] ".concat(t))};(function(t){var e=null,n=function(t){t.listen("destroy",function(){e=null})};t.get=function(){return e},t.set=function(t){e=t,t&&n(t)}})(J||(J={}));var it,rt=function(t){return new Promise(function(e){var n,o=new Image;o.src=t,o.addEventListener("error",function(){clearTimeout(n)});var i=function t(){if(o.width>0||o.height>0)return e({w:o.width,h:o.height});n=window.setTimeout(t,40)};i()})},at=function(t,e){var n=-1;return t.some(function(t,o){var i=e(t,o);return i&&(n=o),i}),n},st=function(){var t=window.location.hash.substring(1),e={};return t.length<5?e:(t.split("&").reduce(function(t,e){if(!e)return t;var n=e.split("=");if(n.length<2)return t;var o=H(n,2),i=o[0],r=o[1];return t[i]=r,t},e),e)},lt=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return Z(e.querySelectorAll(t))},ut=function t(e,n){return!!e&&et(e)&&(n(e)?e:t(e.parentNode,n))},ct=function(t){var e;return function(){for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return e||(e=t.apply(this,o))}},pt=function(t){return document.body.appendChild(t)},dt=ct(pt),ft=function(t,e){var n=e.w,o=e.h;t&&t.dataset&&(t.dataset.pswpSize="".concat(n,"x").concat(o))},mt=function(t,e){return e&&tt(t)?t.src:t.dataset.pswpSrc||""},ht=function(t,e,n){return e?tt(t)&&n(t):!!t.dataset.pswpSrc},wt=function(t){return t.replace(/^\S/,function(t){return t.toUpperCase()})},bt=function(t){return"pswp".concat(wt(t))},gt=function(t,e){Object.keys(t).forEach(function(n){e.dataset[bt(n)]="".concat(t[n])})},vt=function(t,e){V(e)&&gt({src:e},t),X(e)&&gt(e,t)},yt=function(t){var e=t.src,n=t.msrc,o=t.el;if(!t.w&&!t.h&&n){var i=new Image;i.src=n;var r=i,a=r.width,s=r.height;a&&s&&(t.w=a,t.h=s,e===n&&ft(o,{w:a,h:s})),i=null}},_t=function(t,e){e&&Object.keys(e.$listeners).filter(function(t){return!Rt.includes(t)}).forEach(function(n){var o=e.$listeners[n];q(o)&&t.listen(n,function(){for(var t=arguments.length,o=new Array(t),i=0;i<t;i++)o[i]=arguments[i];e.$emit.apply(e,[n].concat(o))})})},xt=function(t,e){var n=null;Object.defineProperty(t,"img",{get:function(){return n},set:function(o){tt(o)&&o.addEventListener("load",function(){var n=o.naturalWidth,i=o.naturalHeight;t.w=n,t.h=i,ft(t.el,{w:n,h:i}),J.get()===e&&e.updateSize(!0)}),n=o}})},At=function(t){t.listen("gettingData",function(e,n){yt(n),n.el&&n.el.dataset.pswpSize||Object.getOwnPropertyDescriptor(n,"img")||(t.currItem===n&&(t.options.showAnimationDuration=0),xt(n,t))})},It=function(t){t.listen("gettingData",function(t,e){if(e.verticalRotated){var n=e.w;e.w=e.h,e.h=n,e.verticalRotated=!1}})};(function(t){t.mount=function(){if(!t.el){var e=new u.a(N).$mount();t.el=e.$el}},t.append=function(){t.mount(),dt(t.el)}})(it||(it={}));var kt,Mt=function(t){return t.map(function(t){return $(t.w)||(t.w=0),$(t.h)||(t.h=0),t})},Tt=function(t){var e=t.items,n=t.options,o=t.context,i=new r.a(it.el,s.a,e,n);return _t(i,o),At(i),It(i),J.set(i),i.init(),i},Ct=function(t){var e=t.items,n=t.options;return Tt({items:Mt(e),options:z({},Et.get(),{hideAnimationDuration:0,showAnimationDuration:0},n,{history:!1})})},St=function(t,e,n,o){if(n<=t&&o<=e)return{w:n,h:o};var i=n/o,r=t/e;return r<i?{w:t,h:t/i}:{w:e*i,h:e}};(function(t){var e={};t.off=function(t,n){if(!n)return e[t].length=0;var o=e[t],i=o.indexOf(n);-1!==i&&o.splice(i,1)},t.on=function(n,o){return e[n]||(e[n]=[]),e[n].push(o),function(){return t.off(n,o)}},t.once=function(e,n){var o=t.on(e,function(){o(),n.apply(void 0,arguments)})},t.emit=function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];var r=e[t];Array.isArray(r)&&r.forEach(function(t){return t.apply(void 0,o)})}})(kt||(kt={}));var Et,Dt=function(t,e){var n=Number(t.dataset.rotateDeg)||0,o="left"===e?-90:90,i=n+o;return t.dataset.rotateDeg="".concat(i),[n,i]},Ot=function(t,e){var n=t.clientWidth,o=e.vGap?t.clientHeight-e.vGap.top-e.vGap.bottom:t.clientHeight;return{w:n,h:o}},Lt=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t;return"scale(".concat(t,", ").concat(e,")")},jt=function(t,e,n){var o=e.naturalWidth,i=e.naturalHeight,r=St(t.w,t.h,o,i),a=r.w,s=r.h,l=St(t.w,t.h,i,o),u=l.w,c=l.h,p=n?Lt(c/a):Lt(a/u,s/c),d=Lt(c/u,u/c);return[p,d]},Nt=function(){var t={},e=document.createElement("div"),n=e.style;return function(e){var o=t[e];if(o)return o;var i=e;return $(n[e])||["Moz","ms","O","Webkit"].some(function(t){var o=t+wt(e);if($(n[o]))return i=o}),t[e]=i,i}}(),Pt=function(){var t={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"},e=Nt("transition");return t[e]}(),zt=function(){var t=u.a.directive("pswp");t||u.a.directive("pswp",{bind:function(t,e){var n=e.value;vt(t,n)},update:function(t,e){var n=e.value,o=e.oldValue;n!==o&&vt(t,n)}})},Rt=["beforeOpen","opened"],Zt=K(),Ft={history:!1,zoomEl:!Zt,shareEl:!Zt,shareButtons:[{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}]};(function(t){var e=Ft;t.get=function(){return e},t.extend=function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];Object.assign.apply(Object,[e].concat(n))}})(Et||(Et={}));var Ut=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"gallery",staticClass:"pswipe-gallery",on:{click:t.onThumbClick}},[t._t("default")],2)},Bt=[];function Ht(t){return Ht="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ht(t)}function Yt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)}return n}function Wt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Yt(n,!0).forEach(function(e){Gt(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Yt(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function Gt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Jt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Kt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function Qt(t,e,n){return e&&Kt(t.prototype,e),n&&Kt(t,n),t}function Vt(t,e){return!e||"object"!==Ht(e)&&"function"!==typeof e?Xt(t):e}function Xt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function qt(t){return qt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},qt(t)}function $t(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&te(t,e)}function te(t,e){return te=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},te(t,e)}zt();var ee=function(t){function e(){return Jt(this,e),Vt(this,qt(e).apply(this,arguments))}return $t(e,t),Qt(e,[{key:"getThumbEls",value:function(){return this.auto?lt("img",this.gallery).filter(this.filter):lt("[data-pswp-src]",this.gallery)}},{key:"parseThumbEls",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.getThumbEls();return e.map(function(e){var n=e.dataset,o=mt(e,t.auto)||"",i=n.pswpMsrc||o,r=(n.pswpSize||"").split("x"),a={msrc:i,src:o,el:e,w:Number(r[0]||0),h:Number(r[1]||0)},s=n.pswpTitle,l=n.pswpPid;return s&&(a.title=s),l&&(a.pid=l),a})}},{key:"onThumbClick",value:function(t){var e=!this.auto&&this.bubble&&ut(t.target,function(t){return!!t.dataset.pswpSrc})||t.target;if(ht(e,this.auto,this.filter)){var n=this.getThumbEls(),o=at(n,function(t){return t===e});-1!==o&&this.openPhotoSwipe({index:o,thumbEls:n})}}},{key:"getThumbBoundsFn",value:function(t){return function(e){var n=t[e].el,o=window.pageYOffset||document.documentElement.scrollTop,i=n.getBoundingClientRect();return{x:i.left,y:i.top+o,w:i.width}}}},{key:"parseIndex",value:function(t,e,n,o){return o?n.galleryPIDs?at(e,function(e){return e.pid===t}):+t-1:+t}},{key:"openPhotoSwipe",value:function(t){var e=this,n=t.index,o=t.fromURL,i=t.thumbEls,r=this.parseThumbEls(i),a=Wt({galleryUID:+(this.gallery.dataset.pswpUid||""),getThumbBoundsFn:this.getThumbBoundsFn(r)},Et.get(),{},this.options),s=this.parseIndex(n,r,a,o);if(s>=0&&(a.index=s),!Q(a.index)||Number.isNaN(a.index))return ot("PhotoSwipe cannot be opened because the index is invalid. If you use a custom pid, set options.galleryPIDs to true.");o&&(a.showAnimationDuration=0),a.showHideOpacity||(a.showHideOpacity=nt(r[s].el));var l=function(){e.pswp=Tt({items:r,options:a,context:e}),e.$emit("opened",e.pswp),kt.emit("opened",e.$props)};if(this.$listeners.beforeOpen){var u={index:s,items:r,options:a,target:r[s].el},c=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t&&l()};this.$emit("beforeOpen",u,c)}else l()}},{key:"initPhotoSwipeFromDOM",value:function(t){var e=this,n=lt(t),o=at(n,function(t){return t===e.gallery}),i=o+1;this.gallery.dataset.pswpUid="".concat(i);var r=st(),a=r.pid,s=r.gid;a&&s&&+s===i&&setTimeout(function(){e.openPhotoSwipe({index:a,fromURL:!0})})}},{key:"openPswp",value:function(){this.initPhotoSwipeFromDOM(".pswipe-gallery")}},{key:"setImageSizeSeparately",value:function(t){return rt(mt(t,this.auto)).then(function(e){return ft(t,e)})}},{key:"setImageSize",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.getThumbEls();return Promise.all(e.filter(function(t){return!t.dataset.pswpSize}).map(function(e){return t.setImageSizeSeparately(e)}))}},{key:"created",value:function(){it.append()}},{key:"mounted",value:function(){this.gallery=this.$refs.gallery,this.lazy||this.setImageSize(),this.openPswp()}}]),e}(u.a);d([h(Object)],ee.prototype,"options",void 0),d([h({type:Boolean,default:!1})],ee.prototype,"auto",void 0),d([h({type:Boolean,default:!1})],ee.prototype,"bubble",void 0),d([h({type:Boolean,default:!0})],ee.prototype,"lazy",void 0),d([h({type:Function,default:function(){return!0}})],ee.prototype,"filter",void 0),d([h({type:Boolean,default:!1})],ee.prototype,"rotate",void 0),ee=d([m()({name:"Photoswipe"})],ee);var ne=ee,oe=ne,ie=(n("3dfa"),L(oe,Ut,Bt,!1,null,null,null)),re=ie.exports,ae=function(t,e){e&&Et.extend(e),zt(),t.component("Photoswipe",re),t.prototype.$Pswp={open:function(t){it.append(),Ct(t)},current:J.get()}},se=re,le=ae;n.d(e,"Photoswipe",function(){return se});e["default"]=le}})});
//# sourceMappingURL=Photoswipe.umd.min.js.map

/***/ }),

/***/ "71c1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var defined = __webpack_require__("25eb");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "74d8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7608":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Disclaimer_vue_vue_type_style_index_0_id_715b2552_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0eaa");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Disclaimer_vue_vue_type_style_index_0_id_715b2552_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Disclaimer_vue_vue_type_style_index_0_id_715b2552_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Disclaimer_vue_vue_type_style_index_0_id_715b2552_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "76a1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "78ce":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "795b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("696e");

/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a77":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "7aac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "7cd6":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "7e90":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var anObject = __webpack_require__("e4ae");
var getKeys = __webpack_require__("c3a1");

module.exports = __webpack_require__("8e60") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "8436":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "86ee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dayOfYearFromWeeks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return weekOfYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return weeksInYear; });
/* harmony import */ var _year__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ec30");
/* harmony import */ var _create_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e755");
/* harmony import */ var _create_date_from_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cab0");




// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + Object(_create_date_from_array__WEBPACK_IMPORTED_MODULE_2__[/* createUTCDate */ "b"])(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = Object(_year__WEBPACK_IMPORTED_MODULE_0__[/* daysInYear */ "a"])(resYear) + dayOfYear;
    } else if (dayOfYear > Object(_year__WEBPACK_IMPORTED_MODULE_0__[/* daysInYear */ "a"])(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - Object(_year__WEBPACK_IMPORTED_MODULE_0__[/* daysInYear */ "a"])(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (Object(_year__WEBPACK_IMPORTED_MODULE_0__[/* daysInYear */ "a"])(year) - weekOffset + weekOffsetNext) / 7;
}


/***/ }),

/***/ "886e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hooks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setHookCallback; });


var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "8df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__("7a77");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8e97":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_style_index_0_id_91aae8c6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("74d8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_style_index_0_id_91aae8c6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_style_index_0_id_91aae8c6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_style_index_0_id_91aae8c6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8f11":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProblemSlider_vue_vue_type_style_index_0_id_55595a33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("057f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProblemSlider_vue_vue_type_style_index_0_id_55595a33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProblemSlider_vue_vue_type_style_index_0_id_55595a33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProblemSlider_vue_vue_type_style_index_0_id_55595a33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8f60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("a159");
var descriptor = __webpack_require__("aebd");
var setToStringTag = __webpack_require__("45f2");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("35e8")(IteratorPrototype, __webpack_require__("5168")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "8f66":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvyWarning_vue_vue_type_style_index_0_id_20b3cdd1_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d8e7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvyWarning_vue_vue_type_style_index_0_id_20b3cdd1_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvyWarning_vue_vue_type_style_index_0_id_20b3cdd1_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvyWarning_vue_vue_type_style_index_0_id_20b3cdd1_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8f73":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultRelativeTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return relativeTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pastFuture; });
/* harmony import */ var _utils_is_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6937");
var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};



function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (Object(_utils_is_function__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return Object(_utils_is_function__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(format) ? format(output) : format.replace(/%s/i, output);
}


/***/ }),

/***/ "90e5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createUTC; });
/* harmony import */ var _from_anything__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5139");


function createUTC (input, format, locale, strict) {
    return Object(_from_anything__WEBPACK_IMPORTED_MODULE_0__[/* createLocalOrUTC */ "a"])(input, format, locale, strict, true).utc();
}


/***/ }),

/***/ "9138":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("35e8");


/***/ }),

/***/ "91bc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return copyConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Moment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isMoment; });
/* harmony import */ var _utils_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("886e");
/* harmony import */ var _utils_has_own_prop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2398");
/* harmony import */ var _utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("93fc");
/* harmony import */ var _create_parsing_flags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("0a9d");





// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = _utils_hooks__WEBPACK_IMPORTED_MODULE_0__[/* hooks */ "a"].momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._i)) {
        to._i = from._i;
    }
    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._f)) {
        to._f = from._f;
    }
    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._l)) {
        to._l = from._l;
    }
    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._strict)) {
        to._strict = from._strict;
    }
    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._offset)) {
        to._offset = from._offset;
    }
    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._pf)) {
        to._pf = Object(_create_parsing_flags__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(from);
    }
    if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        _utils_hooks__WEBPACK_IMPORTED_MODULE_0__[/* hooks */ "a"].updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}


/***/ }),

/***/ "924a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9279":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/moment/src/lib/moment/get-set.js
var get_set = __webpack_require__("42e2");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/has-own-prop.js
var has_own_prop = __webpack_require__("2398");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/format/format.js
var format_format = __webpack_require__("3625");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/aliases.js
var aliases = __webpack_require__("f987");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/priorities.js
var priorities = __webpack_require__("d4a2");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/parse/regex.js
var parse_regex = __webpack_require__("f66e");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/parse/token.js
var parse_token = __webpack_require__("dff0");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/hooks.js
var hooks = __webpack_require__("886e");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/constants.js
var constants = __webpack_require__("0f49");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/to-int.js
var to_int = __webpack_require__("29f2");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-array.js
var is_array = __webpack_require__("cef3");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-number.js
var is_number = __webpack_require__("4137");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/utils/mod.js
function mod(n, x) {
    return ((n % x) + x) % x;
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/index-of.js
var index_of = __webpack_require__("0df4");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/utc.js
var utc = __webpack_require__("90e5");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/parsing-flags.js
var parsing_flags = __webpack_require__("0a9d");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/year.js
var units_year = __webpack_require__("ec30");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/month.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return daysInMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultLocaleMonths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return localeMonths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return defaultLocaleMonthsShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return localeMonthsShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return localeMonthsParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return setMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getSetMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getDaysInMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return monthsShortRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return monthsRegex; });


















function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (Object(units_year["d" /* isLeapYear */])(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

Object(format_format["a" /* addFormatToken */])('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

Object(format_format["a" /* addFormatToken */])('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

Object(format_format["a" /* addFormatToken */])('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

Object(aliases["a" /* addUnitAlias */])('month', 'M');

// PRIORITY

Object(priorities["a" /* addUnitPriority */])('month', 8);

// PARSING

Object(parse_regex["a" /* addRegexToken */])('M',    parse_regex["d" /* match1to2 */]);
Object(parse_regex["a" /* addRegexToken */])('MM',   parse_regex["d" /* match1to2 */], parse_regex["h" /* match2 */]);
Object(parse_regex["a" /* addRegexToken */])('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
Object(parse_regex["a" /* addRegexToken */])('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

Object(parse_token["a" /* addParseToken */])(['M', 'MM'], function (input, array) {
    array[constants["e" /* MONTH */]] = Object(to_int["a" /* default */])(input) - 1;
});

Object(parse_token["a" /* addParseToken */])(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[constants["e" /* MONTH */]] = month;
    } else {
        Object(parsing_flags["a" /* default */])(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return Object(is_array["a" /* default */])(this._months) ? this._months :
            this._months['standalone'];
    }
    return Object(is_array["a" /* default */])(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return Object(is_array["a" /* default */])(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return Object(is_array["a" /* default */])(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = Object(utc["a" /* createUTC */])([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = index_of["a" /* default */].call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = index_of["a" /* default */].call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = index_of["a" /* default */].call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = index_of["a" /* default */].call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = index_of["a" /* default */].call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = index_of["a" /* default */].call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = Object(utc["a" /* createUTC */])([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = Object(to_int["a" /* default */])(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!Object(is_number["a" /* default */])(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks["a" /* hooks */].updateOffset(this, true);
        return this;
    } else {
        return Object(get_set["a" /* get */])(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = parse_regex["s" /* matchWord */];
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!Object(has_own_prop["a" /* default */])(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!Object(has_own_prop["a" /* default */])(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = parse_regex["s" /* matchWord */];
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!Object(has_own_prop["a" /* default */])(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!Object(has_own_prop["a" /* default */])(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = Object(utc["a" /* createUTC */])([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = Object(parse_regex["t" /* regexEscape */])(shortPieces[i]);
        longPieces[i] = Object(parse_regex["t" /* regexEscape */])(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = Object(parse_regex["t" /* regexEscape */])(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}


/***/ }),

/***/ "93fc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isUndefined; });
function isUndefined(input) {
    return input === void 0;
}


/***/ }),

/***/ "96cf":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "9b15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultInvalidDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return invalidDate; });
var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "9e2b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a159":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("e4ae");
var dPs = __webpack_require__("7e90");
var enumBugKeys = __webpack_require__("1691");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("1ec9")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("32fc").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "a22a":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("d864");
var call = __webpack_require__("b0dc");
var isArrayIter = __webpack_require__("3702");
var anObject = __webpack_require__("e4ae");
var toLength = __webpack_require__("b447");
var getIterFn = __webpack_require__("7cd6");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a4ad":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastPlugin_vue_vue_type_style_index_1_id_6338e63e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("473a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastPlugin_vue_vue_type_style_index_1_id_6338e63e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastPlugin_vue_vue_type_style_index_1_id_6338e63e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForecastPlugin_vue_vue_type_style_index_1_id_6338e63e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a70b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a96e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocatorRose_vue_vue_type_style_index_0_id_1de2e5cc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cd06");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocatorRose_vue_vue_type_style_index_0_id_1de2e5cc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocatorRose_vue_vue_type_style_index_0_id_1de2e5cc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocatorRose_vue_vue_type_style_index_0_id_1de2e5cc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "aba2":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var macrotask = __webpack_require__("4178").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("6b4c")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "abcf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "aeaa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return localeIsPM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultLocaleMeridiemParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return localeMeridiem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getSetHour; });
/* harmony import */ var _moment_get_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("42e2");
/* harmony import */ var _format_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3625");
/* harmony import */ var _aliases__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("f987");
/* harmony import */ var _priorities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d4a2");
/* harmony import */ var _parse_regex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("f66e");
/* harmony import */ var _parse_token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("dff0");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("0f49");
/* harmony import */ var _utils_to_int__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("29f2");
/* harmony import */ var _utils_zero_fill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("4de3");
/* harmony import */ var _create_parsing_flags__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("0a9d");











// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])('H', ['HH', 2], 0, 'hour');
Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])('h', ['hh', 2], 0, hFormat);
Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])('k', ['kk', 2], 0, kFormat);

Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + Object(_utils_zero_fill__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this.minutes(), 2);
});

Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + Object(_utils_zero_fill__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this.minutes(), 2) +
        Object(_utils_zero_fill__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this.seconds(), 2);
});

Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])('Hmm', 0, 0, function () {
    return '' + this.hours() + Object(_utils_zero_fill__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this.minutes(), 2);
});

Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])('Hmmss', 0, 0, function () {
    return '' + this.hours() + Object(_utils_zero_fill__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this.minutes(), 2) +
        Object(_utils_zero_fill__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

Object(_aliases__WEBPACK_IMPORTED_MODULE_2__[/* addUnitAlias */ "a"])('hour', 'h');

// PRIORITY
Object(_priorities__WEBPACK_IMPORTED_MODULE_3__[/* addUnitPriority */ "a"])('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('a',  matchMeridiem);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('A',  matchMeridiem);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('H',  _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to2 */ "d"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('h',  _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to2 */ "d"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('k',  _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to2 */ "d"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('HH', _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to2 */ "d"], _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match2 */ "h"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('hh', _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to2 */ "d"], _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match2 */ "h"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('kk', _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to2 */ "d"], _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match2 */ "h"]);

Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('hmm', _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match3to4 */ "j"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('hmmss', _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match5to6 */ "l"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('Hmm', _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match3to4 */ "j"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('Hmmss', _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match5to6 */ "l"]);

Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])(['H', 'HH'], _constants__WEBPACK_IMPORTED_MODULE_6__[/* HOUR */ "b"]);
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])(['k', 'kk'], function (input, array, config) {
    var kInput = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input);
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* HOUR */ "b"]] = kInput === 24 ? 0 : kInput;
});
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])(['h', 'hh'], function (input, array, config) {
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* HOUR */ "b"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input);
    Object(_create_parsing_flags__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(config).bigHour = true;
});
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* HOUR */ "b"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(0, pos));
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* MINUTE */ "d"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(pos));
    Object(_create_parsing_flags__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(config).bigHour = true;
});
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* HOUR */ "b"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(0, pos1));
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* MINUTE */ "d"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(pos1, 2));
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* SECOND */ "f"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(pos2));
    Object(_create_parsing_flags__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(config).bigHour = true;
});
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* HOUR */ "b"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(0, pos));
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* MINUTE */ "d"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(pos));
});
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* HOUR */ "b"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(0, pos1));
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* MINUTE */ "d"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(pos1, 2));
    array[_constants__WEBPACK_IMPORTED_MODULE_6__[/* SECOND */ "f"]] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour they want. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = Object(_moment_get_set__WEBPACK_IMPORTED_MODULE_0__[/* makeGetSet */ "b"])('Hours', true);


/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b0dc":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("e4ae");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "b14f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPanel_vue_vue_type_style_index_0_id_caea4656_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9e2b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPanel_vue_vue_type_style_index_0_id_caea4656_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPanel_vue_vue_type_style_index_0_id_caea4656_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPanel_vue_vue_type_style_index_0_id_caea4656_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b3f6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return keys; });
/* harmony import */ var _has_own_prop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2398");


var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (Object(_has_own_prop__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}




/***/ }),

/***/ "b447":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("3a38");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "b50d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var settle = __webpack_require__("467f");
var buildURL = __webpack_require__("30b5");
var parseHeaders = __webpack_require__("c345");
var isURLSameOrigin = __webpack_require__("3934");
var createError = __webpack_require__("2d83");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__("7aac");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "b8e3":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "bc13":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "bc3a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cee4");

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c207":
/***/ (function(module, exports) {



/***/ }),

/***/ "c345":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("8436");
var step = __webpack_require__("50ed");
var Iterators = __webpack_require__("481b");
var toIObject = __webpack_require__("36c3");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("30f1")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "c3a1":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("e6f3");
var enumBugKeys = __webpack_require__("1691");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "c401":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "c532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("1d2b");
var isBuffer = __webpack_require__("c7ce");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c790":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c7ce":
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "c8af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cab0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createUTCDate; });
function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date;
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
        // preserve leap years using a full 400 year cycle, then reset
        date = new Date(y + 400, m, d, h, M, s, ms);
        if (isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
    } else {
        date = new Date(y, m, d, h, M, s, ms);
    }

    return date;
}

function createUTCDate (y) {
    var date;
    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
        var args = Array.prototype.slice.call(arguments);
        // preserve leap years using a full 400 year cycle, then reset
        args[0] = y + 400;
        date = new Date(Date.UTC.apply(null, args));
        if (isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
    } else {
        date = new Date(Date.UTC.apply(null, arguments));
    }

    return date;
}


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cbda":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvalancheProblem_vue_vue_type_style_index_0_id_57612b72_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("abcf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvalancheProblem_vue_vue_type_style_index_0_id_57612b72_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvalancheProblem_vue_vue_type_style_index_0_id_57612b72_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvalancheProblem_vue_vue_type_style_index_0_id_57612b72_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "cd06":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cd07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvalancheDanger_vue_vue_type_style_index_0_id_488d1bce_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3915");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvalancheDanger_vue_vue_type_style_index_0_id_488d1bce_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvalancheDanger_vue_vue_type_style_index_0_id_488d1bce_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvalancheDanger_vue_vue_type_style_index_0_id_488d1bce_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "cd78":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var isObject = __webpack_require__("f772");
var newPromiseCapability = __webpack_require__("656e");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "ce05":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ZoneSelector_vue_vue_type_style_index_0_id_5b48874d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3d0f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ZoneSelector_vue_vue_type_style_index_0_id_5b48874d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ZoneSelector_vue_vue_type_style_index_0_id_5b48874d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ZoneSelector_vue_vue_type_style_index_0_id_5b48874d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cee4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var bind = __webpack_require__("1d2b");
var Axios = __webpack_require__("0a06");
var mergeConfig = __webpack_require__("4a7b");
var defaults = __webpack_require__("2444");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__("7a77");
axios.CancelToken = __webpack_require__("8df4");
axios.isCancel = __webpack_require__("2e67");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__("0df6");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "cef3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArray; });
function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d4a2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addUnitPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getPrioritizedUnits; });
var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d8e7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d925":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "dbdb":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b8e3") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "dd40":
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "dff0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addParseToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addWeekParseToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addTimeToArrayFromToken; });
/* harmony import */ var _utils_has_own_prop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2398");
/* harmony import */ var _utils_is_number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4137");
/* harmony import */ var _utils_to_int__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("29f2");




var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (Object(_utils_is_number__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(callback)) {
        func = function (input, array) {
            array[callback] = Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e2cc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfoPopover_vue_vue_type_style_index_0_id_0eb95642_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6cf1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfoPopover_vue_vue_type_style_index_0_id_0eb95642_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfoPopover_vue_vue_type_style_index_0_id_0eb95642_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfoPopover_vue_vue_type_style_index_0_id_0eb95642_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e37d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export VClosePopover */
/* unused harmony export VPopover */
/* unused harmony export VTooltip */
/* unused harmony export createTooltip */
/* unused harmony export destroyTooltip */
/* unused harmony export install */
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f0bd");
/* harmony import */ var vue_resize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("252c");



function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var SVGAnimatedString = function SVGAnimatedString() {};

if (typeof window !== 'undefined') {
  SVGAnimatedString = window.SVGAnimatedString;
}

function convertToArray(value) {
  if (typeof value === 'string') {
    value = value.split(' ');
  }

  return value;
}
/**
 * Add classes to an element.
 * This method checks to ensure that the classes don't already exist before adding them.
 * It uses el.className rather than classList in order to be IE friendly.
 * @param {object} el - The element to add the classes to.
 * @param {classes} string - List of space separated classes to be added to the element.
 */

function addClasses(el, classes) {
  var newClasses = convertToArray(classes);
  var classList;

  if (el.className instanceof SVGAnimatedString) {
    classList = convertToArray(el.className.baseVal);
  } else {
    classList = convertToArray(el.className);
  }

  newClasses.forEach(function (newClass) {
    if (classList.indexOf(newClass) === -1) {
      classList.push(newClass);
    }
  });

  if (el instanceof SVGElement) {
    el.setAttribute('class', classList.join(' '));
  } else {
    el.className = classList.join(' ');
  }
}
/**
 * Remove classes from an element.
 * It uses el.className rather than classList in order to be IE friendly.
 * @export
 * @param {any} el The element to remove the classes from.
 * @param {any} classes List of space separated classes to be removed from the element.
 */

function removeClasses(el, classes) {
  var newClasses = convertToArray(classes);
  var classList;

  if (el.className instanceof SVGAnimatedString) {
    classList = convertToArray(el.className.baseVal);
  } else {
    classList = convertToArray(el.className);
  }

  newClasses.forEach(function (newClass) {
    var index = classList.indexOf(newClass);

    if (index !== -1) {
      classList.splice(index, 1);
    }
  });

  if (el instanceof SVGElement) {
    el.setAttribute('class', classList.join(' '));
  } else {
    el.className = classList.join(' ');
  }
}
var supportsPassive = false;

if (typeof window !== 'undefined') {
  supportsPassive = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}
}

var DEFAULT_OPTIONS = {
  container: false,
  delay: 0,
  html: false,
  placement: 'top',
  title: '',
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: 'hover focus',
  offset: 0
};
var openTooltips = [];

var Tooltip =
/*#__PURE__*/
function () {
  /**
   * Create a new Tooltip.js instance
   * @class Tooltip
   * @param {HTMLElement} reference - The DOM node used as reference of the tooltip (it can be a jQuery element).
   * @param {Object} options
   * @param {String} options.placement=bottom
   *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -end),
   *      left(-start, -end)`
   * @param {HTMLElement|String|false} options.container=false - Append the tooltip to a specific element.
   * @param {Number|Object} options.delay=0
   *      Delay showing and hiding the tooltip (ms) - does not apply to manual trigger type.
   *      If a number is supplied, delay is applied to both hide/show.
   *      Object structure is: `{ show: 500, hide: 100 }`
   * @param {Boolean} options.html=false - Insert HTML into the tooltip. If false, the content will inserted with `innerText`.
   * @param {String|PlacementFunction} options.placement='top' - One of the allowed placements, or a function returning one of them.
   * @param {String} [options.template='<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>']
   *      Base HTML to used when creating the tooltip.
   *      The tooltip's `title` will be injected into the `.tooltip-inner` or `.tooltip__inner`.
   *      `.tooltip-arrow` or `.tooltip__arrow` will become the tooltip's arrow.
   *      The outermost wrapper element should have the `.tooltip` class.
   * @param {String|HTMLElement|TitleFunction} options.title='' - Default title value if `title` attribute isn't present.
   * @param {String} [options.trigger='hover focus']
   *      How tooltip is triggered - click, hover, focus, manual.
   *      You may pass multiple triggers; separate them with a space. `manual` cannot be combined with any other trigger.
   * @param {HTMLElement} options.boundariesElement
   *      The element used as boundaries for the tooltip. For more information refer to Popper.js'
   *      [boundariesElement docs](https://popper.js.org/popper-documentation.html)
   * @param {Number|String} options.offset=0 - Offset of the tooltip relative to its reference. For more information refer to Popper.js'
   *      [offset docs](https://popper.js.org/popper-documentation.html)
   * @param {Object} options.popperOptions={} - Popper options, will be passed directly to popper instance. For more information refer to Popper.js'
   *      [options docs](https://popper.js.org/popper-documentation.html)
   * @return {Object} instance - The generated tooltip instance
   */
  function Tooltip(_reference, _options) {
    var _this = this;

    _classCallCheck(this, Tooltip);

    _defineProperty(this, "_events", []);

    _defineProperty(this, "_setTooltipNodeEvent", function (evt, reference, delay, options) {
      var relatedreference = evt.relatedreference || evt.toElement || evt.relatedTarget;

      var callback = function callback(evt2) {
        var relatedreference2 = evt2.relatedreference || evt2.toElement || evt2.relatedTarget; // Remove event listener after call

        _this._tooltipNode.removeEventListener(evt.type, callback); // If the new reference is not the reference element


        if (!reference.contains(relatedreference2)) {
          // Schedule to hide tooltip
          _this._scheduleHide(reference, options.delay, options, evt2);
        }
      };

      if (_this._tooltipNode.contains(relatedreference)) {
        // listen to mouseleave on the tooltip element to be able to hide the tooltip
        _this._tooltipNode.addEventListener(evt.type, callback);

        return true;
      }

      return false;
    });

    // apply user options over default ones
    _options = _objectSpread({}, DEFAULT_OPTIONS, _options);
    _reference.jquery && (_reference = _reference[0]);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this); // cache reference and options

    this.reference = _reference;
    this.options = _options; // set initial state

    this._isOpen = false;

    this._init();
  } //
  // Public methods
  //

  /**
   * Reveals an element's tooltip. This is considered a "manual" triggering of the tooltip.
   * Tooltips with zero-length titles are never displayed.
   * @method Tooltip#show
   * @memberof Tooltip
   */


  _createClass(Tooltip, [{
    key: "show",
    value: function show() {
      this._show(this.reference, this.options);
    }
    /**
     * Hides an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @method Tooltip#hide
     * @memberof Tooltip
     */

  }, {
    key: "hide",
    value: function hide() {
      this._hide();
    }
    /**
     * Hides and destroys an element’s tooltip.
     * @method Tooltip#dispose
     * @memberof Tooltip
     */

  }, {
    key: "dispose",
    value: function dispose() {
      this._dispose();
    }
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @method Tooltip#toggle
     * @memberof Tooltip
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this._isOpen) {
        return this.hide();
      } else {
        return this.show();
      }
    }
  }, {
    key: "setClasses",
    value: function setClasses(classes) {
      this._classes = classes;
    }
  }, {
    key: "setContent",
    value: function setContent(content) {
      this.options.title = content;

      if (this._tooltipNode) {
        this._setContent(content, this.options);
      }
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var classesUpdated = false;
      var classes = options && options.classes || directive.options.defaultClass;

      if (this._classes !== classes) {
        this.setClasses(classes);
        classesUpdated = true;
      }

      options = getOptions(options);
      var needPopperUpdate = false;
      var needRestart = false;

      if (this.options.offset !== options.offset || this.options.placement !== options.placement) {
        needPopperUpdate = true;
      }

      if (this.options.template !== options.template || this.options.trigger !== options.trigger || this.options.container !== options.container || classesUpdated) {
        needRestart = true;
      }

      for (var key in options) {
        this.options[key] = options[key];
      }

      if (this._tooltipNode) {
        if (needRestart) {
          var isOpen = this._isOpen;
          this.dispose();

          this._init();

          if (isOpen) {
            this.show();
          }
        } else if (needPopperUpdate) {
          this.popperInstance.update();
        }
      }
    } //
    // Private methods
    //

  }, {
    key: "_init",
    value: function _init() {
      // get events list
      var events = typeof this.options.trigger === 'string' ? this.options.trigger.split(' ') : [];
      this._isDisposed = false;
      this._enableDocumentTouch = events.indexOf('manual') === -1;
      events = events.filter(function (trigger) {
        return ['click', 'hover', 'focus'].indexOf(trigger) !== -1;
      }); // set event listeners

      this._setEventListeners(this.reference, events, this.options); // title attribute


      this.$_originalTitle = this.reference.getAttribute('title');
      this.reference.removeAttribute('title');
      this.reference.setAttribute('data-original-title', this.$_originalTitle);
    }
    /**
     * Creates a new tooltip node
     * @memberof Tooltip
     * @private
     * @param {HTMLElement} reference
     * @param {String} template
     * @param {String|HTMLElement|TitleFunction} title
     * @param {Boolean} allowHtml
     * @return {HTMLelement} tooltipNode
     */

  }, {
    key: "_create",
    value: function _create(reference, template) {
      // create tooltip element
      var tooltipGenerator = window.document.createElement('div');
      tooltipGenerator.innerHTML = template.trim();
      var tooltipNode = tooltipGenerator.childNodes[0]; // add unique ID to our tooltip (needed for accessibility reasons)

      tooltipNode.id = "tooltip_".concat(Math.random().toString(36).substr(2, 10)); // Initially hide the tooltip
      // The attribute will be switched in a next frame so
      // CSS transitions can play

      tooltipNode.setAttribute('aria-hidden', 'true');

      if (this.options.autoHide && this.options.trigger.indexOf('hover') !== -1) {
        tooltipNode.addEventListener('mouseenter', this.hide);
        tooltipNode.addEventListener('click', this.hide);
      } // return the generated tooltip node


      return tooltipNode;
    }
  }, {
    key: "_setContent",
    value: function _setContent(content, options) {
      var _this2 = this;

      this.asyncContent = false;

      this._applyContent(content, options).then(function () {
        _this2.popperInstance.update();
      });
    }
  }, {
    key: "_applyContent",
    value: function _applyContent(title, options) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var allowHtml = options.html;
        var rootNode = _this3._tooltipNode;
        if (!rootNode) return;
        var titleNode = rootNode.querySelector(_this3.options.innerSelector);

        if (title.nodeType === 1) {
          // if title is a node, append it only if allowHtml is true
          if (allowHtml) {
            while (titleNode.firstChild) {
              titleNode.removeChild(titleNode.firstChild);
            }

            titleNode.appendChild(title);
          }
        } else if (typeof title === 'function') {
          // if title is a function, call it and set innerText or innerHtml depending by `allowHtml` value
          var result = title();

          if (result && typeof result.then === 'function') {
            _this3.asyncContent = true;
            options.loadingClass && addClasses(rootNode, options.loadingClass);

            if (options.loadingContent) {
              _this3._applyContent(options.loadingContent, options);
            }

            result.then(function (asyncResult) {
              options.loadingClass && removeClasses(rootNode, options.loadingClass);
              return _this3._applyContent(asyncResult, options);
            }).then(resolve).catch(reject);
          } else {
            _this3._applyContent(result, options).then(resolve).catch(reject);
          }

          return;
        } else {
          // if it's just a simple text, set innerText or innerHtml depending by `allowHtml` value
          allowHtml ? titleNode.innerHTML = title : titleNode.innerText = title;
        }

        resolve();
      });
    }
  }, {
    key: "_show",
    value: function _show(reference, options) {
      if (options && typeof options.container === 'string') {
        var container = document.querySelector(options.container);
        if (!container) return;
      }

      clearTimeout(this._disposeTimer);
      options = Object.assign({}, options);
      delete options.offset;
      var updateClasses = true;

      if (this._tooltipNode) {
        addClasses(this._tooltipNode, this._classes);
        updateClasses = false;
      }

      var result = this._ensureShown(reference, options);

      if (updateClasses && this._tooltipNode) {
        addClasses(this._tooltipNode, this._classes);
      }

      addClasses(reference, ['v-tooltip-open']);
      return result;
    }
  }, {
    key: "_ensureShown",
    value: function _ensureShown(reference, options) {
      var _this4 = this;

      // don't show if it's already visible
      if (this._isOpen) {
        return this;
      }

      this._isOpen = true;
      openTooltips.push(this); // if the tooltipNode already exists, just show it

      if (this._tooltipNode) {
        this._tooltipNode.style.display = '';

        this._tooltipNode.setAttribute('aria-hidden', 'false');

        this.popperInstance.enableEventListeners();
        this.popperInstance.update();

        if (this.asyncContent) {
          this._setContent(options.title, options);
        }

        return this;
      } // get title


      var title = reference.getAttribute('title') || options.title; // don't show tooltip if no title is defined

      if (!title) {
        return this;
      } // create tooltip node


      var tooltipNode = this._create(reference, options.template);

      this._tooltipNode = tooltipNode; // Add `aria-describedby` to our reference element for accessibility reasons

      reference.setAttribute('aria-describedby', tooltipNode.id); // append tooltip to container

      var container = this._findContainer(options.container, reference);

      this._append(tooltipNode, container);

      var popperOptions = _objectSpread({}, options.popperOptions, {
        placement: options.placement
      });

      popperOptions.modifiers = _objectSpread({}, popperOptions.modifiers, {
        arrow: {
          element: this.options.arrowSelector
        }
      });

      if (options.boundariesElement) {
        popperOptions.modifiers.preventOverflow = {
          boundariesElement: options.boundariesElement
        };
      }

      this.popperInstance = new popper_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](reference, tooltipNode, popperOptions);

      this._setContent(title, options); // Fix position


      requestAnimationFrame(function () {
        if (!_this4._isDisposed && _this4.popperInstance) {
          _this4.popperInstance.update(); // Show the tooltip


          requestAnimationFrame(function () {
            if (!_this4._isDisposed) {
              _this4._isOpen && tooltipNode.setAttribute('aria-hidden', 'false');
            } else {
              _this4.dispose();
            }
          });
        } else {
          _this4.dispose();
        }
      });
      return this;
    }
  }, {
    key: "_noLongerOpen",
    value: function _noLongerOpen() {
      var index = openTooltips.indexOf(this);

      if (index !== -1) {
        openTooltips.splice(index, 1);
      }
    }
  }, {
    key: "_hide",
    value: function _hide()
    /* reference, options */
    {
      var _this5 = this;

      // don't hide if it's already hidden
      if (!this._isOpen) {
        return this;
      }

      this._isOpen = false;

      this._noLongerOpen(); // hide tooltipNode


      this._tooltipNode.style.display = 'none';

      this._tooltipNode.setAttribute('aria-hidden', 'true');

      this.popperInstance.disableEventListeners();
      clearTimeout(this._disposeTimer);
      var disposeTime = directive.options.disposeTimeout;

      if (disposeTime !== null) {
        this._disposeTimer = setTimeout(function () {
          if (_this5._tooltipNode) {
            _this5._tooltipNode.removeEventListener('mouseenter', _this5.hide);

            _this5._tooltipNode.removeEventListener('click', _this5.hide); // Don't remove popper instance, just the HTML element


            _this5._removeTooltipNode();
          }
        }, disposeTime);
      }

      removeClasses(this.reference, ['v-tooltip-open']);
      return this;
    }
  }, {
    key: "_removeTooltipNode",
    value: function _removeTooltipNode() {
      if (!this._tooltipNode) return;
      var parentNode = this._tooltipNode.parentNode;

      if (parentNode) {
        parentNode.removeChild(this._tooltipNode);
        this.reference.removeAttribute('aria-describedby');
      }

      this._tooltipNode = null;
    }
  }, {
    key: "_dispose",
    value: function _dispose() {
      var _this6 = this;

      this._isDisposed = true;
      this.reference.removeAttribute('data-original-title');

      if (this.$_originalTitle) {
        this.reference.setAttribute('title', this.$_originalTitle);
      } // remove event listeners first to prevent any unexpected behaviour


      this._events.forEach(function (_ref) {
        var func = _ref.func,
            event = _ref.event;

        _this6.reference.removeEventListener(event, func);
      });

      this._events = [];

      if (this._tooltipNode) {
        this._hide();

        this._tooltipNode.removeEventListener('mouseenter', this.hide);

        this._tooltipNode.removeEventListener('click', this.hide); // destroy instance


        this.popperInstance.destroy(); // destroy tooltipNode if removeOnDestroy is not set, as popperInstance.destroy() already removes the element

        if (!this.popperInstance.options.removeOnDestroy) {
          this._removeTooltipNode();
        }
      } else {
        this._noLongerOpen();
      }

      return this;
    }
  }, {
    key: "_findContainer",
    value: function _findContainer(container, reference) {
      // if container is a query, get the relative element
      if (typeof container === 'string') {
        container = window.document.querySelector(container);
      } else if (container === false) {
        // if container is `false`, set it to reference parent
        container = reference.parentNode;
      }

      return container;
    }
    /**
     * Append tooltip to container
     * @memberof Tooltip
     * @private
     * @param {HTMLElement} tooltip
     * @param {HTMLElement|String|false} container
     */

  }, {
    key: "_append",
    value: function _append(tooltipNode, container) {
      container.appendChild(tooltipNode);
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners(reference, events, options) {
      var _this7 = this;

      var directEvents = [];
      var oppositeEvents = [];
      events.forEach(function (event) {
        switch (event) {
          case 'hover':
            directEvents.push('mouseenter');
            oppositeEvents.push('mouseleave');
            if (_this7.options.hideOnTargetClick) oppositeEvents.push('click');
            break;

          case 'focus':
            directEvents.push('focus');
            oppositeEvents.push('blur');
            if (_this7.options.hideOnTargetClick) oppositeEvents.push('click');
            break;

          case 'click':
            directEvents.push('click');
            oppositeEvents.push('click');
            break;
        }
      }); // schedule show tooltip

      directEvents.forEach(function (event) {
        var func = function func(evt) {
          if (_this7._isOpen === true) {
            return;
          }

          evt.usedByTooltip = true;

          _this7._scheduleShow(reference, options.delay, options, evt);
        };

        _this7._events.push({
          event: event,
          func: func
        });

        reference.addEventListener(event, func);
      }); // schedule hide tooltip

      oppositeEvents.forEach(function (event) {
        var func = function func(evt) {
          if (evt.usedByTooltip === true) {
            return;
          }

          _this7._scheduleHide(reference, options.delay, options, evt);
        };

        _this7._events.push({
          event: event,
          func: func
        });

        reference.addEventListener(event, func);
      });
    }
  }, {
    key: "_onDocumentTouch",
    value: function _onDocumentTouch(event) {
      if (this._enableDocumentTouch) {
        this._scheduleHide(this.reference, this.options.delay, this.options, event);
      }
    }
  }, {
    key: "_scheduleShow",
    value: function _scheduleShow(reference, delay, options
    /*, evt */
    ) {
      var _this8 = this;

      // defaults to 0
      var computedDelay = delay && delay.show || delay || 0;
      clearTimeout(this._scheduleTimer);
      this._scheduleTimer = window.setTimeout(function () {
        return _this8._show(reference, options);
      }, computedDelay);
    }
  }, {
    key: "_scheduleHide",
    value: function _scheduleHide(reference, delay, options, evt) {
      var _this9 = this;

      // defaults to 0
      var computedDelay = delay && delay.hide || delay || 0;
      clearTimeout(this._scheduleTimer);
      this._scheduleTimer = window.setTimeout(function () {
        if (_this9._isOpen === false) {
          return;
        }

        if (!document.body.contains(_this9._tooltipNode)) {
          return;
        } // if we are hiding because of a mouseleave, we must check that the new
        // reference isn't the tooltip, because in this case we don't want to hide it


        if (evt.type === 'mouseleave') {
          var isSet = _this9._setTooltipNodeEvent(evt, reference, delay, options); // if we set the new event, don't hide the tooltip yet
          // the new event will take care to hide it if necessary


          if (isSet) {
            return;
          }
        }

        _this9._hide(reference, options);
      }, computedDelay);
    }
  }]);

  return Tooltip;
}(); // Hide tooltips on touch devices

if (typeof document !== 'undefined') {
  document.addEventListener('touchstart', function (event) {
    for (var i = 0; i < openTooltips.length; i++) {
      openTooltips[i]._onDocumentTouch(event);
    }
  }, supportsPassive ? {
    passive: true,
    capture: true
  } : true);
}
/**
 * Placement function, its context is the Tooltip instance.
 * @memberof Tooltip
 * @callback PlacementFunction
 * @param {HTMLElement} tooltip - tooltip DOM node.
 * @param {HTMLElement} reference - reference DOM node.
 * @return {String} placement - One of the allowed placement options.
 */

/**
 * Title function, its context is the Tooltip instance.
 * @memberof Tooltip
 * @callback TitleFunction
 * @return {String} placement - The desired title.
 */

var state = {
  enabled: true
};
var positions = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'];
var defaultOptions = {
  // Default tooltip placement relative to target element
  defaultPlacement: 'top',
  // Default CSS classes applied to the tooltip element
  defaultClass: 'vue-tooltip-theme',
  // Default CSS classes applied to the target element of the tooltip
  defaultTargetClass: 'has-tooltip',
  // Is the content HTML by default?
  defaultHtml: true,
  // Default HTML template of the tooltip element
  // It must include `tooltip-arrow` & `tooltip-inner` CSS classes (can be configured, see below)
  // Change if the classes conflict with other libraries (for example bootstrap)
  defaultTemplate: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  // Selector used to get the arrow element in the tooltip template
  defaultArrowSelector: '.tooltip-arrow, .tooltip__arrow',
  // Selector used to get the inner content element in the tooltip template
  defaultInnerSelector: '.tooltip-inner, .tooltip__inner',
  // Delay (ms)
  defaultDelay: 0,
  // Default events that trigger the tooltip
  defaultTrigger: 'hover focus',
  // Default position offset (px)
  defaultOffset: 0,
  // Default container where the tooltip will be appended
  defaultContainer: 'body',
  defaultBoundariesElement: undefined,
  defaultPopperOptions: {},
  // Class added when content is loading
  defaultLoadingClass: 'tooltip-loading',
  // Displayed when tooltip content is loading
  defaultLoadingContent: '...',
  // Hide on mouseover tooltip
  autoHide: true,
  // Close tooltip on click on tooltip target?
  defaultHideOnTargetClick: true,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 5000,
  // Options for popover
  popover: {
    defaultPlacement: 'bottom',
    // Use the `popoverClass` prop for theming
    defaultClass: 'vue-popover-theme',
    // Base class (change if conflicts with other libraries)
    defaultBaseClass: 'tooltip popover',
    // Wrapper class (contains arrow and inner)
    defaultWrapperClass: 'wrapper',
    // Inner content class
    defaultInnerClass: 'tooltip-inner popover-inner',
    // Arrow class
    defaultArrowClass: 'tooltip-arrow popover-arrow',
    // Class added when popover is open
    defaultOpenClass: 'open',
    defaultDelay: 0,
    defaultTrigger: 'click',
    defaultOffset: 0,
    defaultContainer: 'body',
    defaultBoundariesElement: undefined,
    defaultPopperOptions: {},
    // Hides if clicked outside of popover
    defaultAutoHide: true,
    // Update popper on content resize
    defaultHandleResize: true
  }
};
function getOptions(options) {
  var result = {
    placement: typeof options.placement !== 'undefined' ? options.placement : directive.options.defaultPlacement,
    delay: typeof options.delay !== 'undefined' ? options.delay : directive.options.defaultDelay,
    html: typeof options.html !== 'undefined' ? options.html : directive.options.defaultHtml,
    template: typeof options.template !== 'undefined' ? options.template : directive.options.defaultTemplate,
    arrowSelector: typeof options.arrowSelector !== 'undefined' ? options.arrowSelector : directive.options.defaultArrowSelector,
    innerSelector: typeof options.innerSelector !== 'undefined' ? options.innerSelector : directive.options.defaultInnerSelector,
    trigger: typeof options.trigger !== 'undefined' ? options.trigger : directive.options.defaultTrigger,
    offset: typeof options.offset !== 'undefined' ? options.offset : directive.options.defaultOffset,
    container: typeof options.container !== 'undefined' ? options.container : directive.options.defaultContainer,
    boundariesElement: typeof options.boundariesElement !== 'undefined' ? options.boundariesElement : directive.options.defaultBoundariesElement,
    autoHide: typeof options.autoHide !== 'undefined' ? options.autoHide : directive.options.autoHide,
    hideOnTargetClick: typeof options.hideOnTargetClick !== 'undefined' ? options.hideOnTargetClick : directive.options.defaultHideOnTargetClick,
    loadingClass: typeof options.loadingClass !== 'undefined' ? options.loadingClass : directive.options.defaultLoadingClass,
    loadingContent: typeof options.loadingContent !== 'undefined' ? options.loadingContent : directive.options.defaultLoadingContent,
    popperOptions: _objectSpread({}, typeof options.popperOptions !== 'undefined' ? options.popperOptions : directive.options.defaultPopperOptions)
  };

  if (result.offset) {
    var typeofOffset = _typeof(result.offset);

    var offset = result.offset; // One value -> switch

    if (typeofOffset === 'number' || typeofOffset === 'string' && offset.indexOf(',') === -1) {
      offset = "0, ".concat(offset);
    }

    if (!result.popperOptions.modifiers) {
      result.popperOptions.modifiers = {};
    }

    result.popperOptions.modifiers.offset = {
      offset: offset
    };
  }

  if (result.trigger && result.trigger.indexOf('click') !== -1) {
    result.hideOnTargetClick = false;
  }

  return result;
}
function getPlacement(value, modifiers) {
  var placement = value.placement;

  for (var i = 0; i < positions.length; i++) {
    var pos = positions[i];

    if (modifiers[pos]) {
      placement = pos;
    }
  }

  return placement;
}
function getContent(value) {
  var type = _typeof(value);

  if (type === 'string') {
    return value;
  } else if (value && type === 'object') {
    return value.content;
  } else {
    return false;
  }
}
function createTooltip(el, value) {
  var modifiers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var content = getContent(value);
  var classes = typeof value.classes !== 'undefined' ? value.classes : directive.options.defaultClass;

  var opts = _objectSpread({
    title: content
  }, getOptions(_objectSpread({}, value, {
    placement: getPlacement(value, modifiers)
  })));

  var tooltip = el._tooltip = new Tooltip(el, opts);
  tooltip.setClasses(classes);
  tooltip._vueEl = el; // Class on target

  var targetClasses = typeof value.targetClasses !== 'undefined' ? value.targetClasses : directive.options.defaultTargetClass;
  el._tooltipTargetClasses = targetClasses;
  addClasses(el, targetClasses);
  return tooltip;
}
function destroyTooltip(el) {
  if (el._tooltip) {
    el._tooltip.dispose();

    delete el._tooltip;
    delete el._tooltipOldShow;
  }

  if (el._tooltipTargetClasses) {
    removeClasses(el, el._tooltipTargetClasses);
    delete el._tooltipTargetClasses;
  }
}
function bind(el, _ref) {
  var value = _ref.value,
      oldValue = _ref.oldValue,
      modifiers = _ref.modifiers;
  var content = getContent(value);

  if (!content || !state.enabled) {
    destroyTooltip(el);
  } else {
    var tooltip;

    if (el._tooltip) {
      tooltip = el._tooltip; // Content

      tooltip.setContent(content); // Options

      tooltip.setOptions(_objectSpread({}, value, {
        placement: getPlacement(value, modifiers)
      }));
    } else {
      tooltip = createTooltip(el, value, modifiers);
    } // Manual show


    if (typeof value.show !== 'undefined' && value.show !== el._tooltipOldShow) {
      el._tooltipOldShow = value.show;
      value.show ? tooltip.show() : tooltip.hide();
    }
  }
}
var directive = {
  options: defaultOptions,
  bind: bind,
  update: bind,
  unbind: function unbind(el) {
    destroyTooltip(el);
  }
};

function addListeners(el) {
  el.addEventListener('click', onClick);
  el.addEventListener('touchstart', onTouchStart, supportsPassive ? {
    passive: true
  } : false);
}

function removeListeners(el) {
  el.removeEventListener('click', onClick);
  el.removeEventListener('touchstart', onTouchStart);
  el.removeEventListener('touchend', onTouchEnd);
  el.removeEventListener('touchcancel', onTouchCancel);
}

function onClick(event) {
  var el = event.currentTarget;
  event.closePopover = !el.$_vclosepopover_touch;
  event.closeAllPopover = el.$_closePopoverModifiers && !!el.$_closePopoverModifiers.all;
}

function onTouchStart(event) {
  if (event.changedTouches.length === 1) {
    var el = event.currentTarget;
    el.$_vclosepopover_touch = true;
    var touch = event.changedTouches[0];
    el.$_vclosepopover_touchPoint = touch;
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchCancel);
  }
}

function onTouchEnd(event) {
  var el = event.currentTarget;
  el.$_vclosepopover_touch = false;

  if (event.changedTouches.length === 1) {
    var touch = event.changedTouches[0];
    var firstTouch = el.$_vclosepopover_touchPoint;
    event.closePopover = Math.abs(touch.screenY - firstTouch.screenY) < 20 && Math.abs(touch.screenX - firstTouch.screenX) < 20;
    event.closeAllPopover = el.$_closePopoverModifiers && !!el.$_closePopoverModifiers.all;
  }
}

function onTouchCancel(event) {
  var el = event.currentTarget;
  el.$_vclosepopover_touch = false;
}

var vclosepopover = {
  bind: function bind(el, _ref) {
    var value = _ref.value,
        modifiers = _ref.modifiers;
    el.$_closePopoverModifiers = modifiers;

    if (typeof value === 'undefined' || value) {
      addListeners(el);
    }
  },
  update: function update(el, _ref2) {
    var value = _ref2.value,
        oldValue = _ref2.oldValue,
        modifiers = _ref2.modifiers;
    el.$_closePopoverModifiers = modifiers;

    if (value !== oldValue) {
      if (typeof value === 'undefined' || value) {
        addListeners(el);
      } else {
        removeListeners(el);
      }
    }
  },
  unbind: function unbind(el) {
    removeListeners(el);
  }
};

function getDefault(key) {
  var value = directive.options.popover[key];

  if (typeof value === 'undefined') {
    return directive.options[key];
  }

  return value;
}

var isIOS = false;

if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

var openPopovers = [];

var Element = function Element() {};

if (typeof window !== 'undefined') {
  Element = window.Element;
}

var script = {
  name: 'VPopover',
  components: {
    ResizeObserver: vue_resize__WEBPACK_IMPORTED_MODULE_1__[/* ResizeObserver */ "a"]
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: function _default() {
        return getDefault('defaultPlacement');
      }
    },
    delay: {
      type: [String, Number, Object],
      default: function _default() {
        return getDefault('defaultDelay');
      }
    },
    offset: {
      type: [String, Number],
      default: function _default() {
        return getDefault('defaultOffset');
      }
    },
    trigger: {
      type: String,
      default: function _default() {
        return getDefault('defaultTrigger');
      }
    },
    container: {
      type: [String, Object, Element, Boolean],
      default: function _default() {
        return getDefault('defaultContainer');
      }
    },
    boundariesElement: {
      type: [String, Element],
      default: function _default() {
        return getDefault('defaultBoundariesElement');
      }
    },
    popperOptions: {
      type: Object,
      default: function _default() {
        return getDefault('defaultPopperOptions');
      }
    },
    popoverClass: {
      type: [String, Array],
      default: function _default() {
        return getDefault('defaultClass');
      }
    },
    popoverBaseClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultBaseClass;
      }
    },
    popoverInnerClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultInnerClass;
      }
    },
    popoverWrapperClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultWrapperClass;
      }
    },
    popoverArrowClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultArrowClass;
      }
    },
    autoHide: {
      type: Boolean,
      default: function _default() {
        return directive.options.popover.defaultAutoHide;
      }
    },
    handleResize: {
      type: Boolean,
      default: function _default() {
        return directive.options.popover.defaultHandleResize;
      }
    },
    openGroup: {
      type: String,
      default: null
    },
    openClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultOpenClass;
      }
    }
  },
  data: function data() {
    return {
      isOpen: false,
      id: Math.random().toString(36).substr(2, 10)
    };
  },
  computed: {
    cssClass: function cssClass() {
      return _defineProperty({}, this.openClass, this.isOpen);
    },
    popoverId: function popoverId() {
      return "popover_".concat(this.id);
    }
  },
  watch: {
    open: function open(val) {
      if (val) {
        this.show();
      } else {
        this.hide();
      }
    },
    disabled: function disabled(val, oldVal) {
      if (val !== oldVal) {
        if (val) {
          this.hide();
        } else if (this.open) {
          this.show();
        }
      }
    },
    container: function container(val) {
      if (this.isOpen && this.popperInstance) {
        var popoverNode = this.$refs.popover;
        var reference = this.$refs.trigger;
        var container = this.$_findContainer(this.container, reference);

        if (!container) {
          console.warn('No container for popover', this);
          return;
        }

        container.appendChild(popoverNode);
        this.popperInstance.scheduleUpdate();
      }
    },
    trigger: function trigger(val) {
      this.$_removeEventListeners();
      this.$_addEventListeners();
    },
    placement: function placement(val) {
      var _this = this;

      this.$_updatePopper(function () {
        _this.popperInstance.options.placement = val;
      });
    },
    offset: '$_restartPopper',
    boundariesElement: '$_restartPopper',
    popperOptions: {
      handler: '$_restartPopper',
      deep: true
    }
  },
  created: function created() {
    this.$_isDisposed = false;
    this.$_mounted = false;
    this.$_events = [];
    this.$_preventOpen = false;
  },
  mounted: function mounted() {
    var popoverNode = this.$refs.popover;
    popoverNode.parentNode && popoverNode.parentNode.removeChild(popoverNode);
    this.$_init();

    if (this.open) {
      this.show();
    }
  },
  deactivated: function deactivated() {
    this.hide();
  },
  beforeDestroy: function beforeDestroy() {
    this.dispose();
  },
  methods: {
    show: function show() {
      var _this2 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          event = _ref2.event,
          _ref2$skipDelay = _ref2.skipDelay,
          _ref2$force = _ref2.force,
          force = _ref2$force === void 0 ? false : _ref2$force;

      if (force || !this.disabled) {
        this.$_scheduleShow(event);
        this.$emit('show');
      }

      this.$emit('update:open', true);
      this.$_beingShowed = true;
      requestAnimationFrame(function () {
        _this2.$_beingShowed = false;
      });
    },
    hide: function hide() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          event = _ref3.event,
          _ref3$skipDelay = _ref3.skipDelay;

      this.$_scheduleHide(event);
      this.$emit('hide');
      this.$emit('update:open', false);
    },
    dispose: function dispose() {
      this.$_isDisposed = true;
      this.$_removeEventListeners();
      this.hide({
        skipDelay: true
      });

      if (this.popperInstance) {
        this.popperInstance.destroy(); // destroy tooltipNode if removeOnDestroy is not set, as popperInstance.destroy() already removes the element

        if (!this.popperInstance.options.removeOnDestroy) {
          var popoverNode = this.$refs.popover;
          popoverNode.parentNode && popoverNode.parentNode.removeChild(popoverNode);
        }
      }

      this.$_mounted = false;
      this.popperInstance = null;
      this.isOpen = false;
      this.$emit('dispose');
    },
    $_init: function $_init() {
      if (this.trigger.indexOf('manual') === -1) {
        this.$_addEventListeners();
      }
    },
    $_show: function $_show() {
      var _this3 = this;

      var reference = this.$refs.trigger;
      var popoverNode = this.$refs.popover;
      clearTimeout(this.$_disposeTimer); // Already open

      if (this.isOpen) {
        return;
      } // Popper is already initialized


      if (this.popperInstance) {
        this.isOpen = true;
        this.popperInstance.enableEventListeners();
        this.popperInstance.scheduleUpdate();
      }

      if (!this.$_mounted) {
        var container = this.$_findContainer(this.container, reference);

        if (!container) {
          console.warn('No container for popover', this);
          return;
        }

        container.appendChild(popoverNode);
        this.$_mounted = true;
      }

      if (!this.popperInstance) {
        var popperOptions = _objectSpread({}, this.popperOptions, {
          placement: this.placement
        });

        popperOptions.modifiers = _objectSpread({}, popperOptions.modifiers, {
          arrow: _objectSpread({}, popperOptions.modifiers && popperOptions.modifiers.arrow, {
            element: this.$refs.arrow
          })
        });

        if (this.offset) {
          var offset = this.$_getOffset();
          popperOptions.modifiers.offset = _objectSpread({}, popperOptions.modifiers && popperOptions.modifiers.offset, {
            offset: offset
          });
        }

        if (this.boundariesElement) {
          popperOptions.modifiers.preventOverflow = _objectSpread({}, popperOptions.modifiers && popperOptions.modifiers.preventOverflow, {
            boundariesElement: this.boundariesElement
          });
        }

        this.popperInstance = new popper_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](reference, popoverNode, popperOptions); // Fix position

        requestAnimationFrame(function () {
          if (_this3.hidden) {
            _this3.hidden = false;

            _this3.$_hide();

            return;
          }

          if (!_this3.$_isDisposed && _this3.popperInstance) {
            _this3.popperInstance.scheduleUpdate(); // Show the tooltip


            requestAnimationFrame(function () {
              if (_this3.hidden) {
                _this3.hidden = false;

                _this3.$_hide();

                return;
              }

              if (!_this3.$_isDisposed) {
                _this3.isOpen = true;
              } else {
                _this3.dispose();
              }
            });
          } else {
            _this3.dispose();
          }
        });
      }

      var openGroup = this.openGroup;

      if (openGroup) {
        var popover;

        for (var i = 0; i < openPopovers.length; i++) {
          popover = openPopovers[i];

          if (popover.openGroup !== openGroup) {
            popover.hide();
            popover.$emit('close-group');
          }
        }
      }

      openPopovers.push(this);
      this.$emit('apply-show');
    },
    $_hide: function $_hide() {
      var _this4 = this;

      // Already hidden
      if (!this.isOpen) {
        return;
      }

      var index = openPopovers.indexOf(this);

      if (index !== -1) {
        openPopovers.splice(index, 1);
      }

      this.isOpen = false;

      if (this.popperInstance) {
        this.popperInstance.disableEventListeners();
      }

      clearTimeout(this.$_disposeTimer);
      var disposeTime = directive.options.popover.disposeTimeout || directive.options.disposeTimeout;

      if (disposeTime !== null) {
        this.$_disposeTimer = setTimeout(function () {
          var popoverNode = _this4.$refs.popover;

          if (popoverNode) {
            // Don't remove popper instance, just the HTML element
            popoverNode.parentNode && popoverNode.parentNode.removeChild(popoverNode);
            _this4.$_mounted = false;
          }
        }, disposeTime);
      }

      this.$emit('apply-hide');
    },
    $_findContainer: function $_findContainer(container, reference) {
      // if container is a query, get the relative element
      if (typeof container === 'string') {
        container = window.document.querySelector(container);
      } else if (container === false) {
        // if container is `false`, set it to reference parent
        container = reference.parentNode;
      }

      return container;
    },
    $_getOffset: function $_getOffset() {
      var typeofOffset = _typeof(this.offset);

      var offset = this.offset; // One value -> switch

      if (typeofOffset === 'number' || typeofOffset === 'string' && offset.indexOf(',') === -1) {
        offset = "0, ".concat(offset);
      }

      return offset;
    },
    $_addEventListeners: function $_addEventListeners() {
      var _this5 = this;

      var reference = this.$refs.trigger;
      var directEvents = [];
      var oppositeEvents = [];
      var events = typeof this.trigger === 'string' ? this.trigger.split(' ').filter(function (trigger) {
        return ['click', 'hover', 'focus'].indexOf(trigger) !== -1;
      }) : [];
      events.forEach(function (event) {
        switch (event) {
          case 'hover':
            directEvents.push('mouseenter');
            oppositeEvents.push('mouseleave');
            break;

          case 'focus':
            directEvents.push('focus');
            oppositeEvents.push('blur');
            break;

          case 'click':
            directEvents.push('click');
            oppositeEvents.push('click');
            break;
        }
      }); // schedule show tooltip

      directEvents.forEach(function (event) {
        var func = function func(event) {
          if (_this5.isOpen) {
            return;
          }

          event.usedByTooltip = true;
          !_this5.$_preventOpen && _this5.show({
            event: event
          });
          _this5.hidden = false;
        };

        _this5.$_events.push({
          event: event,
          func: func
        });

        reference.addEventListener(event, func);
      }); // schedule hide tooltip

      oppositeEvents.forEach(function (event) {
        var func = function func(event) {
          if (event.usedByTooltip) {
            return;
          }

          _this5.hide({
            event: event
          });

          _this5.hidden = true;
        };

        _this5.$_events.push({
          event: event,
          func: func
        });

        reference.addEventListener(event, func);
      });
    },
    $_scheduleShow: function $_scheduleShow() {
      var skipDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      clearTimeout(this.$_scheduleTimer);

      if (skipDelay) {
        this.$_show();
      } else {
        // defaults to 0
        var computedDelay = parseInt(this.delay && this.delay.show || this.delay || 0);
        this.$_scheduleTimer = setTimeout(this.$_show.bind(this), computedDelay);
      }
    },
    $_scheduleHide: function $_scheduleHide() {
      var _this6 = this;

      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var skipDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      clearTimeout(this.$_scheduleTimer);

      if (skipDelay) {
        this.$_hide();
      } else {
        // defaults to 0
        var computedDelay = parseInt(this.delay && this.delay.hide || this.delay || 0);
        this.$_scheduleTimer = setTimeout(function () {
          if (!_this6.isOpen) {
            return;
          } // if we are hiding because of a mouseleave, we must check that the new
          // reference isn't the tooltip, because in this case we don't want to hide it


          if (event && event.type === 'mouseleave') {
            var isSet = _this6.$_setTooltipNodeEvent(event); // if we set the new event, don't hide the tooltip yet
            // the new event will take care to hide it if necessary


            if (isSet) {
              return;
            }
          }

          _this6.$_hide();
        }, computedDelay);
      }
    },
    $_setTooltipNodeEvent: function $_setTooltipNodeEvent(event) {
      var _this7 = this;

      var reference = this.$refs.trigger;
      var popoverNode = this.$refs.popover;
      var relatedreference = event.relatedreference || event.toElement || event.relatedTarget;

      var callback = function callback(event2) {
        var relatedreference2 = event2.relatedreference || event2.toElement || event2.relatedTarget; // Remove event listener after call

        popoverNode.removeEventListener(event.type, callback); // If the new reference is not the reference element

        if (!reference.contains(relatedreference2)) {
          // Schedule to hide tooltip
          _this7.hide({
            event: event2
          });
        }
      };

      if (popoverNode.contains(relatedreference)) {
        // listen to mouseleave on the tooltip element to be able to hide the tooltip
        popoverNode.addEventListener(event.type, callback);
        return true;
      }

      return false;
    },
    $_removeEventListeners: function $_removeEventListeners() {
      var reference = this.$refs.trigger;
      this.$_events.forEach(function (_ref4) {
        var func = _ref4.func,
            event = _ref4.event;
        reference.removeEventListener(event, func);
      });
      this.$_events = [];
    },
    $_updatePopper: function $_updatePopper(cb) {
      if (this.popperInstance) {
        cb();
        if (this.isOpen) this.popperInstance.scheduleUpdate();
      }
    },
    $_restartPopper: function $_restartPopper() {
      if (this.popperInstance) {
        var isOpen = this.isOpen;
        this.dispose();
        this.$_isDisposed = false;
        this.$_init();

        if (isOpen) {
          this.show({
            skipDelay: true,
            force: true
          });
        }
      }
    },
    $_handleGlobalClose: function $_handleGlobalClose(event) {
      var _this8 = this;

      var touch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.$_beingShowed) return;
      this.hide({
        event: event
      });

      if (event.closePopover) {
        this.$emit('close-directive');
      } else {
        this.$emit('auto-hide');
      }

      if (touch) {
        this.$_preventOpen = true;
        setTimeout(function () {
          _this8.$_preventOpen = false;
        }, 300);
      }
    },
    $_handleResize: function $_handleResize() {
      if (this.isOpen && this.popperInstance) {
        this.popperInstance.scheduleUpdate();
        this.$emit('resize');
      }
    }
  }
};

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  if (isIOS) {
    document.addEventListener('touchend', handleGlobalTouchend, supportsPassive ? {
      passive: true,
      capture: true
    } : true);
  } else {
    window.addEventListener('click', handleGlobalClick, true);
  }
}

function handleGlobalClick(event) {
  handleGlobalClose(event);
}

function handleGlobalTouchend(event) {
  handleGlobalClose(event, true);
}

function handleGlobalClose(event) {
  var touch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _loop = function _loop(i) {
    var popover = openPopovers[i];

    if (popover.$refs.popover) {
      var contains = popover.$refs.popover.contains(event.target);
      requestAnimationFrame(function () {
        if (event.closeAllPopover || event.closePopover && contains || popover.autoHide && !contains) {
          popover.$_handleGlobalClose(event, touch);
        }
      });
    }
  };

  // Delay so that close directive has time to set values
  for (var i = 0; i < openPopovers.length; i++) {
    _loop(i);
  }
}

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "v-popover",
    class: _vm.cssClass
  }, [_c("div", {
    ref: "trigger",
    staticClass: "trigger",
    staticStyle: {
      display: "inline-block"
    },
    attrs: {
      "aria-describedby": _vm.popoverId,
      tabindex: _vm.trigger.indexOf("focus") !== -1 ? 0 : undefined
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c("div", {
    ref: "popover",
    class: [_vm.popoverBaseClass, _vm.popoverClass, _vm.cssClass],
    style: {
      visibility: _vm.isOpen ? "visible" : "hidden"
    },
    attrs: {
      id: _vm.popoverId,
      "aria-hidden": _vm.isOpen ? "false" : "true",
      tabindex: _vm.autoHide ? 0 : undefined
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
          return null;
        }

        _vm.autoHide && _vm.hide();
      }
    }
  }, [_c("div", {
    class: _vm.popoverWrapperClass
  }, [_c("div", {
    ref: "inner",
    class: _vm.popoverInnerClass,
    staticStyle: {
      position: "relative"
    }
  }, [_c("div", [_vm._t("popover")], 2), _vm._v(" "), _vm.handleResize ? _c("ResizeObserver", {
    on: {
      notify: _vm.$_handleResize
    }
  }) : _vm._e()], 1), _vm._v(" "), _c("div", {
    ref: "arrow",
    class: _vm.popoverArrowClass
  })])])]);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var Popover = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

var defineProperty = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty$1 = defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty$1) {
    _defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq_1(object[key], value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignMergeValue = assignMergeValue;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = _createBaseFor();

var _baseFor = baseFor;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject_1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/** Built-in value references. */
var getPrototype = _overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !_isPrototype(object))
    ? _baseCreate(_getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike_1(value) && isArrayLike_1(value);
}

var isArrayLikeObject_1 = isArrayLikeObject;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto$2 = Function.prototype,
    objectProto$7 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString$2.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = _getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$5.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString$2.call(Ctor) == objectCtorString;
}

var isPlainObject_1 = isPlainObject;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag$1 = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/**
 * Gets the value at `key`, unless `key` is "__proto__".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key == '__proto__') {
    return;
  }

  return object[key];
}

var _safeGet = safeGet;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$6.call(object, key) && eq_1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$7.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return _copyObject(value, keysIn_1(value));
}

var toPlainObject_1 = toPlainObject;

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = _safeGet(object, key),
      srcValue = _safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    _assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray_1(srcValue),
        isBuff = !isArr && isBuffer_1(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray_1(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject_1(objValue)) {
        newValue = _copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = _cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = _cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
      newValue = objValue;
      if (isArguments_1(objValue)) {
        newValue = toPlainObject_1(objValue);
      }
      else if (!isObject_1(objValue) || isFunction_1(objValue)) {
        newValue = _initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  _assignMergeValue(object, key, newValue);
}

var _baseMergeDeep = baseMergeDeep;

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  _baseFor(source, function(srcValue, key) {
    if (isObject_1(srcValue)) {
      stack || (stack = new _Stack);
      _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      _assignMergeValue(object, key, newValue);
    }
  }, keysIn_1);
}

var _baseMerge = baseMerge;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !_defineProperty$1 ? identity_1 : function(func, string) {
  return _defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = _shortOut(_baseSetToString);

var _setToString = setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}

var _baseRest = baseRest;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike_1(object) && _isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq_1(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return _baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var _createAssigner = createAssigner;

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = _createAssigner(function(object, source, srcIndex) {
  _baseMerge(object, source, srcIndex);
});

var merge_1 = merge;

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}";
styleInject(css);

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (install.installed) return;
  install.installed = true;
  var finalOptions = {};
  merge_1(finalOptions, defaultOptions, options);
  plugin.options = finalOptions;
  directive.options = finalOptions;
  Vue.directive('tooltip', directive);
  Vue.directive('close-popover', vclosepopover);
  Vue.component('v-popover', Popover);
}
var VTooltip = directive;
var VClosePopover = vclosepopover;
var VPopover = Popover;
var plugin = {
  install: install,

  get enabled() {
    return state.enabled;
  },

  set enabled(value) {
    state.enabled = value;
  }

}; // Auto-install

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

/* harmony default export */ __webpack_exports__["a"] = (plugin);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "e683":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "e6f3":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("07e3");
var toIObject = __webpack_require__("36c3");
var arrayIndexOf = __webpack_require__("5b4e")(false);
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "e755":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createLocal; });
/* harmony import */ var _from_anything__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5139");


function createLocal (input, format, locale, strict) {
    return Object(_from_anything__WEBPACK_IMPORTED_MODULE_0__[/* createLocalOrUTC */ "a"])(input, format, locale, strict, false);
}


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "e8cb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "eb6a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return baseConfig; });
/* harmony import */ var _calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("384c");
/* harmony import */ var _formats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("243d");
/* harmony import */ var _invalid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("9b15");
/* harmony import */ var _ordinal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("5e73");
/* harmony import */ var _relative__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("8f73");
/* harmony import */ var _units_month__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("9279");
/* harmony import */ var _units_week__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("5fdb");
/* harmony import */ var _units_day_of_week__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4474");
/* harmony import */ var _units_hour__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("aeaa");






// months


// week


// weekdays


// meridiem


var baseConfig = {
    calendar: _calendar__WEBPACK_IMPORTED_MODULE_0__[/* defaultCalendar */ "b"],
    longDateFormat: _formats__WEBPACK_IMPORTED_MODULE_1__[/* defaultLongDateFormat */ "a"],
    invalidDate: _invalid__WEBPACK_IMPORTED_MODULE_2__[/* defaultInvalidDate */ "a"],
    ordinal: _ordinal__WEBPACK_IMPORTED_MODULE_3__[/* defaultOrdinal */ "b"],
    dayOfMonthOrdinalParse: _ordinal__WEBPACK_IMPORTED_MODULE_3__[/* defaultDayOfMonthOrdinalParse */ "a"],
    relativeTime: _relative__WEBPACK_IMPORTED_MODULE_4__[/* defaultRelativeTime */ "a"],

    months: _units_month__WEBPACK_IMPORTED_MODULE_5__[/* defaultLocaleMonths */ "b"],
    monthsShort: _units_month__WEBPACK_IMPORTED_MODULE_5__[/* defaultLocaleMonthsShort */ "c"],

    week: _units_week__WEBPACK_IMPORTED_MODULE_6__[/* defaultLocaleWeek */ "a"],

    weekdays: _units_day_of_week__WEBPACK_IMPORTED_MODULE_7__[/* defaultLocaleWeekdays */ "a"],
    weekdaysMin: _units_day_of_week__WEBPACK_IMPORTED_MODULE_7__[/* defaultLocaleWeekdaysMin */ "b"],
    weekdaysShort: _units_day_of_week__WEBPACK_IMPORTED_MODULE_7__[/* defaultLocaleWeekdaysShort */ "c"],

    meridiemParse: _units_hour__WEBPACK_IMPORTED_MODULE_8__[/* defaultLocaleMeridiemParse */ "a"]
};


/***/ }),

/***/ "ec30":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return daysInYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isLeapYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getSetYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getIsLeapYear; });
/* harmony import */ var _moment_get_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("42e2");
/* harmony import */ var _format_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3625");
/* harmony import */ var _aliases__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("f987");
/* harmony import */ var _priorities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d4a2");
/* harmony import */ var _parse_regex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("f66e");
/* harmony import */ var _parse_token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("dff0");
/* harmony import */ var _utils_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("886e");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("0f49");
/* harmony import */ var _utils_to_int__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("29f2");










// FORMATTING

Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])(0, ['YYYY',   4],       0, 'year');
Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])(0, ['YYYYY',  5],       0, 'year');
Object(_format_format__WEBPACK_IMPORTED_MODULE_1__[/* addFormatToken */ "a"])(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

Object(_aliases__WEBPACK_IMPORTED_MODULE_2__[/* addUnitAlias */ "a"])('year', 'y');

// PRIORITIES

Object(_priorities__WEBPACK_IMPORTED_MODULE_3__[/* addUnitPriority */ "a"])('year', 1);

// PARSING

Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('Y',      _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* matchSigned */ "p"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('YY',     _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to2 */ "d"], _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match2 */ "h"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('YYYY',   _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to4 */ "f"], _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match4 */ "k"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('YYYYY',  _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to6 */ "g"], _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match6 */ "m"]);
Object(_parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* addRegexToken */ "a"])('YYYYYY', _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match1to6 */ "g"], _parse_regex__WEBPACK_IMPORTED_MODULE_4__[/* match6 */ "m"]);

Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])(['YYYYY', 'YYYYYY'], _constants__WEBPACK_IMPORTED_MODULE_7__[/* YEAR */ "i"]);
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])('YYYY', function (input, array) {
    array[_constants__WEBPACK_IMPORTED_MODULE_7__[/* YEAR */ "i"]] = input.length === 2 ? _utils_hooks__WEBPACK_IMPORTED_MODULE_6__[/* hooks */ "a"].parseTwoDigitYear(input) : Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(input);
});
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])('YY', function (input, array) {
    array[_constants__WEBPACK_IMPORTED_MODULE_7__[/* YEAR */ "i"]] = _utils_hooks__WEBPACK_IMPORTED_MODULE_6__[/* hooks */ "a"].parseTwoDigitYear(input);
});
Object(_parse_token__WEBPACK_IMPORTED_MODULE_5__[/* addParseToken */ "a"])('Y', function (input, array) {
    array[_constants__WEBPACK_IMPORTED_MODULE_7__[/* YEAR */ "i"]] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

_utils_hooks__WEBPACK_IMPORTED_MODULE_6__[/* hooks */ "a"].parseTwoDigitYear = function (input) {
    return Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(input) + (Object(_utils_to_int__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = Object(_moment_get_set__WEBPACK_IMPORTED_MODULE_0__[/* makeGetSet */ "b"])('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}


/***/ }),

/***/ "f0bd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.15.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["a"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "f200":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getSetGlobalLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defineLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return updateLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return listLocales; });
/* harmony import */ var _utils_is_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cef3");
/* harmony import */ var _utils_has_own_prop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2398");
/* harmony import */ var _utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("93fc");
/* harmony import */ var _utils_compare_arrays__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("6144");
/* harmony import */ var _utils_deprecate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("10e2");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("5346");
/* harmony import */ var _constructor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("6900");
/* harmony import */ var _utils_keys__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("b3f6");
/* harmony import */ var _base_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("eb6a");
var require;










// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && Object(_utils_compare_arrays__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return globalLocale;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            !(function webpackMissingModule() { var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (Object(_utils_is_undefined__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
        else {
            if ((typeof console !==  'undefined') && console.warn) {
                //warn user if arguments are passed but the locale could not be set
                console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
            }
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var locale, parentConfig = _base_config__WEBPACK_IMPORTED_MODULE_8__[/* baseConfig */ "a"];
        config.abbr = name;
        if (locales[name] != null) {
            Object(_utils_deprecate__WEBPACK_IMPORTED_MODULE_4__[/* deprecateSimple */ "b"])('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                locale = loadLocale(config.parentLocale);
                if (locale != null) {
                    parentConfig = locale._config;
                } else {
                    if (!localeFamilies[config.parentLocale]) {
                        localeFamilies[config.parentLocale] = [];
                    }
                    localeFamilies[config.parentLocale].push({
                        name: name,
                        config: config
                    });
                    return null;
                }
            }
        }
        locales[name] = new _constructor__WEBPACK_IMPORTED_MODULE_6__[/* Locale */ "a"](Object(_set__WEBPACK_IMPORTED_MODULE_5__[/* mergeConfigs */ "a"])(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, tmpLocale, parentConfig = _base_config__WEBPACK_IMPORTED_MODULE_8__[/* baseConfig */ "a"];
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        config = Object(_set__WEBPACK_IMPORTED_MODULE_5__[/* mergeConfigs */ "a"])(parentConfig, config);
        locale = new _constructor__WEBPACK_IMPORTED_MODULE_6__[/* Locale */ "a"](config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!Object(_utils_is_array__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return Object(_utils_keys__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(locales);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("dd40")(module)))

/***/ }),

/***/ "f201":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("e4ae");
var aFunction = __webpack_require__("79aa");
var SPECIES = __webpack_require__("5168")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f231":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f28c":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "f536":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WeatherTable_vue_vue_type_style_index_0_id_5ee41f76_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2070");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WeatherTable_vue_vue_type_style_index_0_id_5ee41f76_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WeatherTable_vue_vue_type_style_index_0_id_5ee41f76_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WeatherTable_vue_vue_type_style_index_0_id_5ee41f76_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f66e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return match1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return match2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return match3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return match4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return match6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return match1to2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return match3to4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return match5to6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return match1to3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return match1to4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return match1to6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return matchUnsigned; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return matchSigned; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return matchOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return matchShortOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return matchTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return matchWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addRegexToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getParseRegexForToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return regexEscape; });
/* harmony import */ var _utils_has_own_prop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2398");
/* harmony import */ var _utils_is_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6937");
var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;





var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = Object(_utils_is_function__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}


/***/ }),

/***/ "f6b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "f6d4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "f987":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addUnitAlias; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return normalizeUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return normalizeObjectUnits; });
/* harmony import */ var _utils_has_own_prop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2398");


var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (Object(_utils_has_own_prop__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}



/***/ }),

/***/ "fa1e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isObject; });
function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ForecastPlugin.vue?vue&type=template&id=6338e63e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-container"},[(_vm.product == 'forecast' || _vm.product == 'summary')?_c('forecast-product',{attrs:{"preview":_vm.preview,"data":_vm.forecastData,"config":_vm.config,"zone":_vm.zone}}):_vm._e(),(_vm.product == 'weather')?_c('weather-product',{attrs:{"preview":_vm.preview,"data":_vm.forecastData,"config":_vm.config}}):_vm._e(),(_vm.product == 'synopsis')?_c('synopsis-product',{attrs:{"preview":_vm.preview,"data":_vm.forecastData,"config":_vm.config}}):_vm._e(),_c('video-modal',{attrs:{"show":_vm.videoModal,"caption":_vm.videoCaption,"id":_vm.videoId},on:{"close":function($event){_vm.videoModal = false}}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ForecastPlugin.vue?vue&type=template&id=6338e63e&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ForecastProduct.vue?vue&type=template&id=4538c332&scoped=true&
var ForecastProductvue_type_template_id_4538c332_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"afp-row afp-mb-3"},[(!_vm.preview && _vm.centerMeta.zones.length > 1)?_c('div',{staticClass:"afp-col-md-4 afp-col-lg-3 afp-order-md-2 text-md-right"},[_c('zone-selector')],1):_vm._e(),_c('div',{staticClass:"afp-forecast-title afp-col-md-8 afp-col-lg-9"},[(_vm.data.product_type == 'forecast')?_c('h1',{staticClass:"afp-html-h1"},[_vm._v("Backcountry Avalanche Forecast")]):_c('h1',{staticClass:"afp-html-h1"},[_vm._v("General Avalanche Information")]),_c('h2',{staticClass:"afp-html-h2 afp-gray-700 afp-zone-title"},[_c('i',{staticClass:"mdi mdi-map-marker"}),_vm._v("\n                "+_vm._s(_vm.zone)+"\n            ")])])]),(!_vm.preview && _vm.data.warning_product)?_c('avy-warning',{attrs:{"data":_vm.data.warning_product}}):_vm._e(),_c('product-header',{attrs:{"preview":_vm.preview,"published":_vm.data.published_time,"expires":_vm.data.expires_time,"author":_vm.data.author}}),(_vm.data.bottom_line != '')?_c('bottom-line',{attrs:{"bottomLine":_vm.data.bottom_line,"highestDanger":_vm.highestDanger}}):_vm._e(),(!_vm.preview && _vm.data.product_type == 'forecast')?_c('tabs',{ref:"tabs",attrs:{"tabs":_vm.tabsForecast,"custom":_vm.$config.tabs,"blog":_vm.$centerMeta.config.blog,"selected":_vm.tabSelected},on:{"changeTab":_vm.changeTab}}):_vm._e(),(!_vm.preview && _vm.data.product_type == 'summary')?_c('tabs',{ref:"tabs",attrs:{"tabs":_vm.tabsSummary,"custom":_vm.$config.tabs,"blog":_vm.$centerMeta.config.blog,"selected":_vm.tabSelected},on:{"changeTab":_vm.changeTab}}):_vm._e(),(_vm.preview && _vm.data.product_type == 'forecast')?_c('tabs',{ref:"tabs",attrs:{"tabs":_vm.tabsForecastPreview,"selected":_vm.tabSelected},on:{"changeTab":_vm.changeTab}}):_vm._e(),(_vm.preview && _vm.data.product_type == 'summary')?_c('tabs',{ref:"tabs",attrs:{"tabs":_vm.tabsSummaryPreview,"selected":_vm.tabSelected},on:{"changeTab":_vm.changeTab}}):_vm._e(),_c('content-panel',[(_vm.data.product_type == 'forecast')?_c('photoswipe',{key:"forecast"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.tabSelected == 'forecast'),expression:"tabSelected == 'forecast'"}],staticClass:"afp-tabPane"},[_c('avalanche-danger',{attrs:{"danger":_vm.data.danger,"date":_vm.data.published_time,"config":_vm.config}}),_vm._l((_vm.data.forecast_avalanche_problems),function(problem){return _c('avalanche-problem',{key:problem.rank,attrs:{"problem":problem,"config":_vm.config}})}),(_vm.data.hazard_discussion != '')?_c('div',{staticClass:"afp-divider afp-mb-4"},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("Forecast Discussion")]),_c('div',{staticClass:"afp-tinymce",domProps:{"innerHTML":_vm._s(_vm.data.hazard_discussion)}})]):_vm._e(),(_vm.data.media.length > 0)?_c('media-gallery',{key:"forecast",staticClass:"afp-divider afp-print-hide",attrs:{"media":_vm.data.media}}):_vm._e(),(!_vm.preview && _vm.data.weather_table && _vm.data.product_type == 'forecast')?_c('div',{staticClass:"afp-divider afp-print-hide afp-mb-4"},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("Weather Summary")]),_c('weather-table',{attrs:{"periods":_vm.data.weather_table.periods,"data":_vm.data.weather_table.data,"zone":_vm.data.weather_table.zone_name}}),_c('div',{staticClass:"afp-text-center"},[_c('button',{staticClass:"afp-html-button afp-btn afp-btn-primary",on:{"click":function($event){return _vm.scrollToTabs('weather')}}},[_vm._v("Full Weather Forecast")])])],1):_vm._e(),_c('div',{staticClass:"afp-divider afp-print-show"},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("Weather Forecast")]),(_vm.data.weather_product)?_c('weather-content',{attrs:{"data":_vm.data.weather_product}}):_vm._e()],1)],2)]):_vm._e(),(_vm.data.product_type == 'summary')?_c('photoswipe',{key:"summary"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.tabSelected == 'forecast'),expression:"tabSelected == 'forecast'"}],staticClass:"afp-tabPane"},[(_vm.data.hazard_discussion != 'null' && _vm.data.hazard_discussion != '')?_c('div',{staticClass:"afp-mb-3"},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("Forecast Discussion")]),_c('div',{staticClass:"afp-tinymce",domProps:{"innerHTML":_vm._s(_vm.data.hazard_discussion)}})]):_vm._e(),(_vm.data.media.length > 0)?_c('media-gallery',{staticClass:"afp-divider afp-print-hide",attrs:{"media":_vm.data.media}}):_vm._e(),_c('div',{staticClass:"afp-divider afp-print-show"},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("Weather Forecast")]),(_vm.data.weather_product)?_c('weather-content',{attrs:{"data":_vm.data.weather_product}}):_vm._e()],1)],1)]):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.tabSelected == 'weather' && (_vm.data.product_type == 'forecast' || _vm.data.product_type == 'summary')),expression:"tabSelected == 'weather' && (data.product_type == 'forecast' || data.product_type == 'summary')"}],staticClass:"afp-tabPane"},[(_vm.data.weather_product)?_c('div',[_c('product-header',{attrs:{"published":_vm.data.weather_product.published_time,"author":_vm.data.weather_product.author,"expires":false}}),_c('weather-content',{attrs:{"data":_vm.data.weather_product}})],1):_c('p',[_vm._v("No Weather Forecast to display.")])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.tabSelected == 'blog'),expression:"tabSelected == 'blog'"}],staticClass:"afp-tabPane"},[(_vm.data.hasOwnProperty('synopsis_product') && _vm.data.synopsis_product.avalanche_center != null)?_c('div',[_c('h1',{staticClass:"afp-html-h1",domProps:{"innerHTML":_vm._s(_vm.data.synopsis_product.bottom_line)}}),_c('product-header',{attrs:{"published":_vm.data.synopsis_product.published_time,"author":_vm.data.synopsis_product.author,"expires":false}}),_c('synopsis-content',{attrs:{"data":_vm.data.synopsis_product}})],1):_c('div',[_vm._v("No Conditions Blog post to display.")])]),_vm._l((_vm.config.tabs),function(customTab){return _c('div',{key:customTab.id},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.tabSelected == customTab.id),expression:"tabSelected == customTab.id"}],staticClass:"afp-tabPane"},[_c('custom-tab',{attrs:{"id":customTab.id,"tab":customTab.id,"url":customTab.url}})],1)])})],2),_c('disclaimer')],1)}
var ForecastProductvue_type_template_id_4538c332_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ForecastProduct.vue?vue&type=template&id=4538c332&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ZoneSelector.vue?vue&type=template&id=5b48874d&scoped=true&
var ZoneSelectorvue_type_template_id_5b48874d_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-zone-selector"},[_c('button',{ref:"button",staticClass:"afp-html-button afp-btn",on:{"click":function($event){_vm.show = !_vm.show}}},[_vm._v("Choose Zone")]),_c('transition',{attrs:{"name":"expand"},on:{"enter":_vm.enter,"after-enter":_vm.afterEnter,"leave":_vm.leave}},[(_vm.show)?_c('div',{directives:[{name:"closable",rawName:"v-closable",value:({
                exclude: ['button'],
                handler: 'onClose'
            }),expression:"{\n                exclude: ['button'],\n                handler: 'onClose'\n            }"}],staticClass:"afp-dropdown-menu"},[(_vm.date == '')?_c('span',_vm._l((_vm.centerZones),function(zone){return _c('router-link',{key:zone.id,staticClass:"afp-html-a afp-dropdown-item afp-native-link",attrs:{"to":{ name: 'ZoneForecast', params: { zone: _vm.urlString(zone.name) }}}},[_vm._v(_vm._s(zone.name))])}),1):_c('span',_vm._l((_vm.centerZones),function(zone){return _c('router-link',{key:zone.id,staticClass:"afp-html-a afp-dropdown-item afp-native-link",attrs:{"to":{ name: 'ArchivedForecast', params: { zone: _vm.urlString(zone.name), date: _vm.date }}}},[_vm._v(_vm._s(zone.name))])}),1)]):_vm._e()])],1)}
var ZoneSelectorvue_type_template_id_5b48874d_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ZoneSelector.vue?vue&type=template&id=5b48874d&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ZoneSelector.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ZoneSelectorvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      show: false,
      date: '',
      centerZones: this.$centerMeta.zones
    };
  },
  methods: {
    urlString: function urlString(string) {
      string = string.replace(/ /g, '-');
      string = string.toLowerCase();
      return string;
    },
    onClose: function onClose() {
      this.show = false;
    },
    // Transitions for menu
    enter: function enter(element) {
      var width = getComputedStyle(element).width;
      element.style.width = width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';
      var height = getComputedStyle(element).height;
      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;
      getComputedStyle(element).height;
      setTimeout(function () {
        element.style.height = height;
      });
    },
    afterEnter: function afterEnter(element) {
      element.style.height = 'auto';
    },
    leave: function leave(element) {
      var height = getComputedStyle(element).height;
      element.style.height = height;
      getComputedStyle(element).height;
      setTimeout(function () {
        element.style.height = 0;
      });
    }
  },
  mounted: function mounted() {
    if (this.$route.params.date != undefined) {
      this.date = this.$route.params.date;
    } else {
      this.date = '';
    }
  }
});
// CONCATENATED MODULE: ./src/components/ZoneSelector.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ZoneSelectorvue_type_script_lang_js_ = (ZoneSelectorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ZoneSelector.vue?vue&type=style&index=0&id=5b48874d&scoped=true&lang=scss&
var ZoneSelectorvue_type_style_index_0_id_5b48874d_scoped_true_lang_scss_ = __webpack_require__("ce05");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/ZoneSelector.vue






/* normalize component */

var component = normalizeComponent(
  components_ZoneSelectorvue_type_script_lang_js_,
  ZoneSelectorvue_type_template_id_5b48874d_scoped_true_render,
  ZoneSelectorvue_type_template_id_5b48874d_scoped_true_staticRenderFns,
  false,
  null,
  "5b48874d",
  null
  
)

/* harmony default export */ var ZoneSelector = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ProductHeader.vue?vue&type=template&id=37cd4608&scoped=true&
var ProductHeadervue_type_template_id_37cd4608_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.expired && !_vm.preview)?_c('div',{staticClass:"afp-expired afp-alert afp-alert-danger"},[_vm._m(0)]):_vm._e(),_c('div',{staticClass:"afp-header afp-row afp-mb-3"},[(_vm.published != '')?_c('div',{staticClass:"afp-col-12 afp-col-md"},[_c('div',{staticClass:"afp-header-meta"},[_c('h6',{staticClass:"afp-html-h6"},[_vm._v("Issued")]),_vm._v("\n                "+_vm._s(_vm._f("publicDate")(_vm.published))+"\n            ")])]):_vm._e(),(_vm.expires && _vm.showExpires)?_c('div',{staticClass:"afp-col-12 afp-col-md"},[_c('div',{staticClass:"afp-header-meta"},[_c('h6',{staticClass:"afp-html-h6"},[_vm._v("Expires")]),_vm._v("\n                "+_vm._s(_vm._f("publicDate")(_vm.expires))+"\n            ")])]):_vm._e(),(_vm.author != '')?_c('div',{staticClass:"afp-col-12 afp-col-md"},[_c('div',{staticClass:"afp-header-meta"},[_c('h6',{staticClass:"afp-html-h6"},[_vm._v("Author")]),_vm._v("\n                "+_vm._s(_vm.author)+"\n            ")])]):_vm._e()])])}
var ProductHeadervue_type_template_id_37cd4608_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h2',{staticClass:"afp-html-h2"},[_c('i',{staticClass:"mdi mdi-clock-alert"}),_vm._v(" This product is expired\n        ")])}]


// CONCATENATED MODULE: ./src/components/ProductHeader.vue?vue&type=template&id=37cd4608&scoped=true&

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/hooks.js
var hooks = __webpack_require__("886e");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/local.js
var local = __webpack_require__("e755");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/utc.js
var create_utc = __webpack_require__("90e5");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/valid.js + 1 modules
var valid = __webpack_require__("ffd7");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/moment/constructor.js
var moment_constructor = __webpack_require__("91bc");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/deprecate.js
var deprecate = __webpack_require__("10e2");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-array.js
var is_array = __webpack_require__("cef3");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/min-max.js





var prototypeMin = Object(deprecate["a" /* deprecate */])(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = local["a" /* createLocal */].apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return Object(valid["a" /* createInvalid */])();
        }
    }
);

var prototypeMax = Object(deprecate["a" /* deprecate */])(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = local["a" /* createLocal */].apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return Object(valid["a" /* createInvalid */])();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && Object(is_array["a" /* default */])(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return Object(local["a" /* createLocal */])();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/now.js
var now_now = function () {
    return Date.now ? Date.now() : +(new Date());
};

// EXTERNAL MODULE: ./node_modules/moment/src/lib/moment/get-set.js
var get_set = __webpack_require__("42e2");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/month.js + 1 modules
var month = __webpack_require__("9279");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/aliases.js
var aliases = __webpack_require__("f987");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/locale/locales.js
var locales = __webpack_require__("f200");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/to-int.js
var to_int = __webpack_require__("29f2");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/index-of.js
var index_of = __webpack_require__("0df4");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/valid.js





var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(index_of["a" /* default */].call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== Object(to_int["a" /* default */])(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid() {
    return this._isValid;
}

function createInvalid() {
    return createDuration(NaN);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/constructor.js




function Duration (duration) {
    var normalizedInput = Object(aliases["b" /* normalizeObjectUnits */])(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = Object(locales["b" /* getLocale */])();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-number.js
var is_number = __webpack_require__("4137");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/utils/abs-round.js
function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/has-own-prop.js
var has_own_prop = __webpack_require__("2398");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/constants.js
var constants = __webpack_require__("0f49");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/zero-fill.js
var zero_fill = __webpack_require__("4de3");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/format/format.js
var format_format = __webpack_require__("3625");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/parse/regex.js
var regex = __webpack_require__("f66e");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/parse/token.js
var parse_token = __webpack_require__("dff0");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/from-anything.js + 9 modules
var from_anything = __webpack_require__("5139");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-date.js
var is_date = __webpack_require__("4764");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-undefined.js
var is_undefined = __webpack_require__("93fc");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/compare-arrays.js
var compare_arrays = __webpack_require__("6144");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/offset.js
















// FORMATTING

function offset_offset (token, separator) {
    Object(format_format["a" /* addFormatToken */])(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + Object(zero_fill["a" /* default */])(~~(offset / 60), 2) + separator + Object(zero_fill["a" /* default */])(~~(offset) % 60, 2);
    });
}

offset_offset('Z', ':');
offset_offset('ZZ', '');

// PARSING

Object(regex["a" /* addRegexToken */])('Z',  regex["o" /* matchShortOffset */]);
Object(regex["a" /* addRegexToken */])('ZZ', regex["o" /* matchShortOffset */]);
Object(parse_token["a" /* addParseToken */])(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(regex["o" /* matchShortOffset */], input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + Object(to_int["a" /* default */])(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (Object(moment_constructor["c" /* isMoment */])(input) || Object(is_date["a" /* default */])(input) ? input.valueOf() : Object(local["a" /* createLocal */])(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks["a" /* hooks */].updateOffset(res, false);
        return res;
    } else {
        return Object(local["a" /* createLocal */])(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks["a" /* hooks */].updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(regex["o" /* matchShortOffset */], input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks["a" /* hooks */].updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(regex["n" /* matchOffset */], this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? Object(local["a" /* createLocal */])(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!Object(is_undefined["a" /* default */])(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    Object(moment_constructor["b" /* copyConfig */])(c, this);
    c = Object(from_anything["b" /* prepareConfig */])(c);

    if (c._a) {
        var other = c._isUTC ? Object(create_utc["a" /* createUTC */])(c._a) : Object(local["a" /* createLocal */])(c._a);
        this._isDSTShifted = this.isValid() &&
            Object(compare_arrays["a" /* default */])(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/create.js










// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (Object(is_number["a" /* default */])(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : Object(to_int["a" /* default */])(match[constants["a" /* DATE */]])                         * sign,
            h  : Object(to_int["a" /* default */])(match[constants["b" /* HOUR */]])                         * sign,
            m  : Object(to_int["a" /* default */])(match[constants["d" /* MINUTE */]])                       * sign,
            s  : Object(to_int["a" /* default */])(match[constants["f" /* SECOND */]])                       * sign,
            ms : Object(to_int["a" /* default */])(absRound(match[constants["c" /* MILLISECOND */]] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(Object(local["a" /* createLocal */])(duration.from), Object(local["a" /* createLocal */])(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && Object(has_own_prop["a" /* default */])(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/add-subtract.js








// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            Object(deprecate["b" /* deprecateSimple */])(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        Object(month["k" /* setMonth */])(mom, Object(get_set["a" /* get */])(mom, 'Month') + months * isAdding);
    }
    if (days) {
        Object(get_set["c" /* set */])(mom, 'Date', Object(get_set["a" /* get */])(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks["a" /* hooks */].updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');


// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/is-function.js
var is_function = __webpack_require__("6937");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/calendar.js





function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || Object(local["a" /* createLocal */])(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks["a" /* hooks */].calendarFormat(this, sod) || 'sameElse';

    var output = formats && (Object(is_function["a" /* default */])(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, Object(local["a" /* createLocal */])(now)));
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/clone.js


function clone () {
    return new moment_constructor["a" /* Moment */](this);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/compare.js




function isAfter (input, units) {
    var localInput = Object(moment_constructor["c" /* isMoment */])(input) ? input : Object(local["a" /* createLocal */])(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = Object(aliases["c" /* normalizeUnits */])(units) || 'millisecond';
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = Object(moment_constructor["c" /* isMoment */])(input) ? input : Object(local["a" /* createLocal */])(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = Object(aliases["c" /* normalizeUnits */])(units) || 'millisecond';
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    var localFrom = Object(moment_constructor["c" /* isMoment */])(from) ? from : Object(local["a" /* createLocal */])(from),
        localTo = Object(moment_constructor["c" /* isMoment */])(to) ? to : Object(local["a" /* createLocal */])(to);
    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
        return false;
    }
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}

function isSame (input, units) {
    var localInput = Object(moment_constructor["c" /* isMoment */])(input) ? input : Object(local["a" /* createLocal */])(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = Object(aliases["c" /* normalizeUnits */])(units) || 'millisecond';
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/abs-floor.js
var abs_floor = __webpack_require__("38c8");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/diff.js




function diff_diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = Object(aliases["c" /* normalizeUnits */])(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : Object(abs_floor["a" /* default */])(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/format.js




hooks["a" /* hooks */].defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks["a" /* hooks */].defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function format_toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString(keepOffset) {
    if (!this.isValid()) {
        return null;
    }
    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;
    if (m.year() < 0 || m.year() > 9999) {
        return Object(format_format["c" /* formatMoment */])(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }
    if (Object(is_function["a" /* default */])(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        if (utc) {
            return this.toDate().toISOString();
        } else {
            return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', Object(format_format["c" /* formatMoment */])(m, 'Z'));
        }
    }
    return Object(format_format["c" /* formatMoment */])(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function moment_format_format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks["a" /* hooks */].defaultFormatUtc : hooks["a" /* hooks */].defaultFormat;
    }
    var output = Object(format_format["c" /* formatMoment */])(this, inputString);
    return this.localeData().postformat(output);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/from.js




function from_from (time, withoutSuffix) {
    if (this.isValid() &&
            ((Object(moment_constructor["c" /* isMoment */])(time) && time.isValid()) ||
             Object(local["a" /* createLocal */])(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(Object(local["a" /* createLocal */])(), withoutSuffix);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/to.js




function to_to (time, withoutSuffix) {
    if (this.isValid() &&
            ((Object(moment_constructor["c" /* isMoment */])(time) && time.isValid()) ||
             Object(local["a" /* createLocal */])(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(Object(local["a" /* createLocal */])(), withoutSuffix);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/locale.js



// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale_locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = Object(locales["b" /* getLocale */])(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = Object(deprecate["a" /* deprecate */])(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/start-end-of.js



var MS_PER_SECOND = 1000;
var MS_PER_MINUTE = 60 * MS_PER_SECOND;
var MS_PER_HOUR = 60 * MS_PER_MINUTE;
var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

// actual modulo - handles negative numbers (for dates before 1970):
function mod(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
}

function localStartOfDate(y, m, d) {
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
        // preserve leap years using a full 400 year cycle, then reset
        return new Date(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
        return new Date(y, m, d).valueOf();
    }
}

function utcStartOfDate(y, m, d) {
    // Date.UTC remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
        // preserve leap years using a full 400 year cycle, then reset
        return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
        return Date.UTC(y, m, d);
    }
}

function startOf (units) {
    var time;
    units = Object(aliases["c" /* normalizeUnits */])(units);
    if (units === undefined || units === 'millisecond' || !this.isValid()) {
        return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
        case 'year':
            time = startOfDate(this.year(), 0, 1);
            break;
        case 'quarter':
            time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
            break;
        case 'month':
            time = startOfDate(this.year(), this.month(), 1);
            break;
        case 'week':
            time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
            break;
        case 'isoWeek':
            time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
            break;
        case 'day':
        case 'date':
            time = startOfDate(this.year(), this.month(), this.date());
            break;
        case 'hour':
            time = this._d.valueOf();
            time -= mod(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
            break;
        case 'minute':
            time = this._d.valueOf();
            time -= mod(time, MS_PER_MINUTE);
            break;
        case 'second':
            time = this._d.valueOf();
            time -= mod(time, MS_PER_SECOND);
            break;
    }

    this._d.setTime(time);
    hooks["a" /* hooks */].updateOffset(this, true);
    return this;
}

function endOf (units) {
    var time;
    units = Object(aliases["c" /* normalizeUnits */])(units);
    if (units === undefined || units === 'millisecond' || !this.isValid()) {
        return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
        case 'year':
            time = startOfDate(this.year() + 1, 0, 1) - 1;
            break;
        case 'quarter':
            time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
            break;
        case 'month':
            time = startOfDate(this.year(), this.month() + 1, 1) - 1;
            break;
        case 'week':
            time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
            break;
        case 'isoWeek':
            time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
            break;
        case 'day':
        case 'date':
            time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
            break;
        case 'hour':
            time = this._d.valueOf();
            time += MS_PER_HOUR - mod(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
            break;
        case 'minute':
            time = this._d.valueOf();
            time += MS_PER_MINUTE - mod(time, MS_PER_MINUTE) - 1;
            break;
        case 'second':
            time = this._d.valueOf();
            time += MS_PER_SECOND - mod(time, MS_PER_SECOND) - 1;
            break;
    }

    this._d.setTime(time);
    hooks["a" /* hooks */].updateOffset(this, true);
    return this;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/to-type.js
function to_type_valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/extend.js
var extend = __webpack_require__("3031");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/parsing-flags.js
var parsing_flags = __webpack_require__("0a9d");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/valid.js




function valid_isValid () {
    return Object(valid["b" /* isValid */])(this);
}

function parsingFlags () {
    return Object(extend["a" /* default */])({}, Object(parsing_flags["a" /* default */])(this));
}

function invalidAt () {
    return Object(parsing_flags["a" /* default */])(this).overflow;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/creation-data.js
function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/year.js
var year = __webpack_require__("ec30");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/priorities.js
var priorities = __webpack_require__("d4a2");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/week-calendar-utils.js
var week_calendar_utils = __webpack_require__("86ee");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/date-from-array.js
var date_from_array = __webpack_require__("cab0");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/week-year.js











// FORMATTING

Object(format_format["a" /* addFormatToken */])(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

Object(format_format["a" /* addFormatToken */])(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    Object(format_format["a" /* addFormatToken */])(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

Object(aliases["a" /* addUnitAlias */])('weekYear', 'gg');
Object(aliases["a" /* addUnitAlias */])('isoWeekYear', 'GG');

// PRIORITY

Object(priorities["a" /* addUnitPriority */])('weekYear', 1);
Object(priorities["a" /* addUnitPriority */])('isoWeekYear', 1);


// PARSING

Object(regex["a" /* addRegexToken */])('G',      regex["p" /* matchSigned */]);
Object(regex["a" /* addRegexToken */])('g',      regex["p" /* matchSigned */]);
Object(regex["a" /* addRegexToken */])('GG',     regex["d" /* match1to2 */], regex["h" /* match2 */]);
Object(regex["a" /* addRegexToken */])('gg',     regex["d" /* match1to2 */], regex["h" /* match2 */]);
Object(regex["a" /* addRegexToken */])('GGGG',   regex["f" /* match1to4 */], regex["k" /* match4 */]);
Object(regex["a" /* addRegexToken */])('gggg',   regex["f" /* match1to4 */], regex["k" /* match4 */]);
Object(regex["a" /* addRegexToken */])('GGGGG',  regex["g" /* match1to6 */], regex["m" /* match6 */]);
Object(regex["a" /* addRegexToken */])('ggggg',  regex["g" /* match1to6 */], regex["m" /* match6 */]);

Object(parse_token["c" /* addWeekParseToken */])(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = Object(to_int["a" /* default */])(input);
});

Object(parse_token["c" /* addWeekParseToken */])(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks["a" /* hooks */].parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return Object(week_calendar_utils["c" /* weeksInYear */])(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return Object(week_calendar_utils["c" /* weeksInYear */])(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return Object(week_calendar_utils["b" /* weekOfYear */])(this, dow, doy).year;
    } else {
        weeksTarget = Object(week_calendar_utils["c" /* weeksInYear */])(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = Object(week_calendar_utils["a" /* dayOfYearFromWeeks */])(weekYear, week, weekday, dow, doy),
        date = Object(date_from_array["b" /* createUTCDate */])(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/quarter.js








// FORMATTING

Object(format_format["a" /* addFormatToken */])('Q', 0, 'Qo', 'quarter');

// ALIASES

Object(aliases["a" /* addUnitAlias */])('quarter', 'Q');

// PRIORITY

Object(priorities["a" /* addUnitPriority */])('quarter', 7);

// PARSING

Object(regex["a" /* addRegexToken */])('Q', regex["c" /* match1 */]);
Object(parse_token["a" /* addParseToken */])('Q', function (input, array) {
    array[constants["e" /* MONTH */]] = (Object(to_int["a" /* default */])(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/week.js
var units_week = __webpack_require__("5fdb");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/day-of-month.js









// FORMATTING

Object(format_format["a" /* addFormatToken */])('D', ['DD', 2], 'Do', 'date');

// ALIASES

Object(aliases["a" /* addUnitAlias */])('date', 'D');

// PRIORITY
Object(priorities["a" /* addUnitPriority */])('date', 9);

// PARSING

Object(regex["a" /* addRegexToken */])('D',  regex["d" /* match1to2 */]);
Object(regex["a" /* addRegexToken */])('DD', regex["d" /* match1to2 */], regex["h" /* match2 */]);
Object(regex["a" /* addRegexToken */])('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

Object(parse_token["a" /* addParseToken */])(['D', 'DD'], constants["a" /* DATE */]);
Object(parse_token["a" /* addParseToken */])('Do', function (input, array) {
    array[constants["a" /* DATE */]] = Object(to_int["a" /* default */])(input.match(regex["d" /* match1to2 */])[0]);
});

// MOMENTS

var getSetDayOfMonth = Object(get_set["b" /* makeGetSet */])('Date', true);

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/day-of-week.js
var day_of_week = __webpack_require__("4474");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/day-of-year.js









// FORMATTING

Object(format_format["a" /* addFormatToken */])('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

Object(aliases["a" /* addUnitAlias */])('dayOfYear', 'DDD');

// PRIORITY
Object(priorities["a" /* addUnitPriority */])('dayOfYear', 4);

// PARSING

Object(regex["a" /* addRegexToken */])('DDD',  regex["e" /* match1to3 */]);
Object(regex["a" /* addRegexToken */])('DDDD', regex["i" /* match3 */]);
Object(parse_token["a" /* addParseToken */])(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = Object(to_int["a" /* default */])(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/units/hour.js
var hour = __webpack_require__("aeaa");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/minute.js








// FORMATTING

Object(format_format["a" /* addFormatToken */])('m', ['mm', 2], 0, 'minute');

// ALIASES

Object(aliases["a" /* addUnitAlias */])('minute', 'm');

// PRIORITY

Object(priorities["a" /* addUnitPriority */])('minute', 14);

// PARSING

Object(regex["a" /* addRegexToken */])('m',  regex["d" /* match1to2 */]);
Object(regex["a" /* addRegexToken */])('mm', regex["d" /* match1to2 */], regex["h" /* match2 */]);
Object(parse_token["a" /* addParseToken */])(['m', 'mm'], constants["d" /* MINUTE */]);

// MOMENTS

var getSetMinute = Object(get_set["b" /* makeGetSet */])('Minutes', false);

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/second.js








// FORMATTING

Object(format_format["a" /* addFormatToken */])('s', ['ss', 2], 0, 'second');

// ALIASES

Object(aliases["a" /* addUnitAlias */])('second', 's');

// PRIORITY

Object(priorities["a" /* addUnitPriority */])('second', 15);

// PARSING

Object(regex["a" /* addRegexToken */])('s',  regex["d" /* match1to2 */]);
Object(regex["a" /* addRegexToken */])('ss', regex["d" /* match1to2 */], regex["h" /* match2 */]);
Object(parse_token["a" /* addParseToken */])(['s', 'ss'], constants["f" /* SECOND */]);

// MOMENTS

var getSetSecond = Object(get_set["b" /* makeGetSet */])('Seconds', false);

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/millisecond.js









// FORMATTING

Object(format_format["a" /* addFormatToken */])('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

Object(format_format["a" /* addFormatToken */])(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

Object(format_format["a" /* addFormatToken */])(0, ['SSS', 3], 0, 'millisecond');
Object(format_format["a" /* addFormatToken */])(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
Object(format_format["a" /* addFormatToken */])(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
Object(format_format["a" /* addFormatToken */])(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
Object(format_format["a" /* addFormatToken */])(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
Object(format_format["a" /* addFormatToken */])(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
Object(format_format["a" /* addFormatToken */])(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

Object(aliases["a" /* addUnitAlias */])('millisecond', 'ms');

// PRIORITY

Object(priorities["a" /* addUnitPriority */])('millisecond', 16);

// PARSING

Object(regex["a" /* addRegexToken */])('S',    regex["e" /* match1to3 */], regex["c" /* match1 */]);
Object(regex["a" /* addRegexToken */])('SS',   regex["e" /* match1to3 */], regex["h" /* match2 */]);
Object(regex["a" /* addRegexToken */])('SSS',  regex["e" /* match1to3 */], regex["i" /* match3 */]);

var millisecond_token;
for (millisecond_token = 'SSSS'; millisecond_token.length <= 9; millisecond_token += 'S') {
    Object(regex["a" /* addRegexToken */])(millisecond_token, regex["r" /* matchUnsigned */]);
}

function parseMs(input, array) {
    array[constants["c" /* MILLISECOND */]] = Object(to_int["a" /* default */])(('0.' + input) * 1000);
}

for (millisecond_token = 'S'; millisecond_token.length <= 9; millisecond_token += 'S') {
    Object(parse_token["a" /* addParseToken */])(millisecond_token, parseMs);
}
// MOMENTS

var getSetMillisecond = Object(get_set["b" /* makeGetSet */])('Milliseconds', false);

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/timezone.js


// FORMATTING

Object(format_format["a" /* addFormatToken */])('z',  0, 0, 'zoneAbbr');
Object(format_format["a" /* addFormatToken */])('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/prototype.js


var proto = moment_constructor["a" /* Moment */].prototype;

















proto.add               = add;
proto.calendar          = calendar;
proto.clone             = clone;
proto.diff              = diff_diff;
proto.endOf             = endOf;
proto.format            = moment_format_format;
proto.from              = from_from;
proto.fromNow           = fromNow;
proto.to                = to_to;
proto.toNow             = toNow;
proto.get               = get_set["d" /* stringGet */];
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = valid_isValid;
proto.lang              = lang;
proto.locale            = locale_locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = get_set["e" /* stringSet */];
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = format_toString;
proto.unix              = unix;
proto.valueOf           = to_type_valueOf;
proto.creationData      = creationData;

// Year

proto.year       = year["c" /* getSetYear */];
proto.isLeapYear = year["b" /* getIsLeapYear */];

// Week Year

proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter

proto.quarter = proto.quarters = getSetQuarter;

// Month

proto.month       = month["e" /* getSetMonth */];
proto.daysInMonth = month["d" /* getDaysInMonth */];

// Week

proto.week           = proto.weeks        = units_week["c" /* getSetWeek */];
proto.isoWeek        = proto.isoWeeks     = units_week["b" /* getSetISOWeek */];
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day



proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = day_of_week["d" /* getSetDayOfWeek */];
proto.weekday    = day_of_week["f" /* getSetLocaleDayOfWeek */];
proto.isoWeekday = day_of_week["e" /* getSetISODayOfWeek */];
proto.dayOfYear  = getSetDayOfYear;

// Hour

proto.hour = proto.hours = hour["b" /* getSetHour */];

// Minute

proto.minute = proto.minutes = getSetMinute;

// Second

proto.second = proto.seconds = getSetSecond;

// Millisecond

proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset

proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone

proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations

proto.dates  = Object(deprecate["a" /* deprecate */])('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = Object(deprecate["a" /* deprecate */])('months accessor is deprecated. Use month instead', month["e" /* getSetMonth */]);
proto.years  = Object(deprecate["a" /* deprecate */])('years accessor is deprecated. Use year instead', year["c" /* getSetYear */]);
proto.zone   = Object(deprecate["a" /* deprecate */])('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = Object(deprecate["a" /* deprecate */])('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

/* harmony default export */ var moment_prototype = (proto);

// CONCATENATED MODULE: ./node_modules/moment/src/lib/moment/moment.js








function createUnix (input) {
    return Object(local["a" /* createLocal */])(input * 1000);
}

function createInZone () {
    return local["a" /* createLocal */].apply(null, arguments).parseZone();
}



// EXTERNAL MODULE: ./node_modules/moment/src/lib/locale/constructor.js
var locale_constructor = __webpack_require__("6900");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/locale/calendar.js
var locale_calendar = __webpack_require__("384c");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/locale/formats.js
var locale_formats = __webpack_require__("243d");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/locale/invalid.js
var invalid = __webpack_require__("9b15");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/locale/ordinal.js
var ordinal = __webpack_require__("5e73");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/locale/pre-post-format.js
function preParsePostFormat (string) {
    return string;
}

// EXTERNAL MODULE: ./node_modules/moment/src/lib/locale/relative.js
var relative = __webpack_require__("8f73");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/locale/set.js
var set = __webpack_require__("5346");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/locale/prototype.js


var prototype_proto = locale_constructor["a" /* Locale */].prototype;









prototype_proto.calendar        = locale_calendar["a" /* calendar */];
prototype_proto.longDateFormat  = locale_formats["b" /* longDateFormat */];
prototype_proto.invalidDate     = invalid["b" /* invalidDate */];
prototype_proto.ordinal         = ordinal["c" /* ordinal */];
prototype_proto.preparse        = preParsePostFormat;
prototype_proto.postformat      = preParsePostFormat;
prototype_proto.relativeTime    = relative["c" /* relativeTime */];
prototype_proto.pastFuture      = relative["b" /* pastFuture */];
prototype_proto.set             = set["b" /* set */];

// Month


prototype_proto.months            =        month["f" /* localeMonths */];
prototype_proto.monthsShort       =        month["h" /* localeMonthsShort */];
prototype_proto.monthsParse       =        month["g" /* localeMonthsParse */];
prototype_proto.monthsRegex       = month["i" /* monthsRegex */];
prototype_proto.monthsShortRegex  = month["j" /* monthsShortRegex */];

// Week

prototype_proto.week = units_week["f" /* localeWeek */];
prototype_proto.firstDayOfYear = units_week["e" /* localeFirstDayOfYear */];
prototype_proto.firstDayOfWeek = units_week["d" /* localeFirstDayOfWeek */];

// Day of Week


prototype_proto.weekdays       =        day_of_week["g" /* localeWeekdays */];
prototype_proto.weekdaysMin    =        day_of_week["h" /* localeWeekdaysMin */];
prototype_proto.weekdaysShort  =        day_of_week["j" /* localeWeekdaysShort */];
prototype_proto.weekdaysParse  =        day_of_week["i" /* localeWeekdaysParse */];

prototype_proto.weekdaysRegex       =        day_of_week["l" /* weekdaysRegex */];
prototype_proto.weekdaysShortRegex  =        day_of_week["m" /* weekdaysShortRegex */];
prototype_proto.weekdaysMinRegex    =        day_of_week["k" /* weekdaysMinRegex */];

// Hours


prototype_proto.isPM = hour["c" /* localeIsPM */];
prototype_proto.meridiem = hour["d" /* localeMeridiem */];

// CONCATENATED MODULE: ./node_modules/moment/src/lib/locale/lists.js




function get (format, index, field, setter) {
    var locale = Object(locales["b" /* getLocale */])();
    var utc = Object(create_utc["a" /* createUTC */])().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (Object(is_number["a" /* default */])(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (Object(is_number["a" /* default */])(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (Object(is_number["a" /* default */])(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = Object(locales["b" /* getLocale */])(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/locale/en.js




Object(locales["c" /* getSetGlobalLocale */])('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (Object(to_int["a" /* default */])(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// CONCATENATED MODULE: ./node_modules/moment/src/lib/locale/locale.js
// Side effect imports











hooks["a" /* hooks */].lang = Object(deprecate["a" /* deprecate */])('moment.lang is deprecated. Use moment.locale instead.', locales["c" /* getSetGlobalLocale */]);
hooks["a" /* hooks */].langData = Object(deprecate["a" /* deprecate */])('moment.langData is deprecated. Use moment.localeData instead.', locales["b" /* getLocale */]);



// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/abs.js
var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/add-subtract.js


function add_subtract_addSubtract (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add_subtract_add (input, value) {
    return add_subtract_addSubtract(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function add_subtract_subtract (input, value) {
    return add_subtract_addSubtract(this, input, value, -1);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/utils/abs-ceil.js
function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/bubble.js




function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = Object(abs_floor["a" /* default */])(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = Object(abs_floor["a" /* default */])(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = Object(abs_floor["a" /* default */])(minutes / 60);
    data.hours        = hours % 24;

    days += Object(abs_floor["a" /* default */])(hours / 24);

    // convert days to months
    monthsFromDays = Object(abs_floor["a" /* default */])(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = Object(abs_floor["a" /* default */])(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/as.js




function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = Object(aliases["c" /* normalizeUnits */])(units);

    if (units === 'month' || units === 'quarter' || units === 'year') {
        days = this._days + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        switch (units) {
            case 'month':   return months;
            case 'quarter': return months / 3;
            case 'year':    return months / 12;
        }
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function as_valueOf () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        Object(to_int["a" /* default */])(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asQuarters     = makeAs('Q');
var asYears        = makeAs('y');

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/clone.js


function clone_clone () {
    return createDuration(this);
}


// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/get.js



function get_get (units) {
    units = Object(aliases["c" /* normalizeUnits */])(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var get_milliseconds = makeGetter('milliseconds');
var get_seconds      = makeGetter('seconds');
var get_minutes      = makeGetter('minutes');
var get_hours        = makeGetter('hours');
var get_days         = makeGetter('days');
var get_months       = makeGetter('months');
var get_years        = makeGetter('years');

function get_weeks () {
    return Object(abs_floor["a" /* default */])(this.days() / 7);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/humanize.js


var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/iso-string.js

var iso_string_abs = Math.abs;

function iso_string_sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function iso_string_toISOString() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = iso_string_abs(this._milliseconds) / 1000;
    var days         = iso_string_abs(this._days);
    var months       = iso_string_abs(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = Object(abs_floor["a" /* default */])(seconds / 60);
    hours             = Object(abs_floor["a" /* default */])(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = Object(abs_floor["a" /* default */])(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = iso_string_sign(this._months) !== iso_string_sign(total) ? '-' : '';
    var daysSign = iso_string_sign(this._days) !== iso_string_sign(total) ? '-' : '';
    var hmsSign = iso_string_sign(this._milliseconds) !== iso_string_sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/prototype.js


var duration_prototype_proto = Duration.prototype;












duration_prototype_proto.isValid        = isValid;
duration_prototype_proto.abs            = abs;
duration_prototype_proto.add            = add_subtract_add;
duration_prototype_proto.subtract       = add_subtract_subtract;
duration_prototype_proto.as             = as;
duration_prototype_proto.asMilliseconds = asMilliseconds;
duration_prototype_proto.asSeconds      = asSeconds;
duration_prototype_proto.asMinutes      = asMinutes;
duration_prototype_proto.asHours        = asHours;
duration_prototype_proto.asDays         = asDays;
duration_prototype_proto.asWeeks        = asWeeks;
duration_prototype_proto.asMonths       = asMonths;
duration_prototype_proto.asQuarters     = asQuarters;
duration_prototype_proto.asYears        = asYears;
duration_prototype_proto.valueOf        = as_valueOf;
duration_prototype_proto._bubble        = bubble;
duration_prototype_proto.clone          = clone_clone;
duration_prototype_proto.get            = get_get;
duration_prototype_proto.milliseconds   = get_milliseconds;
duration_prototype_proto.seconds        = get_seconds;
duration_prototype_proto.minutes        = get_minutes;
duration_prototype_proto.hours          = get_hours;
duration_prototype_proto.days           = get_days;
duration_prototype_proto.weeks          = get_weeks;
duration_prototype_proto.months         = get_months;
duration_prototype_proto.years          = get_years;
duration_prototype_proto.humanize       = humanize;
duration_prototype_proto.toISOString    = iso_string_toISOString;
duration_prototype_proto.toString       = iso_string_toISOString;
duration_prototype_proto.toJSON         = iso_string_toISOString;
duration_prototype_proto.locale         = locale_locale;
duration_prototype_proto.localeData     = localeData;

// Deprecations


duration_prototype_proto.toIsoString = Object(deprecate["a" /* deprecate */])('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string_toISOString);
duration_prototype_proto.lang = lang;

// CONCATENATED MODULE: ./node_modules/moment/src/lib/duration/duration.js
// Side effect imports








// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/timestamp.js





// FORMATTING

Object(format_format["a" /* addFormatToken */])('X', 0, 0, 'unix');
Object(format_format["a" /* addFormatToken */])('x', 0, 0, 'valueOf');

// PARSING

Object(regex["a" /* addRegexToken */])('x', regex["p" /* matchSigned */]);
Object(regex["a" /* addRegexToken */])('X', regex["q" /* matchTimestamp */]);
Object(parse_token["a" /* addParseToken */])('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
Object(parse_token["a" /* addParseToken */])('x', function (input, array, config) {
    config._d = new Date(Object(to_int["a" /* default */])(input));
});

// CONCATENATED MODULE: ./node_modules/moment/src/lib/units/units.js
// Side effect imports




















// CONCATENATED MODULE: ./node_modules/moment/src/moment.js
//! moment.js
//! version : 2.24.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com



hooks["a" /* hooks */].version = '2.24.0';













Object(hooks["b" /* setHookCallback */])(local["a" /* createLocal */]);

hooks["a" /* hooks */].fn                    = moment_prototype;
hooks["a" /* hooks */].min                   = min;
hooks["a" /* hooks */].max                   = max;
hooks["a" /* hooks */].now                   = now_now;
hooks["a" /* hooks */].utc                   = create_utc["a" /* createUTC */];
hooks["a" /* hooks */].unix                  = createUnix;
hooks["a" /* hooks */].months                = listMonths;
hooks["a" /* hooks */].isDate                = is_date["a" /* default */];
hooks["a" /* hooks */].locale                = locales["c" /* getSetGlobalLocale */];
hooks["a" /* hooks */].invalid               = valid["a" /* createInvalid */];
hooks["a" /* hooks */].duration              = createDuration;
hooks["a" /* hooks */].isMoment              = moment_constructor["c" /* isMoment */];
hooks["a" /* hooks */].weekdays              = listWeekdays;
hooks["a" /* hooks */].parseZone             = createInZone;
hooks["a" /* hooks */].localeData            = locales["b" /* getLocale */];
hooks["a" /* hooks */].isDuration            = isDuration;
hooks["a" /* hooks */].monthsShort           = listMonthsShort;
hooks["a" /* hooks */].weekdaysMin           = listWeekdaysMin;
hooks["a" /* hooks */].defineLocale          = locales["a" /* defineLocale */];
hooks["a" /* hooks */].updateLocale          = locales["e" /* updateLocale */];
hooks["a" /* hooks */].locales               = locales["d" /* listLocales */];
hooks["a" /* hooks */].weekdaysShort         = listWeekdaysShort;
hooks["a" /* hooks */].normalizeUnits        = aliases["c" /* normalizeUnits */];
hooks["a" /* hooks */].relativeTimeRounding  = getSetRelativeTimeRounding;
hooks["a" /* hooks */].relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks["a" /* hooks */].calendarFormat        = getCalendarFormat;
hooks["a" /* hooks */].prototype             = moment_prototype;

// currently HTML5 input type only supports 24-hour formats
hooks["a" /* hooks */].HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',                             // <input type="date" />
    TIME: 'HH:mm',                                  // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
    WEEK: 'GGGG-[W]WW',                             // <input type="week" />
    MONTH: 'YYYY-MM'                                // <input type="month" />
};

/* harmony default export */ var moment = (hooks["a" /* hooks */]);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ProductHeader.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ProductHeadervue_type_script_lang_js_ = ({
  props: {
    preview: Boolean,
    published: String,
    expires: [String, Boolean],
    showExpires: {
      type: Boolean,
      default: true
    },
    author: String
  },
  computed: {
    expired: function expired() {
      if (this.expires) {
        return moment(this.expires).isBefore();
      } else {
        return false;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/ProductHeader.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ProductHeadervue_type_script_lang_js_ = (ProductHeadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ProductHeader.vue?vue&type=style&index=0&id=37cd4608&scoped=true&lang=scss&
var ProductHeadervue_type_style_index_0_id_37cd4608_scoped_true_lang_scss_ = __webpack_require__("38bc");

// CONCATENATED MODULE: ./src/components/ProductHeader.vue






/* normalize component */

var ProductHeader_component = normalizeComponent(
  components_ProductHeadervue_type_script_lang_js_,
  ProductHeadervue_type_template_id_37cd4608_scoped_true_render,
  ProductHeadervue_type_template_id_37cd4608_scoped_true_staticRenderFns,
  false,
  null,
  "37cd4608",
  null
  
)

/* harmony default export */ var ProductHeader = (ProductHeader_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AvyWarning.vue?vue&type=template&id=20b3cdd1&scoped=true&
var AvyWarningvue_type_template_id_20b3cdd1_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-warning afp-alert afp-alert-danger"},[_c('i',{staticClass:"mdi mdi-alert"}),_c('h2',{staticClass:"afp-html-h2"},[_vm._v("Avalanche Warning In Effect")]),_c('span',[_c('strong',[_vm._v("ISSUED")]),_vm._v("\n        "+_vm._s(_vm._f("publicDate")(_vm.data.published_time))+"\n    ")]),_c('span',[_c('strong',[_vm._v("EXPIRES")]),_vm._v("\n        "+_vm._s(_vm._f("publicDate")(_vm.data.expires_time))+"\n    ")])])}
var AvyWarningvue_type_template_id_20b3cdd1_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/AvyWarning.vue?vue&type=template&id=20b3cdd1&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AvyWarning.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var AvyWarningvue_type_script_lang_js_ = ({
  props: ['data']
});
// CONCATENATED MODULE: ./src/components/AvyWarning.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_AvyWarningvue_type_script_lang_js_ = (AvyWarningvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/AvyWarning.vue?vue&type=style&index=0&id=20b3cdd1&scoped=true&lang=scss&
var AvyWarningvue_type_style_index_0_id_20b3cdd1_scoped_true_lang_scss_ = __webpack_require__("8f66");

// CONCATENATED MODULE: ./src/components/AvyWarning.vue






/* normalize component */

var AvyWarning_component = normalizeComponent(
  components_AvyWarningvue_type_script_lang_js_,
  AvyWarningvue_type_template_id_20b3cdd1_scoped_true_render,
  AvyWarningvue_type_template_id_20b3cdd1_scoped_true_staticRenderFns,
  false,
  null,
  "20b3cdd1",
  null
  
)

/* harmony default export */ var AvyWarning = (AvyWarning_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BottomLine.vue?vue&type=template&id=0c46d67f&scoped=true&
var BottomLinevue_type_template_id_0c46d67f_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-bottomLine"},[_c('v-popover',{staticClass:"afp-bottomLine-icon"},[_c('img',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],attrs:{"src":this.$dangerScale[_vm.highestDanger].icon}}),_c('template',{slot:"popover"},[_c('div',{domProps:{"innerHTML":_vm._s(this.$dangerScale[_vm.highestDanger].advice)}})])],2),_c('h5',{staticClass:"afp-html-h5 afp-bottomLine-title"},[_vm._v("THE BOTTOM LINE")]),_c('div',{staticClass:"afp-bottomLine-text afp-tinymce",domProps:{"innerHTML":_vm._s(_vm.bottomLine)}})],1)}
var BottomLinevue_type_template_id_0c46d67f_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BottomLine.vue?vue&type=template&id=0c46d67f&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BottomLine.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var BottomLinevue_type_script_lang_js_ = ({
  data: function data() {
    return {};
  },
  props: ['highestDanger', 'bottomLine']
});
// CONCATENATED MODULE: ./src/components/BottomLine.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_BottomLinevue_type_script_lang_js_ = (BottomLinevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/BottomLine.vue?vue&type=style&index=0&id=0c46d67f&scoped=true&lang=scss&
var BottomLinevue_type_style_index_0_id_0c46d67f_scoped_true_lang_scss_ = __webpack_require__("4436");

// CONCATENATED MODULE: ./src/components/BottomLine.vue






/* normalize component */

var BottomLine_component = normalizeComponent(
  components_BottomLinevue_type_script_lang_js_,
  BottomLinevue_type_template_id_0c46d67f_scoped_true_render,
  BottomLinevue_type_template_id_0c46d67f_scoped_true_staticRenderFns,
  false,
  null,
  "0c46d67f",
  null
  
)

/* harmony default export */ var BottomLine = (BottomLine_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Tabs.vue?vue&type=template&id=69d38e43&scoped=true&
var Tabsvue_type_template_id_69d38e43_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"afp-tabs",attrs:{"id":"tabs"}},[_vm._l((_vm.tabs),function(tab){return _c('li',{key:tab.id,staticClass:"afp-tab"},[_c('a',{staticClass:"afp-native-link afp-tab-link",class:{'afp-active' : _vm.selected == tab.id },attrs:{"href":"#"},domProps:{"innerHTML":_vm._s(tab.name)},on:{"click":function($event){$event.preventDefault();return _vm.$emit('changeTab', tab.id)}}})])}),_vm._l((_vm.custom),function(tab){return (_vm.custom)?_c('li',{key:tab.id,staticClass:"afp-tab"},[_c('a',{staticClass:"afp-native-link afp-tab-link",class:{'afp-active' : _vm.selected == tab.id },attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.$emit('changeTab', tab.id)}}},[_vm._v(_vm._s(tab.name))])]):_vm._e()}),(_vm.blog)?_c('li',{key:"blog",staticClass:"afp-tab"},[_c('a',{staticClass:"afp-native-link afp-tab-link",class:{'afp-active' : _vm.selected == 'blog' },attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.$emit('changeTab', 'blog')}}},[_vm._v("Conditions Blog")])]):_vm._e()],2)}
var Tabsvue_type_template_id_69d38e43_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Tabs.vue?vue&type=template&id=69d38e43&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Tabs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Tabsvue_type_script_lang_js_ = ({
  props: ['tabs', 'custom', 'selected', 'blog']
});
// CONCATENATED MODULE: ./src/components/Tabs.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Tabsvue_type_script_lang_js_ = (Tabsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Tabs.vue?vue&type=style&index=0&id=69d38e43&scoped=true&lang=scss&
var Tabsvue_type_style_index_0_id_69d38e43_scoped_true_lang_scss_ = __webpack_require__("ff62");

// CONCATENATED MODULE: ./src/components/Tabs.vue






/* normalize component */

var Tabs_component = normalizeComponent(
  components_Tabsvue_type_script_lang_js_,
  Tabsvue_type_template_id_69d38e43_scoped_true_render,
  Tabsvue_type_template_id_69d38e43_scoped_true_staticRenderFns,
  false,
  null,
  "69d38e43",
  null
  
)

/* harmony default export */ var Tabs = (Tabs_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentPanel.vue?vue&type=template&id=caea4656&scoped=true&
var ContentPanelvue_type_template_id_caea4656_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-contentPanel afp-pt-3"},[_vm._t("default")],2)}
var ContentPanelvue_type_template_id_caea4656_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentPanel.vue?vue&type=template&id=caea4656&scoped=true&

// EXTERNAL MODULE: ./src/components/ContentPanel.vue?vue&type=style&index=0&id=caea4656&scoped=true&lang=scss&
var ContentPanelvue_type_style_index_0_id_caea4656_scoped_true_lang_scss_ = __webpack_require__("b14f");

// CONCATENATED MODULE: ./src/components/ContentPanel.vue

var script = {}



/* normalize component */

var ContentPanel_component = normalizeComponent(
  script,
  ContentPanelvue_type_template_id_caea4656_scoped_true_render,
  ContentPanelvue_type_template_id_caea4656_scoped_true_staticRenderFns,
  false,
  null,
  "caea4656",
  null
  
)

/* harmony default export */ var ContentPanel = (ContentPanel_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AvalancheDanger.vue?vue&type=template&id=488d1bce&scoped=true&
var AvalancheDangervue_type_template_id_488d1bce_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-danger afp-mb-4"},[_c('div',{staticClass:"afp-row"},[_c('div',{staticClass:"afp-danger-today afp-mb-3",class:{'afp-danger-noOutlook' : !_vm.outlookDanger }},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("\n                Avalanche Danger\n                "),_c('info',{attrs:{"content":this.$helpContent.avalancheDanger}})],1),_vm._v("\n            "+_vm._s(_vm.todayDate)+"\n            "),_c('div',{staticClass:"afp-dangerGraphic"},[_c('div',{staticClass:"afp-elevationBlock"},[_c('span',{staticClass:"afp-elevationLabel"},[_vm._v(_vm._s(_vm.config.elevations.upper))]),_c('span',{staticClass:"afp-dangerLabel"},[_vm._v(_vm._s(this.$dangerScale[_vm.currentDanger.upper].rating)+" ("+_vm._s(_vm.currentDanger.upper)+")")]),_c('v-popover',{staticClass:"afp-dangerIcon"},[_c('img',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],attrs:{"src":this.$dangerScale[_vm.currentDanger.upper].icon}}),_c('template',{slot:"popover"},[_c('div',{domProps:{"innerHTML":_vm._s(this.$dangerScale[_vm.currentDanger.upper].advice)}})])],2)],1),_c('div',{staticClass:"afp-elevationBlock"},[_c('span',{staticClass:"afp-elevationLabel"},[_vm._v(_vm._s(_vm.config.elevations.middle))]),_c('span',{staticClass:"afp-dangerLabel"},[_vm._v(_vm._s(this.$dangerScale[_vm.currentDanger.middle].rating)+" ("+_vm._s(_vm.currentDanger.middle)+")")]),_c('v-popover',{staticClass:"afp-dangerIcon"},[_c('img',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],attrs:{"src":this.$dangerScale[_vm.currentDanger.middle].icon}}),_c('template',{slot:"popover"},[_c('div',{domProps:{"innerHTML":_vm._s(this.$dangerScale[_vm.currentDanger.middle].advice)}})])],2)],1),_c('div',{staticClass:"afp-elevationBlock"},[_c('span',{staticClass:"afp-elevationLabel"},[_vm._v(_vm._s(_vm.config.elevations.lower))]),_c('span',{staticClass:"afp-dangerLabel"},[_vm._v(_vm._s(this.$dangerScale[_vm.currentDanger.lower].rating)+" ("+_vm._s(_vm.currentDanger.lower)+")")]),_c('v-popover',{staticClass:"afp-dangerIcon"},[_c('img',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],attrs:{"src":this.$dangerScale[_vm.currentDanger.lower].icon}}),_c('template',{slot:"popover"},[_c('div',{domProps:{"innerHTML":_vm._s(this.$dangerScale[_vm.currentDanger.lower].advice)}})])],2)],1),_c('danger-elevation',{staticClass:"afp-dangerMountain",attrs:{"danger":_vm.currentDanger}})],1)]),(_vm.outlookDanger)?_c('div',{staticClass:"afp-outlook"},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("\n                Outlook\n                "),_c('info',{attrs:{"content":this.$helpContent.avalancheDangerOutlook}})],1),_vm._v("\n            "+_vm._s(_vm.outlookDate)+"\n            "),_c('div',{staticClass:"afp-dangerGraphic"},[_c('div',{staticClass:"afp-elevationOutlookBlock"},[_c('span',{staticClass:"afp-dangerOutlookLabel"},[_vm._v(_vm._s(this.$dangerScale[_vm.outlookDanger.upper].rating)+" ("+_vm._s(_vm.outlookDanger.upper)+")")]),_c('v-popover',{staticClass:"afp-dangerIcon afp-dangerIconOutlook"},[_c('img',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],attrs:{"src":this.$dangerScale[_vm.outlookDanger.upper].icon}}),_c('template',{slot:"popover"},[_c('div',{domProps:{"innerHTML":_vm._s(this.$dangerScale[_vm.outlookDanger.upper].advice)}})])],2)],1),_c('div',{staticClass:"afp-elevationOutlookBlock"},[_c('span',{staticClass:"afp-dangerOutlookLabel"},[_vm._v(_vm._s(this.$dangerScale[_vm.outlookDanger.middle].rating)+" ("+_vm._s(_vm.outlookDanger.middle)+")")]),_c('v-popover',{staticClass:"afp-dangerIcon afp-dangerIconOutlook"},[_c('img',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],attrs:{"src":this.$dangerScale[_vm.outlookDanger.middle].icon}}),_c('template',{slot:"popover"},[_c('div',{domProps:{"innerHTML":_vm._s(this.$dangerScale[_vm.outlookDanger.middle].advice)}})])],2)],1),_c('div',{staticClass:"afp-elevationOutlookBlock"},[_c('span',{staticClass:"afp-dangerOutlookLabel"},[_vm._v(_vm._s(this.$dangerScale[_vm.outlookDanger.lower].rating)+" ("+_vm._s(_vm.outlookDanger.lower)+")")]),_c('v-popover',{staticClass:"afp-dangerIcon afp-dangerIconOutlook"},[_c('img',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],attrs:{"src":this.$dangerScale[_vm.outlookDanger.lower].icon}}),_c('template',{slot:"popover"},[_c('div',{domProps:{"innerHTML":_vm._s(this.$dangerScale[_vm.outlookDanger.lower].advice)}})])],2)],1)])]):_vm._e()]),(_vm.outlookDanger)?_c('div',{staticClass:"afp-outlookMobile"},[_c('div',{staticClass:"afp-outlookMobileText"},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("\n                Outlook\n                "),_c('info',{attrs:{"content":this.$helpContent.avalancheDangerOutlook}})],1),_vm._v("\n            "+_vm._s(_vm.outlookDate)+"\n        ")]),_c('div',{staticClass:"afp-outlookMobileGraphic"},[_c('danger-elevation-mobile',{staticClass:"afp-dangerMountainMobile",attrs:{"danger":_vm.outlookDanger}})],1)]):_vm._e(),_c('danger-scale')],1)}
var AvalancheDangervue_type_template_id_488d1bce_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/AvalancheDanger.vue?vue&type=template&id=488d1bce&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DangerElevation.vue?vue&type=template&id=24d3aa64&
var DangerElevationvue_type_template_id_24d3aa64_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('svg',{staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2","width":"250px","height":"300px"},attrs:{"id":"afp-danger-svg","width":"250","height":"300","viewBox":"0 0 250 300","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[_c('path',{staticStyle:{"stroke-width":"0px"},style:({ fill: _vm.dangerColor[_vm.danger.lower]}),attrs:{"d":"M31.504,210l175,0l43.496,90l-250,0l31.504,-90Z"}}),_c('path',{staticStyle:{"stroke-width":"0px"},style:({ fill: _vm.dangerColor[_vm.danger.middle]}),attrs:{"d":"M204.087,205l-170.833,0l31.503,-90l95.834,0l43.496,90Z"}}),_c('path',{staticStyle:{"stroke-width":"0px"},style:({ fill: _vm.dangerColor[_vm.danger.upper]}),attrs:{"d":"M158.174,110l-91.666,0l38.504,-110l53.162,110Z"}}),_c('path',{staticStyle:{"fill-opacity":"0.1"},attrs:{"id":"shadow","serif:id":"shadow straight","d":"M87.504,210l-7.504,90l-80,0l31.504,-90l56,0Zm7.92,-95l-7.504,90l-54.666,0l31.503,-90l30.667,0Zm-28.916,-5l38.504,-110l-9.171,110l-29.333,0Z"}})])])}
var DangerElevationvue_type_template_id_24d3aa64_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DangerElevation.vue?vue&type=template&id=24d3aa64&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DangerElevation.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var DangerElevationvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      dangerColor: ['#cccccc', '#50b849', '#fef200', '#f7941d', '#ed1b24', '#000000']
    };
  },
  props: ['danger']
});
// CONCATENATED MODULE: ./src/components/DangerElevation.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DangerElevationvue_type_script_lang_js_ = (DangerElevationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/DangerElevation.vue





/* normalize component */

var DangerElevation_component = normalizeComponent(
  components_DangerElevationvue_type_script_lang_js_,
  DangerElevationvue_type_template_id_24d3aa64_render,
  DangerElevationvue_type_template_id_24d3aa64_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DangerElevation = (DangerElevation_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DangerElevationMobile.vue?vue&type=template&id=62f1bab0&scoped=true&
var DangerElevationMobilevue_type_template_id_62f1bab0_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-dangerMobile"},[_c('svg',{staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"1.5"},attrs:{"width":"160","height":"140","viewBox":"0 0 160 140","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[_c('path',{staticStyle:{"stroke-width":"0px"},style:({ fill: _vm.dangerColor[_vm.danger.lower]}),attrs:{"d":"M30.222,95.2l99.556,0l21.333,37.8l-142.222,0l21.333,-37.8Z"}}),_c('path',{staticStyle:{"stroke-width":"0px"},style:({ fill: _vm.dangerColor[_vm.danger.middle]}),attrs:{"d":"M128.593,93.1l-97.186,0l21.334,-37.8l54.518,0l21.334,37.8Z"}}),_c('path',{staticStyle:{"stroke-width":"0px"},style:({ fill: _vm.dangerColor[_vm.danger.upper]}),attrs:{"d":"M106.074,53.2l-52.148,0l26.074,-46.2l26.074,46.2Z"}}),_c('path',{staticStyle:{"fill":"none","stroke":"#ccc","stroke-width":"2.51px"},attrs:{"d":"M77.387,5.329c0.532,-0.942 1.531,-1.525 2.613,-1.525c1.082,0 2.081,0.583 2.613,1.525c11.761,20.84 59.726,105.827 71.306,126.346c0.524,0.929 0.516,2.067 -0.022,2.988c-0.538,0.921 -1.524,1.487 -2.59,1.487c-23.343,0 -119.271,0 -142.614,0c-1.066,0 -2.052,-0.566 -2.59,-1.487c-0.538,-0.921 -0.546,-2.059 -0.022,-2.988c11.58,-20.519 59.545,-105.506 71.306,-126.346Z"}})]),_c('div',{staticClass:"afp-dangerNumbers"},[_c('span',{class:{'afp-extremeText':(_vm.danger.upper == 5)}},[_vm._v(_vm._s(_vm.danger.upper))]),_c('span',{class:{'afp-extremeText':(_vm.danger.middle == 5)}},[_vm._v(_vm._s(_vm.danger.middle))]),_c('span',{class:{'afp-extremeText':(_vm.danger.lower == 5)}},[_vm._v(_vm._s(_vm.danger.lower))])])])}
var DangerElevationMobilevue_type_template_id_62f1bab0_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DangerElevationMobile.vue?vue&type=template&id=62f1bab0&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DangerElevationMobile.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var DangerElevationMobilevue_type_script_lang_js_ = ({
  data: function data() {
    return {
      dangerColor: ['#cccccc', '#50b849', '#fef200', '#f7941d', '#ed1b24', '#000000']
    };
  },
  props: ['danger']
});
// CONCATENATED MODULE: ./src/components/DangerElevationMobile.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DangerElevationMobilevue_type_script_lang_js_ = (DangerElevationMobilevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/DangerElevationMobile.vue?vue&type=style&index=0&id=62f1bab0&scoped=true&lang=scss&
var DangerElevationMobilevue_type_style_index_0_id_62f1bab0_scoped_true_lang_scss_ = __webpack_require__("5871");

// CONCATENATED MODULE: ./src/components/DangerElevationMobile.vue






/* normalize component */

var DangerElevationMobile_component = normalizeComponent(
  components_DangerElevationMobilevue_type_script_lang_js_,
  DangerElevationMobilevue_type_template_id_62f1bab0_scoped_true_render,
  DangerElevationMobilevue_type_template_id_62f1bab0_scoped_true_staticRenderFns,
  false,
  null,
  "62f1bab0",
  null
  
)

/* harmony default export */ var DangerElevationMobile = (DangerElevationMobile_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DangerScale.vue?vue&type=template&id=f4e71c6c&scoped=true&
var DangerScalevue_type_template_id_f4e71c6c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-dangerScale afp-row"},[_c('div',{staticClass:"afp-col-lg-auto"},[_c('a',{staticClass:"afp-html-a",attrs:{"href":"https://avalanche.org/avalanche-encyclopedia/danger-scale/","target":"_blank"}},[_c('h5',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],staticClass:"afp-html-h5"},[_vm._v("\n                Danger Scale\n                "),_c('i',{staticClass:"mdi mdi-open-in-new"})])])]),_vm._m(0)])}
var DangerScalevue_type_template_id_f4e71c6c_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-col-lg"},[_c('ul',{staticClass:"afp-html-ul"},[_c('li',{staticClass:"afp-html-li afp-low"},[_vm._v("Low (1)")]),_c('li',{staticClass:"afp-html-li afp-mod"},[_vm._v("\n                Mod"),_c('span',[_vm._v("erate")]),_vm._v(" (2)\n            ")]),_c('li',{staticClass:"afp-html-li afp-cons"},[_vm._v("\n                Cons"),_c('span',[_vm._v("iderable")]),_vm._v(" (3)\n            ")]),_c('li',{staticClass:"afp-html-li afp-high"},[_vm._v("High (4)")]),_c('li',{staticClass:"afp-html-li afp-ext"},[_vm._v("\n                Extr"),_c('span',[_vm._v("eme")]),_vm._v(" (5)\n            ")])])])}]


// CONCATENATED MODULE: ./src/components/DangerScale.vue?vue&type=template&id=f4e71c6c&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DangerScale.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var DangerScalevue_type_script_lang_js_ = ({});
// CONCATENATED MODULE: ./src/components/DangerScale.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DangerScalevue_type_script_lang_js_ = (DangerScalevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/DangerScale.vue?vue&type=style&index=0&id=f4e71c6c&scoped=true&lang=scss&
var DangerScalevue_type_style_index_0_id_f4e71c6c_scoped_true_lang_scss_ = __webpack_require__("203a");

// CONCATENATED MODULE: ./src/components/DangerScale.vue






/* normalize component */

var DangerScale_component = normalizeComponent(
  components_DangerScalevue_type_script_lang_js_,
  DangerScalevue_type_template_id_f4e71c6c_scoped_true_render,
  DangerScalevue_type_template_id_f4e71c6c_scoped_true_staticRenderFns,
  false,
  null,
  "f4e71c6c",
  null
  
)

/* harmony default export */ var DangerScale = (DangerScale_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AvalancheDanger.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var AvalancheDangervue_type_script_lang_js_ = ({
  data: function data() {
    return {};
  },
  components: {
    DangerElevation: DangerElevation,
    DangerElevationMobile: DangerElevationMobile,
    DangerScale: DangerScale
  },
  props: ['danger', 'date', 'config'],
  computed: {
    currentDanger: function currentDanger() {
      var current = this.danger.find(function (current) {
        return current.valid_day == "current";
      });

      if (current.upper == null) {
        current.upper = 0;
      }

      if (current.middle == null) {
        current.middle = 0;
      }

      if (current.lower == null) {
        current.lower = 0;
      }

      return current;
    },
    outlookDanger: function outlookDanger() {
      if (this.danger.length > 1) {
        var outlook = this.danger.find(function (outlook) {
          return outlook.valid_day == "tomorrow";
        });

        if (outlook.upper == null) {
          outlook.upper = 0;
        }

        if (outlook.middle == null) {
          outlook.middle = 0;
        }

        if (outlook.lower == null) {
          outlook.lower = 0;
        }

        return outlook;
      } else {
        return false;
      }
    },
    todayDate: function todayDate() {
      if (moment(this.date).hours() > 12) {
        return moment(this.date).add(24, 'h').format('dddd, MMMM D, YYYY');
      } else {
        return moment(this.date).format('dddd, MMMM D, YYYY');
      }
    },
    outlookDate: function outlookDate() {
      if (moment(this.date).hours() > 12) {
        return moment(this.date).add(48, 'h').format('dddd, MMMM D, YYYY');
      } else {
        return moment(this.date).add(24, 'h').format('dddd, MMMM D, YYYY');
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/AvalancheDanger.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_AvalancheDangervue_type_script_lang_js_ = (AvalancheDangervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/AvalancheDanger.vue?vue&type=style&index=0&id=488d1bce&scoped=true&lang=scss&
var AvalancheDangervue_type_style_index_0_id_488d1bce_scoped_true_lang_scss_ = __webpack_require__("cd07");

// CONCATENATED MODULE: ./src/components/AvalancheDanger.vue






/* normalize component */

var AvalancheDanger_component = normalizeComponent(
  components_AvalancheDangervue_type_script_lang_js_,
  AvalancheDangervue_type_template_id_488d1bce_scoped_true_render,
  AvalancheDangervue_type_template_id_488d1bce_scoped_true_staticRenderFns,
  false,
  null,
  "488d1bce",
  null
  
)

/* harmony default export */ var AvalancheDanger = (AvalancheDanger_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AvalancheProblem.vue?vue&type=template&id=57612b72&scoped=true&
var AvalancheProblemvue_type_template_id_57612b72_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-problem afp-mb-4 afp-divider",attrs:{"id":'problem-' + _vm.problem.rank}},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("Avalanche Problem #"+_vm._s(_vm.problem.rank))]),_c('info',{attrs:{"content":this.$helpContent.avalancheProblem}}),_c('div',{staticClass:"afp-infoGraphics afp-row"},[_c('div',{staticClass:"afp-problem-column afp-col-lg-3 afp-col-6 afp-text-center afp-mb-3"},[_c('v-popover',[_c('img',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],staticClass:"afp-problemIcon",attrs:{"src":_vm.problem.icon}}),_c('template',{slot:"popover"},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.problem.problem_description)}})])],2),_c('div',{staticClass:"afp-problemText"},[_vm._v("\n                "+_vm._s(_vm.problem.name)+"\n                ")]),_c('h5',{staticClass:"afp-html-h5"},[_vm._v("\n                Problem Type\n                ")])],1),_c('div',{staticClass:"afp-problem-column afp-col-lg-3 afp-col-6 afp-text-center afp-mb-3"},[_c('locator-rose',{ref:"rose",staticClass:"location",attrs:{"config":_vm.config,"rank":_vm.problem.rank,"location":_vm.problem.location}}),_c('h5',{staticClass:"afp-html-h5"},[_vm._v("\n                Aspect/Elevation\n                ")])],1),_c('div',{staticClass:"afp-problem-column afp-col-lg-3 afp-col-6 afp-text-center afp-mb-3"},[_c('problem-slider',{key:"likelihood",attrs:{"options":_vm.likelihoodOptions,"labels":_vm.likelihoodLabels,"data":_vm.problem.likelihood}}),_c('h5',{staticClass:"afp-html-h5"},[_vm._v("\n                Likelihood\n                ")])],1),_c('div',{staticClass:"afp-problem-column afp-col-lg-3 afp-col-6 afp-text-center afp-mb-3"},[_c('problem-slider',{key:"size",attrs:{"options":_vm.sizeOptions,"labels":_vm.sizeLabels,"data":_vm.problem.size}}),_c('h5',{staticClass:"afp-html-h5"},[_vm._v("\n                Size\n                ")])],1)]),(_vm.problem.media.url !='' && _vm.problem.media.type == 'photo' )?_c('figure',{staticClass:"afp-html-figure afp-print-hide"},[_c('div',{staticClass:"afp-imageContainer afp-image-container"},[_c('img',{staticClass:"afp-html-img",attrs:{"src":_vm.problem.media.url,"alt":_vm.problem.media.caption,"data-pswp-src":_vm.problem.media.url,"data-pswp-title":_vm.problem.media.caption}})]),_c('figcaption',{staticClass:"afp-html-figcaption"},[_vm._v(_vm._s(_vm.problem.media.caption))])]):_vm._e(),(_vm.problem.media.url !='' && _vm.problem.media.type == 'video' )?_c('figure',{staticClass:"afp-html-figure afp-print-hide afp-video-modal"},[_c('div',{staticClass:"afp-imageContainer afp-image-container afp-video-container"},[_c('img',{staticClass:"afp-html-img",attrs:{"src":'https://img.youtube.com/vi/' + _vm.problem.media.url + '/mqdefault.jpg',"alt":_vm.problem.media.caption,"data-video-id":_vm.problem.media.url},on:{"click":function($event){_vm.videoModal = true}}})]),_c('figcaption',{staticClass:"afp-html-figcaption"},[_vm._v(_vm._s(_vm.problem.media.caption))])]):_vm._e(),_c('div',{staticClass:"afp-tinymce",domProps:{"innerHTML":_vm._s(_vm.problem.discussion)}})],1)}
var AvalancheProblemvue_type_template_id_57612b72_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/AvalancheProblem.vue?vue&type=template&id=57612b72&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LocatorRose.vue?vue&type=template&id=1de2e5cc&scoped=true&
var LocatorRosevue_type_template_id_1de2e5cc_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-rose"},[_c('div',{staticClass:"afp-roseContainer"},[_c('label',{staticClass:"afp-html-label afp-aspectMarker afp-north"},[_vm._v("N")]),_c('label',{staticClass:"afp-html-label afp-aspectMarker afp-east"},[_vm._v("E")]),_c('label',{staticClass:"afp-html-label afp-aspectMarker afp-south"},[_vm._v("S")]),_c('label',{staticClass:"afp-html-label afp-aspectMarker afp-west"},[_vm._v("W")]),_c('label',{staticClass:"afp-html-label afp-aspectMarker afp-northwest"},[_vm._v("NW")]),_c('label',{staticClass:"afp-html-label afp-aspectMarker afp-northeast"},[_vm._v("NE")]),_c('label',{staticClass:"afp-html-label afp-aspectMarker afp-southeast"},[_vm._v("SE")]),_c('label',{staticClass:"afp-html-label afp-aspectMarker afp-southwest"},[_vm._v("SW")]),_c('div',{staticClass:"afp-elevationMarker afp-elevationMarkerUpper"}),_c('div',{staticClass:"afp-elevationMarker afp-elevationMarkerMiddle"}),_c('div',{staticClass:"afp-elevationMarker afp-elevationMarkerLower"}),_c('div',{staticClass:"afp-elevationLabel afp-elevationLabelUpper"},[_vm._v(_vm._s(this.config.elevations.upper))]),_c('div',{staticClass:"afp-elevationLabel afp-elevationLabelMiddle"},[_vm._v(_vm._s(this.config.elevations.middle))]),_c('div',{staticClass:"afp-elevationLabel afp-elevationLabelLower"},[_vm._v(_vm._s(this.config.elevations.lower))]),_c('svg',{staticClass:"afp-rose-svg",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"1.5"},attrs:{"width":"100%","height":"100%","viewBox":"0 0 1050 1050","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"north upper","d":"M529.716,527l68.371,-166.7l-138.1,0l69.729,166.7Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"north middle","d":"M666.581,193.63l-277.081,0l69.27,166.67l138.541,0l69.27,-166.67Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"north lower","d":"M734.1,26.997l-414.2,0l69.943,166.67l275.865,0l68.392,-166.67Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"northeast upper","d":"M529.716,527l166.22,-69.529l-97.651,-97.652l-68.569,167.181Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"northeast middle","d":"M862.222,388.05l-195.925,-195.926l-68.873,166.835l97.963,97.963l166.835,-68.872Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"northeast lower","d":"M1027.79,317.966l-292.884,-292.884l-68.396,167.311l195.066,195.066l166.214,-69.493Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"east upper","d":"M527.716,528.339l166.7,68.371l0,-138.1l-166.7,69.729Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"east middle","d":"M861.086,665.204l0,-277.081l-166.67,69.27l0,138.541l166.67,69.27Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"east lower","d":"M1027.72,732.723l0,-414.2l-166.67,69.943l0,275.865l166.67,68.392Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"southeast upper","d":"M527.716,528.339l69.529,166.22l97.652,-97.651l-167.181,-68.569Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"southeast middle","d":"M666.666,860.845l195.926,-195.925l-166.835,-68.872l-97.963,97.962l68.872,166.835Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"southeast lower","d":"M736.75,1026.42l292.884,-292.884l-167.311,-68.396l-195.066,195.066l69.493,166.214Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"south upper","d":"M527.918,528.416l-68.371,166.7l138.1,0l-69.729,-166.7Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"south middle","d":"M391.053,861.786l277.081,0l-69.27,-166.67l-138.541,0l-69.27,166.67Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"south lower","d":"M323.534,1028.42l414.2,0l-69.943,-166.67l-275.865,0l-68.392,166.67Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"southwest upper","d":"M527.918,528.416l-166.22,69.529l97.651,97.652l68.569,-167.181Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"southwest middle","d":"M195.412,667.366l195.926,195.926l68.872,-166.835l-97.963,-97.963l-166.835,68.872Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"southwest lower","d":"M29.841,737.451l292.884,292.883l68.396,-167.31l-195.066,-195.067l-166.214,69.494Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"west upper","d":"M528.918,527.077l-166.7,-68.371l0,138.1l166.7,-69.729Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"west middle","d":"M195.548,390.212l0,277.081l166.67,-69.27l0,-138.541l-166.67,-69.27Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"west lower","d":"M28.915,322.693l0,414.2l166.67,-69.943l0,-275.865l-166.67,-68.392Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"northwest upper","d":"M529.918,527.077l-69.529,-166.22l-97.652,97.651l167.181,68.569Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"northwest middle","d":"M390.968,194.571l-195.926,195.926l166.835,68.872l97.963,-97.963l-68.872,-166.835Z"}}),_c('path',{style:('stroke: ' + _vm.borderColor + '; stroke-width: 10px; fill: transparent'),attrs:{"data-id":"northwest lower","d":"M318.884,27l-292.884,292.884l167.311,68.396l195.066,-195.066l-69.493,-166.214Z"}})])])])}
var LocatorRosevue_type_template_id_1de2e5cc_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/LocatorRose.vue?vue&type=template&id=1de2e5cc&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LocatorRose.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var LocatorRosevue_type_script_lang_js_ = ({
  data: function data() {
    return {
      borderColor: '#515558',
      fillColor: '#C8CACE'
    };
  },
  props: ['location', 'rank', 'config'],
  watch: {
    location: function location() {
      this.roseColor();
    }
  },
  methods: {
    roseColor: function roseColor() {
      var rose = document.querySelector('#problem-' + this.rank + ' .afp-rose svg');
      var color = this.fillColor;
      this.location.forEach(function (each) {
        rose.querySelector('[data-id="' + each + '"]').style.fill = color;
      });
    }
  },
  mounted: function mounted() {
    this.roseColor();
  }
});
// CONCATENATED MODULE: ./src/components/LocatorRose.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LocatorRosevue_type_script_lang_js_ = (LocatorRosevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/LocatorRose.vue?vue&type=style&index=0&id=1de2e5cc&scoped=true&lang=scss&
var LocatorRosevue_type_style_index_0_id_1de2e5cc_scoped_true_lang_scss_ = __webpack_require__("a96e");

// CONCATENATED MODULE: ./src/components/LocatorRose.vue






/* normalize component */

var LocatorRose_component = normalizeComponent(
  components_LocatorRosevue_type_script_lang_js_,
  LocatorRosevue_type_template_id_1de2e5cc_scoped_true_render,
  LocatorRosevue_type_template_id_1de2e5cc_scoped_true_staticRenderFns,
  false,
  null,
  "1de2e5cc",
  null
  
)

/* harmony default export */ var LocatorRose = (LocatorRose_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ProblemSlider.vue?vue&type=template&id=55595a33&scoped=true&
var ProblemSlidervue_type_template_id_55595a33_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-problemSlider"},[_c('div',{staticClass:"afp-rail"},[_vm._l((_vm.labels),function(label,index){return (label != '')?_c('div',{key:'step' + index,staticClass:"afp-step",style:('bottom: ' + index / (_vm.options.length - 1) * 100 + '%')}):_vm._e()}),_vm._l((_vm.labels),function(label,index){return _c('div',{key:'label' + index,staticClass:"afp-label",class:{'afp-active' : index >= _vm.markActive[0] && index <= _vm.markActive[1]},style:('bottom: ' + index / (_vm.options.length - 1) * 100 + '%')},[_vm._v(_vm._s(label))])}),_c('div',{staticClass:"afp-process",style:('bottom: calc(' + _vm.markActive[0] / (_vm.options.length - 1) * 100 + '% - 4px); top: calc(' + (100 - (_vm.markActive[1] / (_vm.options.length - 1) * 100)) + '% - 4px)')})],2)])}
var ProblemSlidervue_type_template_id_55595a33_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ProblemSlider.vue?vue&type=template&id=55595a33&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find-index.js
var es6_array_find_index = __webpack_require__("20d6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ProblemSlider.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ProblemSlidervue_type_script_lang_js_ = ({
  data: function data() {
    return {
      borderColor: '#C8CACE',
      fillColor: '#515558'
    };
  },
  props: ['options', 'labels', 'data'],
  computed: {
    markActive: function markActive() {
      var _this = this;

      if (typeof this.data == 'string') {
        return [this.options.findIndex(function (x) {
          return x == _this.data;
        }), this.options.findIndex(function (x) {
          return x == _this.data;
        })];
      } else {
        return [this.options.findIndex(function (x) {
          return x == _this.data[0];
        }), this.options.findIndex(function (x) {
          return x == _this.data[1];
        })];
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/ProblemSlider.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ProblemSlidervue_type_script_lang_js_ = (ProblemSlidervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ProblemSlider.vue?vue&type=style&index=0&id=55595a33&scoped=true&lang=scss&
var ProblemSlidervue_type_style_index_0_id_55595a33_scoped_true_lang_scss_ = __webpack_require__("8f11");

// CONCATENATED MODULE: ./src/components/ProblemSlider.vue






/* normalize component */

var ProblemSlider_component = normalizeComponent(
  components_ProblemSlidervue_type_script_lang_js_,
  ProblemSlidervue_type_template_id_55595a33_scoped_true_render,
  ProblemSlidervue_type_template_id_55595a33_scoped_true_staticRenderFns,
  false,
  null,
  "55595a33",
  null
  
)

/* harmony default export */ var ProblemSlider = (ProblemSlider_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AvalancheProblem.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var AvalancheProblemvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      likelihoodOptions: ['unlikely', 'possible', 'likely', 'very likely', 'almost certain'],
      likelihoodLabels: ['Unlikely', 'Possible', 'Likely', 'Very Likely', 'Almost Certain'],
      sizeOptions: ['1', '1.5', '2', '2.5', '3', '3.5', '4'],
      sizeLabels: ['Small (D1)', '', 'Large (D2)', '', 'Very Large (D3) ', '', 'Historic (D4-5)']
    };
  },
  components: {
    LocatorRose: LocatorRose,
    ProblemSlider: ProblemSlider
  },
  props: ['problem', 'config'],
  mounted: function mounted() {}
});
// CONCATENATED MODULE: ./src/components/AvalancheProblem.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_AvalancheProblemvue_type_script_lang_js_ = (AvalancheProblemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/AvalancheProblem.vue?vue&type=style&index=0&id=57612b72&scoped=true&lang=scss&
var AvalancheProblemvue_type_style_index_0_id_57612b72_scoped_true_lang_scss_ = __webpack_require__("cbda");

// CONCATENATED MODULE: ./src/components/AvalancheProblem.vue






/* normalize component */

var AvalancheProblem_component = normalizeComponent(
  components_AvalancheProblemvue_type_script_lang_js_,
  AvalancheProblemvue_type_template_id_57612b72_scoped_true_render,
  AvalancheProblemvue_type_template_id_57612b72_scoped_true_staticRenderFns,
  false,
  null,
  "57612b72",
  null
  
)

/* harmony default export */ var AvalancheProblem = (AvalancheProblem_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MediaGallery.vue?vue&type=template&id=46d985aa&scoped=true&
var MediaGalleryvue_type_template_id_46d985aa_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-media-gallery"},[_c('h2',{staticClass:"afp-html-h2"},[_vm._v("Media")]),_c('div',{staticClass:"afp-owl-carousel afp-owl-theme"},_vm._l((_vm.media),function(item,index){return _c('div',{key:index,staticClass:"afp-galleryItem"},[(item.type == 'photo')?_c('div',{staticClass:"afp-image-container afp-galleryImgContainer"},[_c('img',{staticClass:"afp-galleryImg",attrs:{"src":item.url,"alt":item.caption,"data-pswp-title":item.caption,"data-pswp-src":item.url}})]):_vm._e(),(item.type == 'video')?_c('div',{staticClass:"afp-image-container afp-galleryImgContainer afp-video-container afp-video-modal"},[_c('img',{staticClass:"afp-galleryImg",attrs:{"src":'https://img.youtube.com/vi/' + item.url + '/mqdefault.jpg',"alt":item.caption,"data-video-id":item.url,"data-video-caption":item.caption}})]):_vm._e()])}),0)])}
var MediaGalleryvue_type_template_id_46d985aa_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/MediaGallery.vue?vue&type=template&id=46d985aa&scoped=true&

// EXTERNAL MODULE: ./node_modules/owl.carousel/dist/owl.carousel.js
var owl_carousel = __webpack_require__("555f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MediaGallery.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import JQuery from 'jquery'
// window.$ = JQuery
// import 'owl.carousel/dist/assets/owl.carousel.css'

/* harmony default export */ var MediaGalleryvue_type_script_lang_js_ = ({
  data: function data() {
    return {};
  },
  props: ['media'],
  methods: {},
  mounted: function mounted() {
    $('.afp-owl-carousel').owlCarousel({
      loop: false,
      nav: true,
      margin: 10,
      navText: ["<i class='mdi mdi-chevron-left-circle'></i>", "<i class='mdi mdi-chevron-right-circle'></i>"],
      slideBy: "page",
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 4
        }
      },
      refreshClass: "afp-owl-refresh",
      loadingClass: "afp-owl-loading",
      loadedClass: "afp-owl-loaded",
      dragClass: "afp-owl-drag",
      grabClass: "afp-owl-grab",
      stageClass: "afp-owl-stage",
      stageOuterClass: "afp-owl-stage-outer",
      navContainerClass: "afp-owl-nav",
      navClass: ["afp-owl-prev", "afp-owl-next"],
      dotClass: "afp-owl-dot",
      dotsClass: "afp-owl-dots",
      itemClass: "afp-owl-item"
    });
  }
});
// CONCATENATED MODULE: ./src/components/MediaGallery.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_MediaGalleryvue_type_script_lang_js_ = (MediaGalleryvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/MediaGallery.vue?vue&type=style&index=0&id=46d985aa&scoped=true&lang=scss&
var MediaGalleryvue_type_style_index_0_id_46d985aa_scoped_true_lang_scss_ = __webpack_require__("588d");

// CONCATENATED MODULE: ./src/components/MediaGallery.vue






/* normalize component */

var MediaGallery_component = normalizeComponent(
  components_MediaGalleryvue_type_script_lang_js_,
  MediaGalleryvue_type_template_id_46d985aa_scoped_true_render,
  MediaGalleryvue_type_template_id_46d985aa_scoped_true_staticRenderFns,
  false,
  null,
  "46d985aa",
  null
  
)

/* harmony default export */ var MediaGallery = (MediaGallery_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WeatherContent.vue?vue&type=template&id=2ee647ef&
var WeatherContentvue_type_template_id_2ee647ef_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.data.weather_discussion != ''),expression:"data.weather_discussion != ''"}],staticClass:"afp-tinymce afp-mb-3",domProps:{"innerHTML":_vm._s(_vm.data.weather_discussion)}}),_vm._l((_vm.data.weather_data),function(zone,index){return _c('div',{key:zone.zone_id,staticClass:"afp-print-hide"},[_c('weather-table',{key:index,attrs:{"periods":zone.periods,"data":zone.data,"zone":zone.zone_name}})],1)})],2)}
var WeatherContentvue_type_template_id_2ee647ef_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WeatherContent.vue?vue&type=template&id=2ee647ef&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WeatherTable.vue?vue&type=template&id=5ee41f76&scoped=true&
var WeatherTablevue_type_template_id_5ee41f76_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-weather-table afp-my-3"},[_c('table',{staticClass:"afp-html-table afp-table"},[_c('thead',[_c('tr',[_c('th',[_vm._v(_vm._s(_vm.zone))]),_vm._l((_vm.periods),function(heading,index){return _c('th',{key:index,domProps:{"innerHTML":_vm._s(heading)}})})],2)]),_c('tbody',_vm._l((_vm.data),function(row,rowIndex){return _c('tr',{key:rowIndex},[_c('td',[_c('label',{staticClass:"afp-html-label"},[_vm._v(_vm._s(row.field))]),(row.field == 'Ridgeline Wind Speed')?_c('info',{attrs:{"content":"<h5 class='afp-html-h5'>Ridgetop Wind Speed</h5><strong>CALM</strong> - No air motion. Smoke rises vertically.<br><strong>LIGHT</strong> - Light to gentle breeze, flags and twigs in motion.<br><strong>MODERATE</strong> - Fresh breeze. Small trees sway. Flags stretched. Snow begins to drift.<br><strong>STRONG</strong> - Strong breeze. Whole trees in motion.<br><strong>EXTREME</strong> - Gale force or higher. "}}):_vm._e(),(row.field == 'Snowfall')?_c('info',{attrs:{"content":"<h5 class='afp-html-h5'>Snowfall</h5>Values are estimates from middle and upper elevation.<br><strong>24hr</strong> - Snow total from yesterday morning through this morning.<br><strong>12hr</strong> - Snow total from last night through this morning."}}):_vm._e(),(row.field == 'Snow Water Equivalent')?_c('info',{attrs:{"content":"<h5 class='afp-html-h5'>Snow Water Equivalent (SWE)</h5>The depth of water that would result if you melted the snowfall. SWE is a better estimate of weight added to the snowpack than snowfall."}}):_vm._e()],1),_vm._l((row.values),function(column,index){return _c('td',{key:index},[(typeof column === 'string')?_c('span',[_vm._v("\n                        "+_vm._s(column)+"\n                        "),(row.unit != '' && column != '')?_c('span',[_vm._v(_vm._s(row.unit))]):_vm._e()]):_c('span',[_c('span',{staticClass:"afp-table-splitCell"},[_c('label',{staticClass:"afp-html-label"},[_vm._v(_vm._s(column[0].label)+":")]),_vm._v("\n                            "+_vm._s(column[0].value)+"\n                            "),(row.unit != '' && column[0].value != '')?_c('span',[_vm._v(_vm._s(row.unit))]):_vm._e()]),_c('span',{staticClass:"afp-table-splitCell"},[_c('label',{staticClass:"afp-html-label"},[_vm._v(_vm._s(column[1].label)+":")]),_vm._v("\n                            "+_vm._s(column[1].value)+"\n                            "),(row.unit != '' && column[1].value != '')?_c('span',[_vm._v(_vm._s(row.unit))]):_vm._e()])])])})],2)}),0)])])}
var WeatherTablevue_type_template_id_5ee41f76_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WeatherTable.vue?vue&type=template&id=5ee41f76&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WeatherTable.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var WeatherTablevue_type_script_lang_js_ = ({
  props: ['data', 'periods', 'zone']
});
// CONCATENATED MODULE: ./src/components/WeatherTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WeatherTablevue_type_script_lang_js_ = (WeatherTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/WeatherTable.vue?vue&type=style&index=0&id=5ee41f76&scoped=true&lang=scss&
var WeatherTablevue_type_style_index_0_id_5ee41f76_scoped_true_lang_scss_ = __webpack_require__("f536");

// CONCATENATED MODULE: ./src/components/WeatherTable.vue






/* normalize component */

var WeatherTable_component = normalizeComponent(
  components_WeatherTablevue_type_script_lang_js_,
  WeatherTablevue_type_template_id_5ee41f76_scoped_true_render,
  WeatherTablevue_type_template_id_5ee41f76_scoped_true_staticRenderFns,
  false,
  null,
  "5ee41f76",
  null
  
)

/* harmony default export */ var WeatherTable = (WeatherTable_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WeatherContent.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var WeatherContentvue_type_script_lang_js_ = ({
  props: ['data'],
  components: {
    ProductHeader: ProductHeader,
    WeatherTable: WeatherTable
  }
});
// CONCATENATED MODULE: ./src/components/WeatherContent.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WeatherContentvue_type_script_lang_js_ = (WeatherContentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/WeatherContent.vue





/* normalize component */

var WeatherContent_component = normalizeComponent(
  components_WeatherContentvue_type_script_lang_js_,
  WeatherContentvue_type_template_id_2ee647ef_render,
  WeatherContentvue_type_template_id_2ee647ef_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var WeatherContent = (WeatherContent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SynopsisContent.vue?vue&type=template&id=7a2900a3&
var SynopsisContentvue_type_template_id_7a2900a3_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('photoswipe',{key:"blog"},[_c('div',{staticClass:"afp-tinymce afp-mb-3",domProps:{"innerHTML":_vm._s(_vm.data.hazard_discussion)}}),(_vm.data.hasOwnProperty('media') && _vm.data.media.length > 0)?_c('media-gallery',{key:"synopsis",attrs:{"media":_vm.data.media}}):_vm._e(),(!_vm.preview)?_c('div',{staticClass:"afp-text-center afp-mb-3"},[_c('button',{staticClass:"afp-html-button afp-btn afp-btn-primary",on:{"click":function($event){return _vm.$router.replace({ name: 'ArchiveProduct', params: { product: 'blog' } })}}},[_vm._v("View Previous Posts")])]):_vm._e()],1)],1)}
var SynopsisContentvue_type_template_id_7a2900a3_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SynopsisContent.vue?vue&type=template&id=7a2900a3&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SynopsisContent.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var SynopsisContentvue_type_script_lang_js_ = ({
  data: function data() {
    return {};
  },
  props: ['data', 'config', 'preview'],
  components: {
    ProductHeader: ProductHeader,
    MediaGallery: MediaGallery
  }
});
// CONCATENATED MODULE: ./src/components/SynopsisContent.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SynopsisContentvue_type_script_lang_js_ = (SynopsisContentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/SynopsisContent.vue





/* normalize component */

var SynopsisContent_component = normalizeComponent(
  components_SynopsisContentvue_type_script_lang_js_,
  SynopsisContentvue_type_template_id_7a2900a3_render,
  SynopsisContentvue_type_template_id_7a2900a3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SynopsisContent = (SynopsisContent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomTab.vue?vue&type=template&id=37a03edc&
var CustomTabvue_type_template_id_37a03edc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-custom-tab-content afp-mb-3"},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}}),_c('loader',{attrs:{"show":!_vm.loaded}})],1)}
var CustomTabvue_type_template_id_37a03edc_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CustomTab.vue?vue&type=template&id=37a03edc&

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("795b");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    promise_default.a.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new promise_default.a(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Loader.vue?vue&type=template&id=91aae8c6&scoped=true&
var Loadervue_type_template_id_91aae8c6_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade"}},[(_vm.show)?_c('div',{staticClass:"afp-loader"},[_c('div',[_c('div'),_c('div'),_c('div')])]):_vm._e()])}
var Loadervue_type_template_id_91aae8c6_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Loader.vue?vue&type=template&id=91aae8c6&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Loader.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Loadervue_type_script_lang_js_ = ({
  props: ['show']
});
// CONCATENATED MODULE: ./src/components/Loader.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Loadervue_type_script_lang_js_ = (Loadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Loader.vue?vue&type=style&index=0&id=91aae8c6&scoped=true&lang=scss&
var Loadervue_type_style_index_0_id_91aae8c6_scoped_true_lang_scss_ = __webpack_require__("8e97");

// CONCATENATED MODULE: ./src/components/Loader.vue






/* normalize component */

var Loader_component = normalizeComponent(
  components_Loadervue_type_script_lang_js_,
  Loadervue_type_template_id_91aae8c6_scoped_true_render,
  Loadervue_type_template_id_91aae8c6_scoped_true_staticRenderFns,
  false,
  null,
  "91aae8c6",
  null
  
)

/* harmony default export */ var Loader = (Loader_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomTab.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//


/* harmony default export */ var CustomTabvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      content: '',
      loaded: false
    };
  },
  props: ['tab', 'url'],
  components: {
    Loader: Loader
  },
  mounted: function () {
    var _mounted = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios_default.a.get(this.url);

            case 3:
              response = _context.sent;
              this.content = response.data;
              this.loaded = true;
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              this.content = "<p class='afp-html-p afp-mb-3'>The content could not be loaded.</p>";
              this.loaded = true;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 8]]);
    }));

    function mounted() {
      return _mounted.apply(this, arguments);
    }

    return mounted;
  }()
});
// CONCATENATED MODULE: ./src/components/CustomTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CustomTabvue_type_script_lang_js_ = (CustomTabvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/CustomTab.vue





/* normalize component */

var CustomTab_component = normalizeComponent(
  components_CustomTabvue_type_script_lang_js_,
  CustomTabvue_type_template_id_37a03edc_render,
  CustomTabvue_type_template_id_37a03edc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CustomTab = (CustomTab_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Disclaimer.vue?vue&type=template&id=715b2552&scoped=true&
var Disclaimervue_type_template_id_715b2552_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var Disclaimervue_type_template_id_715b2552_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-disclaimer"},[_vm._v("\n    This information is provided by the U.S.D.A. Forest Service and describes general backcountry avalanche hazard and conditions.\n    "),_c('br'),_vm._v("It does not apply to ski areas and highways where avalanche mitigation is conducted.\n")])}]


// CONCATENATED MODULE: ./src/components/Disclaimer.vue?vue&type=template&id=715b2552&scoped=true&

// EXTERNAL MODULE: ./src/components/Disclaimer.vue?vue&type=style&index=0&id=715b2552&scoped=true&lang=scss&
var Disclaimervue_type_style_index_0_id_715b2552_scoped_true_lang_scss_ = __webpack_require__("7608");

// CONCATENATED MODULE: ./src/components/Disclaimer.vue

var Disclaimer_script = {}



/* normalize component */

var Disclaimer_component = normalizeComponent(
  Disclaimer_script,
  Disclaimervue_type_template_id_715b2552_scoped_true_render,
  Disclaimervue_type_template_id_715b2552_scoped_true_staticRenderFns,
  false,
  null,
  "715b2552",
  null
  
)

/* harmony default export */ var Disclaimer = (Disclaimer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ForecastProduct.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//














/* harmony default export */ var ForecastProductvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      tabsForecast: [{
        id: "forecast",
        name: "Avalanche Forecast"
      }, {
        id: "weather",
        name: "Weather Forecast"
      }],
      tabsSummary: [{
        id: "forecast",
        name: "Avalanche Information"
      }, {
        id: "weather",
        name: "Weather Summary"
      }],
      tabsForecastPreview: [{
        id: "forecast",
        name: "Avalanche Forecast"
      }],
      tabsSummaryPreview: [{
        id: "forecast",
        name: "Avalanche Information"
      }, {
        id: "weatherSummary",
        name: "Weather Summary"
      }],
      tabSelected: 'forecast',
      centerMeta: this.$centerMeta
    };
  },
  computed: {
    highestDanger: function highestDanger() {
      if (this.data.product_type == 'forecast') {
        var current = this.data.danger.find(function (current) {
          return current.valid_day == "current";
        });
        return Math.max(current.lower, current.middle, current.upper);
      } else {
        return 0;
      }
    }
  },
  props: ['preview', 'data', 'config', 'zone'],
  components: {
    ZoneSelector: ZoneSelector,
    ProductHeader: ProductHeader,
    AvyWarning: AvyWarning,
    BottomLine: BottomLine,
    Tabs: Tabs,
    ContentPanel: ContentPanel,
    AvalancheDanger: AvalancheDanger,
    AvalancheProblem: AvalancheProblem,
    MediaGallery: MediaGallery,
    WeatherContent: WeatherContent,
    WeatherTable: WeatherTable,
    SynopsisContent: SynopsisContent,
    CustomTab: CustomTab,
    Disclaimer: Disclaimer
  },
  methods: {
    changeTab: function changeTab(tab) {
      this.tabSelected = tab; // this.$router.push({ query: { nav: this.tabSelected } })
    },
    scrollToTabs: function scrollToTabs(tab) {
      this.tabSelected = tab;
      document.getElementById("tabs").scrollIntoView();
    }
  },
  mounted: function mounted() {}
});
// CONCATENATED MODULE: ./src/components/ForecastProduct.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ForecastProductvue_type_script_lang_js_ = (ForecastProductvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ForecastProduct.vue?vue&type=style&index=0&id=4538c332&scoped=true&lang=scss&
var ForecastProductvue_type_style_index_0_id_4538c332_scoped_true_lang_scss_ = __webpack_require__("020e");

// CONCATENATED MODULE: ./src/components/ForecastProduct.vue






/* normalize component */

var ForecastProduct_component = normalizeComponent(
  components_ForecastProductvue_type_script_lang_js_,
  ForecastProductvue_type_template_id_4538c332_scoped_true_render,
  ForecastProductvue_type_template_id_4538c332_scoped_true_staticRenderFns,
  false,
  null,
  "4538c332",
  null
  
)

/* harmony default export */ var ForecastProduct = (ForecastProduct_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WeatherProduct.vue?vue&type=template&id=16975926&
var WeatherProductvue_type_template_id_16975926_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._m(0),_c('product-header',{attrs:{"preview":_vm.preview,"published":_vm.data.published_time,"expires":false,"author":_vm.data.author}}),_c('content-panel',[_c('weather-content',{attrs:{"data":_vm.data}})],1),_c('disclaimer')],1)}
var WeatherProductvue_type_template_id_16975926_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"afp-mb-3"},[_c('h1',{staticClass:"afp-html-h1"},[_vm._v("Weather Forecast")]),_c('h2',{staticClass:"afp-html-h2 afp-gray-700 afp-zone-title"},[_c('i',{staticClass:"mdi mdi-map-marker"}),_vm._v("All Zones\n        ")])])}]


// CONCATENATED MODULE: ./src/components/WeatherProduct.vue?vue&type=template&id=16975926&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WeatherProduct.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var WeatherProductvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      date: ''
    };
  },
  props: ['preview', 'data', 'config'],
  components: {
    ProductHeader: ProductHeader,
    ContentPanel: ContentPanel,
    WeatherContent: WeatherContent,
    Disclaimer: Disclaimer
  }
});
// CONCATENATED MODULE: ./src/components/WeatherProduct.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WeatherProductvue_type_script_lang_js_ = (WeatherProductvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/WeatherProduct.vue





/* normalize component */

var WeatherProduct_component = normalizeComponent(
  components_WeatherProductvue_type_script_lang_js_,
  WeatherProductvue_type_template_id_16975926_render,
  WeatherProductvue_type_template_id_16975926_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var WeatherProduct = (WeatherProduct_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SynopsisProduct.vue?vue&type=template&id=1066a550&
var SynopsisProductvue_type_template_id_1066a550_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"afp-mb-3"},[_c('h1',{staticClass:"afp-html-h1"},[_vm._v("Conditions Blog")]),_c('h2',{staticClass:"afp-html-h2 afp-gray-700",domProps:{"innerHTML":_vm._s(_vm.data.bottom_line)}})]),_c('product-header',{attrs:{"preview":_vm.preview,"published":_vm.data.published_time,"expires":false,"author":_vm.data.author}}),_c('content-panel',[_c('synopsis-content',{attrs:{"data":_vm.data,"preview":_vm.preview}})],1),_c('disclaimer')],1)}
var SynopsisProductvue_type_template_id_1066a550_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SynopsisProduct.vue?vue&type=template&id=1066a550&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SynopsisProduct.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var SynopsisProductvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      date: ''
    };
  },
  props: ['preview', 'data', 'config'],
  components: {
    ProductHeader: ProductHeader,
    ContentPanel: ContentPanel,
    SynopsisContent: SynopsisContent,
    Disclaimer: Disclaimer
  }
});
// CONCATENATED MODULE: ./src/components/SynopsisProduct.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SynopsisProductvue_type_script_lang_js_ = (SynopsisProductvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/SynopsisProduct.vue





/* normalize component */

var SynopsisProduct_component = normalizeComponent(
  components_SynopsisProductvue_type_script_lang_js_,
  SynopsisProductvue_type_template_id_1066a550_render,
  SynopsisProductvue_type_template_id_1066a550_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SynopsisProduct = (SynopsisProduct_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VideoModal.vue?vue&type=template&id=006085b8&scoped=true&
var VideoModalvue_type_template_id_006085b8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"zoom"}},[(_vm.show)?_c('div',{staticClass:"afp-videoModal",on:{"click":function($event){return _vm.$emit('close')}}},[_c('div',{staticClass:"afp-videoContainer"},[_c('iframe',{attrs:{"src":'https://www.youtube.com/embed/' + _vm.id + '?autoplay=1',"frameborder":"0","allow":"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture","allowfullscreen":""}})]),_c('i',{staticClass:"mdi mdi-close"}),_c('div',{staticClass:"afp-videoCaption"},[_c('div',[_vm._v(_vm._s(_vm.caption))])])]):_vm._e()])}
var VideoModalvue_type_template_id_006085b8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VideoModal.vue?vue&type=template&id=006085b8&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VideoModal.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var VideoModalvue_type_script_lang_js_ = ({
  // data() {
  //     return {
  //         show: false,
  //     }
  // },
  props: ['show', 'id', 'caption']
});
// CONCATENATED MODULE: ./src/components/VideoModal.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VideoModalvue_type_script_lang_js_ = (VideoModalvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/VideoModal.vue?vue&type=style&index=0&id=006085b8&scoped=true&lang=scss&
var VideoModalvue_type_style_index_0_id_006085b8_scoped_true_lang_scss_ = __webpack_require__("376f");

// CONCATENATED MODULE: ./src/components/VideoModal.vue






/* normalize component */

var VideoModal_component = normalizeComponent(
  components_VideoModalvue_type_script_lang_js_,
  VideoModalvue_type_template_id_006085b8_scoped_true_render,
  VideoModalvue_type_template_id_006085b8_scoped_true_staticRenderFns,
  false,
  null,
  "006085b8",
  null
  
)

/* harmony default export */ var VideoModal = (VideoModal_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ForecastPlugin.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//import moment from 'moment'




/* harmony default export */ var ForecastPluginvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      forecastData: {},
      videoModal: false,
      videoCaption: '',
      videoId: ''
    };
  },
  props: {
    data: {
      type: Object
    },
    preview: {
      type: Boolean,
      default: false
    },
    product: {
      type: String,
      default: 'forecast'
    },
    zone: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: function _default() {
        return {
          elevations: {
            upper: "Upper Elevation",
            middle: "Middle Elevation",
            lower: "Lower Elevation"
          },
          assets: {
            icons: true,
            photoswipe: true
          }
        };
      }
    }
  },
  components: {
    ForecastProduct: ForecastProduct,
    WeatherProduct: WeatherProduct,
    SynopsisProduct: SynopsisProduct,
    VideoModal: VideoModal
  },
  methods: {
    tineMCEclass: function tineMCEclass(search) {
      // Add AFP specific classes to TinyMCE tags
      search = JSON.stringify(search);
      search = search.replace(/<p/g, '<p class=\\"afp-html-p\\"').replace(/<a/g, '<a class=\\"afp-html-a\\"').replace(/<hr>/g, '<hr class=\\"afp-html-hr\\">').replace(/<table/g, '<table class=\\"afp-html-table\\"').replace(/<figure class=\\"/g, '<figure class=\\"afp-html-figure afp-tinymce-figure ').replace(/<img/g, '<img class=\\"afp-html-img afp-tinymce-img\\"').replace(/<h1>/g, '<h1 class=\\"afp-html-h1\\">').replace(/<h2>/g, '<h2 class=\\"afp-html-h2\\">').replace(/<h3>/g, '<h3 class=\\"afp-html-h3\\">').replace(/<h4>/g, '<h4 class=\\"afp-html-h4\\">').replace(/<h5>/g, '<h5 class=\\"afp-html-h5\\">').replace(/<h6>/g, '<h6 class=\\"afp-html-h6\\">').replace(/<ul>/g, '<ul class=\\"afp-html-ul\\">').replace(/<li>/g, '<li class=\\"afp-html-li\\">').replace(/<iframe/g, '<iframe class=\\"afp-html-iframe afp-tinymce-iframe\\"');
      return JSON.parse(search);
    }
  },
  mounted: function mounted() {
    this.forecastData = this.data;
    this.forecastData = this.tineMCEclass(this.forecastData);
    this.$nextTick(function () {
      var _this = this;

      // add event listener to open video modal
      var videos = document.querySelectorAll('.afp-video-modal');
      videos.forEach(function (el) {
        var caption = el.getElementsByTagName('figcaption');

        if (caption.length != 0) {
          var image = el.getElementsByTagName('img');
          caption = caption[0].innerHTML;
          image[0].setAttribute('data-video-caption', caption);
        }

        el.addEventListener('click', function (event) {
          _this.videoId = event.target.dataset.videoId;
          _this.videoCaption = event.target.dataset.videoCaption;
          _this.videoModal = true;
        });
      }); // add data atttributes to figures to open in photoswipe

      var figures = document.querySelectorAll('.afp-photoswipe');
      figures.forEach(function (figure) {
        var caption = figure.getElementsByTagName('figcaption');
        var image = figure.getElementsByTagName('img');
        caption = caption[0].innerHTML;
        image[0].setAttribute('data-pswp-title', caption);
        image[0].setAttribute('data-pswp-src', image[0].src);
      });
    });
  }
});
// CONCATENATED MODULE: ./src/components/ForecastPlugin.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ForecastPluginvue_type_script_lang_js_ = (ForecastPluginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ForecastPlugin.vue?vue&type=style&index=0&lang=scss&
var ForecastPluginvue_type_style_index_0_lang_scss_ = __webpack_require__("6238");

// EXTERNAL MODULE: ./src/components/ForecastPlugin.vue?vue&type=style&index=1&id=6338e63e&scoped=true&lang=scss&
var ForecastPluginvue_type_style_index_1_id_6338e63e_scoped_true_lang_scss_ = __webpack_require__("a4ad");

// CONCATENATED MODULE: ./src/components/ForecastPlugin.vue







/* normalize component */

var ForecastPlugin_component = normalizeComponent(
  components_ForecastPluginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6338e63e",
  null
  
)

/* harmony default export */ var ForecastPlugin = (ForecastPlugin_component.exports);
// EXTERNAL MODULE: ./node_modules/vue-pswipe/dist/Photoswipe.umd.min.js
var Photoswipe_umd_min = __webpack_require__("71a5");
var Photoswipe_umd_min_default = /*#__PURE__*/__webpack_require__.n(Photoswipe_umd_min);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7b2dd43c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/InfoPopover.vue?vue&type=template&id=0eb95642&scoped=true&
var InfoPopovervue_type_template_id_0eb95642_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-popover',{staticClass:"afp-popover-trigger"},[_c('button',{directives:[{name:"tooltip",rawName:"v-tooltip",value:('Click to learn more'),expression:"'Click to learn more'"}],staticClass:"afp-html-button afp-btn"},[_c('i',{staticClass:"mdi mdi-information-variant"})]),_c('template',{slot:"popover"},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}})])],2)}
var InfoPopovervue_type_template_id_0eb95642_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/InfoPopover.vue?vue&type=template&id=0eb95642&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/InfoPopover.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var InfoPopovervue_type_script_lang_js_ = ({
  components: {},
  props: ['content']
});
// CONCATENATED MODULE: ./src/components/InfoPopover.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_InfoPopovervue_type_script_lang_js_ = (InfoPopovervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/InfoPopover.vue?vue&type=style&index=0&id=0eb95642&scoped=true&lang=scss&
var InfoPopovervue_type_style_index_0_id_0eb95642_scoped_true_lang_scss_ = __webpack_require__("e2cc");

// CONCATENATED MODULE: ./src/components/InfoPopover.vue






/* normalize component */

var InfoPopover_component = normalizeComponent(
  components_InfoPopovervue_type_script_lang_js_,
  InfoPopovervue_type_template_id_0eb95642_scoped_true_render,
  InfoPopovervue_type_template_id_0eb95642_scoped_true_staticRenderFns,
  false,
  null,
  "0eb95642",
  null
  
)

/* harmony default export */ var InfoPopover = (InfoPopover_component.exports);
// EXTERNAL MODULE: ./node_modules/v-tooltip/dist/v-tooltip.esm.js
var v_tooltip_esm = __webpack_require__("e37d");

// CONCATENATED MODULE: ./src/plugin.js






/* harmony default export */ var src_plugin = ({
  install: function install(Vue, options) {
    // Register components
    Vue.component('forecast-view', ForecastPlugin);
    Vue.component('info', InfoPopover); // Filters

    Vue.filter('publicDate', function (value) {
      if (value) {
        return moment(value).format('dddd, MMMM D, YYYY - h:mmA');
      }
    });
    Vue.filter('capitalize', function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }); // Tooltips

    Vue.use(v_tooltip_esm["a" /* default */], {
      defaultPlacement: 'bottom',
      defaultClass: '',
      defaultTemplate: '<div class="afp-tooltip" role="tooltip"><div class="afp-tooltip-arrow"></div><div class="afp-tooltip-inner"></div></div>',
      defaultArrowSelector: '.afp-tooltip-arrow, .afp-tooltip__arrow',
      defaultInnerSelector: '.afp-tooltip-inner, .afp-tooltip__inner',
      defaultDelay: 400,
      defaultTrigger: 'hover',
      defaultOffset: 0,
      defaultContainer: '.afp-forecast-view',
      popover: {
        defaultPlacement: 'bottom',
        defaultClass: '',
        defaultBaseClass: 'afp-popover',
        defaultWrapperClass: 'afp-wrapper',
        defaultInnerClass: 'afp-popover-body',
        defaultArrowClass: 'afp-popover-arrow',
        defaultOpenClass: 'afp-popover-open',
        defaultContainer: '.afp-forecast-view'
      }
    }); // Photoswipe

    Vue.use(Photoswipe_umd_min_default.a, {
      shareEl: false,
      history: false,
      clickToCloseNonZoomable: false,
      bgOpacity: 0.9,
      allowPanToNext: false,
      mainClass: 'afp-photoswipe'
    }); // Load content for help popovers

    Vue.prototype.$helpContent = {
      dangerScale: 'The <a class="afp-html-a afp-native-link" href="https://avalanche.org/avalanche-encyclopedia/danger-scale/" target="_blank">North American Avalanche Danger Scale</a> is a tool used by avalanche forecasters to communicate the potential for avalanches to cause harm or injury to backcountry travelers.',
      avalancheDanger: '<p class="afp-html-p"><strong>Avalanche Danger</strong> is a tool used by avalanche forecasters to communicate the potential for avalanches to cause harm or injury to backcountry travelers.</p><p class="afp-html-p">Watch this <a class="afp-html-a afp-native-link" href="https://avalanche.org/avalanche-encyclopedia/danger-scale/"" target="_blank">video</a> to learn more about Avalanche Danger.</p>',
      avalancheDangerOutlook: '<p class="afp-html-p">The <strong>Outlook</strong> is different than today\'s Forecast. The Outlook has a higher level of uncertainty but can still communicate expected danger trends over time.</p>',
      avalancheProblem: '<p class="afp-html-p"><strong>Avalanche Problems</strong> use four factors to give a more nuanced description of the days avalanche conditions: the type of potential avalanche, it\'s location in the terrain, the likelihood of triggering it, and the potential size of the avalanche.</p><p class="afp-html-p">Watch this <a class="afp-html-a afp-native-link" href="https://avalanche.org/avalanche-encyclopedia/avalanche-problem/" target="_blank">video</a> to learn more about Avalanche Problems.</p>',
      problemType: '<p class="afp-html-p">Avalanche Problems are categories of avalanche activity. The Problems may not describe all avalanche activity you might observe, but they categorize the avalanches by how we manage the risk in the terrain. This approach focuses on relevant observations you can make in the field and how to treat the avalanche risk.</p><p class="afp-html-p">The forecasts list up to three current Problems, along with the spatial distribution, the likelihood of avalanches, and anticipated size. Forecasters may provide specific details to a Problem in the Discussion tab.</p><p class="afp-html-p">This <a class="afp-html-a afp-native-link" href="https://avalanche.org/avalanche-encyclopedia/avalanche-problem/" target="_blank">link</a> has detailed descriptions of each Avalanche Problem and suggestions for risk treatment.</p>',
      problemLocation: 'The Aspect/Elevation diagram describes the spatial pattern of the Avalanche Problem by aspect (the direction a slope faces) and elevation band (Above, Near, or Below Treeline). The diagram will be filled with black where the Avalanche Problem may exist. You can view the diagram as you would a mountain on a topographic map. The outer ring represents the Below Treeline elevation band, middle ring Near Treeline, and the inner ring Above Treeline. The diagram is oriented like a compass, with the top wedges representing north aspects, the left wedges representing west, etc.',
      problemLikelihood: 'Likelihood is a description of the chance of encountering a particular Avalanche Problem. It combines the spatial distribution of the Problem and the sensitivity or ease of triggering an avalanche. The spatial distribution indicates how likely you are to encounter the Problem in the highlighted avalanche terrain. The sensitivity indicates how easy it is to trigger avalanches including both natural and human triggered avalanches.',
      problemSize: 'Size is based on the destructive potential of avalanches. SMALL avalanches are relatively harmless to people unless they push you into a terrain trap. LARGE avalanches could bury, injure or kill a person. VERY LARGE avalanches could bury cars, destroy a house, or break trees. HISTORIC avalanches are even more destructive, and nearing the maximum size the slope could produce.'
    }; // Danger scale info

    Vue.prototype.$dangerScale = [{
      level: 0,
      rating: "No Rating",
      advice: "Insufficient data for issuing of danger ratings, but a summary of avalanche conditions exists. Read the summary for more information.",
      icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/no.png"
    }, {
      level: 1,
      rating: "Low",
      advice: "<strong>TRAVEL ADVICE</strong><BR>Generally safe avalanche conditions. Watch for unstable snow on isolated terrain features.",
      icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/low.png"
    }, {
      level: 2,
      rating: "Moderate",
      advice: "<strong>TRAVEL ADVICE</strong><BR>Heightened avalanche conditions on specific terrain features. Evaluate snow and terrain carefully; identify features of concern.",
      icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/moderate.png"
    }, {
      level: 3,
      rating: "Considerable",
      advice: "<strong>TRAVEL ADVICE</strong><BR>Dangerous avalanche conditions. Careful snowpack evaluation, cautious route-finding and conservative decision-making essential.",
      icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/considerable.png"
    }, {
      level: 4,
      rating: "High",
      advice: "<strong>TRAVEL ADVICE</strong><BR>Very dangerous avalanche conditions. Travel in avalanche terrain <em>not</em> recommended.",
      icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/high.png"
    }, {
      level: 5,
      rating: "Extreme",
      advice: "<strong>TRAVEL ADVICE</strong><BR>Avoid all avalanche terrain.",
      icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/extreme.png"
    }];
  }
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_plugin);



/***/ }),

/***/ "ff62":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tabs_vue_vue_type_style_index_0_id_69d38e43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4d0a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tabs_vue_vue_type_style_index_0_id_69d38e43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tabs_vue_vue_type_style_index_0_id_69d38e43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tabs_vue_vue_type_style_index_0_id_69d38e43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ffd7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/moment/src/lib/utils/extend.js
var extend = __webpack_require__("3031");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/utc.js
var utc = __webpack_require__("90e5");

// EXTERNAL MODULE: ./node_modules/moment/src/lib/create/parsing-flags.js
var parsing_flags = __webpack_require__("0a9d");

// CONCATENATED MODULE: ./node_modules/moment/src/lib/utils/some.js
var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}



// CONCATENATED MODULE: ./node_modules/moment/src/lib/create/valid.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createInvalid; });





function isValid(m) {
    if (m._isValid == null) {
        var flags = Object(parsing_flags["a" /* default */])(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = Object(utc["a" /* createUTC */])(NaN);
    if (flags != null) {
        Object(extend["a" /* default */])(Object(parsing_flags["a" /* default */])(m), flags);
    }
    else {
        Object(parsing_flags["a" /* default */])(m).userInvalidated = true;
    }

    return m;
}


/***/ })

/******/ });