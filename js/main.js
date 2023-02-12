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

const sliderContainers = document.querySelectorAll('.slider-container')
let sliders = [];

sliderContainers.forEach(slider => {
    sliders.push({
        name: slider.dataset.sliderName,
        rootElement: slider,
        slides: slider.querySelectorAll('.item-container'),
        navContainer: slider.parentElement.querySelector(`.slider-navigation[data-slider-target="${slider.dataset.sliderName}"]`),
        activeSlide: +slider.dataset.slidesCount,
        activeDot: 1,
        touchStart: 0,
        touchEnd: 0,
    })

    if ((('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0))) {

        slider.addEventListener('touchstart', (e) => {
            touchStart = e.changedTouches[0].clientX
        })

        slider.addEventListener('touchend', (e) => {
            touchEnd = e.changedTouches[0].clientX

            if (touchEnd - touchStart > 0 && touchEnd - touchStart > 40) {
                sliders.find(s => s.rootElement === slider).activeSlide--
            } else if (touchEnd - touchStart < 0 && touchEnd - touchStart < 40) {
                sliders.find(s => s.rootElement === slider).activeSlide++
            }

            slideHandle(sliders.find(s => s.rootElement === slider))
        })
    }

    slider.parentElement.querySelector(`.slider-navigation[data-slider-target="${slider.dataset.sliderName}"]`).addEventListener('click', (e) => {
        let currentElement = e.target.closest('.btn-arr')
        let currentSlider = sliders.find(s => s.rootElement === slider)

        if (currentElement?.tagName === 'BUTTON') {
            if (currentElement.dataset.direction === 'next') {
                currentSlider.activeSlide++
            } else if (currentElement.dataset.direction === 'prev') {
                currentSlider.activeSlide--
            } else {
                return
            }
        }

        slideHandle(currentSlider)

        if (e.target.classList.contains('dot')) {
            slider.classList.remove('remove-animation')

            
            if (!e.target.classList.contains('active')) {
                slider.parentElement.querySelector(`.slider-navigation[data-slider-target="${slider.dataset.sliderName}"]`).querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))
                e.target.classList.add('active')
                currentSlider.activeDot = +e.target.dataset.goSlide
                currentSlider.activeSlide = +e.target.dataset.goSlide + +currentSlider.rootElement.dataset.slidesCount - 1;
                currentSlider.rootElement.style.transform = `translate3d(calc(-${currentSlider.slides[0].offsetWidth}px * ${currentSlider.activeSlide}), 0, 0)`
            }
        }
    })
})

function slideHandle(sliderObj) {
    if (sliderObj.activeSlide === +sliderObj.rootElement.dataset.slidesCount * 2 || sliderObj.activeSlide === 0) {
        sliderObj.rootElement.style.transform = `translate3d(calc(-${sliderObj.slides[0].offsetWidth}px * ${sliderObj.activeSlide}), 0, 0)`
        sliderObj.activeSlide = +sliderObj.rootElement.dataset.slidesCount

        setTimeout(() => {
            sliderObj.rootElement.classList.add('remove-animation')
            sliderObj.rootElement.style.transform = `translate3d(calc(-${sliderObj.slides[0].offsetWidth}px * ${sliderObj.activeSlide}), 0, 0)`
        }, 300)

    } else {
        sliderObj.rootElement.classList.remove('remove-animation')
        sliderObj.rootElement.style.transform = `translate3d(calc(-${sliderObj.slides[0].offsetWidth}px * ${sliderObj.activeSlide}), 0, 0)`
    }

    sliderObj.navContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))
    sliderObj.activeDot = sliderObj.activeSlide < +sliderObj.rootElement.dataset.slidesCount ? 1 + sliderObj.activeSlide : sliderObj.activeSlide - (+sliderObj.rootElement.dataset.slidesCount - 1)
    sliderObj.navContainer.querySelector(`.dot[data-go-slide="${sliderObj.activeDot}"]`).classList.add('active')
}

window.addEventListener('resize', () => {
    sliders.forEach(slider => slideHandle(slider))
})

const lightbox = GLightbox()