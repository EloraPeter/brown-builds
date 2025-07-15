// Utility Functions
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Strict`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) return cookieValue;
    }
    return null;
}

// Throttle function to limit event handler frequency
function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

// Back to Top Button
function initBackToTop() {
    const myButton = document.getElementById("myBtn");
    if (!myButton) return console.error("Back to Top button not found");

    const scrollFunction = throttle(() => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        myButton.style.display = scrollTop > 20 ? "block" : "none";
    }, 100);

    window.addEventListener("scroll", scrollFunction);

    myButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    myButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
}

// Sidebar Menu
function initSidebarMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector("header nav .navlinks");
    if (!menuToggle || !navLinks) return console.error("Sidebar menu elements not found");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Toggle navigation menu");

    const toggleMenu = () => {
        const isActive = navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isActive.toString());
    };

    menuToggle.addEventListener("click", toggleMenu);
    menuToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Trap focus within sidebar when open
    const focusableElements = navLinks.querySelectorAll("a, button");
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    navLinks.addEventListener("keydown", (e) => {
        if (!navLinks.classList.contains("active")) return;
        if (e.key === "Tab") {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

// Cookie Popup
function initCookiePopup() {
    const popUp = document.getElementById("cookiePopup");
    const settingsModal = document.getElementById("cookieSettingsModal");
    const settingsButton = document.getElementById("settingsCookie");
    if (!popUp) return console.error("Cookie popup not found");
    if (!settingsModal) return console.error("Cookie settings modal not found");
    if (!settingsButton) return console.error("Settings button not found");

    function checkCookie() {
        const consent = getCookie("cookieConsent");
        if (consent) {
            popUp.classList.add("hide");
            popUp.classList.remove("show");
            if (consent.includes("analytics")) console.log("Analytics cookies enabled");
            if (consent.includes("marketing")) console.log("Marketing cookies enabled");
        } else {
            setTimeout(() => {
                popUp.classList.add("show");
                popUp.classList.remove("hide");
                const acceptButton = popUp.querySelector("#acceptCookie");
                if (acceptButton) acceptButton.focus();
            }, 2000);
        }
    }

    function closeCookiePopup() {
        popUp.classList.add("hide");
        popUp.classList.remove("show");
    }

    function openCookieSettings() {
        console.log("Opening cookie settings modal"); // Debug log
        popUp.classList.add("hide");
        popUp.classList.remove("show");
        settingsModal.classList.add("show");
        settingsModal.classList.remove("hide");
        const firstCheckbox = settingsModal.querySelector("#analyticsCookies");
        if (firstCheckbox) firstCheckbox.focus();
    }

    function closeCookieSettings() {
        settingsModal.classList.add("hide");
        settingsModal.classList.remove("show");
        popUp.classList.add("show");
        popUp.classList.remove("hide");
        const acceptButton = popUp.querySelector("#acceptCookie");
        if (acceptButton) acceptButton.focus();
    }

    function saveCookieSettings() {
        const analytics = document.getElementById("analyticsCookies")?.checked;
        const marketing = document.getElementById("marketingCookies")?.checked;
        const consent = `essential${analytics ? ",analytics" : ""}${marketing ? ",marketing" : ""}`;
        setCookie("cookieConsent", consent, 365);
        settingsModal.classList.add("hide");
        settingsModal.classList.remove("show");
        popUp.classList.add("hide");
        popUp.classList.remove("show");
    }

    // Event listeners
    const acceptButton = document.getElementById("acceptCookie");
    const declineButton = document.getElementById("declineCookie");
    const closeButton = document.querySelector(".cookie-close");
    const saveButton = document.querySelector("#cookieSettingsForm .cookie-btn--primary");
    const cancelButton = document.querySelector("#cookieSettingsForm .cookie-btn--secondary");

    if (acceptButton) {
        acceptButton.addEventListener("click", () => {
            setCookie("cookieConsent", "essential,analytics,marketing", 365);
            closeCookiePopup();
        });
    } else {
        console.error("Accept button not found");
    }

    if (declineButton) {
        declineButton.addEventListener("click", () => {
            setCookie("cookieConsent", "essential", 365);
            closeCookiePopup();
        });
    } else {
        console.error("Decline button not found");
    }

    if (settingsButton) {
        settingsButton.addEventListener("click", openCookieSettings);
    } else {
        console.error("Settings button not found");
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeCookiePopup);
    } else {
        console.error("Close button not found");
    }

    if (saveButton) {
        saveButton.addEventListener("click", saveCookieSettings);
    } else {
        console.error("Save settings button not found");
    }

    if (cancelButton) {
        cancelButton.addEventListener("click", closeCookieSettings);
    } else {
        console.error("Cancel button not found");
    }

    // Keyboard accessibility
    popUp.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCookiePopup();
    });

    settingsModal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCookieSettings();
    });

    // Focus trapping for modal
    const focusableModalElements = settingsModal.querySelectorAll("input, button");
    const firstModalFocusable = focusableModalElements[0];
    const lastModalFocusable = focusableModalElements[focusableModalElements.length - 1];

    settingsModal.addEventListener("keydown", (e) => {
        if (e.key === "Tab" && settingsModal.classList.contains("show")) {
            if (e.shiftKey && document.activeElement === firstModalFocusable) {
                e.preventDefault();
                lastModalFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastModalFocusable) {
                e.preventDefault();
                firstModalFocusable.focus();
            }
        }
    });

    checkCookie();
}

// Infinite Scrolling Timeline
function initTimeline() {
    const timeline = document.querySelector(".timeline");
    const scrollLeftBtn = document.querySelector(".scroll-left");
    const scrollRightBtn = document.querySelector(".scroll-right");
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (!timeline || !scrollLeftBtn || !scrollRightBtn || !timelineItems.length) {
        return console.error("Timeline elements not found");
    }

    let isTransitioning = false;
    let autoScrollInterval = null;
    const scrollAmount = timeline.offsetWidth * 0.8; // Scroll 80% of visible width

    // Clone items for infinite scrolling
    const originalItems = Array.from(timelineItems);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        timeline.appendChild(clone);
    });

    // Set initial scroll position to avoid showing clones
    timeline.scrollLeft = timelineItems[0].offsetWidth;

    function scrollTimeline(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        const currentScroll = timeline.scrollLeft;
        const maxScroll = timeline.scrollWidth - timeline.clientWidth;
        let targetScroll = direction === "right" ? currentScroll + scrollAmount : currentScroll - scrollAmount;

        // Handle infinite scrolling
        if (targetScroll <= 0) {
            targetScroll = timeline.scrollWidth / 2; // Jump to middle (original items)
        } else if (targetScroll >= maxScroll) {
            targetScroll = timeline.scrollWidth / 2 - timeline.clientWidth; // Jump to middle
        }

        timeline.scrollTo({
            left: targetScroll,
            behavior: "smooth"
        });

        setTimeout(() => {
            isTransitioning = false;
            updateButtonStates();
        }, 500);
    }

    function updateButtonStates() {
        scrollLeftBtn.classList.toggle("disabled", timeline.scrollLeft <= 0);
        scrollRightBtn.classList.toggle("disabled", timeline.scrollLeft + timeline.clientWidth >= timeline.scrollWidth);
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            scrollTimeline("right");
        }, 5000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Event listeners for buttons
    scrollLeftBtn.addEventListener("click", () => {
        stopAutoScroll();
        scrollTimeline("left");
    });

    scrollRightBtn.addEventListener("click", () => {
        stopAutoScroll();
        scrollTimeline("right");
    });

    // Keyboard navigation
    timeline.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            stopAutoScroll();
            scrollTimeline("left");
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            stopAutoScroll();
            scrollTimeline("right");
        }
    });

    // Touch support
    let touchStartX = 0;
    timeline.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoScroll();
    });

    timeline.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            scrollTimeline(diff > 0 ? "right" : "left");
        }
    });

    // Wheel scrolling
    timeline.addEventListener("wheel", (e) => {
        e.preventDefault();
        stopAutoScroll();
        scrollTimeline(e.deltaX > 0 ? "right" : "left");
    });

    // Pause auto-scroll on hover
    timeline.addEventListener("mouseenter", stopAutoScroll);
    timeline.addEventListener("mouseleave", startAutoScroll);

    // Make timeline focusable for keyboard navigation
    timeline.setAttribute("tabindex", "0");

    // Start auto-scroll
    startAutoScroll();

    // Initial button state
    updateButtonStates();
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    if (!faqItems.length) return console.error("FAQ items not found");

    faqItems.forEach((item, index) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const chevron = item.querySelector(".open-answer");
        if (!question || !answer || !chevron) return;

        const answerId = `faq-answer-${index}`;
        answer.id = answerId;
        question.setAttribute("aria-expanded", "false");
        question.setAttribute("aria-controls", answerId);

        question.addEventListener("click", () => {
            const isOpen = answer.classList.contains("open");

            // Close all other answers
            faqItems.forEach((i) => {
                const otherAnswer = i.querySelector(".faq-answer");
                const otherQuestion = i.querySelector(".faq-question");
                const otherChevron = i.querySelector(".open-answer");
                otherAnswer.classList.remove("open");
                otherAnswer.style.maxHeight = null;
                otherQuestion.setAttribute("aria-expanded", "false");
                otherChevron.classList.remove("rotate");
            });

            // Toggle current answer
            if (!isOpen) {
                answer.classList.add("open");
                answer.style.maxHeight = `${answer.scrollHeight}px`;
                question.setAttribute("aria-expanded", "true");
                chevron.classList.add("rotate");
            }
        });

        question.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// Initialize all features
document.addEventListener("DOMContentLoaded", () => {
    initBackToTop();
    initSidebarMenu();
    initCookiePopup();
    initTimeline();
    initFAQ();
});