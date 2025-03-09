/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isWebp": () => (/* binding */ isWebp)
/* harmony export */ });
// проверка поддержки webp, добавление класса webp или no-webp
function isWebp() {
   //проверка поддержки webp
   function testWebP(callback) {

      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   //добавление класса
   testWebP(function (support) {
      if (support == true) {
         document.querySelector('body').classList.add('webp');
      } else {
         document.querySelector('body').classList.add('no-webp');
      }
   });
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();

/*------------------------------Home анимация текста---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const textElements = document.querySelectorAll(".animation-text span");

   if (textElements.length === 0) return;

   function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   function animateText(element) {
      element.classList.add("anim");
      setTimeout(() => {
         element.classList.remove("anim");
      }, 3000);
   }

   function startAnimations() {
      const activeCount = getRandomInt(5, 10);

      for (let i = 0; i < activeCount; i++) {
         const randomIndex = getRandomInt(0, textElements.length);
         animateText(textElements[randomIndex]);
      }
   }

   setInterval(startAnimations, getRandomInt(300, 1000));
});

// /*------------------------------GameButton---------------------------*/
// document.querySelector('.game__button').addEventListener('click', function() {
//    window.location.href = '/game';
//  });



// Ограничиваем увеличение и приближение
const metaViewport = document.createElement('meta');
metaViewport.name = "viewport";
metaViewport.content = "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0";
document.head.appendChild(metaViewport);

// Запрещаем выделение текста и мультитач
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.userSelect = 'none';
   //  document.body.style.touchAction = 'none';

    // Альтернативный способ запрета выделения текста через добавление обработчика событий
    document.body.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
});


/*------------------------------Colors---------------------------*/
document.addEventListener("DOMContentLoaded", () => {
   const colors = ["#6A86FF", "#FF4245", "#FFBB00", "#1BB500", "#002BFF"];
   const icons = document.querySelectorAll(".friends__list-icon");

   if (icons.length > 0) {
      icons.forEach((icon, index) => {
         icon.style.backgroundColor = colors[index % colors.length];
      });
   }
});


})();

/******/ })()
;