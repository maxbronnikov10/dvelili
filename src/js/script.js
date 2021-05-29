const hamburger = document.querySelector('.promo__hamburger'),
    logo = document.querySelector('.promo__logo'),
    social = document.querySelector('.promo__social'),
    contacts = document.querySelector('.promo__contacts'),
    cart = document.querySelector('.promo__cart'),
    favorites = document.querySelector('.promo__favorites'),
    promo = document.querySelector('.promo'),
    menuList = document.querySelectorAll('.promo__menu-item'),
    wrapper = document.querySelector('.presentation__wrapper'),
    dropdownmenu = document.querySelector('.presentation__dropdownmenu'),
    pageup = document.querySelector('.pageup');

hamburger.addEventListener('click', () => {
    hamburger.style.pointerEvents = 'none'
    promo.classList.toggle('promo-active');
    hamburger.classList.toggle('promo__hamburger-active');
    logo.classList.toggle('promo__logo-active');
    social.classList.toggle('promo__social-active');
    contacts.classList.toggle('promo__contacts-active');
    cart.classList.toggle('promo__cart-active');
    favorites.classList.toggle('promo__favorites-active');
    menuList.forEach(function (e) {
        e.classList.toggle('promo__menu-item-active');
    });


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
    // if (dropdownmenu.classList.contains('presentation__dropdownmenu-none')) {
    //     dropdownmenu.classList.remove('presentation__dropdownmenu-none');
    //     dropdownmenu.classList.add('presentation__dropdownmenu-active');
    //     setTimeout(function () {
    //         dropdownmenu.classList.remove('presentation__dropdownmenu-hidden');
    //     }, 20);
    // } else {
    //     dropdownmenu.classList.add('presentation__dropdownmenu-hidden');
    //     dropdownmenu.addEventListener('transitionend', function (e) {
    //         dropdownmenu.classList.add('presentation__dropdownmenu-none');
    //         dropdownmenu.classList.remove('presentation__dropdownmenu-active');
    //     }, {
    //         capture: false,
    //         once: true,
    //         passive: false
    //     });
    // }

    dropdownmenu.classList.toggle("presentation__dropdownmenu-active");

    setTimeout(() => {
        hamburger.style.pointerEvents = 'auto'
    }, 700);
});

window.addEventListener('scroll', function () {
    if (window.scrollY > 1200 && pageup.classList.contains('pageup-none')) {
        console.log('вкусно?');
        pageup.classList.remove('pageup-none');
        pageup.classList.add('pageup-active');
        setTimeout(function () {
            pageup.classList.remove('pageup-hidden');
        }, 20);
    }
    else if (window.scrollY < 1200 && pageup.classList.contains('pageup-active')) {
        console.log('пососи');
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