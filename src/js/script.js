function CustomValidation() {

}

CustomValidation.prototype = {
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
            let isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }

            let requirementElement = this.validityChecks[i].element;
            let list = requirementElement.parentNode.children[1];

            if (requirementElement) {
                if (isInvalid) {
                    list.childNodes.forEach((e) => {
                        if (this.validityChecks[i].invalidityMessage === e.textContent.slice(1)) {

                            e.classList.add('invalid');
                            e.classList.remove('valid');
                        }
                    });

                } else {
                    list.childNodes.forEach((e) => {
                        if (this.validityChecks[i].invalidityMessage === e.textContent.slice(1)) {

                            e.classList.remove('invalid');
                            e.classList.add('valid');
                        }
                    });
                }

            }
        }
    }
};


const bodyId = document.querySelector('body').dataset.id;
const index = 2;

const hamburger = document.querySelector('.promo__hamburger'),
    logo = document.querySelectorAll('.logo')[0],
    social = document.querySelectorAll('.social')[0],
    contacts = document.querySelector('.promo__contacts'),
    cart = document.querySelector('.promo__cart'),
    favorites = document.querySelector('.promo__favorites'),
    promo = document.querySelector('.promo'),
    dropdownmenu = document.querySelector('.presentation__dropdownmenu'),
    pageup = document.querySelector('.pageup');


if (bodyId == "main") {
    const left = document.querySelector('.instagram__arrow-left'),
        right = document.querySelector('.instagram__arrow-right'),
        dots = document.querySelector('.presentation__dots'),
        instagramItems = document.querySelector('.instagram__wrapper'),
        presentationLeft = document.querySelectorAll('.presentation__arrow-left'),
        presentationRight = document.querySelectorAll('.presentation__arrow-right'),
        presentationWrapper = document.querySelector('.presentation__wrapper'),
        defaultWrapper = [...presentationWrapper.childNodes];

    let dotsIndex = 1;

    window.addEventListener('DOMContentLoaded', () => {
        getClassesForSlides(instagramItems);
        getClasseForPresentationSlides(presentationWrapper);
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
        const a = instagramItems.childNodes[instagramItems.childNodes.length];
        const b = instagramItems.childNodes[index - 2];
        instagramItems.insertBefore(b, a);
        getClassesForSlides(instagramItems);
        setTimeout(() => {
            right.classList.toggle('instagram__arrow-right-active');
        }, 250);

        right.style.pointerEvents = 'auto';
    });


    presentationLeft.forEach(e => {
        e.addEventListener('click', (event) => {
            event.preventDefault();

            e.style.pointerEvents = 'none';
            e.classList.toggle('presentation__arrow-left-active');
            const a = presentationWrapper.childNodes[presentationWrapper.childNodes.length - 1];

            const b = presentationWrapper.childNodes[0];
            presentationWrapper.insertBefore(a, b);
            getClasseForPresentationSlides(presentationWrapper);
            dotsIndex = toggleDots(dots, --dotsIndex);
            setTimeout(() => {
                e.classList.toggle('presentation__arrow-left-active');
            }, 250);

            e.style.pointerEvents = 'auto';
        });
    });

    presentationRight.forEach(e => {
        e.addEventListener('click', (event) => {
            event.preventDefault();

            e.style.pointerEvents = 'none';
            e.classList.toggle('presentation__arrow-right-active');
            const a = presentationWrapper.childNodes[presentationWrapper.childNodes.length];
            const b = presentationWrapper.childNodes[0];
            presentationWrapper.insertBefore(b, a);
            getClasseForPresentationSlides(presentationWrapper);
            dotsIndex = toggleDots(dots, ++dotsIndex);
            setTimeout(() => {
                e.classList.toggle('presentation__arrow-right-active');
            }, 250);

            e.style.pointerEvents = 'auto';
        });
    });

    for (let i = 0; i < dots.childNodes.length; i++) {
        let e = dots.childNodes[i];
        e.addEventListener("click", () => {
            if (dotsIndex < i) {
                for (let j = dotsIndex; i - dotsIndex; j++) {
                    const a = presentationWrapper.childNodes[presentationWrapper.childNodes.length];
                    const b = presentationWrapper.childNodes[0];
                    presentationWrapper.insertBefore(b, a);
                    getClasseForPresentationSlides(presentationWrapper);
                    dotsIndex = toggleDots(dots, ++dotsIndex);
                }
            } else if (dotsIndex > i) {
                for (let j = dotsIndex; dotsIndex - i; j++) {
                    const a = presentationWrapper.childNodes[presentationWrapper.childNodes.length - 1];
                    const b = presentationWrapper.childNodes[0];
                    presentationWrapper.insertBefore(a, b);
                    getClasseForPresentationSlides(presentationWrapper);
                    dotsIndex = toggleDots(dots, --dotsIndex);
                }
            }
        });
    }
}


