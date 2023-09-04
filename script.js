// script.js

// Function to add the "small" class to the header on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        header.classList.add('small');
    } else {
        header.classList.remove('small');
    }
});