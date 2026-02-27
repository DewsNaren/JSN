const homeHeader = document.querySelector('.home-header');
const homeHeaderHeight = homeHeader.offsetHeight;   
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        homeHeader.classList.add('scrolled');
    } else {
        homeHeader.classList.remove('scrolled');
    }
}); 