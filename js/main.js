const toggleBtn = document.querySelector('#menu-toggler')
const menu = document.querySelector('.main-menu')
const serviceToggler = document.querySelector('#services .heading')

serviceToggler.addEventListener('click', () => {
    document.querySelectorAll('.service-image-holder').forEach(el => el.classList.toggle('hide'))
})


toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('show')
})

function handleIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible', entry.target.dataset.anim)
        }
    })
}

const observer = new IntersectionObserver(handleIntersection)
const animatedElements = document.querySelectorAll('.animate__animated')

animatedElements.forEach(el => observer.observe(el))

const nextBtn = document.querySelector('#next-review')

let items = document.querySelectorAll('#servicesSlider .carousel-service-item')
let items1 = document.querySelectorAll('#reviewsIndicators .carousel-item')

items.forEach((el) => {
    const minPerSlide = 3
    let next = el.nextElementSibling

    for (let i = 1; i < minPerSlide; i++) {
        if (!next) {
            next = items[0]
        }

        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

items1.forEach((el) => {
    const minPerSlide = 3
    let next = el.nextElementSibling

    for (let i = 1; i < minPerSlide; i++) {
        if (!next) {
            next = items1[0]
        }

        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

// custom slider

const sliderContainer = document.querySelector('.reviews-container')
const sliderNavContainer = document.querySelector('.slider-navigation')
const originSlidesLength = sliderContainer.querySelectorAll('.review-item-container').length
let activeSlide = 5

if ((('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0))) {
    let start = 0
    let end = 0

    sliderContainer.addEventListener('touchstart', (e) => {
        console.log('start', e)
        start = e.changedTouches[0].clientX
    })

    sliderContainer.addEventListener('touchend', (e) => {
        console.log('end', e)
        end = e.changedTouches[0].clientX

        if (end - start > 0 && end - start > 40) {
            activeSlide--
        } else if (end - start < 0 && end - start < 40) {
            activeSlide++
        }

        slideHandle()
    })
}

const slides = Array.from(sliderContainer.querySelectorAll('.review-item-container'))
let columnSize = slides[0].offsetWidth

sliderNavContainer.addEventListener('click', (e) => {
    let currentElement = e.target.closest('.btn-arr')

    if (currentElement?.tagName === 'BUTTON') {
        if (currentElement.dataset.direction === 'next') {
            activeSlide++
        } else if (currentElement.dataset.direction === 'prev') {
            activeSlide--
        } else {
            return
        }
    }

    if (e.target.classList.contains('dot')) {
        sliderContainer.classList.remove('remove-animation')

        if (!e.target.classList.contains('active')) {
            sliderNavContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))
            e.target.classList.add('active')
            activeSlide = +e.target.dataset.goSlide + 4;
            sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * ${activeSlide}), 0, 0)`
        }
    }
})

function slideHandle() {
    if (activeSlide === 10 || activeSlide === 0) {
        sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * ${activeSlide}), 0, 0)`
        activeSlide = 5
        setTimeout(() => {
            sliderContainer.classList.add('remove-animation')
            sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * ${activeSlide}), 0, 0)`
        }, 300)

    } else {
        sliderContainer.classList.remove('remove-animation')
        sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * ${activeSlide}), 0, 0)`
    }

    sliderNavContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))
    const activeDot = activeSlide < 5 ? 1 + activeSlide : activeSlide - 4
    sliderNavContainer.querySelector(`.dot[data-go-slide="${activeDot}"]`).classList.add('active')
}