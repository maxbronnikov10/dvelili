const hamburger = document.querySelector('.promo__hamburger'),
    logo = document.querySelector('.promo__logo'),
    social = document.querySelector('.promo__social'),
    contacts = document.querySelector('.promo__contacts'),
    cart = document.querySelector('.promo__cart'),
    favorites = document.querySelector('.promo__favorites'),
    promo = document.querySelector('.promo'),
    menuList = document.querySelectorAll('.promo__menu-item'),
    
    wrapper = document.querySelector('.promo__wrapper'),
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

$(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});

$("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

new WOW().init()

