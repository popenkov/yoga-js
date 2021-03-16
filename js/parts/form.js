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