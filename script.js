// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}





// JavaScript for toggling the sidebar menu
document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("header nav .navlinks");

  menuToggle.addEventListener("click", function() {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
  });
});





// Cookie popup functionality
let popUp = document.getElementById("cookiePopup");

// When the user clicks the accept button
document.getElementById("acceptCookie").addEventListener("click", () => {
    // Create a date object
    let d = new Date();
    // Increment the current time by 365 days (cookie will expire after 1 year)
    d.setFullYear(d.getFullYear() + 1);
    // Create a Cookie with name = myCookieName, value = thisIsMyCookie, and expiry time = 1 year
    document.cookie = "myCookieName=thisIsMyCookie; expires=" + d.toUTCString() + "; path=/";
    // Hide the popup
    popUp.classList.add("hide");
    popUp.classList.remove("show");
});

// When the user clicks the decline button
document.getElementById("declineCookie").addEventListener("click", () => {
    // Hide the popup without setting a cookie
    popUp.classList.add("hide");
    popUp.classList.remove("show");
});

// Function to check if the cookie is already present
const checkCookie = () => {
    // Read the cookie and split on "="
    let input = document.cookie.split(";");
    let cookieFound = input.some(cookie => cookie.trim().startsWith("myCookieName="));
    if (cookieFound) {
        // Hide the popup if the cookie is found
        popUp.classList.add("hide");
        popUp.classList.remove("show");
    } else {
        // Show the popup if the cookie is not found
        popUp.classList.add("show");
        popUp.classList.remove("hide");
    }
};

// Check if the cookie exists when the page loads
window.onload = () => {
    setTimeout(() => {
        checkCookie();
    }, 2000); // Show the popup after 2 seconds if the cookie doesn't exist
};





// history scrolling infinitly
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





