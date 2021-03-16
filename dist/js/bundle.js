/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/parts/calc.js":
/*!**************************!*\
  !*** ./js/parts/calc.js ***!
  \**************************/
/***/ ((module) => {

function calc () {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener ('input', function () {
        personsSum = +this.value;
        total = (personsSum + daysSum) * 4000;
        
        if (restDays.value == '' || persons.value == '') {
        totalValue.textContent = 0;
        
        } else {
        totalValue.textContent = total;
        }
        })
        
        restDays.addEventListener ('change', function () {
        daysSum = +this.value;
        total = (personsSum + daysSum) * 4000;
        
        if (persons.value == '' || restDays.value == '') {
        totalValue.textContent = 0;
        
        } else {
        totalValue.textContent = total;
        }
    })

    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
}

module.exports = calc;

/***/ }),

/***/ "./js/parts/form.js":
/*!**************************!*\
  !*** ./js/parts/form.js ***!
  \**************************/
/***/ ((module) => {

function form () {

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так :('
    }

    let form = document.querySelector('.main-form');
    let input = form.querySelectorAll('input');
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');


    function sendRequst () {
        return new Promise (function (resolve, reject) {

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'server.php');
            
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(form);
        
        let obj = {};
        formData.forEach((value, key) =>
        {
            obj[key] = value;
        })

        let json = JSON.stringify(obj);

        statusMessage.textContent = message.loading; 
        
        xhr.send(json);

        

        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState < 4) {
                
                
                
            } else if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(message.success);
                
            } else {
                reject(message.failure);
            }
        })
    
        

        })




    }

  
     form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        form.appendChild(statusMessage);

        sendRequst().then(function (status) {
            statusMessage.textContent = status;
        })
        .catch(function (error) {
            statusMessage.textContent = error;
        })
        .finally (function () {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        })
       
    })


}

module.exports = form;

/***/ }),

/***/ "./js/parts/modal.js":
/*!***************************!*\
  !*** ./js/parts/modal.js ***!
  \***************************/
/***/ ((module) => {

function modal() {
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        learnMoreBtn = document.querySelector('.description-btn');

    document.addEventListener('click', function (evt) {
        if (evt.target == more || evt.target == learnMoreBtn) {
            overlay.style.display = 'block';
            evt.target.classList.add('more-splash'); 

            document.body.style.overflow = 'hidden'; 
        }
    })

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    })

}

module.exports = modal;

/***/ }),

/***/ "./js/parts/slider.js":
/*!****************************!*\
  !*** ./js/parts/slider.js ***!
  \****************************/
/***/ ((module) => {

function slider() {

    let slideIndex = 1; // номер слайда, который показывается в тек момент.
    let slides = document.querySelectorAll('.slider-item');
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let dotsWrap = document.querySelector('.slider-dots');
    let dots = document.querySelectorAll('.dot');

 
    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = "none");

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add('dot-active');
    }

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
        console.log(slideIndex);
    })

    next.addEventListener('click', function () {
        plusSlides(1);
        console.log(slideIndex);
    })

    dotsWrap.addEventListener('click', function (evt) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (evt.target.classList.contains('dot') && dots[i - 1] === evt.target) {
                currentSlide(i)
            }
        }
    })


}

module.exports = slider;

/***/ }),

/***/ "./js/parts/tabs.js":
/*!**************************!*\
  !*** ./js/parts/tabs.js ***!
  \**************************/
/***/ ((module) => {

function tabs () {
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/parts/timer.js":
/*!***************************!*\
  !*** ./js/parts/timer.js ***!
  \***************************/
/***/ ((module) => {

function timer() {
    let deadline = '2022-02-16';

    function getTimeRemaining(endtime) {

        let remainingTime = Date.parse(endtime) - Date.parse(new Date),
            seconds = Math.floor((remainingTime / 1000) % 60),
            minutes = Math.floor((remainingTime / 1000 / 60) % 60),
            hours = Math.floor((remainingTime / 1000 / 60 / 60));

        return {
            'total': remainingTime,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours
        }
    }

    function setClock(id, endtime) {
        let timer = document.querySelector(id);
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let seconds = timer.querySelector('.seconds');
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            if (t.hours < 10) {
                hours.textContent = '0' + t.hours;
            }
            minutes.textContent = t.minutes;
            if (t.minutes < 10) {
                minutes.textContent = '0' + t.minutes;
            }
            seconds.textContent = t.seconds;
            if (t.seconds < 10) {
                seconds.textContent = '0' + t.seconds;
            }

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }



    setClock('#timer', deadline);

}

module.exports = timer;

/***/ })

/******/ 	});
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', function () {

    "use strict";
    let tabs = __webpack_require__(/*! ./parts/tabs.js */ "./js/parts/tabs.js"),
        timer = __webpack_require__(/*! ./parts/timer.js */ "./js/parts/timer.js"),
        modal = __webpack_require__(/*! ./parts/modal.js */ "./js/parts/modal.js"),
        slider = __webpack_require__(/*! ./parts/slider.js */ "./js/parts/slider.js"),
        form = __webpack_require__(/*! ./parts/form.js */ "./js/parts/form.js"),
        calc = __webpack_require__(/*! ./parts/calc.js */ "./js/parts/calc.js"); 

    calc();
    form();
    modal();
    slider();
    tabs();
    timer();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map