if (bodyId == "main" || bodyId == "about" || bodyId == "shop") {

    const callName = document.querySelector("#name"),
        callPhone = document.querySelector("#phone"),
        callText = document.querySelector("#text"),
        submit = document.querySelector("#submit");
    callPhone.addEventListener("input", mask, false);
    callPhone.addEventListener("focus", mask, false);
    callPhone.addEventListener("blur", mask, false);


    const inputs = [callName, callPhone, callText];
    var nameValidityChecks = [
        {
            isInvalid: function (input) {
                return input.value.length < 2;
            },
            invalidityMessage: 'Не менее двух символов',
            element: callName
        },
        {
            isInvalid: function (input) {
                var illegalCharacters = input.value.match(/[0-9]/g);
                return illegalCharacters ? true : false;
            },
            invalidityMessage: 'Должны быть только буквы',
            element: callName
        }
    ];

    var phoneValidityChecks = [
        {
            isInvalid: function (input) {
                let value = input.value;
                value = value.replace(["+", "-", " "], "");
                return value < 12 | value > 12;
            },
            invalidityMessage: 'Не менее одиннадцати символов',
            element: callPhone
        },
        {
            isInvalid: function (input) {
                var illegalCharacters = input.value.match(/[a-zA-Z]/g);
                return illegalCharacters ? true : false;
            },
            invalidityMessage: 'Должны быть только цифры',
            element: callPhone
        }
    ];

    callName.CustomValidation = new CustomValidation();
    callName.CustomValidation.validityChecks = nameValidityChecks;

    callPhone.CustomValidation = new CustomValidation();
    callPhone.CustomValidation.validityChecks = phoneValidityChecks;

    inputs.forEach((e) => {
        e.addEventListener('mouseover', function () {
            toggleRequirements(e);
        });

        e.addEventListener('mouseout', function () {
            toggleRequirements(e);
        });
        e.addEventListener('keyup', function () {
            checkInput(e);
        });
    });
    submit.addEventListener('click', function () {
        for (var i = 0; i < inputs.length - 1; i++) {
            checkInput(inputs[i]);
        }
    });
}

if (bodyId == "main" || bodyId == "shop") {
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

if (bodyId == "card") {

    const catalogOptions = document.querySelectorAll(".card__options-item");
    const img = document.querySelector(".card__img").childNodes[0];
    window.addEventListener('DOMContentLoaded', () => {
        getClassForCardOptions(catalogOptions, 0);
        document.querySelector(".card__img").classList.toggle("card__img-active");
    });
    catalogOptions.forEach((e, i) => {
        e.addEventListener("click", () => {
            document.querySelector(".card__img").classList.toggle("card__img-active");

            setTimeout(() => {
                getClassForCardOptions(catalogOptions, i);
                let src = e.childNodes[0].src;
                img.src = src;
                document.querySelector(".card__img").classList.toggle("card__img-active");
            }, 500);
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


function toggleDots(obj, dotsIndex) {
    if (dotsIndex > 2) {
        dotsIndex = dotsIndex - 3;
    } else if (dotsIndex < 0) {
        dotsIndex = dotsIndex + 3;
    }
    for (let i = 0; i < obj.childNodes.length; i++) {
        obj.childNodes[i].className = "";
        obj.childNodes[i].classList.add('presentation__dots-item');
        if (i == dotsIndex) {
            obj.childNodes[i].classList.add("presentation__dots-item-active");
        }
    }
    return dotsIndex;
}


function getClasseForPresentationSlides(obj) {

    for (let i = 0; i < obj.childNodes.length; i++) {
        obj.childNodes[i].className = "";
        obj.childNodes[i].classList.add('presentation__content');
        if (i != 1) {
            obj.childNodes[i].classList.add("presentation__content-disable");
        }
    }
}


function getClassForCardOptions(obj, index) {
    for (let i = 0; i < obj.length; i++) {
        obj[i].className = "";
        obj[i].classList.add("card__options-item");
        if (i == index) {
            obj[i].classList.add("card__options-item-hidden");
            setTimeout(function () { obj[i].classList.add("card__options-item-active"); }, 50);
        }
    }
}

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

function getElementFromActiveContent(className) {
    let element;
    document.querySelectorAll('.presentation__content').forEach((e) => {
        if (!e.classList.contains("presentation__content-disable")) {
            element = e.querySelector(className);
        }
    });
    return element;
}

function toggleWrapper() {
    if (document.querySelector('body').dataset.id == "main") {
        const img = document.querySelector('.presentation__img'),
            left = document.querySelector('.presentation__arrow-left'),
            right = document.querySelector('.presentation__arrow-right'),
            dots = document.querySelector('.presentation__dots'),
            btn = getElementFromActiveContent(".btn"),
            text = getElementFromActiveContent('.presentation__text');

        const array = [img, btn, text, left, right, dots];
        if (img.classList.contains('hidden')) {
            setTimeout(function () {
                array.forEach((e) => {
                    e.classList.remove("hidden");
                });
            }, 20);
        } else {
            array.forEach((e) => {
                console.log(e);
                e.classList.add("hidden");
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
