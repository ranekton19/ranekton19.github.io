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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function(){\n\n\n  //Navigation beetwen sections\n  $(\".menu\").on(\"click\",\"a\", function (event) {\n    event.preventDefault();\n    var id  = $(this).attr('href'),\n      top = $(id).offset().top;\n    $('body,html').animate({scrollTop: top}, 1500);\n  });\n\n\n  //afisha\n  const imagesPath = 'images/'\n  const imagesNameBase = 'afisha';\n  const imageFormat = '.jpg';\n  const imageNumber = 10;\n  const imagesNames = []\n\n  Array.from(Array(imageNumber)).forEach((x, i) => {\n    imagesNames.push(imagesPath + imagesNameBase + (i + 1) + imageFormat);\n  });\n\n  console.log(imagesNames);\n\n\n  function imageExists(imageUrl){\n\n    var http = new XMLHttpRequest();\n\n    http.open('HEAD', imageUrl, false);\n    http.send();\n\n    return http.status != 404;\n\n  }\n\n  function takeAfisha(url){\n    if (imageExists(url)) {\n      return url\n    } else {\n      return false;\n    }\n  }\n\n  const availableImages = imagesNames.filter( imageUrl => {\n    return takeAfisha(imageUrl);\n  });\n\n  let slideCounter = 1;\n  let image = $('.advert-block-afisha img');\n  function changeImage(imageNumber){\n    image.fadeOut(250, function () {\n      $('.advert-block-afisha img').attr('src', availableImages[imageNumber]);\n      image.fadeIn(750);\n    });\n  }\n\n  if(availableImages.length > 1){\n    setInterval(function(){\n      if( slideCounter < availableImages.length) {\n        changeImage(slideCounter);\n        slideCounter++\n      } else {\n        changeImage(0);\n        slideCounter = 1;\n      }\n    },5000)\n  }\n\n\n  //weather\n  const lat = 49.586614\n  const lon = 24.060366\n  const APIKEY = 'a471d8f82d27fd75533d89916ac2b274';\n  const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';\n  const getWeatherIconUrl = iconNumber => `http://openweathermap.org/img/w/${iconNumber}.png`;\n\n  $.ajax({\n    url: weatherUrl,\n    data: {\n      lat:lat,\n      lon:lon,\n      lang:'uk',\n      units:'metric',\n      APPID:APIKEY\n    }\n  }).done((result) => {\n    const { description, icon }= result.weather[0];\n    const { main: {temp} } = result;\n    const imageUrl = getWeatherIconUrl(icon);\n    const weatherEl = $('#weather');\n    \n    weatherEl.css('background-image', `url(${imageUrl}`);\n    //weatherEl.find('.title').html(description);\n    weatherEl.find('.description').html(`${description}, ${temp} C`);\n  }).error((result) => {\n\n  });\n\n\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"style.css\";\n\n//# sourceURL=webpack:///./src/style.scss?");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi ./src/index.js ./src/style.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/style.scss */\"./src/style.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/style.scss?");

/***/ })

/******/ });