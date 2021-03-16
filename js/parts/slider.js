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