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