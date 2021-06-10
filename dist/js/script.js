const CustomValidation = {
    invalidities: [],
    validityChecks: [],
    addInvalidity: function (message) {
        this.invalidities.push(message);
    },
    getInvalidities: function () {
        return this.invalidities.join('. \n');
    },
    checkValidity: function (input) {
        for (var i = 0; i < this.validityChecks.length; i++) {

            var isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }

            var requirementElement = this.validityChecks[i].element;
            if (requirementElement) {
                if (isInvalid) {
                    requirementElement.classList.add('invalid');
                    requirementElement.classList.remove('valid');
                } else {
                    requirementElement.classList.remove('invalid');
                    requirementElement.classList.add('valid');
                }

            } // end if requirementElement
        } // end for
    }
};





/* ----------------------------

    Check this input

    Function to check this particular input
    If input is invalid, use setCustomValidity() to pass a message to be displayed

---------------------------- */

function checkInput(input) {

    input.CustomValidation.invalidities = [];
    input.CustomValidation.checkValidity(input);

    if (input.CustomValidation.invalidities.length == 0 && input.value != '') {
        input.setCustomValidity('');
    } else {
        var message = input.CustomValidation.getInvalidities();
        input.setCustomValidity(message);
    }
}





const bodyId = document.querySelector('body').dataset.id;
const index = 2;

const hamburger = document.querySelector('.promo__hamburger'),
    logo = document.querySelectorAll('.logo')[0],
    social = document.querySelectorAll('.social')[0],
    contacts = document.querySelector('.promo__contacts'),
    cart = document.querySelector('.promo__cart'),
    favorites = document.querySelector('.promo__favorites'),
    promo = document.querySelector('.promo'),
    wrapper = document.querySelector('.presentation__wrapper'),
    dropdownmenu = document.querySelector('.presentation__dropdownmenu'),
    pageup = document.querySelector('.pageup'),
    callName = document.querySelector("#name"),
    callPhone = document.querySelector("#phone"),
    submit = document.querySelector("#submit");


if (bodyId == "main") {
    const left = document.querySelector('.instagram__arrow-left'),
        right = document.querySelector('.instagram__arrow-right'),
        instagramItems = document.querySelector('.instagram__wrapper');

    window.addEventListener('DOMContentLoaded', () => {
        getClassesForSlides(instagramItems);
    });


    left.addEventListener('click', (e) => {
        e.preventDefault();

        left.style.pointerEvents = 'none';
        left.classList.toggle('instagram__arrow-left-active');
        const a = instagramItems.childNodes[instagramItems.childNodes.length - 1];
        const b = instagramItems.childNodes[index - 2];
        instagramItems.insertBefore(a, b);

        getClassesForSlides(instagramItems);
        setTimeout(() => {
            left.classList.toggle('instagram__arrow-left-active');
        }, 250);

        left.style.pointerEvents = 'auto';
    });

    right.addEventListener('click', (e) => {
        e.preventDefault();

        right.style.pointerEvents = 'none';
        right.classList.toggle('instagram__arrow-right-active');
        const a = instagramItems.childNodes[instagramItems.childNodes.length - 1];
        const b = instagramItems.childNodes[index - 2];
        instagramItems.insertBefore(b, a);
        getClassesForSlides(instagramItems);
        setTimeout(() => {
            right.classList.toggle('instagram__arrow-right-active');
        }, 250);

        right.style.pointerEvents = 'auto';
    });
}


if (bodyId == "main" || bodyId == "about" || bodyId == "shop") {
    callPhone.addEventListener("input", mask, false);
    callPhone.addEventListener("focus", mask, false);
    callPhone.addEventListener("blur", mask, false);


    const inputs = [callName, callPhone];

    var nameValidityChecks = [
        {
            isInvalid: function (input) {
                return input.value.length < 3;
            },
            invalidityMessage: 'This input needs to be at least 3 characters',
            element: callName
        },
        {
            isInvalid: function (input) {
                var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
                return illegalCharacters ? true : false;
            },
            invalidityMessage: 'Only letters and numbers are allowed',
            element: callName
        }
    ];

    var phoneValidityChecks = [
        {
            isInvalid: function (input) {
                return input.value.length < 8 | input.value.length > 100;
            },
            invalidityMessage: 'This input needs to be between 8 and 100 characters',
            element: callPhone
        },
        {
            isInvalid: function (input) {
                return !input.value.match(/[0-9]/g);
            },
            invalidityMessage: 'At least 1 number is required',
            element: callPhone
        },
        {
            isInvalid: function (input) {
                return !input.value.match(/[a-z]/g);
            },
            invalidityMessage: 'At least 1 lowercase letter is required',
            element: callPhone
        },
        {
            isInvalid: function (input) {
                return !input.value.match(/[A-Z]/g);
            },
            invalidityMessage: 'At least 1 uppercase letter is required',
            element: callPhone
        },
        {
            isInvalid: function (input) {
                return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
            },
            invalidityMessage: 'You need one of the required special characters',
            element: callPhone
        }
    ];

    callName.CustomValidation = CustomValidation;
    callName.CustomValidation.validityChecks = nameValidityChecks;

    callPhone.CustomValidation = CustomValidation;
    callPhone.CustomValidation.validityChecks = phoneValidityChecks;




    inputs.forEach((e) => {
        e.addEventListener('mouseover', function () {
            toggleRequirements(e);
        });

        e.addEventListener('mouseout', function () {
            toggleRequirements(e);
        });
        e.addEventListener('keyup', function () {
            checkInput(this);
        });
    });
    submit.addEventListener('click', function () {
        for (var i = 0; i < inputs.length; i++) {
            checkInput(inputs[i]);
        }
    });
}

if (bodyId == "shop") {
    const shopImg = document.querySelectorAll(".shop__img");
    shopImg.forEach((e) => {
        e.addEventListener('mousemove', (event) => {
            const r = e.getBoundingClientRect();

            e.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
            e.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
        });
        e.addEventListener('mouseout', () => {
            e.style.setProperty('--x', 0);
            e.style.setProperty('--y', 0);
        });
    });
}

hamburger.addEventListener('click', () => {
    hamburger.style.pointerEvents = 'none';
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
        hamburger.style.pointerEvents = 'auto';
    }, 700);
});

window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight / 4 &&
        dropdownmenu.classList.contains('presentation__dropdownmenu-active')) {
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
    const blockID = pageup.getAttribute('href');
    document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});





function toggleRequirements(e) {
    e.parentNode.classList.toggle("call__label-active");
    e.parentNode.childNodes[1].classList.toggle("input-requirements-active");
}

function getClassesForSlides(obj) {
    for (let i = 0; i < obj.childNodes.length; i++) {
        obj.childNodes[i].className = "";
        obj.childNodes[i].classList.add('instagram__item');
        if (i == index) {
            obj.childNodes[i].classList.add("instagram__item-center");
        } else if (i >= index + 3) {
            obj.childNodes[i].classList.add("instagram__item-none");
        } else if (i == index - 1 || i == index + 1) {
            obj.childNodes[i].classList.add('instagram__item-closest');
        } else {
            obj.childNodes[i].classList.add('instagram__item-another');
        }
    }
}

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
    }
}

function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
    }
}

function mask(event) {
    var matrix = "+7 (___)-___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) {
        val = def;
    }
    this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
    if (event.type == "blur") {
        if (this.value.length == 2) {
            this.value = "";
        }
    } else {
        setCursorPosition(this.value.length, this);
    }
}