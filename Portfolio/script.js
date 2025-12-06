// ===== TYPEWRITER EFFECT =====
const roles = ["Java Developer", "Web Developer", "Problem Solver", "Tech Learner"];
const typingElement = document.getElementById("typing");
const cursorElement = document.getElementById("cursor");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        // Typing
        typingElement.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            // Pause at full word
            setTimeout(() => (isDeleting = true), 800);
        }
    } else {
        // Deleting
        typingElement.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    const speed = isDeleting ? 80 : 130;
    setTimeout(typeRole, speed);
}

// Start typing when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    typeRole();
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Optional: unobserve once visible
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach((el) => observer.observe(el));

// ===== SMOOTH SCROLL (extra smooth) =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: "smooth",
            });
        }
    });
});

// ===== THEME TOGGLE (Dark / Light) =====
const themeToggleBtn = document.getElementById("themeToggle");
const toggleIcon = themeToggleBtn.querySelector(".toggle-icon");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    toggleIcon.textContent = "☼";
}

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    toggleIcon.textContent = isLight ? "☼" : "☾";
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ===== FOOTER YEAR =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== CONTACT FORM (simple demo handler) =====
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thanks for reaching out! (Demo form – connect to backend later.)");
        contactForm.reset();
    });
}
