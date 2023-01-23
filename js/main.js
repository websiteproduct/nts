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