const hamburger = document.querySelector('.promo__hamburger'),
    logo = document.querySelector('.promo__logo'),
    social = document.querySelector('.promo__social'),
    contacts = document.querySelector('.promo__contacts'),
    cart = document.querySelector('.promo__cart'),
    favorites = document.querySelector('.promo__favorites'),
    promo = document.querySelector('.promo'),
    menuList = document.querySelectorAll('.promo__menu-item'),
    wrapper = document.querySelector('.presentation__wrapper'),
    dropdownmenu = document.querySelector('.promo__dropdownmenu'),
    pageup = document.querySelector('.pageup');

hamburger.addEventListener('click', () => {
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
    dropdownmenu.classList.toggle('promo__dropdownmenu-active');
    wrapper.classList.toggle('promo__wrapper-active');

});

window.addEventListener('scroll', function () {
    if (window.scrollY > 1200) {
        pageup.classList.remove("pageup-fadeout");
        pageup.classList.add("pageup-fadein");
    } else {
        if (pageup.classList.contains("pageup-fadein")) {
            console.log("поешь говна");
            pageup.classList.remove("pageup-fadein");
            pageup.classList.add("pageup-fadeout");
        }
    }
});

pageup.addEventListener('click', function (e) {
    e.preventDefault();
    if (getComputedStyle(pageup).opacity != 0) {
        console.log('ага соси');
<<<<<<< HEAD
=======

        const blockID = pageup.getAttribute('href')
        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

>>>>>>> ef4dfe82ffbc3da8437684429daa738bbf362c32

        const blockID = pageup.getAttribute('href')
        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});