/* ТАБЫ - это способ организации информации. 
Например у нас есть много статей, а надо чтобы на странице показывалась одна, а по клику ну другую рубрику, другая статья. это и есть табы. 
*/




// любой проект начинается с обработчика определенного события на всю страницу.
//Например. тяжелый сайт, все еще не загрузилось, а скрипт уже начинает работать и выдает ошибку
//DOMContentLoaded
//этим я говорю, что джс будет выполнятся только после загрузки структуры дом дерева. Картинки могут дальше грузится потом, нам это не важно.



window.addEventListener('DOMContentLoaded', function () {

    function tabModule(button, btnContainer, tab) {

        //нужно найти кнопки, блок контента и блок c кнопками
        let tabButton = document.querySelectorAll(button),
            buttonsContainer = document.querySelector(btnContainer),
            tabContent = document.querySelectorAll(tab);

        function hideTabContent(a) {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }

        //скрываем все табы, кроме первого
        hideTabContent(1);

        //показ определенного таба
        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }

        //обработчик клика
        buttonsContainer.addEventListener('click', function (evt) {
            let target = evt.target;
            if (target && target.classList.contains('info-header-tab')) {
                for (let i = 0; i < tabButton.length; i++) {
                    if (target == tabButton[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }


        })

    }
 
   
   tabModule('.info-header-tab', '.info-header', '.info-tabcontent'); 


    //таймер
    /* Надо знать дедлайн, сколько до него осталось относительно времени сейчас. Из разницы между временем сейчас и дедлайном мы будем вытаскивать часы минуты и так далее. 
    Нам также нужна функция, которая будет изменять данные в верстке. И функция, которая будет обновлять данные. 
    */
    //Date.parse() - превращает любую дату в количество мс. 

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

    //id - контейнер из верстки, где часы, минуты и секунды
    function setClock(id, endtime) {
        let timer = document.querySelector(id);
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let seconds = timer.querySelector('.seconds');
        let timeInterval = setInterval(updateClock, 1000);

        //функция обновляющая часы, каждую секунду. 
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            if(t.hours < 10) {
                hours.textContent = '0' + t.hours; 
            }
            minutes.textContent = t.minutes;
            if(t.minutes < 10) {
                minutes.textContent = '0' + t.minutes;  
            }
            seconds.textContent = t.seconds;
            if(t.seconds < 10) {
                seconds.textContent = '0' + t.seconds;  
            }

            //останавливаем таймер и устанавливаем нули, если время истекло
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }



    //передавай ид можно создавать разные таймеры одной функцией. 
    setClock('#timer', deadline);











    //модальное окно
    // находим кнопки открытия,закрытия и блок, который должен появиться. 
    // 
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        learnMoreBtn = document.querySelector('.description-btn');

    document.addEventListener('click', function (evt) {
        if (evt.target == more || evt.target == learnMoreBtn) {
        overlay.style.display='block';
        evt.target.classList.add('more-splash'); // добавляем анимацию

        document.body.style.overflow='hidden'; //запрещаем прокрутку.
    }
    })

    close.addEventListener('click', function () {
        overlay.style.display='none';
        more.classList.remove('more-splash'); 
        document.body.style.overflow=''; 
    })







     // ОТПРАВКА ДАННЫХ НА СЕРВЕР
    /* let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так :('
    }

    let form = document.querySelector('.main-form');
    let input = form.querySelectorAll('input');
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    //обработчик события отправки формы вешается именно на форму.
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        form.appendChild(statusMessage);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'server.php');
        /* xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); */
        //чтобы передать через ДЖСОН нужно изменить заголовок
       /*  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        

        let formData = new FormData(form);
        //для ДЖСОН нужно создать промежуточный объект
        let obj = {};
        formData.forEach((value, key) =>
        {
            obj[key] = value;
        })

        let json = JSON.stringify(obj);

        /* xhr.send(formData); */
      /*   xhr.send(json);

        //в будущем можно прогрессбары и анимации разные использовать
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState < 4) {
                statusMessage.textContent = message.loading; 
                
            } else if (xhr.readyState == 4 && xhr.status == 200) {
                statusMessage.textContent = message.success; 
                
            } else {
                statusMessage.textContent = message.failure; 
            }
        })

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }) */




    // Переписать скрипт для отправки данных с формы, используя промисы. (Из проекта Yoga)

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
    
        


       /*  return prom; */

        })


        /* prom.then(function (status) {
            statusMessage.textContent = status;
        })
        .catch(function (error) {
            statusMessage.textContent = error;
        })
        .finally (function () {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }) */

    }

    /* xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState < 4) {
            statusMessage.textContent = message.loading; 
            
        } else if (xhr.readyState == 4 && xhr.status == 200) {
            statusMessage.textContent = message.success; 
            
        } else {
            statusMessage.textContent = message.failure; 
        }
    })
 */
   




     //обработчик события отправки формы вешается именно на форму.
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

   
    


    //СЛАЙДЕР

    //1. Объявляем переменные, которые буду использованы в нашей программе.

    let slideIndex = 1; // номер слайда, который показывается в тек момент.
    let slides = document.querySelectorAll('.slider-item');
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let dotsWrap = document.querySelector('.slider-dots');
    let dots = document.querySelectorAll('.dot');

    //2. Алгоритм действий
    // -скрыть все слайды и показывать только первый
    // Она может принимать аргумент с номером слайда, который надо показать.
    // также должны изменяться и точки
    // функция переключения слайдов (изменение слайд индекс) по клику на стрелочки
    // нужна функция, определяющая текущий слай (чтобы точки менять)

    function showSlides (n) {

        //что делаем, когда выходим за количество слайдов стрелками
        if (n > slides.length) {
            slideIndex = 1;
        } 
        
        if (n < 1) {
            slideIndex = slides.length; 
        }


        //скроем все слайды
        slides.forEach ( (item) => item.style.display = "none");
        //удаляем класс активной точки
        dots.forEach ( (item) => item.classList.remove('dot-active'));

        //показываем указанный слайд
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add('dot-active');
    }

    // эта функция будет запускаться по клику на стрелки
    showSlides(slideIndex);


    //функция изменяющая значение slideIndex
    function plusSlides (n) {
    showSlides(slideIndex += n);
    }
    //функция определяющая текущий слайд
    // например, когда кликнем по точке, в функцию будет передаваться номер точки
    function currentSlide (n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plusSlides (-1);
    })

    next.addEventListener('click', function () {
        plusSlides (1);
    })

    dotsWrap.addEventListener('click', function (evt) {
       /*  console.log(dots);
        let index = dots.indexOf(evt.target);
        console.log(dots);
        console.log(index);
        currentSlide (1); */

        for (let i = 0; i < dots.length + 1; i++) {
            if (evt.target.classList.contains('dot') && dots[i - 1] === evt.target) {
                currentSlide (i)
            }
        }
    })


    
}   
);




