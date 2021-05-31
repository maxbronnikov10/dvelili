if (document.querySelector('body').dataset.id == "main") {
    const left = document.querySelector('.instagram__arrow-left'),
        right = document.querySelector('.instagram__arrow-right'),
        instagramItems = document.querySelector('.instagram__wrapper');

    var index = 2;

    function getClassesForSlides() {
        for (i = 0; i < instagramItems.childNodes.length; i++) {

            instagramItems.childNodes[i].className = "";

            instagramItems.childNodes[i].classList.add('instagram__item');
            if (i == index) instagramItems.childNodes[i].classList.add("instagram__item-center");
            else if (i >= index + 3) instagramItems.childNodes[i].classList.add("instagram__item-none");
            else if (i == index - 1 || i == index + 1) instagramItems.childNodes[i].classList.add('instagram__item-closest');
            else instagramItems.childNodes[i].classList.add('instagram__item-another');
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        getClassesForSlides();
    });


    left.addEventListener('click', (e) => {
        e.preventDefault();

        left.style.pointerEvents = 'none'
        left.classList.toggle('instagram__arrow-left-active');
        const a = instagramItems.childNodes[instagramItems.childNodes.length - 1];
        const b = instagramItems.childNodes[index - 2];
        instagramItems.insertBefore(a, b);

        getClassesForSlides();
        setTimeout(() => {
            left.classList.toggle('instagram__arrow-left-active');
        }, 250);

        left.style.pointerEvents = 'auto'
    });

    right.addEventListener('click', (e) => {
        e.preventDefault();

        right.style.pointerEvents = 'none'
        right.classList.toggle('instagram__arrow-right-active');
        const a = instagramItems.childNodes[instagramItems.childNodes.length - 1];
        const b = instagramItems.childNodes[index - 2];
        instagramItems.insertBefore(b, a);
        getClassesForSlides();
        setTimeout(() => {
            right.classList.toggle('instagram__arrow-right-active');
        }, 250);

        right.style.pointerEvents = 'auto'
    });
}

const hamburger = document.querySelector('.promo__hamburger'),
    logo = document.querySelectorAll('.logo')[0],
    social = document.querySelectorAll('.social')[0],
    contacts = document.querySelector('.promo__contacts'),
    cart = document.querySelector('.promo__cart'),
    favorites = document.querySelector('.promo__favorites'),
    promo = document.querySelector('.promo'),
    wrapper = document.querySelector('.presentation__wrapper'),
    dropdownmenu = document.querySelector('.presentation__dropdownmenu'),
    pageup = document.querySelector('.pageup');

function toggleWrapper() {
    if (document.querySelector('body').dataset.id == "main") {
        if (wrapper.classList.contains('presentation__wrapper-active')) {
            wrapper.classList.remove('presentation__wrapper-active');
            setTimeout(function () {
                wrapper.classList.remove('presentation__wrapper-hidden');
            }, 20);
        } else {
            wrapper.classList.add('presentation__wrapper-hidden');
            wrapper.addEventListener('transitionend', function (e) {
                wrapper.classList.add('presentation__wrapper-active');
            }, {
                capture: false,
                once: true,
                passive: false
            });
        }
    };
}

hamburger.addEventListener('click', () => {
    hamburger.style.pointerEvents = 'none'
    promo.classList.toggle('promo-active');
    hamburger.classList.toggle('promo__hamburger-active');
    logo.classList.toggle('logo-active');
    social.classList.toggle('social-active');
    contacts.classList.toggle('promo__contacts-active');
    cart.classList.toggle('promo__cart-active');
    favorites.classList.toggle('promo__favorites-active');


    toggleWrapper();
    dropdownmenu.classList.toggle("presentation__dropdownmenu-active");

    setTimeout(() => {
        hamburger.style.pointerEvents = 'auto'
    }, 700);
});

window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight / 4 && dropdownmenu.classList.contains('presentation__dropdownmenu-active')) {
        promo.classList.remove('promo-active');
        hamburger.classList.remove('promo__hamburger-active');
        logo.classList.remove('logo-active');
        social.classList.remove('social-active');
        contacts.classList.remove('promo__contacts-active');
        cart.classList.remove('promo__cart-active');
        favorites.classList.remove('promo__favorites-active');
        toggleWrapper();
        dropdownmenu.classList.remove('presentation__dropdownmenu-active');
    }
    else if (window.scrollY > 1200 && pageup.classList.contains('pageup-none')) {
        pageup.classList.remove('pageup-none');
        pageup.classList.add('pageup-active');
        setTimeout(function () {
            pageup.classList.remove('pageup-hidden');
        }, 20);
    }
    else if (window.scrollY < 1200 && pageup.classList.contains('pageup-active')) {
        pageup.classList.add('pageup-hidden');
        pageup.addEventListener('transitionend', function (e) {
            pageup.classList.add('pageup-none');
            pageup.classList.remove('pageup-active');
        }, {
            capture: false,
            once: true,
            passive: false
        });
    }
});

pageup.addEventListener('click', function (e) {
    e.preventDefault();
    const blockID = pageup.getAttribute('href')
    document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
2