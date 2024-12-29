const timeline = document.querySelector('.timeline');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const items = document.querySelectorAll('.timeline-item');

let isTransitioning = false;

// Function to move the first item to the end
function moveFirstToEnd() {
  const firstItem = timeline.firstElementChild;
  timeline.appendChild(firstItem);
  timeline.scrollLeft -= firstItem.offsetWidth;
}

// Function to move the last item to the beginning
function moveLastToStart() {
  const lastItem = timeline.lastElementChild;
  timeline.prepend(lastItem);
  timeline.scrollLeft += lastItem.offsetWidth;
}

// Initial setup: duplicate first and last items for smooth looping
moveFirstToEnd();
moveLastToStart();

// Scroll left
scrollLeftBtn.addEventListener('click', () => {
  if (isTransitioning) return; // Prevent multiple rapid clicks
  isTransitioning = true;
  
  timeline.scrollBy({
    left: -300, // Adjust scroll distance as needed
    behavior: 'smooth'
  });
  
  setTimeout(() => {
    moveLastToStart();
    isTransitioning = false;
  }, 500); // Adjust time to match your scroll behavior
});

// Scroll right
scrollRightBtn.addEventListener('click', () => {
  if (isTransitioning) return; // Prevent multiple rapid clicks
  isTransitioning = true;
  
  timeline.scrollBy({
    left: 300, // Adjust scroll distance as needed
    behavior: 'smooth'
  });
  
  setTimeout(() => {
    moveFirstToEnd();
    isTransitioning = false;
  }, 500); // Adjust time to match your scroll behavior
});


document.querySelectorAll('.input-group input').forEach((input) => {
  input.addEventListener('blur', () => {
    if (input.value.trim() !== '') {
      input.classList.add('has-value');
    } else {
      input.classList.remove('has-value');
    }
  });
});




// script.js
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show the navbar when scrolling
    navbar.style.top = '0';

    // Clear previous timer if scrolling
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }

    // Set timer to hide navbar after 3 seconds of inactivity
    scrollTimeout = setTimeout(() => {
        // Check again if we're at the top of the page
        if (window.pageYOffset === 0) {
            navbar.style.top = '0'; // Keep navbar visible if at the top
        } else {
            navbar.style.top = '-60px'; // Hide navbar (adjust value based on navbar height)
        }
    }, 3000);

    lastScrollTop = currentScrollTop;
});
