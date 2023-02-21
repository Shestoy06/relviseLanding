// JS code -----------------

// Hero Background: from <img> to background-image
const heroImage = document.querySelector('.hero__image')
const heroImageSource = heroImage.getAttribute('src')

const hero = document.querySelector('.hero')
hero.style.backgroundImage = `url('${heroImageSource}')`

// Delay visible elements from Hero

let invisibleElements = hero.querySelectorAll('._invisible')
const services = document.querySelector('.cards-services')

// Preloader


document.addEventListener('DOMContentLoaded', () => {
    const mediaFiles = hero.querySelectorAll('img, video')
    let files = 0
    mediaFiles.forEach((file, index) => {
        file.onload = () => {
            files++
            if (files === mediaFiles.length) {
                document.querySelector('.preloader').classList.add('preloader--hide')
                document.body.style.overflow = 'visible'
                window.addEventListener('scroll', () => {

                })
                invisibleElements.forEach((elem, index) => {
                    elem.style.transitionDelay = (1 + index/2)+'s'
                    elem.classList.remove('_invisible')
                    elem.classList.add('_visible')
                })
            }


        }
    })
})


// Header fixed after hero block


const header = document.querySelector('.header__container')
const headerFixed = document.querySelector('.header_fixed')
const heroHeight = document.querySelector('.hero').offsetHeight

window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY
    if (scrollDistance >= heroHeight) {
        headerFixed.style.opacity = '1'
        headerFixed.style.zIndex = '20'

    } else if (scrollDistance === 0) {
        headerFixed.style.opacity = '0'
        headerFixed.style.zIndex = '-1'


    }
    if ((scrollDistance >= services.offsetHeight) && (userWidth > 600)) {
        invisibleElements = services.querySelectorAll('.cards-services__card')
        invisibleElements.forEach((elem, index) => {
            elem.classList.remove('_invisible')
            elem.classList.add('_visible')
        })
    }
})


// Services cards on mobile
const userWidth = window.innerWidth;
const cards = services.querySelectorAll('.cards-services__card')
if (userWidth <= 600) {
    cards.forEach((card) => {
        card.classList.remove('_visible')
        card.classList.add('_invisible')

    })
    let i = 0
    let count = 0
    function blockLoop() {
        count++
        setTimeout(() => {
            cards[i].classList.add('_visible')
            i++
            if (i === 3) {
                i = 0
            }
            if (i < 4) {
                blockLoop()
            }
        }, 4000)
        setTimeout(() => {
            let previous = i > 0 ? i - 1: null
            if (count > 1 && i === 0) {
                previous = 2
            }
            //cards[previous].classList.remove('_visible')
            //cards[previous].classList.add('_invisible')

        }, 3000)
    }

    blockLoop()
}

// Mobile navigation

const menuIcon = headerFixed.querySelector('.menu__icon')
const menuLinks = headerFixed.querySelectorAll('.menu__item')

menuIcon.addEventListener('click', function() {
    menuLinks.forEach((link) => {
        link.classList.toggle('_active')
    })

    menuIconArrow.classList.toggle('_active')
})

const menuIconArrow = headerFixed.querySelector('.menu__arrow')
menuIconArrow.addEventListener('click', function() {
    menuLinks.forEach((link) => {
        link.classList.toggle('_active')
    })

    menuIconArrow.classList.toggle('_active')
})

menuLinks.forEach((link) => {
    link.addEventListener('click', function () {
        menuLinks.forEach((link) => {
            link.classList.toggle('_active')
        })
        menuIconArrow.classList.toggle('_active')
    })
})

// Slider

new Swiper('.practice-advise-slider', {
    spaceBetween: 15,
    initialSlide: 1,
    slidesPerView: 2,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

})

// Visible on entry

function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-show');
        }
    });
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');
for (let elm of elements) {
    observer.observe(elm);
}


// Scroll to elements

const menuLinksTo = document.querySelectorAll('.menu__link[data-goto], .menu__link_image[data-goto]')

if (menuLinksTo.length > 0) {
    menuLinksTo.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    })
}
function onMenuLinkClick(e) {
    const menuLink = e.target
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto)
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight



        window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
        })
        e.preventDefault()
    }
}

// Menu links active on sections
const sections = document.querySelectorAll('.section')
const links = headerFixed.querySelectorAll('.menu__link')

window.addEventListener('scroll', function () {
    sections.forEach((section, i) => {
            const bodyRect = document.body.getBoundingClientRect()
            const headerHeight = headerFixed.clientHeight
            let elemRect = section.getBoundingClientRect()
            let offset = elemRect.top - bodyRect.top - headerHeight
        console.log(`Offset of element ${i} ${offset}`);
        console.log(window.scrollY);
        if (window.scrollY >= offset) {
                links.forEach((link) => {
                    link.classList.remove('_active')
                })
                links[i].classList.add('_active')
            }
    })
})


// Header active on scroll up
let lastScroll = 0
if (window.innerWidth > 600 ) {
    window.addEventListener('scroll', function () {
        let currentScroll = window.scrollY
        if (currentScroll > lastScroll) {
            headerFixed.style.opacity = 0
        } else {
            headerFixed.style.opacity = 1
        }
        lastScroll = currentScroll
    })

}
