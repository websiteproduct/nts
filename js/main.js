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
const reviewsContainer = document.querySelector('.reviews-container')
const reviewCounter = document.querySelectorAll('.review-item').length
const dotsContainer = document.querySelector('.dots')
let activePosition = 1

for (let i = 0; i < reviewCounter; i++) {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    dot.dataset.slide = i
    if (i === 0) dot.classList.add('active')
    dotsContainer.append(dot)
}

const dots = document.querySelectorAll('.dot')

nextBtn.addEventListener('click', () => {
    // dots[activePosition - 1].classList.remove('active')
    // if (activePosition > reviewCounter) activePosition = 1

    // reviewsContainer.style.transform = `translateX(${activePosition * -33.33333333}%)`
    // activePosition++
    // dots[activePosition - 1].classList.add('active')
})

const reviewsTest = document.querySelector('#reviews-test')

reviewsTest.addEventListener('touchstart', (e) => {
    console.log('start', e.touches[0].clientX)
})

reviewsTest.addEventListener('touchend', (e) => {
    console.log('end', e.changedTouches[0].clientX)
})