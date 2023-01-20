const toggleBtn = document.querySelector('#menu-toggler')
const menu = document.querySelector('.main-menu')

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('show')
})