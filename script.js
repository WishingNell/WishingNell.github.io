window.addEventListener("DOMContentLoaded", () => {
// const scrollToElement = function(element) {
// window.scroll({
// behavior: "smooth",
// left: 0,
// top: element.offsetTop
// });
// };

// const navLinks = document.querySelectorAll("nav a");

// navLinks.forEach(function(link) {
// link.addEventListener("click", function(event) {
// event.preventDefault();
// const targetId = this.getAttribute("href").substring(1);
// const targetElement = document.getElementById(targetId);
// scrollToElement(targetElement);
// });
// });
// JavaScript code for slideshow
	console.log('this')
});

console.log('????')

const makeSlideshow = (container) => {
	console.log('inside')
	const slideshowImages = document.querySelectorAll(`${container} img`);
	console.log(slideshowImages)
	let currentImageIndex = 0;

	setInterval(() => {
	slideshowImages[currentImageIndex].classList.remove('active');
	currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
	slideshowImages[currentImageIndex].classList.add('active');
	}, 2500);
}


makeSlideshow('.slideshow-idx')
makeSlideshow('.slideshow-closet-cookie')