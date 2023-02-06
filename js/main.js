const toggleBtn = document.querySelector('#menu-toggler')
const menu = document.querySelector('.main-menu')
const serviceToggler = document.querySelector('#services .heading')

serviceToggler.addEventListener('click', () => {
    console.log('zhopec')
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
// const reviewsContainer = document.querySelector('.reviews-container')
// const reviewCounter = document.querySelectorAll('.review-item').length
// const dotsContainer = document.querySelector('.dots')
// let activePosition = 1

// for (let i = 0; i < reviewCounter; i++) {
//     const dot = document.createElement('div')
//     dot.classList.add('dot')
//     dot.dataset.slide = i
//     if (i === 0) dot.classList.add('active')
//     dotsContainer.append(dot)
// }

// const dots = document.querySelectorAll('.dot')

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
let activeSlide = 0
let slidesToPush = [];

sliderNavContainer.addEventListener('click', (e) => {
    let currentElement = e.target.closest('.btn-arr')
    const slides = Array.from(sliderContainer.querySelectorAll('.review-item-container'))
    let columnSize = slides[0].offsetWidth

    if (currentElement?.tagName === 'BUTTON') {
        if (currentElement.dataset.direction === 'next') {
            slidesToPush.push(slides[activeSlide])
            sliderContainer.classList.remove('remove-animation')
            sliderContainer.append(slides[activeSlide].cloneNode(true))

            activeSlide++

            if (activeSlide === 5) {
                sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * ${activeSlide}), 0, 0)`
                activeSlide = 0
                setTimeout(() => {
                    slidesToPush.map(slide => slide.remove())
                    slidesToPush = [];
                    sliderContainer.classList.add('remove-animation')
                    sliderContainer.style.transform = `translate3d(0, 0, 0)`
                }, 300)
            } else {
                sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * ${activeSlide}), 0, 0)`
            }

            updateDot(sliderNavContainer.querySelector(`.dot:nth-child(${activeSlide + 1})`))
        }

        if (currentElement.dataset.direction === 'prev') {
            activeSlide--

            if (activeSlide === -1 || activeSlide === 0) {
                if (activeSlide === 0) {
                    console.log('мы прошли круг')
                    sliderContainer.querySelectorAll('.review-item-container').forEach(slide => slide.remove())
                }

                sliderContainer.prepend(...slides.map(slide => slide.cloneNode(true)))
                // activeSlide = 5
                sliderContainer.classList.add('remove-animation')
                sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * 5), 0, 0)`
                setTimeout(() => {
                    // slidesToPush.map(slide => slide.remove())
                    // slidesToPush = [];
                    sliderContainer.classList.remove('remove-animation')
                    activeSlide = 5
                    sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * ${activeSlide - 1}), 0, 0)`
                    updateDot(sliderNavContainer.querySelector(`.dot:nth-child(${activeSlide})`))
                }, 300)
            } else {
                sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * ${activeSlide - 1}), 0, 0)`
            }
            
            //updateDot(sliderNavContainer.querySelector(`.dot:nth-child(${activeSlide})`))

            //sliderContainer.style.transform = `translate3d(calc(-33.33333333% * ${activeSlide}), 0, 0)`
        }
    }

    if (e.target.classList.contains('dot')) {
        if (!e.target.classList.contains('active')) {
            updateDot(e.target)
            sliderContainer.style.transform = `translate3d(calc(-${columnSize}px * ${+e.target.dataset.goSlide}), 0, 0)`
        }

        console.log(+e.target.dataset.goSlide)
    }
})

function updateDot(dot) {
    sliderNavContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))
    dot.classList.add('active')
}