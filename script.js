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

// JavaScript function to extract a vibrant color from an image using Vibrant.js
function getVibrantColor(imageUrl, callback) {
    const image = new Image();
    image.src = imageUrl;

    image.onload = function() {
        const vibrant = new Vibrant(image);
        const swatch = vibrant.VibrantSwatch; // You can use other swatch types like Muted or DarkVibrant

        if (swatch) {
            const vibrantColor = swatch.getHex();
            callback(vibrantColor);
        }
    };
}

// Call the function for each student card
getVibrantColor('001.jpg', function(color) {
    const studentName = document.querySelector('.student-name:nth-of-type(1)');
    studentName.style.color = color;
});

getVibrantColor('002.jpg', function(color) {
    const studentName = document.querySelector('.student-name:nth-of-type(2)');
    studentName.style.color = color;
});

getVibrantColor('003.jpg', function(color) {
    const studentName = document.querySelector('.student-name:nth-of-type(3)');
    studentName.style.color = color;
});

getVibrantColor('004.jpg', function(color) {
    const studentName = document.querySelector('.student-name:nth-of-type(4)');
    studentName.style.color = color;
});
