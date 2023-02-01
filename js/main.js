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

let items = document.querySelectorAll('#servicesSlider .carousel-item')
let items1 = document.querySelectorAll('#reviewsIndicators .carousel-item')

console.log('items', items)
console.log('items1', items1)

items.forEach((el) => {
    const minPerSlide = 3
    let next = el.nextElementSibling

    for (var i = 1; i < minPerSlide; i++) {
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

    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            next = items[0]
        }

        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})