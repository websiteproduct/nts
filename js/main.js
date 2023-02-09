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

// let items = document.querySelectorAll('#servicesSlider .carousel-service-item')
// let items1 = document.querySelectorAll('#reviewsIndicators .carousel-item')

// items.forEach((el) => {
//     const minPerSlide = 3
//     let next = el.nextElementSibling

//     for (let i = 1; i < minPerSlide; i++) {
//         if (!next) {
//             next = items[0]
//         }

//         let cloneChild = next.cloneNode(true)
//         el.appendChild(cloneChild.children[0])
//         next = next.nextElementSibling
//     }
// })

// items1.forEach((el) => {
//     const minPerSlide = 3
//     let next = el.nextElementSibling

//     for (let i = 1; i < minPerSlide; i++) {
//         if (!next) {
//             next = items1[0]
//         }

//         let cloneChild = next.cloneNode(true)
//         el.appendChild(cloneChild.children[0])
//         next = next.nextElementSibling
//     }
// })

// custom slider

//const sliders = document.querySelectorAll('.slider-container')

// sliders.forEach(sliderContainer => {
const serviceSlider = document.querySelector('.slider-container[data-slider-name="services"]')
const reviewsSlider = document.querySelector('.slider-container[data-slider-name="reviews"]')
const sliderServicesNavContainer = serviceSlider.parentElement.querySelector('.slider-navigation')
const sliderReviewsNavContainer = reviewsSlider.parentElement.querySelector('.slider-navigation')
let activeServicesSlide = +serviceSlider.dataset.slidesCount
let activeReviewsSlide = +reviewsSlider.dataset.slidesCount

if ((('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0))) {
    let start = 0
    let end = 0

    serviceSlider.addEventListener('touchstart', (e) => {
        start = e.changedTouches[0].clientX
    })

    serviceSlider.addEventListener('touchend', (e) => {
        end = e.changedTouches[0].clientX

        if (end - start > 0 && end - start > 40) {
            activeServicesSlide--
        } else if (end - start < 0 && end - start < 40) {
            activeServicesSlide++
        }

        serviceSlideHandle()
    })
}

const servicesSlides = serviceSlider.querySelectorAll('.item-container')
let serviceColumnSize = servicesSlides[0].offsetWidth

sliderServicesNavContainer.addEventListener('click', (e) => {
    let currentElement = e.target.closest('.btn-arr')

    if (currentElement?.tagName === 'BUTTON') {
        if (currentElement.dataset.direction === 'next') {
            activeServicesSlide++
        } else if (currentElement.dataset.direction === 'prev') {
            activeServicesSlide--
        } else {
            return
        }
    }

    serviceSlideHandle()

    if (e.target.classList.contains('dot')) {
        serviceSlider.classList.remove('remove-animation')

        console.log(activeReviewsSlide)

        if (!e.target.classList.contains('active')) {
            sliderServicesNavContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))
            e.target.classList.add('active')
            activeServicesSlide = +e.target.dataset.goSlide + 8;
            serviceSlider.style.transform = `translate3d(calc(-${serviceColumnSize}px * ${activeServicesSlide}), 0, 0)`
        }
    }
})

function serviceSlideHandle() {
    if (activeServicesSlide === 18 || activeServicesSlide === 0) {
        serviceSlider.style.transform = `translate3d(calc(-${serviceColumnSize}px * ${activeServicesSlide}), 0, 0)`
        activeServicesSlide = serviceSlider.dataset.slidesCount
        setTimeout(() => {
            serviceSlider.classList.add('remove-animation')
            serviceSlider.style.transform = `translate3d(calc(-${serviceColumnSize}px * ${activeServicesSlide}), 0, 0)`
        }, 300)

    } else {
        serviceSlider.classList.remove('remove-animation')
        serviceSlider.style.transform = `translate3d(calc(-${serviceColumnSize}px * ${activeServicesSlide}), 0, 0)`
    }

    sliderServicesNavContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))
    const activeServiceDot = activeServicesSlide < +serviceSlider.dataset.slidesCount ? 1 + activeServicesSlide : activeServicesSlide - (+serviceSlider.dataset.slidesCount - 1)
    sliderServicesNavContainer.querySelector(`.dot[data-go-slide="${activeServiceDot}"]`).classList.add('active')
}
// })

// const sliderContainer = document.querySelector('.slider-container')


if ((('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0))) {
    let startR = 0
    let endR = 0

    reviewsSlider.addEventListener('touchstart', (e) => {
        startR = e.changedTouches[0].clientX
    })

    reviewsSlider.addEventListener('touchend', (e) => {
        endR = e.changedTouches[0].clientX

        if (endR - startR > 0 && endR - startR > 40) {
            activeReviewsSlide--
        } else if (endR - startR < 0 && endR - startR < 40) {
            activeReviewsSlide++
        }

        reviewsSlideHandle()
    })
}

const reviewsSlides = reviewsSlider.querySelectorAll('.item-container')
let reviewColumnSize = reviewsSlides[0].offsetWidth

sliderReviewsNavContainer.addEventListener('click', (e) => {
    let currentElement = e.target.closest('.btn-arr')

    if (currentElement?.tagName === 'BUTTON') {
        if (currentElement.dataset.direction === 'next') {
            activeReviewsSlide++
        } else if (currentElement.dataset.direction === 'prev') {
            activeReviewsSlide--
        } else {
            return
        }
    }

    reviewsSlideHandle()

    if (e.target.classList.contains('dot')) {
        reviewsSlider.classList.remove('remove-animation')

        if (!e.target.classList.contains('active')) {
            sliderReviewsNavContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))
            e.target.classList.add('active')
            activeReviewsSlide = +e.target.dataset.goSlide + 4;
            reviewsSlider.style.transform = `translate3d(calc(-${reviewColumnSize}px * ${activeReviewsSlide}), 0, 0)`
        }
    }
})

function reviewsSlideHandle() {
    if (activeReviewsSlide === 10 || activeReviewsSlide === 0) {
        reviewsSlider.style.transform = `translate3d(calc(-${reviewColumnSize}px * ${activeReviewsSlide}), 0, 0)`
        activeReviewsSlide = reviewsSlider.dataset.slidesCount
        setTimeout(() => {
            reviewsSlider.classList.add('remove-animation')
            reviewsSlider.style.transform = `translate3d(calc(-${reviewColumnSize}px * ${activeReviewsSlide}), 0, 0)`
        }, 300)

    } else {
        reviewsSlider.classList.remove('remove-animation')
        reviewsSlider.style.transform = `translate3d(calc(-${reviewColumnSize}px * ${activeReviewsSlide}), 0, 0)`
    }

    sliderReviewsNavContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))
    const activeReviewDot = activeReviewsSlide < +reviewsSlider.dataset.slidesCount ? 1 + activeReviewsSlide : activeReviewsSlide - (+reviewsSlider.dataset.slidesCount - 1)
    console.log(activeReviewDot)
    sliderReviewsNavContainer.querySelector(`.dot[data-go-slide="${activeReviewDot}"]`).classList.add('active')
}

const reviewsToggler = document.querySelector('#reviews-toggler')
const reviewsContainer = document.querySelector('#reviews-test')

reviewsToggler.addEventListener('click', () => {
    reviewsContainer.classList.toggle('show-alt')
})